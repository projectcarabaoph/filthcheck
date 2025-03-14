import "./globals.css"
import React from "react"
import type { Metadata } from "next"
import { headers } from "next/headers"
import { poppinsSans } from "@/lib/fonts"
import { Toaster } from "@/components/ui/sonner"

export const dynamic = "force-dynamic"


export async function generateMetadata(): Promise<Metadata> {
  const host = (await headers()).get("host")
  return {
    title: "FilthCheck",
    description:
      "A very simple API for detecting Not Safe For Work (NSFW) image content.",
    metadataBase: new URL(`https://${host}`),
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en"
      suppressHydrationWarning>
      <body className={`${poppinsSans.className}`}>
        <Toaster richColors position="top-right" />
        {children}
      </body>
    </html>
  )
}
