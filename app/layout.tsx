import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VIB RSS Feed Manager",
  description: "Manage RSS feeds for VIB news sentiment testing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
