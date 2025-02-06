import CoachingSidebar from '@/components/coachingSidebar'
import { getCoachingCenter, getUserInfo } from '@/lib/action'
export default async function CoachingCenterLayout({ children, params }) {
  const { cs_id } = await params
  const [coaching_center, userInfo] = await Promise.all([getCoachingCenter(cs_id), getUserInfo()])
  return <CoachingSidebar coaching_center={coaching_center[0]} user={userInfo} cs_id={cs_id}>{children}</CoachingSidebar>
}
