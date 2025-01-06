import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { routine } from '@/lib/data'
import { AlarmClock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Routine() {
  return (
    <div className="flex flex-col gap-8 p-12">
      <div className="flex justify-between rounded-full h-12 bg-[#A5C4DB] shadow-lg">
        <div className="flex-grow p-4 flex items-center justify-between gap-4">
          <div className="flex flex-row gap-2 justify-between">
            <AlarmClock /> Next Class
          </div>
          <div className="font-epilogue">20 DEC 2024, 12:30, FRIDAY</div>
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
              <TableHead>Class</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Day</TableHead>
              <TableHead>Class Link</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {routine.map((row, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{row.class}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.time}</TableCell>
                <TableCell>{row.day}</TableCell>
                <TableCell>
                  <Link href={row.class_link}>
                    <Image
                      src="/Assets/GoToLink.svg"
                      alt="link"
                      width={80}
                      height={100}
                    />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
