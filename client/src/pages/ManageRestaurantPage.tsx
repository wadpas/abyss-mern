import { useCreateRestaurant, useGetRestaurant, useUpdateMyRestaurant } from '@/api/restaurant'
import RestaurantForm from '@/forms/RestaurantForm'
import { Tabs, TabsContent } from '@/components/ui/tabs'

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreateLoading } = useCreateRestaurant()
  const { updateRestaurant, isLoading: isUpdateLoading } = useUpdateMyRestaurant()
  const { restaurant, isLoading } = useGetRestaurant()

  if (isLoading) {
    return <span>Loading...</span>
  }

  const isEditing = !!restaurant

  return (
    <RestaurantForm
      restaurant={restaurant}
      onSave={isEditing ? updateRestaurant : createRestaurant}
      isLoading={isCreateLoading || isUpdateLoading}
    />
  )
}

export default ManageRestaurantPage
