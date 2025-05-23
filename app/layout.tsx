import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Roxiler Systems - Store Rating App',
  description: 'Created by Shyam Kumar',
  generator: 'NestJs',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
