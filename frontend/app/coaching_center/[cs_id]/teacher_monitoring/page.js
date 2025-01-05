import RatingStar from '@/components/ratingStar'
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
      <div className="p-4 border rounded-lg flex flex-col gap-4">
        <div className="flex flex-row items-baseline gap-4">
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
                <TableCell className="text-right flex justify-end gap-2">
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
      </div>
    </div>
  )
}
