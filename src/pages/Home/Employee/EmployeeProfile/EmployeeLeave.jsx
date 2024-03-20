import { FaUsers } from "react-icons/fa";
import { NotificationAdd } from "@mui/icons-material";
import { FaUserGear } from "react-icons/fa6";
import "../Employee.css";
import EmployeeLeaveTable from "./EmployeeLeaveTable";
import LeaveModal from "./LeaveModal";
import { useState } from "react";

const EmployeeLeave = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  
 const leaveData = [
    {
        id:1,
        title: 'Today Present',
        day: '15 / 50'
    },
    {
        id:1,
        title: 'Today Leave',
        day: '5'
    },
    {
        id:1,
        title: 'Unplanned Leaves',
        day: '6'
    },
    {
        id:1,
        title: 'Pending Request' ,
        day: '10'
    },
    {
        id:1,
        title: 'Accept Request' ,
        day: '4'
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
            <h3 className="text-2xl font-bold"> Leave </h3>{" "}
            <span> Dashboard / Leaves </span>{" "}
          </div>{" "}
        </div>{" "}
        <div onClick={handleOpen} className="relative rounded-sm w-max">
      
        <button className="px-3 py-3 text-xl text-white duration-300 rounded-lg px- bg-sky-500 active:scale-95"> + Add Leave </button>
      </div>
      </div>
      <div className="employeeCardWraps">
      <div className="grid grid-cols-5 gap-5 mb-8">
           {
            leaveData.map((leave)=>(
                <div key={leave.id} className="employeeCard">
                <h3 className="text-xl">{leave.title}</h3>
                <span className="text-xl font-bold">{leave.day}</span>
             </div>
            ))
           }
        </div>
       
        {open && <LeaveModal onClose={handleClose} />}
        <EmployeeLeaveTable/>
      </div>
    </div>
  );
};

export default EmployeeLeave;
