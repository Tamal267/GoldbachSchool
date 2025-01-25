'use client'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { PasswordInput } from '@/components/ui/password_input'
import { resetPass } from '@/lib/action'
import Image from 'next/image'
import { useActionState } from 'react'

const initialState = {
  message: '',
  success: false,
}

export default function ResetPasswordPage({ email }) {
  initialState.email = email
  const [state, formAction, pending] = useActionState(
    resetPass,
    initialState,
  )
  return (
    <div className="bg-[#526b7f] pt-4">
      <div className="">
        <div className="bg-[url(/Assets/potato.svg)] bg-cover bg-top flex md:flex-row flex-col justify-around items-center p-12 min-h-screen">
          <div className="h-fit p-8 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 text-white flex flex-col gap-6 max-w-md flex-grow shadow-lg">
            <h1 className="text-bold text-2xl">Reset Password</h1>
            <form
              className="space-y-4"
              action={formAction}
            >
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <PasswordInput
                  disabled={false}
                  name="password"
                  className="bg-transparent rounded-lg w-full ring-0 border focus-visible:ring-offset-0 focus-visible:ring-0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm_password">Confirm Password</Label>
                <PasswordInput
                  disabled={false}
                  name="confirm_password"
                  className="bg-transparent rounded-lg w-full ring-0 border focus-visible:ring-offset-0 focus-visible:ring-0"
                />
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
                {pending ? 'Submitting...' : 'Reset Password'}
              </Button>
            </form>
          </div>
          <div className="p-4">
            <Image
              src="/Assets/reset_pass.svg"
              alt="logo"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
