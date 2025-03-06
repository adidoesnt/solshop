import database from "../database";
import { customers } from "../database/schema";

const createCustomer = async (email: string, name: string) => {
  const result = await database
    .insert(customers)
    .values({ email, name })
    .onConflictDoUpdate({
      target: customers.email,
      set: {
        name,
      },
    })
    .returning();
  const customer = result[0];

  return customer;
};

export { createCustomer };
