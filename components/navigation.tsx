"use client";

import { Codesandbox, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const pathName = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (linkHref: string) => {
    const [linkPath] = linkHref.split("?");
    if (!pathName) return false;
    if (linkPath === "/") return pathName === "/";

    const isPathMatching =
      pathName === linkPath || pathName.startsWith(`${linkPath}/`);

    return isPathMatching;
  };

  return (
    <header className="relative isolate z-10 bg-white">
      <nav className="mx-auto flex w-full items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">PECO - Intake Form</span>
            <Codesandbox className="size-8" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Menu aria-hidden="true" className="size-6" />
          </button>
        </div>

        <div className="lg:flex items-center gap-6 hidden">
          <Link
            href="/"
            className={`text-sm/6 font-semibold text-gray-900 ${
              isActive("/") && "text-indigo-700"
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/leads"
            className={`text-sm/6 font-semibold text-gray-900 ${
              isActive("/leads") && "text-indigo-700"
            }`}
          >
            Leads
          </Link>
          <Link
            href="/contracts"
            className={`text-sm/6 font-semibold text-gray-900 ${
              isActive("/contracts") && "text-indigo-700"
            }`}
          >
            Contracts
          </Link>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" className="text-sm/6 font-semibold text-gray-900">
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
      <div className="lg:hidden">
        <Sheet onOpenChange={setMobileMenuOpen} open={mobileMenuOpen}>
          <SheetContent>
            <SheetHeader className="border-b border-slate-200 pb-2">
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col items-start gap-6 mt-5">
              <a href="#" className="text-sm/6 font-semibold text-gray-900">
                Features
              </a>
              <a href="#" className="text-sm/6 font-semibold text-gray-900">
                Marketplace
              </a>
              <a href="#" className="text-sm/6 font-semibold text-gray-900">
                Company
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
export default Navigation;
