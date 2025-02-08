import EmptyPage from '@/components/emptyPage'
import Notifications from '@/components/notifications'
import { getNotifications, getUserInfo } from '@/lib/action'

export default async function Notification() {
  const [notifications, userInfo] = await Promise.all([
    getNotifications(),
    getUserInfo(),
  ])

  if (!Array.isArray(notifications) || notifications.length === 0) {
    return <EmptyPage />
  }

  return (
    <Notifications
      all_notifications={notifications}
      userInfo={userInfo}
    />
  )
}
