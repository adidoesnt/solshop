import { like } from "drizzle-orm";
import database from "../database";
import { products } from "../database/schema";

type FindOptions = {
  search?: string;
};

export const getProducts = async (options?: FindOptions) => {
  const result = await database.query.products.findMany({
    where: options?.search ? like(products.name, `%${options.search}%`) : undefined,
  });

  return result;
};
