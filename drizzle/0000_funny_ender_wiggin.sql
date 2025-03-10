CREATE TABLE "lead" (
	"id" text PRIMARY KEY NOT NULL,
	"first_name" varchar NOT NULL,
	"lastName" varchar NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
