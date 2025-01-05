import { FileBadge2, Speech, Users } from 'lucide-react'
import Image from 'next/image'
import RatingStar from './ratingStar'
import { Button } from './ui/button'

export default function CourseCard({ courseInfo }) {
  const name = courseInfo.name
  const rating = courseInfo.rating
  const program = courseInfo.program
  const classes = courseInfo.classes
  const total_time = courseInfo.total_time
  const students = courseInfo.students
  const price = courseInfo.price
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
          <span>{total_time}</span>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <Users size={14} />
          <span>{students}+ Students</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 items-center">
        <span className="font-bold ">{price} ৳</span>
        <Button className="bg-darkb p-4 rounded-full">Details</Button>
      </div>
    </div>
  )
}
