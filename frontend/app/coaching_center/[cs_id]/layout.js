import CoachingSidebar from '@/components/coachingSidebar'
export default async function CoachingCenterLayout({ children, params }) {
  const { cs_id } = await params
  return <CoachingSidebar cs_id={cs_id}>{children}</CoachingSidebar>
}
