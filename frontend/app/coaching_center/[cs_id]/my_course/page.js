import MyCourseCard from '@/components/myCourseCard'
import { courses } from '@/lib/data'

export default function MyCourse() {
  return (
    <div className="bg-gray-50">
      <div className="flex flex-col items-center justify-center gap-10 p-8">
        <h1 className="text-2xl font-bold text-darkb">My Courses</h1>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <MyCourseCard
              key={index}
              courseInfo={course}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
