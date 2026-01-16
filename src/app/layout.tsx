import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ali Dereyurt - Portfolio",
  description: "Software Developer & Engineer - Portfolio showcasing my projects and expertise",
  keywords: ["Ali Dereyurt", "Software Developer", "Portfolio", "Projects"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark:bg-black">
      <body className="antialiased bg-white dark:bg-black text-gray-900 dark:text-gray-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
