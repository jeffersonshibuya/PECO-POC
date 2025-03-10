"use client";

import { Button } from "@/components/ui/button";
import { CircleArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  const router = useRouter();

  return (
    <div>
      <h1 className="font-bold text-lg flex items-center gap-2">
        <Button
          variant={"outline"}
          onClick={() => router.push("/leads")}
          className="text-primary"
          size={"icon"}
        >
          <CircleArrowLeftIcon className="size-7 shrink-0" />
        </Button>
        {title}
      </h1>
    </div>
  );
};
export default Header;
