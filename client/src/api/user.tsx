import type { User } from '@/types'
import { useAuth0 } from '@auth0/auth0-react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'sonner'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useGetUser = () => {
  const { getAccessTokenSilently } = useAuth0()

  const getUserRequest = async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently()

    const response = await fetch(`${API_BASE_URL}/api/users/my`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch user')
    }

    const { user } = await response.json()

    return user
  }

  const { data: currentUser, isLoading, error } = useQuery('fetchCurrentUser', getUserRequest)

  if (error) {
    toast.error(error.toString())
  }

  return { currentUser, isLoading }
}

type CreateUserRequest = {
  auth0Id: string
  username: string
  email: string
}

export const useCreateUser = () => {
  const { getAccessTokenSilently } = useAuth0()

  const createUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently()

    const response = await fetch(`${API_BASE_URL}/api/users/my`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })

    if (!response.ok) {
      throw new Error('Failed to create user')
    }
  }

  const { mutateAsync: createUser, isLoading, isError, isSuccess } = useMutation(createUserRequest)

  return { createUser, isLoading, isError, isSuccess }
}

type UpdateUserRequest = {
  username: string
  name: string
  address: string
  city: string
  country: string
}

export const useUpdateUser = () => {
  const { getAccessTokenSilently } = useAuth0()

  const updateUserRequest = async (formData: UpdateUserRequest) => {
    const accessToken = await getAccessTokenSilently()
    console.log(formData)

    const response = await fetch(`${API_BASE_URL}/api/users/my`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      throw new Error('Failed to update user')
    }

    return response.json()
  }

  const { mutateAsync: updateUser, isLoading, isSuccess, error, reset } = useMutation(updateUserRequest)

  if (isSuccess) {
    toast.success('User profile updated!')
  }

  if (error) {
    toast.error(error.toString())
    reset()
  }

  return { updateUser, isLoading }
}
