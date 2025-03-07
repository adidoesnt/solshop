import { eq } from "drizzle-orm";
import database from "../database";
import { products } from "../database/schema";
import type { OrderItem } from "./order";
import Logger from "../../utils/logger";

const logger = new Logger("product");

export const getProducts = async () => {
  const result = await database.query.products.findMany();

  return result;
};

export const updateProductStock = async (productId: number, stockToSubtract: number) => {
  const result = await database.query.products.findFirst({
    where: eq(products.id, productId),
  });

  if (!result) throw new Error("Product not found");

  const updatedStock = result.stock - stockToSubtract;

  const updatedProduct = await database.update(products).set({
    stock: updatedStock,
  }).where(eq(products.id, productId));

  return updatedProduct;
};

export const handleOrderCreated = async (items: OrderItem[]) => {
  await Promise.all(items.map(async (item) => {
    await updateProductStock(item.productId, item.quantity);
  }));
  logger.info(`Updated stock for ${items.length} products`);
};
