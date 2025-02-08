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
    let result: any[] = []
    if (type === 'Authority')
      result = await sql`with classCnt as (
  select count(*) as total_classes, course_id from classes
  group by course_id
),
examCnt as (
  select count(*) as total_exams, course_id from exams
  group by course_id
),
teacherCnt as (
  select count(*) as total_teachers, course_id from teachers
  group by course_id
),
studentCnt as (
  select count(*) as total_students, course_id from students
  group by course_id
),
courseDetails as (
  select c.*, coalesce(classCnt.total_classes, 0) total_classes, coalesce(examCnt.total_exams, 0) total_exams, coalesce(teacherCnt.total_teachers, 0) total_teachers, coalesce(studentCnt.total_students, 0) total_students from courses c 
  left join classCnt on classCnt.course_id = c.id
  left join examCnt on examCnt.course_id = c.id 
  left join teacherCnt on teacherCnt.course_id = c.id
  left join studentCnt on studentCnt.course_id = c.id
),
cte as (
  select coaching_center_id from authorities 
  where user_id = ${user_id} and
  coaching_center_id = ${coaching_center_id} 
),
teacherPerCo as (
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
)
select c.*, co.total_rating from courseDetails c, cte, coursePer co
where c.coaching_center_id = cte.coaching_center_id 
and c.id = co.course_id
order by co.total_rating desc
`

    if (type === 'Teacher')
      result = await sql`with classCnt as (
  select count(*) as total_classes, course_id from classes
  group by course_id
),
examCnt as (
  select count(*) as total_exams, course_id from exams
  group by course_id
),
teacherCnt as (
  select count(*) as total_teachers, course_id from teachers
  group by course_id
),
studentCnt as (
  select count(*) as total_students, course_id from students
  group by course_id
),
courseDetails as (
  select c.*, coalesce(classCnt.total_classes, 0) total_classes, coalesce(examCnt.total_exams, 0) total_exams, coalesce(teacherCnt.total_teachers, 0) total_teachers, coalesce(studentCnt.total_students, 0) total_students from courses c 
  left join classCnt on classCnt.course_id = c.id
  left join examCnt on examCnt.course_id = c.id 
  left join teacherCnt on teacherCnt.course_id = c.id
  left join studentCnt on studentCnt.course_id = c.id
),
cte as (
  select distinct c.coaching_center_id from courses c join teachers s on c.id = s.course_id
where s.user_id = ${user_id} and c.coaching_center_id = ${coaching_center_id}
),
teacherPerCo as (
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
)
select c.*, co.total_rating from courseDetails c, cte, coursePer co
where c.coaching_center_id = cte.coaching_center_id 
and c.id = co.course_id
order by co.total_rating desc`

    if (type === 'Student')
      result = await sql`with classCnt as (
  select count(*) as total_classes, course_id from classes
  group by course_id
),
examCnt as (
  select count(*) as total_exams, course_id from exams
  group by course_id
),
teacherCnt as (
  select count(*) as total_teachers, course_id from teachers
  group by course_id
),
studentCnt as (
  select count(*) as total_students, course_id from students
  group by course_id
),
courseDetails as (
  select c.*, coalesce(classCnt.total_classes, 0) total_classes, coalesce(examCnt.total_exams, 0) total_exams, coalesce(teacherCnt.total_teachers, 0) total_teachers, coalesce(studentCnt.total_students, 0) total_students from courses c 
  left join classCnt on classCnt.course_id = c.id
  left join examCnt on examCnt.course_id = c.id 
  left join teacherCnt on teacherCnt.course_id = c.id
  left join studentCnt on studentCnt.course_id = c.id
),
cte as (
  select distinct c.coaching_center_id from courses c join students s on c.id = s.course_id
where s.user_id = ${user_id} and c.coaching_center_id = ${coaching_center_id}
),
teacherPerCo as (
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
)
select c.*, co.total_rating from courseDetails c, cte, coursePer co
where c.coaching_center_id = cte.coaching_center_id 
and c.id = co.course_id
order by co.total_rating desc`

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
    const result = await sql`with classCnt as (
  select count(*) as total_classes from classes
  where course_id = ${course_id}
),
examCnt as (
  select count(*) as total_exams from exams
  where course_id = ${course_id}
),
teacherCnt as (
  select count(*) as total_teachers from teachers
  where course_id = ${course_id}
),
studentCnt as (
  select count(*) as total_students from students
  where course_id = ${course_id}
)
select c.*, classCnt.total_classes, examCnt.total_exams, teacherCnt.total_teachers, studentCnt.total_students from courses c, classCnt, examCnt, teacherCnt, studentCnt
where c.id = ${course_id}`
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
    const result = await sql`select id, full_name name, phone, email from users 
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

export const addClass = async (c: any) => {
  const { email } = c.get('jwtPayload')
  if (!email) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  const user =
    await sql`select * from users where email = ${email} and type != 'Student'`
  if (user.length === 0) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  try {
    const {
      title,
      start_time,
      duration,
      course_id,
      teacher_id,
      topics,
      description,
      link,
    } = await c.req.json()

    const isValidTeacher =
      await sql`select * from teachers where user_id = ${teacher_id} and course_id = ${course_id}`
    if (isValidTeacher.length === 0) {
      return c.json({ error: 'Invalid teacher' }, 400)
    }

    const result =
      await sql`INSERT INTO classes (title, start_time, duration, course_id, teacher_id, topics, description, link) values (${title}, ${start_time}, ${duration}, ${course_id}, ${teacher_id}, ${topics}, ${description}, ${link}) RETURNING *`

    return c.json({ result })
  } catch (error) {
    console.log(error)
    return c.json({ error: 'error' }, 400)
  }
}

export const addExam = async (c: any) => {
  const { email } = c.get('jwtPayload')
  if (!email) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  const user =
    await sql`select * from users where email = ${email} and type != 'Student'`
  if (user.length === 0) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  try {
    const {
      title,
      start_time,
      duration,
      course_id,
      question_paper,
      total_mark,
    } = await c.req.json()

    const result =
      await sql`INSERT INTO exams (title, start_time, duration, course_id, question_paper, total_mark) values (${title}, ${start_time}, ${duration}, ${course_id}, ${question_paper}, ${total_mark}) RETURNING *`

    return c.json({ result })
  } catch (error) {
    console.log(error)
    return c.json({ error: 'error' }, 400)
  }
}

export const viewContents = async (c: any) => {
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
    const result =
      await sql`select id, title, start_time , case when true then 'class' end type from classes 
where course_id = ${course_id}
union
select id, title, start_time , case when true then 'exam' end type from exams 
where course_id = ${course_id}
order by start_time asc`
    return c.json({ result })
  } catch (error) {
    console.log(error)
    return c.json({ error: 'error' }, 400)
  }
}

export const getClass = async (c: any) => {
  const { email } = c.get('jwtPayload')
  if (!email) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  const user = await sql`select * from users where email = ${email}`
  if (user.length === 0) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  try {
    const { class_id } = await c.req.json()
    const result =
      await sql`select c.id, c.created_at, c.title, c.start_time, c.duration, c.link, c.topics, c.course_id, c.teacher_id, c.description, u.full_name as teacher_name, u.email as teacher_email  from classes c join users u on c.teacher_id = u.id
where c.id = ${class_id}`
    return c.json({ result })
  } catch (error) {
    console.log(error)
    return c.json({ error: 'error' }, 400)
  }
}

export const getExam = async (c: any) => {
  const { email } = c.get('jwtPayload')
  if (!email) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  const user = await sql`select * from users where email = ${email}`
  if (user.length === 0) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  try {
    const { exam_id } = await c.req.json()
    const result =
      await sql`select id, created_at, title, start_time, course_id, title, question_paper, duration, total_mark from exams 
where id = ${exam_id}`
    return c.json({ result })
  } catch (error) {
    console.log(error)
    return c.json({ error: 'error' }, 400)
  }
}

export const getAllCourses = async (c: any) => {
  const { email } = c.get('jwtPayload')
  if (!email) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  const user = await sql`select * from users where email = ${email}`
  if (user.length === 0) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  try {
    const result = await sql`with classCnt as (
  select count(*) as total_classes, course_id from classes
  group by course_id
),
examCnt as (
  select count(*) as total_exams, course_id from exams
  group by course_id
),
teacherCnt as (
  select count(*) as total_teachers, course_id from teachers
  group by course_id
),
studentCnt as (
  select count(*) as total_students, course_id from students
  group by course_id
),
courseDetails as (
  select c.*, coalesce(classCnt.total_classes, 0) total_classes, coalesce(examCnt.total_exams, 0) total_exams, coalesce(teacherCnt.total_teachers, 0) total_teachers, coalesce(studentCnt.total_students, 0) total_students from courses c 
  left join classCnt on classCnt.course_id = c.id
  left join examCnt on examCnt.course_id = c.id 
  left join teacherCnt on teacherCnt.course_id = c.id
  left join studentCnt on studentCnt.course_id = c.id
),
cte as (
  select id coaching_center_id from coaching_centers 
),
teacherPerCo as (
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
)
select c.*, co.total_rating from courseDetails c, cte, coursePer co
where c.coaching_center_id = cte.coaching_center_id 
and c.id = co.course_id
order by co.total_rating desc
`
    return c.json({ result })
  } catch (error) {
    console.log(error)
    return c.json({ error: 'error' }, 400)
  }
}

export const addStudent = async (c: any) => {
  const { email } = c.get('jwtPayload')
  if (!email) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  const user =
    await sql`select * from users where email = ${email} and type = 'Student'`
  if (user.length === 0) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  const user_id = user[0].id

  try {
    const { course_id } = await c.req.json()

    const result =
      await sql`INSERT INTO students (user_id, course_id) values (${user_id}, ${course_id}) RETURNING *`

    return c.json({ result })
  } catch (error) {
    console.log(error)
    return c.json({ error: 'error' }, 400)
  }
}

export const isRegisterd = async (c: any) => {
  const { email } = c.get('jwtPayload')
  if (!email) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  const user = await sql`select * from users where email = ${email}`
  if (user.length === 0) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  const user_id = user[0].id
  const type = user[0].type

  try {
    const { course_id } = await c.req.json()
    let result: any[] = []

    if (type === 'Authority')
      result =
        await sql`select (select 'Authority' as type), count(*) registered 
from coaching_centers cc 
join authorities a on cc.id = a.coaching_center_id
join courses c on cc.id = c.coaching_center_id
where a.user_id = ${user_id}
and c.id = ${course_id}`

    if (type === 'Teacher')
      result = await sql`select (select 'Teacher' as type), count(*) registered
from courses c join teachers t on c.id = t.course_id
where c.id = ${course_id}
and t.user_id = ${user_id}`

    if (type === 'Student')
      result = await sql`select (select 'Student' as type), count(*) registered
from courses c join students s on c.id = s.course_id
where c.id = ${course_id}
and s.user_id = ${user_id}`

    return c.json({ result })
  } catch (error) {
    console.log(error)
    return c.json({ error: 'error' }, 400)
  }
}

export const submitAnswer = async (c: any) => {
  const { email } = c.get('jwtPayload')
  if (!email) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  const user =
    await sql`select * from users where email = ${email} and type = 'Student'`
  if (user.length === 0) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  const student_id = user[0].id

  try {
    const { exam_id, answer_paper, course_id } = await c.req.json()

    const isValidStudent =
      await sql`select * from students where user_id = ${student_id} and course_id = ${course_id}`
    if (isValidStudent.length === 0) {
      return c.json({ error: 'Invalid student' }, 400)
    }

    const isAnswered =
      await sql`select * from answers where student_id = ${student_id} and exam_id = ${exam_id}`
    if (isAnswered.length > 0) {
      const result =
        await sql`UPDATE answers SET answer_paper = ${answer_paper} WHERE student_id = ${student_id} and exam_id = ${exam_id} RETURNING *`

      return c.json({ result })
    }

    if (isAnswered.length === 0) {
      const result =
        await sql`INSERT INTO answers (exam_id, student_id, answer_paper) values (${exam_id}, ${student_id}, ${answer_paper}) RETURNING *`

      return c.json({ result })
    }
  } catch (error) {
    console.log(error)
    return c.json({ error: 'error' }, 400)
  }
}

export const submitClassReview = async (c: any) => {
  const { email } = c.get('jwtPayload')
  if (!email) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  const user =
    await sql`select * from users where email = ${email} and type = 'Student'`
  if (user.length === 0) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  const student_id = user[0].id

  try {
    const { class_id, description, rating, course_id } = await c.req.json()

    const isValidStudent =
      await sql`select * from students where user_id = ${student_id} and course_id = ${course_id}`
    if (isValidStudent.length === 0) {
      return c.json({ error: 'Invalid teacher' }, 400)
    }

    const isReviewd =
      await sql`select * from class_reviews where student_id = ${student_id} and class_id = ${class_id}`
    if (isReviewd.length > 0) {
      const result =
        await sql`UPDATE class_reviews SET description = ${description}, rating = ${rating} WHERE student_id = ${student_id} and class_id = ${class_id} RETURNING *`

      return c.json({ result })
    }

    if (isReviewd.length === 0) {
      const result =
        await sql`INSERT INTO class_reviews (class_id, student_id, description, rating) values (${class_id}, ${student_id}, ${description}, ${rating}) RETURNING *`

      return c.json({ result })
    }
  } catch (error) {
    console.log(error)
    return c.json({ error: 'error' }, 400)
  }
}

export const getNewScripts = async (c: any) => {
  const { email } = c.get('jwtPayload')
  if (!email) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  const user =
    await sql`select * from users where email = ${email} and type != 'Student'`
  if (user.length === 0) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  try {
    const { course_id } = await c.req.json()

    const result =
      await sql`select a.*, u.full_name, u.email, row_number() over(order by a.created_at desc) as sl_no, c.id as course_id, e.title exam_title, e.question_paper, e.total_mark from answers a 
join exams e on a.exam_id = e.id
join courses c on e.course_id = c.id
join users u on a.student_id = u.id
where c.id = ${course_id}
and a.mark is null`

    return c.json({ result })
  } catch (error) {
    console.log(error)
    return c.json({ error: 'error' }, 400)
  }
}

export const getPreviousScripts = async (c: any) => {
  const { email } = c.get('jwtPayload')
  if (!email) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  const user =
    await sql`select * from users where email = ${email} and type != 'Student'`
  if (user.length === 0) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  try {
    const { course_id } = await c.req.json()

    const result =
      await sql`select a.*, u.full_name, u.email, row_number() over(order by a.created_at desc) as sl_no, c.id as course_id, e.title exam_title, e.question_paper, e.total_mark from answers a 
join exams e on a.exam_id = e.id
join courses c on e.course_id = c.id
join users u on a.student_id = u.id
where c.id = ${course_id}
and a.mark is not null`

    return c.json({ result })
  } catch (error) {
    console.log(error)
    return c.json({ error: 'error' }, 400)
  }
}

export const updateMark = async (c: any) => {
  const { email } = c.get('jwtPayload')
  if (!email) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  const user =
    await sql`select * from users where email = ${email} and type != 'Student'`
  if (user.length === 0) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  const teacher_id = user[0].id

  try {
    const { exam_id, student_id, mark, feedback, course_id } =
      await c.req.json()

    const isValidTeacher =
      await sql`select * from teachers where user_id = ${teacher_id} and course_id = ${course_id}`
    if (isValidTeacher.length === 0) {
      return c.json({ error: 'Invalid teacher' }, 400)
    }

    const examDetails =
      await sql`select exams.title exam_name, exams.total_mark, courses.name course_name, courses.program, coaching_centers.name coaching_center_name from exams 
join courses on exams.course_id = courses.id
join coaching_centers on coaching_centers.id = courses.coaching_center_id
where exams.id = ${exam_id}
and exams.course_id = ${course_id}`

    const result =
      await sql`UPDATE answers SET mark = ${mark}, feedback = ${feedback} WHERE student_id = ${student_id} and exam_id = ${exam_id} RETURNING *`

    if (result.length > 0) {
      const msg = `Your exam ${examDetails[0].exam_name} of ${examDetails[0].course_name} (${examDetails[0].program}) at ${examDetails[0].coaching_center_name} has been evaluated. Your mark is ${mark} out of ${examDetails[0].total_mark}.`

      await sql`INSERT INTO notifications (user_id, message) values (${student_id}, ${msg})`
    }

    return c.json({ result })
  } catch (error) {
    console.log(error)
    return c.json({ error: 'error' }, 400)
  }
}

export const viewStudentsRating = async (c: any) => {
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

    const result = await sql`with totalMark as (
  select sum(total_mark) tm from exams
  where course_id = ${course_id}
)
select row_number() over(order by coalesce(round(sum(mark) / tm * 100, 2), 0) desc) sl_no, count(mark) total_exams, coalesce(round(sum(mark) / tm * 100, 2), 0) exam_performance, full_name, email
from totalMark, answers 
join users on users.id = answers.student_id
join exams on exams.id = answers.exam_id
join courses on courses.id = exams.course_id
where courses.id = ${course_id}
group by full_name, email, tm
order by exam_performance desc`

    return c.json({ result })
  } catch (error) {
    console.log(error)
    return c.json({ error: 'error' }, 400)
  }
}

export const viewTeacherMonitoring = async (c: any) => {
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

    const result = await sql`with teacherPerCo as (
select c.course_id, c.teacher_id, round(sum(rating) / (5 * count(*)) * 5, 1) rating, count(*) total_classes from classes c
join class_reviews cr on c.id = cr.class_id
group by c.course_id, c.teacher_id
),
teacherRating as (
select t.*, coalesce(tpc.rating, 0) rating, coalesce(total_classes, 0) total_classes from teachers t
left join teacherPerCo tpc on tpc.course_id = t.course_id and tpc.teacher_id = t.user_id
)
select row_number() over(order by t.rating desc) sl_no, t.user_id teacher_id, t.course_id, u.full_name, u.email, t.total_classes, t.payment paid, t.total_classes * c.per_class_tk - t.payment due_payment, t.rating from teacherRating t
join courses c on t.course_id = c.id
join users u on u.id = t.user_id
where t.course_id = ${course_id}`

    return c.json({ result })
  } catch (error) {
    console.log(error)
    return c.json({ error: 'error' }, 400)
  }
}

export const teacherPayment = async (c: any) => {
  const { email } = c.get('jwtPayload')
  if (!email) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  const user =
    await sql`select * from users where email = ${email} and type = 'Authority'`
  if (user.length === 0) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  const authority_id = user[0].id

  try {
    const { payment, teacher_id, course_id } = await c.req.json()

    const isValidAuthor =
      await sql`select cc.name coaching_center_name, c.name course_name, c.program program from courses c join authorities a on c.coaching_center_id = a.coaching_center_id 
join coaching_centers cc on cc.id = c.coaching_center_id
where a.user_id = ${authority_id} and c.id = ${course_id}`
    if (isValidAuthor.length === 0) {
      return c.json({ error: 'Invalid teacher' }, 400)
    }

    const coaching_center_name = isValidAuthor[0].coaching_center_name
    const course_name = isValidAuthor[0].course_name
    const program = isValidAuthor[0].program

    const result =
      await sql`UPDATE teachers SET payment = payment + ${payment} WHERE user_id = ${teacher_id} and course_id = ${course_id} RETURNING *`

    const msg = `Payment of Tk ${payment} added to your account for ${course_name} (${program}) course at ${coaching_center_name}.`

    if (result.length > 0) {
      await sql`INSERT INTO notifications (user_id, message) values (${teacher_id}, ${msg})`
    }

    return c.json({ result })
  } catch (error) {
    console.log(error)
    return c.json({ error: 'error' }, 400)
  }
}

export const getNewCourses = async (c: any) => {
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
    const result = await sql`with classCnt as (
  select count(*) as total_classes, course_id from classes
  group by course_id
),
examCnt as (
  select count(*) as total_exams, course_id from exams
  group by course_id
),
teacherCnt as (
  select count(*) as total_teachers, course_id from teachers
  group by course_id
),
studentCnt as (
  select count(*) as total_students, course_id from students
  group by course_id
),
courseDetails as (
  select c.*, coalesce(classCnt.total_classes, 0) total_classes, coalesce(examCnt.total_exams, 0) total_exams, coalesce(teacherCnt.total_teachers, 0) total_teachers, coalesce(studentCnt.total_students, 0) total_students from courses c 
  left join classCnt on classCnt.course_id = c.id
  left join examCnt on examCnt.course_id = c.id 
  left join teacherCnt on teacherCnt.course_id = c.id
  left join studentCnt on studentCnt.course_id = c.id
),
teacherPerCo as (
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
)
select c.*, co.total_rating from courseDetails c, coursePer co
where c.id not in (select s.course_id from students s
  where user_id = ${user_id})
and c.id = co.course_id
order by total_rating desc`

    return c.json({ result })
  } catch (error) {
    console.log(error)
    return c.json({ error: 'error' }, 400)
  }
}
