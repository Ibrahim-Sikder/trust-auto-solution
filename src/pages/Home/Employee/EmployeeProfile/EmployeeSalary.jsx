/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "../Employee.css";
import avatar from "../../../../../public/assets/avatar.jpg";
import "../Employee.css";

const EmployeeSalary = ({ open }) => {
  return (
    <div className="table-container">
      {" "}
      {/* Add a class to the table container */}
      <table className="leaveTable">
        <thead>
          <tr>
            <th> Employee </th>
            <th> Employee ID </th>
            <th>Month of Salary</th>
            <th>Bonus </th>
            <th>Overtime Salary </th>
            <th>Amount of Salary </th>
            <th>Total Payment  </th>
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
            <td>0000966774</td>
            <td>৳200000</td>
            <td>৳5000</td>
            <td>৳6000 </td>
            <td>৳15000</td>
            <td>৳25000</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeSalary;
