import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import {isTokenExpired} from '../../utils/isTokenExpired'

const PublicRoutes = () => {
    const token = (localStorage.getItem('token'))

  return (
    <div>
        {
            token && !isTokenExpired(token) ? <Navigate to="/main" /> : <Outlet/>
        }
        
    </div>
  )
}

export default PublicRoutes
