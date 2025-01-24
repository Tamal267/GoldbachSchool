import Logout from '@/components/logout'
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

export default async function Navbar() {
  const cok = await cookies()
  const loggedIn = cok.get('token')
  return (
    <div className="w-full bg-darkb p-4 flex flex-row align-middle justify-between">
      <Link href="/">
        <div className="flex flex-row gap-2 items-center">
          <Image
            src="/Assets/goldback_logo.svg"
            alt="Goldbach School"
            width={50}
            height={50}
          />
          <h1 className="text-white text-2xl font-bold font-itim">
            Goldbach School
          </h1>
        </div>
      </Link>
      <div className="max-lg:hidden">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link
                href="/coaching_centers"
                legacyBehavior
                passHref
              >
                <NavigationMenuLink className="bg-transparent text-white font-poppins">
                  Coaching centers
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-white font-poppins">
                Programs
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Link
                </NavigationMenuLink>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Link
                </NavigationMenuLink>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Link
                </NavigationMenuLink>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Link
                </NavigationMenuLink>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Link
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href="/courses"
                legacyBehavior
                passHref
              >
                <NavigationMenuLink className="bg-transparent text-white font-poppins">
                  Courses
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href="/my_dashboard"
                legacyBehavior
                passHref
              >
                <NavigationMenuLink className="bg-transparent text-white font-poppins p-4">
                  Dashboard
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="max-lg:hidden">
        <NavigationMenu>
          <NavigationMenuList>
            {!loggedIn && (
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white font-poppins border-2 border-blue-400 rounded-full p-4 mr-4">
                  Login
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink
                    href="/login/authority"
                    className={navigationMenuTriggerStyle()}
                  >
                    Authority
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    href="/login/teacher"
                    className={navigationMenuTriggerStyle()}
                  >
                    Teahcer
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    href="/login/student"
                    className={navigationMenuTriggerStyle()}
                  >
                    Student
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )}
            {!loggedIn && (
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent font-poppins text-blue-600 bg-white rounded-full p-4 hover:bg-blue-600 hover:text-white">
                  Signup
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink
                    href="/signup/authority"
                    className={navigationMenuTriggerStyle()}
                  >
                    Authority
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    href="/signup/teacher"
                    className={navigationMenuTriggerStyle()}
                  >
                    Teahcer
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    href="/signup/student"
                    className={navigationMenuTriggerStyle()}
                  >
                    Student
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )}
            {loggedIn && <Logout />}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger className="text-white">
            <Grip />
          </SheetTrigger>
          <SheetContent>
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
            <div className="h-full flex flex-col justify-between">
              <div>
                <div className="py-4">
                  <Link href="/">Coaching centers</Link>
                </div>
                <Separator />
                <Accordion
                  type="single"
                  collapsible
                >
                  <AccordionItem value="programs">
                    <AccordionTrigger>Programs</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {programsList.map((program) => (
                          <li key={program.name}>
                            <Link href={program.link}>{program.name}</Link>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <div className="py-4">
                  <Link href="/">Courses</Link>
                </div>
              </div>

              <div>
                <Accordion
                  type="single"
                  collapsible
                >
                  <AccordionItem value="Login">
                    <AccordionTrigger>Login</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        <li>
                          <Link href="/">Authority</Link>
                        </li>
                        <li>
                          <Link href="/">Teacher</Link>
                        </li>
                        <li>
                          <Link href="/">Student</Link>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <div className="py-4">
                  <Link href="/">Signup</Link>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
