import { FileBadge2, Radius, Speech, Users } from 'lucide-react'
import Image from 'next/image'
import { Button } from './ui/button'

export default function CourseCard() {
  return (
    <div className="bg-white/70 rounded-lg flex flex-col gap-4 p-4">
      <div>
        <Image
          src="/Assets/class_room_course.svg"
          alt="Search"
          width={500}
          height={500}
        />
      </div>
      <div className="flex flex-row justify-between">
        <span>⭐⭐⭐⭐⭐</span>
        <span className="text-darkb flex flex-row gap-2 items-center">
          <Radius /> 5.0
        </span>
      </div>
      <div>
        <h1 className="font-bold font-poppins text-xl">
          Udvash Unmesh Coaching Center
        </h1>
      </div>
      <div className="bg-white flex flex-row gap-4 text-sm p-2 justify-around rounded-md">
        <div className="flex flex-row gap-2 items-center">
          <FileBadge2 size={14} />
          <span>100+ Courses</span>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <Speech size={14} />
          <span>10+ Teacher</span>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <Users size={14} />
          <span>200+ Students</span>
        </div>
      </div>
      <div className="flex justify-center">
        <Button className="bg-darkb p-4 rounded-full">Explore</Button>
      </div>
    </div>
  )
}
