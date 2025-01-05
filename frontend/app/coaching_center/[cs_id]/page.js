import CourseCard from '@/components/courseCard'
import Image from 'next/image'
import React from 'react'

const courses = [
  {
    name: 'Physics',
    program: 'HSC',
    image: '/Assets/class_room_course.svg',
    classes: 10,
    total_time: '19h 30m',
    students: 2000,
    price: 2000,
    rating: 4.5,
  },
  {
    name: 'Chemistry',
    program: 'HSC',
    image: '/Assets/class_room_course.svg',
    classes: 10,
    total_time: '19h 30m',
    students: 2000,
    price: 2000,
    rating: 4.5,
  },
  {
    name: 'Math',
    program: 'HSC',
    image: '/Assets/class_room_course.svg',
    classes: 10,
    total_time: '19h 30m',
    students: 2000,
    price: 2000,
    rating: 4.5,
  },
  {
    name: 'Biology',
    program: 'HSC',
    image: '/Assets/class_room_course.svg',
    classes: 10,
    total_time: '19h 30m',
    students: 2000,
    price: 2000,
    rating: 4.5,
  },
  {
    name: 'English',
    program: 'HSC',
    image: '/Assets/class_room_course.svg',
    classes: 10,
    total_time: '19h 30m',
    students: 2000,
    price: 2000,
    rating: 4.5,
  },
]

export default function CoachingCenter() {
  return (
    <div className="bg-gray-50">
      <div className="flex flex-col items-center justify-center gap-10 p-8">
        <h1 className="text-2xl font-bold text-darkb">Courses</h1>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <CourseCard
              key={index}
              courseInfo={course}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
