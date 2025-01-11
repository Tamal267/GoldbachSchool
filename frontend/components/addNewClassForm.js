'use client'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useActionState, useState } from 'react'
import { AutosizeTextarea } from './ui/autosize-textarea'
import { DateTimePicker } from './ui/datetime-picker'
import { Input } from './ui/input'

const initialState = {
  message: '',
  success: false,
}

export default function AddNewClassForm({ type, ResetPassAction }) {
  const [st_date24, setStDate24] = useState(new Date())
  const [end_date24, setEndDate24] = useState(new Date())
  const [topics, setTopics] = useState([''])
  const [state, formAction, pending] = useActionState(
    ResetPassAction,
    initialState,
  )

  return (
    <div className="w-full flex justify-center ">
      <div className="h-fit p-8 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 text-darkb flex flex-col gap-6 flex-grow shadow-lg bg-blue-900">
        <h1 className="text-bold text-2xl">Add New Class</h1>
        <form
          className="space-y-4"
          action={formAction}
        >
          <div className="space-y-2">
            <Label htmlFor="start_time">Start Time</Label>
            <div>
              <DateTimePicker
                hourCycle={24}
                value={st_date24}
                onChange={setStDate24}
                className="bg-transparent rounded-lg w-full ring-0 border border-gray-500 focus-visible:ring-offset-0 focus-visible:ring-0"
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
                placeholder="Class Duration"
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

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <div>
              <AutosizeTextarea
                placeholder="Write opinion"
                className="bg-transparent rounded-lg w-full ring-0 border border-gray-500 focus-visible:ring-offset-0 focus-visible:ring-0 "
                maxHeight={500}
              />
            </div>
          </div>

          {topics.map((topic, index) => (
            <div
              key={index}
              className="space-y-2"
            >
              <Label htmlFor={`instructor-${index}`}>Topic {index + 1}</Label>
              <Input
                type="topic"
                id={`instructor-${index}`}
                name={`instructor-${index}`}
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
