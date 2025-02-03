import CourseCard from '@/components/courseCard'
import { viewCourses } from '@/lib/action'

export default async function CoachingCenter({ params }) {
  const { cs_id } = await params
  const courses = await viewCourses(cs_id)
  console.log(courses)
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="flex flex-col items-center justify-center gap-10 p-8">
        <h1 className="text-2xl font-bold text-darkb">Courses</h1>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
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
