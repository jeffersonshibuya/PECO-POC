"use client";

import { Column } from "@tanstack/react-table";
import { useQueryState } from "nuqs";
import { useMemo } from "react";
import { SingleValue } from "react-select";
import Select from "react-select";

interface Props<TData, TValue> {
  options?: { label: string; value: string }[];
  value?: string | boolean | null | undefined;
  disabled?: boolean;
  placeholder?: string;
  column: Column<TData, TValue>;
}

export function DataColumnSelectComponent<TData, TValue>({
  column,
  options,
  disabled,
  placeholder,
}: Props<TData, TValue>) {
  const [filter, setFilter] = useQueryState(column.id, {
    clearOnDefault: true,
    defaultValue: "",
  });

  const onSelect = (option: SingleValue<{ label: string; value: string }>) => {
    column.setFilterValue(option?.value);
    setFilter(option?.value || "");
  };

  const formattedValue = useMemo(() => {
    const result = options?.find((option) => option.value === filter);
    return result;
  }, [filter, options]);

  return (
    <>
      <Select
        placeholder={placeholder}
        className="text-sm h-10 w-auto min-w-[200px]"
        isClearable
        menuPortalTarget={document.body}
        styles={{
          control: (base) => ({
            ...base,
            borderColor: "#e2e8f0",
            ":hover": {
              borderColor: "#e2e8f0",
            },
          }),
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          menu: (base) => ({ ...base, zIndex: 9999 }),
        }}
        value={formattedValue}
        onChange={onSelect}
        options={options}
        isDisabled={disabled}
      />
    </>
  );
}
