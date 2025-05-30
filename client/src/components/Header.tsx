import { Link } from 'react-router-dom'
import MobileNav from './MobileNav'
import MainNav from './MainNav'

const Header = () => {
  return (
    <div className='p-3 shadow bg-chart-5'>
      <div className='container flex items-center justify-between mx-auto text-card'>
        <Link
          to='/'
          className='text-xl font-bold md:text-2xl'>
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
