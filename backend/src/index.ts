import { Hono } from 'hono'
import { cors } from 'hono/cors'
import type { JwtVariables } from 'hono/jwt'
import { prettyJSON } from 'hono/pretty-json'

import userRoute from './routes/userRoute'
import coachingCenterRoute from './routes/coachingCenterRoute'
import courseRoute from './routes/courseRoute'

const app = new Hono<{ Variables: JwtVariables }>()

app.use(prettyJSON())
app.use('/*', cors())

app.route('/user', userRoute)
app.route('/coaching_center', coachingCenterRoute)
app.route('/course', courseRoute)

export default {
  port: process.env.PORT || 5000,
  fetch: app.fetch,
}
