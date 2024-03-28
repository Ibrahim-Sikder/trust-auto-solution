import { useState } from "react";
import { months } from "../../../constant/Vehicle.constant";
import Select from "react-select";

const years = [{ value: "Select Year", label: "Select Year" }];
// Start from 2024 and go up to 2030
for (let year = 2024; year <= 2030; year++) {
  years.push({ value: String(year), label: String(year) });
}

const initialSelectedOption = months[0];
const initialSelectedOption2 = years[0];


const EmployeeSalaryListTable = () => {

    const [selectedOption, setSelectedOption] = useState(initialSelectedOption);
    const [selectedOption2, setSelectedOption2] = useState(
      initialSelectedOption2
    );
  
    const handleChange = (selectedOption) => {
      setSelectedOption(selectedOption);
      console.log(`Option selected:`, selectedOption);
    };
    const handleChange2 = (selectedOption2) => {
      setSelectedOption2(selectedOption2);
    };
  return (
    <div className="mt-10 table-container">
      <h3 className="mt-5 mb-8 text-2xl font-semibold">
        Employee Salary Sheet : March 2024
      </h3>
      
      <div className="grid grid-cols-5 gap-5 mt-5 mb-8">
      <div className="relative rounded-sm w-max">
        <input
          className="peer employeeInput w-[300px h-[60px]]"
          type="text"
          placeholder=""
        />
        <label className="employeeLavel" htmlFor="">
          Employee ID
        </label>
      </div>
      <div>
        <Select
          value={selectedOption}
          onChange={handleChange}
          options={months}
        />
      </div>
      <div>
        <Select
          value={selectedOption2}
          onChange={handleChange2}
          options={years}
        />
      </div>
      <div className="relative rounded-sm w-max">
        <button className="employeeBtn employeeInput">Search</button>
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
            <th>Pay </th>
            <th> Paid</th>
            <th> Paid</th>
          </tr>
        </thead>
        <tbody>
          <tr className="even-row">
            <td>Rakib</td>
            <td>016556</td>
            <td>765456</td>
            <td>876546</td>

            <td>8765678</td>
            <td>87656</td>
            <td>876567897</td>
            <td>8765</td>
            <td>0999</td>
            <td>999</td>
            <td>666</td>
            <td>8765677</td>
            <td>8765677</td>
          </tr>
          <tr className="odd-row">
          <td>Rakib</td>
          <td>016556</td>
          <td>765456</td>
          <td>876546</td>

          <td>8765678</td>
          <td>87656</td>
          <td>876567897</td>
          <td>8765</td>
          <td>0999</td>
          <td>999</td>
          <td>666</td>
          <td>8765677</td>
          <td>8765677</td>
        </tr>
          <tr className="even-row">
            <td>Rakib</td>
            <td>016556</td>
            <td>765456</td>
            <td>876546</td>

            <td>8765678</td>
            <td>87656</td>
            <td>876567897</td>
            <td>8765</td>
            <td>0999</td>
            <td>999</td>
            <td>666</td>
            <td>8765677</td>
            <td>8765677</td>
          </tr>
          <tr className="odd-row">
          <td>Rakib</td>
          <td>016556</td>
          <td>765456</td>
          <td>876546</td>

          <td>8765678</td>
          <td>87656</td>
          <td>876567897</td>
          <td>8765</td>
          <td>0999</td>
          <td>999</td>
          <td>666</td>
          <td>8765677</td>
          <td>8765677</td>
        </tr>
          <tr className="even-row">
            <td>Rakib</td>
            <td>016556</td>
            <td>765456</td>
            <td>876546</td>

            <td>8765678</td>
            <td>87656</td>
            <td>876567897</td>
            <td>8765</td>
            <td>0999</td>
            <td>999</td>
            <td>666</td>
            <td>8765677</td>
            <td>8765677</td>
          </tr>
          <tr className="odd-row">
          <td>Rakib</td>
          <td>016556</td>
          <td>765456</td>
          <td>876546</td>

          <td>8765678</td>
          <td>87656</td>
          <td>876567897</td>
          <td>8765</td>
          <td>0999</td>
          <td>999</td>
          <td>666</td>
          <td>8765677</td>
          <td>8765677</td>
        </tr>
          <tr className="even-row">
            <td>Rakib</td>
            <td>016556</td>
            <td>765456</td>
            <td>876546</td>

            <td>8765678</td>
            <td>87656</td>
            <td>876567897</td>
            <td>8765</td>
            <td>0999</td>
            <td>999</td>
            <td>666</td>
            <td>8765677</td>
            <td>8765677</td>
          </tr>
          <tr className="odd-row">
          <td>Rakib</td>
          <td>016556</td>
          <td>765456</td>
          <td>876546</td>

          <td>8765678</td>
          <td>87656</td>
          <td>876567897</td>
          <td>8765</td>
          <td>0999</td>
          <td>999</td>
          <td>666</td>
          <td>8765677</td>
          <td>8765677</td>
        </tr>
          <tr className="even-row">
            <td>Rakib</td>
            <td>016556</td>
            <td>765456</td>
            <td>876546</td>

            <td>8765678</td>
            <td>87656</td>
            <td>876567897</td>
            <td>8765</td>
            <td>0999</td>
            <td>999</td>
            <td>666</td>
            <td>8765677</td>
            <td>8765677</td>
          </tr>
          <tr className="odd-row">
          <td>Rakib</td>
          <td>016556</td>
          <td>765456</td>
          <td>876546</td>

          <td>8765678</td>
          <td>87656</td>
          <td>876567897</td>
          <td>8765</td>
          <td>0999</td>
          <td>999</td>
          <td>666</td>
          <td>8765677</td>
          <td>8765677</td>
        </tr>
          <tr className="even-row">
            <td>Rakib</td>
            <td>016556</td>
            <td>765456</td>
            <td>876546</td>

            <td>8765678</td>
            <td>87656</td>
            <td>876567897</td>
            <td>8765</td>
            <td>0999</td>
            <td>999</td>
            <td>666</td>
            <td>8765677</td>
            <td>8765677</td>
          </tr>
          <tr className="odd-row">
          <td>Rakib</td>
          <td>016556</td>
          <td>765456</td>
          <td>876546</td>

          <td>8765678</td>
          <td>87656</td>
          <td>876567897</td>
          <td>8765</td>
          <td>0999</td>
          <td>999</td>
          <td>666</td>
          <td>8765677</td>
          <td>8765677</td>
        </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeSalaryListTable;
