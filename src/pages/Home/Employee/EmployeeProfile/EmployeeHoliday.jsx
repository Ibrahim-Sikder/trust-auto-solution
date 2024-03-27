import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const events = [
  {
    title: "Meeting",
    start: new Date(2024, 3, 1, 10, 0),
    end: new Date(2024, 3, 1, 12, 0),
  },
  // Add more events as needed
];

const EmployeeHoliday = () => {
  return (
    <div style={{ height: "600px", width:'1300px', margin: '20px auto' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
      />
    </div>
  );
};

export default EmployeeHoliday;
