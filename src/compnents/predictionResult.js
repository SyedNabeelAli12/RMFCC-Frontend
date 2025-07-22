import React from "react";
import { Box, Typography, Alert, LinearProgress } from "@mui/material";

export default function PredictionResult({ prediction }) {
  if (!prediction) return null;

  return (
    <Box sx={{ mt: 4 }}>
      <Alert severity={prediction.High_Piracy === 1 ? "error" : "success"}>
        <Typography variant="h6" fontWeight="bold">
          {prediction.High_Piracy === 0 ? "Low Piracy Risk" : "High Piracy Risk"}
        </Typography>

        <Typography sx={{ mb: 1 }}>
          {parseInt(prediction.Probability_Yes * 100) + "% Piracy Risk"}
        </Typography>

        <LinearProgress
          variant="determinate"
          value={prediction.Probability_No * 100}
          sx={{
            height: 10,
            borderRadius: 5,
            backgroundColor: "#eee",
            "& .MuiLinearProgress-bar": {
              backgroundColor: prediction.High_Piracy === 1 ? "#d32f2f" : "#2e7d32",
            },
          }}
        />
      </Alert>
    </Box>
  );
}
