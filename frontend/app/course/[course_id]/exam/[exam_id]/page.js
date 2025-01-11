import AnswerSubmissionForm from '@/components/answerSubmissionForm'
import { AlarmCheck } from 'lucide-react'

export default function Class() {
  return (
    <div className="p-12">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <h1 className="text-3xl font-poppins">Exam on Chapter 1</h1>
          <div className='flex flex-row gap-2 p-4 text-gray-900 text-sm'>
            <AlarmCheck size={20} />
            <span className="font-epilogue">2 HOURS 30 MINUTES</span>
          </div>
        </div>
        <iframe
          src="/Assets/problemSet.pdf"
          className="w-full h-screen"
        />
        <AnswerSubmissionForm type="Question" />
      </div>
    </div>
  )
}
