import sql from '../db'

export const createCourse = async (c: any) => {
  const { email } = c.get('jwtPayload')
  if (!email) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  const user =
    await sql`select * from users where email = ${email} and type = 'Authority'`
  if (user.length === 0) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  try {
    const {
      program,
      name,
      image,
      description,
      version,
      per_class_tk,
      per_evaluation_tk,
      course_fee,
      coaching_center_id,
      ins_emails,
      start_time,
    } = await c.req.json()

    let au_id_arr = []
    au_id_arr.push(user[0].id)
    for (const email of ins_emails) {
      const uid =
        await sql`select id from users where email = ${email} and type = 'Teacher'`
      if (uid.length === 0) {
        return c.json({ error: `${email} is not registered` }, 400)
      }
      au_id_arr.push(uid[0].id)
    }
    const result =
      await sql`INSERT INTO courses (program, name, image, description, version, per_class_tk, per_evaluation_tk, course_fee, coaching_center_id, start_time) values (${program}, ${name}, ${image}, ${description}, ${version}, ${per_class_tk}, ${per_evaluation_tk}, ${course_fee}, ${coaching_center_id}, ${start_time}) RETURNING *`

    const cs_id = result[0].id

    for (const user_id of au_id_arr) {
      await sql`INSERT INTO teachers (user_id, course_id)
      VALUES (${user_id}, ${cs_id})`
    }

    return c.json({ result })
  } catch (error) {
    console.log(error)
    return c.json({ error: 'error' }, 400)
  }
}

export const viewCourses = async (c: any) => {
  const { email } = c.get('jwtPayload')
  if (!email) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  const user = await sql`select * from users where email = ${email}`
  if (user.length === 0) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  const type = user[0].type
  const user_id = user[0].id

  try {
    const { coaching_center_id } = await c.req.json()
    let result = {}
    if (type === 'Authority')
      result = await sql`with cte as (
select coaching_center_id from authorities 
where user_id = ${user_id} and
coaching_center_id = ${coaching_center_id}
)
select c.* from courses c, cte
where c.coaching_center_id = cte.coaching_center_id`
    return c.json({ result })
  } catch (error) {
    console.log(error)
    return c.json({ error: 'error' }, 400)
  }
}

export const getCourse = async (c: any) => {
  const { email } = c.get('jwtPayload')
  if (!email) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  const user = await sql`select * from users where email = ${email}`
  if (user.length === 0) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  try {
    const { course_id } = await c.req.json()
    const result = await sql`select * from courses where id = ${course_id}`
    return c.json({ result })
  } catch (error) {
    console.log(error)
    return c.json({ error: 'error' }, 400)
  }
}

export const getTeachers = async (c: any) => {
  const { email } = c.get('jwtPayload')
  if (!email) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  const user = await sql`select * from users where email = ${email}`
  if (user.length === 0) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  try {
    const { course_id } = await c.req.json()
    const result = await sql`select full_name name, phone, email from users 
where id in (
select user_id from teachers 
where course_id = ${course_id}
)`
    return c.json({ result })
  } catch (error) {
    console.log(error)
    return c.json({ error: 'error' }, 400)
  }
}
