import { createLead } from "@/features/queries/create-lead";
import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.lead.$post>;
type RequestType = InferRequestType<typeof client.api.lead.$post>["json"];

export const useCreateLead = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      return await createLead(json);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      toast.success("Lead created");
    },
    onError: () => {
      toast.error("Failed to create lead");
    },
  });

  return mutation;
};
