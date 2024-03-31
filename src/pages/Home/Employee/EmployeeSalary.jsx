
const years = [{ value: "Select Year", label: "Select Year" }];
// Start from 2024 and go up to 2030
for (let year = 2024; year <= 2030; year++) {
  years.push({ value: String(year), label: String(year) });
}

import "react-circular-progressbar/dist/styles.css";
import Select from "react-select";

import { useState } from "react";
import { months } from "../../../constant/Vehicle.constant";
import "./Employee.css";
import EmployeeSalaryListTable from "./EmployeeSalaryListTable";
const initialSelectedOption = months[0];

const AddAttendance = () => {
  const [selectedOption, setSelectedOption] = useState(initialSelectedOption);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    console.log(`Option selected:`, selectedOption);
  };

  return (
    <div className="pt-8 pb-20">
      <div className="flex items-center justify-between my-3 mb-8">
        <div className="flex items-center justify-center ">
          <div className="ml-2">
            <h3 className="mb-2 text-2xl font-bold"> Employee Salary </h3>{" "}
            <span> Dashboard / Employee Salary </span>{" "}
          </div>
        </div>
      </div>
      <form className="">
        <table className="attendanceTable salaryTable">
          <thead>
            <tr>
              <th>Employee </th>
              <th>Employee ID </th>
              <th>Month of Salary </th>
              <th>Bonus</th>
              <th colSpan={2}>Overtime </th>
              <th>Amount of Salary </th>
              <th>Previous Due </th>
              <th>Cut Salary </th>
              <th>Total Payment </th>
              <th>Advance </th>
              <th>Pay </th>
              <th>Due </th>
              <th>Paid </th>
            </tr>
          </thead>
          <tbody>
            <tr className="even-row">
              <td>Rakib</td>
              <td>016556</td>
              <td>
                <div>
                  <Select
                    value={selectedOption}
                    onChange={handleChange}
                    options={months}
                  />
                </div>
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder="Bonus"
                />
              </td>
              <td>
                <b>05h</b>
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder=" O Amount"
                />
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder=" A of Salary "
                />
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder="Previous A"
                />
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder=" Cut Salary "
                />
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder=" T Payment "
                />
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder="Advance"
                />
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder="Pay"
                />
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder="Pay"
                />
              </td>
              <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder="Pay"
              />
            </td>
            </tr>
            <tr className="odd-row">
            <td>Rakib</td>
            <td>016556</td>
            <td>
              <div>
                <Select
                  value={selectedOption}
                  onChange={handleChange}
                  options={months}
                />
              </div>
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder="Bonus"
              />
            </td>
            <td>
              <b>05h</b>
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder=" O Amount"
              />
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder=" A of Salary "
              />
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder="Previous A"
              />
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder=" Cut Salary "
              />
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder=" T Payment "
              />
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder="Advance"
              />
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder="Pay"
              />
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder="Pay"
              />
            </td>
            <td>
            <input
              type="number"
              className="border overTimeInput"
              placeholder="Pay"
            />
          </td>
          </tr>
            <tr className="even-row">
              <td>Rakib</td>
              <td>016556</td>
              <td>
                <div>
                  <Select
                    value={selectedOption}
                    onChange={handleChange}
                    options={months}
                  />
                </div>
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder="Bonus"
                />
              </td>
              <td>
                <b>05h</b>
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder=" O Amount"
                />
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder=" A of Salary "
                />
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder="Previous A"
                />
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder=" Cut Salary "
                />
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder=" T Payment "
                />
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder="Advance"
                />
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder="Pay"
                />
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder="Pay"
                />
              </td>
              <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder="Pay"
              />
            </td>
            </tr>
            <tr className="odd-row">
            <td>Rakib</td>
            <td>016556</td>
            <td>
              <div>
                <Select
                  value={selectedOption}
                  onChange={handleChange}
                  options={months}
                />
              </div>
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder="Bonus"
              />
            </td>
            <td>
              <b>05h</b>
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder=" O Amount"
              />
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder=" A of Salary "
              />
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder="Previous A"
              />
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder=" Cut Salary "
              />
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder=" T Payment "
              />
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder="Advance"
              />
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder="Pay"
              />
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder="Pay"
              />
            </td>
            <td>
            <input
              type="number"
              className="border overTimeInput"
              placeholder="Pay"
            />
          </td>
          </tr>
            <tr className="even-row">
              <td>Rakib</td>
              <td>016556</td>
              <td>
                <div>
                  <Select
                    value={selectedOption}
                    onChange={handleChange}
                    options={months}
                  />
                </div>
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder="Bonus"
                />
              </td>
              <td>
                <b>05h</b>
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder=" O Amount"
                />
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder=" A of Salary "
                />
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder="Previous A"
                />
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder=" Cut Salary "
                />
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder=" T Payment "
                />
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder="Advance"
                />
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder="Pay"
                />
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder="Pay"
                />
              </td>
              <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder="Pay"
              />
            </td>
            </tr>
            <tr className="odd-row">
            <td>Rakib</td>
            <td>016556</td>
            <td>
              <div>
                <Select
                  value={selectedOption}
                  onChange={handleChange}
                  options={months}
                />
              </div>
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder="Bonus"
              />
            </td>
            <td>
              <b>05h</b>
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder=" O Amount"
              />
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder=" A of Salary "
              />
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder="Previous A"
              />
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder=" Cut Salary "
              />
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder=" T Payment "
              />
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder="Advance"
              />
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder="Pay"
              />
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder="Pay"
              />
            </td>
            <td>
            <input
              type="number"
              className="border overTimeInput"
              placeholder="Pay"
            />
          </td>
          </tr>
            <tr className="even-row">
              <td>Rakib</td>
              <td>016556</td>
              <td>
                <div>
                  <Select
                    value={selectedOption}
                    onChange={handleChange}
                    options={months}
                  />
                </div>
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder="Bonus"
                />
              </td>
              <td>
                <b>05h</b>
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder=" O Amount"
                />
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder=" A of Salary "
                />
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder="Previous A"
                />
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder=" Cut Salary "
                />
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder=" T Payment "
                />
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder="Advance"
                />
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder="Pay"
                />
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder="Pay"
                />
              </td>
              <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder="Pay"
              />
            </td>
            </tr>
            <tr className="odd-row">
            <td>Rakib</td>
            <td>016556</td>
            <td>
              <div>
                <Select
                  value={selectedOption}
                  onChange={handleChange}
                  options={months}
                />
              </div>
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder="Bonus"
              />
            </td>
            <td>
              <b>05h</b>
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder=" O Amount"
              />
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder=" A of Salary "
              />
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder="Previous A"
              />
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder=" Cut Salary "
              />
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder=" T Payment "
              />
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder="Advance"
              />
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder="Pay"
              />
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder="Pay"
              />
            </td>
            <td>
            <input
              type="number"
              className="border overTimeInput"
              placeholder="Pay"
            />
          </td>
          </tr>
            <tr className="even-row">
              <td>Rakib</td>
              <td>016556</td>
              <td>
                <div>
                  <Select
                    value={selectedOption}
                    onChange={handleChange}
                    options={months}
                  />
                </div>
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder="Bonus"
                />
              </td>
              <td>
                <b>05h</b>
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder=" O Amount"
                />
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder=" A of Salary "
                />
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder="Previous A"
                />
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder=" Cut Salary "
                />
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder=" T Payment "
                />
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder="Advance"
                />
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder="Pay"
                />
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder="Pay"
                />
              </td>
              <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder="Pay"
              />
            </td>
            </tr>
            <tr className="odd-row">
            <td>Rakib</td>
            <td>016556</td>
            <td>
              <div>
                <Select
                  value={selectedOption}
                  onChange={handleChange}
                  options={months}
                />
              </div>
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder="Bonus"
              />
            </td>
            <td>
              <b>05h</b>
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder=" O Amount"
              />
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder=" A of Salary "
              />
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder="Previous A"
              />
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder=" Cut Salary "
              />
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder=" T Payment "
              />
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder="Advance"
              />
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder="Pay"
              />
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder="Pay"
              />
            </td>
            <td>
            <input
              type="number"
              className="border overTimeInput"
              placeholder="Pay"
            />
          </td>
          </tr>
            <tr className="even-row">
              <td>Rakib</td>
              <td>016556</td>
              <td>
                <div>
                  <Select
                    value={selectedOption}
                    onChange={handleChange}
                    options={months}
                  />
                </div>
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder="Bonus"
                />
              </td>
              <td>
                <b>05h</b>
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder=" O Amount"
                />
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder=" A of Salary "
                />
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder="Previous A"
                />
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder=" Cut Salary "
                />
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder=" T Payment "
                />
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder="Advance"
                />
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder="Pay"
                />
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder="Pay"
                />
              </td>
              <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder="Pay"
              />
            </td>
            </tr>
            <tr className="odd-row">
            <td>Rakib</td>
            <td>016556</td>
            <td>
              <div>
                <Select
                  value={selectedOption}
                  onChange={handleChange}
                  options={months}
                />
              </div>
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder="Bonus"
              />
            </td>
            <td>
              <b>05h</b>
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder=" O Amount"
              />
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder=" A of Salary "
              />
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder="Previous A"
              />
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder=" Cut Salary "
              />
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder=" T Payment "
              />
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder="Advance"
              />
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder="Pay"
              />
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder="Pay"
              />
            </td>
            <td>
            <input
              type="number"
              className="border overTimeInput"
              placeholder="Pay"
            />
          </td>
          </tr>
            <tr className="even-row">
              <td>Rakib</td>
              <td>016556</td>
              <td>
                <div>
                  <Select
                    value={selectedOption}
                    onChange={handleChange}
                    options={months}
                  />
                </div>
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder="Bonus"
                />
              </td>
              <td>
                <b>05h</b>
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder=" O Amount"
                />
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder=" A of Salary "
                />
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder="Previous A"
                />
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder=" Cut Salary "
                />
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder=" T Payment "
                />
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder="Advance"
                />
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder="Pay"
                />
              </td>
              <td>
                <input
                  type="number"
                  className="border overTimeInput"
                  placeholder="Pay"
                />
              </td>
              <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder="Pay"
              />
            </td>
            </tr>
            <tr className="odd-row">
            <td>Rakib</td>
            <td>016556</td>
            <td>
              <div>
                <Select
                  value={selectedOption}
                  onChange={handleChange}
                  options={months}
                />
              </div>
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder="Bonus"
              />
            </td>
            <td>
              <b>05h</b>
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder=" O Amount"
              />
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder=" A of Salary "
              />
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder="Previous A"
              />
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder=" Cut Salary "
              />
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder=" T Payment "
              />
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder="Advance"
              />
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder="Pay"
              />
            </td>
            <td>
              <input
                type="number"
                className="border overTimeInput"
                placeholder="Pay"
              />
            </td>
            <td>
            <input
              type="number"
              className="border overTimeInput"
              placeholder="Pay"
            />
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
            Submit Salary
          </button>
        </div>
      </form>
      <EmployeeSalaryListTable/>
    </div>
  );
};

export default AddAttendance;
