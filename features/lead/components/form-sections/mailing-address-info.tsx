"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { LeadFormValues } from "../../types";

interface PersonalInfoProps {
  form: UseFormReturn<LeadFormValues>;
}

const MailingAddressInfo = ({ form }: PersonalInfoProps) => {
  return (
    <>
      <div className="sm:col-span-2">
        <FormField
          name="mailingAddress1"
          control={form?.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address 1</FormLabel>
              <FormControl>
                <Input
                  // disabled={isPending}
                  placeholder="Address 1..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="sm:col-span-2">
        <FormField
          name="mailingAddress2"
          control={form?.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address 2</FormLabel>
              <FormControl>
                <Input
                  placeholder="address2..."
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="sm:col-span-2">
        <FormField
          name="mailingCity"
          control={form?.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="city..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="sm:col-span-1">
        <FormField
          name="mailingState"
          control={form?.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <FormControl>
                <Input placeholder="State..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="sm:col-span-1">
        <FormField
          name="mailingZipcode"
          control={form?.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zipcode</FormLabel>
              <FormControl>
                <Input placeholder="Zipcode..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};
export default MailingAddressInfo;
