import CoachingSidebar from '@/components/coachingSidebar'
import {
  getCoachingCenter,
  getUserInfo,
  isRegisteredAuthor,
} from '@/lib/action'
export default async function CoachingCenterLayout({ children, params }) {
  const { cs_id } = await params
  const [coaching_center, userInfo, registeredAuthor] = await Promise.all([
    getCoachingCenter(cs_id),
    getUserInfo(),
    isRegisteredAuthor(cs_id),
  ])
  return (
    <CoachingSidebar
      coaching_center={coaching_center[0]}
      user={userInfo}
      cs_id={cs_id}
      isRegAuthor={registeredAuthor}
    >
      {children}
    </CoachingSidebar>
  )
}
