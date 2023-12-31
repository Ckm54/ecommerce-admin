import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prismaDb from "@/lib/prismaDb";

export async function POST(req: Request) {
  const body = await req.text();

  const signature = (await headers().get("Stripe-Signature")) as string;

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const address = session?.customer_details?.address;

  const addressComponents = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
  ];

  const addressString = addressComponents.filter((c) => c !== null).join(", ");

  if (event.type === "checkout.session.completed") {
    const order = await prismaDb.order.update({
      where: {
        id: session?.metadata?.orderId,
      },
      data: {
        isPaid: true,
        address: addressString,
        phone: session?.customer_details?.phone || "",
      },
      include: {
        orderItems: true,
      },
    });

    const productIds = order.orderItems.map((item) => item.productId);

    await prismaDb.$transaction(async (prisma) => {
      // step1: Decrement quantity by 1 for all products
      await prismaDb.product.updateMany({
        where: {
          id: {
            in: [...productIds],
          },
        },
        data: {
          quantity: { decrement: 1 },
        },
      });

      // Fetch the products with updated quantity === 0
      const updatedProducts = await prisma.product.findMany({
        where: {
          id: {
            in: [...productIds],
          },
          quantity: 0, // Check if the updated quantity is 0
        },
      });

      // Set isArchived to true for products with quantity 0
      await prisma.product.updateMany({
        where: {
          id: {
            in: updatedProducts.map((product) => product.id),
          },
        },
        data: {
          isArchived: true,
        },
      });
    });
  }

  return new NextResponse(null, { status: 200 });
}
