/* eslint-disable no-unused-vars */
import { FaRegTrashAlt, FaUserEdit } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { Link } from "react-router-dom";
import { HiOutlineEye } from "react-icons/hi";
import {
  useDeleteAttendanceMutation,
  useGetAllAttendancesQuery,
} from "../../../redux/api/attendance";
import Loading from "../../../components/Loading/Loading";

const years = [{ value: "Select Year", label: "Select Year" }];

// Start from 2024 and go up to 2030
for (let year = 2024; year <= 2030; year++) {
  years.push({ value: String(year), label: String(year) });
}

const AttendanceList = () => {
  const [filterType, setFilterType] = useState("");

  const currentPage = 1;
  const allAttendanceLimit = 31;

  // const parsedDate = new Date();
  // const day = parsedDate.getDate().toString().padStart(2, "0");
  // const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0");
  // const year = parsedDate.getFullYear();
  // const formattedDate = `${day}-${month}-${year}`;

  const {
    data: allAttendance,
    isLoading: allAttendanceLoading,
    error: allAttendanceError,
  } = useGetAllAttendancesQuery({
    limit: allAttendanceLimit,
    page: currentPage,
    searchTerm: filterType,
  });

  const [deleteAttendance, { isLoading, error }] =
    useDeleteAttendanceMutation();

  const handleDateSearch = (e) => {
    const parsedDate = new Date(e.$d);
    const day = parsedDate.getDate().toString().padStart(2, "0");
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0");
    const year = parsedDate.getFullYear();
    const date = `${day}-${month}-${year}`;
    setFilterType(date);
  };

  const handleDeleteFilter = async (date) => {
    try {
      const values = {
        date,
      };

      const response = await deleteAttendance(values).unwrap();
      if (response.success) {
        toast.success(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleAllAttendance = () => {
    setFilterType("");
  };

  if (allAttendanceLoading) {
    return <Loading />;
  }

  if (allAttendanceError) {
    toast.error("Something went wrong!");
  }


  return (
    <div className="mt-10 table-container">
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
            onClick={handleAllAttendance}
            className="employeeBtn employeeInput"
          >
            All
          </button>
        </div>
      </div>
      {allAttendance?.data?.records?.length > 0 ? (
        <table className="attendanceTable">
          <thead>
            <tr className="bg-[#42A1DA] text-white ">
              <th>Date</th>
              <th>Present </th>
              <th>Absent </th>
              <th>Late </th>
              <th>Action </th>
            </tr>
          </thead>
          {allAttendance?.data?.records?.map((attendance) => (
            <tbody key={attendance._id}>
              <tr className="even-row">
                <td> {attendance.date}</td>
                <td>
                  <div className="rounded-full w-8 h-8 mx-auto bg-[#60BF6B] text-white flex items-center justify-center">
                    {attendance?.presentEntries}
                  </div>
                </td>
                <td>
                  <div className="rounded-full w-8 h-8 mx-auto bg-red-600 text-white flex items-center justify-center">
                    {attendance?.absentEntries}
                  </div>
                </td>
                <td>
                  {" "}
                  <div className="rounded-full w-8 h-8 mx-auto bg-red-600 text-white flex items-center justify-center">
                    {attendance?.lateEntries}
                  </div>
                </td>
                <td>
                  <div className="flex items-center justify-center gap-5">
                    <Link
                      to={`/dashboard/update-attendance?date=${attendance?.date}`}
                    >
                      <FaUserEdit
                        className="text-[#60BF6B] cursor-pointer"
                        size={30}
                      />
                    </Link>
                    <Link to={`/dashboard/view-attendance?date=${""}`}>
                      {" "}
                      <HiOutlineEye
                        className="text-[#42A1DA] cursor-pointer"
                        size={30}
                      />{" "}
                    </Link>
                    <FaRegTrashAlt
                      className="text-[#F62F52] cursor-pointer "
                      size={30}
                      onClick={() => handleDeleteFilter(attendance?.date)}
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      ) : (
        <div>No data found.</div>
      )}
    </div>
  );
};

export default AttendanceList;
