import { useContext } from 'react'
import { AuthContext } from "./context/AuthContext.js";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout'
import Tickets from './pages/Tickets'
import Login from './pages/Auth/Login'
import NotFound from './pages/404notFound';
import Register from './pages/Auth/Register';
import Dashboard from './pages/dashboard.jsx';
import LandingPage from './pages/landingPage.jsx';

function App() {

  const { user, loading } = useContext(AuthContext)
  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <span className="loading loading-dots loading-xl"></span>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />} >
          {user.logged_in === true
            ? (
              <>
                <Route index element={<Dashboard />} />
                <Route path='tickets' element={<Tickets />} />
              </>
            )
            :
            (
              <>
                <Route index element={<LandingPage />} />
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
              </>
            )
          }
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
