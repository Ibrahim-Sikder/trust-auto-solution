import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import EmployeeAccount from "./EmployeeAccount";
import Attendance from "./Attendance";
import SingleEmployeeLeaveList from "./SingleEmployeeLeaveList";
import avatar from "../../../../../public/assets/avatar.jpg";
import "../Employee.css";
import EmployeeSalary from "./EmployeeSalary";
import EmployeeOvertime from "./EmployeeOvertime";
import EmployeeHoliday from "./EmployeeHoliday";
const CustomerProfile = () => {
  return (
    <div>
      <div className="p-5 bg-[#F7F7F7] ">
        <div className="my-5">
          <h3 className="text-2xl font-semibold ">Profile</h3>
          <span>Dashboard / Profile </span>
        </div>
        <div className="flex items-center justify-between w-full mt-10 text-black h-52 ">
          <div className="items-center bg-[#fff] flex justify-between w-full rounded-sm  border py-5">
            <div className="w-[50%]">
              <div className="flex p-5 ">
                <img
                  src={avatar}
                  className="object-cover w-24 h-24 mr-3 rounded-full"
                  alt="profile"
                />
                <div>
                  <h3 className="text-2xl">Ariful Islam</h3>
                  <span>Staff </span>

                  <div className="space-y- mt-">
                    <div className="flex items-center">
                      <b className="block mr-3 text-sm">Employee ID</b>
                      <span>: 45996-0789777</span>
                    </div>
                    <div className="flex items-center">
                      <b className="block mr-3 text-sm">Date of Join</b>

                      <span>: 1st Jan 2024 </span>
                    </div>
                    <button className="px-3 py-1 mt-3 text-white bg-[#42A1DA] rounded-sm">
                      Send Message{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[200px] border border-dashed  "></div>
            <div className="w-[30%] max-auto mr-10 ">
              <div className="flex items-center justify-between ">
                <div className="overTimeCard employeeCard ">
                  <div className="flex items-center">
                    <div className="">
                      <h4 className="text-xl font-semibold ">Overtime </h4>

                      <p>
                        <b>
                          March <b>: 5h 30m</b>
                        </b>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="overTimeCard employeeCard">
                  <div className="flex items-center">
                    <div className="">
                      <h4 className="text-xl font-semibold ">Total Salary </h4>
                      <span className="block my-2 ">৳20000</span>
                      <p className="">
                        March Paid : <b className="text-[#F62D51]">৳20000</b>
                      </p>
                    </div>
                  </div>
                </div>
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
            <Tab>Salary</Tab>
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
            <EmployeeHoliday />
          </TabPanel>
          <TabPanel>
            <h3 className="text-3xl font-bold">Employee Holiday</h3>
          </TabPanel>
          <TabPanel>
            <EmployeeSalary />
          </TabPanel>
          <TabPanel>
            <EmployeeOvertime />
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
