import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import {isTokenExpired} from '../../utils/isTokenExpired'

const PrivateRoute = () => {
    const token = (localStorage.getItem('token'))

  return (
    <div>
        {
            token && !isTokenExpired(token) ? <Outlet/> : <Navigate to="/login" />
        }
        
    </div>
  )
}

export default PrivateRoute
