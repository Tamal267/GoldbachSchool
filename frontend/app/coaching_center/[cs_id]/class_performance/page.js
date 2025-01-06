import RatingStar from '@/components/ratingStar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { classPerformance } from '@/lib/data'

export default function ClassPerformance() {
  return (
    <div className="p-12">
      <div className="p-4 border rounded-lg flex flex-col gap-4">
        <div className="flex flex-row max-md:flex-col max-md:gap-2 items-baseline gap-4">
          <h1 className="text-2xl font-semibold font-poppins">
            Class Performance
          </h1>
          <span className="text-gray-400">345 Reviews</span>
        </div>
        <Table className="overfow-x-auto">
          <TableHeader>
            <TableRow>
              <TableHead>Class</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Reviews</TableHead>
              <TableHead className="text-right">Ratings</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {classPerformance.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.class}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.reviews}</TableCell>
                <TableCell className="text-right flex justify-end gap-2">
                  <RatingStar
                    rating={row.rating}
                    className="justify-end"
                  />
                  <span className="font-itim">({row.rating})</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
