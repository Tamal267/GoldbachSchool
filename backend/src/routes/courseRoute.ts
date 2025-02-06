import { Hono } from 'hono'
import { jwt } from 'hono/jwt'
import {
  addClass,
  addExam,
  addStudent,
  createCourse,
  getAllCourses,
  getClass,
  getCourse,
  getExam,
  getNewCourses,
  getNewScripts,
  getPreviousScripts,
  getTeachers,
  isRegisterd,
  submitAnswer,
  submitClassReview,
  teacherPayment,
  updateMark,
  viewContents,
  viewCourses,
  viewStudentsRating,
  viewTeacherMonitoring,
} from '../controllers/courseController'

const route = new Hono()

route.use(
  '/*',
  jwt({
    secret: process.env.SECRET || '',
  }),
)
route.post('/create', createCourse)
route.post('/view', viewCourses)
route.post('/get_course', getCourse)
route.post('/get_teachers', getTeachers)
route.post('/add_class', addClass)
route.post('/add_exam', addExam)
route.post('/view_contents', viewContents)
route.post('/get_class', getClass)
route.post('/get_exam', getExam)
route.get('/get_all_courses', getAllCourses)
route.post('/add_student', addStudent)
route.post('/is_registered', isRegisterd)
route.post('/submit_answer', submitAnswer)
route.post('/submit_class_review', submitClassReview)
route.post('/get_new_scripts', getNewScripts)
route.post('/update_mark', updateMark)
route.post('/get_prev_scripts', getPreviousScripts)
route.post('/view_students_rating', viewStudentsRating)
route.post('/view_teacher_monitoring', viewTeacherMonitoring)
route.post('/teacher_payment', teacherPayment)
route.get('/get_new_courses', getNewCourses)

export default route
