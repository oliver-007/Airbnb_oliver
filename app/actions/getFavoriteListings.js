import React from "react";
import getCurrentUser from "./getCurrentUser";

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });

    const safeFavorites = favorites.map((favoirte) => ({
      ...favoirte,
      createdAt: favoirte.createdAt.toISOString(),
    }));

    return safeFavorites;
  } catch (error) {
    throw new Error(error);
  }
}
