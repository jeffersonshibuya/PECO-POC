"use client";

import { parseAsInteger, useQueryState } from "nuqs";
import { useGetLeads } from "../api/use-get-leads";
import { columns } from "@/app/(dashboard)/leads/columns";
import { DataTable } from "@/components/data-table";
import MyExpandedRow from "./row-details";

const LeadsList = () => {
  const { data, isLoading } = useGetLeads();

  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [rowsPerPage, setRowsPerPage] = useQueryState(
    "rowsPerPage",
    parseAsInteger.withDefault(10)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <DataTable
        columns={columns}
        data={data?.leads || []}
        totalCount={data?.totalCount}
        page={page}
        rowsPerPage={rowsPerPage}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
        isManualPagination
        loading={isLoading}
        hideSelection
        defaultPinColuns={{ right: ["Actions"], left: ["expand"] }}
        hiddenColumns={[
          "mailingAddress1",
          "mailingAddress2",
          "mailingCity",
          "mailingState",
          "mailingZipcode",
        ]}
        renderSubComponent={(row) => <MyExpandedRow id={row.original.id} />}
      />
    </>
  );
};
export default LeadsList;
