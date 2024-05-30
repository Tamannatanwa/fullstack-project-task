import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Avatar,
  TextField,
  Grid,
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { Edit as EditIcon, Logout as LogoutIcon } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    bio: "",
    avatar: null,
  });

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      fetchUserData();
      const userBio = localStorage.getItem("userBio");
      const userAvatar = localStorage.getItem("userAvatar");
      setFormData((prevData) => ({
        ...prevData,
        bio: userBio || "",
        avatar: userAvatar ? userAvatar : prevData.avatar,
      }));
    } else {
      navigate("/login");
    }
  }, [userId, navigate]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/user/${userId}`);
      const userData = response.data;
      setFormData({
        username: userData.username,
        email: userData.email,
        bio: userData.bio,
        avatar: userData.avatar, // Assuming avatar URL is returned from the API
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Handle error fetching user data
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      localStorage.setItem("userBio", formData.bio); // Save bio in local storage

      const updateData = new FormData();
      updateData.append("username", formData.username);
      updateData.append("email", formData.email);
      updateData.append("bio", formData.bio);
      if (formData.avatar) {
        updateData.append("avatar", formData.avatar);
      }

      await axios.put(`http://localhost:5000/user/${userId}`, updateData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setLoading(false);
      alert("Profile updated successfully!");
    } catch (error) {
      setLoading(false);
      console.error("Error updating profile:", error);
      alert("Error occurred while updating profile!");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`http://localhost:5000/user/${userId}`);
      localStorage.removeItem("userId");
      localStorage.removeItem("userBio");
      localStorage.removeItem("userAvatar");
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Error occurred while logging out!");
    }
  };

  const handleAvatarChange = (event) => {
    const selectedAvatar = event.target.files[0];
    if (selectedAvatar) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const avatarUrl = reader.result;
        localStorage.setItem("userAvatar", avatarUrl);
        setFormData({ ...formData, avatar: avatarUrl });
      };
      reader.readAsDataURL(selectedAvatar);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Card elevation={5}>
        <CardHeader
          title="User Profile"
          sx={{
            backgroundColor: "#f0f0f0",
            textAlign: "center",
            fontSize: "1.5rem",
            fontWeight: "bold",
            padding: "1rem",
          }}
        />
        <CardContent sx={{ padding: "2rem" }}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              alt="User Avatar"
              src={formData.avatar || localStorage.getItem("userAvatar")}
              sx={{ width: 120, height: 120, mb: 2 }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              style={{ display: "none" }}
              id="avatar-upload"
            />
            <label htmlFor="avatar-upload">
              <Button variant="outlined" component="span" sx={{ mb: 2 }}>
                Change Avatar
              </Button>
            </label>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="username"
                name="username"
                label="Username"
                value={formData.username}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <IconButton edge="end">
                      <EditIcon />
                    </IconButton>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formData.email}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <IconButton edge="end">
                      <EditIcon />
                    </IconButton>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="bio"
                name="bio"
                label={formData.bio == ""?"bio":null}
                value={formData.bio}
                onChange={handleChange}
                multiline
                rows={4}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: "48%" }}
              onClick={handleUpdateProfile}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Update Profile"}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{ width: "48%" }}
              onClick={handleLogout}
              startIcon={<LogoutIcon />}
            >
              Logout
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProfilePage;
