import { Epilogue, Geist, Geist_Mono, Itim, Poppins } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

const itim = Itim({
  variable: '--font-itim',
  subsets: ['latin'],
  weight: ['400'],
})

const epilogue = Epilogue({
  variable: '--font-epilogue',
  subsets: ['latin'],
  weight: ['400'],
})

export const metadata = {
  title: 'Goldbach School',
  description:
    'Discover a variety of courses offered by many coaching centers. Students can easily find their preferred courses and track their progress on their journey to academic success.',
}

import Navbar from '@/components/navbar'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${itim.variable} ${epilogue.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  )
}
