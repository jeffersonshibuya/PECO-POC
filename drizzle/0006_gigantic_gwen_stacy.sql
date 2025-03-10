CREATE TABLE "notes" (
	"id" text PRIMARY KEY NOT NULL,
	"note" text NOT NULL,
	"lead_id" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "notes_lead_id_lead_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."lead"("id") ON DELETE cascade ON UPDATE no action;