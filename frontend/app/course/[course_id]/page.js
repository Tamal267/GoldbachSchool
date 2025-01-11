import { Button } from '@/components/ui/button'
import { BookOpenCheck, FileSpreadsheet, Timer, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Course({ params }) {
  const { course_id } = params
  return (
    <div className="p-12">
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex flex-col gap-4">
          <div>
            <Image
              src="/Assets/teacherInClass.jpg"
              alt="Physics"
              width={1400}
              height={1000}
              className="w-full h-auto"
            />
          </div>
          <div>
            <h1 className="text-3xl font-poppins">Physics</h1>
          </div>
          <div className="flex flex-row gap-8">
            <div className="flex flex-row gap-2 items-center">
              <FileSpreadsheet
                size={20}
                className="text-blue-700"
              />
              <span>12 Classes</span>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <BookOpenCheck
                size={20}
                className="text-blue-700"
              />
              <span>12 Exams</span>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <Timer
                size={20}
                className="text-blue-700"
              />
              <span>12h 30m</span>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <User
                size={20}
                className="text-blue-700"
              />
              <span>2k+ Students</span>
            </div>
          </div>
          <hr className="w-full" />
          <div className="space-y-2">
            <h1 className="text-xl font-epilogue font-semibold text-darkb">
              Description
            </h1>
            <p className="text-gray-700">
              Welcome to Grade 10 Mathematics - Algebra Essentials. This class
              is designed to help students excel in algebra with engaging
              lessons, hands-on practice, and personalized guidance. In this
              course, you will explore fundamental topics like linear equations,
              quadratic functions, and graphing techniques. With interactive
              lessons, quizzes, and assignments, you{"'"}ll be well-prepared for
              your upcoming exams.
            </p>
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-epilogue font-semibold text-darkb">
              Topics Covered
            </h1>
            <ul className="list-none list-inside text-gray-700 px-2 space-y-2">
              <li className="flex items-center">
                <span className="mr-2 text-darkb">&rarr;</span>
                Basics of Algebraic Expressions
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-darkb">&rarr;</span>
                Linear Equations and Inequalities
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-darkb">&rarr;</span>
                Quadratic Equations
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-darkb">&rarr;</span>
                Functions and Graphs{' '}
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-darkb">&rarr;</span>
                Real-life Problem Solving{' '}
              </li>
            </ul>
          </div>
        </div>
        <div className="h-fit bg-white/70 rounded-lg flex flex-col gap-4 p-4 shadow-lg ">
          <div>
            <Image
              src="/Assets/Classroom-bro.svg"
              alt="Search"
              width={500}
              height={500}
            />
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold font-poppins">Physics</h1>
            <span className="text-sm text-gray-500">Class 12</span>
          </div>
          <div className="text-sm flex justify-between text-blue-900">
            <span>Enrolled</span>
            <span>2000</span>
          </div>
          <div className="text-sm flex justify-between text-blue-900">
            <span>Teachers</span>
            <span>10</span>
          </div>
          <div className="text-sm flex justify-between text-blue-900">
            <span>Version</span>
            <span>Bn/En</span>
          </div>
          <div className="text-sm flex justify-between text-blue-900">
            <span>Course Fee</span>
            <span>2000 ৳</span>
          </div>
          <Link
            href={`/course/${course_id}/buy`}
            className="w-full"
          >
            <Button className="text-white bg-darkb w-full">Buy Now</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
