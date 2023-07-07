// POST - create a new billboard under the store
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismaDb from "@/lib/prismaDb";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    // get id of logged in user trying to create a billboard
    const { userId } = auth();
    const body = await req.json();
    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    // check if body has required items
    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Image url is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    // confirm this store id actually exists for this user
    // ensures a user can only create billboards for their store
    const storeByCurrentUser = await prismaDb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByCurrentUser) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const billboard = await prismaDb.billboard.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("BILLBOARDS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// GET -- gets all billboards
export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const billboards = await prismaDb.billboard.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(billboards);
  } catch (error) {
    console.log("BILLBOARDS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
