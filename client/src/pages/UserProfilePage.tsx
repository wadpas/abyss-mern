import { useUpdateUser } from '@/api/user'
import UserProfileForm from '@/forms/UserProfileForm'

const UserProfilePage = () => {
  const { updateUser, isLoading: isUpdateLoading } = useUpdateUser()

  return (
    <UserProfileForm
      onSave={updateUser}
      isLoading={isUpdateLoading}
    />
  )
}

export default UserProfilePage
