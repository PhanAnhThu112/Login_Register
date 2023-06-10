import React, { useState } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginSuccess = () => {
    // Handle successful login here
    console.log('Đăng nhập thành công');
    // Additional handling (e.g., save login state, etc.)
    window.location.href = '/'; // Redirect to the homepage
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('http://127.0.0.1:8000/api/users');
      const users = response.data;

      const user = users.find((user) => user.username === username);

      if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
          // Successful login
          handleLoginSuccess();
        } else {
          setError('Tên đăng nhập hoặc mật khẩu không đúng');
        }
      } else {
        setError('Tên đăng nhập hoặc mật khẩu không đúng');
      }
    } catch (error) {
      setError('Đăng nhập không thành công. Vui lòng thử lại sau.');
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <h2>Đăng nhập</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Tên đăng nhập:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mật khẩu:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" className="login-button">
          Đăng nhập
        </button>
      </form>
    </div>
  );
}

export default Login;
