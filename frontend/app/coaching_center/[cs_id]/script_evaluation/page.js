import ScriptForm from '@/components/scriptForm'
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
import { scriptEvaluation } from '@/lib/data'
import Image from 'next/image'

export default function ScriptEvaluation() {
  return (
    <div className="flex flex-col gap-8 p-12">
      <div className="p-4 border rounded-lg flex flex-col gap-4">
        <div className="flex flex-row items-baseline gap-4">
          <h1 className="text-2xl font-semibold font-poppins">New Scripts</h1>
        </div>
        <Table className="overfow-x-auto">
          <TableHeader>
            <TableRow>
              <TableHead>SL No</TableHead>
              <TableHead>Student Name</TableHead>
              <TableHead>Stuent Email</TableHead>
              <TableHead>Script</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scriptEvaluation.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.sl_no}</TableCell>
                <TableCell>{row.student_name}</TableCell>
                <TableCell>{row.student_email}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger>
                      <Image
                        src="/Assets/openScript.svg"
                        alt="link"
                        width={80}
                        height={100}
                      />
                    </DialogTrigger>
                    <DialogContent className="max-h-screen m-4 overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>View Script</DialogTitle>
                        <ScriptForm row={row} />
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="p-4 border rounded-lg flex flex-col gap-4">
        <div className="flex flex-row items-baseline gap-4">
          <h1 className="text-2xl font-semibold font-poppins">
            Previous Scripts
          </h1>
        </div>
        <Table className="overfow-x-auto">
          <TableHeader>
            <TableRow>
              <TableHead>SL No</TableHead>
              <TableHead>Student Name</TableHead>
              <TableHead>Stuent Email</TableHead>
              <TableHead>Script</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scriptEvaluation.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.sl_no}</TableCell>
                <TableCell>{row.student_name}</TableCell>
                <TableCell>{row.student_email}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger>
                      <Image
                        src="/Assets/openScript.svg"
                        alt="link"
                        width={80}
                        height={100}
                      />
                    </DialogTrigger>
                    <DialogContent className="max-h-screen m-4 overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>View Script</DialogTitle>
                        <ScriptForm row={row} />
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
