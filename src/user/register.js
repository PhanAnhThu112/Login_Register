import React, { useState } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import './Register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleRegisterSuccess = () => {
    console.log('Đăng ký thành công');
    // Chuyển hướng về trang chủ
    window.location.href = '/login';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Mật khẩu không khớp');
      return;
    }

    try {
      const hashedPassword = await hashPassword(password);

      const newUser = {
        username,
        password: hashedPassword,
      };

      const response = await axios.post('http://127.0.0.1:8000/api/users', newUser);

      // Kiểm tra phản hồi từ API nếu cần
      if (response.status === 201) {
        // Handle successful registration
        handleRegisterSuccess();
      } else {
        setError('Đăng ký không thành công. Vui lòng thử lại sau.');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Đăng ký không thành công. Vui lòng thử lại sau.');
      }
      console.error(error);
    }
  };

  const hashPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  };

  return (
    <div className="register-container">
      <h2>Đăng ký</h2>
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
        <div className="form-group">
          <label htmlFor="confirm-password">Xác nhận mật khẩu:</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        <button type="submit" className="login-button">
          Đăng ký
        </button>
      </form>
    </div>
  );
}

export default Register;
