import database from "../database";

export const getProducts = async () => {
  const result = await database.query.products.findMany();

  return result;
};
