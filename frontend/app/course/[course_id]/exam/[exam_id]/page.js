import AnswerSubmissionForm from '@/components/answerSubmissionForm'
import { getExam } from '@/lib/action'
import { format, isAfter } from 'date-fns'
import { AlarmCheck } from 'lucide-react'

export default async function Class({ params }) {
  const { exam_id } = await params
  const examArr = await getExam(exam_id)
  const exam = examArr[0]
  const regex = /^([0-9]{1,2}):([0-9]{1,2})$/
  const str = exam.duration
  const match = str.match(regex)
  const hours = match[1]
  const minutes = match[2]
  if (isAfter(exam.start_time, new Date())) {
    return (
      <div className="p-12 flex flex-col justify-center items-center gap-4">
        <AlarmCheck size={30} />
        <span className="font-epilogue">
          Exam will start at{' '}
          {format(exam.start_time, 'dd MMM yyyy, HH:mm, EEEE')}
        </span>
      </div>
    )
  }
  return (
    <div className="p-12">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <h1 className="text-3xl font-poppins">{exam.title}</h1>
          <div className="flex flex-row gap-2 p-4 text-gray-900 text-sm">
            <AlarmCheck size={20} />
            <span className="font-epilogue">
              {hours} HOURS {minutes} MINUTES
            </span>
          </div>
        </div>
        <iframe
          src={exam.question_paper}
          className="w-full h-screen"
        />
        <AnswerSubmissionForm type="Question" />
      </div>
    </div>
  )
}
