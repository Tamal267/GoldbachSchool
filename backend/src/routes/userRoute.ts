import { Hono } from 'hono'
import { login, signUp } from '../controllers/userControllers'

const route = new Hono()

// route.use(
//   '/*',
//   jwt({
//     secret: process.env.SECRET || '',
//   }),
// )

route.post('/signup', signUp)
route.post('/login', login)

export default route
