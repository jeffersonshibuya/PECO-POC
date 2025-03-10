import { Column } from "@tanstack/react-table";
import { Input } from "../ui/input";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { Search } from "lucide-react";

interface Props<TData, TValue> {
  title?: string;
  column: Column<TData, TValue>;
  isManual?: boolean;
}

export const DataColumnInputComponent = <TData, TValue>({
  title,
  column,
  isManual = false,
}: Props<TData, TValue>) => {
  const params = useSearchParams();
  const [searchValue, setSearchValue] = useState(params?.get(column.id) || "");
  const [, setFilter] = useQueryState(column.id, {
    clearOnDefault: true,
    defaultValue: "",
  });

  const handleChange = (value: string) => {
    setSearchValue(value); // Update local state instantly
    if (!isManual) {
      column.setFilterValue(value); // Immediately update the table filter value
      // debouncedSearch(value); // Apply debounce before setting the filter in the query state
      setFilter(value);
    }
    if (!value) {
      setFilter(value);
      column.setFilterValue(value);
    }
  };

  return (
    <div className="flex items-center gap-1 w-full border border-slate-200 rounded p-1">
      <Input
        type="text"
        value={searchValue ?? ""}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setFilter(searchValue);
            column.setFilterValue(searchValue);
          }
        }}
        placeholder={`Search ${title || ""}`}
        className="border-none"
      />
      {isManual && (
        <Button
          onClick={() => {
            setFilter(searchValue);
            column.setFilterValue(searchValue);
          }}
          size="sm"
        >
          <Search className="size-4" />
        </Button>
      )}
    </div>
  );
};
