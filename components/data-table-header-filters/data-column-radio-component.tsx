"use client";

import { Label } from "@/components/ui/label";
import { Column } from "@tanstack/react-table";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { SquareCheckBigIcon, SquareXIcon } from "lucide-react";
import DataColumnClearButton from "../data-column-clear-button";
import { useQueryState } from "nuqs";

interface Props<TData, TValue> {
  options?: { label: string; value: boolean }[];
  column: Column<TData, TValue>;
}

export function DataColumnRadioComponent<TData, TValue>({
  options,
  column,
}: Props<TData, TValue>) {
  const [filter, setFilter] = useQueryState<boolean | undefined>(column.id, {
    clearOnDefault: true,
    defaultValue: undefined,
    serialize: (value) => (value ? `yes` : "no"),
    parse: (value) => {
      if (value === "yes") return true;
      return false;
    },
  });

  const onSelect = (valueSelected: string) => {
    if (valueSelected) {
      const value =
        options?.find((option) => option.label === valueSelected)?.value ||
        false;
      setFilter(value);
      column.setFilterValue(value);
    }
  };

  return (
    <div className="space-y-2 relative">
      <RadioGroup className="gap-2" onValueChange={onSelect}>
        {options?.map((item) => (
          <div
            key={item.label}
            className="relative flex w-full items-start gap-2 rounded-lg border border-input p-4 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring"
          >
            <RadioGroupItem
              value={item.label}
              id={item.label}
              checked={filter === item.value}
              className="order-1 after:absolute after:inset-0"
            />
            <div className="flex grow items-center gap-3">
              {item.value ? (
                <SquareCheckBigIcon className="size-4" />
              ) : (
                <SquareXIcon className="size-4 text-red-400 " />
              )}
              <div className="grid grow gap-2">
                <Label htmlFor={item.label}>{item.label}</Label>
              </div>
            </div>
          </div>
        ))}
      </RadioGroup>
      <DataColumnClearButton
        onClick={() => {
          column.setFilterValue(null);
          setFilter(null);
        }}
      />
    </div>
  );
}
