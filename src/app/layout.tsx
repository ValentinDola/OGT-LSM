import type { Metadata } from "next";
import { Montserrat as FontSans } from "next/font/google";
import "./globals.css";
import "dotenv/config";
import { ClerkProvider } from "@clerk/nextjs";
import { frFR } from "@clerk/localizations";
import { ToastProvider } from "@/components/providers/toaster-provider";
import ConfettiProvider from "@/components/providers/confetti-provider";

import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: `OGT Academy`,
  description: "OGT Academy est votre guide sûr vers la liberté financière.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={frFR}>
      <html>
        <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
          <ToastProvider />
          <ConfettiProvider />
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
