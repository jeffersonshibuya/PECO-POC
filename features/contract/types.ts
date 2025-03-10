import { insertContractSchema } from "@/db/schema";
import { client } from "@/lib/hono";
import { InferResponseType } from "hono";
import { z } from "zod";

export type ContractFormValues = z.input<typeof insertContractSchema>;

export type GetContractResponseType = InferResponseType<
  typeof client.api.contract.$get,
  200
>["data"][0];
