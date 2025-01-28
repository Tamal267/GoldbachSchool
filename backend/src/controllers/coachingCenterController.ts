import sql from '../db'

export const insertCoachingCenter = async (c: any) => {
  const { email } = c.get('jwtPayload')
  if (!email) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  const user =
    await sql`select * from users where email = ${email} and type = 'Authority'`
  if (user.length === 0) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  const { authorities_emails, name, image } = await c.req.json()

  try {
    let au_id_arr = []
    au_id_arr.push(user[0].id)
    for (const email of authorities_emails) {
      const uid =
        await sql`select id from users where email = ${email} and type = 'Authority'`
      if (uid.length === 0) {
        return c.json({ error: `${email} is not registered` }, 400)
      }
      au_id_arr.push(uid[0].id)
    }
    const result = await sql`INSERT INTO coaching_centers (name, image)
      VALUES (${name}, ${image})
      RETURNING *`

    const cs_id = result[0].id

    for (const user_id of au_id_arr) {
      await sql`INSERT INTO authorities (user_id, coaching_center_id)
      VALUES (${user_id}, ${cs_id})`
    }

    return c.json({ result })
  } catch (error) {
    console.log(error)
    return c.json({ erro: 'error' }, 400)
  }
}

export const viewCoachingCenters = async (c: any) => {
  const { email } = c.get('jwtPayload')
  if (!email) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  const user = await sql`select * from users where email = ${email}`
  if (user.length === 0) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  const type = user[0].type

  try {
    let result = {}
      if (type === 'Authority') result = await sql`select * from coaching_centers where id in (select coaching_center_id from authorities where user_id = '8c867749-5fc5-444d-a5e6-d14b9fd96e3b')`
    return c.json({ result })
  } catch (error) {
    console.log(error)
    return c.json({ erro: 'error' }, 400)
  }
}
