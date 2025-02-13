'use server'

import mailChecker from 'mailchecker'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { cache } from 'react'
import { createClient } from '../utils/supabase/server'

const server_url = process.env.SERVER_URL + '/'

export const post = cache(async (url, data) => {
  url = server_url + url

  const response = await fetch(
    url,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    },
    {
      cache: 'force-cache',
    },
    { next: { revalidate: 30000 } },
  )
  try {
    const json = await response.json()
    return json
  } catch (error) {
    console.error('JSON Error:', error)
    return {
      error: 'An error occurred',
    }
  }
})

export const get = cache(async (url) => {
  url = server_url + url

  const response = await fetch(
    url,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    {
      cache: 'force-cache',
    },
    { next: { revalidate: 30000 } },
  )
  try {
    const json = await response.json()
    return json
  } catch (error) {
    console.error('Error:', error)
  }
})

export const get_with_token = cache(async (url) => {
  const co = await cookies()
  const token = co.get('token')
  if (token === undefined)
    return {
      error: 'Unauthorized',
    }

  const response = await fetch(
    server_url + url,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.value}`,
      },
    },
    {
      cache: 'force-cache',
    },
    { next: { revalidate: 30000 } },
  )
  try {
    const json = await response.json()
    return json
  } catch (error) {
    return {
      error: 'An error occurred ' + error,
    }
  }
})

export const post_with_token = cache(async (url, data) => {
  const co = await cookies()
  const token = co.get('token')
  if (token === undefined)
    return {
      error: 'Unauthorized',
    }

  const response = await fetch(
    server_url + url,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify(data),
    },
    {
      cache: 'force-cache',
    },
    { next: { revalidate: 30000 } },
  )
  try {
    const json = await response.json()
    return json
  } catch (error) {
    console.error('Error:', error)
    return {
      error: 'An error occurred',
    }
  }
})

async function uploadImage(folder, uId, file, bucket) {
  const supabase = await createClient()
  const fileName = Date.now() + '_' + file.name
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(folder + '/' + uId + '/' + fileName, file)
  if (error) return { error }
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL +
    `/storage/v1/object/public/` +
    data.fullPath

  return { data, url }
}

export async function signUp(prevState, formData) {
  let raw = Object.fromEntries(formData)
  raw.type = prevState.type

  if (raw.password !== raw.confirm_password) {
    return {
      success: false,
      message: 'Passwords do not match',
      type: prevState.type,
    }
  }

  if (mailChecker.isValid(raw.email)) {
    const { url, error } = await uploadImage(
      'profile_pictures',
      raw.email,
      raw.profile_pic,
      'store_room',
    )

    if (error) {
      console.log('error image: ', error)
      return {
        success: false,
        message: 'Error uploading image',
        coaching_center_id: raw.coaching_center_id,
      }
    }

    raw.profile_pic = url

    const response = await post('user/signup', raw)
    if (response.error) {
      return {
        success: false,
        message: response.error,
        type: prevState.type,
      }
    } else redirect(`/login/${prevState.type.toLowerCase()}`)
  } else {
    return {
      success: false,
      message: 'Invalid email',
      type: prevState.type,
    }
  }
}

export async function login(prevState, formData) {
  const raw = Object.fromEntries(formData)
  raw.type = prevState.type
  const response = await post('user/login', raw)
  if (response.error) {
    revalidatePath(`/login/${prevState.type.toLowerCase()}`)
    return {
      success: false,
      message: response.error,
      type: prevState.type,
    }
  }
  const co = await cookies()
  co.set('token', response.token)
  redirect('/')
}

export async function logout(prevState, formData) {
  await cookies().delete('token')
  redirect('/')
}

export async function getUserInfo() {
  const response = await get_with_token('user/info/get_user')
  if (response.error) return response.error
  return response.user[0]
}

export async function cntUnseenNotifications() {
  const response = await get_with_token('user/info/cnt_unseen_notifications')
  if (response.error) return response.error
  return response.result[0]
}

export async function getNotifications() {
  const response = await get_with_token('user/info/get_notifications')
  if (response.error) return response.error
  return response.result
}

export async function getNotificationsOffset(prevState, formData) {
  const raw = Object.fromEntries(formData)

  const response = await post_with_token(
    'user/info/get_notifications_offset',
    raw,
  )

  if (response.error) {
    return {
      success: false,
      message: response.error,
      notifications: [],
    }
  }
  return {
    success: true,
    message: `Notification fetched successfully`,
    notifications: response.result,
  }
}

export async function seenNotifications() {
  const response = await get_with_token('user/info/seen_notificatoins')
  if (response.error) return response.error
  return response.result
}

export async function forgetPassword(prevState, formData) {
  const raw = Object.fromEntries(formData)
  const response = await post('user/forget_pass', {
    email: raw.email,
  })
  if (response.error) {
    return {
      success: false,
      message: response.error,
    }
  }

  redirect(`/otp?email=${raw.email}`)
}

export async function otpCheck(prevState, formData) {
  const raw = Object.fromEntries(formData)
  raw.email = prevState.email
  const response = await post('user/otp_check', {
    email: raw.email,
    otp: raw.otp,
  })

  if (response.error) {
    return {
      success: false,
      message: response.error,
      email: raw.email,
    }
  }

  redirect(`/reset_password?email=${raw.email}`)
}

export async function resetPass(prevState, formData) {
  const raw = Object.fromEntries(formData)
  raw.email = prevState.email

  if (raw.password !== raw.confirm_password) {
    return {
      success: false,
      message: 'Passwords do not match',
      email: raw.email,
    }
  }

  const response = await post('user/reset_pass', {
    email: raw.email,
    password: raw.password,
  })

  if (response.error) {
    return {
      success: false,
      message: response.error,
      email: raw.email,
    }
  }

  redirect(`/login/${response.type.toLowerCase()}`)
}

export async function createCoachingCenter(prevState, formData) {
  const raw = Object.fromEntries(formData)

  let authorities_emails = []
  const entries = Object.entries(raw)

  entries.forEach(async ([key, value]) => {
    if (key.startsWith('authority-') && value !== '') {
      authorities_emails.push(value)
    }
  })
  authorities_emails = [...new Set(authorities_emails)]

  const { url, error } = await uploadImage(
    'coaching_centers',
    raw.name,
    raw.image,
    'store_room',
  )

  if (error) {
    console.log('error image: ', error)
    return {
      success: false,
      message: 'Error uploading image',
    }
  }

  const response = await post_with_token('coaching_center/create', {
    name: raw.name,
    image: url,
    authorities_emails,
  })

  if (response.error) {
    return {
      success: false,
      message: response.error,
    }
  }
  revalidatePath('my_dashboard/create_new_coaching_center')
  return {
    success: true,
    message: `Coaching Center ${raw.name} created successfully`,
  }
}

export async function viewCoachingCenters() {
  const response = await get_with_token('coaching_center/view')
  if (response.error) return response.error
  return response.result
}

export async function getCoachingCenter(cs_id) {
  const response = await post_with_token(
    'coaching_center/get_coaching_center',
    {
      coaching_center_id: cs_id,
    },
  )
  if (response.error) return response.error
  return response.result
}

export async function createCourse(prevState, formData) {
  let raw = Object.fromEntries(formData)
  raw.coaching_center_id = prevState.coaching_center_id

  let ins_emails = []
  const entries = Object.entries(raw)

  entries.forEach(async ([key, value]) => {
    if (key.startsWith('instructor-') && value !== '') {
      ins_emails.push(value)
    }
  })
  ins_emails = [...new Set(ins_emails)]

  raw.ins_emails = ins_emails

  const { url, error } = await uploadImage(
    raw.coaching_center_id,
    raw.name,
    raw.image,
    'store_room',
  )

  if (error) {
    console.log('error image: ', error)
    return {
      success: false,
      message: 'Error uploading image',
      coaching_center_id: raw.coaching_center_id,
    }
  }

  raw.image = url

  const response = await post_with_token('course/create', raw)

  if (response.error) {
    return {
      success: false,
      message: response.error,
      coaching_center_id: raw.coaching_center_id,
    }
  }
  revalidatePath(`coaching_center/${raw.coaching_center_id}/new_course`)
  return {
    success: true,
    message: `New course ${raw.name} created successfully`,
    coaching_center_id: raw.coaching_center_id,
  }
}

export async function viewCourses(cs_id, program, course) {
  const response = await post_with_token('course/view', {
    coaching_center_id: cs_id,
    program_name: '%' + program + '%',
    course_name: '%' + course + '%',
  })
  if (response.error) return response.error
  return response.result
}

export async function searchCourses(prevState, formData) {
  let raw = Object.fromEntries(formData)

  redirect(
    `/coaching_center/${prevState.cs_id}?program=${raw.program}&course=${raw.course}`,
  )
}

export async function getCourse(course_id) {
  const response = await post_with_token('course/get_course', {
    course_id,
  })
  if (response.error) return response.error
  return response.result
}

export async function getTeachers(course_id) {
  const response = await post_with_token('course/get_teachers', {
    course_id,
  })
  if (response.error) return response.error
  return response.result
}

export async function addClass(prevState, formData) {
  let raw = Object.fromEntries(formData)
  raw.course_id = prevState.course_id

  let items = []

  const entries = Object.entries(raw)

  entries.forEach(async ([key, value]) => {
    if (key.startsWith('topic-') && value !== '') {
      items.push(value)
    }
  })

  raw.topics = [...new Set(items)]

  const regex = /[?&]v=([^&]+)/

  const match = raw.link.match(regex)

  if (match) {
    raw.link = `https://www.youtube.com/embed/${match[1]}`
  } else {
    return {
      success: false,
      message: 'Invalid video link',
      course_id: raw.course_id,
    }
  }

  const response = await post_with_token('course/add_class', raw)

  if (response.error) {
    return {
      success: false,
      message: response.error,
      course_id: raw.course_id,
    }
  }
  revalidatePath(`course/${raw.course_id}/add_new_class`)
  return {
    success: true,
    message: `New class '${raw.title}' added successfully`,
    course_id: raw.course_id,
  }
}

export async function addExam(prevState, formData) {
  let raw = Object.fromEntries(formData)
  raw.course_id = prevState.course_id

  const regex = /^[0-9]{1,2}:[0-9]{1,2}$/
  if (!regex.test(raw.duration)) {
    return {
      success: false,
      message: 'Invalid duration format',
      course_id: raw.course_id,
    }
  }

  const { url, error } = await uploadImage(
    raw.course_id,
    raw.title,
    raw.question_paper,
    'store_room',
  )

  if (error) {
    console.log('error image: ', error)
    return {
      success: false,
      message: 'Error uploading file',
      course_id: raw.course_id,
    }
  }

  raw.question_paper = url

  const response = await post_with_token('course/add_exam', raw)

  if (response.error) {
    return {
      success: false,
      message: response.error,
      course_id: raw.course_id,
    }
  }
  revalidatePath(`course/${raw.course_id}/add_new_exam`)
  return {
    success: true,
    message: `New exam '${raw.title}' added successfully`,
    course_id: raw.course_id,
  }
}

export async function viewContents(course_id) {
  const response = await post_with_token('course/view_contents', {
    course_id,
  })
  if (response.error) return response.error
  return response.result
}

export async function getClass(class_id) {
  const response = await post_with_token('course/get_class', {
    class_id,
  })
  if (response.error) return response.error
  return response.result
}

export async function getExam(exam_id) {
  const response = await post_with_token('course/get_exam', {
    exam_id,
  })
  if (response.error) return response.error
  return response.result
}

export async function getAllCourses(program, course) {
  const response = await post_with_token('course/get_all_courses', {
    program_name: '%' + program + '%',
    course_name: '%' + course + '%',
  })
  if (response.error) return response.error
  return response.result
}

export async function searchAllCourses(prevState, formData) {
  let raw = Object.fromEntries(formData)

  redirect(`/courses?program=${raw.program}&course=${raw.course}`)
}

export async function addStudent(prevState, formData) {
  let raw = Object.fromEntries(formData)
  raw.course_id = prevState.course_id

  const response = await post_with_token('course/add_student', raw)

  if (response.error) {
    return {
      success: false,
      message: response.error,
      course_id: raw.course_id,
    }
  }

  redirect(`/course/${raw.course_id}`)
}

export async function isRegistered(course_id) {
  const response = await post_with_token('course/is_registered', {
    course_id,
  })
  if (response.error) return response.error
  const type = response.result[0].type
  const registered = Number(response.result[0].registered)
  return { type, registered }
}

export async function isRegisteredAuthor(cs_id) {
  const response = await post_with_token('course/is_registered_authority', {
    coaching_center_id: cs_id,
  })
  if (response.error) return response.error
  const registered = Number(response.result[0].registered)
  return { registered }
}

export async function submitAnswer(prevState, formData) {
  let raw = Object.fromEntries(formData)
  raw.exam_id = prevState.exam_id
  raw.course_id = prevState.course_id

  // console.log('raw: ', raw)

  // return {
  //   success: true,
  //   message: 'Answer submitted successfully',
  //   course_id: raw.course_id,
  // }

  const { url, error } = await uploadImage(
    raw.course_id,
    raw.title,
    raw.answer_paper,
    'store_room',
  )

  if (error) {
    console.log('error image: ', error)
    return {
      success: false,
      message: 'Error uploading file',
      course_id: raw.course_id,
      exam_id: raw.exam_id,
    }
  }

  raw.answer_paper = url

  const response = await post_with_token('course/submit_answer', raw)

  if (response.error) {
    return {
      success: false,
      message: response.error,
      course_id: raw.course_id,
      exam_id: raw.exam_id,
    }
  }
  revalidatePath(`course/${raw.course_id}/exam/${raw.exam_id}`)
  return {
    success: true,
    message: `Your answer submitted successfully`,
    course_id: raw.course_id,
    exam_id: raw.exam_id,
  }
}

export async function submitClassReview(prevState, formData) {
  let raw = Object.fromEntries(formData)
  raw.class_id = prevState.class_id
  raw.course_id = prevState.course_id

  // console.log('raw: ', raw)

  // return {
  //   success: true,
  //   message: 'Review submitted successfully',
  //   course_id: raw.course_id,
  //   class_id: raw.class_id,
  // }

  const response = await post_with_token('course/submit_class_review', raw)

  if (response.error) {
    return {
      success: false,
      message: response.error,
      course_id: raw.course_id,
      class_id: raw.class_id,
    }
  }
  revalidatePath(`course/${raw.course_id}/class/${raw.class_id}`)
  return {
    success: true,
    message: `Your review submitted successfully`,
    course_id: raw.course_id,
    class_id: raw.class_id,
  }
}

export async function getNewScripts(course_id, offset) {
  const response = await post_with_token('course/get_new_scripts', {
    course_id,
    offset,
  })
  if (response.error) return response.error
  return response.result
}

export async function getPrevScripts(course_id, offset) {
  const response = await post_with_token('course/get_prev_scripts', {
    course_id,
    offset,
  })
  if (response.error) return response.error
  return response.result
}

export async function updateMark(prevState, formData) {
  let raw = Object.fromEntries(formData)

  // console.log('raw: ', raw)

  // return {
  //   success: true,
  //   message: 'Answer submitted successfully',
  // }

  const response = await post_with_token('course/update_mark', raw)

  if (response.error) {
    return {
      success: false,
      message: response.error,
    }
  }
  revalidatePath(`course/${raw.course_id}/script_evaluation`)
  return {
    success: true,
    message: `Your answer submitted successfully`,
  }
}

export async function viewStudentsRating(course_id) {
  const response = await post_with_token('course/view_students_rating', {
    course_id,
  })
  if (response.error) return response.error
  return response.result
}

export async function viewTeacherMonitoring(course_id) {
  const response = await post_with_token('course/view_teacher_monitoring', {
    course_id,
  })
  if (response.error) return response.error
  return response.result
}

export async function teacherPayment(prevState, formData) {
  let raw = Object.fromEntries(formData)

  const response = await post_with_token('course/teacher_payment', raw)

  if (response.error) {
    return {
      success: false,
      message: response.error,
    }
  }

  revalidatePath(`course/${raw.course_id}/teacher_monitoring`)
  return {
    success: true,
    message: `Payment updated successfully`,
  }
}

export async function getNewCourses(coaching_center_id, program, course) {
  const response = await post_with_token('course/get_new_courses', {
    coaching_center_id,
    program_name: '%' + program + '%',
    course_name: '%' + course + '%',
  })
  if (response.error) return response.error
  return response.result
}

export async function searchNewCourses(prevState, formData) {
  let raw = Object.fromEntries(formData)

  redirect(
    `/coaching_center/${prevState.cs_id}/buy_new_course?program=${raw.program}&course=${raw.course}`,
  )
}

export async function studentDashboard(cs_id) {
  const response = await post_with_token('coaching_center/student_dashboard', {
    coaching_center_id: cs_id,
  })
  if (response.error) return response.error
  return response.result
}

export async function getAllCoachingCenters() {
  const response = await get_with_token('coaching_center/view_all')
  if (response.error) return response.error
  return response.result
}

export async function getScript(exam_id) {
  const response = await post_with_token('course/get_script', {
    exam_id,
  })
  if (response.error) return response.error
  return response.result
}

export async function getClassReviews(class_id) {
  const response = await post_with_token('course/get_class_reviews', {
    class_id,
  })
  if (response.error) return response.error
  return response.result
}

export async function getAllCoachingCentersNonUser() {
  const response = await get('non_user/view_all_coaching_centers')
  if (response.error) return response.error
  return response.result
}
