import OTPPage from '@/components/otpPage'

export default async function OTP({ searchParams }) {
  const sp = await searchParams
  const email = sp.email ? sp.email : ''
  return <OTPPage email={email} />
}
