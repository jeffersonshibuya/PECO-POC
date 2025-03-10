"use client";

import LeadForm from "@/features/lead/components/lead-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { LeadFormValues } from "@/features/lead/types";
import { useCreateLead } from "@/features/lead/api/use-create-lead";
import { useRouter } from "next/navigation";
import Header from "../header";

const NewLeadPage = () => {
  const router = useRouter();
  const leadMutation = useCreateLead();

  const onSubmit = (values: LeadFormValues) => {
    leadMutation.mutate(values, {
      onSuccess: () => {
        router.push(`/leads`);
      },
    });
  };

  return (
    <div>
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1 text-primary flex items-center gap-1">
            <Header title="Add New Lead" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LeadForm
            onSubmit={onSubmit}
            defaultValues={{
              firstName: "",
              lastName: "",
              address1: "",
              address2: "",
              city: "",
              state: "",
              county: "",
              customerType: "residential",
              mailingAddress1: "",
              mailingAddress2: "",
              mailingCity: "",
              mailingState: "",
              mailingZipcode: "",
              phone: "",
              fax: "",
              company: "",
              email: "",
              politicalSub: "",
              zipcode: "",
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};
export default NewLeadPage;
