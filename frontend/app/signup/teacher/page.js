import SignUpPage from "@/components/signupPage";
import { signUp } from "@/lib/action";

export default function AuthoritySignUp() {
    return (
      <SignUpPage type="Teacher" signUpAction={signUp} />
    )
  }