import { eq } from "drizzle-orm";
import database from "../database";
import { orderItems, orders, products } from "../database/schema";
import { createCustomer } from "./customer";
import { publishOrderCreated } from "../controller/order";

export type Order = typeof orders.$inferSelect;
export type OrderItem = typeof orderItems.$inferSelect;

export const getOrders = async ({
  customerEmail,
}: {
  customerEmail: string;
}) => {
  const ordersResult = await database
    .select()
    .from(orders)
    .where(eq(orders.customerEmail, customerEmail));

  const ordersWithItems = await Promise.all(
    ordersResult.map(async (order) => {
      const items = await database
        .select()
        .from(orderItems)
        .where(eq(orderItems.orderId, order.id));

      const itemsWithPrice = await Promise.all(
        items.map(async (item) => {
          const product = await database
            .select({
              name: products.name,
              price: products.price,
            })
            .from(products)
            .where(eq(products.id, item.productId));

          return {
            ...item,
            name: product[0].name,
            price: product[0].price,
          };
        })
      );
      return {
        ...order,
        items: itemsWithPrice,
      };
    })
  );

  return ordersWithItems;
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

  const orderResult = await database
    .insert(orders)
    .values({
      ...order,
      customerEmail: customer.email,
      totalPrice: totalPrice.toString(),
    })
    .returning();
  const orderId = orderResult[0].id;

  const itemsResult = await database
    .insert(orderItems)
    .values(items.map((item) => ({ ...item, orderId })))
    .returning();

  const result = {
    ...orderResult[0],
    items: itemsResult,
  };

  await publishOrderCreated({
    order: orderResult[0],
    items: itemsResult,
  });

  return result;
};

export const handleOrderCreated = async (orderId: number) => {
  const order = await database.update(orders).set({
    status: "PAID",
  }).where(eq(orders.id, orderId));

  return order;
}
