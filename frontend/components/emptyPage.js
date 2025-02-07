import { AlignVerticalSpaceAround } from 'lucide-react'
import Link from 'next/link'

export default function EmptyPage() {
  return (
    <div className="p-12 flex flex-col items-center justify-center gap-4">
      <AlignVerticalSpaceAround />
      <h1>
        Empty page. Go to{' '}
        <Link
          href="/"
          className="text-darkb"
        >
          Home
        </Link>
        . To explore our features please login.
      </h1>
    </div>
  )
}
