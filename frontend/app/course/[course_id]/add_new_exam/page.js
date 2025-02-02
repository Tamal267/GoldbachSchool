import QuestionSubmissionForm from '@/components/questionSubmissionForm'

export default async function AddNewExam({ params }) {
  const { course_id } = await params
  return (
    <div className="p-12">
      <QuestionSubmissionForm type="Question Paper" course_id={course_id} />
    </div>
  )
}
