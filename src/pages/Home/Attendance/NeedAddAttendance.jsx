/* eslint-disable no-unused-vars */
import { HiCheck, HiOutlineEye, HiOutlineX } from "react-icons/hi";
import avatar from "../../../../public/assets/avatar.jpg";
import "./Attendance.css";
import { useEffect, useState } from "react";
import Select from "react-select";

const years = [{ value: "Select Year", label: "Select Year" }];
// Start from 2024 and go up to 2030
for (let year = 2024; year <= 2030; year++) {
  years.push({ value: String(year), label: String(year) });
}

const initialSelectedOption = months[0];
const initialSelectedOption2 = years[0];

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaRegTrashAlt, FaUserEdit } from "react-icons/fa";
import AttendanceTimePicker from "./AttendanceTimePicker";
import { Link } from "react-router-dom";
import { months } from "../../../constant/Vehicle.constant";
import axios from "axios";
import dayjs from "dayjs";
import AttendanceOutTimePicker from "./AttendanceForOutTime";
const AddAttendance = () => {
  const generateIcons = (totalCells, closePositions) => {
    const icons = [];
    let closeCounter = 0;
    for (let i = 0; i < totalCells; i++) {
      if (closePositions.includes(i + 1) && closeCounter < 7) {
        icons.push(
          <HiOutlineX
            key={`close_${i}`}
            size={20}
            className="text-[#F62D51] attendanceIcon"
          />
        );
        closeCounter++;
      } else {
        icons.push(
          <HiCheck
            key={`check_${i}`}
            className="text-[#4AB657] attendanceIcon "
            size={20}
          />
        );
      }
    }
    return icons;
  };

  const closeIconPositions = [Math.floor(20 / 2), 1, 31];

  const [selectedOption, setSelectedOption] = useState(initialSelectedOption);
  const [selectedOption2, setSelectedOption2] = useState(
    initialSelectedOption2
  );

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    console.log(`Option selected:`, selectedOption);
  };
  const handleChange2 = (selectedOption2) => {
    setSelectedOption2(selectedOption2);
  };

  const [error, setError] = useState("");
  const [getAllEmployee, setGetAllEmployee] = useState([]);
  const [presentState, setPresentState] = useState(
    new Array(getAllEmployee.length).fill(false)
  );
  const [absentState, setAbsentState] = useState(
    new Array(getAllEmployee.length).fill(false)
  );
  const [inTime, setInTime] = useState(
    new Array(getAllEmployee.length).fill(null)
  );
  const [outTime, setOutTime] = useState(
    new Array(getAllEmployee.length).fill(null)
  );
  const [overtime, setOvertime] = useState(
    new Array(getAllEmployee.length).fill(null)
  );
  const [lateStatus, setLateStatus] = useState(false);

  const [attendanceData, setAttendanceData] = useState([]);

  const parsedDate = new Date();
  const day = parsedDate.getDate().toString().padStart(2, "0");
  const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0");
  const year = parsedDate.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;

  // Function to format the time
  const formatTime = (time) => {
    if (!time) return "";
    return dayjs(time).format("h:mmA");
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/employee")
      .then((response) => {
        setGetAllEmployee(response.data.employee);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

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

  

  const handleSubMitAttendance = async () => {
    const newAttendanceData = getAllEmployee.map((employee, index) => {
      return {
        _id: employee._id,
        full_name: employee.full_name,
        employeeId: employee.employeeId,
        status: employee.status,
        date: formattedDate,
        present: presentState[index],
        absent: absentState[index],
        in_time: inTime[index],
        out_time: outTime[index],
        overtime: overtime[index],
        late_status: lateStatus,
      };
    });
    setAttendanceData(newAttendanceData);

    // getAllEmployee.forEach(async (attendanceRecord) => {
    //   try {
    //     // Send a PUT request to update the attendance for the employee
    //      console.log(attendanceRecord._id)
    //      console.log(attendanceRecord)
    //      console.log(attendanceData)
    //     const response = await axios.put(
    //       `http://localhost:5000/api/v1/employee/one/${attendanceRecord._id}`, // Include employee ID in the URL
    //       attendanceData
    //     );
    //     console.log(
    //       `Attendance response ${response}`
    //     );
    //     console.log(
    //       `Attendance updated for employee with ID ${attendanceRecord._id}`
    //     );
    //   } catch (error) {
    //     console.error(
    //       `Error updating attendance for employee with ID ${attendanceRecord._id}`
    //     );
    //     console.error(error);
    //   }
    // });
    // Set the state with the array of objects
  };

  // console.log(selectedTime);
  // console.log(attendanceData);

  return (
    <div className="pt-8 pb-20">
      <div className="flex items-center justify-between my-3 mb-8">
        <div className="flex items-center justify-center ">
          <div className="ml-2">
            <h3 className="text-2xl font-bold"> Attendance </h3>{" "}
            <span> Dashboard / Attendance </span>{" "}
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
            {getAllEmployee.map((employee, index) => (
              <tr className="even-row" key={employee._id}>
                <td>{index + 1}</td>
                <td>{employee.full_name}</td>
                <td>{employee.employeeId}</td>
                <td>{employee.status}</td>
                <td>{formattedDate}</td>
                <td>
                  <input
                    type="checkbox"
                    className="border"
                    onClick={() => handlePresent(index)}
                    checked={presentState[index]}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    className="border"
                    onClick={() => handleAbsent(index)}
                    checked={absentState[index]}
                  />
                </td>
                <td>10.00</td>
                <td>
                  <AttendanceTimePicker
                    handleAttendanceInTime={handleAttendanceInTime}
                    index={index}
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
                  />
                </td>
                <td>
                  <div className="flex items-center justify-center cursor-pointer ">
                    <HiCheck
                      size={20}
                      className="text-[#F62D51] attendanceIcon"
                      onClick={() => setLateStatus(true)}
                    />
                    <HiCheck
                      className="text-[#4AB657] attendanceIcon "
                      size={20}
                      onClick={() => setLateStatus(false)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mt-3">
          {" "}
          <button
            onClick={handleSubMitAttendance}
            className="bg-[#42A1DA] text-white px-3 py-2 rounded-sm"
            type="submit"
          >
            Submit Attendance
          </button>
        </div>
      </div>
      <div className="mt-14 table-container">
        <h3 className="mt-5 mb-8 text-2xl font-semibold">Today Attendance</h3>
        <table className="attendanceTable">
          <thead>
            <tr>
              <th>Date</th>
              <th>Present</th>
              <th>Absent</th>
              <th>Late</th>
              <th colSpan={3}>Action </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> 10-02-2024</td>
              <td>
                <div className="presentCard employeeCard">
                  <div className="flex items-center justify-center w-full px-5 py-3">
                    <div className="flex items-center">
                      <div style={{ width: 60, height: 60 }}>
                        <CircularProgressbar
                          value={90}
                          text={`${90}%`}
                          styles={{
                            // Customize the root element (outer circle)
                            path: {
                              stroke: `#60BE6B`, // Set the color of the progress bar
                            },
                            // Customize the text
                            text: {
                              fill: "#3e98c7", // Set the color of the text
                            },
                            // Customize the trail (background)
                            trail: {
                              stroke: "#f4f4f4", // Set the color of the background
                            },
                          }}
                        />
                      </div>
                    </div>
                    <b className="ml-3 text-3xl">20</b>
                  </div>
                </div>
              </td>
              <td>
                <div className="employeeCard presentCard">
                  <div className="flex items-center justify-center w-full px-5 py-3">
                    <div className="flex items-center">
                      <div style={{ width: 60, height: 60 }}>
                        <CircularProgressbar
                          value={10}
                          text={`${10}%`}
                          styles={{
                            // Customize the root element (outer circle)
                            path: {
                              stroke: `#F62D51`, // Set the color of the progress bar
                            },
                            // Customize the text
                            text: {
                              fill: "#3e98c7", // Set the color of the text
                            },
                            // Customize the trail (background)
                            trail: {
                              stroke: "#f4f4f4", // Set the color of the background
                            },
                          }}
                        />
                      </div>
                    </div>
                    <b className="ml-3 text-3xl">10</b>
                  </div>
                </div>
              </td>
              <td>
                <div className="presentCard employeeCard">
                  <div className="flex items-center justify-center w-full py-3 pxe-5">
                    <div className="flex items-center">
                      <div style={{ width: 60, height: 60 }}>
                        <CircularProgressbar
                          value={5}
                          text={`${5}%`}
                          styles={{
                            // Customize the root element (outer circle)
                            path: {
                              stroke: `#FF851A`, // Set the color of the progress bar
                            },
                            // Customize the text
                            text: {
                              fill: "#3e98c7", // Set the color of the text
                            },
                            // Customize the trail (background)
                            trail: {
                              stroke: "#f4f4f4", // Set the color of the background
                            },
                          }}
                        />
                      </div>
                    </div>
                    <b className="ml-3 text-3xl">5</b>
                  </div>
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
                {" "}
                <HiOutlineEye
                  className="text-[#42A1DA] cursor-pointer mx-auto"
                  size={30}
                />{" "}
              </td>
              <td>
                {" "}
                <FaRegTrashAlt
                  className="text-[#F62F52] cursor-pointer mx-auto"
                  size={30}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-10 table-container">
        <h3 className="mt-5 mb-8 text-2xl font-semibold">
          Today Attendance Sheet : March 2024
        </h3>
        <div className="grid grid-cols-5 gap-5 mt-5 mb-8">
          <div className="relative rounded-sm w-max">
            <input
              className="peer employeeInput w-[300px h-[60px]]"
              type="text"
              placeholder=""
            />
            <label className="employeeLavel" htmlFor="">
              Employee ID
            </label>
          </div>
          <div>
            <Select
              value={selectedOption}
              onChange={handleChange}
              options={months}
            />
          </div>
          <div>
            <Select
              value={selectedOption2}
              onChange={handleChange2}
              options={years}
            />
          </div>
          <div className="relative rounded-sm w-max">
            <button className="employeeBtn employeeInput">Search</button>
          </div>
        </div>
        <table className="attendanceTable">
          <thead>
            <tr className="bg-[#42A1DA] text-white ">
              <th>Employee </th>
              <th>Employee ID </th>
              {[...Array(31).keys()].map((day) => (
                <th key={day}>
                  <div>
                    <span>March </span>
                    {day + 1}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(6).keys()].map((row) => (
              <tr key={row} className={row % 2 === 0 ? "even-row" : "odd-row"}>
                <td>
                  <div className="flex items-center">
                    <img
                      src={avatar}
                      className="object-cover w-8 h-8 mr-2 rounded-full"
                      alt=""
                    />
                    <span>Mr John</span>
                  </div>
                </td>
                <td>0002024</td>
                {generateIcons(31, closeIconPositions).map((icon, index) => (
                  <td key={index}>
                    <span className="block attendanceIcon">{icon}</span>
                    <div className="flex items-center justify-center">
                      <small className="block mt-3">12.30 - 5.00 </small>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
            <div className="flex my-5 ml-5">
              <Link to="/dashboard/update-attendance">
                <FaUserEdit
                  className="text-[#60BF6B] cursor-pointer mx-auto"
                  size={50}
                />
              </Link>
            </div>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddAttendance;
