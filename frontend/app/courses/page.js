import CourseCard from '@/components/courseCard'
import { getAllCourses } from '@/lib/action'

export default async function Courses() {
  const courses = await getAllCourses()
  console.log(courses)
  return (
    <div className="bg-gray-50">
      <div className="flex flex-col items-center justify-center gap-10 p-8">
        <h1 className="text-2xl font-bold text-darkb">Courses</h1>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {courses.length > 0 &&
            courses.map((course, index) => (
              <CourseCard
                key={index}
                courseInfo={course}
              />
            ))}
        </div>
      </div>
    </div>
  )
}
