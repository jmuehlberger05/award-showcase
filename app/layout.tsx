import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Heroboard Demo",
  description: "Zeig mir unsere Helden!",
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
