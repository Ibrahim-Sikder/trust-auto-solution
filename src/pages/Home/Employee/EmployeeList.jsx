import { FaUsers } from "react-icons/fa";
import { NotificationAdd } from "@mui/icons-material";
import { FaUserGear } from "react-icons/fa6";
import "./Employee.css";
import avatar from "../../../../public/assets/avatar.jpg";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";


const EmployeeList = () => {
  const employeeData = [
    {
      id: 1,
      name: "Rahatul Islam",
      designation: "Software Engineer",
      image: avatar,
    },
    {
      id: 1,
      name: "Rahatul Islam",
      designation: "Staff",
      image: avatar,
    },
    {
      id: 1,
      name: "Rahatul Islam",
      designation: "Staff",
      image: avatar,
    },
    {
      id: 1,
      name: "Rahatul Islam",
      designation: "Staff",
      image: avatar,
    },
    {
      id: 1,
      name: "Rahatul Islam",
      designation: "Staff",
      image: avatar,
    },
    {
      id: 1,
      name: "Rahatul Islam",
      designation: "Staff",
    },
    {
      id: 1,
      name: "Rahatul Islam",
      designation: "Software Engineer",
      image: avatar,
    },
    {
      id: 1,
      name: "Rahatul Islam",
      designation: "Software Engineer",
      image: avatar,
    },
    {
      id: 1,
      name: "Rahatul Islam",
      designation: "Software Engineer",
      image: avatar,
    },
    {
      id: 1,
      name: "Rahatul Islam",
      designation: "Software Engineer",
      image: avatar,
    },
    {
      id: 1,
      name: "Rahatul Islam",
      designation: "Software Engineer",
      image: avatar,
    },
    {
      id: 1,
      name: "Rahatul Islam",
      designation: "Software Engineer",
      image: avatar,
    },
    {
      id: 1,
      name: "Rahatul Islam",
      designation: "Software Engineer",
      image: avatar,
    },
    {
      id: 1,
      name: "Rahatul Islam",
      designation: "Software Engineer",
      image: avatar,
    },
    {
      id: 1,
      name: "Rahatul Islam",
      designation: "Software Engineer",
      image: avatar,
    },
  ];
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
            <h3 className="text-2xl font-bold"> Employee </h3>{" "}
            <span> Manage Customer </span>{" "}
          </div>{" "}
        </div>{" "}
        <div className="productHome">
          <span> Home / </span> <span> Customer / </span>{" "}
          <span> New Customer </span>{" "}
        </div>{" "}
      </div>
      <div className="employeeCardWraps">
        <div className="grid grid-cols-5 gap-5 my-8">
          <div className="relative rounded-sm w-max">
            <input
              className="peer employeeInput"
              type="text"
              placeholder=""
            />
            <label
              className="employeeLavel"
              htmlFor=""
            >
            Employee ID
            </label>
          </div>
          <div className="relative rounded-sm w-max">
            <input
              className="peer employeeInput"
              type="text"
              placeholder=""
            />
            <label
              className="employeeLavel"
              htmlFor=""
            >
            Employee Name
            </label>
          </div>
          <div className="relative rounded-sm w-max">
            <input
              className="peer employeeInput"
              type="text"
              placeholder=""
            />
            <label
              className="employeeLavel"
              htmlFor=""
            >
              Designation 
            </label>
          </div>
          <div className="relative rounded-sm w-max">
      
            <button className="employeeBtn employeeInput">Search</button>
          </div>
          <div className="relative rounded-sm w-max">
      
          <button className="px-3 py-3 text-xl text-white duration-300 rounded-lg px- bg-sky-500 active:scale-95"> + Add Employee </button>
        </div>
        </div>
        <div className="grid grid-cols-5 gap-5">
        {employeeData.map((employee) => (
          <div key={employee.id} className="employeeCard">
            <div>
              <img className="employeeCardImg" src={employee.image} alt="" />
              <h3 className="text-xl font-semibold">{employee.name} </h3>
              <p>{employee.designation}</p> 
              <div className="flex items-center justify-center">
              
          <Link to='/dashboard/employee-profile'>    <span>See More  </span></Link>
              <HiOutlineArrowNarrowRight className="ml-1 "/>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
