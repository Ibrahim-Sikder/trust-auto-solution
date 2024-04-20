/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  FaCarSide,
  FaFileInvoice,
  FaFileInvoiceDollar,
  FaPercent,
  FaRegUser,
  FaUsers,
  FaWrench,
} from "react-icons/fa";
import { FaCarOn } from "react-icons/fa6";
import {
  HiOutlineBriefcase,
  HiOutlineCheckCircle,
  HiOutlineUserGroup,
  HiOutlineUsers,
} from "react-icons/hi";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./Home.css";
import ChartComponent from "../../components/Chart/ChartComponent";
import MonthlyBarChart from "../../components/Chart/MonthlyBarChart";
import YearlyIncomeChart from "../../components/Chart/YearlyIncomeChart";
import { CircularProgressbar } from "react-circular-progressbar";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import ExpanseIncomeChart from "../../components/Chart/ExpanseIncomeChart";
import TotalReveniewChart from "../../components/Chart/TotalReveniewChart";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));
const Home = () => {
  const [expanded, setExpanded] = React.useState(false);
  const [salesData, setSalesData] = useState([]);

  const totalSalse = parseInt(
    salesData.reduce((total, { price }) => total + parseInt(price), 0)
  );

  const userData = [
    {
      id: 1,
      name: " Employees ",
      user: 30,
    },
    {
      id: 2,
      name: " Customers ",
      user: 15,
    },
    {
      id: 3,
      name: " Suppliers ",
      user: 10,
    },

    {
      id: 5,
      name: "Projects",
      user: 350,
    },
    {
      id: 6,
      name: "Clients ",
      user: 200,
    },
    {
      id: 6,
      name: " Tasks ",
      user: 500,
    },
  ];

  return (
    <div className="mt-10 pb-20">
      <h3 className="text-3xl font-bold">Welcome Admin !</h3>
      <span>Home / Dashboard</span>

      <div className="dashBoardRight  ">
        <div className="md:flex items-center justify-between md:p-[0px] lg:p-[18px]"></div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 place-content-center gap-10  mb-5">
          <div className="completedServiceCards flex justify-between items-center rounded-lg bg-[#42A1DA] text-white ">
            <div className="mr-5">
              <h3 className="text-xl">Completed Services</h3>
              <span className="text-2xl font-bold">99 </span>
            </div>
            <div className="valueRight">
              <HiOutlineBriefcase size={70} />
            </div>
          </div>
          <div className="completedServiceCards flex justify-between items-center  rounded-lg bg-[#42A1DA] text-white">
            <div className="mr-5">
              <h3 className="text-xl">Running Services</h3>
              <span className="text-2xl font-bold">200 </span>
            </div>
            <div className="valueRight">
              <FaWrench size={70} />
            </div>
          </div>

          <div className="completedServiceCards flex justify-between items-center  rounded-lg bg-[#48cae4] text-white">
            <div className="mr-5">
              <h3 className="text-xl">Total Sale </h3>
              <span className="text-2xl font-bold">99 </span>
            </div>
            <div className="valueRight">
              <FaPercent size={70} />
            </div>
          </div>
          <div className="completedServiceCards flex justify-between items-center  rounded-lg bg-[#03045e] text-white">
            <div className="mr-5">
              <h3 className="text-xl">Total Product </h3>
              <span className="text-2xl font-bold">99 </span>
            </div>
            <div className="valueRight">
              <FaCarSide size={70} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 place-content-center gap-10  mb-5">
          <div className="completedServiceCards flex justify-between items-center rounded-lg bg-[#f77f00] text-white">
            <div className="mr-5">
              <h3 className="text-xl">Paid Services Bill</h3>
              <span className="text-2xl font-bold">856৳</span>
            </div>
            <div className="valueRight">
              <FaFileInvoice size={70} />
            </div>
          </div>

          <div className="completedServiceCards flex justify-between items-center rounded-lg bg-[#ef233c] text-white">
            <div className="mr-5">
              <h3 className="text-xl">Due Service Bill </h3>
              <span className="text-2xl font-bold">8106৳ </span>
            </div>
            <div className="valueRight">
              <FaFileInvoiceDollar size={70} />
            </div>
          </div>
          <div className="completedServiceCards flex justify-between items-center rounded-lg bg-[#0a9396] text-white">
            <div className="mr-5">
              <h3 className="text-xl">Our Customer </h3>
              <span className="text-2xl font-bold">159 </span>
            </div>
            <div className="valueRight">
              <FaUsers size={70} />
            </div>
          </div>
          <div className=" completedServiceCards flex justify-between items-center rounded-lg bg-[#3a0ca3] text-white">
            <div className="mr-5">
              <h3 className="text-xl">About Trust Auto Solution</h3>
              <span className="text-2xl font-bold">99 </span>
            </div>
            <div className="valueRight">
              <FaCarOn size={70} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex mt-[100px]">
        <MonthlyBarChart />
        <YearlyIncomeChart />
      </div>
      <div className="flex items-center justify-between px-10">
        <h3 className="text-3xl font-semibold">Monthly Income Chart</h3>
        <h3 className="text-3xl font-semibold monthlyTitle">
          Yearly Income Chart
        </h3>
      </div>
      <div className="grid grid-cols-2 gap-3  mt-[100px]">
        <div
          className="flex flex-wrap gap-4
        5"
        >
          {userData.map((data, i) => (
            <div key={data.id} className="dashboardCard">
              <div className="dashboardIconWrap">
                {i == 0 ? (
                  <HiOutlineUserGroup className="dashboardIcon" size={50} />
                ) : i == 1 ? (
                  <HiOutlineUsers className="dashboardIcon" size={50} />
                ) : i == 2 ? (
                  <HiOutlineUsers className="dashboardIcon" size={50} />
                ) : i == 3 ? (
                  <HiOutlineBriefcase className="dashboardIcon" size={50} />
                ) : i == 4 ? (
                  <FaCarSide className="dashboardIcon" size={50} />
                ) : i == 5 ? (
                  <FaFileInvoice className="dashboardIcon" size={50} />
                ) : null}
              </div>
              <div className="mt-2">
                <span>{data.user}</span>
                <h2 className="mt-2">{data.name}</h2>
              </div>
            </div>
          ))}
        </div>

       <>
    
       <ExpanseIncomeChart />
       
       </>
      </div>
      <h3 className="text-3xl font-bold flex justify-end mr-72">Salse Overview</h3>
      <div className="profiteCardWrap flex items-center justify-between mt-[100px]">
        <div className="profitCard ">
          <div className="flex items-center justify-between">
            <b>Earnings</b>
            <small className="text-[#55CE63]">+35%</small>
          </div>

          <div className="space-y-2 mt-3">
            <b className="block ">৳465785</b>
            <Stack spacing={2} sx={{ flexGrow: 1, color: " red" }}>
              <BorderLinearProgress variant="determinate" value={50} />
            </Stack>
            <small className="block">
              Previous month <b className="text-[#]">৳ 305785</b>
            </small>
          </div>
        </div>
        <div className="profitCard ">
          <div className="flex items-center justify-between">
            <b>Expense</b>
            <small className="text-[#55CE63]">+35%</small>
          </div>

          <div className="space-y-2 mt-3">
            <b className="block ">৳465785</b>
            <Stack spacing={2} sx={{ flexGrow: 1, color: " red" }}>
              <BorderLinearProgress variant="determinate" value={50} />
            </Stack>
            <small className="block">
              Previous month <b className="text-[#]">৳ 305785</b>
            </small>
          </div>
        </div>
        <div className="profitCard ">
          <div className="flex items-center justify-between">
            <b>Profit</b>
            <small className="text-[#55CE63]">+35%</small>
          </div>

          <div className="space-y-2 mt-3">
            <b className="block ">৳465785</b>
            <Stack spacing={2} sx={{ flexGrow: 1, color: " red" }}>
              <BorderLinearProgress variant="determinate" value={50} />
            </Stack>
            <small className="block">
              Previous month <b className="text-[#]">৳ 305785</b>
            </small>
          </div>
        </div>
        <div className="profitCard ">
          <div className="flex items-center justify-between">
            <b>Earnings</b>
            <small className="text-[#55CE63]">+35%</small>
          </div>

          <div className="space-y-2 mt-3">
            <b className="block ">৳465785</b>
            <Stack spacing={2} sx={{ flexGrow: 1, color: " red" }}>
              <BorderLinearProgress variant="determinate" value={50} />
            </Stack>
            <small className="block">
              Previous month <b className="text-[#]">৳ 305785</b>
            </small>
          </div>
        </div>
      </div>
      <div className="flex  justify-between mt-10">
        <div className="earningCardWrap ">
          <p className="mb-3 font-semibold">Statistic</p>
          <div className="grid grid-cols-2 justify-between gap-5">
            <div className="flex items-center w-40 justify-between earningCard">
              <div>
                <div style={{ width: 60, height: 60 }}>
                  <CircularProgressbar
                    value={90}
                    text={`${90}%`}
                    styles={{
                      // Customize the root element (outer circle)
                      path: {
                        stroke: `#EF233C`, // Set the color of the progress bar
                      },
                      // Customize the text
                      text: {
                        fill: "#3e98c7", // Set the color of the text
                      },
                      // Customize the trail (background)
                      trail: {
                        stroke: "#f4f4f4", // Set the color of the background
                      },
                    }}
                  />
                </div>
                <b className="text-sm">Today Leave</b>
              </div>
              <b> 5 / 45</b>
            </div>
            <div className="flex items-center w-40 justify-between earningCard">
              <div>
                <div style={{ width: 60, height: 60 }}>
                  <CircularProgressbar
                    value={90}
                    text={`${90}%`}
                    styles={{
                      // Customize the root element (outer circle)
                      path: {
                        stroke: `#F77F00`, // Set the color of the progress bar
                      },
                      // Customize the text
                      text: {
                        fill: "#3e98c7", // Set the color of the text
                      },
                      // Customize the trail (background)
                      trail: {
                        stroke: "#f4f4f4", // Set the color of the background
                      },
                    }}
                  />
                </div>
                <b className="text-sm">Pending Invoice </b>
              </div>
              <b> 5 / 45</b>
            </div>
            <div className="flex items-center w-40 justify-between earningCard">
              <div>
                <div style={{ width: 60, height: 60 }}>
                  <CircularProgressbar
                    value={90}
                    text={`${90}%`}
                    styles={{
                      // Customize the root element (outer circle)
                      path: {
                        stroke: `#F77F00`, // Set the color of the progress bar
                      },
                      // Customize the text
                      text: {
                        fill: "#3e98c7", // Set the color of the text
                      },
                      // Customize the trail (background)
                      trail: {
                        stroke: "#f4f4f4", // Set the color of the background
                      },
                    }}
                  />
                </div>
                <b className="text-sm">Pending Quotation </b>
              </div>
              <b> 5 / 45</b>
            </div>
            <div className="flex items-center w-40 justify-between earningCard">
              <div>
                <div style={{ width: 60, height: 60 }}>
                  <CircularProgressbar
                    value={90}
                    text={`${90}%`}
                    styles={{
                      // Customize the root element (outer circle)
                      path: {
                        stroke: `#60BE6B`, // Set the color of the progress bar
                      },
                      // Customize the text
                      text: {
                        fill: "#3e98c7", // Set the color of the text
                      },
                      // Customize the trail (background)
                      trail: {
                        stroke: "#f4f4f4", // Set the color of the background
                      },
                    }}
                  />
                </div>
                <b className="text-sm ">Complete Projects </b>
              </div>
              <b> 5 / 45</b>
            </div>
          </div>
        </div>
        <div className="earningCardWrap mt-5">
          <p className="mb-3 font-semibold ">Task Statistic </p>
          <div className="flex items-center justify-between">
            <div className="task">
              <p>Total Tasks </p>
              <b>350</b>
            </div>
            <div className="task">
              <p>Overdue Tasks </p>
              <b>350</b>
            </div>
          </div>

          <div className="space-y-5 mt-5">
            <div className="flex items-center justify-between ">
              <div className="flex items-center">
                <HiOutlineCheckCircle className="text-[#FFBC34] mr-1" />
                <span className="font-semibold">Complete Task </span>
              </div>
              <b>455</b>
            </div>
            <div className="flex items-center justify-between ">
              <div className="flex items-center">
                <HiOutlineCheckCircle className="text-[#FFBC34] mr-1" />
                <span className="font-semibold">Inprogress Task </span>
              </div>
              <b>25</b>
            </div>
            <div className="flex items-center justify-between ">
              <div className="flex items-center">
                <HiOutlineCheckCircle className="text-[#FFBC34] mr-1" />
                <span className="font-semibold">Pending Task </span>
              </div>
              <b>25</b>
            </div>
            <div className="flex items-center justify-between ">
              <div className="flex items-center">
                <HiOutlineCheckCircle className="text-[#FFBC34] mr-1" />
                <span className="font-semibold">Review Task </span>
              </div>
              <b>25</b>
            </div>
          </div>
        </div>
        <div className="earningCardWrap space-y-2">
          <div className="flex items-center">
            <h3 className="font-semibold mr-3">Today Absent </h3>
            <b className="bg-[#FDE2E7] text-red-500  p-2  rounded-md  ">6</b>
          </div>
          <div className="absentCard">
            <div className="flex items-center">
              <div className="userImgWrap">
                <FaRegUser size={30} />
              </div>
              <span>Md Raihan</span>
            </div>
            <div className="my-3 flex items-center justify-between">
              <div>
                <small className="block">4 Mar 2022</small>
                <small>Leave Date </small>
              </div>
              <b className="bg-[#E2F6ED] text-[#55CE63] text-sm  py-1 px-2  rounded-md  ">
                Approved
              </b>
            </div>
          </div>
          <div className="absentCard">
            <div className="flex items-center">
              <div className="userImgWrap">
                <FaRegUser size={30} />
              </div>
              <span>Md Karim</span>
            </div>
            <div className="my-3 flex items-center justify-between">
              <div>
                <small className="block">4 Mar 2022</small>
                <small>Leave Date </small>
              </div>
              <b className="bg-[#FDE2E7] text-red-500  py-1 px-2  rounded-md text-sm ">
                Pending
              </b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
