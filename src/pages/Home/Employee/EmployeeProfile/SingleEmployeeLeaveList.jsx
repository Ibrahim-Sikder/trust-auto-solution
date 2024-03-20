/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "../Employee.css";
import avatar from "../../../../../public/assets/avatar.jpg";
import "../Employee.css";

const SingleEmployeeLeaveList = ({ open }) => {
  return (
    <div className="table-container">
      {" "}
      {/* Add a class to the table container */}
      <table className="leaveTable">
        <thead>
          <tr>
            <th> Employee Name </th>
            <th>Leave Type</th>
            <th>From</th>
            <th>To</th>
            <th>No of Days </th>
            <th>Reason </th>
          </tr>
        </thead>
        <tbody>
          <tr>
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
            <td>Casual Leave</td>
            <td>24 Feb 2019</td>
            <td>24 Feb 2019</td>
            <td>5 days </td>
            <td> Going to Hospital </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SingleEmployeeLeaveList;
