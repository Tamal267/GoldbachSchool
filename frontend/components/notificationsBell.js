'use client'
import { supabase } from '@/lib/supabase'
import { Bell } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function NotificationsBell({ count, userInfo }) {
  const [notSeen, setNotSeen] = useState(Number(count))
  useEffect(() => {
    const notificationsChannel = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userInfo.id}`,
        },
        (payload) => {
          setNotSeen((prev) => prev + 1)
        },
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userInfo.id}`,
        },
        (payload) => {
          setNotSeen(0)
        },
      )
      .subscribe()

    return () => {
      notificationsChannel.unsubscribe()
    }
  }, [userInfo, notSeen])

  return (
    <div className="flex flex-row gap-2 items-center text-white">
      <Link href="/my_dashboard/notification">
        {notSeen === 0 && <Bell />}
        {notSeen > 0 && (
          <div className="flex flex-row">
            <Bell className="animate-pulse text-blue-400" />
            <sup>{notSeen}</sup>
          </div>
        )}
      </Link>
    </div>
  )
}
