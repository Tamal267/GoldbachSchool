import CourseCard from '@/components/courseCard'
import { courses } from '@/lib/data'

export default function BuyNewCourse() {
  return (
    <div className="bg-gray-50">
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
