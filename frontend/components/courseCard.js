import { getBlur } from '@/lib/utils'
import { FileBadge2, Speech, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import RatingStar from './ratingStar'
import { Button } from './ui/button'

export default function CourseCard({ course }) {
  const id = course.id
  const name = course.name
  const rating = course.total_rating ? course.total_rating : 0
  const program = course.program
  const classes = course.total_classes ? course.total_classes : 0
  const teachers = course.total_teachers ? course.total_teachers : 0
  const students = course.total_students ? course.total_students : 0
  const price = course.course_fee
  const image = course.image

  const Blur = getBlur()

  return (
    <div className="bg-white/70 rounded-lg flex flex-col gap-4 p-4 shadow-lg relative h-fit max-w-sm">
      <div className="absolute top-0 right-0 p-2 bg-darkb text-white rounded-tl-lg">
        {program}
      </div>
      <div>
        <Image
          src={image}
          alt="Search"
          width={500}
          height={500}
          placeholder="blur"
          blurDataURL={Blur}
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
          <span>{classes}+ Classes</span>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <Speech size={14} />
          <span>{teachers} Teachers</span>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <Users size={14} />
          <span>{students}+ Students</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 items-center">
        <span className="font-bold ">{price} ৳</span>
        <Link href={`/course/${id}`}>
          <Button className="bg-darkb p-4 rounded-full">Details</Button>
        </Link>
      </div>
    </div>
  )
}
