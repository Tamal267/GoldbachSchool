import { Hono } from 'hono'
import { forgetPassword, login, otpCheck, resetPass, signUp } from '../controllers/userControllers'

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
route.post('/otp_check', otpCheck)
route.post('/reset_pass', resetPass)

export default route
