import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PancoKuy",
  description: "Platform komunitas arm wrestling berbasis web",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
