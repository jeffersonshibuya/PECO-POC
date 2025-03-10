import { insertLeadSchema } from "@/db/schema";
import { client } from "@/lib/hono";
import { InferResponseType } from "hono";
import { z } from "zod";

export type LeadFormValues = z.input<typeof insertLeadSchema>;

export type GetLeadResponseType = InferResponseType<
  typeof client.api.lead.$get,
  200
>["leads"][0];
