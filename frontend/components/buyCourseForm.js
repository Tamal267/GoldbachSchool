'use client'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useActionState, useState } from 'react'
import { Input } from './ui/input'

const initialState = {
  message: '',
  success: false,
}

export default function BuyCourseForm({ type, ResetPassAction }) {
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
        <h1 className="text-bold text-2xl">Buy Course</h1>
        <div className="flex flex-col text-sm text-gray-500">
          <span>Bkash Marchent No: 01660039763</span>
          <span>Couse Fee: 2000 tk</span>
        </div>
        <form
          className="space-y-4"
          action={formAction}
        >
          <div className="space-y-2">
            <Label htmlFor="institute">Institute</Label>
            <div>
              <Input
                type="text"
                id="institute"
                name="institute"
                placeholder="Institute Name"
                className="bg-transparent rounded-lg w-full ring-0 border border-gray-500 focus-visible:ring-offset-0 focus-visible:ring-0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="promo_code">Promo Code</Label>
            <div>
              <Input
                type="text"
                id="promo_code"
                name="promo_code"
                placeholder="Promo Code"
                className="bg-transparent rounded-lg w-full ring-0 border border-gray-500 focus-visible:ring-offset-0 focus-visible:ring-0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="transaction_id">Transcation ID of Bkash</Label>
            <div>
              <Input
                type="text"
                id="transaction_id"
                name="transaction_id"
                placeholder="Transaction Id"
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
