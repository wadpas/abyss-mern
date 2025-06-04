import { Link } from 'react-router-dom'
import MobileNav from './MobileNav'
import MainNav from './MainNav'

const Header = () => {
  return (
    <div className=' shadow bg-chart-5'>
      <div className='container px-4 py-3 flex items-center justify-between mx-auto text-card'>
        <Link
          to='/'
          className='text-2xl tracking-tight md:text-3xl'>
          ABYSS
        </Link>
        <div className='md:hidden'>
          <MobileNav />
        </div>
        <div className='hidden md:block'>
          <MainNav />
        </div>
      </div>
    </div>
  )
}

export default Header
