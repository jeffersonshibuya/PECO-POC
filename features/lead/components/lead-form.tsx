"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertLeadSchema } from "@/db/schema";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { LeadFormValues } from "../types";
import CustomerInfo from "./form-sections/customer-info";
import AddressInfo from "./form-sections/address-info";
import { Copy, Loader2, Save } from "lucide-react";
import MailingAddressInfo from "./form-sections/mailing-address-info";
import ContactInfo from "./form-sections/contact-info";
import { useCreateLead } from "../api/use-create-lead";
import { useRouter } from "next/navigation";

interface LeadFormProps {
  id?: string;
  defaultValues: LeadFormValues;
  onSubmit: (values: LeadFormValues) => void;
}

const LeadForm = ({ defaultValues, onSubmit }: LeadFormProps) => {
  const router = useRouter();
  const leadMutation = useCreateLead();

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(insertLeadSchema),
    defaultValues,
  });

  const handleSubmit = (values: LeadFormValues) => {
    insertLeadSchema.safeParse(values);
    onSubmit(values);
  };

  const handleCopyAddressToMailing = () => {
    form.setValue("mailingAddress1", form.getValues("address1"));
    form.setValue("mailingAddress2", form.getValues("address2"));
    form.setValue("mailingCity", form.getValues("city"));
    form.setValue("mailingState", form.getValues("state"));
    form.setValue("mailingZipcode", form.getValues("zipcode"));
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="space-y-12">
            {/* Customer info */}
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-5">
              <div>
                <h2 className="text-base/7 font-semibold text-gray-900">
                  Customer
                </h2>
                <p className="mt-1 text-sm/6 text-gray-600">
                  Customer information
                </p>
              </div>

              <div className="grid w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-4">
                <CustomerInfo form={form} />
              </div>
            </div>

            {/* Address info*/}
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-5">
              <div>
                <h2 className="text-base/7 font-semibold text-gray-900">
                  Address Information
                </h2>
                <p className="mt-1 text-sm/6 text-gray-600">
                  Inform the address information
                </p>
              </div>

              <div className="grid w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8 md:col-span-4">
                <AddressInfo form={form} />
              </div>
            </div>

            {/* Mailing Address */}
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-5">
              <div>
                <h2 className="text-base/7 font-semibold text-gray-900">
                  Mailing Address Information
                </h2>
                <p className="mt-1 text-sm/6 text-gray-600">
                  Inform the address information
                </p>
                <div className="mt-2">
                  <Button
                    onClick={handleCopyAddressToMailing}
                    type="button"
                    className="text-sm flex items-center gap-1"
                    size="sm"
                  >
                    <Copy className="size-3" />
                    Copy from Address
                  </Button>
                </div>
              </div>

              <div className="grid w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8 md:col-span-4">
                <MailingAddressInfo form={form} />
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-5">
              <div>
                <h2 className="text-base/7 font-semibold text-gray-900">
                  Contact Information
                </h2>
                <p className="mt-1 text-sm/6 text-gray-600">
                  Inform the contact information
                </p>
              </div>

              <div className="grid w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8 md:col-span-4">
                <ContactInfo form={form} />
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-2">
            <Button
              variant={"ghost"}
              type="button"
              onClick={() => router.back()}
              className="text-sm/6 font-semibold text-gray-900"
            >
              Cancel
            </Button>
            <Button
              disabled={leadMutation.isPending}
              variant={"default"}
              type="submit"
              className="rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <div className="flex items-center gap-1">
                {leadMutation.isPending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Saving...
                  </>
                ) : (
                  <>
                    <Save className="size-4" />
                    Save
                  </>
                )}
              </div>
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
export default LeadForm;
