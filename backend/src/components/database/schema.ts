import {
  pgTable,
  serial,
  varchar,
  decimal,
  integer,
  timestamp,
  pgEnum,
  primaryKey,
} from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  shortDescription: varchar("short_description", { length: 50 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  image: varchar("image", { length: 255 }),
  stock: integer("stock").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const orderStatusEnum = pgEnum("order_status", [
  "PENDING",
  "PROCESSING",
  "PAID",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
  "REFUNDED",
  "FAILED",
]);

export const customers = pgTable("customers", {
  email: varchar("email", { length: 255 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  customerEmail: varchar("customer_email", { length: 255 })
    .notNull()
    .references(() => customers.email, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
  status: orderStatusEnum("status").notNull().default("PENDING"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const orderItems = pgTable(
  "order_items",
  {
    orderId: integer("order_id")
      .notNull()
      .references(() => orders.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    productId: integer("product_id")
      .notNull()
      .references(() => products.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    quantity: integer("quantity").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.orderId, table.productId] })]
);
