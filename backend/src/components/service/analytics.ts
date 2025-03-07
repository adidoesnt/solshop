import { desc, eq, sql } from "drizzle-orm";
import database from "../database";
import { products, productViews } from "../database/schema";

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

  const productsResult = await Promise.all(result.map(async (view: any) => {
    const product = await database.query.products.findFirst({
      where: eq(products.id, view.productId),
    });
    return { ...product, views: view.count };
  }));

  return productsResult;
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

  const productsWithViews = await Promise.all(result.map(async (view) => {
    const product = await database.query.products.findFirst({
      where: eq(products.id, view.productId),
    });
    return { ...product, views: view.count };
  }));

  return productsWithViews;
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
