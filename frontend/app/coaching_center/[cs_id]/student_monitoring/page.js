import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Progress } from '@/components/ui/progress'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { studentMonitorDetails } from '@/lib/data'

export default function StudentMonitoring() {
  return (
    <div className="p-12">
      <div className="p-4 border rounded-lg flex flex-col gap-4">
        <div className="flex flex-row max-md:flex-col max-md:gap-2  items-baseline gap-4">
          <h1 className="text-2xl font-semibold font-poppins">
            Student Monitoring
          </h1>
          <span className="text-gray-400">345 Students</span>
        </div>
        <Table className="overfow-x-auto">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Total Course</TableHead>
              <TableHead className="text-center">Exam Performance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {studentMonitorDetails.map((student, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.total_course}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span className="w-1/6 text-right mr-2">
                      {student.exam_performance}%
                    </span>
                    <div className="w-5/6">
                      <Progress
                        value={student.exam_performance}
                        className="text-darkb"
                      />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
