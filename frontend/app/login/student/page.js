import LoginPage from '@/components/loginPage'
import { login } from '@/lib/action'

export default function StudentLogin() {
  return (
    <LoginPage
      type="Student"
      loginAction={login}
    />
  )
}
