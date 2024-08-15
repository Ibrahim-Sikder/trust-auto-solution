/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useGetSingleSalaryQuery } from "../../../../redux/api/salary";
import "../Employee.css";

import "../Employee.css";

const EmployeeSalary = ({ id }) => {
  const { data, isLoading } = useGetSingleSalaryQuery(id);
  if (isLoading) {
    return <p>Loading.....</p>;
  }

  return (
    <div className="table-container">
      <table className="leaveTable">
        <thead>
          <tr>
            <th>Month of Salary</th>
            <th>Bonus </th>
            <th>Overtime Salary </th>
            <th>Amount of Salary </th>
            <th>Total Payment </th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((salary) => (
            <tr key={salary._id}>
              <td>{salary?.month_of_salary}</td>
              <td>৳{salary?.bonus}</td>
              <td>৳{salary?.overtime_amount} </td>
              <td>৳{salary?.salary_amount}</td>
              <td>৳{salary?.total_payment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeSalary;
