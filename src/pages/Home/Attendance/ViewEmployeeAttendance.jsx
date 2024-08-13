/* eslint-disable no-unused-vars */
import { HiCheck } from "react-icons/hi";
import "./Attendance.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useGetAllAttendancesQuery } from "../../../redux/api/attendance";
import { useGetAllEmployeesQuery } from "../../../redux/api/employee";

const ViewEmployeeAttendance = () => {
  const [employeeAttendance, setEmployeeAttendance] = useState([]);
  const { data, isLoading } = useGetAllAttendancesQuery({
    limit: 10,
    page: 1,
  });
  const { data: employeeData } = useGetAllEmployeesQuery({
    limit: 10,
    page: 1,
  });

  const [error, setError] = useState("");

  const location = useLocation();
  const date = new URLSearchParams(location.search).get("date");

  // useEffect(() => {
  //   axios
  //     .get(`${import.meta.env.VITE_API_URL}/api/v1/employee`)
  //     .then((response) => {
  //       const attendanceData = response.data.employee.map(
  //         (data) => data.attendance
  //       );

  //       const allAttendance = attendanceData.flat();

  //       const filteredAttendance = allAttendance.filter(
  //         (attendance) => attendance.date === date
  //       );

  //       setEmployeeAttendance(filteredAttendance);
  //     })
  //     .catch((error) => {
  //       setError(error.message);
  //     });
  // }, [date]);

  if (isLoading) {
    return <p>Loading.....</p>;
  }

  const attendanceData = employeeData?.data?.employees?.map((employee) =>
    employee.attendance.map((attend) => attend)
  );


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
            {employeeData?.data?.employees?.map((employee, i) => (
              <tr
                key={data.id}
                className={i % 2 === 0 ? "even-row" : "odd-row"}
              >
                <td>{i + 1}</td>
                <td>{employee.attendance.map((attend, index) => (
                    <div key={index}>
                      {attend.date}
                    </div>
                  ))}</td>
                <td>{employee.full_name}</td>
                <td> {employee.employeeId}</td>
                <td> {employee.designation}</td>

                <td>
                  {employee.attendance.map((attend, index) => (
                    <div key={index}>
                      {attend.present === true ? (
                        <HiCheck
                          className="text-[#4AB657] attendanceIcon "
                          size={25}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  ))}
                </td>
                <td>
                  {employee.attendance.map((attend, index) => (
                    <div key={index}>
                      {attend.present === false ? (
                        <HiCheck
                          className="text-[#F62D51] attendanceIcon "
                          size={25}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  ))}
                </td>
                <td>10.00</td>
                <td>
                  {employee.attendance.map((attend, index) => (
                    <div key={index}>{attend.in_time}</div>
                  ))}
                </td>
                <td>
                  {employee.attendance.map((attend, index) => (
                    <div key={index}>{attend.out_time}</div>
                  ))}
                </td>
                <td>
                  {" "}
                  {employee.salary.map((slr, index) => (
                    <div key={index}>{slr.overtime_amount}</div>
                  ))}
                </td>
                <td>
                {employee.attendance.map((attend, index) => (
                    <div key={index}>
                      {attend.late_status === true ? (
                        <HiCheck
                        className="text-[#4AB657] attendanceIcon "
                        size={25}
                      />
                      ) : (
                        <HiCheck
                        className="text-[#F62D51] attendanceIcon "
                        size={25}
                      />
                      )}
                    </div>
                  ))}
                 
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
