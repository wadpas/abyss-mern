import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='p-3 shadow bg-chart-5'>
      <div className='container flex items-center justify-between mx-auto text-card'>
        <Link
          to='/'
          className='text-2xl font-bold'>
          ABYSS
        </Link>
      </div>
    </div>
  )
}

export default Header
