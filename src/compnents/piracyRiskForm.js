import React from "react";
import Header from './headers';
import {
  Box,
  Grid,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Typography,
} from "@mui/material";

export default function PiracyRiskForm({
  form,
  handleChange,
  handleSubmit,
  loadingPred,
  error,
}) {
  return (
    <>
        <Header content={'Predict Piracy Risk'} />

    <Box
      id="prediction-form"
      component="form"
      onSubmit={handleSubmit}
      sx={{ mt: 2 }}
      noValidate
    >

      <Grid container spacing={2}>
        {[
          { name: "GR", label: "Growth Rate (GR)" },
          { name: "MILITARY", label: "Military" },
          { name: "CORRUPTIONINDEX", label: "Corruption Index" },
          { name: "FISHPRODUCTION", label: "Fish Production" },
        ].map(({ name, label }) => (
          <Grid item xs={12} sm={6} key={name}>
            <TextField
              variant="outlined"
              label={label}
              name={name}
              value={form[name]}
              onChange={handleChange}
              type="number"
              fullWidth
              inputProps={{ step: "any" }}
            />
          </Grid>
        ))}
      </Grid>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Button
          variant="contained"
          type="submit"
          size="large"
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 1,
            fontWeight: 600,
            fontSize: 14,
            backgroundColor: "#000000",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#1f1f1f",
            },
          }}
          disabled={loadingPred}
        >
          {loadingPred ? <CircularProgress size={24} /> : "Predict"}
        </Button>
      </Box>
    </Box>
        </>
  );
}
