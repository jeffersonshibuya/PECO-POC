"use client";
import { EditContractSheet } from "@/features/contract/components/edit-contract-sheet";
import { NewContractSheet } from "@/features/contract/components/new-contract-sheet";
import { useMountedState } from "react-use";

export const SheetProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <NewContractSheet />
      <EditContractSheet />
    </>
  );
};
