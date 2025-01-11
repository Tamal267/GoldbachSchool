import FeedbackForm from '@/components/feedbackForm'
import { CalendarRange, FileSpreadsheet, Timer } from 'lucide-react'

export default function Class() {
  return (
    <div className="p-12">
      <div className="flex flex-col gap-4">
        <div>
          <iframe
            src={`https://www.youtube.com/embed/VQl11FNlyr0`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full aspect-video"
          ></iframe>
        </div>
        <div>
          <h1 className="text-3xl font-poppins">
            বিশ্ব ও বাংলাদেশ প্রেক্ষিত | HSC ICT Physics 1st Paper
          </h1>
        </div>
        <div className="flex flex-row gap-8">
          <div className="flex flex-row gap-2 items-center">
            <FileSpreadsheet
              size={20}
              className="text-blue-700"
            />
            <span>Chatper 1</span>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <CalendarRange
              size={20}
              className="text-blue-700"
            />
            <span>12 DEC 2024</span>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <Timer
              size={20}
              className="text-blue-700"
            />
            <span>2 HOURS 30 MINUTES</span>
          </div>
        </div>
        <hr className="w-full" />
        <div className="space-y-2">
          <h1 className="text-xl font-epilogue font-semibold text-darkb">
            Description
          </h1>
          <p className="text-gray-700">
            Welcome to Grade 10 Mathematics - Algebra Essentials. This class is
            designed to help students excel in algebra with engaging lessons,
            hands-on practice, and personalized guidance. In this course, you
            will explore fundamental topics like linear equations, quadratic
            functions, and graphing techniques. With interactive lessons,
            quizzes, and assignments, you{"'"}ll be well-prepared for your
            upcoming exams.
          </p>
        </div>

        <div className="space-y-2">
          <h1 className="text-xl font-epilogue font-semibold text-darkb">
            Topics Covered
          </h1>
          <ul className="list-none list-inside text-gray-700 px-2 space-y-2">
            <li className="flex items-center">
              <span className="mr-2 text-darkb">&rarr;</span>
              Basics of Algebraic Expressions
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-darkb">&rarr;</span>
              Linear Equations and Inequalities
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-darkb">&rarr;</span>
              Quadratic Equations
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-darkb">&rarr;</span>
              Functions and Graphs{' '}
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-darkb">&rarr;</span>
              Real-life Problem Solving{' '}
            </li>
          </ul>
        </div>

        <FeedbackForm />
      </div>
    </div>
  )
}
