import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Link,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import config from "../config";

export default function SignIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new URLSearchParams();
    formData.append("username", form.email);
    formData.append("password", form.password);

    try {
      const response = await fetch(`${config.token}`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.detail || "Login failed");
        setLoading(false);
        return;
      }

      const data = await response.json();
      localStorage.setItem("token", data.access_token);
      navigate("/");
    } catch (error) {
      setError("Login error, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        bgcolor: "#f5f5f5",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: { xs: "100%", sm: 400 },
          borderRadius: 2,
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h5" mb={3} fontWeight="bold" align="center">
          Sign In
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password"
            fullWidth
            required
            margin="normal"
          />

          {error && (
            <Typography
              variant="body2"
              color="error"
              sx={{ mt: 1, mb: -1, textAlign: "left" }}
            >
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              mt: 3,
              bgcolor: "black",
              "&:hover": { bgcolor: "#1f1f1f" },
              textTransform: "none",
              fontWeight: 600,
              fontSize: 14,
              py: 1.25,
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
          </Button>
        </Box>

        <Typography variant="body2" align="center" mt={2}>
          Don't have an account?{" "}
          <Link
            component="button"
            variant="body2"
            onClick={() => navigate("/signup")}
            sx={{ fontWeight: 600 }}
          >
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
