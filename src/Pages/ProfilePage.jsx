import React, { useContext } from 'react'
import { AppContext } from '../context/AppContextProvider'
import Spinner from '../components/Spinner';
import { NavLink } from 'react-router-dom';

const ProfilePage = () => {
  const { user, loading, isAthunticated } = useContext(AppContext);


  return (
    <div>
      {
        loading ? <Spinner /> :
          (<div>
            <h1>{user?.name}</h1>
            <p>{user?.email}</p>
          </div>)
      }
    </div>
  )
}

export default ProfilePage
