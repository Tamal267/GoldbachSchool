import { cn } from '@/lib/utils'
import Image from 'next/image'

export default function RatingStar({ rating, className }) {
  let ratingIcons = [
    'empty_star',
    'empty_star',
    'empty_star',
    'empty_star',
    'empty_star',
  ]
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      ratingIcons[i - 1] = 'full_star'
    } else if (rating > i - 1 && rating < i) {
      ratingIcons[i - 1] = 'half_star'
    }
  }

  return (
    <div className={cn("flex flex-row", className)}>
      {ratingIcons.map((icon, index) => (
        <Image
          key={index}
          src={`/Assets/${icon}.svg`}
          alt="Search"
          width={20}
          height={20}
        />
      ))}
    </div>
  )
}
