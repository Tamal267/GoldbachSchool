import EmptyPage from '@/components/emptyPage'
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
import { viewStudentsRating } from '@/lib/action'

export default async function StudentMonitoring({ params }) {
  const { course_id } = await params
  const studentRatings = await viewStudentsRating(course_id)

  if (!Array.isArray(studentRatings) || studentRatings.length === 0) {
    return <EmptyPage />
  }

  return (
    <div className="p-12">
      <div className="p-4 border rounded-lg flex flex-col gap-4">
        <div className="flex flex-row max-md:flex-col max-md:gap-2  items-baseline gap-4">
          <h1 className="text-2xl font-semibold font-poppins">
            Student Monitoring
          </h1>
          <span className="text-gray-400">
            {studentRatings.length} Students
          </span>
        </div>
        <Table className="overfow-x-auto">
          <TableHeader>
            <TableRow>
              <TableHead>SL NO</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Total Exams</TableHead>
              <TableHead className="text-center">Exam Performance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {studentRatings.length > 0 &&
              studentRatings.map((student, index) => (
                <TableRow key={index}>
                  <TableCell>{student.sl_no}</TableCell>
                  <TableCell className="font-medium">
                    {student.full_name}
                  </TableCell>
                  <TableCell>{student.total_exams}</TableCell>
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
