 
 
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
const TADatePicker = () => {
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Select Date"
        onChange={""}
         
        inputFormat="DD/MM/YY"
      />
      
 
    </LocalizationProvider>
  );
};

export default TADatePicker;
