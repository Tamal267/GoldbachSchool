import CourseSidebar from '@/components/courseSidebar'
export default async function CoachingCenterLayout({ children, params }) {
  const { course_id } = await params
  return <CourseSidebar course_id={course_id}>{children}</CourseSidebar>
}
