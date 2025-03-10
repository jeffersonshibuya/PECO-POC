import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.notes)[":leadId"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.notes)[":leadId"]["$post"]
>["json"];

export const useCreateNote = (leadId: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.notes[":leadId"].$post({
        param: { leadId },
        json,
      });

      if (!response.ok) {
        throw new Error("Failed to create note");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", { leadId }] });
      toast.success("Contract created");
    },
    onError: () => {
      toast.error("Failed to create contract");
    },
  });

  return mutation;
};
