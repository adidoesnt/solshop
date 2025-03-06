import database from "../database";
import { orderItems, orders } from "../database/schema";

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
  order,
  items,
}: {
  order: Order;
  items: OrderItem[];
}) => {
  const orderResult = await database.insert(orders).values(order).returning();
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
