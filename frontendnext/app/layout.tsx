import type { Metadata } from "next";
import "./globals.css";
import PageHeader from "@components/PageHeader";
import { inter } from "../fonts";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`}>
      <body>
        <PageHeader />
        {children}
      </body>
    </html>
  );
}
