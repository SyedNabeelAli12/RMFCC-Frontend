"use client";
import { CalendarIcon, PlusIcon, LogOutIcon } from "lucide-react";
import {
  Box,
  Button,
  IconButton,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
} from "@mui/material";
import { useState } from "react";

export default function NavBar({ onNewPredictionClick, logout }) {
  const dateValue = new Date().toISOString().split("T")[0];

  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 2,
      }}
    >
      {/* Left side: Date Picker + View Buttons */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {/* Date Picker */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #ccc",
            borderRadius: 1,
            px: 1.5,
            py: 0.5,
            bgcolor: "white",
          }}
        >
          <CalendarIcon
            size={16}
            style={{ marginRight: 6, color: "#6b7280" }}
          />
          <TextField
            type="date"
            size="small"
            value={dateValue}
            disabled
            variant="standard"
            InputProps={{
              disableUnderline: true,
              style: { fontSize: 14, cursor: "default" },
            }}
          />
        </Box>

        {/* View Buttons */}
      </Box>

      {/* Right side: New Appointment Button */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          onClick={onNewPredictionClick}
          sx={{
            bgcolor: "black",
            color: "white",
            textTransform: "none",
            px: 3,
            py: 1,
            fontSize: 14,
            "&:hover": {
              bgcolor: "#1f1f1f",
            },
          }}
          startIcon={<PlusIcon size={16} />}
        >
          New Prediction
        </Button>
        <Button
          variant="contained"
          onClick={logout}
          sx={{
            bgcolor: "black",
            color: "white",
            textTransform: "none",
            px: 3,
            py: 1,
            fontSize: 14,
            "&:hover": {
              bgcolor: "#1f1f1f",
            },
          }}
          startIcon={<LogOutIcon size={16} />}
        >
          Logout
        </Button>
      </Box>
    </Paper>
  );
}
