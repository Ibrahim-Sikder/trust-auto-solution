import  { useState } from "react";
import { TextField, Autocomplete } from "@mui/material";
import { countries } from "../constant";



const Practice2 = () => {
  const [countryCode, setCountryCode] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneNumberChange = (e) => {
    const newPhoneNumber = e.target.value;
    if (/^\d*$/.test(newPhoneNumber) && newPhoneNumber.length <= 11 && (newPhoneNumber === '' || (!newPhoneNumber.startsWith('0') || newPhoneNumber.length > 1))) {
      setPhoneNumber(newPhoneNumber);
    }
  };

  return (
    <div className="flex items-center">
      <Autocomplete
        options={countries}
        getOptionLabel={(option) => option.label}
        value={countryCode}
        onChange={(event, newValue) => {
          setCountryCode(newValue);
          setPhoneNumber("");  // Reset the phone number when changing country codes
        }}
        renderInput={(params) => <TextField {...params} label="Select Country Code" variant="outlined" />}
      />
      <TextField
        className="border mt-2"
        label="Enter Phone Number"
        variant="outlined"
        fullWidth
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        placeholder="Enter phone number"
      />
    </div>
  );
};

export default Practice2;
