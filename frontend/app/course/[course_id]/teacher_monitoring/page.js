import EmptyPage from '@/components/emptyPage'
import RatingStar from '@/components/ratingStar'
import TeacherPaymentForm from '@/components/teacherPaymentForm'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { isRegistered, viewTeacherMonitoring } from '@/lib/action'
import { Airplay } from 'lucide-react'

export default async function TeacherMonitoring({ params }) {
  const { course_id } = await params
  const [teacherMonitorDetails, isReg] = await Promise.all([
    viewTeacherMonitoring(course_id),
    isRegistered(course_id),
  ])
  if (
    !Array.isArray(teacherMonitorDetails) ||
    teacherMonitorDetails.length === 0
  ) {
    return <EmptyPage />
  }

  return (
    <div className="p-12">
      <div className="p-4 border rounded-lg flex flex-col gap-4 overflow-x-auto">
        <div className="flex flex-row max-md:flex-col max-md:gap-2 items-baseline gap-4">
          <h1 className="text-2xl font-semibold font-poppins">
            Teacher Performance
          </h1>
          <span className="text-gray-400">
            {teacherMonitorDetails.length} Teachers
          </span>
        </div>
        <Table className="overfow-x-auto">
          <TableHeader>
            <TableRow>
              <TableHead>SL NO</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Total Classes</TableHead>
              {isReg.registered > 0 &&
                (isReg.type === 'Authority' || isReg.type === 'Teacher') && (
                  <TableHead>Paid (tk)</TableHead>
                )}
              {isReg.registered > 0 &&
                (isReg.type === 'Authority' || isReg.type === 'Teacher') && (
                  <TableHead>Due Payment (tk)</TableHead>
                )}
              <TableHead className="text-right">Ratings</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teacherMonitorDetails.length > 0 &&
              teacherMonitorDetails.map((teacher, index) => (
                <TableRow key={index}>
                  <TableCell>{teacher.sl_no}</TableCell>
                  <TableCell className="font-medium">
                    {teacher.full_name}
                  </TableCell>
                  <TableCell>{teacher.email}</TableCell>
                  <TableCell>{teacher.total_classes}</TableCell>

                  {isReg.registered > 0 &&
                    (isReg.type === 'Authority' ||
                      isReg.type === 'Teacher') && (
                      <TableCell>{teacher.paid}</TableCell>
                    )}

                  {isReg.registered > 0 &&
                    (isReg.type === 'Authority' ||
                      isReg.type === 'Teacher') && (
                      <TableCell>
                        {teacher.due_payment}

                        {isReg.type === 'Authority' && (
                          <Dialog>
                            <DialogTrigger className="ml-2 text-darkb">
                              <Airplay size={12} />
                            </DialogTrigger>
                            <DialogContent className="max-h-screen m-4 overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Teacher Payment</DialogTitle>
                                <TeacherPaymentForm row={teacher} />
                              </DialogHeader>
                            </DialogContent>
                          </Dialog>
                        )}
                      </TableCell>
                    )}

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
      </div>
    </div>
  )
}
