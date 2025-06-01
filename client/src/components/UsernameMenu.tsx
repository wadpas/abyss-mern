import { CircleUserRound } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'
import { Separator } from './ui/separator'
import { Button } from './ui/button'

const UsernameMenu = () => {
  const { user, logout } = useAuth0()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='flex items-center gap-2 px-3 font-bold hover:text-secondary'>
        <CircleUserRound />
        {user?.email}
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-2'>
        <DropdownMenuItem>
          <Link to='/manage-restaurant'>Manage Restaurant</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to='/user-profile'>User Profile</Link>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem>
          <Button
            variant='destructive'
            onClick={() => logout()}
            className='flex flex-1 '>
            Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UsernameMenu
