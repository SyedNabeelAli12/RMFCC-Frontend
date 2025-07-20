import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  Box,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import TopCountries from "../compnents/topCountries";
import PiracyRiskForm from "../compnents/piracyRiskForm";
import PredictionResult from "../compnents/predictionResult";
import KeyIndicators from "../compnents/keyIndicators";
import config from "../config";
import { Collapse, Button } from "@mui/material";
import CustomAccordion from "../compnents/accordion";
import CountryForecastPanel from "./ForecastPredictionPanel";
import ForecastChart from "./../compnents/forecastChart";
import axios from "axios";
import DataProcessingExplanation from './../compnents/calculationDetails';

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#000000" },
    secondary: { main: "#6b7280" },
    background: { default: "#f9fafb", paper: "#ffffff" },
    text: { primary: "#111827", secondary: "#6b7280" },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
    button: { textTransform: "none", fontWeight: 500 },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      styleOverrides: { root: { borderRadius: 8, textTransform: "none" } },
    },
    MuiPaper: { styleOverrides: { root: { borderRadius: 16 } } },
  },
});

export default function PiracyRisk() {
  const [topCountries, setTopCountries] = useState([]);
  const [topCountriesError, setTopCountriesError] = useState(null);
  const [countries, setCountries] = useState([]);
  const [loadingTop, setLoadingTop] = useState(true);
  const [showForecast, setShowForecast] = useState(false);

  const [form, setForm] = useState({
    GR: "",
    MILITARY: "",
    CORRUPTIONINDEX: "",
    FISHPRODUCTION: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [loadingPred, setLoadingPred] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTop() {
      try {
        const res = await fetch(`${config.topCountries}`);
        if (!res.ok) throw new Error("Failed to fetch top countries");
        const data = await res.json();
        setTopCountries(data.top_countries || []);
        setTopCountriesError(null);
      } catch (err) {
        console.error(err);
        setTopCountriesError(err.message || "Error loading top countries");
      } finally {
        setLoadingTop(false);
      }
    }
    fetchTop();
  }, []);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get(`${config.distinctCountries}`);
        setCountries(res.data.countries || []);
      } catch (err) {
        console.error("Failed to load countries", err);
      }
    };
    fetchCountries();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingPred(true);
    setPrediction(null);
    setError(null);

    const { GR, MILITARY, CORRUPTIONINDEX, FISHPRODUCTION } = form;
    if (
      GR === "" ||
      MILITARY === "" ||
      FISHPRODUCTION === "" ||
      parseFloat(GR) === 0 ||
      parseFloat(MILITARY) === 0 ||
      parseFloat(FISHPRODUCTION) === 0
    ) {
      setError(
        "Please fill in all fields (no zero allowed, except Corruption Index)."
      );
      setLoadingPred(false);
      return;
    }

    try {
      const res = await fetch(`${config.predict}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          GR: parseFloat(form.GR),
          MILITARY: parseFloat(form.MILITARY),
          CORRUPTIONINDEX: parseFloat(form.CORRUPTIONINDEX),
          FISHPRODUCTION: parseFloat(form.FISHPRODUCTION),
        }),
      });

      if (!res.ok) throw new Error("Failed to get prediction");

      const data = await res.json();
      setPrediction(data);
    } catch (err) {
      setError(err.message || "Error during prediction");
    } finally {
      setLoadingPred(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="90%" sx={{ mt: 6, mb: 6 }}>


        {/* Error message in red if loading top countries fails */}
       

        <TopCountries loadingTop={loadingTop} topCountries={topCountries} error= {topCountriesError}/>

        <CustomAccordion title="Show Forecast Panel">
          <CountryForecastPanel countries={countries} />
        </CustomAccordion>

        <CustomAccordion title="Show Forecast Visualization">
          <ForecastChart countries={countries} />
        </CustomAccordion>
        <CustomAccordion title="Data Processing Explanation">
           <DataProcessingExplanation/>
        </CustomAccordion>


      
        <Card elevation={5} sx={{ p: 4, borderRadius: 0.5 }}>
          <PiracyRiskForm
            form={form}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            loadingPred={loadingPred}
            error={error}
          />
          {prediction && <KeyIndicators form={form} />}
          {prediction && <PredictionResult prediction={prediction} />}
        </Card>

           
      </Container>
    </ThemeProvider>
  );
}
