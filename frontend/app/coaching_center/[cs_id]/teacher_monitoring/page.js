import RatingStar from '@/components/ratingStar'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { teacherMonitorDetails } from '@/lib/data'

export default function TeacherMonitoring() {
  return (
    <div className="p-12">
      <div className="p-4 border rounded-lg flex flex-col gap-4 overflow-x-auto">
        <div className="flex flex-row max-md:flex-col max-md:gap-2 items-baseline gap-4">
          <h1 className="text-2xl font-semibold font-poppins">
            Teacher Monitoring
          </h1>
          <span className="text-gray-400">345 Teachers</span>
        </div>
        <Table className="overfow-x-auto">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Total Class</TableHead>
              <TableHead>Due Payment</TableHead>
              <TableHead className="text-right">Ratings</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teacherMonitorDetails.map((teacher, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {teacher.teacher_name}
                </TableCell>
                <TableCell>{teacher.total_class}</TableCell>
                <TableCell>{teacher.due_payment}</TableCell>
                <TableCell className="text-right flex justify-end gap-2  min-w-[200px]">
                  <RatingStar
                    rating={teacher.rating}
                    className="justify-end"
                  />
                  <span className="font-itim">({teacher.rating})</span>
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
