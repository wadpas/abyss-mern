import { useCreateUser } from '@/api/user'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthCallbackPage = () => {
  const navigate = useNavigate()
  const { user } = useAuth0()
  const { createUser } = useCreateUser()

  const hasCreatedUser = useRef(false)

  useEffect(() => {
    if (user?.sub && user?.email && user?.name && !hasCreatedUser.current) {
      createUser({
        auth0Id: user.sub,
        username: user.name,
        email: user.email,
      })
      hasCreatedUser.current = true
    }
    navigate('/')
  }, [createUser, navigate, user])

  return <>Loading...</>
}

export default AuthCallbackPage
