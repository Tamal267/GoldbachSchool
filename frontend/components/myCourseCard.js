import { FileBadge2, Speech } from 'lucide-react'
import Image from 'next/image'
import RatingStar from './ratingStar'
import { Button } from './ui/button'

export default function MyCourseCard({ courseInfo }) {
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
      <div className="bg-white flex flex-row gap-4 text-sm p-2 justify-between rounded-md border-b">
        <div className="flex flex-row gap-2 items-center">
          <FileBadge2 size={14} />
          <span>{classes}+ Classes</span>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <Speech size={14} />
          <span>{total_time}</span>
        </div>
      </div>
      <div className="flex justify-center">
        <Button className="bg-darkb p-4 rounded-full">Details</Button>
      </div>
    </div>
  )
}
