import EmptyPage from '@/components/emptyPage'
import Notifications from '@/components/notifications'
import { getNotifications, getUserInfo } from '@/lib/action'

const notifications = [
  {
    time: '18 Aug 2022 12:00',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores incidunt blanditiis dignissimos, enim earum mollitia.',
  },
  {
    time: '18 Aug 2022 12:00',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores incidunt blanditiis dignissimos, enim earum mollitia.',
  },
  {
    time: '18 Aug 2022 12:00',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores incidunt blanditiis dignissimos, enim earum mollitia.',
  },
  {
    time: '18 Aug 2022 12:00',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores incidunt blanditiis dignissimos, enim earum mollitia. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores incidunt blanditiis dignissimos, enim earum mollitia.',
  },
  {
    time: '18 Aug 2022 12:00',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores incidunt',
  },
]

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
