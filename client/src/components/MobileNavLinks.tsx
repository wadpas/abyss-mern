import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { useAuth0 } from '@auth0/auth0-react'

const MobileNavLinks = () => {
  const { logout } = useAuth0()

  return (
    <>
      <Link
        to='/order-status'
        className='flex items-center hover:text-chart-5'>
        Order Status
      </Link>
      <Link
        to='/manage-restaurant'
        className='flex items-center hover:text-chart-5'>
        My Restaurant
      </Link>
      <Link
        to='/user-profile'
        className='flex items-center hover:text-chart-5'>
        User Profile
      </Link>
      <Button
        onClick={() => logout()}
        className='flex items-center px-3 font-bold hover:bg-chart-4 bg-chart-5'>
        Log Out
      </Button>
    </>
  )
}

export default MobileNavLinks
