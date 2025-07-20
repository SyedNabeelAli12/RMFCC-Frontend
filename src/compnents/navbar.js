"use client";
import { CalendarIcon, PlusIcon, LogOutIcon } from "lucide-react";
import { Box, Button, IconButton, TextField, Paper } from "@mui/material";
import { useState } from "react";

export default function NavBar({ onNewPredictionClick, logout }) {
  const dateValue = new Date().toISOString().split("T")[0];

  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        borderRadius: 2,
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        alignItems: { xs: "stretch", sm: "center" },
        gap: 2,
      }}
    >
      {/* Left side: Date Picker */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #ccc",
            borderRadius: 1,
            px: 1.5,
            py: 0.5,
            bgcolor: "white",
            width: { xs: "100%", sm: "auto" },
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
            fullWidth
          />
        </Box>
      </Box>

      {/* Right side: Action Buttons */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 1.5,
          alignItems: "stretch",
        }}
      >
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
            height: "7vh",
            whiteSpace: "nowrap", // Keep text in one line
            "&:hover": { bgcolor: "#1f1f1f" },
            width: { xs: "100%", sm: "auto" }, // Full width on mobile, auto on larger screens
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
            height: "7vh",
            whiteSpace: "nowrap", // Keep text in one line
            "&:hover": { bgcolor: "#1f1f1f" },
            width: { xs: "100%", sm: "auto" }, // Full width on mobile, auto on larger screens
          }}
          startIcon={<LogOutIcon size={16} />}
        >
          Logout
        </Button>
      </Box>
    </Paper>
  );
}
