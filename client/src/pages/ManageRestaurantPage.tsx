import { useCreateRestaurant } from '@/api/restaurant'
import ManageRestaurantForm from '@/forms/RestaurantForm'
import { Tabs, TabsContent } from '@/components/ui/tabs'

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreateLoading } = useCreateRestaurant()

  return (
    <ManageRestaurantForm
      onSave={createRestaurant}
      isLoading={isCreateLoading}
    />
  )
}

export default ManageRestaurantPage
