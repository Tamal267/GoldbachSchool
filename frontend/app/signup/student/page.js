import SignUpPage from "@/components/signupPage";
import { signUp } from "@/lib/action";

export default function AuthoritySignUp() {
  return (
    <SignUpPage type="Student" signUpAction={signUp} />
  )
}
