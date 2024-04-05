/* eslint-disable react/prop-types */
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

// AttendanceTimePicker component
export default function AttendanceTimePicker({
  handleAttendanceInTime,
  index,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          "DatePicker",
          "TimePicker",
          "DateTimePicker",
          "DateRangePicker",
        ]}
      >
        <DemoItem>
          <TimePicker
            onChange={(time) => handleAttendanceInTime(index, time)}
            renderInput={(props) => <input {...props} />}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
