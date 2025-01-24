import SignUpPage from '@/components/signupPage'
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
import { signUp } from '@/lib/action'
import Image from 'next/image'
import Link from 'next/link'


export default function AuthoritySignUp() {
  return (
    <SignUpPage type="Authority" signUpAction={signUp} />
  )
}
