import prismaDb from "@/lib/prismaDb";
import { NextResponse } from "next/server";

// GET -- Fetch related products -- within same category excluding current product
export async function GET(
  req: Request,
  { params }: { params: { productId: string; storeId: string } }
) {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get("categoryId");

  try {
    if (!params.productId) {
      return new NextResponse("ProductId is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("categoryId is required", { status: 400 });
    }

    const products = await prismaDb.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        isArchived: false,
        NOT: {
          id: params.productId,
        },
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log("[RELATED_PRODUCTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
