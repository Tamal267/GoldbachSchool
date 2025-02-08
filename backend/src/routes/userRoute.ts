import { Hono } from 'hono'
import { jwt } from 'hono/jwt'
import {
  cntUnseenNotifications,
  forgetPassword,
  getNotifications,
  getNotificationsOffset,
  getUserInfo,
  login,
  otpCheck,
  resetPass,
  seenNotifications,
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
route.get('/info/cnt_unseen_notifications', cntUnseenNotifications)
route.get('/info/get_notifications', getNotifications)
route.post('/info/get_notifications_offset', getNotificationsOffset)
route.get('/info/seen_notificatoins', seenNotifications)

export default route
