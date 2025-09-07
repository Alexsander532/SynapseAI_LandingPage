import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/react"
import { ThemeProvider } from "@/contexts/ThemeContext"
import "./globals.css"

export const metadata: Metadata = {
  title: "Synapse AI - Plataforma de Estudos Inteligente",
  description: "Transforme sua experiência acadêmica com organização inteligente, lembretes automáticos e ferramentas de estudo alimentadas por IA.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
