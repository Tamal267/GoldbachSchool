'use client'
import { Button } from '@/components/ui/button'
import { logout } from '@/lib/action'
import { useActionState } from 'react'

const initialState = {
  message: '',
  success: false,
}

export default function Logout() {
  const [state, formAction, pending] = useActionState(logout, initialState)
  return (
    <div className="">
      <form
        className="inline"
        action={formAction}
      >
        <Button
          type="submit"
          className="w-full rounded-full"
          disabled={pending}
        >
          {pending ? 'Wait...' : 'Logout'}
        </Button>
      </form>
    </div>
  )
}
