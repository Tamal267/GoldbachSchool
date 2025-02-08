'use client'
import { updateMark } from '@/lib/action'
import { useActionState, useCallback, useState } from 'react'
import { Alert, AlertDescription } from './ui/alert'
import { Button } from './ui/button'
import { FloatingInput, FloatingLabel } from './ui/floatingInput'

const initialState = {
  message: '',
  success: false,
}

export default function ScriptForm({ row }) {
  const [state, formAction, pending] = useActionState(updateMark, initialState)
  const [mark, setMark] = useState(row.mark || 0)
  const [feedback, setFeedback] = useState(row.feedback || '')

  const handleSubmit = useCallback(
    (formData) => {
      formData.append('student_id', row.student_id)
      formData.append('exam_id', row.exam_id)
      formData.append('course_id', row.course_id)
      formAction(formData)
    },
    [row, formAction],
  )

  return (
    <div>
      <form
        action={handleSubmit}
        className="flex flex-col gap-4"
      >
        <iframe
          src={row.answer_paper}
          className="w-full h-screen"
        />
        <div className="relative">
          <FloatingInput
            id="mark"
            name="mark"
            type="number"
            value={mark}
            onChange={(e) => setMark(e.target.value)}
          />
          <FloatingLabel htmlFor="mark">
            Mark out of {row.total_mark}
          </FloatingLabel>
        </div>
        <div className="relative">
          <FloatingInput
            id="feedback"
            name="feedback"
            type="text"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <FloatingLabel htmlFor="feedback">Feedback</FloatingLabel>
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
          {pending ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </div>
  )
}
