import { FaRegTrashAlt, FaUserEdit, FaUsers } from "react-icons/fa";
import { NotificationAdd } from "@mui/icons-material";
import { FaUserGear } from "react-icons/fa6";
import { useState } from 'react';
import avatar from '../../../../public/assets/avatar.jpg';
import { HiOutlinePlus } from "react-icons/hi";
import EmployeeSalaryModal from "./EmployeeSalaryModal";
import EmployeeUpdateSalaryModal from "./EmployeeUpdateSalaryModal";
import EmployeeOvertimeModal from "./EmployeeOvertimeModal";
import EmployeeUpdateOvertimeModal from "./EmployeeUpdateOvertimeModal";



const years = [{ value: 'Select Year', label: 'Select Year' }];

// Start from 2024 and go up to 2030
for (let year = 2024; year <= 2030; year++) {
  years.push({ value: String(year), label: String(year) });
}



const EmployeeOvertime = () => {  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  
  const employeeData =[
    {
        id:1, 
        name: 'Mr John',
        salary: 25000,
    },
    {
        id:1, 
        name: 'Mr John',
        salary: 25000,
    },
    {
        id:1, 
        name: 'Mr John',
        salary: 25000,
    },
    {
        id:1, 
        name: 'Mr John',
        salary: 25000,
    },
    {
        id:1, 
        name: 'Mr John',
        salary: 25000,
    },
  ]

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
            <h3 className="text-2xl font-bold"> Overtime </h3>{" "}
            <span> Dashboard / Overtime </span>{" "}
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
          <div className="relative rounded-sm w-max">
            <input className="peer employeeInput w-[300px h-[60px]]" type="text" placeholder="" />
            <label className="employeeLavel" htmlFor="">
              Employee Name
            </label>
          </div>
          <div className="relative rounded-sm w-max">
          <input className="peer employeeInput w-[300px h-[60px]]" type="text" placeholder="" />
          <label className="employeeLavel" htmlFor="">
           Hours 
          </label>
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
          <th>Date</th>
          <th>Hours </th>
          <th colSpan={3}>Action</th>
        </tr>
      </thead>
      <tbody>
       {
        employeeData.map((data,i)=>(
            <tr key={data.id} className={ i % 2 == 0 ? 'odd-row' : 'even-row'}>
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
            <td>10-04-2024</td>
            <td>05h</td>
            <td>5</td>
            <td>
            {" "}
            <HiOutlinePlus
              onClick={handleOpen}
              className="text-[#FF851A] cursor-pointer mx-auto"
              size={30}
            />{" "}
          </td>
            <td>
            <FaUserEdit
            onClick={handleOpen2}
              className="text-[#60BF6B] cursor-pointer mx-auto"
              size={30}
            />
          </td>
         
          <td>
            {" "}
            <FaRegTrashAlt
              className="text-[#F62F52] cursor-pointer mx-auto"
              size={30}
            />
          </td>
          </tr>
        ))
       }
      </tbody>
    </table>
    
    {
        open && <EmployeeOvertimeModal onClose={handleClose}/>
    }
    {
      open2 && <EmployeeUpdateOvertimeModal onClose={handleClose2}/>
  }
    </div>
  );
};

export default EmployeeOvertime;
