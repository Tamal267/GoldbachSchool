import CoachingCenterCard from '@/components/coachingCenterCard'
import SearchCoachingCenter from '@/components/searchCoachingCenter'
import { coachingCenters } from '@/lib/data'



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
