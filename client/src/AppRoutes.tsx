import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './layouts/MainLayout'
import HomePage from './pages/HomePage'

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route
        path='/about'
        element={<h1>About</h1>}
      />
      <Route
        path='/contact'
        element={<h1>Contact</h1>}
      />
      <Route
        path='*'
        element={<Navigate to='/' />}
      />
    </Routes>
  )
}

export default AppRoutes
