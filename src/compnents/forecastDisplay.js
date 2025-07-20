import React from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import PredictionResult from "./predictionResult";

const labelMap = {
  GR: "Growth Rate",
  MILITARY: "Military",
  CORRUPTIONINDEX: "Corruption Index",
  FISHPRODUCTION: "Fish Production",
};

export default function ForecastDisplay({ country, data }) {

  return (
    <Paper
      elevation={2}
      sx={{ p: 4, borderRadius: 2, bgcolor: "#f9fafb", mt: 4 }}

    >

      {!data?.error ?<> <Typography variant="h6" mb={3} fontWeight="bold">
        {data?.country}
     
      </Typography>

      <TableContainer component={Box} sx={{ mb: 3 }}>
        <Table size="small" aria-label="forecast table">
          <TableHead>
            <TableRow>
              <TableCell><strong>Feature</strong></TableCell>
              <TableCell align="right"><strong>Forecast Year</strong></TableCell>
              <TableCell align="right"><strong>Forecast Value</strong></TableCell>
              <TableCell align="right"><strong>Change (%)</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(data["5th_year_forecasts"]).map(([key, value]) => {
              const summary = data?.year_summary[key];
              return (
                <TableRow key={key}>
                  <TableCell>{labelMap[key] || key}</TableCell>
                  <TableCell align="right">{summary?.year || "N/A"}</TableCell>
                  <TableCell align="right">{Number(value).toLocaleString()}</TableCell>
                  <TableCell align="right">
                    {summary
                      ? `${summary.change_percent.toFixed(2)}%`
                      : "N/A"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <PredictionResult prediction={data?.piracy_risk_prediction} /></>:""}
    </Paper>
  );
}
