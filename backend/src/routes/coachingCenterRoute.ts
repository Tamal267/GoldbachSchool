import { Hono } from 'hono'
import { jwt } from 'hono/jwt'
import { getAllCoachingCenters, getCoachingCenter, insertCoachingCenter, studentDashboard, viewCoachingCenters } from '../controllers/coachingCenterController'


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
route.post('/student_dashboard', studentDashboard)
route.get('/view_all', getAllCoachingCenters)


export default route
