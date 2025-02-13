import EmptyPage from '@/components/emptyPage'
import FeedbackForm from '@/components/feedbackForm'
import MarkdownRender from '@/components/markdownRenderer'
import RatingStar from '@/components/ratingStar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getClass, getClassReviews, isRegistered } from '@/lib/action'
import { formatRelative } from 'date-fns'
import { CalendarRange, CircleUser, Timer } from 'lucide-react'

export default async function Class({ params }) {
  const { course_id, class_id } = await params
  const [classArr, isReg, allReviews] = await Promise.all([
    getClass(class_id),
    isRegistered(course_id),
    getClassReviews(class_id),
  ])
  if (!Array.isArray(classArr) || classArr.length === 0) {
    return <EmptyPage />
  }
  const cls = classArr[0]
  const regex = /^([0-9]{1,2}):([0-9]{1,2})$/
  const str = cls.duration
  const match = str.match(regex)
  const hours = match[1]
  const minutes = match[2]
  return (
    <div className="p-12">
      <div className="flex flex-col gap-4">
        <div>
          <iframe
            src={cls.link}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full aspect-video"
          ></iframe>
        </div>
        <div>
          <h1 className="text-3xl font-poppins">{cls.title}</h1>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex flex-row gap-2 items-center">
            <CalendarRange
              size={20}
              className="text-blue-700"
            />
            <span>
              {formatRelative(cls.start_time, new Date(), {
                addSuffix: true,
              })}
            </span>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <Timer
              size={20}
              className="text-blue-700"
            />
            <span>
              {hours} hours {minutes} minutes
            </span>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <CircleUser
              size={20}
              className="text-blue-700"
            />
            <span>{cls.teacher_name}</span>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <RatingStar rating={allReviews[0].total_rating} /> (
            {allReviews[0].total_rating})
          </div>
        </div>
        <hr className="w-full" />
        <div className="space-y-2">
          <h1 className="text-xl font-epilogue font-semibold text-darkb">
            Description
          </h1>
          <MarkdownRender content={cls.description} />
        </div>

        <div className="space-y-2">
          <h1 className="text-xl font-epilogue font-semibold text-darkb">
            Topics Covered
          </h1>
          <ul className="list-none list-inside text-gray-700 px-2 space-y-2">
            {cls.topics.map((topic, index) => (
              <li
                key={index}
                className="flex items-center"
              >
                <span className="mr-2 text-darkb">&rarr;</span>
                {topic}
              </li>
            ))}
          </ul>
        </div>

        {isReg.registered > 0 && isReg.type === 'Student' && (
          <FeedbackForm
            course_id={course_id}
            class_id={class_id}
          />
        )}
      </div>

      <hr className="w-full my-4" />

      <div className="space-y-4">
        <h1 className="text-xl font-epilogue font-semibold text-darkb">
          All Reviews ({allReviews.length})
        </h1>
        <div className="flex flex-col gap-4">
          {allReviews.map((review, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex flex-row gap-4 items-center">
                  <Avatar>
                    <AvatarImage src={review.profile_pic} />
                    <AvatarFallback>
                      {review.full_name.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{review.full_name}</CardTitle>
                    <CardDescription>
                      {formatRelative(review.created_at, new Date())}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-darkb">{review.description}</p>
              </CardContent>
              <CardFooter>
                <div className="flex flex-row gap-2 items-center">
                  <RatingStar rating={review.rating} /> ({review.rating})
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
