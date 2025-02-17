import { Hono } from 'hono'
import {
  getAllCoachingCentersNonUser,
  getAllNonUserCourses,
} from '../controllers/nonUserController'

const route = new Hono()

route.get('/view_all_coaching_centers', getAllCoachingCentersNonUser)
route.post('/get_all_courses', getAllNonUserCourses)

export default route
