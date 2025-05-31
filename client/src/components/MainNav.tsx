import { useAuth0 } from '@auth0/auth0-react'
import { Button } from './ui/button'

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0()

  return (
    <Button
      onClick={async () => await loginWithRedirect()}
      className='border bg-chart-5 hover:bg-chart-4'>
      Login
    </Button>
  )
}

export default MainNav
