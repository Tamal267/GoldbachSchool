import ResetPasswordPage from '@/components/resetPassword'

export default async function ResetPassword({ searchParams }) {
  const sp = await searchParams
  const email = sp.email ? sp.email : ''
  return <ResetPasswordPage email={email} />
}
