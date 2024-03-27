import { FaRegTrashAlt, FaUserEdit, FaUsers } from "react-icons/fa";
import { NotificationAdd } from "@mui/icons-material";
import { FaUserGear } from "react-icons/fa6";
import { useState } from 'react';
import Select from 'react-select';
import avatar from '../../../../public/assets/avatar.jpg';
import { Link } from "react-router-dom";
import { HiOutlinePlus } from "react-icons/hi";
import SalaryModal from "./SalaryModal";

const months = [
  { value: 'Select Month', label: 'Select Month' },
  { value: 'January', label: 'January' },
  { value: 'February', label: 'February' },
  { value: 'March', label: 'March' },
  { value: 'April', label: 'April' },
  { value: 'May', label: 'May' },
  { value: 'June', label: 'June' },
  { value: 'July', label: 'July' },
  { value: 'August', label: 'August' },
  { value: 'September', label: 'September' },
  { value: 'October', label: 'October' },
  { value: 'November', label: 'November' },
  { value: 'December', label: 'December' }
];

const years = [{ value: 'Select Year', label: 'Select Year' }];

// Start from 2024 and go up to 2030
for (let year = 2024; year <= 2030; year++) {
  years.push({ value: String(year), label: String(year) });
}


const initialSelectedOption = months[0]; 
const initialSelectedOption2 = years[0]; 

const EmployeeSalary = () => {
  const [selectedOption, setSelectedOption] = useState(initialSelectedOption);
  const [selectedOption2, setSelectedOption2] = useState(initialSelectedOption2);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    console.log(`Option selected:`, selectedOption);
  };
  const handleChange2 = (selectedOption2) => {
    setSelectedOption2(selectedOption2);
    
  };
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  

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
            <h3 className="text-2xl font-bold"> Salary </h3>{" "}
            <span> Dashboard / Salary </span>{" "}
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
          <th colSpan={3}>Action</th>
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
          <td>
          <Link to="/dashboard/update-attendance">
         
            <FaUserEdit
              className="text-[#60BF6B] cursor-pointer mx-auto"
              size={30}
            />
          </Link>
        </td>
        <td>
          {" "}
          <HiOutlinePlus
            onClick={handleOpen}
            className="text-[#42A1DA] cursor-pointer mx-auto"
            size={30}
          />{" "}
        </td>
        <td>
          {" "}
          <FaRegTrashAlt
            className="text-[#F62F52] cursor-pointer mx-auto"
            size={30}
          />
        </td>
        </tr>
      </tbody>
    </table>
    
    {
        open && <SalaryModal onClose={handleClose}/>
    }
    </div>
  );
};

export default EmployeeSalary;
