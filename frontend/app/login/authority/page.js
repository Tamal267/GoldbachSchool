import LoginPage from '@/components/loginPage'
import { login } from '@/lib/action'
import React from 'react'

export default function AuthorityLogin() {
  return (
    <LoginPage type="Authority" loginAction={login} />
  )
}
