import prisma from "../libs/prismadb";

export default async function getListings(params) {
  try {
    const { userId } = params;

    let query = {};
    if (userId) query.userId = userId;

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error) {
    throw new Error(error);
  }
}
