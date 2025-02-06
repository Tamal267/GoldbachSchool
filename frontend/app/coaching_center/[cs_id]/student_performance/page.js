import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { getUserInfo, studentDashboard } from '@/lib/action'
import Image from 'next/image'
import Link from 'next/link'

export default async function StudentPerformance({ params }) {
  const { cs_id } = await params
  const [userInfo, studentDash] = await Promise.all([
    getUserInfo(),
    studentDashboard(cs_id),
  ])
  let completed = 0
  for (let i = 0; i < studentDash.length; i++) {
    if (studentDash[i].progress >= 100) {
      completed++
    }
  }
  return (
    <div className="p-12 bg-gray-50 min-h-screen">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col lg:flex-row gap-8 w-full justify-between">
          <div className="h-20 rounded-lg bg-[#A5C4DB] flex flex-row justify-between flex-grow max-w-3xl shadow-md">
            <div className="p-4 flex flex-col">
              <h1 className="font-bold text-3xl">
                Hello {userInfo.full_name}!
              </h1>
              <span>It{"'"}s good to see you again.</span>
            </div>
            <div className="w-fit">
              <Image
                src="/Assets/student.svg"
                alt="student"
                width={500}
                height={500}
                className="h-full w-auto"
              />
            </div>
          </div>

          <div className="flex flex-row gap-4 w-fit">
            <div className="h-20 p-4 rounded-lg bg-[#A5C4DB] flex flex-row justify-between gap-2 shadow-md">
              <h1 className="text-4xl font-semibold font-poppins">
                {completed}
              </h1>
              <div className="flex flex-col">
                <span className="text-sm">Course</span>
                <span className="text-sm">Completed</span>
              </div>
            </div>

            <div className="h-20 p-4 rounded-lg bg-[#A5C4DB] flex flex-row justify-between gap-2 shadow-md">
              <h1 className="text-4xl font-semibold font-poppins">
                {studentDash.length - completed}
              </h1>
              <div className="flex flex-col">
                <span className="text-sm">Course</span>
                <span className="text-sm">In Progress</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-epilogue border-b border-darkb font-bold text-darkb">
            Courses
          </h1>

          {studentDash &&
            studentDash.map((course, index) => (
              <div
                key={index}
                className="md:h-20 flex flex-col md:flex-row justify-between rounded-lg shadow-md bg-white items-end"
              >
                <Image
                  src={course.image}
                  alt="teacherInClass"
                  width={500}
                  height={500}
                  className="h-full w-auto"
                />

                <div className="flex flex-col flex-grow justify-between p-4 gap-2 max-md:w-full">
                  <h1 className="text-xl font-poppins">{course.name}</h1>
                  <Progress
                    value={course.progress}
                    className="bg-[#A5C4DB]"
                  />
                </div>

                <Link
                  href={`/course/${course.course_id}`}
                  className="p-4 max-md:w-full"
                >
                  <Button className="bg-[#A5C4DB] text-black w-full hover:bg-white">
                    View Course
                  </Button>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
