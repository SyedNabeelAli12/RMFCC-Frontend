import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";

export default function KeyIndicators({ form }) {
  const indicators = [
    { label: "Fish Production", value: parseFloat(form.FISHPRODUCTION), max: 1000, color: "#06b6d4" },
    { label: "Military Spend", value: parseFloat(form.MILITARY), max: 1000, color: "#a855f7" },
    { label: "Growth Rate", value: parseFloat(form.GR), max: 100, color: "#f97316" },
    { label: "Corruption Index", value: parseFloat(form.CORRUPTIONINDEX), max: 100, color: "#ef4444" },
  ];

  return (
    <Box sx={{ mt: 6 }}>
      <Grid container spacing={4} justifyContent="center">
        {indicators.map(({ label, value, max, color }, i) => {
          const percentage = Math.min((value / max) * 100, 100);
          return (
            <Grid item xs={6} sm={3} key={i}>
              <Box sx={{ width: 100, height: 100, mx: "auto" }}>
                <CircularProgressbarWithChildren
                  value={percentage}
                  styles={buildStyles({
                    pathColor: color,
                    trailColor: "#e5e7eb",
                    strokeLinecap: "round",
                    pathTransitionDuration: 1.5,
                  })}
                >
                  <Typography variant="h6" fontWeight="bold">
                    {value.toFixed(0)}
                  </Typography>
                </CircularProgressbarWithChildren>
              </Box>
              <Typography variant="subtitle2" align="center" mt={1} color="text.secondary">
                {label}
              </Typography>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
