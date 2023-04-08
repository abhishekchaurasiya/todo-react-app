import React, { useContext, useEffect } from 'react'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import ProfilePage from './Pages/ProfilePage'
import RegisterPage from './Pages/RegisterPage'
import axios from 'axios'
import { baseUrl } from './baseUrl'
import { AppContext } from './context/AppContextProvider'


const App = () => {
  const { setLoading, setIsAuthenticated, setUser } = useContext(AppContext)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`${baseUrl}/users/me`, {
          withCredentials: true
        });

        setUser(response.data.user);
        setIsAuthenticated(true)
        setLoading(false)

      } catch (error) {
        setUser({})
        setIsAuthenticated(false)
        setLoading(false)
      }
    };
    fetchData();
  }, [])

  return (
    <div className='grid w-full'>
      <Header />
  
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Routes>

    </div>
  )
}

export default App
