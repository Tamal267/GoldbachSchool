'use client'

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { Activity, House, MonitorCheck } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const AuthorityNavs = [
  {
    name: 'All Coaching Centers',
    icon: House,
    link: 'all_coaching_centers',
  },
  {
    name: 'Notifications',
    icon: MonitorCheck,
    link: 'notification',
  },
]

const TeacherNavs = [
  {
    name: 'All Coaching Centers',
    icon: House,
    link: 'all_coaching_centers',
  },
  {
    name: 'Notifications',
    icon: MonitorCheck,
    link: 'notification',
  },
  {
    name: 'Overall Performance',
    icon: Activity,
    link: 'overall_performance',
  },
]

const studentNavs = [
  {
    name: 'All Coaching Centers',
    icon: House,
    link: 'all_coaching_centers',
  },
  {
    name: 'Notifications',
    icon: MonitorCheck,
    link: 'notification',
  },
]

function GetNavs({ type, activeLink, navItems, isCollapsed }) {
  return (
    <div className="flex flex-col mt-6">
      {!isCollapsed && (
        <p className="max-md:hidden text-gray-500 text-sm border-b mb-2">
          {type}
        </p>
      )}
      {navItems.map((nav, index) => (
        <Link
          href={`/my_dashboard/${nav.link}`}
          key={index}
          className={`flex items-center gap-2 hover:bg-gray-200 rounded-lg p-2 ${activeLink === nav.link ? 'text-darkb' : ''}`}
        >
          <nav.icon size={20} />
          {!isCollapsed && <span className="max-md:hidden">{nav.name}</span>}
        </Link>
      ))}
    </div>
  )
}

export default function MyDashboardSidebar({ children }) {
  const pathname = usePathname()
  const segments = pathname.split('/')
  const activeLink = segments[2]
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div>
      <ResizablePanelGroup
        direction="horizontal"
        autoSaveId="persistence"
        className="min-h-screen max-h-screen w-full rounded-lg border"
      >
        <ResizablePanel
          defaultSize={20}
          maxSize={30}
          onResize={(size) => {
            setIsCollapsed(size < 15)
          }}
        >
          <div className="flex flex-col h-full p-6">
            {!isCollapsed && (
              <h1 className="text-xl max-md:hidden font-semibold font-poppins">
                My Dashboard
              </h1>
            )}

            <GetNavs
              navItems={AuthorityNavs}
              activeLink={activeLink}
              type="Authority"
              isCollapsed={isCollapsed}
            />

            <GetNavs
              navItems={TeacherNavs}
              activeLink={activeLink}
              type="Teacher"
              isCollapsed={isCollapsed}
            />

            <GetNavs
              navItems={studentNavs}
              activeLink={activeLink}
              type="Student"
              isCollapsed={isCollapsed}
            />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>
          <div className="overflow-y-auto h-full">
            {isCollapsed && (
              <h1 className="text-xl text-center font-semibold font-poppins p-4 bg-gray-100">
                My Dashboard
              </h1>
            )}
            {children}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
