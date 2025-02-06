import MyDashboardSidebar from '@/components/myDashboardSidebar'
import { getUserInfo } from '@/lib/action'
export default async function MyDashboardLayout({ children, params }) {
  const { cs_id } = await params
  const userInfo = await getUserInfo()
  return <MyDashboardSidebar user={userInfo}>{children}</MyDashboardSidebar>
}
