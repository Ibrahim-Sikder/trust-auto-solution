import { HiLocationMarker } from "react-icons/hi";
import { HiEnvelope, HiMiniPhone } from "react-icons/hi2";
import { ImUserTie } from "react-icons/im";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import EmployeeAccount from "./EmployeeAccount";
import EmployeeList from "../EmployeeList";
import Attendance from "./Attendance";
import SingleEmployeeLeaveList from "./SingleEmployeeLeaveList";

const CustomerProfile = () => {
  return (
    <div>
      <div className="w-full h-52 p-5 mt-5 bg-[#F7F7F7] text-black flex items-center  relative">
        <div className="flex p-5 border rounded-md item-end ">
          <div>
            <h3 className="text-2xl">Ariful Islam</h3>
            <div className="mt-3 space-y-2">
              <div className="flex items-center">
                <HiMiniPhone size="20" className="mr-2" />
                <span>45996-0789777</span>
              </div>
              <div className="flex items-center">
                <HiEnvelope size="20" className="mr-2" />
                <span>arif@gmail.com </span>
              </div>
              <div className="flex items-center">
                <HiLocationMarker size="20" className="mr-2" />
                <span> Kuril Bishawroad, Dhaka-1212 </span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-[#3A0CA3] border  rounded-md py-5 px-3 absolute top-16 right-5 ">
            <div className="flex ml-5">
              <div className="flex items-center justify-center w-32 h-44">
                <ImUserTie size="130" className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-black mt-14">
        <Tabs className="tabList">
          <TabList>
            <Tab>Account</Tab>
            <Tab>Attendance</Tab>
            <Tab>Leave </Tab>
            <Tab>Holiday</Tab>
            <Tab>Shift & Schedule</Tab>
            <Tab>Overtime</Tab>
          </TabList>

          <TabPanel>
            <EmployeeAccount />
          </TabPanel>

          <TabPanel>
            <Attendance />
          </TabPanel>
          <TabPanel>
            <SingleEmployeeLeaveList />
          </TabPanel>
          <TabPanel>
            <EmployeeList />
          </TabPanel>
          <TabPanel>
            <EmployeeList />
          </TabPanel>
        </Tabs>

        <div>
          <p className="my-5 text-center">
            © Copyright 2024 | Trust Auto Solution | All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
