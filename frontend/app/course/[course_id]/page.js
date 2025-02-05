import MarkdownRender from '@/components/markdownRenderer'
import { Button } from '@/components/ui/button'
import { getCourse, isRegistered } from '@/lib/action'
import { BookOpenCheck, FileSpreadsheet, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default async function Course({ params }) {
  const { course_id } = await params
  const courseArr = await getCourse(course_id)
  const course = courseArr[0]
  const isReg = await isRegistered(course_id)

  return (
    <div className="p-12">
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex flex-col gap-4 flex-grow">
          <div>
            <Image
              src={course.image}
              alt={course.name}
              width={1400}
              height={1000}
              className="w-full h-auto"
            />
          </div>
          <div>
            <h1 className="text-3xl font-poppins">{course.name}</h1>
          </div>
          <div className="flex flex-row gap-8">
            <div className="flex flex-row gap-2 items-center">
              <FileSpreadsheet
                size={20}
                className="text-blue-700"
              />
              <span>{course.total_classes} Classes</span>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <BookOpenCheck
                size={20}
                className="text-blue-700"
              />
              <span>{course.total_exams} Exams</span>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <User
                size={20}
                className="text-blue-700"
              />
              <span>{course.total_students} Students</span>
            </div>
          </div>
          <hr className="w-full" />
          <div className="space-y-2">
            <h1 className="text-xl font-epilogue font-semibold text-darkb">
              Description
            </h1>
            {/* <p className="text-gray-700">{course.description}</p> */}
            <MarkdownRender content={course.description} />
          </div>
        </div>
        {!(
          isReg.registered > 0 ||
          isReg.type === 'Authority' ||
          isReg.type === 'Teacher'
        ) && (
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
              <h1 className="font-bold font-poppins">{course.name}</h1>
              <span className="text-sm text-gray-500">{course.program}</span>
            </div>
            <div className="text-sm flex justify-between text-blue-900">
              <span>Enrolled</span>
              <span>{course.total_students}</span>
            </div>
            <div className="text-sm flex justify-between text-blue-900">
              <span>Teachers</span>
              <span>{course.total_teachers}</span>
            </div>
            <div className="text-sm flex justify-between text-blue-900">
              <span>Version</span>
              <span>{course.version}</span>
            </div>
            <div className="text-sm flex justify-between text-blue-900">
              <span>Course Fee</span>
              <span>{course.course_fee} ৳</span>
            </div>
            <Link
              href={`/course/${course_id}/buy`}
              className="w-full"
            >
              <Button className="text-white bg-darkb w-full">Buy Now</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
