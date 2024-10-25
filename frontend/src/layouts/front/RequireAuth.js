import React, { useContext } from 'react'
import { user } from '../../Context/UserContext';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function RequireAuth() {

    const users = useContext(user);
    const location = useLocation();

    
  return  users.auth.userDetails ? (<Outlet />) : (<Navigate state={{ from: location }} replace to="/login" />)
  
}

export default RequireAuth;
