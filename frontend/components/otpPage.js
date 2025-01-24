'use client'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { Label } from '@/components/ui/label'
import { otpCheck } from '@/lib/action'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useActionState } from 'react'

const initialState = {
  message: '',
  success: false,
}

export default function OTPPage() {
  const [state, formAction, pending] = useActionState(otpCheck, initialState)
  const router = useRouter();
  const {email} = router.query;
  console.log("email: ", email);
  return (
    <div className="bg-[#526b7f] pt-4">
      <div className="">
        <div className="bg-[url(/Assets/potato.svg)] bg-cover bg-top flex md:flex-row flex-col justify-around items-center p-12 min-h-screen">
          <div className="h-fit p-8 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 text-white flex flex-col gap-6 max-w-md flex-grow shadow-lg">
            <h1 className="text-bold text-2xl">OTP</h1>
            <form
              className="space-y-4"
              action={formAction}
            >
              <div className="space-y-2">
                <Label htmlFor="otp">Enter 6 digit OTP</Label>
                <div>
                  <InputOTP
                    maxLength={6}
                    name="otp"
                    className="bg-transparent rounded-lg w-full ring-0 border focus-visible:ring-offset-0 focus-visible:ring-0"
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
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
              src="/Assets/otp.svg"
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
