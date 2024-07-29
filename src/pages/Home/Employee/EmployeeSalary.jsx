/* eslint-disable no-unused-vars */
const years = [{ value: "Select Year", label: "Select Year" }];
// Start from 2024 and go up to 2030
for (let year = 2024; year <= 2030; year++) {
  years.push({ value: String(year), label: String(year) });
}

import "react-circular-progressbar/dist/styles.css";
import Select from "react-select";

import { useEffect, useState } from "react";
import { months } from "../../../constant/Vehicle.constant";
import "./Employee.css";
import EmployeeSalaryListTable from "./EmployeeSalaryListTable";
import axios from "axios";
import { toast } from "react-toastify";
import { useGetAllEmployeesQuery } from "../../../redux/api/employee";
import {
  useCreateSalaryMutation,
  useGetAllSalaryQuery,
} from "../../../redux/api/salary";
import { ErrorMessage } from "../../../components/error-message";
import Loading from "../../../components/Loading/Loading";
const initialSelectedOption = months[0];

const AddAttendance = () => {
  // const [getAllEmployee, setGetAllEmployee] = useState([]);

  const [selectedOption, setSelectedOption] = useState(initialSelectedOption);

  const handleChange = (value) => {
    setSelectedOption(value);
  };

  const [filterType, setFilterType] = useState(initialSelectedOption);
  const [currentPage, setCurrentPage] = useState(1);

  const limit = 10;

  const { data: getAllEmployee, isLoading: employeesLoading } =
    useGetAllEmployeesQuery({
      limit,
      page: currentPage,
    });
  const {
    data: getAllSalary,
    isLoading: salaryLoading,
    error: salaryError,
    refetch
  } = useGetAllSalaryQuery({
    searchTerm: filterType.value,
  });

  const [createSalary, { isLoading: createLoading, error: createError }] =
    useCreateSalaryMutation();

  const [salaryMonth, setSalaryMonth] = useState(
    new Array(getAllEmployee?.data?.employees?.length).fill(
      initialSelectedOption
    )
  );
  const [bonus, setBonus] = useState(
    new Array(getAllEmployee?.data?.employees?.length).fill(null)
  );
  const [overtimeAmount, setOvertimeAmount] = useState(
    new Array(getAllEmployee?.data?.employees?.length).fill(null)
  );
  const [salaryAmount, setSalaryAmount] = useState(
    new Array(getAllEmployee?.data?.employees?.length).fill(null)
  );
  const [previousDue, setPreviousDue] = useState(
    new Array(getAllEmployee?.data?.employees?.length).fill(null)
  );
  const [salaryCut, setSalaryCut] = useState(
    new Array(getAllEmployee?.data?.employees?.length).fill(null)
  );
  const [totalPayment, setTotalPayment] = useState(
    new Array(getAllEmployee?.data?.employees?.length).fill(null)
  );
  const [advance, setAdvance] = useState(
    new Array(getAllEmployee?.data?.employees?.length).fill(null)
  );
  const [pay, setPay] = useState(
    new Array(getAllEmployee?.data?.employees?.length).fill(null)
  );
  const [due, setDue] = useState(
    new Array(getAllEmployee?.data?.employees?.length).fill(null)
  );
  const [paid, setPaid] = useState(
    new Array(getAllEmployee?.data?.employees?.length).fill(null)
  );

  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });

  // Output: The name of the current month (e.g., "April" if current month is April)

  // useEffect(() => {
  //   axios
  //     .get(`${import.meta.env.VITE_API_URL}/api/v1/employee`)
  //     .then((response) => {
  //       setGetAllEmployee(response.data.employee);
  //       const allEmployee = response.data.employee.map(
  //         (data) => data.salary_details
  //       );
  //       const showData = allEmployee.flat();
  //       const filteredSalary = showData.filter(
  //         (salary) => salary.month_of_salary === currentMonth
  //       );

  //       setGetAllEmployeeSalary(filteredSalary);
  //     })
  //     .catch((error) => {
  //       setError(error.message);
  //     });
  // }, [currentMonth]);

  const handleBonus = (index, value) => {
    const newBonus = [...bonus];
    newBonus[index] = parseInt(value);
    setBonus(newBonus);
  };
  const handleOvertimeAmount = (index, value) => {
    const newOvertimeAmount = [...overtimeAmount];
    newOvertimeAmount[index] = parseInt(value);
    setOvertimeAmount(newOvertimeAmount);
  };
  const handleSalaryAmount = (index, value) => {
    const newSalaryAmount = [...salaryAmount];
    newSalaryAmount[index] = parseInt(value);
    setSalaryAmount(newSalaryAmount);
  };
  const handlePreviousDue = (index, value) => {
    const newPreviousDue = [...previousDue];
    newPreviousDue[index] = parseInt(value);
    setPreviousDue(newPreviousDue);
  };
  const handleSalaryCut = (index, value) => {
    const newSalaryCut = [...salaryCut];
    newSalaryCut[index] = parseInt(value);
    setSalaryCut(newSalaryCut);
  };
  const handleTotalPayment = (index, value) => {
    const newTotalPayment = [...totalPayment];
    newTotalPayment[index] = parseInt(value);
    setTotalPayment(newTotalPayment);
  };
  const handleAdvance = (index, value) => {
    const newAdvance = [...advance];
    newAdvance[index] = parseInt(value);
    setAdvance(newAdvance);
  };
  const handlePay = (index, value) => {
    const newPay = [...pay];
    newPay[index] = parseInt(value);
    setPay(newPay);
  };
  const handleDue = (index, value) => {
    const newDue = [...due];
    newDue[index] = parseInt(value);
    setDue(newDue);
  };
  const handlePaid = (index, value) => {
    const newPaid = [...paid];
    newPaid[index] = parseInt(value);
    setPaid(newPaid);
  };

  const handleSubMitSalary = async () => {
    const newSalaryData = getAllEmployee?.data?.employees?.map(
      (employee, index) => {
        return {
          employee: employee._id,
          full_name: employee.full_name,
          employeeId: employee.employeeId,
          month_of_salary: selectedOption.value,
          bonus: bonus[index],
          overtime_amount: overtimeAmount[index],
          salary_amount: salaryAmount[index],
          previous_due: previousDue[index],
          cut_salary: salaryCut[index],
          total_payment: totalPayment[index],
          advance: advance[index],
          pay: pay[index],
          due: due[index],
          paid: paid[index],
        };
      }
    );

    try {
      const response = await createSalary(newSalaryData).unwrap();
      if (response.success) {
        toast.success(response.message);
        refetch()
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (salaryLoading || employeesLoading) {
    return <Loading />;
  }

  // if (salaryError) {
  //   toast.error(salaryError?.data?.message);
  // }

  return (
    <div className="pt-8 pb-20">
      <div className="flex items-center justify-between my-3 mb-8">
        <div className="flex items-center justify-center ">
          <div className="ml-2">
            <h3 className="mb-2 text-2xl font-bold"> Employee Salary </h3>
            <span> Dashboard / Employee Salary </span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="attendanceTable salaryTable min-w-full">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Employee ID</th>
              <th>Month of Salary</th>
              <th>Bonus</th>
              <th>Overtime Hour</th>
              <th>Overtime Amount</th>
              <th>Amount of Salary</th>
              <th>Previous Due</th>
              <th>Cut Salary</th>
              <th>Total Payment</th>
              <th>Advance</th>
              <th>Pay</th>
              <th>Due</th>
              <th>Paid</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(getAllEmployee?.data?.employees) &&
              getAllEmployee?.data?.employees?.map((employee, index) => {
                const userOvertime = {};
                employee.attendance.forEach((attendanceRecord) => {
                  if (
                    attendanceRecord.overtime &&
                    typeof attendanceRecord.overtime === "number"
                  ) {
                    if (!userOvertime[employee._id]) {
                      userOvertime[employee._id] = 0;
                    }
                    userOvertime[employee._id] += attendanceRecord.overtime;
                  }
                });

                return (
                  <tr
                    className={index % 2 === 0 ? "odd-row" : "odd-row"}
                    key={employee._id}
                  >
                    <td>{employee.full_name}</td>
                    <td>{employee.employeeId}</td>
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
                        onChange={(e) => handleBonus(index, e.target.value)}
                      />
                    </td>
                    <td>
                      <b>
                        {userOvertime[employee._id]
                          ? userOvertime[employee._id]
                          : 0}{" "}
                        h
                      </b>
                    </td>
                    <td>
                      <input
                        type="number"
                        className="border overTimeInput"
                        placeholder="O Amount"
                        onChange={(e) =>
                          handleOvertimeAmount(index, e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="border overTimeInput"
                        placeholder=" A of Salary "
                        onChange={(e) =>
                          handleSalaryAmount(index, e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="border overTimeInput"
                        placeholder="Previous A"
                        onChange={(e) =>
                          handlePreviousDue(index, e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="border overTimeInput"
                        placeholder="Cut Salary "
                        onChange={(e) => handleSalaryCut(index, e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="border overTimeInput"
                        placeholder="T Payment "
                        onChange={(e) =>
                          handleTotalPayment(index, e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="border overTimeInput"
                        placeholder="Advance"
                        onChange={(e) => handleAdvance(index, e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="border overTimeInput"
                        placeholder="Pay"
                        onChange={(e) => handlePay(index, e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="border overTimeInput"
                        placeholder="Pay"
                        onChange={(e) => handleDue(index, e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="border overTimeInput"
                        placeholder="Pay"
                        onChange={(e) => handlePaid(index, e.target.value)}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="my-2">
          {createError && (
            <ErrorMessage messages={createError?.data?.errorSources} />
          )}
        </div>
        <div className="flex justify-end mt-3">
          <button
            disabled={createLoading}
            className="bg-[#42A1DA] text-white px-3 py-2 rounded-sm"
            type="submit"
            onClick={handleSubMitSalary}
          >
            Submit Salary
          </button>
        </div>
      </div>
      <EmployeeSalaryListTable
        filterType={filterType}
        setFilterType={setFilterType}
        getAllSalary={getAllSalary}
      />
    </div>
  );
};

export default AddAttendance;
