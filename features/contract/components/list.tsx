"use client";

import { DataTable } from "@/components/data-table";
import { columns } from "@/app/(dashboard)/contracts/columns";
import { useGetContracts } from "../api/use-get-contracts";

const ContractsList = () => {
  const contractQuery = useGetContracts();

  return (
    <>
      <DataTable
        columns={columns}
        data={contractQuery?.data || []}
        hiddenViewOptions
      />
    </>
  );
};
export default ContractsList;
