/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { userLoginApi } from '../api/UserApi';

import '../styles/Login.css';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'email') {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  const validateLogin = async () => {
    try {
      const { accessToken } = await userLoginApi(email, password);
      localStorage.setItem('todoAccessToken', accessToken);

      return true;
    } catch (err) {
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const isValid = await validateLogin();

    if (isValid) {
      navigate('/');
    } else {
      setError(true);
    }

    setIsLoading(false);
  };

  return (
    <div className="background-image">
      <section className="signIn">
        <form onSubmit={handleSubmit}>
          <div className="inputs-container">
            <label htmlFor="login">
              <input
                name="email"
                id="login"
                value={email}
                onChange={handleChange}
                type="email"
                required
                placeholder="e-mail"
              />
            </label>

            <label htmlFor="password">
              <input
                name="password"
                id="password"
                value={password}
                onChange={handleChange}
                type="password"
                required
                placeholder="senha"
              />
            </label>
          </div>

          <span className="recover-password">
            <Link to="/recover-password">
              <p>esqueci a senha</p>
            </Link>
          </span>

          {error && (
          <div className="error-msg">
            <p>E-mail ou senha inválido</p>
          </div>
          )}

          <div className="inputs-buttons">
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>

            <Link to="/signup">
              <button type="button">Cadastrar</button>
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Login;
