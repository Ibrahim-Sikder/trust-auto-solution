/* eslint-disable no-unused-vars */
import { HiCheck, HiOutlineX } from "react-icons/hi";

import "./Attendance.css";

import AttendanceTimePicker from "./AttendanceTimePicker";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import AttendanceOutTimePicker from "./AttendanceForOutTime";

const years = [{ value: "Select Year", label: "Select Year" }];
for (let year = 2024; year <= 2030; year++) {
  years.push({ value: String(year), label: String(year) });
}

const UpdateAttendance = () => {
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

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/employee")
      .then((response) => {
        const attendanceData = response.data.employee.map(
          (data) => data.attendance
        );

        const allAttendance = attendanceData.flat();

        console.log(allAttendance);
        // Filtering attendance data for today's date
        const parsedDate = new Date();
        const day = parsedDate.getDate().toString().padStart(2, "0");
        const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0");
        const year = parsedDate.getFullYear();
        const today = `${day}-${month}-${year}`;
        console.log(today);
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
    console.log(value);
    const newOvertime = [...overtime];
    newOvertime[index] = value;
    setOvertime(newOvertime);
  };



  const handleLate = (index, value) => {
    const newLateState = [...lateStatus];
    newLateState[index] = value
    setLateStatus(newLateState);
  };
   

  const handleSubMitAttendance = async () => {
    const newAttendanceData = employeeAttendance.map((employee, index) => {
      return {
        _id: employee._id,
        full_name: employee.full_name,
        employeeId: employee.employeeId,
        status: employee.status,
        designation: employee.designation,
        date: employee.date,
        present: presentState[index] !== undefined ? presentState[index] : employee.present,
        absent: absentState[index] !== undefined ? absentState[index]: employee.absent,
        in_time: inTime[index] !== undefined ? inTime[index] : employee.in_time,
        out_time: outTime[index] !== undefined ? outTime[index] : employee.out_time,
        overtime: overtime[index] !== undefined ? overtime[index] : employee.overtime,
        late_status: lateStatus[index] !== undefined ? lateStatus[index] : employee.late_status,
      };
    });

    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/employee/all`,
        newAttendanceData
      );
      if (response.status === 200) {
        toast.success("Update successful");
      }
    } catch (error) {
      setError(error.message);
    }
  };
 
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
            {employeeAttendance.map((employee, index) => (
              <tr className="even-row" key={employee._id}>
                <td>{index + 1}</td>
                <td>{employee.full_name}</td>
                <td>{employee.employeeId}</td>
                <td>{employee.status}</td>
                <td>{employee.date}</td>
                <td>
                  <input
                    type="checkbox"
                    className="border"
                    onClick={() => handlePresent(index)}
                    checked={presentState[index] !== undefined ? presentState[index] : employee.present}
                    
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    className="border"
                    onClick={() => handleAbsent(index)}
                    checked={absentState[index] !== undefined ? absentState[index] : employee.absent}
                  />
                </td>
                <td>10.00</td>
                <td>
                  <AttendanceTimePicker
                    handleAttendanceInTime={handleAttendanceInTime}
                    index={index}
                    defaultValue={employee.in_time}
                  />
                </td>
                <td>
                  <AttendanceOutTimePicker
                    handleAttendanceOutTime={handleAttendanceOutTime}
                    index={index}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="border overTimeInput"
                    onChange={(e) =>
                      handleAttendanceOvertime(index, e.target.value)
                    }
                    defaultValue={employee.overtime}
                  />
                </td>
                <td>
                  <div className="flex items-center justify-center cursor-pointer ">
                    <HiCheck
                      size={20}
                      className="text-[#F62D51] attendanceIcon"
                      onClick={() => handleLate(index, true)}
                    />
                    <HiCheck
                      className="text-[#4AB657] attendanceIcon "
                      size={20}
                      onClick={() => handleLate(index, false)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          {/* <tbody>
            <tr className="even-row">
              <td>01</td>
              <td>Rakib</td>
              <td>04785</td>
              <td>Staff</td>
              <td>10-05-2024</td>
              <td>
                <input type="checkbox" className="border" />
              </td>
              <td>
                <input type="checkbox" className="border" />
              </td>
              <td>10.00</td>
              <td>
                <AttendanceTimePicker />
              </td>
              <td>
                <AttendanceTimePicker />
              </td>
              <td>
                <input type="number" className="border overTimeInput" />
              </td>
              <td>
                <div className="flex items-center justify-center cursor-pointer ">
                  <HiOutlineX
                    size={20}
                    className="text-[#F62D51] attendanceIcon"
                  />
                  <HiCheck
                    className="text-[#4AB657] attendanceIcon "
                    size={20}
                  />
                </div>
              </td>
            </tr>
            <tr className="odd-row">
              <td>01</td>
              <td>Rakib</td>
              <td>04785</td>
              <td>Staff</td>
              <td>10-05-2024</td>
              <td>
                <input type="checkbox" className="border" />
              </td>
              <td>
                <input type="checkbox" className="border" />
              </td>
              <td>10.00</td>
              <td>
                <AttendanceTimePicker />
              </td>
              <td>
                <AttendanceTimePicker />
              </td>
              <td>
                <input type="number" className="border overTimeInput" />
              </td>
              <td>
                <div className="flex items-center justify-center cursor-pointer ">
                  <HiOutlineX
                    size={20}
                    className="text-[#F62D51] attendanceIcon"
                  />
                  <HiCheck
                    className="text-[#4AB657] attendanceIcon "
                    size={20}
                  />
                </div>
              </td>
            </tr>
            <tr className="even-row">
              <td>01</td>
              <td>Rakib</td>
              <td>04785</td>
              <td>Staff</td>
              <td>10-05-2024</td>
              <td>
                <input type="checkbox" className="border" />
              </td>
              <td>
                <input type="checkbox" className="border" />
              </td>
              <td>10.00</td>
              <td>
                <AttendanceTimePicker />
              </td>
              <td>
                <AttendanceTimePicker />
              </td>
              <td>
                <input type="number" className="border overTimeInput" />
              </td>
              <td>
                <div className="flex items-center justify-center cursor-pointer ">
                  <HiOutlineX
                    size={20}
                    className="text-[#F62D51] attendanceIcon"
                  />
                  <HiCheck
                    className="text-[#4AB657] attendanceIcon "
                    size={20}
                  />
                </div>
              </td>
            </tr>
            <tr className="odd-row">
              <td>01</td>
              <td>Rakib</td>
              <td>04785</td>
              <td>Staff</td>
              <td>10-05-2024</td>
              <td>
                <input type="checkbox" className="border" />
              </td>
              <td>
                <input type="checkbox" className="border" />
              </td>
              <td>10.00</td>
              <td>
                <AttendanceTimePicker />
              </td>
              <td>
                <AttendanceTimePicker />
              </td>
              <td>
                <input type="number" className="border overTimeInput" />
              </td>
              <td>
                <div className="flex items-center justify-center cursor-pointer ">
                  <HiOutlineX
                    size={20}
                    className="text-[#F62D51] attendanceIcon"
                  />
                  <HiCheck
                    className="text-[#4AB657] attendanceIcon "
                    size={20}
                  />
                </div>
              </td>
            </tr>
            <tr className="even-row">
              <td>01</td>
              <td>Rakib</td>
              <td>04785</td>
              <td>Staff</td>
              <td>10-05-2024</td>
              <td>
                <input type="checkbox" className="border" />
              </td>
              <td>
                <input type="checkbox" className="border" />
              </td>
              <td>10.00</td>
              <td>
                <AttendanceTimePicker />
              </td>
              <td>
                <AttendanceTimePicker />
              </td>
              <td>
                <input type="number" className="border overTimeInput" />
              </td>
              <td>
                <div className="flex items-center justify-center cursor-pointer ">
                  <HiOutlineX
                    size={20}
                    className="text-[#F62D51] attendanceIcon"
                  />
                  <HiCheck
                    className="text-[#4AB657] attendanceIcon "
                    size={20}
                  />
                </div>
              </td>
            </tr>
            <tr className="odd-row">
              <td>01</td>
              <td>Rakib</td>
              <td>04785</td>
              <td>Staff</td>
              <td>10-05-2024</td>
              <td>
                <input type="checkbox" className="border" />
              </td>
              <td>
                <input type="checkbox" className="border" />
              </td>
              <td>10.00</td>
              <td>
                <AttendanceTimePicker />
              </td>
              <td>
                <AttendanceTimePicker />
              </td>
              <td>
                <input type="number" className="border overTimeInput" />
              </td>
              <td>
                <div className="flex items-center justify-center cursor-pointer ">
                  <HiOutlineX
                    size={20}
                    className="text-[#F62D51] attendanceIcon"
                  />
                  <HiCheck
                    className="text-[#4AB657] attendanceIcon "
                    size={20}
                  />
                </div>
              </td>
            </tr>
            <tr className="even-row">
              <td>01</td>
              <td>Rakib</td>
              <td>04785</td>
              <td>Staff</td>
              <td>10-05-2024</td>
              <td>
                <input type="checkbox" className="border" />
              </td>
              <td>
                <input type="checkbox" className="border" />
              </td>
              <td>10.00</td>
              <td>
                <AttendanceTimePicker />
              </td>
              <td>
                <AttendanceTimePicker />
              </td>
              <td>
                <input type="number" className="border overTimeInput" />
              </td>
              <td>
                <div className="flex items-center justify-center cursor-pointer ">
                  <HiOutlineX
                    size={20}
                    className="text-[#F62D51] attendanceIcon"
                  />
                  <HiCheck
                    className="text-[#4AB657] attendanceIcon "
                    size={20}
                  />
                </div>
              </td>
            </tr>
            <tr className="odd-row">
              <td>01</td>
              <td>Rakib</td>
              <td>04785</td>
              <td>Staff</td>
              <td>10-05-2024</td>
              <td>
                <input type="checkbox" className="border" />
              </td>
              <td>
                <input type="checkbox" className="border" />
              </td>
              <td>10.00</td>
              <td>
                <AttendanceTimePicker />
              </td>
              <td>
                <AttendanceTimePicker />
              </td>
              <td>
                <input type="number" className="border overTimeInput" />
              </td>
              <td>
                <div className="flex items-center justify-center cursor-pointer ">
                  <HiOutlineX
                    size={20}
                    className="text-[#F62D51] attendanceIcon"
                  />
                  <HiCheck
                    className="text-[#4AB657] attendanceIcon "
                    size={20}
                  />
                </div>
              </td>
            </tr>
          </tbody> */}
        </table>
        <div className="flex justify-end mt-3">
          {" "}
          <button
            className="bg-[#42A1DA] text-white px-3 py-2 rounded-sm"
            type="submit"
            onClick={handleSubMitAttendance}
          >
            Update Attendance
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateAttendance;
