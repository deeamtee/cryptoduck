import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import './styles/Login.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const resetForm = () => {
    setUsername('');
    setPassword('');
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    onLogin({ username, password })
      .then(resetForm)
      .then(() => navigate('/ducks'))
      .catch((err) => setMessage(err.message || 'Что-то пошло не так'));
  };

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      navigate('/ducks');
    }
  }, []);

  return(
    <div className="login">
      <Logo title={'CryptoDucks'}/>
      <p className="login__welcome">
        Это приложение содержит конфиденциальную информацию. 
        Пожалуйста, войдите или зарегистрируйтесь, чтобы получить доступ к CryptoDucks.
      </p>
      <p className="login__error">
        {message}
      </p>
      <form className="login__form" onSubmit={handleSubmit}>
        <label htmlFor="username">
          Логин:
        </label>
        <input
          id="username"
          required
          name="username"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <label htmlFor="password">
          Пароль:
        </label>
        <input
          id="password"
          required
          name="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <div className="login__button-container">
          <button type="submit" className="login__link">Войти</button>
        </div>
      </form>
      <div className="login__signup">
        <p>Ещё не зарегистрированы?</p>
        <Link to="/register" className="signup__link">Зарегистрироваться</Link>
      </div>
    </div>
  );
}

export default Login;
