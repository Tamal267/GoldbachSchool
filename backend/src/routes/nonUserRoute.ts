import { Hono } from 'hono'
import { getAllCoachingCentersNonUser } from '../controllers/nonUserController'

const route = new Hono()

route.get('/view_all_coaching_centers', getAllCoachingCentersNonUser)

export default route
