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
    return c.json({ error: 'error' }, 400)
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
  const user_id = user[0].id

  try {
    let result: any[] = []
    if (type === 'Authority')
      result = await sql`with teacherPerCo as (
select c.course_id, c.teacher_id, round(sum(rating) / (5 * count(*)) * 5, 1) rating, count(*) total_classes from classes c
join class_reviews cr on c.id = cr.class_id
group by c.course_id, c.teacher_id
),
teacherRating as (
select t.*, coalesce(tpc.rating, 0) rating, coalesce(total_classes, 0) total_classes from teachers t
left join teacherPerCo tpc on tpc.course_id = t.course_id and tpc.teacher_id = t.user_id
),
coursePer as (
select t.course_id, round(sum(t.rating) / (5 * count(*)) * 5, 1) total_rating from teacherRating t
group by t.course_id
),
getPerForCoaching as (
select c.coaching_center_id, round(sum(total_rating) / (5 * count(*)) * 5, 1) total_rating from courses c
join coursePer cp on cp.course_id = c.id
group by c.coaching_center_id
),
getTotalPer as (
select c.id coaching_center_id, coalesce(total_rating, 0) total_rating from coaching_centers c
left join getPerForCoaching gp on c.id = gp.coaching_center_id
),
totCourse as (
select courses.coaching_center_id, count(*) total_courses from courses
group by courses.coaching_center_id
),
getTotCourse as (
select c.id coaching_center_id, coalesce(tc.total_courses, 0) total_courses from coaching_centers c
left join totCourse tc on tc.coaching_center_id = c.id
),
uniqTeacher as (
select distinct coaching_center_id, user_id 
from teachers t
join courses co on t.course_id = co.id
), 
cntTea as (
select coaching_center_id, count(*) total_teachers from uniqTeacher us
group by coaching_center_id
),
cntTotalTea as (
select c.id coaching_center_id, coalesce(cntTea.total_teachers, 0) total_teachers from coaching_centers c
left join cntTea on cntTea.coaching_center_id = c.id
),
uniqStudent as (
select distinct coaching_center_id, user_id 
from students t
join courses co on t.course_id = co.id
), 
cntStd as (
select coaching_center_id, count(*) total_students from uniqStudent us
group by coaching_center_id
), 
cntTotalStd as (
select c.id coaching_center_id, coalesce(cntStd.total_students, 0) total_students from coaching_centers c
left join cntStd on cntStd.coaching_center_id = c.id
),
cte as (
  select coaching_center_id from authorities 
  where user_id = ${user_id}
)
select c.*, cntTotalTea.total_teachers, cntTotalStd.total_students, getTotCourse.total_courses, getTotalPer.total_rating from coaching_centers c
join cte on cte.coaching_center_id = c.id
join cntTotalTea on cntTotalTea.coaching_center_id = c.id
join cntTotalStd on cntTotalStd.coaching_center_id = c.id
join getTotCourse on getTotCourse.coaching_center_id = c.id
join getTotalPer on getTotalPer.coaching_center_id = c.id
order by total_rating desc`

    if (type === 'Teacher')
      result = await sql`with teacherPerCo as (
select c.course_id, c.teacher_id, round(sum(rating) / (5 * count(*)) * 5, 1) rating, count(*) total_classes from classes c
join class_reviews cr on c.id = cr.class_id
group by c.course_id, c.teacher_id
),
teacherRating as (
select t.*, coalesce(tpc.rating, 0) rating, coalesce(total_classes, 0) total_classes from teachers t
left join teacherPerCo tpc on tpc.course_id = t.course_id and tpc.teacher_id = t.user_id
),
coursePer as (
select t.course_id, round(sum(t.rating) / (5 * count(*)) * 5, 1) total_rating from teacherRating t
group by t.course_id
),
getPerForCoaching as (
select c.coaching_center_id, round(sum(total_rating) / (5 * count(*)) * 5, 1) total_rating from courses c
join coursePer cp on cp.course_id = c.id
group by c.coaching_center_id
),
getTotalPer as (
select c.id coaching_center_id, coalesce(total_rating, 0) total_rating from coaching_centers c
left join getPerForCoaching gp on c.id = gp.coaching_center_id
),
totCourse as (
select courses.coaching_center_id, count(*) total_courses from courses
group by courses.coaching_center_id
),
getTotCourse as (
select c.id coaching_center_id, coalesce(tc.total_courses, 0) total_courses from coaching_centers c
left join totCourse tc on tc.coaching_center_id = c.id
),
uniqTeacher as (
select distinct coaching_center_id, user_id 
from teachers t
join courses co on t.course_id = co.id
), 
cntTea as (
select coaching_center_id, count(*) total_teachers from uniqTeacher us
group by coaching_center_id
),
cntTotalTea as (
select c.id coaching_center_id, coalesce(cntTea.total_teachers, 0) total_teachers from coaching_centers c
left join cntTea on cntTea.coaching_center_id = c.id
),
uniqStudent as (
select distinct coaching_center_id, user_id 
from students t
join courses co on t.course_id = co.id
), 
cntStd as (
select coaching_center_id, count(*) total_students from uniqStudent us
group by coaching_center_id
), 
cntTotalStd as (
select c.id coaching_center_id, coalesce(cntStd.total_students, 0) total_students from coaching_centers c
left join cntStd on cntStd.coaching_center_id = c.id
),
cte as (
  select distinct c.coaching_center_id from courses c join teachers t on c.id = t.course_id
  where t.user_id = ${user_id}
)
select c.*, cntTotalTea.total_teachers, cntTotalStd.total_students, getTotCourse.total_courses, getTotalPer.total_rating from coaching_centers c
join cte on cte.coaching_center_id = c.id
join cntTotalTea on cntTotalTea.coaching_center_id = c.id
join cntTotalStd on cntTotalStd.coaching_center_id = c.id
join getTotCourse on getTotCourse.coaching_center_id = c.id
join getTotalPer on getTotalPer.coaching_center_id = c.id
order by total_rating desc`

    if (type === 'Student')
      result = await sql`with teacherPerCo as (
select c.course_id, c.teacher_id, round(sum(rating) / (5 * count(*)) * 5, 1) rating, count(*) total_classes from classes c
join class_reviews cr on c.id = cr.class_id
group by c.course_id, c.teacher_id
),
teacherRating as (
select t.*, coalesce(tpc.rating, 0) rating, coalesce(total_classes, 0) total_classes from teachers t
left join teacherPerCo tpc on tpc.course_id = t.course_id and tpc.teacher_id = t.user_id
),
coursePer as (
select t.course_id, round(sum(t.rating) / (5 * count(*)) * 5, 1) total_rating from teacherRating t
group by t.course_id
),
getPerForCoaching as (
select c.coaching_center_id, round(sum(total_rating) / (5 * count(*)) * 5, 1) total_rating from courses c
join coursePer cp on cp.course_id = c.id
group by c.coaching_center_id
),
getTotalPer as (
select c.id coaching_center_id, coalesce(total_rating, 0) total_rating from coaching_centers c
left join getPerForCoaching gp on c.id = gp.coaching_center_id
),
totCourse as (
select courses.coaching_center_id, count(*) total_courses from courses
group by courses.coaching_center_id
),
getTotCourse as (
select c.id coaching_center_id, coalesce(tc.total_courses, 0) total_courses from coaching_centers c
left join totCourse tc on tc.coaching_center_id = c.id
),
uniqTeacher as (
select distinct coaching_center_id, user_id 
from teachers t
join courses co on t.course_id = co.id
), 
cntTea as (
select coaching_center_id, count(*) total_teachers from uniqTeacher us
group by coaching_center_id
),
cntTotalTea as (
select c.id coaching_center_id, coalesce(cntTea.total_teachers, 0) total_teachers from coaching_centers c
left join cntTea on cntTea.coaching_center_id = c.id
),
uniqStudent as (
select distinct coaching_center_id, user_id 
from students t
join courses co on t.course_id = co.id
), 
cntStd as (
select coaching_center_id, count(*) total_students from uniqStudent us
group by coaching_center_id
), 
cntTotalStd as (
select c.id coaching_center_id, coalesce(cntStd.total_students, 0) total_students from coaching_centers c
left join cntStd on cntStd.coaching_center_id = c.id
),
cte as (
  select distinct c.coaching_center_id from courses c join students s on c.id = s.course_id
  where s.user_id = ${user_id}
)
select c.*, cntTotalTea.total_teachers, cntTotalStd.total_students, getTotCourse.total_courses, getTotalPer.total_rating from coaching_centers c
join cte on cte.coaching_center_id = c.id
join cntTotalTea on cntTotalTea.coaching_center_id = c.id
join cntTotalStd on cntTotalStd.coaching_center_id = c.id
join getTotCourse on getTotCourse.coaching_center_id = c.id
join getTotalPer on getTotalPer.coaching_center_id = c.id
order by total_rating desc`
    return c.json({ result })
  } catch (error) {
    console.log(error)
    return c.json({ error: 'error' }, 400)
  }
}

export const getCoachingCenter = async (c: any) => {
  const { email } = c.get('jwtPayload')
  if (!email) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  const user = await sql`select * from users where email = ${email}`
  if (user.length === 0) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  try {
    const { coaching_center_id } = await c.req.json()
    const result =
      await sql`select * from coaching_centers where id = ${coaching_center_id}`
    return c.json({ result })
  } catch (error) {
    console.log(error)
    return c.json({ error: 'error' }, 400)
  }
}

export const studentDashboard = async (c: any) => {
  const { email } = c.get('jwtPayload')
  if (!email) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  const user = await sql`select * from users where email = ${email} 
  and type = 'Student'`
  if (user.length === 0) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  const user_id = user[0].id

  try {
    const { coaching_center_id } = await c.req.json()

    const result = await sql`with totalMark as (
  select course_id, count(*) tm from exams
  group by course_id
),
totalStdMark as (
  select course_id, student_id, count(*) tsm from answers a
  join exams e on e.id = a.exam_id
  group by course_id, student_id
)
select c.id course_id, c.name, c.image, round(coalesce(tsm * 100 / tm, 0), 1) progress
from answers a
join exams e on a.exam_id = e.id
join students s on s.user_id = a.student_id
join courses c on c.id = s.course_id
left join totalMark on totalMark.course_id = c.id 
left join totalStdMark on totalStdMark.course_id = c.id and totalStdMark.student_id = s.user_id
where c.coaching_center_id = ${coaching_center_id}
and s.user_id = ${user_id}
group by c.id, c.name, c.image, totalMark.tm, totalStdMark.tsm
order by progress desc`

    return c.json({ result })
  } catch (error) {
    console.log(error)
    return c.json({ error: 'error' }, 400)
  }
}

export const getAllCoachingCenters = async (c: any) => {
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
    const result = await sql`with teacherPerCo as (
select c.course_id, c.teacher_id, round(sum(rating) / (5 * count(*)) * 5, 1) rating, count(*) total_classes from classes c
join class_reviews cr on c.id = cr.class_id
group by c.course_id, c.teacher_id
),
teacherRating as (
select t.*, coalesce(tpc.rating, 0) rating, coalesce(total_classes, 0) total_classes from teachers t
left join teacherPerCo tpc on tpc.course_id = t.course_id and tpc.teacher_id = t.user_id
),
coursePer as (
select t.course_id, round(sum(t.rating) / (5 * count(*)) * 5, 1) total_rating from teacherRating t
group by t.course_id
),
getPerForCoaching as (
select c.coaching_center_id, round(sum(total_rating) / (5 * count(*)) * 5, 1) total_rating from courses c
join coursePer cp on cp.course_id = c.id
group by c.coaching_center_id
),
getTotalPer as (
select c.id coaching_center_id, coalesce(total_rating, 0) total_rating from coaching_centers c
left join getPerForCoaching gp on c.id = gp.coaching_center_id
),
totCourse as (
select courses.coaching_center_id, count(*) total_courses from courses
group by courses.coaching_center_id
),
getTotCourse as (
select c.id coaching_center_id, coalesce(tc.total_courses, 0) total_courses from coaching_centers c
left join totCourse tc on tc.coaching_center_id = c.id
),
uniqTeacher as (
select distinct coaching_center_id, user_id 
from teachers t
join courses co on t.course_id = co.id
), 
cntTea as (
select coaching_center_id, count(*) total_teachers from uniqTeacher us
group by coaching_center_id
),
cntTotalTea as (
select c.id coaching_center_id, coalesce(cntTea.total_teachers, 0) total_teachers from coaching_centers c
left join cntTea on cntTea.coaching_center_id = c.id
),
uniqStudent as (
select distinct coaching_center_id, user_id 
from students t
join courses co on t.course_id = co.id
), 
cntStd as (
select coaching_center_id, count(*) total_students from uniqStudent us
group by coaching_center_id
), 
cntTotalStd as (
select c.id coaching_center_id, coalesce(cntStd.total_students, 0) total_students from coaching_centers c
left join cntStd on cntStd.coaching_center_id = c.id
)
select c.*, cntTotalTea.total_teachers, cntTotalStd.total_students, getTotCourse.total_courses, getTotalPer.total_rating from coaching_centers c
join cntTotalTea on cntTotalTea.coaching_center_id = c.id
join cntTotalStd on cntTotalStd.coaching_center_id = c.id
join getTotCourse on getTotCourse.coaching_center_id = c.id
join getTotalPer on getTotalPer.coaching_center_id = c.id
order by total_rating desc`

    return c.json({ result })
  } catch (error) {
    console.log(error)
    return c.json({ error: 'error' }, 400)
  }
}
