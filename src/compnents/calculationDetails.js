import React from "react";
import { Box, Typography, Paper } from "@mui/material";

export default function DataProcessingExplanation() {
  return (
    <Paper
      elevation={2}
      sx={{
        p: { xs: 2, sm: 3 },
        borderRadius: 2,
        maxWidth: 1200,
        width: "100%",
        bgcolor: "background.paper",
        mx: "auto",
      }}
    >
      <Typography variant="h5" mb={2} fontWeight={600} color="text.primary">
        Application Overview
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary" mb={3}>
        This project analyzes country-level economic and piracy data to identify top recommended countries for expansion based on economic performance, security risks, and fishery production. It preprocesses and merges datasets, performs clustering and dimensionality reduction, and forecasts future trends using ARIMA models. Additionally, it predicts piracy risk with a trained Random Forest classifier, providing actionable insights for strategic decision-making.
      </Typography>

      <Typography variant="h5" mb={2} fontWeight={600} color="text.primary">
        Data Processing Functions Overview
      </Typography>

      <Typography variant="body1" paragraph color="text.secondary">
        <strong>preprocess_economy(economy_df):</strong><br />
        Cleans and prepares economic data by filling missing values with medians for key columns such as GDP, military spending, and unemployment. Filters data from the year 2000 onward, creates per capita features for GDP and fish production, and scales military and unemployment data using MinMaxScaler.
      </Typography>

      <Typography variant="body1" paragraph color="text.secondary">
        <strong>aggregate_piracy(piracy_df):</strong><br />
        Converts piracy incident dates to year format and aggregates the total number of incidents per country per year.
      </Typography>

      <Typography variant="body1" paragraph color="text.secondary">
        <strong>merge_data(economy_df, piracy_counts):</strong><br />
        Joins the economic dataset with aggregated piracy counts on country and year, filling missing piracy values with zeros.
      </Typography>

      <Typography variant="body1" paragraph color="text.secondary">
        <strong>compute_features(df, scaler):</strong><br />
        Computes composite scores such as:
        <ul>
          <li><strong>Economic Score:</strong> Average of scaled GDP per capita, growth rate, and industry GDP.</li>
          <li><strong>Security Risk:</strong> Based on piracy counts and corruption index.</li>
          <li><strong>Fish Score:</strong> Based on fish production per capita.</li>
        </ul>
        Uses MinMaxScaler for normalization.
      </Typography>

      <Typography variant="body1" paragraph color="text.secondary">
        <strong>score_countries(df):</strong><br />
        Calculates the final score for each country as a weighted sum of:
        <ul>
          <li>Economic Score (40%)</li>
          <li>Inverse Security Risk (30%)</li>
          <li>Fish Score (30%)</li>
        </ul>
        This evaluates overall risk and opportunity.
      </Typography>

      <Typography variant="body1" paragraph color="text.secondary">
        <strong>Outcomes:</strong><br />
        Displays the top 15 countries with the highest scores.
      </Typography>

      <Box mt={4}>
        <Typography variant="caption" color="text.disabled">
Dataset provided by Philipps University Marburg. This application is intended solely for demonstration and non-commercial use. 
        </Typography>
      </Box>
    </Paper>
  );
}
