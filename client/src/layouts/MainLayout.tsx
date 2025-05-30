import Header from '@/components/Header'

type Props = {
  children: React.ReactNode
}

const MainLayout = ({ children }: Props) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <div className='container flex-1 p-5 mx-auto'>{children}</div>
    </div>
  )
}

export default MainLayout
