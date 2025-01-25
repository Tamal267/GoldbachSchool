'use client'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { forgetPassword } from '@/lib/action'
import Image from 'next/image'
import { useActionState } from 'react'

const initialState = {
  message: '',
  success: false,
}

export default function ForgetPasswordPage() {
  const [state, formAction, pending] = useActionState(
    forgetPassword,
    initialState,
  )
  return (
    <div className="bg-[#526b7f] pt-4">
      <div className="">
        <div className="bg-[url(/Assets/potato.svg)] bg-cover bg-top flex md:flex-row flex-col justify-around items-center p-12 min-h-screen">
          <div className="h-fit p-8 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 text-white flex flex-col gap-6 max-w-md flex-grow shadow-lg">
            <h1 className="text-bold text-2xl">Forget Password</h1>
            <form
              className="space-y-4"
              action={formAction}
            >
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div>
                  <Input
                    type="text"
                    id="email"
                    name="email"
                    className="bg-transparent rounded-lg w-full ring-0 border focus-visible:ring-offset-0 focus-visible:ring-0"
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
                className="w-full"
                disabled={pending}
              >
                {pending ? 'Submitting...' : 'Continue'}
              </Button>
            </form>
          </div>
          <div className="p-4">
            <Image
              src="/Assets/forget_password.svg"
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
