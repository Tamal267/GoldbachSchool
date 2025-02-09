'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PROGRAMS } from '@/lib/data'
import { useActionState, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'

export default function SearchCourse({
  cs_id,
  __program,
  __course,
  searchAction,
}) {
  const [state, formAction, pending] = useActionState(searchAction, {
    cs_id,
  })

  const [program, setProgram] = useState(__program)
  const [course, setCourse] = useState(__course)

  return (
    <div>
      <form
        className="flex md:flex-row flex-col gap-4"
        action={formAction}
      >
        <div className="space-y-2">
          {/* <Label htmlFor="program">Program</Label> */}
          <div>
            <Select
              name="program"
              value={program}
              onValueChange={(value) => setProgram(value)}
            >
              <SelectTrigger className="bg-transparent rounded-lg w-full ring-0 border focus-visible:ring-offset-0 focus-visible:ring-0">
                <SelectValue placeholder="Select a program" />
              </SelectTrigger>
              <SelectContent key="program">
                <SelectItem value="%">All Programs</SelectItem>
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
              id="course"
              name="course"
              placeholder="Course name..."
              className="bg-transparent rounded-lg w-full ring-0 border focus-visible:ring-offset-0 focus-visible:ring-0"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-fit bg-darkb p-4"
          disabled={pending}
        >
          {pending ? 'Searching...' : 'Search'}
        </Button>
      </form>
    </div>
  )
}
