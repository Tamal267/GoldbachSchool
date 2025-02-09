import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PROGRAMS } from '@/lib/data'
import { Button } from './ui/button'
import { Input } from './ui/input'

export default function SearchCourse() {
  return (
    <div>
      <form className="flex md:flex-row flex-col gap-4">
        <div className="space-y-2">
          {/* <Label htmlFor="program">Program</Label> */}
          <div>
            <Select
              name="program"
              required
            >
              <SelectTrigger className="bg-transparent rounded-lg w-full ring-0 border focus-visible:ring-offset-0 focus-visible:ring-0">
                <SelectValue placeholder="Select a program" />
              </SelectTrigger>
              <SelectContent key="program">
                {PROGRAMS.map((option, index) => (
                  <SelectItem
                    key={index}
                    value={option.label}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          {/* <Label htmlFor="name">Course Name</Label> */}
          <div>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Course name..."
              className="bg-transparent rounded-lg w-full ring-0 border focus-visible:ring-offset-0 focus-visible:ring-0"
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-fit bg-darkb p-4 "
        >
          Search
        </Button>
      </form>
    </div>
  )
}
