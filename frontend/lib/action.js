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
    process.env.SUPABASE_URL + `/storage/v1/object/public/` + data.fullPath

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
  if (response.error)
    return {
      success: false,
      message: response.error,
    }
  const co = await cookies()
  co.set('token', response.token)
  redirect('/')
}

export async function logout(prevState, formData) {
  await cookies().delete('token')
  redirect('/')
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
  const response = await post_with_token('coaching_center/get_coaching_center', {
    coaching_center_id: cs_id,
  })
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

export async function viewCourses(cs_id) {
  const response = await post_with_token('course/view', {
    coaching_center_id: cs_id,
  })
  if (response.error) return response.error
  return response.result
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