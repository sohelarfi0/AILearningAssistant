import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = () => {

    const isAuthenticated=true;
    const loading=false;

    if(loading){
        return <div>Loading....</div>;
    }

  return isAuthenticated ? (
    <AppLayot>
        <Outlet/>
    </AppLayot>
  ):(
    <Navigate to="/login" replace/>
  );
}

export default ProtectedRoute