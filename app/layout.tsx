import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "@/components/Providers";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AskDocAi",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <Providers>
        <html lang="en">
          <body className="min-h-screen font-sans dark bg-gradient-to-r from-background to-slate-700">
            {children}
            {/* <Toaster position="top-center" /> */}
          </body>
        </html>
      </Providers>
    </ClerkProvider>
  );
}
