'use client'

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import {
  DraftingCompass,
  ListCollapse,
  NotepadText,
  NotepadTextDashed,
  PackagePlus,
  Plus,
  Presentation,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const TeacherNavs = [
  {
    name: 'Add New Class',
    icon: PackagePlus,
    link: 'add_new_class',
  },
  {
    name: 'Add New Exam',
    icon: Plus,
    link: 'add_new_exam',
  },
  {
    name: 'Script Evalution',
    icon: DraftingCompass,
    link: 'script_evaluation',
  },
]

const globalSectoins = [
  {
    name: 'Details',
    icon: ListCollapse,
    link: '',
  },
  {
    name: 'Teachers',
    link: 'teachers',
    icon: Users,
  },
  {
    name: 'Routine',
    icon: NotepadText,
    link: 'routine',
  },
]

const content = [
  {
    name: 'Introduction',
    id: '21323df21',
    type: 'class',
  },
  {
    name: 'Chapter 1',
    id: '21323df22',
    type: 'class',
  },
  {
    name: 'Exam on Chapter 1',
    id: '21323df23',
    type: 'exam',
  },
  {
    name: 'Chapter 2',
    id: '21323df24',
    type: 'class',
  },
  {
    name: 'Exam on Chapter 2',
    id: '21323df25',
    type: 'exam',
  },
  {
    name: 'Chapter 3',
    id: '21323df26',
    type: 'class',
  },
  {
    name: 'Exam on Chapter 3',
    id: '21323df27',
    type: 'exam',
  },
  {
    name: 'Chapter 4',
    id: '21323df28',
    type: 'class',
  },
  {
    name: 'Exam on Chapter 4',
    id: '21323df29',
    type: 'exam',
  },
  {
    name: 'Chapter 5',
    id: '21323df30',
    type: 'class',
  },
  {
    name: 'Exam on Chapter 5',
    id: '21323df31',
    type: 'exam',
  },
  {
    name: 'Chapter 6',
    id: '21323df32',
    type: 'class',
  },
  {
    name: 'Exam on Chapter 6',
    id: '21323df33',
    type: 'exam',
  },
  {
    name: 'Chapter 7',
    id: '21323df34',
    type: 'class',
  },
  {
    name: 'Exam on Chapter 7',
    id: '21323df35',
    type: 'exam',
  },
  {
    name: 'Chapter 8',
    id: '21323df36',
    type: 'class',
  },
  {
    name: 'Exam on Chapter 8',
    id: '21323df37',
    type: 'exam',
  },
  {
    name: 'Chapter 9',
    id: '21323df38',
    type: 'class',
  },
  {
    name: 'Exam on Chapter 9',
    id: '21323df39',
    type: 'exam',
  },
  {
    name: 'Chapter 10',
    id: '21323df40',
    type: 'class',
  },
  {
    name: 'Exam on Chapter 10',
    id: '21323df41',
    type: 'exam',
  },
]

function GetNavs({ type, course_id, activeLink, navItems, isCollapsed }) {
  return (
    <div className="flex flex-col my-4">
      {navItems.map((nav, index) => (
        <Link
          href={`/course/${course_id}/${nav.link}`}
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

function GetContentNavs({
  type,
  course_id,
  activeLink,
  navItems,
  isCollapsed,
}) {
  return (
    <div className="flex flex-col mt-6">
      {!isCollapsed && (
        <p className="max-md:hidden text-gray-500 text-sm border-b mb-2">
          {type}
        </p>
      )}
      {navItems.map((nav, index) => (
        <Link
          href={`/course/${course_id}/${nav.type}/${nav.id}`}
          key={index}
          className={`flex items-center gap-2 hover:bg-gray-200 rounded-lg p-2 ${activeLink === nav.id ? 'text-darkb' : ''}`}
        >
          {nav.type == 'exam' && (
            <NotepadTextDashed
              size={20}
              className="text-red-500"
            />
          )}
          {nav.type == 'class' && (
            <Presentation
              size={20}
              className="text-blue-500"
            />
          )}
          {!isCollapsed && <span className="max-md:hidden">{nav.title}</span>}
        </Link>
      ))}
    </div>
  )
}

export default function CourseSidebar({
  course_id,
  children,
  course,
  contents,
  isReg,
}) {
  const pathname = usePathname()
  const segments = pathname.split('/')
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
                {course.name}
              </h1>
            )}

            <GetNavs
              course_id={course_id}
              navItems={globalSectoins}
              activeLink={segments[3]}
              type="Global"
              isCollapsed={isCollapsed}
            />

            {((isReg.registered > 0 && isReg.type === 'Authority') ||
              isReg.type === 'Teacher') && <div className="border-b"></div>}

            {((isReg.registered > 0 && isReg.type === 'Authority') ||
              isReg.type === 'Teacher') && (
              <GetNavs
                course_id={course_id}
                navItems={TeacherNavs}
                activeLink={segments[3]}
                type="Teacher"
                isCollapsed={isCollapsed}
              />
            )}

            <GetContentNavs
              course_id={course_id}
              navItems={contents}
              activeLink={segments[4]}
              type="Contents"
              isCollapsed={isCollapsed}
            />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>
          <div className="overflow-y-auto h-full">
            {isCollapsed && (
              <h1 className="text-xl text-center font-semibold font-poppins p-4 bg-gray-100">
                {course.name}
              </h1>
            )}
            {children}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
