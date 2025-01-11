'use client'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { useActionState } from 'react'

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
          <div className="flex items-center justify-center w-full ">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 "
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-darkb"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold text-darkb">
                    Click to upload
                  </span>{' '}
                  or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or PDF up to 2MB
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
              />
            </label>
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
