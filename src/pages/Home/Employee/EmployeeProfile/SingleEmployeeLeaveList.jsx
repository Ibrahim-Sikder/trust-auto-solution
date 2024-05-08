/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "../Employee.css";
import avatar from "../../../../../public/assets/avatar.jpg";
import "../Employee.css";
import { useState } from "react";
import RequestLeaveModal from "./RequestLeaveModal";


const SingleEmployeeLeaveList = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="table-container">
      <div onClick={handleOpen} className="relative rounded-sm my-5 flex justify-end w-full ">
          <button className="p-1 py-3 md:px-3 text-sm md:text-xl text-white duration-300 rounded-lg bg-sky-500 active:scale-95">
            {" "}
            + Request Leave
          </button>
        </div>
      <table className="leaveTable">
        <thead>
          <tr>
            <th>Leave Type</th>
            <th>From</th>
            <th>To</th>
            <th>No of Days </th>
            <th>Reason </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Casual Leave</td>
            <td>24 Feb 2019</td>
            <td>24 Feb 2019</td>
            <td>5 days </td>
            <td> Going to Hospital </td>
          </tr>
        </tbody>
      </table>

      {open && <RequestLeaveModal onClose={handleClose} />}
    </div>
  );
};

export default SingleEmployeeLeaveList;
