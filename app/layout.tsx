import type { Metadata } from "next";
import "./globals.css";
import ServiceWorkerRegister from "./components/ServiceWorkerRegister";

export const metadata: Metadata = {
  title: "CryptoHost Portal",
  description: "Secure Crypto Processing Platform",
  manifest: "/manifest.json",
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
      <body>
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}