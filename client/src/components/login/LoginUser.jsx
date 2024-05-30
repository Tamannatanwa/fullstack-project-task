import React, { useState } from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  TextField,
  Card,
  Button,
  useMediaQuery,
  InputLabel,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const LoginUser = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
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
      const response = await axios.post("http://localhost:5000/login", {
        email: formData.email,
        password: formData.password,
      });
      setLoading(false);
      alert("OTP sent successful!");
      navigate("/LoginOtpVerify");
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data) {
        const { message } = error.response.data;
        let newErrors = {};
        if (message === "Invalid Email or Password") {
          newErrors = {
            ...newErrors,
            email: "Email is incorrect",
            password: "Password is incorrect",
          };
        }
        if (message === "Email not found") {
          newErrors = { ...newErrors, email: "Email is incorrect" };
        }
        if (message === "Invalid password") {
          newErrors = { ...newErrors, password: "Password is incorrect" };
        }
        setErrors(newErrors);
      }
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
                error={!!errors.email}
                helperText={errors.email}
                InputProps={{
                  sx: {
                    padding: "25px 12px",
                    height: "40px",
                    "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                      borderColor: errors.email ? "red" : "none",
                    },
                  },
                }}
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
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handlePasswordVisibility}
                        edge="end"
                        sx={{ marginRight: "-8px" }}
                      >
                        {formData.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: "8px",
                    padding: "25px 2px",
                    height: "40px",
                  },
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
                Login
              </Button>
            </Grid>

            <Grid container justifyContent="center" sx={{ mb: 4 }}>
              <Typography variant="h6">Don't have an account?</Typography>
              <Typography variant="body1" fontSize={20}>
                <Link to="/" style={{ color: "blue" }}>
                  Go To SignUp Page
                </Link>
              </Typography>
            </Grid>
          </form>
        </Container>
      </Card>
    </Container>
  );
};

export default LoginUser;
