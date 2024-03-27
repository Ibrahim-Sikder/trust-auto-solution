import { FaUsers } from "react-icons/fa";
import { NotificationAdd } from "@mui/icons-material";
import { FaUserGear } from "react-icons/fa6";
import "./Project.css";

const years = [{ value: "Select Year", label: "Select Year" }];

// Start from 2024 and go up to 2030
for (let year = 2024; year <= 2030; year++) {
  years.push({ value: String(year), label: String(year) });
}

const CompletedProject = () => {
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
            <h3 className="mb-2 text-2xl font-bold">Complete Project </h3>{" "}
            <span> Dashboard / Complete Project </span>{" "}
          </div>{" "}
        </div>{" "}
        <div className="relative rounded-sm w-max"></div>
      </div>
     
      <div className="justify-between block mt-10 md:flex">
        <div className="employeeProfileCard">
          <h3 className="text-xl font-semibold">Complete Project </h3>
          <div className="flex items-center justify-between mt-5 w-[400px]">
            <div className="space-y-3">
              <b className="block">Customer Name</b>
              <b className="block">Order Number </b>
              <b className="block">Vehicle Number </b>
              <b className="block">Mobile Number</b>
            </div>
            <div className="space-y-3">
              <span className="block"> : Ramim Islam </span>
              <span className="block">: 76543456 </span>
              <span className="block">: 0484848445 </span>
              <span className="block">: 478987645678 </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletedProject;
