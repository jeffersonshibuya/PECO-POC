import { db } from "@/db/drizzle";
import { Hono } from "hono";
import { notes } from "@/db/schema";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { eq } from "drizzle-orm";

const app = new Hono()
  .get(
    "/",
    zValidator(
      "query",
      z.object({
        leadId: z.string(),
      })
    ),
    async (c) => {
      const { leadId } = c.req.valid("query");

      if (!leadId) {
        return c.json({ error: "Missing lead ID" }, 404);
      }

      const data = await db
        .select()
        .from(notes)
        .where(eq(notes.leadId, leadId));

      return c.json({ data }, 200);
    }
  )
  .post(
    "/:leadId",
    zValidator(
      "param",
      z.object({
        leadId: z.string(),
      })
    ),
    zValidator(
      "json",
      z.object({
        note: z.string(),
      })
    ),
    async (c) => {
      const { leadId } = c.req.valid("param");
      const values = c.req.valid("json");

      if (!leadId) {
        return c.json({ error: "missing lead id" }, 404);
      }

      try {
        const [data] = await db
          .insert(notes)
          .values({
            ...values,
            leadId,
          })
          .returning();
        return c.json({ data }, 201);
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
