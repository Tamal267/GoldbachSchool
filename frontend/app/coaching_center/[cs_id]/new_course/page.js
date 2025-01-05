import NewCourseForm from '@/components/newCourseForm'

export default function NewCourse() {
  return (
    <div>
      <div className="">
        <NewCourseForm
          type="Authority"
          loginAction="teacherLogin"
        />
      </div>
    </div>
  )
}
