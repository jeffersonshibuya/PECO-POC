import { db } from "@/db/drizzle";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { insertLeadSchema, lead, notes } from "@/db/schema";
import { z } from "zod";
import { and, count, eq, ilike } from "drizzle-orm";

const app = new Hono()
  .get(
    "/",
    zValidator(
      "query",
      z.object({
        page: z.string().optional(),
        rowsPerPage: z.string().optional(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        address1: z.string().optional(),
        address2: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        zipcode: z.string().optional(),
        mailingAddress1: z.string().optional(),
        mailingAddress2: z.string().optional(),
        mailingCity: z.string().optional(),
        mailingState: z.string().optional(),
        mailingZipcode: z.string().optional(),
        phone: z.string().optional(),
        company: z.string().optional(),
        email: z.string().optional(),
      })
    ),
    async (c) => {
      const values = c.req.valid("query");
      const rowsPerPage = Number(values.rowsPerPage || 10);
      const page = Number(values.page || 1);
      const offset = (page - 1) * rowsPerPage;

      const whereConditions = [];
      if (values.firstName)
        whereConditions.push(ilike(lead.firstName, `%${values.firstName}%`));
      if (values.lastName)
        whereConditions.push(ilike(lead.lastName, `%${values.lastName}%`));

      const whereClause =
        whereConditions.length > 0 ? and(...whereConditions) : undefined;

      const [totalRecords] = await db
        .select({
          count: count(),
        })
        .from(lead)
        .where(whereClause);

      const data = await db
        .select()
        .from(lead)
        .where(whereClause)
        .offset(offset)
        .limit(rowsPerPage);

      return c.json({
        leads: data,
        totalCount: totalRecords.count,
      });
    }
  )
  .get(
    "/:id",
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      })
    ),
    async (c) => {
      const values = c.req.valid("param");

      if (!values.id) {
        return c.json({ error: "missing lead id" }, 404);
      }

      const [data] = await db.select().from(lead).where(eq(lead.id, values.id));

      return c.json({ data }, 200);
    }
  )
  .post(
    "/",
    zValidator(
      "json",
      insertLeadSchema.omit({
        id: true,
        createdAt: true,
        updatedAt: true,
      })
    ),
    async (c) => {
      const values = c.req.valid("json");
      try {
        await db.transaction(async (trx) => {
          // Create lead
          const [leadResponse] = await trx
            .insert(lead)
            .values(values)
            .returning();

          // Create notes
          await trx
            .insert(notes)
            .values({
              note: "Lead Created [Auto Note]",
              leadId: leadResponse.id,
            })
            .returning();
        });

        return c.json({ success: true }, 201);
      } catch (error: unknown) {
        console.log(error);
        if (error instanceof Error) {
          return c.json({ error: error.message }, 400);
        } else {
          return c.json({ error: "Internal Server Error" }, 500);
        }
      }
    }
  )
  .patch(
    "/:id",
    zValidator("param", z.object({ id: z.string().optional() })),
    zValidator(
      "json",
      insertLeadSchema.omit({
        id: true,
        createdAt: true,
        updatedAt: true,
      })
    ),
    async (c) => {
      const { id } = c.req.valid("param");
      const values = c.req.valid("json");

      if (!id) {
        return c.json({ error: "Missing lead ID" }, 404);
      }

      try {
        const [data] = await db
          .update(lead)
          .set(values)
          .where(eq(lead.id, id))
          .returning();
        return c.json({ data }, 200);
      } catch (error: unknown) {
        console.log(error);
        if (error instanceof Error) {
          return c.json({ error: error.message }, 400);
        } else {
          return c.json({ error: "Internal Server Error" }, 500);
        }
      }
    }
  );

export default app;
