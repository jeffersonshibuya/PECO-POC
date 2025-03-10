import { Column } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowDownIcon, ArrowUpIcon, Filter, ListFilter } from "lucide-react";
import { useSearchParams } from "next/navigation";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
  component?: React.ReactNode;
  showFilter?: boolean;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
  component,
  showFilter = true,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const params = useSearchParams();
  const isFiltered =
    !!(JSON.stringify(column.getFilterValue()) as string) ||
    !!params?.get(column.id);
  return (
    <div className={cn("flex items-center", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={null} size="sm" className="-ml-3 h-8">
            <span className="text-gray-900">{title}</span>
            {column.getIsSorted() === "desc" ? (
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" />
            ) : (
              <ListFilter className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
          {/* {column.getIsPinned() ? (
            <DropdownMenuItem onClick={() => column.pin(false)}>
              <PinOffIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Remove Pin
            </DropdownMenuItem>
          ) : (
            <>
              <DropdownMenuItem onClick={() => column.pin("left")}>
                <PinIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                Pin Left
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => column.pin("right")}>
                <PinIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                Pin Right
              </DropdownMenuItem>
            </>
          )} */}
        </DropdownMenuContent>
      </DropdownMenu>

      {showFilter && (
        <div className="">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"ghost"}
                size={"icon"}
                className={cn(
                  "hover:text-primary",
                  isFiltered &&
                    "border border-slate-400 bg-primary text-white rounded hover:text-primary"
                )}
              >
                <Filter className="size-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent>{component}</PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
}
