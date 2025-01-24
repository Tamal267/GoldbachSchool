import LoginPage from '@/components/loginPage'
import { login } from '@/lib/action'

export default function TeacherLogin() {
  return (
    <LoginPage
      type="Teacher"
      loginAction={login}
    />
  )
}
