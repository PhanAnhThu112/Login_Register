import React, { useState } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';

const ResetPassword = ({ email }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      await axios.patch('http://127.0.0.1:8000/api/users/reset-password', {
        email,
        password: hashedPassword,
      });

      setSuccess('Password reset successful.');
      setError('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      setError('An error occurred. Please try again.');
      setSuccess('');
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError('');
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setError('');
  };

  return (
    <div>
      <h2>Reset Password</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleResetPassword}>
        <div className="form-group">
          <label>New Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} required />
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
