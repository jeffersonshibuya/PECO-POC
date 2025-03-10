ALTER TABLE "lead" ALTER COLUMN "first_name" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "lead" ALTER COLUMN "lastName" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "lead" ADD COLUMN "addresss1" varchar(200) NOT NULL;--> statement-breakpoint
ALTER TABLE "lead" ADD COLUMN "addresss2" varchar(200) NOT NULL;--> statement-breakpoint
ALTER TABLE "lead" ADD COLUMN "city" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "lead" ADD COLUMN "state" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "lead" ADD COLUMN "zipcode" varchar(20) NOT NULL;--> statement-breakpoint
ALTER TABLE "lead" ADD COLUMN "mailing_addresss1" varchar(200) NOT NULL;--> statement-breakpoint
ALTER TABLE "lead" ADD COLUMN "mailing_addresss2" varchar(200) NOT NULL;--> statement-breakpoint
ALTER TABLE "lead" ADD COLUMN "mailing_city" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "lead" ADD COLUMN "mailing_state" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "lead" ADD COLUMN "mailing_zipcode" varchar(20) NOT NULL;--> statement-breakpoint
ALTER TABLE "lead" ADD COLUMN "phone" varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE "lead" ADD COLUMN "fax" varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE "lead" ADD COLUMN "email" varchar(150) NOT NULL;--> statement-breakpoint
ALTER TABLE "lead" ADD COLUMN "political_sub" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "lead" ADD COLUMN "county" varchar(150) NOT NULL;