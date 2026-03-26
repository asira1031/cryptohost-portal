import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CryptoHost Portal",
  description: "Secure Crypto Processing Platform",
  verification: {
    google: "5QAJCkd_KmfE41zheC9DwVBWGOtz83a-HSXpxumtsjc",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}