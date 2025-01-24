'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PasswordInput } from '@/components/ui/password_input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Image from 'next/image'
import Link from 'next/link'
import { useActionState } from 'react'
import { Alert, AlertDescription } from './ui/alert'

const initialState = {
  message: '',
  success: false,
  type: '',
}

export default function SignUpPage({ type, signUpAction }) {
  initialState.type = type
  const [state, formAction, pending] = useActionState(
    signUpAction,
    initialState,
  )
  return (
    <div className="bg-[#A7C4DA] pt-4">
      <div className="">
        <div className="bg-[url(/Assets/potato.svg)] bg-cover bg-top flex md:flex-row flex-col justify-around items-center p-12 min-h-screen">
          <div className="p-4">
            <Image
              src="/Assets/signup.svg"
              alt="logo"
              width={500}
              height={500}
            />
          </div>
          <div className="p-8 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 shadow-lg text-white flex flex-col gap-6 max-w-md flex-grow">
            <h1 className="text-bold text-2xl">{type} Sign Up</h1>
            <form
              className="space-y-4"
              action={formAction}
            >
              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name</Label>
                <div>
                  <Input
                    type="text"
                    id="full_name"
                    name="full_name"
                    className="bg-transparent rounded-lg w-full ring-0 border focus-visible:ring-offset-0 focus-visible:ring-0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Contact Number</Label>
                <div>
                  <Input
                    type="text"
                    id="phone"
                    name="phone"
                    className="bg-transparent rounded-lg w-full ring-0 border focus-visible:ring-offset-0 focus-visible:ring-0"
                  />
                </div>
              </div>
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
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <PasswordInput
                  disabled={false}
                  name="password"
                  className="bg-transparent rounded-lg w-full ring-0 border focus-visible:ring-offset-0 focus-visible:ring-0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm_password">Confirm Password</Label>
                <PasswordInput
                  name="confirm_password"
                  className="bg-transparent rounded-lg w-full ring-0 border focus-visible:ring-offset-0 focus-visible:ring-0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select name="gender">
                  <SelectTrigger className="bg-transparent rounded-lg w-full ring-0 border focus-visible:ring-offset-0 focus-visible:ring-0">
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
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
                {pending ? 'Submitting...' : 'Sign Up'}
              </Button>
            </form>

            <p>
              Already have an account?{' '}
              <Link
                href={`/login/${type.toLowerCase()}`}
                className="text-darkb"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
