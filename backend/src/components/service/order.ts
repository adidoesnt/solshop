import database from "../database";
import { orderItems, orders } from "../database/schema";
import { createCustomer } from "./customer";

export type Order = typeof orders.$inferSelect;
export type OrderItem = typeof orderItems.$inferSelect;

export const getOrders = async () => {
  const result = await database.query.orders.findMany({
    with: {
      orderItems: true,
    },
  });

  return result;
};

export const createOrder = async ({
  customerName,
  customerEmail,
  order,
  items,
  totalPrice,
}: {
  customerName: string;
  customerEmail: string;
  order: Order;
  items: OrderItem[];
  totalPrice: number;
}) => {
  const customer = await createCustomer(customerEmail, customerName);

  const orderResult = await database.insert(orders).values({
    ...order,
    customerEmail: customer.email,
    totalPrice: totalPrice.toString(),
  }).returning();
  const orderId = orderResult[0].id;

  const itemsResult = await database
    .insert(orderItems)
    .values(items.map((item) => ({ ...item, orderId })))
    .returning();

  const result = {
    ...orderResult[0],
    items: itemsResult,
  };

  return result;
};
