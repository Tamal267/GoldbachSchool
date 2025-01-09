import MyDashboardSidebar from '@/components/myDashboardSidebar'
export default async function MyDashboardLayout({ children, params }) {
  const { cs_id } = await params
  return <MyDashboardSidebar>{children}</MyDashboardSidebar>
}
