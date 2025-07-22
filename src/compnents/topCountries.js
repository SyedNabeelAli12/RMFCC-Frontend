import React, { useMemo } from "react";
import {
  Box,
  Typography,
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
import CountryCard from "./countryCard";

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

export default function TopCountries({ loadingTop, topCountries, error }) {
  const theme = useTheme();

  const colorMap = useMemo(() => {
    const map = {};
    topCountries.forEach(({ COUNTRY }, index) => {
      if (index === 0) map[COUNTRY] = "#FFD700";
      else if (index === 1) map[COUNTRY] = "#C0C0C0";
      else if (index === 2) map[COUNTRY] = "#CD7F32";
      else map[COUNTRY] = getRandomColor();
    });
    return map;
  }, [topCountries]);

  const pieData = useMemo(
    () =>
      topCountries.map(({ COUNTRY, Final_Score }) => ({
        name: COUNTRY,
        value: Final_Score,
      })),
    [topCountries]
  );

  const highest = useMemo(
    () =>
      topCountries.reduce(
        (max, curr) => (curr.Final_Score > max.Final_Score ? curr : max),
        topCountries[0]
      ),
    [topCountries]
  );

  const lowest = useMemo(
    () =>
      topCountries.reduce(
        (min, curr) => (curr.Final_Score < min.Final_Score ? curr : min),
        topCountries[0]
      ),
    [topCountries]
  );

  return (
    <Paper elevation={4} sx={{ mb: 6, p: { xs: 2, sm: 3, md: 4 }, borderRadius: 0.5 }}>
      <Header content={"Top Recommended Countries for Expansion"} />
      {loadingTop ? (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography sx={{ color: "red", mb: 2 }}>{error}</Typography>
      ) : topCountries.length === 0 ? (
        <Typography sx={{ color: "red", mb: 2 }}>No data available.</Typography>
      ) : (
        <>
          {/* BAR CHART + CARDS */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column", // mobile first stacked
              gap: 2,
              '@media (min-width:900px)': {
                flexDirection: "row",
                gap: 4,
              },
            }}
          >
            {/* Bar Chart */}
            <Box
              sx={{
                width: "100%",
                height: 250,
                backgroundColor: "#f0f0f0",
                p: 1,
                borderRadius: 0.5,
                boxShadow: theme.shadows[1],
                '@media (min-width:900px)': {
                  width: "50%",
                  height: 300,
                },
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
                width: "100%",
                gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                '@media (min-width:900px)': {
                  width: "50%",
                  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                },
              }}
            >
              {topCountries.map(({ COUNTRY, COUNTRYNAME, Final_Score }, i) => (
                <CountryCard
                  key={COUNTRY}
                  country={COUNTRY}
                  countryName={COUNTRYNAME}
                  score={Final_Score}
                  rank={i}
                  color={colorMap[COUNTRY]}
                />
              ))}
            </Box>
          </Box>

          {/* PIE CHART */}
            <Header content={"Top Countries Pie Chart View"} />
          <Box
            sx={{
              height: "auto",
              minHeight: 320,
              mt: 4,
              px: { xs: 1, sm: 2 },
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              '@media (min-width:600px)': {
                flexDirection: "row",
                gap: 2,
              },
            }}
          >

            {/* Highest & Lowest Labels */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 2,
                px: 1,
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              <Typography variant="caption" color="text.secondary" noWrap>
                <strong>Highest:</strong> {highest?.COUNTRY} (
                {highest?.Final_Score.toFixed(3)})
              </Typography>
              <Typography variant="caption" color="text.secondary" noWrap>
                <strong>Lowest:</strong> {lowest?.COUNTRY} (
                {lowest?.Final_Score.toFixed(3)})
              </Typography>
            </Box>

            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                overflow: "hidden",
              }}
            >
              {/* Pie Chart */}
              <Box
                sx={{
                  flex: 1,
                  minWidth: 0,
                  height: 250,
                  mb: { xs: 2, sm: 0 },
                }}
              >
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
                        `${name}: ${(percent * 100).toFixed(2)}%`
                      }
                      labelLine={false}
                    >
                      {pieData.map((entry) => (
                        <Cell
                          key={`slice-${entry.name}`}
                          fill={colorMap[entry.name] || "#8884d8"}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name) => [
                        `Score: ${value.toFixed(3)}`,
                        `Country: ${name}`,
                      ]}
                      contentStyle={{
                        backgroundColor: "#fff",
                        borderRadius: 6,
                        borderColor: "#ccc",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Box>

              {/* Scrollable Legend */}
              <Box
                sx={{
                  flexBasis: 200,
                  maxHeight: 250,
                  overflowY: "auto",
                  px: 1,
                  fontSize: 14,
                  userSelect: "none",
                  "&::-webkit-scrollbar": {
                    width: 6,
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: theme.palette.grey[400],
                    borderRadius: 3,
                  },
                }}
              >
                <Legend
                  layout="vertical"
                  verticalAlign="top"
                  align="left"
                  wrapperStyle={{ paddingLeft: 0, margin: 0 }}
                />
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Paper>
  );
}
