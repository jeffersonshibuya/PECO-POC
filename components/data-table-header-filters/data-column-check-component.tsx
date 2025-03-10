/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Column } from "@tanstack/react-table";
import { useQueryState } from "nuqs";

interface Props<TData, TValue> {
  options?: { label: string; value: string }[];
  column: Column<TData, TValue>;
}

export function DataColumnCheckComponent<TData, TValue>({
  options,
  column,
}: Props<TData, TValue>) {
  const [filter, setFilter] = useQueryState<string[] | undefined>(column.id, {
    clearOnDefault: true,
    defaultValue: undefined,
    serialize: (value) => {
      if (value?.length === 0) return "";
      return value ? `${(value as string[]).join(",")}` : "";
    },
    parse: (value) => {
      return value ? value.split(",") : undefined;
    },
  });

  const handleCheckboxChange = (value: string) => {
    setFilter((prev) => {
      const updatedRoles = prev?.includes(value)
        ? prev.filter((r) => r !== value)
        : [...(prev || []), value];

      if (updatedRoles.length === 0) {
        column.setFilterValue(null);
        return null;
      }
      column.setFilterValue(updatedRoles);
      return updatedRoles;
    });
  };

  return (
    <div className="space-y-1">
      {options?.map((item) => (
        <div
          className="flex items-center gap-2 border rounded border-slate-200 p-2"
          key={item.value}
        >
          <Checkbox
            id={item.value}
            checked={filter?.includes(item.value) || false}
            value={item.value}
            onCheckedChange={() => handleCheckboxChange(item.value)}
          />
          <Label htmlFor={item.value}>{item.label}</Label>
        </div>
      ))}
    </div>
  );
}
