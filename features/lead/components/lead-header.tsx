"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const LeadHeader = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-lg font-bold">Leads</h1>
      <Button onClick={() => router.push("/leads/new-lead")}> New </Button>
    </div>
  );
};
