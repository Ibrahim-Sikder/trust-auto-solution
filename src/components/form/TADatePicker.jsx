import React from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { TextField } from "@mui/material";

// Extend Day.js to use the custom parse format plugin
dayjs.extend(customParseFormat);

const TADatePicker = () => {
  const [value, setValue] = React.useState(dayjs());

  const handleDateChange = (newValue) => {
    setValue(newValue);
  };

  // Format the date when needed
  const formattedDate = value.format("DD/MM/YY");

  const handleSubmit = () => {
    // Example function where the formatted date might be used
    console.log("Submitting date:", formattedDate);
    // Here you could send the formattedDate to a server or use it in any other logic
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Select Date"
        onChange={handleDateChange}
        renderInput={(params) => <TextField {...params} />}
        inputFormat="DD/MM/YY"
      />
      
      <p>Selected Date: {formattedDate}</p>
      <button onClick={handleSubmit}>Submit Date</button>
    </LocalizationProvider>
  );
};

export default TADatePicker;
