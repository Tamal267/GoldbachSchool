import { FileBadge2, Speech, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import RatingStar from './ratingStar'
import { Button } from './ui/button'

export default function CourseCard({ courseInfo }) {
  const id = courseInfo.id
  const name = courseInfo.name
  const rating = courseInfo.total_rating ? courseInfo.total_rating : 0
  const program = courseInfo.program
  const classes = courseInfo.total_classes ? courseInfo.total_classes : 0
  const teachers = courseInfo.total_teachers ? courseInfo.total_teachers : 0
  const students = courseInfo.total_students ? courseInfo.total_students : 0
  const price = courseInfo.course_fee
  const image = courseInfo.image

  return (
    <div className="bg-white/70 rounded-lg flex flex-col gap-4 p-4 shadow-lg relative">
      <div className="absolute top-0 right-0 p-2 bg-darkb text-white rounded-tl-lg">
        {program}
      </div>
      <div>
        <Image
          src={image}
          alt="Search"
          width={500}
          height={500}
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
          <span>{teachers}</span>
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
