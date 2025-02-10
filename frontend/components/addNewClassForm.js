'use client'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { addClass } from '@/lib/action'
import { useActionState, useCallback, useState } from 'react'
import Mdeditor from './mdeditor'
import { DateTimePicker } from './ui/date-time-picker-demo'
import { Input } from './ui/input'

const initialState = {
  message: '',
  success: false,
}

export default function AddNewClassForm({ course_id, teachers }) {
  initialState.course_id = course_id
  const [st_date24, setStDate24] = useState()
  const [topics, setTopics] = useState([''])
  const [state, formAction, pending] = useActionState(addClass, initialState)

  const [description, setDescription] = useState('')

  const handleSubmit = useCallback(
    (formData) => {
      const d = new Date(st_date24)
      formData.append('start_time', d.toISOString())
      formAction(formData)
    },
    [st_date24, formAction],
  )

  return (
    <div className="w-full flex justify-center ">
      <div className="h-fit p-8 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 text-darkb flex flex-col gap-6 flex-grow shadow-lg bg-blue-900">
        <h1 className="text-bold text-2xl">Add New Class</h1>
        <form
          className="space-y-4"
          action={handleSubmit}
        >
          <div className="space-y-2">
            <Label htmlFor="start_time">Start Time</Label>
            <div>
              <DateTimePicker
                date={st_date24}
                onSetDate={(date) => setStDate24(date)}
                className="bg-transparent rounded-lg w-full ring-0 border border-gray-500 focus-visible:ring-offset-0 focus-visible:ring-0 "
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>
            <div>
              <Input
                type="text"
                id="duration"
                name="duration"
                placeholder="hh:mm"
                className="bg-transparent rounded-lg w-full ring-0 border border-gray-500 focus-visible:ring-offset-0 focus-visible:ring-0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <div>
              <Input
                type="text"
                id="title"
                name="title"
                placeholder="Class Title"
                className="bg-transparent rounded-lg w-full ring-0 border border-gray-500 focus-visible:ring-offset-0 focus-visible:ring-0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="teacher_id">Teacher</Label>
            <div>
              <Select name="teacher_id">
                <SelectTrigger className="bg-transparent rounded-lg w-full ring-0 border border-gray-500 focus-visible:ring-offset-0 focus-visible:ring-0">
                  <SelectValue placeholder="Select a teacher" />
                </SelectTrigger>
                <SelectContent>
                  {teachers.map((option) => (
                    <SelectItem
                      key={option.id}
                      value={option.id}
                    >
                      {option.name}, {option.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="link">Class Link</Label>
            <div>
              <Input
                type="text"
                id="link"
                name="link"
                placeholder="Class Link"
                className="bg-transparent rounded-lg w-full ring-0 border border-gray-500 focus-visible:ring-offset-0 focus-visible:ring-0"
              />
            </div>
          </div>

          <Mdeditor
            name="description"
            description={description}
            setDescription={setDescription}
          />

          {topics.map((topic, index) => (
            <div
              key={index}
              className="space-y-2"
            >
              <Label htmlFor={`topic-${index}`}>Topic {index + 1}</Label>
              <Input
                type="topic"
                id={`topic-${index}`}
                name={`topic-${index}`}
                value={topic}
                onChange={(e) => {
                  const newEmails = [...topics]
                  newEmails[index] = e.target.value
                  setTopics(newEmails)
                }}
                className="bg-transparent rounded-lg w-full ring-0 border border-gray-500 focus-visible:ring-offset-0 focus-visible:ring-0"
              />
            </div>
          ))}

          <div className="w-full flex items-center justify-center">
            <Button
              onClick={() => setTopics([...topics, ''])}
              type="button"
              className="bg-darkb"
            >
              {' '}
              + Add Topic
            </Button>
          </div>

          {state?.message && (
            <Alert variant={state?.success ? 'default' : 'destructive'}>
              <AlertDescription>{state?.message}</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            className="w-full bg-darkb"
            disabled={pending}
          >
            {pending ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      </div>
    </div>
  )
}
