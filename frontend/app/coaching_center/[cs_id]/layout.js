import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { Activity, House, MonitorCheck, Soup } from 'lucide-react'
import Link from 'next/link'

const AuthorityNavs = [
  {
    name: 'Dashboard',
    icon: House,
    link: '',
    navCss: 'flex items-center gap-2 hover:bg-gray-200 rounded-lg p-2',
    textClass: 'hidden sm:block',
  },
  {
    name: 'Teacher Monitoring',
    icon: MonitorCheck,
    link: 'teacher_monitoring',
    navCss: 'flex items-center gap-2',
    textClass: 'hidden sm:block',
  },
  {
    name: 'Student Monitoring',
    icon: Activity,
    link: 'student_monitoring',
    navCss: 'flex items-center gap-2',
    textClass: 'hidden sm:block',
  },
  {
    name: 'New Course',
    icon: Soup,
    link: 'new_course',
    navCss: 'flex items-center gap-2',
    textClass: 'hidden sm:block',
  },
]

export default function CoachingCenterLayout({ children, params }) {
  const { cs_id } = params
  return (
    <div>
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-screen max-h-screen w-full rounded-lg border"
      >
        <ResizablePanel defaultSize={20}>
          <div className="flex flex-col h-full  p-6">
            <h1 className="text-xl font-semibold font-poppins">
              ABC Coaching Center
            </h1>
            <div className="flex flex-col mt-6">
              <p className="text-gray-500 text-sm border-b">Authority</p>
              {AuthorityNavs.map((nav, index) => (
                <Link
                  href={`/coaching_center/${cs_id}/${nav.link}`}
                  key={index}
                  className={`flex items-center gap-2 hover:bg-gray-200 rounded-lg p-2`}
                >
                  <nav.icon size={20} />
                  <span className={`hidden sm:block`}>{nav.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>
          <div className="overflow-y-auto h-full">{children}</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
