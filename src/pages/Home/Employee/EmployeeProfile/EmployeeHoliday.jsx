import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const holidaysData = [
  {
    "title": "International Mother Language Day",
    "date": "2024-05-09"
  },
  {
    "title": "Independence Day",
    "date": "2024-05-12"
  },
  {
    "title": "Bengali New Year",
    "date": "2024-06-02"
  },
  {
    "title": "Eid ul-Fitr",
    "date": "2024-05-10" 
  },
 
]


const holidays = holidaysData.map(holiday => ({
  title: holiday.title,
  start: new Date(holiday.date + "T00:00:00"),
  end: new Date(holiday.date + "T23:59:59")
}));

const events = [
  {
    title: "Meeting",
    start: new Date(2024, 2, 1, 10, 0), // March 1, 2024, Note that month index starts at 0 (0 = January)
    end: new Date(2024, 2, 1, 12, 0)
  },
  ...holidays
];

const EmployeeHoliday = () => {
  return (
    <div style={{ height: "600px", width: '1300px', margin: '20px auto' }}>
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
