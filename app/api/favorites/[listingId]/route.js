import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

// add fovorite
export async function POST(request, { params }) {
  const curerentUser = await getCurrentUser();

  if (!curerentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  let favoriteIds = [...(curerentUser.favoriteIds || [])];

  favoriteIds.push(listingId);

  const user = await prisma.user.update({
    where: {
      id: curerentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(user);
}

// delete favorite
export async function DELETE(request, { params }) {
  const curerentUser = await getCurrentUser();

  if (!curerentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("invalid ID");
  }

  let favoriteIds = [...(curerentUser.favoriteIds || [])];

  favoriteIds = favoriteIds.filter((id) => id !== listingId);

  const user = await prisma.user.update({
    where: {
      id: curerentUser.id,
    },
    data: {
      favoriteIds: favoriteIds,
    },
  });

  return NextResponse.json(user);
}
