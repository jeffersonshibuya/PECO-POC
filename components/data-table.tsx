"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  RowSelectionState,
  Table,
  useReactTable,
  getGroupedRowModel,
  Column,
  ColumnPinningState,
  ExpandedState,
  Row,
  getExpandedRowModel,
} from "@tanstack/react-table";

import {
  Table as UiTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { CSSProperties, useEffect, useState } from "react";
import { DataTablePagination } from "./data-table-pagination";
import { Loader2 } from "lucide-react";
import { DataTableViewOptions } from "./data-column-view-options";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  page?: number;
  rowsPerPage?: number;
  isManualPagination?: boolean;
  totalCount?: number | undefined;
  loading?: boolean;
  hideSelection?: boolean;
  hiddenColumns?: string[];
  hiddenViewOptions?: boolean;
  setPage?: (page: number) => void;
  setRowsPerPage?: (rowsPerPage: number) => void;
  actions?: (table: Table<TData>) => React.ReactNode;
  onRowSelection?: (rowSelection: RowSelectionState) => void;
  rowsSelected?: RowSelectionState;
  defaultPinColuns?: ColumnPinningState;
  renderSubComponent?: (row: Row<TData>) => React.ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  page = 1,
  rowsPerPage = 10,
  isManualPagination = false,
  totalCount,
  hideSelection = false,
  hiddenViewOptions = false,
  loading = false,
  hiddenColumns = [],
  defaultPinColuns = {},
  setPage,
  setRowsPerPage,
  actions,
  onRowSelection,
  rowsSelected,
  renderSubComponent,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>(
    rowsSelected || {}
  );
  const [columnVisibility, setColumnVisibility] = useState<
    Record<string, boolean>
  >(Object.fromEntries(hiddenColumns.map((col) => [col, false])));
  const [columnPinning, setColumnPinning] =
    React.useState<ColumnPinningState>(defaultPinColuns);
  const [expanded, setExpanded] = React.useState<ExpandedState>({});

  const getCommonPinningStyles = (column: Column<TData>): CSSProperties => {
    const isPinned = column.getIsPinned();
    const isLastLeftPinnedColumn =
      isPinned === "left" && column.getIsLastColumn("left");
    const isFirstRightPinnedColumn =
      isPinned === "right" && column.getIsFirstColumn("right");

    return {
      boxShadow: isLastLeftPinnedColumn
        ? "-2px 0 2px -2px gray inset"
        : isFirstRightPinnedColumn
        ? "2px 0 2px -2px gray inset"
        : undefined,
      left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
      right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
      opacity: 1,
      position: isPinned ? "sticky" : "relative",
      width: column.getSize(),
      zIndex: isPinned ? 50 : 0,
      backgroundColor: isPinned ? "white" : undefined,
    };
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnnFilters,
    onRowSelectionChange: isManualPagination
      ? (updater) => {
          const nextSelection =
            typeof updater === "function" ? updater(rowSelection) : updater;
          setRowSelection(nextSelection);
          onRowSelection?.(nextSelection);
        }
      : setRowSelection, // Don't pass if not manual
    onPaginationChange: (updater) => {
      if (!isManualPagination) {
        table.setState((prev) => ({
          ...prev,
          pagination:
            typeof updater === "function" ? updater(prev.pagination) : updater,
        }));
      } else if (setPage && setRowsPerPage) {
        const nextPagination =
          typeof updater === "function"
            ? updater({
                pageIndex: page - 1,
                pageSize: rowsPerPage,
              })
            : updater;
        setPage(nextPagination.pageIndex + 1);
        setRowsPerPage(nextPagination.pageSize);
      }
    },
    state: {
      sorting,
      columnFilters,
      rowSelection,
      columnVisibility,
      columnPinning,
      expanded,
    },
    enableColumnPinning: true,
    enableFilters: true,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnPinningChange: setColumnPinning,
    onExpandedChange: setExpanded,
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    manualFiltering: isManualPagination,
    rowCount: isManualPagination ? totalCount : undefined,
    manualPagination: isManualPagination,
    autoResetPageIndex: !isManualPagination,
    enableRowSelection: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getRowId: (row: any) => row.id || row.tables?.id || crypto.randomUUID(),
  });

  useEffect(() => {
    if (isManualPagination) {
      table.setState((prev) => ({
        ...prev,
        pagination: {
          pageIndex: page - 1,
          pageSize: rowsPerPage,
        },
      }));
    } else {
      table.setState((prev) => ({
        ...prev,
        pagination: {
          pageIndex: 0,
          pageSize: 10,
        },
      }));
    }
  }, [isManualPagination, page, rowsPerPage, table]);

  useEffect(() => {
    if (isManualPagination) {
      if (setPage) setPage(1); // Reset to page 1 only when sorting or filtering changes
    }
  }, [columnFilters, isManualPagination, setPage]);

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-2 justify-end">
        {actions && actions(table)}
        {!hiddenViewOptions && <DataTableViewOptions table={table} />}
      </div>
      <div className="rounded-md border overflow-hidden">
        {loading && <Loader2 className="size-4 animate-spin" />}
        <UiTable>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <>
                      <TableHead
                        key={header.id}
                        style={{ ...getCommonPinningStyles(header.column) }}
                        className="bg-white border-r border-slate-200"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    </>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <>
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell
                          key={cell.id}
                          style={{ ...getCommonPinningStyles(cell.column) }}
                          className="bg-white border-r border-slate-200"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                  {row.getIsExpanded() && renderSubComponent && (
                    <TableRow>
                      <TableCell colSpan={columns.length}>
                        {renderSubComponent(row)}
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </UiTable>
      </div>

      <DataTablePagination
        table={table}
        rowsSelected={Object.keys(rowSelection).length}
        totalItems={totalCount || table.getRowCount()}
        hideSelection={hideSelection}
      />
    </div>
  );
}
