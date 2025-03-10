"use client";

import { DataTableColumnHeader } from "@/components/data-column-header";
import { DataColumnInputComponent } from "@/components/data-table-header-filters/data-column-input-component";
import { GetContractResponseType } from "@/features/contract/types";
import { ColumnDef } from "@tanstack/react-table";
import { Actions } from "./actions";

export const columns: ColumnDef<GetContractResponseType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Name"
        component={<DataColumnInputComponent title="Name" column={column} />}
      />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <Actions id={row.original.id} />,
    enableHiding: false,
  },
];
