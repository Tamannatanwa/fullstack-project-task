import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VerifyOTP = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleVerifyOTP = async () => {
    try {
      const response = await axios.post('http://localhost:5000/verifyLoginOTP', { email, otp });
      const token = response.data.token; // Get the JWT token from the response
      const userId = response.data.userId; // Get userId from response
      localStorage.setItem("token", token); // Store the token in localStorage
      localStorage.setItem("userId", userId); // Store the userId in localStorage
      setMessage(response.data.message);
      navigate("/profile")
      setError('');
    } catch (err) {
      setMessage('');
      setError(err.response?.data?.message || 'Error verifying OTP');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Verify OTP
      </Typography>
      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="OTP"
        type="text"
        fullWidth
        margin="normal"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleVerifyOTP}
        sx={{ mt: 2 }}
      >
        Verify OTP
      </Button>
      {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
    </Box>
  );
};

export default VerifyOTP;
