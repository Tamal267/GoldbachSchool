import { randomBytes } from 'crypto'
import { sign as JwtSign } from 'hono/jwt'
import sql from '../db'
import { sendEmail } from '../sendEmail'

function generateRandomWord() {
  return randomBytes(3).toString('hex')
}

export const signUp = async (c: any) => {
  const { full_name, phone, email, password, gender, type } = await c.req.json()
  // console.log(full_name, phone, email, password, gender, type)

  try {
    const result =
      await sql`insert into users (full_name, phone, email, password, gender, type) values(${full_name}, ${phone}, ${email}, ${password}, ${gender}, ${type}) returning *`
    console.log(result)
    await sendEmail(email, 'SignUp', 'You have successfully signed up')
    return c.json({ result })
  } catch (error: any) {
    console.log(error)
    if (error.code === '23505')
      return c.json({ error: 'The email is already registered' }, 400)
    return c.json({ error: 'Something wrong' }, 400)
  }
}

export const login = async (c: any) => {
  const { email, password, type } = await c.req.json()
  try {
    const result =
      await sql`select * from users where email = ${email} and password = ${password} and type = ${type}`
    if (result.length === 0) {
      return c.json({ error: 'Invalid email or password' }, 400)
    }

    const secret = process.env.SECRET
    if (!secret) {
      console.log('JWT secret is not defined')
      return c.json({ error: 'Internal server error' }, 500)
    }
    const token = await JwtSign({ email, type: result[0].type }, secret)
    return c.json({ result, token })
  } catch (error) {
    console.log(error)
    return c.json({ error: 'Something went wrong' }, 400)
  }
}

export const forgetPassword = async (c: any) => {
  const { email } = await c.req.json()
  try {
    const result = await sql`select * from users where email = ${email}`
    if (result.length === 0) {
      return c.json({ error: 'Invalid email' }, 400)
    }
    const otp = generateRandomWord()
    const insOTP =
      await sql`insert into otp (email , otp_code ) values (${email} ,${otp}) returning *`

    await sendEmail(email, 'OTP', 'Your OTP is ' + otp)

    console.log(email, otp)
    return c.json({ email, otp })
  } catch (error) {
    console.log(error)
    return c.json({ error: 'Something went wrong' }, 400)
  }
}

export const otpCheck = async (c: any) => {
  const { email, otp } = await c.req.json()
  try {
    const result =
      await sql`select * from otp where email = ${email} and otp_code = ${otp}`
    if (result.length === 0) {
      return c.json({ error: 'OTP is invalid' }, 400)
    }
    return c.json({ email, otp })
  } catch (error) {
    console.log(error)
    return c.json({ error: 'Something went wrong' }, 400)
  }
}

export const resetPass = async (c: any) => {
  const { email, password } = await c.req.json()
  try {
    const result =
      await sql`update users set password = ${password} where email = ${email} returning *`
    if (result.length === 0) {
      return c.json({ error: 'Something went wrong' }, 400)
    }
    return c.json({ email, type: result[0].type })
  } catch (error) {
    console.log(error)
    return c.json({ error: 'Something went wrong' }, 400)
  }
}

export const getUserInfo = async (c: any) => {
  const { email } = c.get('jwtPayload')
  if (!email) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  try {
    const user = await sql`select id, full_name, email, type from users
where email = ${email}`
    if (user.length === 0) {
      return c.json({ error: 'Unauthorized' }, 401)
    }

    return c.json({ user })
  } catch (error) {
    console.log(error)
    return c.json({ error: 'error' }, 400)
  }
}

export const cntUnseenNotifications = async (c: any) => {
  const { email } = c.get('jwtPayload')
  if (!email) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  const user = await sql`select * from users where email = ${email}`
  if (user.length === 0) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  const user_id = user[0].id

  try {
    const result = await sql`select count(*) count from notifications
where user_id = ${user_id}
and seen = 0`

    return c.json({ result })
  } catch (error) {
    console.log(error)
    return c.json({ error: 'error' }, 400)
  }
}

export const getNotifications = async (c: any) => {
  const { email } = c.get('jwtPayload')
  if (!email) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  const user = await sql`select * from users where email = ${email}`
  if (user.length === 0) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  const user_id = user[0].id

  try {
    const result = await sql`select * from notifications
where user_id = ${user_id}
order by created_at desc`

    return c.json({ result })
  } catch (error) {
    console.log(error)
    return c.json({ error: 'error' }, 400)
  }
}

export const seenNotifications = async (c: any) => {
  const { email } = c.get('jwtPayload')
  if (!email) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  const user = await sql`select * from users where email = ${email}`
  if (user.length === 0) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  const user_id = user[0].id

  try {
    const result =
      await sql`update notifications set seen = 1 where user_id = ${user_id} returning *`

    return c.json({ result })
  } catch (error) {
    console.log(error)
    return c.json({ error: 'error' }, 400)
  }
}
