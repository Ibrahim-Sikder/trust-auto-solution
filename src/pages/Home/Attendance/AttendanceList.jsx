import { FaUsers } from "react-icons/fa";
import { NotificationAdd } from "@mui/icons-material";
import { FaUserGear } from "react-icons/fa6";
import { useState } from 'react';
import Select from 'react-select';
import AttendanceTable from "../Employee/EmployeeProfile/AttendanceTable";
import { months } from "../../../constant/Vehicle.constant";



const years = [{ value: 'Select Year', label: 'Select Year' }];

// Start from 2024 and go up to 2030
for (let year = 2024; year <= 2030; year++) {
  years.push({ value: String(year), label: String(year) });
}


const initialSelectedOption = months[0]; 
const initialSelectedOption2 = years[0]; 

const AttendanceList = () => {
  const [selectedOption, setSelectedOption] = useState(initialSelectedOption);
  const [selectedOption2, setSelectedOption2] = useState(initialSelectedOption2);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    console.log(`Option selected:`, selectedOption);
  };
  const handleChange2 = (selectedOption2) => {
    setSelectedOption2(selectedOption2);
    
  };
  

  return (
    <div className="w-full mt-5 mb-24">
      <div className="flex justify-end pb-3 border-b-2">
        <div className="flex items-end justify-end">
          <NotificationAdd size={30} className="mr-2" />
          <FaUserGear size={30} />{" "}
        </div>{" "}
      </div>{" "}
      <div className="flex items-center justify-between my-3 mb-8">
        <div className="flex items-center justify-center ">
          <FaUsers size={70} className="invoicIcon" />
          <div className="ml-2">
            <h3 className="text-2xl font-bold"> Attendance </h3>{" "}
            <span> Dashboard / Attendance </span>{" "}
          </div>{" "}
        </div>{" "}
        <div  className="relative rounded-sm w-max">
      
       
      </div>
      </div>
      <div className="employeeCardWraps">
        <div className="grid grid-cols-5 gap-5 my-8">
          <div className="relative rounded-sm w-max">
            <input className="peer employeeInput w-[300px h-[60px]]" type="text" placeholder="" />
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
      </div>
      
     
      <AttendanceTable />
    </div>
  );
};

export default AttendanceList;
