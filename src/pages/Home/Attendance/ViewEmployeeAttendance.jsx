import { HiCheck } from "react-icons/hi";
import "./Attendance.css";

const ViewEmployeeAttendance = () => {
  const employeeData = [
    {
      id: 1,
      name: "Rakib",
    },
    {
      id: 1,
      name: "Rakib",
    },
    {
      id: 1,
      name: "Rakib",
    },
    {
      id: 1,
      name: "Rakib",
    },
    {
      id: 1,
      name: "Rakib",
    },
    {
      id: 1,
      name: "Rakib",
    },
    {
      id: 1,
      name: "Rakib",
    },
    {
      id: 1,
      name: "Rakib",
    },
    {
      id: 1,
      name: "Rakib",
    },
    {
      id: 1,
      name: "Rakib",
    },
  ];
  return (
    <div className="pt-8 pb-20">
      <div className="flex items-center justify-between my-3 mb-8">
        <div className="flex items-center justify-center ">
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
            {employeeData.map((data, i) => (
              <tr
                key={data.id}
                className={i % 2 === 0 ? "even-row" : "odd-row"}
              >
                <td>01</td>
                <td>10-05-2024</td>
                <td>Rakib</td>
                <td>04785</td>
                <td>Staff</td>

                <td>
                  <HiCheck
                    className="text-[#4AB657] attendanceIcon "
                    size={25}
                  />
                </td>
                <td>
                  <HiCheck
                    className="text-[#F62D51] attendanceIcon "
                    size={25}
                  />
                </td>
                <td>10.00</td>
                <td>10.00</td>
                <td>10.00</td>
                <td>10.00</td>
                <td>
                  <div className="flex items-center justify-center cursor-pointer ">
                    <HiCheck
                      className="text-[#F62D51] attendanceIcon "
                      size={25}
                    />
                    <HiCheck
                      className="text-[#4AB657] attendanceIcon "
                      size={25}
                    />
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
