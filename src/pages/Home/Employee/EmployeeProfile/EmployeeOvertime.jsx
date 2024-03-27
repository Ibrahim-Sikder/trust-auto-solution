/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "../Employee.css";
import avatar from "../../../../../public/assets/avatar.jpg";
import "../Employee.css";
import { useState } from "react";
import OvertimeModal from "./OvertimeModal";

const EmployeeOvertime = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="table-container">
      {" "}
      {/* Add a class to the table container */}
      <table className="leaveTable">
        <thead></thead>
        <tbody>
          <tr className="flex items-center justify-center overtimeRow">
            <td>
              <div className="overTimeCard employeeCard max-auto ">
                <div className="flex items-center">
                  <div className="">
                    <h4 className="text-xl font-semibold ">Date </h4>
                    <b>10-05-2024</b>
                  </div>
                </div>
              </div>
            </td>
            <td>
              <div className="overTimeCard employeeCard">
                <div className="flex items-center ">
                  <div className="">
                    <h4 className="text-xl font-semibold ">Hours </h4>
                    <b>03</b>
                  </div>
                </div>
              </div>
            </td>
            <td>
              <button
                onClick={handleOpen}
                className="px-3 py-3 text-xl text-white duration-300 rounded-lg px- bg-[#FF851A] active:scale-95"
              >
                {" "}
                + Add Overtime{" "}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      {open && <OvertimeModal onClose={handleClose} />}
    </div>
  );
};

export default EmployeeOvertime;
