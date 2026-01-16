import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ali Dereyurt - Portfolio",
  description: "Software Developer & Engineer - Portfolio showcasing my projects and expertise",
  keywords: ["Ali Dereyurt", "Software Developer", "Portfolio", "Projects"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
