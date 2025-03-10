import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

//  Lead
export const lead = pgTable("lead", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),

  // customer info
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("lastName", { length: 100 }).notNull(),
  customerType: varchar("customer_type", { length: 100 }).notNull(),

  // Addresses
  address1: varchar("addresss1", { length: 200 }).notNull(),
  address2: varchar("addresss2", { length: 200 }),
  city: varchar("city", { length: 100 }).notNull(),
  state: varchar("state", { length: 100 }).notNull(),
  zipcode: varchar("zipcode", { length: 20 }).notNull(),

  // Mailing Addresses
  mailingAddress1: varchar("mailing_addresss1", { length: 200 }).notNull(),
  mailingAddress2: varchar("mailing_addresss2", { length: 200 }),
  mailingCity: varchar("mailing_city", { length: 100 }).notNull(),
  mailingState: varchar("mailing_state", { length: 100 }).notNull(),
  mailingZipcode: varchar("mailing_zipcode", { length: 20 }).notNull(),

  // Contact Info
  phone: varchar("phone", { length: 50 }).notNull(),
  fax: varchar("fax", { length: 50 }),
  email: varchar("email", { length: 150 }),
  company: varchar("company", { length: 255 }),
  politicalSub: varchar("political_sub", { length: 100 }).notNull(),
  county: varchar("county", { length: 150 }).notNull(),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertLeadSchema = createInsertSchema(lead, {
  firstName: z.string().min(1, "* Field Required"),
  lastName: z.string().min(1, "* Field Required"),

  address1: z.string().min(1, "* Field Required"),
  city: z.string().min(1, "* Field Required"),
  state: z.string().min(1, "* Field Required"),
  zipcode: z.string().min(1, "* Field Required"),

  mailingAddress1: z.string().min(1, "* Field Required"),
  mailingCity: z.string().min(1, "* Field Required"),
  mailingState: z.string().min(1, "* Field Required"),
  mailingZipcode: z.string().min(1, "* Field Required"),

  phone: z.string().min(1, "* Field Required"),
  email: z.string().email("provide a valid email").optional(),
  county: z.string().min(1, "* Field Required"),
  politicalSub: z.string().min(1, "* Field Required"),
});

// Contract Type
export const contract = pgTable("contract", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const leadRelations = relations(lead, ({ many }) => ({
  notes: many(lead),
}));

export const insertContractSchema = createInsertSchema(contract, {
  name: z.string().min(1, "* Field Required"),
});

// Notes
export const notes = pgTable("notes", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),

  note: text("note").notNull(),
  leadId: text("lead_id")
    .notNull()
    .references(() => lead.id, { onDelete: "cascade" }),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const notesRelations = relations(notes, ({ one }) => ({
  lead: one(lead, {
    fields: [notes.leadId],
    references: [lead.id],
  }),
}));

export const insertNotesSchema = createInsertSchema(notes, {
  note: z.string().min(1, "* Field Required"),
});
