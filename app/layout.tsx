import React, { ReactNode } from "react";

// NEXT.JS
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// INTERNAL
import AuthProvider from "@/providers/AuthProvider";
import ApplicationHeader from "@/components/ApplicationHeader/ApplicationHeader";
// STYLES
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Force of Faith",
  description:
    "Stream content from your favorite churches in one centralized location for a low price.",
  robots: "index, follow",
};

const RootChildren = React.memo(({ children }: { children: ReactNode }) => (
  <>
    <ApplicationHeader />
    {children}
  </>
));

RootChildren.displayName = "Root Children";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <RootChildren>{children}</RootChildren>
        </AuthProvider>
      </body>
    </html>
  );
}
