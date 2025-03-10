"use client";

import { Button } from "@/components/ui/button";

import { useNewContract } from "../hooks/use-new-contract";

export const ContractHeader = () => {
  const { onOpen } = useNewContract();
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-lg font-bold">Contracts</h1>
      <Button onClick={onOpen}> New Contract</Button>
    </div>
  );
};
