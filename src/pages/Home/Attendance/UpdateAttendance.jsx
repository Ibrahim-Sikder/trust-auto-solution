import { HiCheck, HiOutlineX } from "react-icons/hi";

import "./Attendance.css";

const years = [{ value: "Select Year", label: "Select Year" }];
for (let year = 2024; year <= 2030; year++) {
  years.push({ value: String(year), label: String(year) });
}

import AttendanceTimePicker from "./AttendanceTimePicker";
const UpdateAttendance = () => {
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
      <form className=" attendanceWraps">
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
              <th>Late</th>
            </tr>
          </thead>
          <tbody>
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
          </tbody>
        </table>
        <div className="flex justify-end mt-3">
          {" "}
          <button
            className="bg-[#42A1DA] text-white px-3 py-2 rounded-sm"
            type="submit"
          >
            Update Attendance
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateAttendance;
