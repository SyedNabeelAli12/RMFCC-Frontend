import React, { useState } from "react";
import axios from "axios";
import {
  Autocomplete,
  Box,
  Button,
  TextField,
  CircularProgress,
  Typography,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import config from "../config";
import Header from "./headers";
import { useNavigate } from "react-router-dom";

const FEATURES = [
  { label: "GDP", value: "GDP" },
  { label: "Military", value: "MILITARY" },
  { label: "Corruption Index", value: "CORRUPTIONINDEX" },
  { label: "Fish Production", value: "FISHPRODUCTION" },
  { label: "Growth Rate", value: "GR" },
  { label: "Piracy Incidents", value: "PIRACYCOUNT" },
];

export default function ForecastChart({ countries, initialCountry = null }) {
  const [selectedCountry, setSelectedCountry] = useState(initialCountry);
  const [years, setYears] = useState(5);
  const [feature, setFeature] = useState("GDP");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState([]); 
  const navigate = useNavigate();

const fetchForecast = async () => {
    if (!selectedCountry || !selectedCountry.COUNTRY) {
      setError("Please select a country.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${config.forecast}`,
        {
          country: selectedCountry.COUNTRY,
          feature,
          years,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const fullData = res.data?.full_df;
      if (
        !fullData ||
        fullData.length === 0 ||
        fullData.every(
          ({ [`Forecast_${feature}`]: featureValue }) =>
            featureValue === null ||
            featureValue === undefined ||
            featureValue === "none"
        )
      ) {
        setError("No valid forecast data available.");
        setData(null);
        setChartData([]); // clear chart data on error/no data
      } else {
        setData(res.data);
        setError(null);

        // Prepare and set chart data here
        const preparedChartData = fullData
          .map(({ YEAR, [`Forecast_${feature}`]: featureValue, Type }) => ({
            year: YEAR,
            value:
              featureValue !== undefined && featureValue !== null
                ? Number(featureValue.toFixed(2))
                : null,
            type: Type || null,
          }))
          .filter((entry) => entry.year !== null && entry.year !== undefined)
          .sort((a, b) => a.year - b.year);

        setChartData(preparedChartData);
      }
    } catch (err) {
      console.error(err);

      if (err.response && err.response.status === 401) {
        window.location.href = '/';
        return;
      }

      setError("Failed to fetch forecast. Please try again.");
      setData(null);
      setChartData([]);
    } finally {
      setLoading(false);
    }
  };


  return (
    <Box sx={{ p: 4, maxWidth: "100%", margin: "auto" }}>
      <Header content="Forecast Chart" />
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            fetchForecast();
          }}
          display="flex"
          gap={2}
          flexWrap="wrap"
          alignItems="center"
        >
          <Autocomplete
            options={countries}
            getOptionLabel={(option) =>
              option.COUNTRYNAME
                ? `${option.COUNTRYNAME} (${option.COUNTRY})`
                : option.COUNTRY
            }
            value={selectedCountry}
            onChange={(event, newValue) => setSelectedCountry(newValue)}
            sx={{ minWidth: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Country"
                size="small"
                required
              />
            )}
          />

          <FormControl size="small" sx={{ width: 100 }}>
            <InputLabel id="year-range-label">Years</InputLabel>
            <Select
              labelId="year-range-label"
              value={years}
              label="Years"
              onChange={(e) => setYears(Number(e.target.value))}
            >
              {[...Array(10)].map((_, idx) => (
                <MenuItem key={idx + 1} value={idx + 1}>
                  {idx + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ width: 200 }}>
            <InputLabel id="feature-select-label">Feature</InputLabel>
            <Select
              labelId="feature-select-label"
              value={feature}
              label="Feature"
              onChange={(e) => setFeature(e.target.value)}
            >
              {FEATURES.map((feat) => (
                <MenuItem key={feat.value} value={feat.value}>
                  {feat.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            type="submit"
            disabled={loading || !selectedCountry}
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
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Get Forecast"
            )}
          </Button>
        </Box>

        {/* Error Message */}
        {error && (
          <Typography
            color="error"
            variant="body2"
            sx={{ mt: 2, fontWeight: 500 }}
          >
            {error}
          </Typography>
        )}
      </Paper>

      {/* Render chart only if no error, data exists, and chartData is non-empty */}
      {!error && data && chartData.length > 0 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" mb={2}>
            {data?.feature} Actual vs Forecast for {data?.country}
          </Typography>

          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey={(entry) =>
                  entry.type === "Actual" ? entry.value : null
                }
                name="Actual"
                stroke="#1976d2"
                dot={{ r: 3 }}
                connectNulls
              />
              <Line
                type="monotone"
                dataKey={(entry) =>
                  entry.type === "Forecast" ? entry.value : null
                }
                name="Forecast"
                stroke="#d32f2f"
                strokeDasharray="5 5"
                dot={{ r: 3 }}
                connectNulls
              />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      )}
    </Box>
  );
}
