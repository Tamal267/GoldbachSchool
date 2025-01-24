'use server'

import mailChecker from 'mailchecker'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { cache } from 'react'
import { createClient } from '../utils/supabase/server'

const server_url = process.env.SERVER_URL + '/'

export const post = cache(async (url, data) => {
  url = server_url + url
  console.log('url: ', url)

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
  const token = cookies().get('token')
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
  const token = cookies().get('token')
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
  console.log('raw', raw)
  console.log('prevState', prevState)

  if (raw.password !== raw.confirm_password) {
    prevState.success = false
    prevState.message = 'Passwords do not match'
    return prevState
  }

  if (mailChecker.isValid(raw.email)) {
    const response = await post('user/signup', raw)
    if (response.error) {
      prevState.success = false
      prevState.message = response.error
      return prevState
    }
    redirect(`/login/${prevState.type.toLowerCase()}`)
  } else {
    prevState.success = false
    prevState.message = 'Invalid email'
    return prevState
  }
}

export async function login(prevState, formData) {
  const raw = Object.fromEntries(formData)
  raw.type = prevState.type
  console.log('raw', raw)
  const response = await post('user/login', raw)
  if (response.error)
    return {
      success: false,
      message: response.error,
    }
  await cookies().set('token', response.token)
  redirect('/')
}

export async function logout(prevState, formData) {
  await cookies().delete('token')
  redirect('/')
}
