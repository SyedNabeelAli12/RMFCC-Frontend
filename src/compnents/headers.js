"use client";
import React from "react";
import { Box, Typography, Paper, useTheme } from "@mui/material";

export default function Header({ content }) {
  const theme = useTheme();

  if (!content) return null;

  return (
    <Paper
      elevation={1}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 1,
        borderRadius: 0.5,
        color: "white",
        margin: 2,

        textTransform: "none",
        px: 3,
        py: 1,
        fontSize: 14,
        backgroundColor: "black",
        boxShadow: theme.shadows[1],
        "&:hover": {
          bgcolor: "#1f1f1f",
        },
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 500,
          color: "white",
        }}
      >
        {content}
      </Typography>
    </Paper>
  );
}
