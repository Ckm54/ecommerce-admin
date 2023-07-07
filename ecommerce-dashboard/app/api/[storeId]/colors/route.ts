import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismaDb from "@/lib/prismaDb";

// POST - create a new color under the store
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    // get id of logged in user trying to create a color
    const { userId } = auth();
    const body = await req.json();
    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    // check if body has required items
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Value url is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    // confirm this store id actually exists for this user
    // ensures a user can only create colors for their store
    const storeByCurrentUser = await prismaDb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByCurrentUser) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const color = await prismaDb.color.create({
      data: {
        name,
        value,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("COLORS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// GET -- gets all colors
export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const colors = await prismaDb.color.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(colors);
  } catch (error) {
    console.log("COLORS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
