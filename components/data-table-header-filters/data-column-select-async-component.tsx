"use client";

import { Column } from "@tanstack/react-table";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { SingleValue } from "react-select";
import AsyncSelect from "react-select/async";

interface Props<TData, TValue> {
  placeholder?: string;
  column: Column<TData, TValue>;
  getFilterValue: (id: string) => Promise<string>;
  searchOptions: (
    inputValue: string
  ) => Promise<{ label: string; value: string }[]>;
}

export function DataColumnSelectAsyncComponent<TData, TValue>({
  column,
  placeholder,
  getFilterValue,
  searchOptions,
}: Props<TData, TValue>) {
  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState(false);

  const [filter, setFilter] = useQueryState(column.id, {
    clearOnDefault: true,
    defaultValue: "",
  });

  const onSelect = (option: SingleValue<{ label: string; value: string }>) => {
    setFilter(option?.value || "");
    column.setFilterValue(option?.value);
  };

  // const loadOptions = (inputValue: string) =>
  //   new Promise<{ label: string; value: string }[]>((resolve) => {
  //     setTimeout(() => {
  //       resolve(searchTables(inputValue));
  //     }, 1000);
  //   });
  const loadOptions = (inputValue: string) =>
    new Promise<{ label: string; value: string }[]>((resolve) => {
      setTimeout(() => {
        resolve(searchOptions(inputValue));
      }, 1000);
    });

  useEffect(() => {
    async function getConnectionSelected() {
      setLoading(true);
      if (filter) {
        const responseValue = await getFilterValue(filter);
        setSelectedOption(responseValue);
        // const response = await client.api.connections[":id"]["$get"]({
        //   param: { id: filter },
        // });
        // if (response.ok) {
        //   const { data } = await response.json();
        //   setSelectedOption(data.name);
        // } else {
        //   return "";
        // }
      }
      setLoading(false);
    }

    getConnectionSelected();
  }, [filter, getFilterValue]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AsyncSelect
        cacheOptions
        loadOptions={loadOptions}
        placeholder={`Search ${placeholder}`}
        defaultValue={{
          label: selectedOption,
          value: selectedOption,
        }}
        className="text-sm h-10 max-w-[250px]"
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
        onChange={onSelect}
      />
    </>
  );
}
