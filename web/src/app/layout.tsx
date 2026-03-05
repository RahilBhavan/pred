import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pred | Liquidity Engine for Prediction Markets",
  description: "High-performance, non-custodial market making bot for the Pred CLOB on Base.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ scrollBehavior: 'smooth' }}>
      <body>
        {children}
      </body>
    </html>
  );
}
