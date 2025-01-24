import sql from '../db'
import { sign as JwtSign } from 'hono/jwt'
import { sendEmail } from '../sendEmail'

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
    if (error.code === "23505") return c.json({ error: 'The email is already registered' }, 400)
    return c.json({ error: 'Something wrong' }, 400)
  }
}

export const login = async (c: any) => {
  const { email, password, type } = await c.req.json()
  try {
    const result = await sql`select * from users where email = ${email} and password = ${password} and type = ${type}`
    if (result.length === 0) {
      return c.json({ error: 'Invalid email or password' }, 400)
    }

    const secret = process.env.SECRET
    if (!secret) {
      console.log('JWT secret is not defined')
      return c.json({ error: 'Internal server error' }, 500)
    }
    const token = await JwtSign({ email, id: result[0].id, type: result[0].type }, secret)
    return c.json({ result, token })
  } catch (error) {
    console.log(error)
    return c.json({ error: 'Something went wrong' }, 400)
  }
}
