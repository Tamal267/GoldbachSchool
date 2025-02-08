import ScriptForm from '@/components/scriptForm'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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
import { getNewScripts, getPrevScripts } from '@/lib/action'
import Image from 'next/image'

export default async function ScriptEvaluation({ params }) {
  const { course_id } = await params
  const [newScripts, prevScripts] = await Promise.all([
    getNewScripts(course_id),
    getPrevScripts(course_id),
  ])
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
            {newScripts &&
              newScripts.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.sl_no}</TableCell>
                  <TableCell>{row.full_name}</TableCell>
                  <TableCell>{row.email}</TableCell>
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
                      <DialogContent className="max-h-screen m-4 overflow-y-auto w-full max-w-6xl">
                        <DialogHeader>
                          <DialogTitle>View Answer Script</DialogTitle>
                          <Accordion
                            type="single"
                            collapsible
                          >
                            <AccordionItem value="item-1">
                              <AccordionTrigger>
                                Question Paper of {row.exam_title} (Total Mark:{' '}
                                {row.total_mark})
                              </AccordionTrigger>
                              <AccordionContent>
                                <iframe
                                  src={row.question_paper}
                                  className="w-full h-screen"
                                />
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                          <ScriptForm row={row} />
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
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
            {prevScripts &&
              prevScripts.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.sl_no}</TableCell>
                  <TableCell>{row.full_name}</TableCell>
                  <TableCell>{row.email}</TableCell>
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
                      <DialogContent className="max-h-screen m-4 overflow-y-auto w-full max-w-6xl">
                        <DialogHeader>
                          <DialogTitle>View Answer Script</DialogTitle>
                          <Accordion
                            type="single"
                            collapsible
                          >
                            <AccordionItem value="item-1">
                              <AccordionTrigger>
                                Question Paper of {row.exam_title} (Total Mark:{' '}
                                {row.total_mark})
                              </AccordionTrigger>
                              <AccordionContent>
                                <iframe
                                  src={row.question_paper}
                                  className="w-full h-screen"
                                />
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                          <ScriptForm row={row} />
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
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
