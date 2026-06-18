import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata: Metadata = {
  title: "Kashless - Fast & Hassle-Free Loans for Every Need",
  description: "Personal Loan, Home Loan, LAP, Payday Loan, Vehicle Loan & Business Financing Solutions.",
  icons: {
    icon: "/kashless.png",
    shortcut: "/kashless.png",
    apple: "/kashless.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
