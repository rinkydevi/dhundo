import type { Metadata } from 'next'
import { Comfortaa, Caveat } from 'next/font/google'
import './globals.css'

const comfortaa = Comfortaa({ subsets: ['latin'], variable: '--font-comfortaa' })
const caveat = Caveat({ subsets: ['latin'], variable: '--font-caveat' })

export const metadata: Metadata = {
  title: 'Dhundo – Find the Right AI Tool Instantly',
  description:
    'Dhundo matches you to the exact AI tool for your task. Describe what you want to do, get the right tool instantly from 50,000+ AI tools.',
  keywords: ['AI tools', 'AI tool finder', 'find AI tools', 'AI directory', 'best AI tools'],
  openGraph: {
    title: 'Dhundo – Find the Right AI Tool Instantly',
    description: 'Describe your task. Find the right AI tool.',
    url: 'https://dhundo.vercel.app',
    siteName: 'Dhundo',
    type: 'website',
  },
  metadataBase: new URL('https://dhundo.vercel.app'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${comfortaa.variable} ${caveat.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
