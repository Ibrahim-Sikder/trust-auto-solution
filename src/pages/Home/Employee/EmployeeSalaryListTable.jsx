/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useGetAllSalaryQuery } from "../../../redux/api/salary";
import { useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const years = [{ value: "Select Year", label: "Select Year" }];
// Start from 2024 and go up to 2030
for (let year = 2024; year <= 2030; year++) {
  years.push({ value: String(year), label: String(year) });
}

export const allMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const EmployeeSalaryListTable = () => {
  const [filterType, setFilterType] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const limit = 10;
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentYear = currentDate.getFullYear();
  const {
    data: getAllSalary,
    isLoading: salaryLoading,
    error: salaryError,
    refetch,
  } = useGetAllSalaryQuery({
    searchTerm: filterType?.value,
  });

  const handleChange = (filterType) => {
    setFilterType(filterType);
  };

  const handleRemoveSearch = () => {
    setFilterType("");
  };

  return (
    <div className="mt-10 table-container mb-20 ">
      <h3 className="mt-5 mb-8 md:text-2xl font-semibold">
        Employee Salary Sheet :{" "}
        {filterType?.value ? filterType?.value : currentMonth} {currentYear}
      </h3>

      <div className="flex  gap-5 mt-5 mb-8">
        {/* <div>
          <Select value={filterType} onChange={handleChange} options={months} />
        </div> */}

        <Box width="300px">
          <FormControl fullWidth>
            <InputLabel htmlFor="grouped-native-select">
              Select Month
            </InputLabel>
            <Select
              fullWidth
              id="grouped-native-select"
              label="Select Month"
              value={filterType}
              onChange={handleChange}
            >
              {allMonths.map((month) => (
                <MenuItem value={month} key={month}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <div className="relative rounded-sm w-max">
          <button
            onClick={handleRemoveSearch}
            className="employeeBtn employeeInput"
          >
            Remove Search
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
          {getAllSalary?.data[0]?.salaries?.map((employee, index) => (
            <tr
              className={index % 2 == 0 ? "even-row" : "odd-row"}
              key={employee?._id}
            >
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
