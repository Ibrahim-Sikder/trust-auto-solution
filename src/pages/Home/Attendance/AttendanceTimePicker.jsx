
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';





// AttendanceTimePicker component
export default function AttendanceTimePicker() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'TimePicker', 'DateTimePicker', 'DateRangePicker']}>
        <DemoItem>
        <TimePicker/>
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
