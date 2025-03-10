import { client } from "@/lib/hono";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export const useGetLeads = () => {
  const params = useSearchParams();
  const page = params?.get("page") || undefined;
  const rowsPerPage = params?.get("rowsPerPage") || undefined;
  const firstName = params?.get("firstName") || undefined;
  const lastName = params?.get("lastName") || undefined;
  const county = params?.get("county") || undefined;

  const query = useQuery({
    queryKey: ["leads", { page, rowsPerPage, firstName, lastName, county }],
    queryFn: async () => {
      const response = await client.api.lead.$get({
        query: {
          page,
          rowsPerPage,
          firstName,
          lastName,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch leads");
      }

      const data = await response.json();
      return data;
    },
    placeholderData: keepPreviousData,
  });

  return query;
};
