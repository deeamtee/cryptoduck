import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import * as duckAuth from '../duckAuth.js';
import Ducks from './Ducks';
import Login from './Login';
import MyProfile from './MyProfile';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import './styles/App.css';
import { withRouter } from './withRouter.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    }
    this.tokenCheck = this.tokenCheck.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    this.tokenCheck();
  };


  handleLogin(userData) {
    this.setState({
      loggedIn: true,
      userData,
    })
  }

  tokenCheck = () => {
    // const { location } = this.props;
    if (localStorage.getItem('jwt')) {
      let jwt = localStorage.getItem('jwt');
      duckAuth.getContent(jwt).then((res) => {
        if (res) {
          let userData = {
            username: res.username,
            email: res.email
          }
          this.setState({
            loggedIn: true,
            userData
          }, () => {
            this.props.navigate('/');
          });
        }
      });
    }
  }

  render() {
    return (
      <Routes>
        <Route path='/ducks' element={<ProtectedRoute loggedIn={this.state.loggedIn} component={Ducks} />} />
        <Route path="/my-profile" element={<ProtectedRoute loggedIn={this.state.loggedIn} userData={this.state.userData} component={MyProfile} />} />
        <Route path="/login" element={
          <div className="loginContainer">
            <Login handleLogin={this.handleLogin} tokenCheck={this.tokenCheck} />
          </div>} />
        <Route path="/register" element={
          <Register />
        } />
        <Route path="*" element={!this.state.loggedIn ? <Navigate to="/ducks" /> : <Navigate to="/login" />}/>
      </Routes>
    )
  }
}

export default withRouter(App);
