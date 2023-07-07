import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const fontInter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My store",
  description: "Ecommerce store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={fontInter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
