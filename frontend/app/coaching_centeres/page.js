import CoachingCenterCard from '@/components/coachingCenterCard'
import SearchCoachingCenter from '@/components/searchCoachingCenter'

const coachingCenters = [
  {
    name: 'Retina Coaching Center',
    image: '/Assets/class_room_course.svg',
    location: 'Mirpur DOHS, MIST',
    rating: 4.6,
    students: 2000,
    teachers: 50,
    courses: 10,
  },
  {
    name: 'Udvash Unmesh Coaching Center',
    image: '/Assets/class_room_course.svg',
    location: 'Mirpur DOHS, MIST',
    rating: 4.2,
    students: 4000,
    teachers: 50,
    courses: 10,
  },
  {
    name: 'Mayer Dowa Coaching Center',
    image: '/Assets/class_room_course.svg',
    location: 'Mirpur DOHS, MIST',
    rating: 4.5,
    students: 200,
    teachers: 5,
    courses: 10,
  },
  {
    name: 'Newton Coaching Center',
    image: '/Assets/class_room_course.svg',
    location: 'Mirpur DOHS, MIST',
    rating: 4.6,
    students: 20,
    teachers: 50,
    courses: 10,
  },
  {
    name: 'Elon Mask Coaching Center',
    image: '/Assets/class_room_course.svg',
    location: 'Mirpur DOHS, MIST',
    rating: 4.9,
    students: 20000,
    teachers: 500,
    courses: 1,
  },
  {
    name: 'Goal Engineering Coaching Center',
    image: '/Assets/class_room_course.svg',
    location: 'Mirpur DOHS, MIST',
    rating: 4.6,
    students: 2000,
    teachers: 50,
    courses: 10,
  },
]

export default function CoachingCenters() {
  return (
    <div className='bg-gray-50'>
      <div className="flex flex-col items-center justify-center gap-10 p-8">
        <h1 className="text-2xl font-bold text-darkb">Coaching Centers</h1>
        <SearchCoachingCenter coachingCenters={coachingCenters} />
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {coachingCenters.map((coachingCenter, index) => (
            <CoachingCenterCard
              key={index}
              coachingCenterInfo={coachingCenter}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
