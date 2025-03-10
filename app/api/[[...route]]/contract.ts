import { db } from "@/db/drizzle";
import { Hono } from "hono";
import { contract, insertContractSchema } from "@/db/schema";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { eq } from "drizzle-orm";

const app = new Hono()
  .get(
    "/:id",
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      })
    ),
    async (c) => {
      const { id } = c.req.valid("param");

      if (!id) {
        return c.json({ error: "Bad request" }, 400);
      }

      const data = await db.query.contract.findFirst({
        where: eq(contract.id, id),
      });

      return c.json({ data }, 200);
    }
  )
  .get("/", async (c) => {
    const data = await db.select().from(contract);

    return c.json({ data }, 200);
  })
  .post(
    "/",
    zValidator(
      "json",
      insertContractSchema.omit({
        id: true,
        createdAt: true,
        updatedAt: true,
      })
    ),
    async (c) => {
      const values = c.req.valid("json");
      try {
        const [data] = await db.insert(contract).values(values).returning();
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
  )
  .patch(
    "/:id",
    zValidator("param", z.object({ id: z.string().optional() })),
    zValidator("json", insertContractSchema.pick({ name: true })),
    async (c) => {
      const { id } = c.req.valid("param");
      const values = c.req.valid("json");

      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }

      const [data] = await db
        .update(contract)
        .set(values)
        .where(eq(contract.id, id))
        .returning();

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json({ data });
    }
  );

export default app;
