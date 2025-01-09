'use client'
import Image from 'next/image'
import { useActionState } from 'react'
import { Alert, AlertDescription } from './ui/alert'
import { Button } from './ui/button'
import { FloatingInput, FloatingLabel } from './ui/floatingInput'

const initialState = {
  message: '',
  success: false,
}

function loginAction() {
  return {
    url: '/api/login',
    method: 'POST',
  }
}

export default function ScriptForm({ row }) {
  const [state, formAction, pending] = useActionState(loginAction, initialState)
  return (
    <div>
      <form
        action={formAction}
        className="flex flex-col gap-4"
      >
        <Image
          src={row.script}
          alt="link"
          width={1000}
          height={1000}
          className="w-full h-auto"
        />
        <div className="relative">
          <FloatingInput
            id="mark"
            name="mark"
          />
          <FloatingLabel htmlFor="mark">Mark</FloatingLabel>
        </div>
        <div className="relative">
          <FloatingInput
            id="feedback"
            name="feedback"
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
