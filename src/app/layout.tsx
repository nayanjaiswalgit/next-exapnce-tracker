'use client'
import type { Metadata } from "next";
import { Tilt_Neon } from "next/font/google";
import "./globals.css";

const font = Tilt_Neon({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <body className={`  ${font.className}  `}>{children}</body>
      </SessionProvider>

    </html>
  );
}

import { SessionProvider } from "next-auth/react"

