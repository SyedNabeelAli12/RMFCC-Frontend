import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";

import config from "../config";
import CountrySelector from "../compnents/countrySelector";
import YearSelector from "../compnents/yearSelector";
import ForecastDisplay from "../compnents/forecastDisplay";
import Header from "../compnents/headers";

export default function CountryForecastPanel({ countries }) {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [years, setYears] = useState(5); // fixed at 5 years
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchForecast = async () => {
    if (!selectedCountry) return;
    setLoading(true);
    setError(""); // reset error
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${config.forecastPredict}`, {
        country: selectedCountry.COUNTRY,
   },{headers:{Authorization:`Bearer ${token}`}}
    );
      if(res.data.error)
      {
         setForecastData(null);
      setError(res.data.error);
      }
      setForecastData(res.data);
    } catch (err) {
      console.error("Forecast request failed", err);
      if (err.response && err.response.status === 401) {
        window.location.href = '/';
        return;
      }
      setForecastData(null);
      setError("Failed to fetch forecast data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Header content="Forecast Piracy Risk" />

      <Paper
        elevation={1}
        sx={{
          p: 3,
          borderRadius: 2,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 2,
          bgcolor: "#f9fafb",
          mb: 3,
        }}
      >
        <CountrySelector countries={countries} onChange={setSelectedCountry} />

        <YearSelector value={years} disabled />

        <Button
          variant="contained"
          onClick={fetchForecast}
          disabled={!selectedCountry || loading}
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
          startIcon={
            loading ? <CircularProgress size={16} color="inherit" /> : null
          }
        >
          {loading ? "Loading..." : "Search"}
        </Button>
      </Paper>

      {/* Show API error in red */}
      {error ? (
        <Typography
          color="error"
          variant="body2"
          sx={{ mb: 2, ml: 1, fontWeight: 500 }}
        >
          {error}
        </Typography>
      ) : (
        forecastData && (
          <ForecastDisplay
            country={selectedCountry.COUNTRY}
            data={forecastData}
          />
        )
      )}
    </Box>
  );
}
