import type { Metadata } from "next";
import { Cairo, Fraunces, Inter } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/components/ui/ToastProvider";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-arabic",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-english",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-english-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Digital Wedding Invitation",
  description:
    "An editorial digital wedding invitation platform. Gold, Platinum & Diamond packages.",
  openGraph: {
    type: "website",
    title: "Digital Wedding Invitation",
    description:
      "Experience a beautifully designed digital wedding invitation platform.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cairo.variable} ${fraunces.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
