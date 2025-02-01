import NewCourseForm from '@/components/newCourseForm'

export default async function NewCourse({ params }) {
  const { cs_id } = await params
  return (
    <div>
      <div className="">
        <NewCourseForm
          coaching_center_id={cs_id}
        />
      </div>
    </div>
  )
}
