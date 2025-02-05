'use client'
import { teacherPayment } from '@/lib/action'
import { useActionState, useCallback, useState } from 'react'
import { Alert, AlertDescription } from './ui/alert'
import { Button } from './ui/button'
import { FloatingInput, FloatingLabel } from './ui/floatingInput'

const initialState = {
  message: '',
  success: false,
}

export default function TeacherPaymentForm({ row }) {
  console.log('row: ', row)
  const [state, formAction, pending] = useActionState(
    teacherPayment,
    initialState,
  )
  const [payment, setPayment] = useState(row.due_payment || 0)

  const handleSubmit = useCallback(
    (formData) => {
      formData.append('teacher_id', row.teacher_id)
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
        <div className="relative">
          <FloatingInput
            id="payment"
            name="payment"
            type="number"
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
          />
          <FloatingLabel htmlFor="payment">Payment</FloatingLabel>
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
