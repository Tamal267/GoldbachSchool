import { FileBadge2, Speech, Users } from 'lucide-react'
import Image from 'next/image'
import { Button } from './ui/button'

export default function CoachingCenterCard({
  coachingCenterInfo
}) {
  const name = coachingCenterInfo.name
  const rating = coachingCenterInfo.rating
  const courses = coachingCenterInfo.courses
  const teachers = coachingCenterInfo.teachers
  const students = coachingCenterInfo.students
  const image = coachingCenterInfo.image
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
    <div className="bg-white/70 rounded-lg flex flex-col gap-4 p-4 shadow-lg">
      <div>
        <Image
          src={image}
          alt="Search"
          width={500}
          height={500}
        />
      </div>
      <div className="flex flex-row justify-left pr-4">
        <div className="flex flex-row">
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
        <span className="font-itim">({rating})</span>
      </div>
      <div>
        <h1 className="font-bold font-poppins text-xl">{name}</h1>
      </div>
      <div className="bg-white flex flex-row gap-4 text-sm p-2 justify-around rounded-md">
        <div className="flex flex-row gap-2 items-center">
          <FileBadge2 size={14} />
          <span>{courses}+ Courses</span>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <Speech size={14} />
          <span>{teachers}+ Teacher</span>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <Users size={14} />
          <span>{students}+ Students</span>
        </div>
      </div>
      <div className="flex justify-center">
        <Button className="bg-darkb p-4 rounded-full">Explore</Button>
      </div>
    </div>
  )
}
