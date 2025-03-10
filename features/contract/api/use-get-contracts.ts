import { client } from "@/lib/hono";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetContracts = () => {
  const query = useQuery({
    queryKey: ["contracts"],
    queryFn: async () => {
      const response = await client.api.contract.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch contracts");
      }

      const { data } = await response.json();
      return data;
    },
    placeholderData: keepPreviousData,
  });

  return query;
};
