"use client";

import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
};

export const Actions = ({ id }: Props) => {
  const router = useRouter();

  return (
    <div className="flex justify-end">
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button
            className=""
            variant={"ghost"}
            size={"icon"}
            onClick={() => router.push(`/leads/edit-lead/${id}`)}
          >
            <Edit className="size-4 text-primary" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Edit App Template</TooltipContent>
      </Tooltip>
    </div>
  );
};
