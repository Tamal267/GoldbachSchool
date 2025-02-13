import { getBlur } from '@/lib/utils'
import { FileBadge2, Speech, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import RatingStar from './ratingStar'
import { Button } from './ui/button'

export default function CoachingCenterCard({ coachingCenterInfo }) {
  const name = coachingCenterInfo.name
  const id = coachingCenterInfo.id
  const rating = coachingCenterInfo.total_rating
    ? coachingCenterInfo.total_rating
    : 0
  const courses = coachingCenterInfo.total_courses
    ? coachingCenterInfo.total_courses
    : 0
  const teachers = coachingCenterInfo.total_teachers
    ? coachingCenterInfo.total_teachers
    : 0
  const students = coachingCenterInfo.total_students
    ? coachingCenterInfo.total_students
    : 0
  const image = coachingCenterInfo.image

  const Blur = getBlur()

  return (
    <div className="bg-white/70 rounded-lg flex flex-col gap-4 p-4 shadow-lg h-fit max-w-sm">
      <div>
        <Image
          src={image}
          alt="Search"
          width={500}
          height={500}
          placeholder="blur"
          blurDataURL={Blur}
          className="w-full h-auto aspect-auto"
        />
      </div>
      <div className="flex flex-row justify-left pr-4">
        <RatingStar rating={rating} />
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
      <Link href={`/coaching_center/${id}`}>
        <div className="flex justify-center">
          <Button className="bg-darkb p-4 rounded-full">Explore</Button>
        </div>
      </Link>
    </div>
  )
}
