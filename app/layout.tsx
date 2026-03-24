import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Asira CryptoHost",
  description: "Secure client portal for Asira CryptoHost",
  manifest: "/manifest.json",
  themeColor: "#0b1730",
  icons: {
    icon: "/icon-192.png",
    apple: "/icon-192.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}