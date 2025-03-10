import { LeadHeader } from "@/features/lead/components/lead-header";
import LeadsList from "@/features/lead/components/list";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default async function LeadsPage() {
  return (
    <div className="">
      <div className="mx-auto w-full pb-10">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <LeadHeader />
          </CardHeader>
          <CardContent>
            <LeadsList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
