import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ContractFormValues } from "../types";
import { ContractForm } from "./contract-form";
import { useOpenContract } from "../hooks/use-open-contract";
import { useEditContract } from "../api/use-edit-contract";
import { Loader2 } from "lucide-react";
import { useGetContract } from "../api/use-get-contract";

export const EditContractSheet = () => {
  const { isOpen, onClose, id } = useOpenContract();
  const editMutation = useEditContract(id);
  const contractQuery = useGetContract(id);

  const defaultValues: ContractFormValues = contractQuery.data
    ? {
        name: contractQuery.data.name,
      }
    : {
        name: "",
      };

  const onSubmit = async (values: ContractFormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Contract</SheetTitle>
          <SheetDescription>Edit contract info</SheetDescription>
        </SheetHeader>
        <Separator className="mt-3" />
        {contractQuery.isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <ContractForm
            onSubmit={onSubmit}
            disabled={editMutation.isPending}
            defaultValues={defaultValues}
            id={id}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};
