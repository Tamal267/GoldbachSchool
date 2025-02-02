'use client'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createCourse } from '@/lib/action'
import { useActionState, useCallback, useState } from 'react'
import { AutosizeTextarea } from './ui/autosize-textarea'
import { DateTimePicker } from './ui/date-time-picker-demo'

const initialState = {
  message: '',
  success: false,
}

const OPTIONS = [
  { label: 'Class 1', value: 'class_1' },
  { label: 'Class 2', value: 'class_2' },
  { label: 'Class 3', value: 'class_3' },
  { label: 'Class 4', value: 'class_4' },
  { label: 'Class 5', value: 'class_5' },
  { label: 'Class 6', value: 'class_6' },
  { label: 'Class 7', value: 'class_7' },
  { label: 'Class 8', value: 'class_8' },
  { label: 'Class 8', value: 'class_9' },
  { label: 'Class 10', value: 'class_10' },
  { label: 'Class 11', value: 'class_11' },
  { label: 'Class 12', value: 'class_12' },
  { label: 'Admissoin', value: 'admission' },
]

export default function NewCourseForm({ coaching_center_id }) {
  initialState.coaching_center_id = coaching_center_id
  const [state, formAction, pending] = useActionState(
    createCourse,
    initialState,
  )
  const [date24, setDate24] = useState()
  const [insEmails, setInsEmails] = useState([''])

  const onSetDate = (date) => {
    setDate24(date)
  }

  const handleSubmit = useCallback(
    (formData) => {
      const d = new Date(date24)
      formData.append('start_time', d.toISOString())
      formAction(formData)
    },
    [date24, formAction],
  )

  return (
    <div className="pt-4">
      <div className="">
        <div className="bg-[url(/Assets/new_course_bg.svg)] bg-cover bg-top flex md:flex-row flex-col justify-around items-center p-12 min-h-screen">
          <div className="h-fit p-8 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 text-black flex flex-col gap-6 max-w-md flex-grow shadow-lg">
            <h1 className="text-bold text-2xl">New Course</h1>
            <form
              className="space-y-4"
              action={handleSubmit}
            >
              <div className="space-y-2">
                <Label htmlFor="program">Program</Label>
                <div>
                  <Select name="program">
                    <SelectTrigger className="bg-transparent rounded-lg w-full ring-0 border focus-visible:ring-offset-0 focus-visible:ring-0">
                      <SelectValue placeholder="Select a program" />
                    </SelectTrigger>
                    <SelectContent>
                      {OPTIONS.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                        >
                          {option.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Course Name</Label>
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

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <div>
                  <AutosizeTextarea
                    placeholder="Write description"
                    name="description"
                    className="bg-transparent rounded-lg w-full ring-0 border focus-visible:ring-offset-0 focus-visible:ring-0 "
                    maxHeight={500}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <div>
                  <Input
                    type="file"
                    id="image"
                    name="image"
                    className="bg-transparent rounded-lg w-full ring-0 border focus-visible:ring-offset-0 focus-visible:ring-0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="version">Version</Label>
                <div>
                  <Select name="version">
                    <SelectTrigger className="bg-transparent rounded-lg w-full ring-0 border focus-visible:ring-offset-0 focus-visible:ring-0">
                      <SelectValue placeholder="Version" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bangla">Bangla</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="start_time">Start Time</Label>
                <div>
                  <DateTimePicker
                    date={date24}
                    onSetDate={onSetDate}
                    className="bg-transparent rounded-lg w-full ring-0 border focus-visible:ring-offset-0 focus-visible:ring-0 "
                  />
                </div>
              </div>

              {insEmails.map((email, index) => (
                <div
                  key={index}
                  className="space-y-2"
                >
                  <Label htmlFor={`instructor-${index}`}>
                    Instructor {index + 1} Email
                  </Label>
                  <Input
                    type="email"
                    id={`instructor-${index}`}
                    name={`instructor-${index}`}
                    value={email}
                    onChange={(e) => {
                      const newEmails = [...insEmails]
                      newEmails[index] = e.target.value
                      setInsEmails(newEmails)
                    }}
                    className="bg-transparent rounded-lg w-full ring-0 border focus-visible:ring-offset-0 focus-visible:ring-0"
                  />
                </div>
              ))}

              <div className="w-full flex items-center justify-center">
                <Button
                  onClick={() => setInsEmails([...insEmails, ''])}
                  type="button"
                >
                  {' '}
                  + Add Instructor
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="per_class_tk">Per Class TK</Label>
                <div>
                  <Input
                    type="number"
                    id="per_class_tk"
                    name="per_class_tk"
                    className="bg-transparent rounded-lg w-full ring-0 border focus-visible:ring-offset-0 focus-visible:ring-0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="per_evaluation_tk">Per Evalution TK</Label>
                <div>
                  <Input
                    type="number"
                    id="per_evaluation_tk"
                    name="per_evaluation_tk"
                    className="bg-transparent rounded-lg w-full ring-0 border focus-visible:ring-offset-0 focus-visible:ring-0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="course_fee">Course Fee</Label>
                <div>
                  <Input
                    type="number"
                    id="course_fee"
                    name="course_fee"
                    className="bg-transparent rounded-lg w-full ring-0 border focus-visible:ring-offset-0 focus-visible:ring-0"
                  />
                </div>
              </div>

              {state?.message && (
                <Alert variant={state?.success ? 'default' : 'destructive'}>
                  <AlertDescription>{state?.message}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={pending}
              >
                {pending ? 'Submitting...' : 'Create Course'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
