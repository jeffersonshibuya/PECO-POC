import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useNewContract } from "../hooks/use-new-contract";
import { ContractFormValues } from "../types";
import { ContractForm } from "./contract-form";
import { useCreateContract } from "../api/use-create-contract";

export const NewContractSheet = () => {
  const { isOpen, onClose } = useNewContract();
  const mutation = useCreateContract();

  const defaultValues: ContractFormValues = {
    name: "",
  };

  const onSubmit = async (values: ContractFormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New Contract</SheetTitle>
          <SheetDescription>Create a new contract</SheetDescription>
        </SheetHeader>
        <Separator className="mt-3" />
        <ContractForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={defaultValues}
        />
      </SheetContent>
    </Sheet>
  );
};
