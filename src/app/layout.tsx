import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastProvider } from "@/components/providers/toaster-provider";
import ConfettiProvider from "@/components/providers/confetti-provider";

import { Toaster } from "@/components/ui/toaster";

const font = Montserrat({ subsets: ["latin"] });

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
    <ClerkProvider>
      <html lang="fr">
        <body className={font.className}>
          <ToastProvider />
          <ConfettiProvider />
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
