export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="5QAJCkd_KmfE41" />
      </head>
      <body>{children}</body>
    </html>
  );
}