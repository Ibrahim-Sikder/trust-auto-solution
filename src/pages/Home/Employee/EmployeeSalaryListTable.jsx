/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { months } from "../../../constant/Vehicle.constant";
import Select from "react-select";
import axios from "axios";

const years = [{ value: "Select Year", label: "Select Year" }];
// Start from 2024 and go up to 2030
for (let year = 2024; year <= 2030; year++) {
  years.push({ value: String(year), label: String(year) });
}

const initialSelectedOption = months[0];
const initialSelectedOption2 = years[0];

const EmployeeSalaryListTable = ({
  getAllEmployee,
  setGetAllEmployeeSalary,
  setError,
}) => {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentYear = currentDate.getFullYear();

  const [selectedOption, setSelectedOption] = useState(initialSelectedOption);

  // const [selectedOption2, setSelectedOption2] = useState(
  //   initialSelectedOption2
  // );

  console.log(selectedOption);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  // const handleChange2 = (selectedOption2) => {
  //   setSelectedOption2(selectedOption2);
  // };

  const handleFilterData = () => {
    axios
      .get("http://localhost:5000/api/v1/employee")
      .then((response) => {
        const salaryData = response.data.employee.map(
          (data) => data.salary_details
        );
        const allSalary = salaryData.flat();
        const filteredSalary = allSalary.filter(
          (salary) => salary.month_of_salary === selectedOption.value
        );

        setGetAllEmployeeSalary(filteredSalary);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="mt-10 table-container">
      <h3 className="mt-5 mb-8 text-2xl font-semibold">
        Employee Salary Sheet :{" "}
        {selectedOption.value ? selectedOption.value : currentMonth}{" "}
        {currentYear}
      </h3>

      <div className="grid grid-cols-5 gap-5 mt-5 mb-8">
        {/* <div className="relative rounded-sm w-max">
          <input
            className="peer employeeInput w-[300px h-[60px]]"
            type="text"
            placeholder=""
          />
          <label className="employeeLavel" htmlFor="">
            Employee ID
          </label>
        </div> */}
        <div>
          <Select
            value={selectedOption}
            onChange={handleChange}
            options={months}
          />
        </div>
        {/* <div>
          <Select
            value={selectedOption2}
            onChange={handleChange2}
            options={years}
          />
        </div> */}
        <div className="relative rounded-sm w-max">
          <button
            onClick={handleFilterData}
            className="employeeBtn employeeInput"
          >
            Search
          </button>
        </div>
      </div>

      <table className="attendanceTable">
        <thead>
          <tr>
            <th>Employee </th>
            <th>Employee ID </th>
            <th>Month of Salary </th>
            <th>Bonus</th>
            <th>Overtime </th>
            <th>Amount of Salary </th>
            <th>Previous Due </th>
            <th>Cut Salary </th>
            <th>Total Payment </th>
            <th>Advance </th>
            <th>Due </th>
            <th>Pay</th>
            <th>Paid</th>
          </tr>
        </thead>
        <tbody>
          {getAllEmployee?.map((employee, index) => (
            <tr className={index %2 == 0 ? 'even-row' : 'odd-row'} key={employee?._id}>
              <td>{employee.full_name}</td>
              <td> {employee.employeeId}</td>
              <td>{employee.month_of_salary}</td>
              <td> {employee.bonus}</td>

              <td>{employee.overtime_amount} </td>
              <td> {employee.salary_amount}</td>
              <td>{employee.previous_due} </td>
              <td> {employee.cut_salary}</td>
              <td> {employee.total_payment}</td>
              <td> {employee.advance}</td>
              <td>{employee.due}</td>
              <td>{employee.pay}</td>
              <td> {employee.paid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeSalaryListTable;
