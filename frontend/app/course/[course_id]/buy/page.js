import BuyCourseForm from '@/components/buyCourseForm'
import { getCourse } from '@/lib/action'

export default async function Buy({ params }) {
  const { course_id } = await params
  const courseArr = await getCourse(course_id)
  const course = courseArr[0]
  return (
    <div className="p-12">
      <BuyCourseForm course={course} />
    </div>
  )
}
