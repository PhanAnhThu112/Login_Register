import React, { useState } from 'react';
import axios from 'axios';
import './otp.css';

const OtpVerification = ({ handleNext }) => {
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/reset-password', {
        email: 'nguyenvanbien110821@gmail.com',
        otp_token: otp,
        password: password
      });

      const { data } = response;

      if (data.message) {
        // Chuyển hướng đến trang Login
        window.location.href = '/login';
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
    setError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError('');
  };

  return (
    <div className="otp-container">
      <h2 className="otp-heading">OTP Verification</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleVerifyOtp} className="otp-form">
        <div className="form-group">
          <label>OTP:</label>
          <input type="text" value={otp} onChange={handleOtpChange} required className="otp-input" />
        </div>
        {otp && (
          <div className="form-group">
            <label>New Password:</label>
            <input type="password" value={password} onChange={handlePasswordChange} required className="password-input" />
          </div>
        )}
        <button type="submit" className="verify-button">Verify OTP</button>
      </form>
    </div>
  );
};

export default OtpVerification;
