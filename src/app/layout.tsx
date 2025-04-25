import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rick & Morty Explorer",
  description: "Explore characters from Rick & Morty using GraphQL",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
