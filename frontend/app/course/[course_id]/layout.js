import CourseSidebar from '@/components/courseSidebar'
import { getCourse, viewContents } from '@/lib/action'
export default async function CoachingCenterLayout({ children, params }) {
  const { course_id } = await params
  const course = await getCourse(course_id)
  const contents = await viewContents(course_id)
  return (
    <CourseSidebar
      course={course[0]}
      contents={contents}
      course_id={course_id}
    >
      {children}
    </CourseSidebar>
  )
}
