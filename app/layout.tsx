import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// NOTE: I set a default metadataBase below. If you deploy to a different
// domain, update `metadataBase` accordingly.
export const metadataBase = new URL("https://branchbouncer.dev");

export const metadata: Metadata = {
  title: "BranchBouncer",
  description: "Protect your repository from spam and malicious pull requests",
  keywords: [
    "branch protection",
    "github",
    "pull request",
    "open source",
    "security",
    "branchbouncer",
  ],
  authors: [{ name: "BranchBouncer", url: "https://github.com/SidhantCodes/branchbouncer" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "BranchBouncer",
    description: "Protect your repository from spam and malicious pull requests",
    url: "https://branchbouncer.dev",
    siteName: "BranchBouncer",
    images: [
      {
        url: "/logo.svg",
        alt: "BranchBouncer Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BranchBouncer",
    description: "Protect your repository from spam and malicious pull requests",
    images: ["/logo.svg"],
  },
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#ffffff" }, { media: "(prefers-color-scheme: dark)", color: "#000000" }],
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* JSON-LD structured data for Organization/Website */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "BranchBouncer",
              url: metadataBase?.toString() ?? "https://branchbouncer.dev",
              description: metadata.description,
              publisher: {
                "@type": "Organization",
                name: "BranchBouncer",
                url: metadataBase?.toString() ?? "https://branchbouncer.dev",
              },
            }),
          }}
        />

        {children}
      </body>
    </html>
  );
}
