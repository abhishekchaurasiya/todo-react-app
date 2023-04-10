import React, { useContext } from 'react'
import { AppContext } from '../context/AppContextProvider'
import Spinner from '../components/Spinner';
import { Navigate } from 'react-router-dom';


const ProfilePage = () => {
  const { user, loading, isAuthenticated } = useContext(AppContext);

  if (!isAuthenticated) return <Navigate to={"/login"} />;

  return (
    <div className='bg-gray-500 flex flex-col justify-center m-auto w-[400px] mt-10 rounded-md'>
      {
        loading ? (<div className='flex flex-col items-center'>
          <Spinner />
        </div>) :
          (<div className='flex flex-col justify-center items-center text-white gap-y-3 py-2 '>
            <h1> User:-    <span>{user?.name}  </span></h1>
            <p>{user?.email}</p>
          </div>)
      }
    </div>
  )
}

export default ProfilePage
