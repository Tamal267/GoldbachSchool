'use client'

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { Activity, House, MonitorCheck, Soup } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const AuthorityNavs = [
  {
    name: 'Dashboard',
    icon: House,
    link: '',
  },

  {
    name: 'New Course',
    icon: Soup,
    link: 'new_course',
  },
]

const TeacherNavs = [
  {
    name: 'My Courses',
    icon: House,
    link: '',
  },
]

const studentNavs = [
  {
    name: 'My Course',
    icon: MonitorCheck,
    link: '/',
  },
  {
    name: 'New Course',
    icon: Soup,
    link: 'buy_new_course',
  },
  {
    name: 'Progress',
    icon: Activity,
    link: 'student_performance',
  },
]

function GetNavs({ type, cs_id, activeLink, navItems, isCollapsed }) {
  return (
    <div className="flex flex-col mt-6">
      {!isCollapsed && (
        <p className="max-md:hidden text-gray-500 text-sm border-b mb-2">
          {type}
        </p>
      )}
      {navItems.map((nav, index) => (
        <Link
          href={`/coaching_center/${cs_id}/${nav.link}`}
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

export default function CoachingSidebar({
  cs_id,
  children,
  coaching_center,
  user,
  isRegAuthor,
}) {
  const pathname = usePathname()
  const segments = pathname.split('/')
  const activeLink = segments[3]
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
          <div className="flex flex-col h-full p-6 overflow-y-auto">
            {!isCollapsed && (
              <h1 className="text-xl max-md:hidden font-semibold font-poppins">
                {coaching_center.name}
              </h1>
            )}

            {user.type === 'Authority' &&
              isRegAuthor.registered &&
              isRegAuthor.registered > 0 && (
                <GetNavs
                  cs_id={cs_id}
                  navItems={AuthorityNavs}
                  activeLink={activeLink}
                  type="Authority"
                  isCollapsed={isCollapsed}
                />
              )}

            {user.type === 'Teacher' && (
              <GetNavs
                cs_id={cs_id}
                navItems={TeacherNavs}
                activeLink={activeLink}
                type="Teacher"
                isCollapsed={isCollapsed}
              />
            )}

            {user.type === 'Student' && (
              <GetNavs
                cs_id={cs_id}
                navItems={studentNavs}
                activeLink={activeLink}
                type="Student"
                isCollapsed={isCollapsed}
              />
            )}
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>
          <div className="overflow-y-auto h-full">
            {isCollapsed && (
              <h1 className="text-xl text-center font-semibold font-poppins p-4 bg-gray-100">
                {coaching_center.name}
              </h1>
            )}
            {children}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
