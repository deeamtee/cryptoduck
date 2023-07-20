import React from 'react';
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props  }) => {
  return (
    props.loggedIn ? <Component {...props} /> : <Navigate to="/login" replace/>
)}

export default ProtectedRoute;
