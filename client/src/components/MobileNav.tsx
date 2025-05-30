import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from './ui/sheet'
import { Separator } from './ui/separator'
import { Button } from './ui/button'

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className='mt-1 ' />
      </SheetTrigger>
      <SheetContent className='p-3'>
        <SheetTitle>
          <span>Welcome to ABYSS</span>
        </SheetTitle>
        <Separator />
        <SheetDescription className='flex flex-col gap-2'>
          <Button className='w-full bg-chart-5'>Login</Button>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav
