'use client'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useActionState, useState } from 'react'
import { AutosizeTextarea } from './ui/autosize-textarea'
import RatingInput from './ui/ratingInput'

const initialState = {
  message: '',
  success: false,
}

export default function FeedbackForm({ type, ResetPassAction }) {
  const [state, formAction, pending] = useActionState(
    ResetPassAction,
    initialState,
  )
  const [rating, setRating] = useState(0)

  const onRatingChange = (newRating) => {
    setRating(newRating)
  }

  return (
    <div className="w-full flex justify-center my-12 ">
      <div className="h-fit p-8 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 text-darkb flex flex-col gap-6 flex-grow shadow-lg bg-blue-900">
        <h1 className="text-bold text-2xl">Class Review</h1>
        <form
          className="space-y-4"
          action={formAction}
        >
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

          <div className="space-y-2">
            <Label htmlFor="description">Rating</Label>
            <RatingInput onRatingChange={onRatingChange} />
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
