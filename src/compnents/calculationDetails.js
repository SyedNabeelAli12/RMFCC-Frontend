import React from "react";
import { Box, Typography, Paper } from "@mui/material";

export default function DataProcessingExplanation() {
  return (
<Paper
  elevation={2}
  sx={{
    p: { xs: 2, sm: 3 },          // smaller padding on xs screens
    borderRadius: 2,
    maxWidth: 1200,
    width: "100%",                // allow to shrink below maxWidth
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
    <strong>preprocess_economy(economy_df):</strong>  
    Cleans and prepares economic data by filling missing values with median values for key columns such as GDP, Military spending, and Unemployment. Filters records from year 2000 onwards, creates per capita features for GDP and fish production, and scales Military and Unemployment data using MinMaxScaler.
  </Typography>

  <Typography variant="body1" paragraph color="text.secondary">
    <strong>aggregate_piracy(piracy_df):</strong>  
    Converts piracy incident dates to year format and aggregates the total number of piracy incidents per country per year.
  </Typography>

  <Typography variant="body1" paragraph color="text.secondary">
    <strong>merge_data(economy_df, piracy_counts):</strong>  
    Joins the economic dataset with the aggregated piracy counts on country and year, filling missing piracy data with zeros.
  </Typography>

  <Typography variant="body1" paragraph color="text.secondary">
    <strong>compute_features(df, scaler):</strong>  
    Computes composite scores such as Economic Score (averaging scaled GDP per capita, growth rate, and industry GDP), Security Risk (based on piracy counts and corruption index), and Fish Score (based on fish production per capita) using MinMaxScaler.
  </Typography>

  <Typography variant="body1" paragraph color="text.secondary">
    <strong>score_countries(df):</strong>  
    Calculates the final score for each country as a weighted combination of the economic score (40%), inverse security risk (30%), and fish score (30%) to evaluate overall risk and opportunity.
  </Typography>

  <Typography variant="body1" paragraph color="text.secondary">
    <strong>Outcomes:</strong>  
    The highest score of top 15 countries are displayed
  </Typography>
</Paper>

  );
}
