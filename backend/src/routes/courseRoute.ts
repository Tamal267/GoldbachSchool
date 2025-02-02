import { Hono } from 'hono'
import { jwt } from 'hono/jwt'
import { addClass, addExam, createCourse, getClass, getCourse, getExam, getTeachers, viewContents, viewCourses } from '../controllers/courseController'


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

export default route
