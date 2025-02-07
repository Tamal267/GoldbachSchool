'use client'
import { seenNotifications } from '@/lib/action'
import { supabase } from '@/lib/supabase'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'

export default function Notifications({ all_notifications, userInfo }) {
  const [notifications, setNotifications] = useState(all_notifications)
  useEffect(() => {
    const notificationsChannel = supabase
      .channel('view_notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userInfo.id}`,
        },
        (payload) => {
          setNotifications([payload.new, ...notifications])
        },
      )
      .subscribe()

    const updateNotification = async () => {
      await seenNotifications()
    }
    updateNotification()

    return () => {
      notificationsChannel.unsubscribe()
    }
  }, [userInfo, notifications])

  return (
    <div className="p-12">
      <h2 className="text-xl text-gray-700 mb-7">Notifications</h2>
      <ul>
        {notifications.length > 0 &&
          notifications.map((notification, index) => (
            <li
              key={index}
              className="relative flex items-baseline gap-6 pb-5"
            >
              <div className="before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  className="bi bi-circle-fill fill-gray-400"
                  viewBox="0 0 16 16"
                >
                  <circle
                    cx="8"
                    cy="8"
                    r="8"
                  />
                </svg>
              </div>
              <div>
                <div>
                  <span className="text-sm text-gray-600">
                    {format(
                      notification.created_at,
                      'dd MMM yyyy, HH:mm, EEEE',
                    )}
                  </span>
                  {!notification.seen && <Badge className="ml-2 bg-gray-600">New</Badge>}
                </div>
                <p className="mt-2 text-gray-600 ">{notification.message}</p>
              </div>
            </li>
          ))}
      </ul>
      <Button className="mt-10">Load More</Button>
    </div>
  )
}
