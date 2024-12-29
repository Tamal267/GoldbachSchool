import ResetPasswordPage from '@/components/resetPassword'

export default function AuthorityResetPassword() {
  return (
    <ResetPasswordPage
      type="Authority"
      resetPasswordAction="authorityResetPassword"
    />
  )
}
