import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { isRegistered, viewContents } from '@/lib/action'
import { format, isAfter } from 'date-fns'
import { AlarmClock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export default async function Routine({ params }) {
  const { course_id } = await params
  const [contents, isReg] = await Promise.all([
    viewContents(course_id),
    isRegistered(course_id),
  ])
  if (contents.length === 0) {
    return (
      <div className="p-12 flex flex-col gap-4">
        <h1 className="text-2xl font-semibold font-poppins">
          No Routine Available
        </h1>
      </div>
    )
  }
  let firstRow = contents[0]
  for (let i = 0; i < contents.length; i++) {
    if (isAfter(contents[i].start_time, new Date())) {
      firstRow = contents[i]
      break
    }
  }
  return (
    <div className="flex flex-col gap-8 p-12">
      <div className="flex justify-between rounded-full h-12 bg-[#A5C4DB] shadow-lg">
        <div className="flex-grow p-4 flex items-center justify-between gap-4">
          <div className="flex flex-row gap-2 justify-between">
            <AlarmClock /> Next {capitalizeFirstLetter(firstRow.type)}
          </div>
          <div className="font-epilogue">
            {format(
              firstRow.start_time,
              'dd MMM yyyy, HH:mm, EEEE',
            ).toUpperCase()}
          </div>
        </div>
        <Image
          src="/Assets/notificationNav.svg"
          alt="link"
          className="h-full w-auto"
          width={500}
          height={300}
        />
      </div>
      <div className="p-4 border rounded-lg flex flex-col gap-4">
        <div className="flex flex-row items-baseline gap-4">
          <h1 className="text-2xl font-semibold font-poppins">
            Course Routine
          </h1>
        </div>
        <Table className="overfow-x-auto">
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Day</TableHead>
              {isReg.registered > 0 && <TableHead>Class Link</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {contents.map((row, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {capitalizeFirstLetter(row.type)}
                </TableCell>
                <TableCell className="font-medium">{row.title}</TableCell>
                <TableCell>{format(row.start_time, 'dd MMM yyyy')}</TableCell>
                <TableCell>{format(row.start_time, 'HH:mm')}</TableCell>
                <TableCell>{format(row.start_time, 'EEEE')}</TableCell>
                {isReg.registered > 0 && (
                  <TableCell>
                    <Link href={`/course/${course_id}/${row.type}/${row.id}`}>
                      <Image
                        src="/Assets/GoToLink.svg"
                        alt="link"
                        width={80}
                        height={100}
                      />
                    </Link>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
