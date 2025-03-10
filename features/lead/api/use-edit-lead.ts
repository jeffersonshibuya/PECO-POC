import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.lead)[":id"]["$patch"]
>;
type RequestType = InferRequestType<
  (typeof client.api.lead)[":id"]["$patch"]
>["json"];

export const useEditLead = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.lead[":id"].$patch({
        param: { id },
        json,
      });

      if (!response.ok) {
        throw new Error("Failed to update lead");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      queryClient.invalidateQueries({ queryKey: ["lead", { id }] });
      toast.success("Lead updated");
    },
    onError: () => {
      toast.error("Failed to update lead");
    },
  });

  return mutation;
};
