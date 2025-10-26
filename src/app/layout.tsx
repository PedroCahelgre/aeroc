import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AeroPizza - Sabor que voa até sua casa!",
  description: "As melhores pizzas delivery da região. Peça online e receba em 30-40 minutos. Qualidade que voa até você!",
  keywords: ["AeroPizza", "Pizza", "Delivery", "Comida", "Pizzaria", "Pedido Online"],
  authors: [{ name: "AeroPizza Team" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "AeroPizza - Sabor que voa até sua casa!",
    description: "As melhores pizzas delivery da região. Peça online e receba em 30-40 minutos.",
    url: "https://aeropizza.example.com",
    siteName: "AeroPizza",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AeroPizza - Sabor que voa até sua casa!",
    description: "As melhores pizzas delivery da região. Peça online e receba em 30-40 minutos.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
