import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './layouts/MainLayout'

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <Layout>
            <h1>Home</h1>
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
