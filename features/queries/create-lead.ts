import { client } from "@/lib/hono";
import { InferRequestType } from "hono";

type RequestType = InferRequestType<typeof client.api.lead.$post>["json"];

export const createLead = async (json: RequestType) => {
  const response = await client.api.lead.$post({
    json,
  });

  if (!response.ok) {
    throw new Error("Failed to create lead");
  }

  return await response.json();
};
