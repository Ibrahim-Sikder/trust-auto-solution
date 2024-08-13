/* eslint-disable no-unused-vars */
import { HiCheck, HiOutlineX } from "react-icons/hi";

import "./Attendance.css";

import AttendanceTimePicker from "./AttendanceTimePicker";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import AttendanceOutTimePicker from "./AttendanceForOutTime";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useCreateAttendanceMutation,
  useGetSingleAttendanceQuery,
} from "../../../redux/api/attendance";
import Loading from "../../../components/Loading/Loading";
import { ErrorMessage } from "../../../components/error-message";
import { Close } from "@mui/icons-material";

const years = [{ value: "Select Year", label: "Select Year" }];
for (let year = 2024; year <= 2030; year++) {
  years.push({ value: String(year), label: String(year) });
}

const UpdateAttendance = () => {
  const location = useLocation();
  const date = new URLSearchParams(location.search).get("date");

  const navigate = useNavigate();

  const [employeeAttendance, setEmployeeAttendance] = useState([]);
  const [error, setError] = useState("");
  const [presentState, setPresentState] = useState(
    new Array(employeeAttendance.length).fill(false)
  );
  const [absentState, setAbsentState] = useState(
    new Array(employeeAttendance.length).fill(false)
  );
  const [inTime, setInTime] = useState(
    new Array(employeeAttendance.length).fill(null)
  );
  const [outTime, setOutTime] = useState(
    new Array(employeeAttendance.length).fill(null)
  );
  const [overtime, setOvertime] = useState(
    new Array(employeeAttendance.length).fill(null)
  );
  const [lateStatus, setLateStatus] = useState(
    new Array(employeeAttendance.length).fill(false)
  );

  const {
    data: singleAttendance,
    isLoading: singleAttendanceLoading,
    error: singleAttendanceError,
    refetch,
  } = useGetSingleAttendanceQuery(date);

  const [updateAttendance, { isLoading: updateLoading, error: updateError }] =
    useCreateAttendanceMutation();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/v1/employee`)
      .then((response) => {
        const attendanceData = response.data.employee.map(
          (data) => data.attendance
        );

        const allAttendance = attendanceData.flat();

        // Filtering attendance data for today's date
        const parsedDate = new Date();
        const day = parsedDate.getDate().toString().padStart(2, "0");
        const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0");
        const year = parsedDate.getFullYear();
        const today = `${day}-${month}-${year}`;

        const filteredAttendance = allAttendance.filter(
          (attendance) => attendance.date === today
        );

        setEmployeeAttendance(filteredAttendance);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  const formatTime = (time) => {
    if (!time) return "";
    return dayjs(time).format("h:mmA");
  };

  const handlePresent = (index) => {
    const newPresentState = [...presentState];
    const newAbsentState = [...absentState];

    // Toggle present state
    newPresentState[index] = !newPresentState[index];

    // If present checkbox is checked, uncheck absent checkbox
    if (newPresentState[index]) {
      newAbsentState[index] = false;
    }

    // Update states
    setPresentState(newPresentState);
    setAbsentState(newAbsentState);
  };

  // Handler for absent checkbox
  const handleAbsent = (index) => {
    const newAbsentState = [...absentState];
    const newPresentState = [...presentState];

    // Toggle absent state
    newAbsentState[index] = !newAbsentState[index];

    // If absent checkbox is checked, uncheck present checkbox
    if (newAbsentState[index]) {
      newPresentState[index] = false;
    }

    // Update states
    setAbsentState(newAbsentState);
    setPresentState(newPresentState);
  };

  const handleAttendanceInTime = (index, time) => {
    const formattedTime = formatTime(time);
    setInTime((prevSelectedTimes) => {
      const updatedSelectedTimes = [...prevSelectedTimes];
      updatedSelectedTimes[index] = formattedTime;
      return updatedSelectedTimes;
    });
  };

  const handleAttendanceOutTime = (index, value) => {
    const formattedTime = formatTime(value);
    setOutTime((prevSelectedTimes) => {
      const updatedSelectedTimes = [...prevSelectedTimes];
      updatedSelectedTimes[index] = formattedTime;
      return updatedSelectedTimes;
    });
  };
  const handleAttendanceOvertime = (index, value) => {
    const newOvertime = [...overtime];
    newOvertime[index] = value;
    setOvertime(newOvertime);
  };

  const handleLate = (index, value) => {
    const newLateState = [...lateStatus];
    newLateState[index] = value;
    setLateStatus(newLateState);
  };

  const handleSubMitAttendance = async () => {
    const newAttendanceData = singleAttendance?.data?.map(
      (attendance, index) => {
        return {
          employee: attendance.employee,
          full_name: attendance.full_name,
          employeeId: attendance.employeeId,
          status: attendance.status,
          designation: attendance.designation,
          date: attendance.date,
          office_time: "10.00",
          present:
            presentState[index] !== undefined
              ? presentState[index]
              : attendance.present,
          absent:
            absentState[index] !== undefined
              ? absentState[index]
              : attendance.absent,
          in_time:
            inTime[index] !== undefined ? inTime[index] : attendance.in_time,
          out_time:
            outTime[index] !== undefined ? outTime[index] : attendance.out_time,
          overtime:
            overtime[index] !== undefined
              ? overtime[index]
              : attendance.overtime,
          late_status:
            lateStatus[index] !== undefined
              ? lateStatus[index]
              : attendance.late_status,
        };
      }
    );

    try {
      const response = await updateAttendance(newAttendanceData).unwrap();
      if (response.success) {
        toast.success("Attendance update successful.");
        navigate("/dashboard/attendance-list");
        refetch();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (singleAttendanceLoading) {
    return <Loading />;
  }

  if (singleAttendanceError) {
    toast.error(singleAttendanceError?.data?.message);
  }

  return (
    <div className="pt-8 pb-20">
      <div className="flex items-center justify-between my-3 mb-8">
        <div className="flex items-center justify-center ">
          <div className="ml-2">
            <h3 className="text-2xl font-bold"> Update Attendance </h3>{" "}
            <span> Dashboard / Update Attendance </span>{" "}
          </div>
        </div>
      </div>
      <div className=" attendanceWraps">
        <table className="attendanceInputTable">
          <thead>
            <tr>
              <th>SL No</th>
              <th>Name</th>
              <th>ID</th>
              <th>Designation</th>
              <th>Date</th>
              <th>Present</th>
              <th>Absence</th>
              <th>Office Time</th>
              <th>In Time</th>
              <th>Out Time</th>
              <th>Overtime</th>
              <th>Late</th>
            </tr>
          </thead>
          <tbody>
            {singleAttendance?.data?.map((attendance, index) => (
              <tr
                className={index % 2 === 0 ? "even-row" : "odd-row"}
                key={attendance?._id}
              >
                <td>{index + 1}</td>
                <td>{attendance?.full_name}</td>
                <td>{attendance?.employeeId}</td>
                <td>{attendance?.designation}</td>
                <td>{attendance?.date}</td>
                <td>
                  <input
                    type="checkbox"
                   className="border w-5 h-5"
                    onClick={() => handlePresent(index)}
                    checked={
                      presentState[index] !== undefined
                        ? presentState[index]
                        : attendance?.present
                    }
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    className="border w-5 h-5"
                    onClick={() => handleAbsent(index)}
                    checked={
                      absentState[index] !== undefined
                        ? absentState[index]
                        : attendance.absent
                    }
                  />
                </td>
                <td>10.00</td>
                <td>
                  <AttendanceTimePicker
                    handleAttendanceInTime={handleAttendanceInTime}
                    index={index}
                    defaultValue={attendance?.in_time}
                  />
                </td>
                <td>
                  <AttendanceOutTimePicker
                    handleAttendanceOutTime={handleAttendanceOutTime}
                    index={index}
                    defaultValue={attendance?.out_time}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="border overTimeInput"
                    onChange={(e) =>
                      handleAttendanceOvertime(index, e.target.value)
                    }
                    defaultValue={attendance?.overtime}
                  />
                </td>
                <td>
                  {presentState[index] ? (
                    <div className="flex items-center justify-center cursor-pointer">
                      <HiCheck
                        className="text-[#4AB657] attendanceIcon"
                        size={20}
                        onClick={() => handleLate(index, false)}
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center cursor-pointer">
                      <Close
                        className="text-[#FF0000] attendanceIcon"
                        size={20}
                        onClick={() => handleLate(index, true)}
                      />
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="my-2">
          {updateError && (
            <ErrorMessage messages={updateError?.data?.errorSources} />
          )}
        </div>
        <div className="flex justify-end mt-3">
          {" "}
          <button
            className="bg-[#42A1DA] text-white px-3 py-2 rounded-sm"
            type="submit"
            onClick={handleSubMitAttendance}
            disabled={updateLoading}
          >
            Update Attendance
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateAttendance;
