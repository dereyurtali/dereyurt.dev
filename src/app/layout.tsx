import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

/**
 * Two families, three roles.
 *
 * Archivo is a variable grotesque with both a weight and a width axis, so the
 * condensed poster headings and the body text come from one superfamily — the
 * contrast is proportion and weight, not two competing designs. It also replaces
 * Anton, which shipped a single 400 weight and therefore fell apart at the small
 * sizes the "display" class is used at (project rows, CV entries).
 *
 * latin-ext is required: ASPİLSAN, TÜBİTAK, Vakıf and Zülaloğlu all live there.
 */
const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
  variable: "--font-mono",
  display: "swap",
});

const SITE = "https://ali.dereyurt.dev";
const DESCRIPTION =
  "AI developer building production systems where LLM agents do real work — agentic tool-use, guardrails, and the pipelines that keep them safe.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Ali Dereyurt — AI Developer",
    template: "%s — Ali Dereyurt",
  },
  description: DESCRIPTION,
  applicationName: "Ali Dereyurt",
  authors: [{ name: "Ali Dereyurt", url: SITE }],
  creator: "Ali Dereyurt",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "Ali Dereyurt",
    title: "Ali Dereyurt — AI Developer",
    description: DESCRIPTION,
    locale: "en_US",
    images: [{ url: "/videos/fig-satellite-poster.jpg", width: 1280, height: 720, alt: "Ali Dereyurt — AI developer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ali Dereyurt — AI Developer",
    description: DESCRIPTION,
    images: ["/videos/fig-satellite-poster.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

/**
 * Search engines otherwise have no way to connect this site to the studio the
 * work actually ships from — sameAs/worksFor makes ali.dereyurt.dev ⇄ dnasoft.co
 * one identity rather than two unrelated domains.
 */
const PERSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ali Dereyurt",
  url: SITE,
  jobTitle: "AI Developer",
  description: DESCRIPTION,
  address: { "@type": "PostalAddress", addressLocality: "Istanbul", addressCountry: "TR" },
  email: "mailto:ali@dereyurt.dev",
  sameAs: [
    "https://github.com/dereyurtali",
    "https://www.linkedin.com/in/alidereyurt/",
    "https://dnasoft.co",
  ],
  worksFor: {
    "@type": "Organization",
    name: "DNA Software Solutions",
    url: "https://dnasoft.co",
    email: "mailto:hello@dnasoft.co",
    description:
      "Software studio building AI-native products, multi-tenant SaaS and regulated healthcare systems.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#f7f8f4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${mono.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_LD) }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
