import { Hono } from 'hono'
import { jwt } from 'hono/jwt'
import {
  forgetPassword,
  getUserInfo,
  login,
  otpCheck,
  resetPass,
  signUp,
} from '../controllers/userControllers'

const route = new Hono()

route.use(
  '/info/*',
  jwt({
    secret: process.env.SECRET || '',
  }),
)

route.post('/signup', signUp)
route.post('/login', login)
route.post('/forget_pass', forgetPassword)
route.post('/otp_check', otpCheck)
route.post('/reset_pass', resetPass)
route.get('/info/get_user', getUserInfo)

export default route
