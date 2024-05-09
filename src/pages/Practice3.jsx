import { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { carBrands, vehicleName } from "../constant";

function Practice() {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [filteredVehicles, setFilteredVehicles] = useState([]);

  const handleBrandChange = (event, newValue) => {
    setSelectedBrand(newValue);
    const filtered = vehicleName.filter(vehicle => vehicle.label === newValue);
    setFilteredVehicles(filtered);
  };

  return (
    <div>
      <Autocomplete
        options={carBrands.map(option => option.label)}
        renderInput={(params) => <TextField {...params} label="Select Car Brand" />}
        onChange={handleBrandChange}
        value={selectedBrand}
        style={{ marginBottom: 20 }}
      />

      <Autocomplete
        options={filteredVehicles.map(option => option.value)}
        renderInput={(params) => (
          <TextField {...params} label="Vehicle Model" variant="outlined" />
        )}
        getOptionLabel={(option) => option || ""}
        disabled={!selectedBrand} // This disables the field until a brand is selected
      />
    </div>
  );
}

export default Practice;
