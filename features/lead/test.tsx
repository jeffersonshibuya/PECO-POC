"use client";

import React, { CSSProperties } from "react";

import {
  Column,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useGetLeads } from "./api/use-get-leads";
import { DataTable } from "@/components/data-table";

//These are the important styles to make sticky column pinning work!
//Apply styles like this using your CSS strategy of choice with this kind of logic to head cells, data cells, footer cells, etc.
//View the index.css file for more needed styles such as border-collapse: separate
const getCommonPinningStyles = (column: Column<unknown>): CSSProperties => {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === "left" && column.getIsLastColumn("left");
  const isFirstRightPinnedColumn =
    isPinned === "right" && column.getIsFirstColumn("right");

  return {
    boxShadow: isLastLeftPinnedColumn
      ? "-4px 0 4px -4px gray inset"
      : isFirstRightPinnedColumn
      ? "4px 0 4px -4px gray inset"
      : undefined,
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    opacity: isPinned ? 0.95 : 1,
    position: isPinned ? "sticky" : "relative",
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
    backgroundColor: isPinned ? "red" : "white",
  };
};

const defaultColumns: ColumnDef<unknown>[] = [
  {
    accessorKey: "firstName",
    id: "firstName",
    header: "First Name",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
    size: 180,
  },
  {
    accessorFn: (row) => row.lastName,
    id: "lastName",
    cell: (info) => info.getValue(),
    header: () => <span>Last Name</span>,
    footer: (props) => props.column.id,
    size: 180,
  },
  {
    accessorKey: "address1",
    id: "address1",
    header: "address1",
    footer: (props) => props.column.id,
    size: 180,
  },
  {
    accessorKey: "address2",
    id: "address2",
    header: "address2",
    footer: (props) => props.column.id,
    size: 180,
  },
  {
    accessorKey: "city",
    id: "city",
    header: "city",
    footer: (props) => props.column.id,
    size: 180,
  },
  {
    accessorKey: "state",
    id: "state",
    header: "state",
    footer: (props) => props.column.id,
    size: 180,
  },
  {
    accessorKey: "company",
    id: "company",
    header: "company",
    footer: (props) => props.column.id,
    size: 180,
  },
  {
    accessorKey: "email",
    id: "email",
    header: "email",
    footer: (props) => props.column.id,
    size: 180,
  },
  {
    accessorKey: "phone",
    id: "phone",
    header: "phone",
    footer: (props) => props.column.id,
    size: 180,
  },
  {
    accessorKey: "zipcode",
    id: "zipcode",
    header: "zipcode",
    footer: (props) => props.column.id,
    size: 180,
  },
];

export function Test() {
  const leads = useGetLeads();
  const [columns] = React.useState(() => [...defaultColumns]);

  const table = useReactTable({
    data: leads?.data?.leads || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
    columnResizeMode: "onChange",
  });

  return (
    <>
      <div className="p-2">
        <div className="inline-block border border-black shadow rounded">
          <div className="px-1 border-b border-black">
            <label>
              <input
                {...{
                  type: "checkbox",
                  checked: table.getIsAllColumnsVisible(),
                  onChange: table.getToggleAllColumnsVisibilityHandler(),
                }}
              />{" "}
              Toggle All
            </label>
          </div>
          {table.getAllLeafColumns().map((column) => {
            return (
              <div key={column.id} className="px-1">
                <label>
                  <input
                    {...{
                      type: "checkbox",
                      checked: column.getIsVisible(),
                      onChange: column.getToggleVisibilityHandler(),
                    }}
                  />{" "}
                  {column.id}
                </label>
              </div>
            );
          })}
        </div>
        <div className="h-4" />
        <div className="h-4" />
        <div className="table-container overflow-auto max-w-full max-h-[500px] border">
          <table
            style={{
              width: table.getTotalSize(),
            }}
          >
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const { column } = header;

                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        //IMPORTANT: This is where the magic happens!
                        style={{ ...getCommonPinningStyles(column) }}
                      >
                        <div className="whitespace-nowrap">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}{" "}
                          {/* Demo getIndex behavior */}
                          {column.getIndex(column.getIsPinned() || "center")}
                        </div>
                        {!header.isPlaceholder && header.column.getCanPin() && (
                          <div className="flex gap-1 justify-center">
                            {header.column.getIsPinned() !== "left" ? (
                              <button
                                className="border rounded px-2"
                                onClick={() => {
                                  header.column.pin("left");
                                }}
                              >
                                {"<="}
                              </button>
                            ) : null}
                            {header.column.getIsPinned() ? (
                              <button
                                className="border rounded px-2"
                                onClick={() => {
                                  header.column.pin(false);
                                }}
                              >
                                X
                              </button>
                            ) : null}
                            {header.column.getIsPinned() !== "right" ? (
                              <button
                                className="border rounded px-2"
                                onClick={() => {
                                  header.column.pin("right");
                                }}
                              >
                                {"=>"}
                              </button>
                            ) : null}
                          </div>
                        )}
                        <div
                          {...{
                            onDoubleClick: () => header.column.resetSize(),
                            onMouseDown: header.getResizeHandler(),
                            onTouchStart: header.getResizeHandler(),
                            className: `resizer ${
                              header.column.getIsResizing() ? "isResizing" : ""
                            }`,
                          }}
                        />
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody className="overflow-auto">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    const { column } = cell;
                    return (
                      <td
                        key={cell.id}
                        //IMPORTANT: This is where the magic happens!
                        style={{ ...getCommonPinningStyles(column) }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <pre>{JSON.stringify(table.getState().columnPinning, null, 2)}</pre>
      </div>
      <DataTable
        data={leads?.data?.leads || []}
        columns={columns}
        defaultPinColuns={{ right: ["firstName", "lastName"], left: ["email"] }}
      />
    </>
  );
}
