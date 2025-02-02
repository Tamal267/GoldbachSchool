import AddNewClassForm from '@/components/addNewClassForm'
import { getTeachers } from '@/lib/action'

export default async function AddNewClass({ params }) {
  const { course_id } = await params
  const teachers = await getTeachers(course_id)
  return (
    <div className="p-12">
      <AddNewClassForm type="Class" course_id={course_id} teachers={teachers} />
    </div>
  )
}
