"use client";

import { insertContractSchema } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ContractFormValues } from "../types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

type Props = {
  id?: string | null;
  defaultValues?: ContractFormValues;
  onSubmit: (values: ContractFormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

export const ContractForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
}: Props) => {
  const form = useForm<ContractFormValues>({
    resolver: zodResolver(insertContractSchema),
    defaultValues,
  });

  const handleSubmit = (values: ContractFormValues) => {
    insertContractSchema.safeParse(values);
    onSubmit(values);
  };

  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="overflow-auto relative h-[87vh] pt-4 ">
          <div className="mr-2 space-y-4 px-1 pb-5">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contract Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={disabled}
                      className="mr-1"
                      placeholder="e.g GAMS"
                      {...field}
                      autoFocus
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="sticky bottom-0 flex gap-2">
            <Button disabled={disabled || false} className="ml-auto w-full">
              {id ? "Save changes" : "Create Contract"}
            </Button>
            {!!id && (
              <Button
                className="w-full flex"
                type="button"
                onClick={handleDelete}
                disabled={disabled}
                variant={"outline"}
              >
                <Trash className="size-4 mr-2" />
                Delete Contract
              </Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
};
