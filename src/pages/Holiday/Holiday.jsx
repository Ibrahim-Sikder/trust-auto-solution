import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { HiOutlineHome } from "react-icons/hi";

const localizer = momentLocalizer(moment);

const holidaysData = [
  {
    title: "International Mother Language Day",
    date: "2024-05-09",
  },
  {
    title: "Independence Day",
    date: "2024-05-12",
  },
  {
    title: "Bengali New Year",
    date: "2024-06-02",
  },
  {
    title: "Eid ul-Fitr",
    date: "2024-05-10",
  },
];

const holidays = holidaysData.map((holiday) => ({
  title: holiday.title,
  start: new Date(holiday.date + "T00:00:00"),
  end: new Date(holiday.date + "T23:59:59"),
}));

const events = [
  {
    title: "Meeting",
    start: new Date(2024, 2, 1, 10, 0), // March 1, 2024, Note that month index starts at 0 (0 = January)
    end: new Date(2024, 2, 1, 12, 0),
  },
  ...holidays,
];

const EmployeeHoliday = () => {
  return (
    <div className="bg-[#EFF3F9] min-h-screen">
      <div className="p-5 xl:px-20 lg:10">
        <div className="flex flex-wrap items-center justify-between">
          <h3 className="text-xl md:text-3xl font-semibold">Holiday</h3>
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <HiOutlineHome className="text-[#0F79F3] size-5 mr-1" />
              <span>Dashboard</span>
            </div>
            <span>App</span>
            <span>Holiday</span>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-screen-xl bg-white">
        <div className="p-5 md:p-10">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "100vh" }}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeHoliday;
