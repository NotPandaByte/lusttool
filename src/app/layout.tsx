'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { SessionProvider } from "next-auth/react";
import { Metadata } from 'next';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Laced in Lust',
  description: 'Where passion meets rhythm, and every night becomes an unforgettable experience',
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: 'Laced in Lust',
    description: 'Where passion meets rhythm, and every night becomes an unforgettable experience',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Laced in Lust',
    description: 'Where passion meets rhythm, and every night becomes an unforgettable experience',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Laced in Lust</title>
        <meta name="description" content="Where passion meets rhythm, and every night becomes an unforgettable experience" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
