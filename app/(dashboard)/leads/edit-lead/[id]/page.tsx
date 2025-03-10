"use client";

import LeadForm from "@/features/lead/components/lead-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useParams, useRouter } from "next/navigation";

import { LeadFormValues } from "@/features/lead/types";
import { useGetLead } from "@/features/lead/api/use-get-lead";
import { useEditLead } from "@/features/lead/api/use-edit-lead";
import Header from "../../header";

const EditLeadPage = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const leadQuery = useGetLead(params.id);
  const leadMutation = useEditLead(params.id);

  console.log(params.id);

  const onSubmit = (values: LeadFormValues) => {
    leadMutation.mutate(values, {
      onSuccess: () => {
        router.push(`/leads`);
      },
    });
  };

  const leadData = leadQuery.data;

  if (leadQuery.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1 text-primary flex items-center gap-1">
            <Header title="Edit Lead" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LeadForm
            onSubmit={onSubmit}
            defaultValues={{
              firstName: leadData?.firstName || "" || "",
              lastName: leadData?.lastName || "",
              address1: leadData?.address1 || "",
              address2: leadData?.address2 || "",
              city: leadData?.city || "",
              state: leadData?.state || "",
              county: leadData?.county || "",
              customerType: leadData?.county || "residential",
              mailingAddress1: leadData?.mailingAddress1 || "",
              mailingAddress2: leadData?.mailingAddress2 || "",
              mailingCity: leadData?.mailingCity || "",
              mailingState: leadData?.mailingState || "",
              mailingZipcode: leadData?.mailingZipcode || "",
              phone: leadData?.phone || "",
              fax: leadData?.fax || "",
              company: leadData?.company || "",
              email: leadData?.email || "",
              politicalSub: leadData?.politicalSub || "",
              zipcode: leadData?.zipcode || "",
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};
export default EditLeadPage;
