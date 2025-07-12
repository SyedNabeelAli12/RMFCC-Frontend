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


export default function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(""); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(config.signUp, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.detail || "Signup failed");
        setLoading(false);
        return;
      }

      navigate("/signin");
    } catch (error) {
      setError("Failed to signup, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={4}
      sx={{
        p: 4,
        maxWidth: 400,
        mx: "auto",
        mt: 8,
        borderRadius: 2,
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h5" mb={3} fontWeight="bold" align="center">
        Sign Up
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
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          value={form.confirmPassword}
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
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
        </Button>
      </Box>

      <Typography variant="body2" align="center" mt={2}>
        Already have an account?{" "}
        <Link
          component="button"
          variant="body2"
          onClick={() => navigate("/signin")}
          sx={{ fontWeight: 600 }}
        >
          Sign In
        </Link>
      </Typography>
    </Paper>
  );
}
