import { useCreateRestaurant, useGetRestaurant } from '@/api/restaurant'
import RestaurantForm from '@/forms/RestaurantForm'
import { Tabs, TabsContent } from '@/components/ui/tabs'

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreateLoading } = useCreateRestaurant()
  const { restaurant } = useGetRestaurant()

  return (
    <RestaurantForm
      restaurant={restaurant}
      onSave={createRestaurant}
      isLoading={isCreateLoading}
    />
  )
}

export default ManageRestaurantPage
