import type { Order, Restaurant } from '@/types'
import { useAuth0 } from '@auth0/auth0-react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'sonner'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useGetRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0()

  const getRestaurantRequest = async (): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently()

    const response = await fetch(`${API_BASE_URL}/api/restaurants`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to get restaurant')
    }
    return response.json()
  }

  const { data: restaurant, isLoading } = useQuery('fetchRestaurant', getRestaurantRequest)

  return { restaurant, isLoading }
}

export const useCreateRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0()

  const createRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently()

    const response = await fetch(`${API_BASE_URL}/api/restaurants`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    })

    if (!response.ok) {
      throw new Error('Failed to create restaurant')
    }

    return response.json()
  }

  const { mutate: createRestaurant, isLoading, isSuccess, error } = useMutation(createRestaurantRequest)

  if (isSuccess) {
    toast.success('Restaurant created!')
  }

  if (error) {
    toast.error('Unable to update restaurant')
  }

  return { createRestaurant, isLoading }
}

export const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0()

  const updateRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently()

    const response = await fetch(`${API_BASE_URL}/api/restaurants`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    })

    console.log(restaurantFormData)

    if (!response) {
      throw new Error('Failed to update restaurant')
    }

    return response.json()
  }

  const { mutate: updateRestaurant, isLoading, error, isSuccess } = useMutation(updateRestaurantRequest)

  if (isSuccess) {
    toast.success('Restaurant Updated')
  }

  if (error) {
    toast.error('Unable to update restaurant')
  }

  return { updateRestaurant, isLoading }
}
