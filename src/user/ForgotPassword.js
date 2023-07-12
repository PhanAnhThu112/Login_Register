import React, { useState } from 'react';
import './forgot.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCheckEmail = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.exists) {
          const resetPasswordResponse = await fetch('http://127.0.0.1:8000/api/users/generate-otp', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
          });

          if (resetPasswordResponse.ok) {
            window.alert('An OTP has been sent to your email.');
            setStep(2); // Chuyển sang bước xác thực OTP
          } else {
            setErrorMessage('Failed to send reset password request.');
          }
        } else {
          setErrorMessage('Email not found.');
        }
      } else {
        setErrorMessage(data.error);
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      {step === 1 && (
        <div className="forgot-password-container">
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button onClick={handleCheckEmail}>Check Email</button>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
