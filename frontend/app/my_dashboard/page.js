import { redirect } from 'next/navigation'

export default function MyDashboard() {
  redirect('/my_dashboard/all_coaching_centers')
  return <div>MyDashboard</div>
}
