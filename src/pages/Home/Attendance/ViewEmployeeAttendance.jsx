/* eslint-disable no-unused-vars */
import { HiCheck } from "react-icons/hi";
import "./Attendance.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ViewEmployeeAttendance = () => {
  const [employeeAttendance, setEmployeeAttendance] = useState([]);
  
  const [error, setError] = useState("");

  const location = useLocation();
  const date = new URLSearchParams(location.search).get("date");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/v1/employee`)
      .then((response) => {
        const attendanceData = response.data.employee.map(
          (data) => data.attendance
        );

        const allAttendance = attendanceData.flat();

        const filteredAttendance = allAttendance.filter(
          (attendance) => attendance.date === date
        );

        setEmployeeAttendance(filteredAttendance);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [date]);

  return (
    <div className="pt-8 pb-20">
      <div className="flex items-center justify-between my-3 mb-8">
        <div className="flex items-center justify-center ">
          {error && <div className="py-2 text-red-400">{error}</div>}
          <div className="ml-2">
            <h3 className="text-2xl font-bold mb-2">
              {" "}
              All Employee Attendance{" "}
            </h3>{" "}
            <span> Dashboard / All Employee Attendance </span>{" "}
          </div>
        </div>
      </div>
      <form className=" attendanceWraps">
        <table className="attendanceInputTable">
          <thead>
            <tr>
              <th>SL No</th>
              <th>Date</th>
              <th>Name</th>
              <th>Employee ID</th>
              <th>Designation</th>

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
            {employeeAttendance.map((data, i) => (
              <tr
                key={data.id}
                className={i % 2 === 0 ? "even-row" : "odd-row"}
              >
                <td>{i + 1}</td>
                <td>{data.date}</td>
                <td>{data.full_name}</td>
                <td> {data.employeeId}</td>
                <td> {data.designation}</td>

                <td>
                  {data.present && (
                    <HiCheck
                      className="text-[#4AB657] attendanceIcon "
                      size={25}
                    />
                  )}
                </td>
                <td>
                  {data.absent && (
                    <HiCheck
                      className="text-[#F62D51] attendanceIcon "
                      size={25}
                    />
                  )}
                </td>
                <td>10.00</td>
                <td> {data.in_time}</td>
                <td> {data.out_time}</td>
                <td>{data.overtime}</td>
                <td>
                  <div className="flex items-center justify-center cursor-pointer ">
                    {data.late_status && (
                      <HiCheck
                        className="text-[#F62D51] attendanceIcon "
                        size={25}
                      />
                    )}
                    {!data.late_status && (
                      <HiCheck
                        className="text-[#4AB657] attendanceIcon "
                        size={25}
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default ViewEmployeeAttendance;
