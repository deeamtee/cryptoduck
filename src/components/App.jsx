import React, { useState, useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import * as duckAuth from '../duckAuth.js';
import Ducks from './Ducks';
import Login from './Login';
import MyProfile from './MyProfile';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import './styles/App.css';
import { withRouter } from './withRouter.jsx'

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const auth = async (jwt) => {
    return duckAuth.getContent(jwt)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setUserData({
            username: res.username,
            email: res.email
          });
        }
      })
  };

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      auth(jwt);
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) navigate('/ducks');
  }, [loggedIn]);

  const onRegister = ({ username, password, email }) => {
    return duckAuth.register(username, password, email).then((res) => {
      if (!res || res.statusCode === 400) throw new Error('Что-то пошло не так');
      return res;
    });
  };

  const onLogin = ({ username, password }) => {
    return duckAuth.authorize(username, password).then((res) => {
      if (!res) throw new Error('Неправильные имя пользователя или пароль');
      if (res.jwt) {
        setLoggedIn(true);
        localStorage.setItem('jwt', res.jwt);
      }
    });
  };

  const onSignOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate('/login');
  };

    return (
      <Routes>
        <Route path='/ducks' element={<ProtectedRoute loggedIn={loggedIn} onSignOut={onSignOut} component={Ducks} />} />
        <Route path="/my-profile" element={<ProtectedRoute loggedIn={loggedIn} userData={userData} onSignOut={onSignOut} component={MyProfile} />} />
        <Route path="/login" element={
          <div className="loginContainer">
            <Login onLogin={onLogin} />
          </div>} />
        <Route path="/register" element={
          <Register onRegister={onRegister} />
        } />
        <Route path="*" element={loggedIn ? <Navigate to="/ducks" /> : <Navigate to="/login" />}/>
      </Routes>
    )
}

export default withRouter(App);
