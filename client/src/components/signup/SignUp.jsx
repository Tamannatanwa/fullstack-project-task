import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  TextField,
  Card,
  Button,
  InputLabel,
  IconButton,
  InputAdornment,
  useMediaQuery,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";


const SignUp = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordVisibility = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      showPassword: !prevFormData.showPassword,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/register",
        formData
      );
      setLoading(false);
      alert("OTP sent successful!");
      navigate("/verifyOtp");
    } catch (error) {
      setLoading(false);
      console.error("Error while signing up:", error);
      alert("Error occurred during SignUp!");
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card
        sx={{
          width: isMobile ? "100%" : "50%",
          padding: isMobile ? "20px" : "40px",
          backgroundColor: "#FFFFFF",
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={handleSubmit}>
            <Grid container justifyContent="center" sx={{ mb: 4 }}>
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/008/154/360/small/student-logo-vector.jpg"
                alt="logo"
                style={{ width: "100px" }}
              />
            </Grid>

            <Box sx={{ marginBottom: "20px" }}>
              <InputLabel htmlFor="username" style={{ marginBottom: "10px" }}>
                Username
              </InputLabel>
              <TextField
                fullWidth
                id="username"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Box>

            <Box sx={{ marginBottom: "20px" }}>
              <InputLabel htmlFor="email" style={{ marginBottom: "10px" }}>
                Email
              </InputLabel>
              <TextField
                fullWidth
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Box>

            <Box sx={{ marginBottom: "20px" }}>
              <InputLabel
                htmlFor="password"
                style={{ marginBottom: "10px", marginTop: "25px" }}
              >
                Password
              </InputLabel>
              <TextField
                fullWidth
                id="password"
                name="password"
                type={formData.showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handlePasswordVisibility} edge="end">
                        {formData.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                required
              />
            </Box>

            <Grid container justifyContent="center" sx={{ mb: 3 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                sx={{
                  borderRadius: "50px",
                  padding: "18px",
                  width: "250px",
                }}
              >
                Signup
              </Button>
            </Grid>

            <Grid container justifyContent="center" sx={{ mb: 4 }}>
              <Typography variant="h6">Already have an account</Typography>
              <Typography variant="body1" fontSize={20}>
                <Link to="/login" style={{ color: "blue" }}>
                  Go To Login Page
                </Link>
              </Typography>
            </Grid>
          </form>
        </Container>
      </Card>
    </Container>
  );
};

export default SignUp;
