import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PancoKuy",
  description: "Platform digital komunitas arm wrestling (panco) Indonesia",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
