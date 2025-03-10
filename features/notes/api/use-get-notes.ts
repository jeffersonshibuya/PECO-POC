import { client } from "@/lib/hono";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetNotes = (leadId: string) => {
  const query = useQuery({
    queryKey: ["notes", { leadId }],
    queryFn: async () => {
      const response = await client.api.notes.$get({
        query: {
          leadId,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }

      const { data } = await response.json();
      return data;
    },
    placeholderData: keepPreviousData,
  });

  return query;
};
