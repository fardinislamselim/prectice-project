import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My First Full Stack App Using Next JS",
  description: "this is my first full stack app using next js",
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
