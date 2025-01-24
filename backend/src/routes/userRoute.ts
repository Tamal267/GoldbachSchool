import { Hono } from 'hono'
import { forgetPassword, login, signUp } from '../controllers/userControllers'

const route = new Hono()

// route.use(
//   '/*',
//   jwt({
//     secret: process.env.SECRET || '',
//   }),
// )

route.post('/signup', signUp)
route.post('/login', login)
route.post('/forget_pass', forgetPassword)

export default route
