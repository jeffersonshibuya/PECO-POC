import { Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  rowsSelected: number;
  totalItems: number;
  hideSelection?: boolean;
}

export function DataTablePagination<TData>({
  table,
  rowsSelected,
  totalItems,
  hideSelection,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="lg:flex items-center justify-between px-2 my-2 grid grid-cols-2">
      <div className="flex-1 text-sm text-muted-foreground cols-span-2">
        {!hideSelection && `${rowsSelected || 0} rows selected of `}
        {totalItems} items | showing:{" "}
        {table.getPaginationRowModel().rows.length} rows
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8 col-span-2 justify-between">
        <div className="flex items-center lg:space-x-2 my-4 lg:my-0">
          <span className="text-sm font-medium truncate lg:block hidden">
            Rows per page
          </span>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="size-6" />
          </Button>

          <span className="text-slate-500 font-semibold text-sm">
            Page {table?.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              table.setPageIndex(table.getState().pagination.pageIndex + 1);
              // table.nextPage()}
            }}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="size-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
