import "./globals.css";

import type { Metadata } from "next";
import { Urbanist } from "next/font/google";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const fontUrbanist = Urbanist({ subsets: ["latin"] });

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
      <body className={fontUrbanist.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
