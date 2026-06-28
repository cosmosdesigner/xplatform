import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "XPlatform Academy",
    template: "%s · XPlatform Academy",
  },
  description:
    "Enterprise courses for AI-assisted development. Learn to work with AI coding agents professionally, safely, and at scale.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="bg-[#080808] text-[#ededed] min-h-full flex flex-col antialiased">
        <QueryProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-[#ededed] focus:text-[#080808] focus:px-4 focus:py-2 focus:rounded-[6px] focus:text-sm focus:font-medium"
          >
            Skip to main content
          </a>
          <main id="main-content" className="flex-1" tabIndex={-1}>
            {children}
          </main>
        </QueryProvider>
      </body>
    </html>
  );
}
