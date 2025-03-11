import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/providers/query-provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Navigation from "@/components/navigation";
import PageWrapper from "./page-wrapper";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SheetProvider } from "@/providers/sheet-provider";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "PECO Intake Form",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="min-h-screen">
      <body className={`antialiased h-full bg-slate-50`}>
        <QueryProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster richColors expand />
          <TooltipProvider>
            <Navigation />
            <SheetProvider />

            <PageWrapper>
              <NuqsAdapter>
                <Suspense>
                  <div className="p-4 mx-auto">{children}</div>
                </Suspense>
              </NuqsAdapter>
            </PageWrapper>
          </TooltipProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
