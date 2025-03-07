CREATE TABLE "product_views" (
	"id" serial PRIMARY KEY NOT NULL,
	"customer_email" varchar(255) NOT NULL,
	"product_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "product_views" ADD CONSTRAINT "product_views_customer_email_customers_email_fk" FOREIGN KEY ("customer_email") REFERENCES "public"."customers"("email") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "product_views" ADD CONSTRAINT "product_views_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE cascade;