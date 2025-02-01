import CoachingSidebar from '@/components/coachingSidebar'
import { getCoachingCenter } from '@/lib/action'
export default async function CoachingCenterLayout({ children, params }) {
  const { cs_id } = await params
  const coaching_center = await getCoachingCenter(cs_id)
  return <CoachingSidebar coaching_center={coaching_center[0]} cs_id={cs_id}>{children}</CoachingSidebar>
}
