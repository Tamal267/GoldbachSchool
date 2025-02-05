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
  title: 'Create Next App',
  description: 'Generated by create next app',
}

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Grip } from 'lucide-react'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import Logout from '@/components/logout'
import Navbar from '@/components/navbar'

const programsList = [
  {
    name: 'Class 1',
    link: '/class-1',
  },
  {
    name: 'Class 2',
    link: '/class-2',
  },
  {
    name: 'Class 3',
    link: '/class-3',
  },
  {
    name: 'Class 4',
    link: '/class-4',
  },
  {
    name: 'Class 5',
    link: '/class-5',
  },
  {
    name: 'Class 6',
    link: '/class-6',
  },
  {
    name: 'Class 7',
    link: '/class-7',
  },
  {
    name: 'Class 8',
    link: '/class-8',
  },
  {
    name: 'Class 9',
    link: '/class-9',
  },
  {
    name: 'Class 10',
    link: '/class-10',
  },
  {
    name: 'Class 11',
    link: '/class-11',
  },
  {
    name: 'Class 12',
    link: '/class-12',
  },
  {
    name: 'Admission Test',
    link: '/admission-test',
  },
]

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
