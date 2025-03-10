import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.contract)[":id"]["$patch"]
>;
type RequestType = InferRequestType<
  (typeof client.api.contract)[":id"]["$patch"]
>["json"];

export const useEditContract = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.contract[":id"].$patch({
        param: { id },
        json,
      });

      if (!response.ok) {
        throw new Error("Failed to create contract");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contracts"] });
      queryClient.invalidateQueries({ queryKey: ["contract", { id }] });
      toast.success("Contract created");
    },
    onError: () => {
      toast.error("Failed to create contract");
    },
  });

  return mutation;
};
