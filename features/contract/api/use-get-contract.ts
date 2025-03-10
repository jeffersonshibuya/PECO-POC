import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetContract = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["contract", { id }],
    queryFn: async () => {
      const response = await client.api.contract[":id"].$get({
        param: { id },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch individual contract");
      }

      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
