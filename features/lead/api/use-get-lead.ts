import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetLead = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["lead", { id }],
    queryFn: async () => {
      console.log("Get lead info");
      const response = await client.api.lead[":id"].$get({
        param: { id },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch individual lead");
      }

      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
