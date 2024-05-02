/* eslint-disable no-unused-vars */
import { FaRegTrashAlt, FaUserEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { Link } from "react-router-dom";
import { HiOutlineEye } from "react-icons/hi";

const years = [{ value: "Select Year", label: "Select Year" }];

// Start from 2024 and go up to 2030
for (let year = 2024; year <= 2030; year++) {
  years.push({ value: String(year), label: String(year) });
}

const AttendanceList = () => {
  const [getAllEmployee, setGetAllEmployee] = useState([]);
  const [error, setError] = useState("");

  const [presentNumber, setPresentNumber] = useState(null);

  const [absentNumber, setAbsentNumber] = useState(null);

  const [lateNumber, setLateNumber] = useState(null);

  const [reload, setReload] = useState(false);

  const parsedDate = new Date();
  const day = parsedDate.getDate().toString().padStart(2, "0");
  const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0");
  const year = parsedDate.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/v1/employee`)
      .then((response) => {
        setGetAllEmployee(response.data.employee);

        const attendanceData = response.data.employee.map(
          (data) => data.attendance
        );
        const allAttendance = attendanceData.flat();
        const filteredAttendance = allAttendance.filter(
          (attendance) => attendance.date === formattedDate
        );

        const presentEntries = filteredAttendance.filter(
          (attendance) => attendance.present === true
        ).length;

        setPresentNumber(presentEntries);

        //  for absent

        const absentEntries = filteredAttendance.filter(
          (attendance) => attendance.present === false
        ).length;

        setAbsentNumber(absentEntries);

        // for late status
        const lateEntries = filteredAttendance.filter(
          (attendance) => attendance.late_status === true
        ).length;

        setLateNumber(lateEntries);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [formattedDate, reload]);

  const handleDelete = async (e) => {
    try {
      const newAttendanceData = getAllEmployee.map((employee) => {
        return {
          _id: employee._id,
          date: formattedDate,
          deleted: e,
        };
      });
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/employee/all`,
        newAttendanceData
      );
      if (response.status === 200) {
        toast.success("Deleted successful.");
        setReload(!reload);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  //  search filter

  const [filteredDate, setFilteredDate] = useState(null);

  const [fPresentNumber, setFPresentNumber] = useState(null);

  const [fAbsentNumber, setFAbsentNumber] = useState(null);

  const [fLateNumber, setFLateNumber] = useState(null);

  const handleDateSearch = (e) => {
    const parsedDate = new Date(e.$d);
    const day = parsedDate.getDate().toString().padStart(2, "0");
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0");
    const year = parsedDate.getFullYear();
    const date = `${day}-${month}-${year}`;
    setFilteredDate(date);
  };

  const handleFilterData = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/v1/employee`)
      .then((response) => {
        const attendanceData = response.data.employee.map(
          (data) => data.attendance
        );
        const allAttendance = attendanceData.flat();
        const filteredAttendance = allAttendance.filter(
          (attendance) => attendance.date === filteredDate
        );

        setGetAllEmployee(filteredAttendance);

        const presentEntries = filteredAttendance.filter(
          (attendance) => attendance.present === true
        ).length;

        setFPresentNumber(presentEntries);

        //  for absent

        const absentEntries = filteredAttendance.filter(
          (attendance) => attendance.present === false
        ).length;

        setFAbsentNumber(absentEntries);

        // for late status
        const lateEntries = filteredAttendance.filter(
          (attendance) => attendance.late_status === true
        ).length;

        setFLateNumber(lateEntries);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleDeleteFilter = async (e) => {
    try {
      const newAttendanceData = getAllEmployee.map((employee) => {
        return {
          _id: employee._id,
          date: filteredDate ? filteredDate : formattedDate,
          deleted: e,
        };
      });
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/employee/all`,
        newAttendanceData
      );
      if (response.status === 200) {
        toast.success("Deleted successful.");
        setReload(!reload);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="mt-10 table-container">
      {error && <div className="py-3 text-red-400">{error}</div>}
      <h3 className="mt-5 mb-8 text-2xl font-semibold">Attendance Sheet</h3>

      <div className="flex items-center my-5 ">
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker label="Select Date" onChange={handleDateSearch} />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <div className="relative rounded-sm w-max mt-2 ml-2">
          <button
            onClick={handleFilterData}
            className="employeeBtn employeeInput"
          >
            Search
          </button>
        </div>
      </div>
      {getAllEmployee.length > 0 ? (
        <table className="attendanceTable">
          <thead>
            <tr className="bg-[#42A1DA] text-white ">
              <th>Date</th>
              <th>Present </th>
              <th>Absent </th>
              <th>Late </th>
              <th colSpan={3}>Action </th>
            </tr>
          </thead>
          {filteredDate ? (
            <tbody>
              <tr className="even-row">
                <td> {filteredDate}</td>
                <td>
                  <div className="rounded-full w-8 h-8 mx-auto bg-[#60BF6B] text-white flex items-center justify-center">
                    {fPresentNumber}
                  </div>
                </td>
                <td>
                  <div className="rounded-full w-8 h-8 mx-auto bg-red-600 text-white flex items-center justify-center">
                    {fAbsentNumber}
                  </div>
                </td>
                <td>
                  {" "}
                  <div className="rounded-full w-8 h-8 mx-auto bg-red-600 text-white flex items-center justify-center">
                    {fLateNumber}
                  </div>
                </td>
                <td>
                  <Link to="/dashboard/update-attendance">
                    <FaUserEdit
                      className="text-[#60BF6B] cursor-pointer mx-auto"
                      size={30}
                    />
                  </Link>
                </td>

                <td>
                  <Link to={`/dashboard/view-attendance?date=${filteredDate}`}>
                    {" "}
                    <HiOutlineEye
                      className="text-[#42A1DA] cursor-pointer mx-auto"
                      size={30}
                    />{" "}
                  </Link>
                </td>
                <td>
                  {" "}
                  <FaRegTrashAlt
                    className="text-[#F62F52] cursor-pointer mx-auto"
                    size={30}
                    onClick={() => handleDeleteFilter("delete")}
                  />
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              <tr className="even-row">
                <td> {formattedDate}</td>
                <td>
                  <div className="rounded-full w-8 h-8 mx-auto bg-[#60BF6B] text-white flex items-center justify-center">
                    {presentNumber}
                  </div>
                </td>
                <td>
                  <div className="rounded-full w-8 h-8 mx-auto bg-red-600 text-white flex items-center justify-center">
                    {absentNumber}
                  </div>
                </td>
                <td>
                  {" "}
                  <div className="rounded-full w-8 h-8 mx-auto bg-red-600 text-white flex items-center justify-center">
                    {lateNumber}
                  </div>
                </td>
                <td>
                  <Link to="/dashboard/update-attendance">
                    <FaUserEdit
                      className="text-[#60BF6B] cursor-pointer mx-auto"
                      size={30}
                    />
                  </Link>
                </td>

                <td>
                  <Link to={`/dashboard/view-attendance?date=${formattedDate}`}>
                    {" "}
                    <HiOutlineEye
                      className="text-[#42A1DA] cursor-pointer mx-auto"
                      size={30}
                    />{" "}
                  </Link>
                </td>
                <td>
                  {" "}
                  <FaRegTrashAlt
                    className="text-[#F62F52] cursor-pointer mx-auto"
                    size={30}
                    onClick={() => handleDelete("delete")}
                  />
                </td>
              </tr>
            </tbody>
          )}
        </table>
      ) : (
        <div>No data found.</div>
      )}
    </div>
  );
};

export default AttendanceList;
