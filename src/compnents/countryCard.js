// CountryCard.jsx
import React from "react";
import {
  Box,
  Card,
  Typography,
  Tooltip,
  tooltipClasses,
  styled,
} from "@mui/material";

const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip arrow classes={{ popper: className }} {...props} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#ffffff",
    color: "#333",
    boxShadow: theme.shadows[3],
    fontSize: 13,
    borderRadius: 6,
    padding: "8px 12px",
    maxWidth: 250,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "#ffffff",
  },
}));

const CountryCard = ({ country, countryName, score, rank, color }) => {
  const rankEmoji = rank === 0 ? "🥇" : rank === 1 ? "🥈" : rank === 2 ? "🥉" : "";

  return (
    <StyledTooltip
      title={
        <Box>
          <Typography variant="subtitle2" fontWeight={600}>
            {countryName}
          </Typography>
          <Typography variant="body2">Score: {score.toFixed(3)}</Typography>
          <Typography variant="body2">Rank: {rank + 1}</Typography>
        </Box>
      }
      placement="top"
    >
      <Card
        elevation={3}
        sx={{
          p: 1,
          borderRadius: 0.5,
          height: "7vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          backgroundColor: "#f0f0f0",
          cursor: "pointer",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 6,
            backgroundColor: color,
            borderRadius: "1px 0 0 1px",
          }}
        />
        <Box sx={{ ml: 2 }}>
          <Typography variant="body1" fontWeight="medium">
            {rank + 1}. {rankEmoji} {country}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Final Score: {score.toFixed(3)}
          </Typography>
        </Box>
      </Card>
    </StyledTooltip>
  );
};

export default CountryCard;
