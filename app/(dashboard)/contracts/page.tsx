import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ContractHeader } from "@/features/contract/components/contract-header";
import ContractsList from "@/features/contract/components/list";

const ContractPage = () => {
  return (
    <div className="mx-auto w-full pb-10">
      <Card className="border-none drop-shadow-sm">
        <CardHeader>
          <ContractHeader />
        </CardHeader>
        <CardContent>
          <ContractsList />
        </CardContent>
      </Card>
    </div>
  );
};
export default ContractPage;
