import FeedbackForm from '@/components/feedbackForm'
import { getClass, isRegistered } from '@/lib/action'
import { formatRelative } from 'date-fns'
import { CalendarRange, CircleUser, Timer } from 'lucide-react'

export default async function Class({ params }) {
  const { course_id, class_id } = await params
  const [classArr, isReg] = await Promise.all([
    getClass(class_id),
    isRegistered(course_id),
  ])
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
        <div className="flex flex-row gap-8">
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
        </div>
        <hr className="w-full" />
        <div className="space-y-2">
          <h1 className="text-xl font-epilogue font-semibold text-darkb">
            Description
          </h1>
          <p className="text-gray-700">{cls.description}</p>
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
    </div>
  )
}
