import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "EcoWeaver AI - Urban Ecological Planning Platform",
  description: "AI-powered urban ecological planning platform that helps cities understand how development affects canopy-dependent wildlife before construction happens.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
