import { Hono } from 'hono'
import { jwt } from 'hono/jwt'
import { getCoachingCenter, insertCoachingCenter, viewCoachingCenters } from '../controllers/coachingCenterController'


const route = new Hono()

route.use(
  '/*',
  jwt({
    secret: process.env.SECRET || '',
  }),
)

route.post('/create', insertCoachingCenter)
route.get('/view', viewCoachingCenters)
route.post('/get_coaching_center', getCoachingCenter)


export default route
