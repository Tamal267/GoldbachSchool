'use client'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useActionState, useState } from 'react'
import { Input } from './ui/input'
import { createCoachingCenter } from '@/lib/action'

const initialState = {
  message: '',
  success: false,
}

export default function CreateNewCoachingCenterForm() {
  const [authorities, setAuthorities] = useState([''])
  const [state, formAction, pending] = useActionState(
    createCoachingCenter,
    initialState,
  )

  return (
    <div className="w-full flex justify-center ">
      <div className="h-fit p-8 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 text-darkb flex flex-col gap-6 flex-grow shadow-lg bg-blue-900">
        <h1 className="text-bold text-2xl">Create Coaching Center</h1>
        <form
          className="space-y-4"
          action={formAction}
        >
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <div>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Name of the coaching center"
                className="bg-transparent rounded-lg w-full ring-0 border border-gray-500 focus-visible:ring-offset-0 focus-visible:ring-0"
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
                placeholder="Class Link"
                className="bg-transparent rounded-lg w-full ring-0 border border-gray-500 focus-visible:ring-offset-0 focus-visible:ring-0"
              />
            </div>
          </div>

          {authorities.map((authority, index) => (
            <div
              key={index}
              className="space-y-2"
            >
              <Label htmlFor={`authority-${index}`}>
                Authority {index + 2}
              </Label>
              <Input
                type="text"
                id={`authority-${index + 1}`}
                name={`authority-${index + 1}`}
                value={authority}
                placeholder="Email of the authority"
                onChange={(e) => {
                  const newAuthorities = [...authorities]
                  newAuthorities[index] = e.target.value
                  setAuthorities(newAuthorities)
                }}
                className="bg-transparent rounded-lg w-full ring-0 border border-gray-500 focus-visible:ring-offset-0 focus-visible:ring-0"
              />
            </div>
          ))}

          <div className="w-full flex items-center justify-center">
            <Button
              onClick={() => setAuthorities([...authorities, ''])}
              type="button"
              className="bg-darkb"
            >
              {' '}
              + Add Authority
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
