import { CircleUserRound, Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from './ui/sheet'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import { useAuth0 } from '@auth0/auth0-react'
import MobileNavLinks from './MobileNavLinks'

const MobileNav = () => {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0()

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className='mt-1' />
      </SheetTrigger>
      <SheetContent className='p-3'>
        <SheetTitle className='flex justify-center'>
          {isAuthenticated ? (
            <span className='flex items-center gap-2'>
              <CircleUserRound />
              {user?.email}
            </span>
          ) : (
            <span>Welcome to ABYSS</span>
          )}
        </SheetTitle>
        <Separator />
        <SheetDescription className='flex flex-col gap-4'>
          {isAuthenticated ? (
            <MobileNavLinks />
          ) : (
            <Button
              onClick={() => loginWithRedirect()}
              className='w-full bg-chart-5 hover:bg-chart-4'>
              Login
            </Button>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav
