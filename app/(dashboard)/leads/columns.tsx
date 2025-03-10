"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-column-header";
import { DataColumnInputComponent } from "@/components/data-table-header-filters/data-column-input-component";

import { GetLeadResponseType } from "@/features/lead/types";
import { Actions } from "./actions";
import { ChevronDown, ChevronRight } from "lucide-react";

export const columns: ColumnDef<GetLeadResponseType>[] = [
  {
    id: "expand",
    header: () => null, // No header needed
    cell: ({ row }) => (
      <button
        onClick={() => row.toggleExpanded()}
        className="text-blue-700 hover:underline  mt-2"
      >
        {row.getIsExpanded() ? (
          <ChevronDown className="size-4" />
        ) : (
          <ChevronRight className="size-4" />
        )}
      </button>
    ),
    size: 30,
  },
  {
    accessorKey: "firstName",
    id: "firstName",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="First Name"
        component={
          <DataColumnInputComponent
            title="First Name"
            column={column}
            isManual
          />
        }
      />
    ),
  },
  {
    accessorKey: "lastName",
    id: "lastName",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Last Name"
        component={
          <DataColumnInputComponent
            title="Last Name"
            column={column}
            isManual
          />
        }
      />
    ),
  },
  {
    accessorKey: "address1",
    id: "address1",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Street"
        component={
          <DataColumnInputComponent title="Street" column={column} isManual />
        }
      />
    ),
  },
  {
    accessorKey: "address2",
    id: "address2",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Address 2"
        component={
          <DataColumnInputComponent
            title="Address 2"
            column={column}
            isManual
          />
        }
      />
    ),
  },
  {
    accessorKey: "city",
    id: "city",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="City"
        component={
          <DataColumnInputComponent title="City" column={column} isManual />
        }
      />
    ),
  },
  {
    accessorKey: "state",
    id: "state",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="State"
        component={
          <DataColumnInputComponent title="State" column={column} isManual />
        }
      />
    ),
  },
  {
    accessorKey: "zipcode",
    id: "zipcode",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Zipcode"
        component={
          <DataColumnInputComponent title="Zipcode" column={column} isManual />
        }
      />
    ),
  },

  {
    accessorKey: "mailingAddress1",
    id: "mailingAddress1",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Mailing St."
        component={
          <DataColumnInputComponent
            title="Mailing st."
            column={column}
            isManual
          />
        }
      />
    ),
  },
  {
    accessorKey: "mailingAddress2",
    id: "mailingAddress2",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Mail. Address 2"
        component={
          <DataColumnInputComponent
            title="Mail. Address 2"
            column={column}
            isManual
          />
        }
      />
    ),
  },
  {
    accessorKey: "mailingCity",
    id: "mailingCity",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Mail. City"
        component={
          <DataColumnInputComponent
            title="Mail. City"
            column={column}
            isManual
          />
        }
      />
    ),
  },
  {
    accessorKey: "mailingState",
    id: "mailingState",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Mail State"
        component={
          <DataColumnInputComponent
            title="Mail State"
            column={column}
            isManual
          />
        }
      />
    ),
  },
  {
    accessorKey: "mailingZipcode",
    id: "mailingZipcode",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Mail. Zipcode"
        component={
          <DataColumnInputComponent
            title="Mail Zipcode"
            column={column}
            isManual
          />
        }
      />
    ),
  },

  {
    accessorKey: "phone",
    id: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Phone"
        component={
          <DataColumnInputComponent title="Phone" column={column} isManual />
        }
      />
    ),
  },
  {
    accessorKey: "email",
    id: "email",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Email"
        component={
          <DataColumnInputComponent title="Email" column={column} isManual />
        }
      />
    ),
  },
  {
    accessorKey: "company",
    id: "company",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Company"
        component={
          <DataColumnInputComponent title="Company" column={column} isManual />
        }
      />
    ),
  },
  {
    accessorKey: "politicalSub",
    id: "politicalSub",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Pol Sub"
        component={
          <DataColumnInputComponent title="Pol Sub" column={column} isManual />
        }
      />
    ),
  },
  {
    accessorKey: "county",
    id: "county",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="County"
        component={
          <DataColumnInputComponent title="County" column={column} isManual />
        }
      />
    ),
  },
  {
    id: "Actions",
    cell: ({ row }) => <Actions id={row.original.id} />,
    enableHiding: false,
    size: 50,
  },
];
