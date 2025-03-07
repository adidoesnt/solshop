import { desc, eq, sql } from "drizzle-orm";
import database from "../database";
import { productViews } from "../database/schema";

export const getRecentViews = async (
  customerEmail: string,
  limit: number = 5
) => {
  const result = await database
    .select()
    .from(productViews)
    .where(eq(productViews.customerEmail, customerEmail))
    .orderBy(desc(productViews.createdAt))
    .limit(limit);

  return result;
};

export const getMostViewedProducts = async (limit: number = 5) => {
  const result = await database
    .select({
      count: sql<number>`count(*)`,
      productId: productViews.productId,
    })
    .from(productViews)
    .groupBy(productViews.productId)
    .orderBy(desc(productViews.createdAt))
    .limit(limit);

  return result;
};

export const createProductView = async (
  productId: number,
  customerEmail: string
) => {
  await database.insert(productViews).values({
    productId,
    customerEmail,
  });
};
