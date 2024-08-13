/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "../Employee.css";

import "../Employee.css";

const EmployeeOvertime = () => {
 
  
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
                    <h4 className="text-xl font-semibold ">Day </h4>
                    <b>Saturday</b>
                  </div>
                </div>
              </div>
            </td>
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
           
          </tr>
        </tbody>
      </table>
     
    </div>
  );
};

export default EmployeeOvertime;
