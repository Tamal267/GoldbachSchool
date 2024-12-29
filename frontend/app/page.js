'use client'
import CourseCard from '@/components/courseCard'
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards'
import { Input } from '@/components/ui/input'
import { TypewriterEffect } from '@/components/ui/typewriter-effect'
import { Label } from '@radix-ui/react-label'
import { motion } from 'framer-motion'
import { Book } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

const scaleUpVarient = {
  hidden: { scale: 0.5, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1, ease: 'easeInOut' },
  },
}

const leftToRightVarient = {
  hidden: { x: -100, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { duration: 1, ease: 'easeOut' } },
}

const rightToLeftVarient = {
  hidden: { x: 100, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { duration: 1, ease: 'easeOut' } },
}

const bottomToTopParentVarient = {
  hidden: { y: 100, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: 'easeInOut',
      staggerChildren: 0.25,
    },
  },
}

const bottomToTopVarient = {
  hidden: { y: 100, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: 'easeInOut',
    },
  },
}

const topToBottomVarient = {
  hidden: { y: -100, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: 'easeInOut',
    },
  },
}

const parantsSay = [
  {
    name: 'Md Kader Islam',
    title: 'Father of Shovo Islam',
    quote:
      "We've seen a significant boost in our child's confidence and skills. The platform offers excellent resources, and the teaching methods are effective. Truly a valuable experience!",
  },
  {
    name: 'Hossain Ahmed',
    title: 'Father of Naim Khan',
    quote:
      'Great experience! The courses are well-organized, and the instructors are dedicated. Our child has grown academically and personally. We’re extremely satisfied with the progress made.',
  },
  {
    name: 'Mr Halim Hossain',
    title: 'Father of Nipa Khanom',
    quote:
      'Lorem ipsum dolor sit amet, elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci nulla pellentesque dignissim enim. Amet consectetur adipiscing',
  },
]

const teamInfo = [
  {
    name: 'Syed Tamal',
    title: 'CSE Student',
    email: 'syetamal@gmail.com',
    phone: '+880 1660039763',
    image: '/Assets/tamal_dp.svg',
  },
  {
    name: 'Nahidur Zaman Tushar',
    title: 'CSE Student',
    email: 'nahidurzaman1903@gamil.com',
    phone: '+880 1309529592',
    image: '/Assets/Tushar_DP.svg',
  },
  {
    name: 'Sakif Shahrear',
    title: 'CSE Student',
    email: 'sakifshahrear@gmail.com',
    phone: '+880 1677343504',
    image: '/Assets/Tushar_DP.svg',
  },
  {
    name: 'Khadiza Khanom Mithela',
    title: 'CSE Student',
    email: 'khadizakhanom8833@gamil.com',
    phone: '+880 1782640945',
    image: '/Assets/Tushar_DP.svg',
  },
  {
    name: 'Shaikh Sabah Taj Shefa',
    title: 'CSE Student',
    email: 'shaikhsabah1990@gmail.com',
    phone: '+880 01769511899',
    image: '/Assets/Tushar_DP.svg',
  },
]

const heroWords = [
  {
    text: 'Find ',
  },
  {
    text: 'The ',
  },
  {
    text: 'Perfect ',
  },
  {
    text: 'Course ',
  },
  {
    text: 'Or ',
  },
  {
    text: 'Coaching ',
  },
  {
    text: 'Center ',
  },
  {
    text: 'Today',
    className: 'text-blue-500 dark:text-blue-500',
  },
]

export default function Home() {
  const searchBoxRef = useRef(null)

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault()
        searchBoxRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className="overflow-x-hidden">
      <div className="bg-[url('/Assets/Background.svg')] bg-cover flex flex-row gap-4 max-md:flex-wrap justify-between p-12 min-h-screen">
        <div className="flex flex-col justify-center items-center space-y-8  flex-grow">
          <div className="max-w-3xl">
            <div className="font-epilogue text-3xl font-extrabold">
              <TypewriterEffect words={heroWords} />
            </div>
          </div>
          <div>
            <div className="space-y-8">
              <Label
                htmlFor="coaching_center"
                className="font-geist-sans text-lg font-medium text-darkb"
              >
                Discover Courses That Match
                <span className="text-red-700"> Your Goals </span>
              </Label>
              <motion.div
                variants={bottomToTopVarient}
                initial="hidden"
                animate="show"
                className="relative rounded-full max-w-md h-full w-full border border-darkb"
              >
                {/* <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-700" /> */}
                <Image
                  src="/Assets/search_icon.svg"
                  alt="Search"
                  width={40}
                  height={40}
                  className="absolute right-0 top-1/2 -translate-y-1/2 h-full aspect-square"
                />
                <Input
                  type="text"
                  ref={searchBoxRef}
                  id="coaching_center"
                  name="coaching_center"
                  placeholder="⌘ + k to search for coaching centers"
                  className="bg-transparent rounded-full pl-4 pr-4 py-2 w-full ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0"
                />
              </motion.div>
            </div>
          </div>
        </div>
        <div className="relative h-fit">
          <motion.div
            variants={scaleUpVarient}
            initial="hidden"
            animate="show"
          >
            <Image
              src="/Assets/LandingStudents.svg"
              alt="Landing Student"
              width={500}
              height={500}
            />
          </motion.div>
          <motion.div
            variants={leftToRightVarient}
            initial="hidden"
            animate="show"
            className="bg-white py-4 px-12 w-fit rounded-full shadow-lg absolute top-0 left-0"
          >
            <h1 className="font-poppins text-4xl text-blue-400">2k+</h1>
            <p>Regular Students</p>
          </motion.div>
          <motion.div
            variants={rightToLeftVarient}
            initial="hidden"
            animate="show"
            className="bg-white py-4 px-12 w-fit rounded-full shadow-lg absolute bottom-0 right-0"
          >
            <h1 className="font-poppins text-4xl text-green-400">3.5k</h1>
            <p>Success Courses</p>
          </motion.div>
        </div>
      </div>
      <div className="bg-[url('/Assets/Background.svg')] bg-cover  p-12 min-h-screen">
        <motion.div
          variants={bottomToTopParentVarient}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amout: 0.3 }}
          className="flex flex-row gap-4 max-md:flex-wrap justify-between"
        >
          <div className="">
            <Image
              src="/Assets/landing_page2.svg"
              alt="Landing Student"
              width={500}
              height={500}
            />
          </div>
          <motion.div
            variants={bottomToTopVarient}
            className="max-w-3xl space-y-8 py-12"
          >
            <h1 className="font-poppins text-3xl font-bold tracking-wide">
              Benefit From Our Online Learning Expertise Achieve{' '}
              <span className="text-red-500">Your Goals</span>
            </h1>
            <p className="tracking-widest">
              Unlock your potential with our online learning platform. Master
              new skills and achieve your goals with expert-guided courses.
            </p>
            <div className="flex flex-row gap-4">
              <div>
                <p className="font-semibold tracking-wider">Our Mission</p>
                <p>
                  To connect students and learners with top coaching centers and
                  courses, fostering an accessible and inclusive education
                  platform for all.
                </p>
              </div>
              <div>
                <p className="font-semibold tracking-wider">Our Vision</p>
                <p>
                  To revolutionize learning by offering diverse programs, live
                  classes, and performance tracking, empowering students to
                  excel in their careers and passions.
                </p>
              </div>
            </div>
            <Button className="bg-darkb pr-0 rounded-full">
              Learn More
              <Image
                src="/Assets/right_arrow.svg"
                alt="Search"
                width={40}
                height={40}
              />
            </Button>
          </motion.div>
        </motion.div>
      </div>
      <div className="bg-[url('/Assets/Background.svg')] bg-cover flex items-center p-12 min-h-screen">
        <div className="flex flex-row gap-8 max-md:flex-wrap justify-between">
          <motion.div
            variants={topToBottomVarient}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amout: 0.3 }}
          >
            <Card className="h-fit rounded-3xl">
              <CardHeader>
                <CardTitle className="flex flex-col gap-4">
                  <Image
                    src="/Assets/landing_page3_icon1.svg"
                    alt="Search"
                    width={100}
                    height={100}
                  />
                  START COURSE
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Duis aute irure dolor reprehenderit in voluptate velit esse
                  cillum dolore fugiat nulla pariatur. Excepteur
                </p>
              </CardContent>
            </Card>
          </motion.div>
          <Card className="h-fit rounded-3xl bg-[#0C3E64] text-white">
            <CardHeader>
              <CardTitle className="flex flex-col gap-4">
                <motion.div
                  variants={rightToLeftVarient}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amout: 0.3 }}
                >
                  <Image
                    src="/Assets/landing_page3_icon2.svg"
                    alt="Search"
                    width={100}
                    height={100}
                  />
                </motion.div>
                EXPERT TEACHERS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Duis aute irure dolor reprehenderit in voluptate velit esse
                cillum dolore fugiat nulla pariatur. Excepteur
              </p>
            </CardContent>
          </Card>
          <motion.div
            variants={bottomToTopVarient}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amout: 0.3 }}
          >
            <Card className="h-fit rounded-3xl">
              <CardHeader>
                <CardTitle className="flex flex-col gap-4">
                  <Image
                    src="/Assets/landing_page3_icon3.svg"
                    alt="Search"
                    width={100}
                    height={100}
                  />
                  STRATEGI LOCATION
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Duis aute irure dolor reprehenderit in voluptate velit esse
                  cillum dolore fugiat nulla pariatur. Excepteur
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
      <div className="bg-[url('/Assets/Background.svg')] bg-cover flex flex-col gap-12 min-h-screen px-4 py-12">
        <div className="w-full flex justify-center">
          <h1 className="max-w-md text-3xl font-bold font-poppins tracking-wide">
            Top Trending Coaching Centre in Bangladesh
          </h1>
        </div>
        <div className="flex flex-col gap-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 p-10 gap-10">
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
          </div>
          <div className="flex justify-center">
            <Button className="bg-darkb pr-0 rounded-full">
              Explore Coaching Centers
              <Image
                src="/Assets/right_arrow.svg"
                alt="Search"
                width={40}
                height={40}
              />
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-[url('/Assets/Background.svg')] bg-cover flex flex-col justify-center gap-12 px-4 py-12">
        <motion.div
          variants={bottomToTopParentVarient}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amout: 0.3 }}
        >
          <div className="m-12 flex md:flex-row flex-col gap-8 bg-darkb p-12 md:rounded-full rounded-md justify-between">
            <div className="flex flex-row gap-4 items-center">
              <Image
                src="/Assets/landing5_icon1.svg"
                alt="Search"
                width={80}
                height={80}
              />
              <div className="text-white">
                <h1 className="text-3xl font-bold font-poppins">3K+</h1>
                <p>Successfully Trained</p>
              </div>
            </div>
            <div className="flex flex-row gap-4 items-center">
              <Image
                src="/Assets/landing5_icon2.svg"
                alt="Search"
                width={80}
                height={80}
              />
              <div className="text-white">
                <h1 className="text-3xl font-bold font-poppins">15K+</h1>
                <p>Classes Completed</p>
              </div>
            </div>
            <div className="flex flex-row gap-4 items-center">
              <Image
                src="/Assets/landing5_icon3.svg"
                alt="Search"
                width={80}
                height={80}
              />
              <div className="text-white">
                <h1 className="text-3xl font-bold font-poppins">97K+</h1>
                <p>Coaching Centers</p>
              </div>
            </div>
            <div className="flex flex-row gap-4 items-center">
              <Image
                src="/Assets/landing5_icon4.svg"
                alt="Search"
                width={80}
                height={80}
              />
              <div className="text-white">
                <h1 className="text-3xl font-bold font-poppins">102K+</h1>
                <p>Students Community</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="bg-[url('/Assets/Background.svg')] bg-cover flex flex-col gap-12 px-4 py-12">
        <div className="flex flex-col gap-4 items-center">
          <div className="flex flex-row gap-2 text-darkb items-center">
            <Book /> TESTIMONIAL
          </div>
          <h1 className="max-w-md text-3xl font-bold font-poppins tracking-wide">
            Whats Parents Say
          </h1>
        </div>
        <div>
          <InfiniteMovingCards items={parantsSay} />
        </div>
      </div>
      <div className="bg-[url('/Assets/Background.svg')] bg-cover flex flex-col gap-12 min-h-screen px-4 py-12">
        <div className="w-full flex justify-center">
          <h1 className="max-w-md text-3xl font-bold font-poppins tracking-wide">
            Meet Our Team
          </h1>
        </div>
        <div className="">
          <AnimatedTestimonials testimonials={teamInfo} />
        </div>
      </div>
      <div className="bg-black text-white flex flex-col">
        <div className="grid lg:grid-cols-3 gap-4 lg:border-b">
          <div className="flex flex-row gap-4 items-center md:p-12 p-4 md:border-r">
            <Image
              src="/Assets/location.svg"
              alt="Search"
              width={50}
              height={50}
            />
            <div>
              <p className="text-green-500">Address</p>
              <h1 className="font-bold font-poppins">Mirpur DOHS, MIST</h1>
            </div>
          </div>
          <div className="flex flex-row gap-4 items-center md:p-12 p-4 md:border-r">
            <Image
              src="/Assets/phone.svg"
              alt="Phone"
              width={50}
              height={50}
            />
            <div>
              <p className="text-green-500">Phone</p>
              <h1 className="font-bold font-poppins">+880 1309529592</h1>
            </div>
          </div>
          <div className="flex flex-row gap-4 items-center md:p-12 p-4">
            <Image
              src="/Assets/email.svg"
              alt="Search"
              width={50}
              height={50}
            />
            <div>
              <p className="text-green-500">Email</p>
              <h1 className="font-bold font-poppins">admin@goldbach.com</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
            <div className="flex flex-col gap-4 p-12">
              <Image
                src="/Assets/goldback_logo.svg"
                alt="Search"
                width={300}
                height={300}
              />
              <p className="text-justify">
                Interdum velit laoreet id donec ultrices tincidunt arcu.
                Tincidunt tortor aliqua mfacilisi cras fermentum odio eu.
              </p>
              <div className="flex flex-row gap-4 justify-center">
                <Image
                  src="/Assets/facebook.svg"
                  alt="Search"
                  width={50}
                  height={50}
                />
                <Image
                  src="/Assets/instagram.svg"
                  alt="Search"
                  width={50}
                  height={50}
                />
                <Image
                  src="/Assets/pinterest.svg"
                  alt="Search"
                  width={50}
                  height={50}
                />
                <Image
                  src="/Assets/twitter.svg"
                  alt="Search"
                  width={50}
                  height={50}
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 p-12">
              <h1 className="text-lg font-bold font-poppins">Our Services</h1>
              <ul className="list-none space-y-4">
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">&rarr;</span>
                  Top Coaching
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">&rarr;</span>
                  Course Variety
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">&rarr;</span>
                  Live/Recorded Classes
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">&rarr;</span>
                  Certification & Progress
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">&rarr;</span>
                  Online Exam
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-4 p-12">
              <form className="flex flex-col space-y-4">
                <div className="flex flex-col gap-4">
                  <Label
                    htmlFor="email"
                    className="text-white"
                  >
                    Email
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <Label
                    htmlFor="message"
                    className="text-white"
                  >
                    Message
                  </Label>
                  <Input
                    type="text"
                    id="message"
                    name="message"
                    placeholder="Message"
                  />
                </div>
                <Button className="bg-darkb text-white rounded-lg">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
