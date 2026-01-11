import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Argon X | Precision, Captured",
  description: "Experience the precision of the Argon X mirrorless camera. Engineered for clarity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body
        className="bg-[#0e0e0e] text-white overflow-x-hidden selection:bg-white/20"
      >
        {children}
      </body>
    </html>
  );
}
