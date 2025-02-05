import CourseCard from '@/components/courseCard'
import { getAllCourses } from '@/lib/action'

export default async function Courses() {
  const allCourses = await getAllCourses()

  if (!Array.isArray(allCourses)) {
    return (
      <div className="p-12">
        <h1>No Course Available</h1>
      </div>
    )
  }
  if (allCourses.length === 0) {
    return (
      <div className="p-12">
        <h1>No Course Available</h1>
      </div>
    )
  }

  const firstColumn = allCourses.filter((_, index) => index % 3 === 0)
  const secondColumn = allCourses.filter((_, index) => index % 3 === 1)
  const thirdColumn = allCourses.filter((_, index) => index % 3 === 2)
  return (
    <div className="bg-gray-50">
      <div className="flex flex-col items-center justify-center gap-10 p-8">
        <h1 className="text-2xl font-bold text-darkb">Courses</h1>
        {allCourses.length === 0 && <p>No courses available</p>}
        {allCourses.length < 3 ? (
          <div className="flex flex-row flex-wrap mt-12 gap-10">
            {allCourses.map((course) => (
              <CourseCard
                course={course}
                key={course.id}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
            <div className="flex flex-col gap-10">
              {firstColumn.map((course) => (
                <CourseCard
                  course={course}
                  key={course.id}
                />
              ))}
            </div>
            <div className="flex flex-col gap-10">
              {secondColumn.map((course) => (
                <CourseCard
                  course={course}
                  key={course.id}
                />
              ))}
            </div>
            <div className="flex flex-col gap-10">
              {thirdColumn.map((course) => (
                <CourseCard
                  course={course}
                  key={course.id}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
