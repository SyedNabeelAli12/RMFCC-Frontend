import React, { useMemo } from "react";
import {
  Box,
  Typography,
  Card,
  CircularProgress,
  Paper,
  useTheme,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import Header from "./headers";

const palette = [
  "#FE4A49",
  "#005B96",
  "#851E3E",
  "#3DA4AB",
  "#F6CD61",
  "#54b2a9",
  "#4d648d",
];

const getRandomColor = () => {
  const index = Math.floor(Math.random() * palette.length);
  return palette[index];
};

export default function TopCountries({ loadingTop, topCountries }) {
  const theme = useTheme();

  const colorMap = useMemo(() => {
    const map = {};
    topCountries.forEach(({ COUNTRY }, index) => {
      if (index === 0) {
        map[COUNTRY] = "#FFD700";
      } else if (index === 1) {
        map[COUNTRY] = "#C0C0C0"; 
      } else if (index === 2) {
        map[COUNTRY] = "#CD7F32";
      } else {
        map[COUNTRY] = getRandomColor();
      }
    });
    return map;
  }, [topCountries]);

  const pieData = useMemo(() => {
    return topCountries.map(({ COUNTRY, Final_Score }) => ({
      name: COUNTRY,
      value: Final_Score,
    }));
  }, [topCountries]);

  const highest = useMemo(() => {
    return topCountries.reduce(
      (max, curr) => (curr.Final_Score > max.Final_Score ? curr : max),
      topCountries[0]
    );
  }, [topCountries]);

  const lowest = useMemo(() => {
    return topCountries.reduce(
      (min, curr) => (curr.Final_Score < min.Final_Score ? curr : min),
      topCountries[0]
    );
  }, [topCountries]);

  return (
    <Paper elevation={4} sx={{ mb: 6, p: 4, borderRadius: 0.5 }}>
      <Header content={"Top Recommended Countries for Expansion"} />
      {loadingTop ? (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>
      ) : topCountries.length === 0 ? (
        <Typography>No data available.</Typography>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                md: "row",
                sm: "column",
                xs: "column",
                xl: "row",
              },
            }}
          >
            {/* Bar Chart */}
            <Box
              sx={{
                height: 300,
                width: "50%",
                backgroundColor: "#f0f0f0",
                p: 1,
                borderRadius: 0.5,
                boxShadow: theme.shadows[1],
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={topCountries}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="COUNTRY" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="Final_Score" radius={[8, 8, 0, 0]}>
                    {topCountries.map(({ COUNTRY }) => (
                      <Cell
                        key={`cell-${COUNTRY}`}
                        fill={colorMap[COUNTRY] || "#8884d8"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Box>

            {/* Country Cards */}
            <Box
              display="grid"
              gap={1}
              sx={{
                p: 1,
                width: "50%",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              }}
            >
              {topCountries.map(({ COUNTRY, Final_Score }, i) => {
                const stripeColor = colorMap[COUNTRY];
                const rankEmoji =
                  i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : "";

                return (
                  <Card
                    key={COUNTRY}
                    elevation={3}
                    sx={{
                      p: 1,
                      borderRadius: 0.5,
                      height: "7vh",
                      display: "flex",
                      alignItems: "center",
                      position: "relative",
                      backgroundColor: "#f0f0f0",
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: 6,
                        backgroundColor: stripeColor,
                        borderRadius: "1px 0 0 1px",
                      }}
                    />
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="body1" fontWeight="medium">
                        {i + 1}. {rankEmoji} {COUNTRY}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Final Score: {(Final_Score * 100).toFixed(2)}%
                      </Typography>
                    </Box>
                  </Card>
                );
              })}
            </Box>
          </Box>

          {/* Pie Chart Section */}
          <Box sx={{ height: "50vh", mt: 4 }}>
            <Header content={"Top Countries Pie Chart View"} />

            {/* Highest & Lowest Labels */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 2,
                px: 1,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                <strong>Highest:</strong> {highest?.COUNTRY} (
                {(highest?.Final_Score * 100).toFixed(2)}%)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Lowest:</strong> {lowest?.COUNTRY} (
                {(lowest?.Final_Score * 100).toFixed(2)}%)
              </Typography>
            </Box>

            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  fill="#000"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {pieData.map((entry) => (
                    <Cell
                      key={`slice-${entry.name}`}
                      fill={colorMap[entry.name] || "#8884d8"}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => `${(value * 100).toFixed(2)}%`}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  wrapperStyle={{ fontSize: 14 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </>
      )}
    </Paper>
  );
}
