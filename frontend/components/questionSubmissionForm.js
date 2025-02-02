'use client'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { addExam } from '@/lib/action'
import { useActionState, useCallback, useState } from 'react'
import { DateTimePicker } from './ui/date-time-picker-demo'
import { Input } from './ui/input'
import { Label } from './ui/label'

const initialState = {
  message: '',
  success: false,
}

export default function QuestionSubmissionForm({ course_id }) {
  initialState.course_id = course_id
  const [state, formAction, pending] = useActionState(addExam, initialState)
  const [st_date24, setStDate24] = useState()

  const onSetDate = (date) => {
    setStDate24(date)
  }

  const handleSubmit = useCallback(
    (formData) => {
      const d = new Date(st_date24)
      formData.append('start_time', d.toISOString())
      formAction(formData)
    },
    [st_date24, formAction],
  )

  return (
    <div className="w-full flex justify-center">
      <div className="h-fit p-8 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 text-darkb flex flex-col gap-6 flex-grow shadow-lg bg-blue-900">
        <h1 className="text-bold text-2xl">Submit</h1>
        <form
          className="space-y-4"
          action={handleSubmit}
        >
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <div>
              <Input
                type="text"
                id="title"
                name="title"
                placeholder="Exam title..."
                className="bg-transparent rounded-lg w-full ring-0 border border-gray-500 focus-visible:ring-offset-0 focus-visible:ring-0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="start_time">Start Time</Label>
            <div>
              <div>
                <DateTimePicker
                  date={st_date24}
                  onSetDate={onSetDate}
                  className="bg-transparent rounded-lg w-full ring-0 border border-gray-500 focus-visible:ring-offset-0 focus-visible:ring-0 "
                />
              </div>
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
            <Label htmlFor="question_paper">Question paper</Label>
            <div>
              <Input
                type="file"
                id="question_paper"
                name="question_paper"
                placeholder="Course name..."
                className="bg-transparent rounded-lg w-full ring-0 border border-gray-500 focus-visible:ring-offset-0 focus-visible:ring-0"
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
