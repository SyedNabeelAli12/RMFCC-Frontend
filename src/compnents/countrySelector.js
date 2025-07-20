// components/CountrySelector.js
import React from "react";
import { Autocomplete, TextField } from "@mui/material";

export default function CountrySelector({ countries, onChange }) {
  return (
    <Autocomplete
      options={countries}
      getOptionLabel={(option) => `${option.COUNTRYNAME} (${option.COUNTRY})`}
      sx={{ minWidth: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="Select Country" size="small" />
      )}
      onChange={(event, newValue) => onChange(newValue)}
    />
  );
}
