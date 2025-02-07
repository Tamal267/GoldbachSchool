import CoachingCenterCard from '@/components/coachingCenterCard'
import EmptyPage from '@/components/emptyPage'
import SearchCoachingCenter from '@/components/searchCoachingCenter'
import { viewCoachingCenters } from '@/lib/action'

export default async function AllCoachingCenters() {
  const coachingCenters = await viewCoachingCenters()

  if (!Array.isArray(coachingCenters) || coachingCenters.length === 0) {
    return <EmptyPage />
  }

  const firstColumn = coachingCenters.filter((_, index) => index % 3 === 0)
  const secondColumn = coachingCenters.filter((_, index) => index % 3 === 1)
  const thirdColumn = coachingCenters.filter((_, index) => index % 3 === 2)

  return (
    <div className="bg-gray-50">
      <div className="flex flex-col items-center justify-center gap-10 p-8">
        <h1 className="text-2xl font-bold text-darkb">Coaching Centers</h1>
        <SearchCoachingCenter coachingCenters={coachingCenters} />

        {coachingCenters.length === 0 && <p>No courses available</p>}
        {coachingCenters.length < 3 ? (
          <div className="flex flex-row flex-wrap mt-12 gap-10">
            {coachingCenters.map((coachingCenter, index) => (
              <CoachingCenterCard
                key={index}
                coachingCenterInfo={coachingCenter}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
            <div className="flex flex-col gap-10">
              {firstColumn.map((coachingCenter, index) => (
                <CoachingCenterCard
                  key={index}
                  coachingCenterInfo={coachingCenter}
                />
              ))}
            </div>
            <div className="flex flex-col gap-10">
              {secondColumn.map((coachingCenter, index) => (
                <CoachingCenterCard
                  key={index}
                  coachingCenterInfo={coachingCenter}
                />
              ))}
            </div>
            <div className="flex flex-col gap-10">
              {thirdColumn.map((coachingCenter, index) => (
                <CoachingCenterCard
                  key={index}
                  coachingCenterInfo={coachingCenter}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
