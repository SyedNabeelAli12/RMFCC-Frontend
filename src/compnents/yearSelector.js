// components/YearSelector.js
import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function YearSelector({ value, onChange, disabled }) {
  return (
    <FormControl size="small" sx={{ minWidth: 100 }}>
      <InputLabel id="year-range-label">Years</InputLabel>
      <Select
        labelId="year-range-label"
        value={value}
        label="Years"
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
      >
        {[1, 2, 3, 4, 5].map((y) => (
          <MenuItem key={y} value={y}>
            {y}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
