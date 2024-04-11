import React from 'react'
import { Navigate } from 'react-router-dom'

const ProductedRouter = ({isAuthenticated, role, children}) => {
  if(!isAuthenticated){
    return <Navigate to={'/login'} />
  } else if (role !== "admin") {
    return <Navigate to={'/login'} />
  } 
  return children;

}

export default ProductedRouter;