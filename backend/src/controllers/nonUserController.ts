import sql from '../db'

export const getAllCoachingCentersNonUser = async (c: any) => {
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
  order by total_rating desc
  offset 0 limit 5`

    return c.json({ result })
  } catch (error) {
    console.log(error)
    return c.json({ error: 'error' }, 400)
  }
}

export const getAllNonUserCourses = async (c: any) => {
  try {
    const { program_name, course_name } = await c.req.json()
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
and lower(c.program) like lower(${program_name})
and lower(c.name) like lower(${course_name})
order by co.total_rating desc
`
    return c.json({ result })
  } catch (error) {
    console.log(error)
    return c.json({ error: 'error' }, 400)
  }
}
