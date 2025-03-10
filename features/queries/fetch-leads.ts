import { client } from "@/lib/hono";

interface fetchLeadsProps {
  page?: string;
  rowsPerPage?: string;
}

export const fetchLeads = async ({ page, rowsPerPage }: fetchLeadsProps) => {
  const response = await client.api.lead.$get({
    query: {
      page,
      rowsPerPage,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch leads");
  }

  const data = await response.json();
  return data;
};
