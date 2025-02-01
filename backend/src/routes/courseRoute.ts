import { Hono } from 'hono'
import { jwt } from 'hono/jwt'
import { createCourse, getCourse, getTeachers, viewCourses } from '../controllers/courseController'


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

export default route
