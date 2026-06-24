import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata: Metadata = {
  title: "Kashless - Get a Fully Online Loan in India",
  description: "Kashless helps users and operators manage fully online loan journeys with a fast, accessible, token-driven web experience.",
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
