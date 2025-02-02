'use client'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { useActionState } from 'react'
import { Input } from './ui/input'
import { Label } from './ui/label'

const initialState = {
  message: '',
  success: false,
}

export default function AnswerSubmissionForm({ type, AnswerSubmissionAction }) {
  const [state, formAction, pending] = useActionState(
    AnswerSubmissionAction,
    initialState,
  )

  return (
    <div className="w-full flex justify-center my-12">
      <div className="h-fit p-8 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 text-darkb flex flex-col gap-6 flex-grow shadow-lg bg-blue-900">
        <h1 className="text-bold text-2xl">Submit {type}</h1>
        <form
          className="space-y-4"
          action={formAction}
        >
          <div className="space-y-2">
            <Label htmlFor="answer_paper">Answer script</Label>
            <div>
              <Input
                type="file"
                id="answer_paper"
                name="answer_paper"
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
