/* eslint-disable react/prop-types */
import { useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import EmployeeAccount from "./EmployeeAccount";
import SingleEmployeeLeaveList from "./SingleEmployeeLeaveList";
import avatar from "../../../../../public/assets/avatar.jpg";
import "../Employee.css";
import EmployeeSalary from "./EmployeeSalary";
import EmployeeOvertime from "./EmployeeOvertime";
import EmployeeHoliday from "./EmployeeHoliday";
import { useLocation } from "react-router-dom";
import { useGetSingleEmployeeQuery } from "../../../../redux/api/employee";
import Loading from "../../../../components/Loading/Loading";
import { toast } from "react-toastify";
import EmployeeAttendance from "./EmployeeAttendance";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const CustomerProfile = () => {
  const [value, setValue] = useState(0);
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const { data, isLoading, error } = useGetSingleEmployeeQuery(id);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const tabStyles = {
    width: 120,
    height: "35px",
    margin: 0.5,
    backgroundColor: "#42A1DA",
    color: "white",
    borderRadius: 10,
    padding: "0px",
    fontSize: "11px",
    lineHeight: "20px",
    minHeight: "unset",
    "&.Mui-selected": {
      backgroundColor: "#F77F00",
      color: "#fff",
    },
  };

  const tabsStyles = {
    "& .MuiTabs-indicator": {
      display: "none",
    },
    "& .MuiTabs-flexContainer": {
      borderBottom: "none",
    },
  };

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    toast.error(error?.status);
  }

  console.log(data?.data);
  const getMonthName = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString("default", { month: "long" });
  };

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const formattedCurrentMonth =
    currentMonth < 10 ? `0${currentMonth}` : currentMonth;
  const monthName = getMonthName(currentMonth);

  const totalOvertime = data?.data?.attendance
    .filter((record) => {
      const [, month, year] = record.date.split("-");
      return (
        month === String(formattedCurrentMonth) && year === String(currentYear)
      );
    })
    .reduce((total, record) => total + record.overtime, 0);
  const totalSalary = data?.data?.salary
    .filter((record) => record.month_of_salary === monthName)
    .reduce((total, record) => total + record.paid, 0);

  return (
    <div className="profileCardsWraps">
      <div className="p-5 bg-[#F7F7F7] ">
        <div className="my-5">
          <h3 className="text-2xl font-semibold">Profile</h3>
          <span>Dashboard / Profile </span>
        </div>

        <div className="flex flex-wrap items-center justify-between w-full mt-10 text-black profileCards ">
          <div className="items-center flex-wrap px-5 bg-[#fff] flex justify-center md:justify-between w-full rounded-sm border py-5">
            <div className="w-full lg:w-[50%]">
              <div className="flex flex-wrap gap-3 p-5 ">
                <img
                  src={avatar}
                  className="object-cover w-24 h-24 mr-3 rounded-full"
                  alt="profile"
                />
                <div>
                  <h3 className="text-2xl">{data?.data?.full_name}</h3>
                  <span>{data?.data?.designation}</span>

                  <div className="space-y- mt-">
                    <div className="flex items-center">
                      <b className="block mr-3 text-sm">Employee ID</b>
                      <span>: {data?.data?.employeeId}</span>
                    </div>
                    <div className="flex items-center">
                      <b className="block mr-3 text-sm">Date of Join</b>
                      <span>: {data?.data?.join_date}</span>
                    </div>
                    <button className="px-3 py-1 mt-3 text-white bg-[#42A1DA] rounded-sm">
                      Send Message{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-auto lg:h-[200px] hidden border border-dashed"></div>
            <div className="w-full lg:w-[30%] max-auto mr-0 lg:mr-10">
              <div className="flex items-center md:flex-nowrap flex-wrap gap-4 justify-between">
                <div className="overTimeCard employeeCard">
                  <div className="flex items-center">
                    <div className="">
                      <h4 className="text-xl font-semibold">Overtime</h4>
                      <p>
                        <b>
                          {monthName} <b>: {totalOvertime} h</b>
                        </b>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="overTimeCard employeeCard">
                  <div className="flex items-center">
                    <div className="">
                      <h4 className="text-xl font-semibold">Total Salary</h4>
                      <span className="block my-2">৳{totalSalary}</span>
                      <p className="">
                        {monthName} Paid :{" "}
                        <b className="text-[#F62D51]">৳{totalSalary}</b>
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
        <Tabs
          sx={tabsStyles}
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab sx={tabStyles} label="Account" />
          <Tab sx={tabStyles} label="Attendance" />
          <Tab sx={tabStyles} label="Leave" />
          <Tab sx={tabStyles} label="Holiday" />
          <Tab sx={tabStyles} label="Shift & Schedule" />
          <Tab sx={tabStyles} label="Salary" />
          <Tab sx={tabStyles} label="Overtime" />
        </Tabs>

        <TabPanel value={value} index={0}>
          <EmployeeAccount accountInfo={data?.data} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <EmployeeAttendance />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <SingleEmployeeLeaveList />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <EmployeeHoliday />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <h3 className="text-3xl font-bold">Employee Holiday</h3>
        </TabPanel>
        <TabPanel value={value} index={5}>
          <EmployeeSalary />
        </TabPanel>
        <TabPanel value={value} index={6}>
          <EmployeeOvertime />
        </TabPanel>

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
