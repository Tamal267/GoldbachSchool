import { Hono } from 'hono'
import { jwt } from 'hono/jwt'
import { insertCoachingCenter, viewCoachingCenters } from '../controllers/coachingCenterController'


const route = new Hono()

route.use(
  '/*',
  jwt({
    secret: process.env.SECRET || '',
  }),
)

route.post('/create', insertCoachingCenter)
route.get('/view', viewCoachingCenters)


export default route
