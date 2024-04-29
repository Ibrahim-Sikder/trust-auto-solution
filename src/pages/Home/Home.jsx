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
  HiDotsVertical,
  HiOutlineArrowNarrowRight,
  HiOutlineBriefcase,
  HiOutlineCheckCircle,
  HiOutlineEye,
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
import client from "../../../public/assets/avatar.jpg";
import { Link } from "react-router-dom";


const BorderLinearProgress = styled(LinearProgress)(({ theme, color }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: color || (theme.palette.mode === "light" ? "#1a90ff" : "#308fe8"), // Default to existing color if no color prop
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
      id: 2,
      name: " Customers ",
      user: 15,
    },
    {
      id: 1,
      name: "Show Room ",
      user: 30,
    },

    {
      id: 3,
      name: "Company",
      user: 10,
    },

    {
      id: 5,
      name: "Job Card",
      user: 350,
    },
    {
      id: 6,
      name: " Quotation ",
      user: 500,
    },
    {
      id: 6,
      name: "Invoice ",
      user: 200,
    },
  ];

  return (
    <div className="mt-10 pb-20">
      <h3 className="text-3xl font-bold">Welcome Admin !</h3>
      <span>Home / Dashboard</span>

      <div className="dashBoardRight mt-5 lg:mt-0 ">
        <div className="md:flex items-center justify-between md:p-[0px] lg:p-[18px]"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-content-center gap-10  mb-5">
          <div className="completedServiceCards flex justify-between items-center rounded-lg bg-[#42A1DA] text-white ">
            <div className="mr-5">
              <h3 className="xl:text-xl">Completed Services</h3>
              <span className="text-2xl font-bold">99 </span>
            </div>
            <div className="valueRight">
              <HiOutlineBriefcase className="dashboardCardIcon" />
            </div>
          </div>
          <div className="completedServiceCards flex justify-between items-center  rounded-lg bg-[#42A1DA] text-white">
            <div className="mr-5">
              <h3 className="text-xl">Running Services</h3>
              <span className="xl:text-2xl font-bold">200 </span>
            </div>
            <div className="valueRight">
              <FaWrench className="dashboardCardIcon" />
            </div>
          </div>

          <div className="completedServiceCards flex justify-between items-center  rounded-lg bg-[#48cae4] text-white">
            <div className="mr-5">
              <h3 className="xl:text-xl">Total Sale </h3>
              <span className="text-xl xl:text-2xl font-bold">99 </span>
            </div>
            <div className="valueRight">
              <FaPercent className="dashboardCardIcon" />
            </div>
          </div>
          <div className="completedServiceCards flex justify-between items-center  rounded-lg bg-[#03045e] text-white">
            <div className="mr-5">
              <h3 className="xl:text-xl">Total Product </h3>
              <span className="text-xl xl:text-2xl font-bold">99 </span>
            </div>
            <div className="valueRight">
              <FaCarSide className="dashboardCardIcon" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-content-center gap-10  mb-5">
          <div className="completedServiceCards flex justify-between items-center rounded-lg bg-[#f77f00] text-white">
            <div className="mr-5">
              <h3 className="xl:text-xl">Paid Services Bill</h3>
              <span className="text-xl xl:text-2xl font-bold">856৳</span>
            </div>
            <div className="valueRight">
              <FaFileInvoice className="dashboardCardIcon" />
            </div>
          </div>

          <div className="completedServiceCards flex justify-between items-center rounded-lg bg-[#ef233c] text-white">
            <div className="mr-5">
              <h3 className="xl:text-xl">Due Service Bill </h3>
              <span className="text-xl xl:text-2xl font-bold">8106৳ </span>
            </div>
            <div className="valueRight">
              <FaFileInvoiceDollar className="dashboardCardIcon" />
            </div>
          </div>
          <div className="completedServiceCards flex justify-between items-center rounded-lg bg-[#0a9396] text-white">
            <div className="mr-5">
              <h3 className="xl:text-xl">Our Customer </h3>
              <span className="text-xl xl:text-2xl font-bold">159 </span>
            </div>
            <div className="valueRight">
              <FaUsers className="dashboardCardIcon" />
            </div>
          </div>
          <div className=" completedServiceCards flex justify-between items-center rounded-lg bg-[#3a0ca3] text-white">
            <div className="mr-5">
              <h3 className=" xl:text-xl">About Trust Auto Solution</h3>
            </div>
            <div className="valueRight">
              <FaCarOn className="dashboardCardIcon" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex xl:flex-nowrap flex-wrap sectionMargin  ">
        <MonthlyBarChart />
        <YearlyIncomeChart />
      </div>
      <div className="hidden  lg:flex items-center justify-between px-10 mt-10">
        <h3 className="text-xl md:text-3xl font-semibold">
          Monthly Income Chart
        </h3>
        <h3 className="text-xl md:text-3xl font-semibold monthlyTitle">
          Yearly Income Chart
        </h3>
      </div>
      <div className="profiteCardWrap lg:flex-nowrap flex-wrap flex items-center justify-between sectionMargin">
        <div className="profitCard ">
          <div className="flex items-center justify-between">
            <b>Earnings</b>
            <small className="text-[#55CE63]">+35%</small>
          </div>

          <div className="space-y-2 mt-3">
            <b className="block ">৳46785</b>
            <Stack spacing={2} sx={{ flexGrow: 1, color: " red" }}>
              <BorderLinearProgress variant="determinate" value={50} />
            </Stack>
            <small className="block">
              Previous month <b className="text-[#]">৳ 5785</b>
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
            <b>Donations</b>
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

      <div className="grid grid-cols-1  xl:grid-cols-2 gap-5  sectionMargin place-content-center justify-content-center ">
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-4
        5"
        >
          {userData.map((data, i) => (
            <div key={data.id}>
              <Link
                to={
                  i == 0
                    ? `${`/dashboard/add-customer`}`
                    : i == 1
                    ? `${`/dashboard/add-show-room`}`
                    : i == 2
                    ? `${`/dashboard/add-company`}`
                    : i == 3
                    ? `${`/dashboard/addjob`}`
                    : i == 4
                    ? `${`/dashboard/invoice`}`
                    : i == 5
                    ? `${`/dashboard/qutation`}`
                    : i == 2
                    ? `${`/dashboard/add-company`}`
                    : null
                }
              >
                <div className="dashboardCard">
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
              </Link>
            </div>
          ))}
        </div>

        <>
          <ExpanseIncomeChart />
        </>
      </div>
      <h3 className="text-3xl font-bold flex justify-end mr-20 lg:mr-72">
        Project Overview
      </h3>

      <div className="recentCardWrap gap-5  xl:flex justify-between sectionMargin">
        <div className="recentCard overflow-x-auto">
          <div className="flex items-center justify-between">
            <h3 className="m-3 text-xl block font-semibold">Client</h3>
            <Link to="/dashboard/customer-list">
              <button className=" flex items-center mr-2  rounded-full px-3 py-1 bg-[#DDDDDD]  ">
                <small className="">See More</small>
                <HiOutlineArrowNarrowRight size={15} className="ml-1" />
              </button>
            </Link>
          </div>
          <hr />
          <table className="min-w-full">
            <thead>
              <th>Order Id </th>
              <th>Customer Name</th>
              <th>Date</th>
              <th>Total</th>
              <th>Profit</th>
              <th>Status</th>
              <th>Action</th>
            </thead>
            <tbody>
              <tr>
                <td>#TAS-1217</td>
                <td>
                  <div className="flex items-center">
                    <img
                      src={client}
                      className="rounded-full w-16"
                      alt="client"
                    />
                    <div className="ml-2 text-justify">
                      <h2 className="block">Mr John</h2>
                      <small>CEO</small>
                    </div>
                  </div>
                </td>
                <td>12-04-24</td>
                <td>৳765445</td>
                <td>৳7654</td>
                <td>
                  <button className="px-3 py-1 border rounded-full ">
                    Active
                  </button>
                </td>
                <td>
                  <div>
                    <HiOutlineEye size={20} />
                  </div>
                </td>
              </tr>
              <tr>
                <td>#TAS-1217</td>
                <td>
                  <div className="flex items-center">
                    <img
                      src={client}
                      className="rounded-full w-16"
                      alt="client"
                    />
                    <div className="ml-2 text-justify">
                      <h2 className="block">Mr John</h2>
                      <small>CEO</small>
                    </div>
                  </div>
                </td>
                <td>12-04-24</td>
                <td>৳765445</td>
                <td>৳7654</td>
                <td>
                  <button className="px-3 py-1 border rounded-full ">
                    Active
                  </button>
                </td>
                <td>
                  <div>
                    <HiOutlineEye size={20} />
                  </div>
                </td>
              </tr>
              <tr>
                <td>#TAS-1217</td>
                <td>
                  <div className="flex items-center">
                    <img
                      src={client}
                      className="rounded-full w-16"
                      alt="client"
                    />
                    <div className="ml-2 text-justify">
                      <h2 className="block">Mr John</h2>
                      <small>CEO</small>
                    </div>
                  </div>
                </td>
                <td>12-04-24</td>
                <td>৳765445</td>
                <td>৳7654</td>
                <td>
                  <button className="px-3 py-1 border rounded-full ">
                    Active
                  </button>
                </td>
                <td>
                  <div>
                    <HiOutlineEye size={20} />
                  </div>
                </td>
              </tr>
              <tr>
                <td>#TAS-1217</td>
                <td>
                  <div className="flex items-center">
                    <img
                      src={client}
                      className="rounded-full w-16"
                      alt="client"
                    />
                    <div className="ml-2 text-justify">
                      <h2 className="block">Mr John</h2>
                      <small>CEO</small>
                    </div>
                  </div>
                </td>
                <td>12-04-24</td>
                <td>৳765445</td>
                <td>৳7654</td>
                <td>
                  <button className="px-3 py-1 border rounded-full ">
                    Active
                  </button>
                </td>
                <td>
                  <div>
                    <HiOutlineEye size={20} />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="recentCard overflow-x-auto ">
          <div className="flex items-center justify-between">
            <h3 className="m-3 text-xl block font-semibold">Recent Projects</h3>
            <Link to="/dashboard/quotaiton-list">
              <button className=" flex items-center mr-2  rounded-full px-3 py-1 bg-[#DDDDDD] ">
                <small className="">See More</small>
                <HiOutlineArrowNarrowRight size={15} className="ml-1" />
              </button>
            </Link>
          </div>

          <hr />
          <table className="min-w-full">
            <thead>
              <th>Project Id</th>
              <th>Project Name </th>
              <th>Date</th>
              <th>Progress</th>
              <th>Action</th>
            </thead>
            <tbody>
              <tr>
                <td>#TAS-666</td>
                <td>
                  <div>
                    <h4>Global Technologies </h4>
                    <div className="flex items-center">
                      <small className="block mr-3 text-[#8E8E8E]">
                        2 Open task ,{" "}
                      </small>
                      <small className="text-[#60BE6B]">
                        10 task completed
                      </small>
                    </div>
                  </div>
                </td>
                <td>10-04-24</td>
                <td>
                  <Stack spacing={1} sx={{ flexGrow: 1 }}>
                    <BorderLinearProgress
                      stroke="#60BE6B"
                      variant="determinate"
                      value={70}
                    />
                  </Stack>
                </td>

                <td>
                  <div className="flex  items-center justify-center mr-8">
                    <HiOutlineEye size={20} />
                  </div>
                </td>
              </tr>
              <tr>
                <td>#TAS-666</td>
                <td>
                  <div>
                    <h4>Global Technologies </h4>
                    <div className="flex items-center">
                      <small className="block mr-3 text-[#8E8E8E]">
                        2 Open task ,{" "}
                      </small>
                      <small className="text-[#60BE6B]">
                        10 task completed
                      </small>
                    </div>
                  </div>
                </td>
                <td>10-04-24</td>
                <td>
                  <Stack spacing={1} sx={{ flexGrow: 1 }}>
                    <BorderLinearProgress
                      stroke="#60BE6B"
                      variant="determinate"
                      value={70}
                    />
                  </Stack>
                </td>

                <td>
                  <div className="flex  items-center justify-center mr-8">
                    <HiOutlineEye size={20} />
                  </div>
                </td>
              </tr>
              <tr>
                <td>#TAS-666</td>
                <td>
                  <div>
                    <h4>Global Technologies </h4>
                    <div className="flex items-center">
                      <small className="block mr-3 text-[#8E8E8E]">
                        2 Open task ,{" "}
                      </small>
                      <small className="text-[#60BE6B]">
                        10 task completed
                      </small>
                    </div>
                  </div>
                </td>
                <td>10-04-24</td>
                <td>
                  <Stack spacing={1} sx={{ flexGrow: 1 }}>
                    <BorderLinearProgress
                      stroke="#60BE6B"
                      variant="determinate"
                      value={70}
                    />
                  </Stack>
                </td>

                <td>
                  <div className="flex  items-center justify-center mr-8">
                    <HiOutlineEye size={20} />
                  </div>
                </td>
              </tr>
              <tr>
                <td>#TAS-666</td>
                <td>
                  <div>
                    <h4>Global Technologies </h4>
                    <div className="flex items-center">
                      <small className="block mr-3 text-[#8E8E8E]">
                        2 Open task ,{" "}
                      </small>
                      <small className="text-[#60BE6B]">
                        10 task completed
                      </small>
                    </div>
                  </div>
                </td>
                <td>10-04-24</td>
                <td>
                  <Stack spacing={1} sx={{ flexGrow: 1 }}>
                    <BorderLinearProgress
                      stroke="#60BE6B"
                      variant="determinate"
                      value={70}
                    />
                  </Stack>
                </td>

                <td>
                  <div className="flex  items-center justify-center mr-8">
                    <HiOutlineEye size={20} />
                  </div>
                </td>
              </tr>
              <tr>
                <td>#TAS-666</td>
                <td>
                  <div>
                    <h4>Global Technologies </h4>
                    <div className="flex items-center">
                      <small className="block mr-3 text-[#8E8E8E]">
                        2 Open task ,{" "}
                      </small>
                      <small className="text-[#60BE6B]">
                        10 task completed
                      </small>
                    </div>
                  </div>
                </td>
                <td>10-04-24</td>
                <td>
                  <Stack spacing={1} sx={{ flexGrow: 1 }}>
                    <BorderLinearProgress
                      stroke="#60BE6B"
                      variant="determinate"
                      value={70}
                    />
                  </Stack>
                </td>

                <td>
                  <div className="flex  items-center justify-center mr-8">
                    <HiOutlineEye size={20} />
                  </div>
                </td>
              </tr>
              <tr>
                <td>#TAS-666</td>
                <td>
                  <div>
                    <h4>Global Technologies </h4>
                    <div className="flex items-center">
                      <small className="block mr-3 text-[#8E8E8E]">
                        2 Open task ,{" "}
                      </small>
                      <small className="text-[#60BE6B]">
                        10 task completed
                      </small>
                    </div>
                  </div>
                </td>
                <td>10-04-24</td>
                <td>
                  <Stack spacing={1} sx={{ flexGrow: 1 }}>
                    <BorderLinearProgress
                      stroke="#60BE6B"
                      variant="determinate"
                      value={70}
                    />
                  </Stack>
                </td>

                <td>
                  <div className="flex  items-center justify-center mr-8">
                    <HiOutlineEye size={20} />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="xl:flex items-center justify-between mt-[30px]">
        <div className="recentCard overflow-x-auto ">
          <div className="flex items-center justify-between">
            <h3 className="m-3 text-xl block font-semibold">
              Recent Quotation{" "}
            </h3>
            <Link to="/dashboard/quotaiton-list">
              <button className=" flex items-center mr-2  rounded-full px-3 py-1 bg-[#DDDDDD]">
                <small className="">See More</small>
                <HiOutlineArrowNarrowRight size={15} className="ml-1" />
              </button>
            </Link>
          </div>

          <hr />
          <table className="min-w-full">
            <thead>
              <th>Quotation ID</th>
              <th>Client</th>
              <th> Date</th>
              <th>Total</th>
              <th>Status</th>
            </thead>
            <tbody>
              <tr>
                <td>#INV-0001</td>
                <td>Global Technologies</td>
                <td>11 Mar 2019</td>
                <td>$380</td>
                <td>
                  <button className="px-3 py-1 border rounded-full bg-[#FDE2E7] text-red-500">
                    Unpaid
                  </button>
                </td>
              </tr>
              <tr>
                <td>#INV-0001</td>
                <td>Global Technologies</td>
                <td>11 Mar 2019</td>
                <td>$380</td>
                <td>
                  <button className="px-3 py-1 border rounded-full bg-[#FDE2E7] text-red-500">
                    Unpaid
                  </button>
                </td>
              </tr>
              <tr>
                <td>#INV-0001</td>
                <td>Global Technologies</td>
                <td>11 Mar 2019</td>
                <td>$380</td>
                <td>
                  <button className="px-3 py-1 border rounded-full bg-[#FDE2E7] text-red-500">
                    Unpaid
                  </button>
                </td>
              </tr>
              <tr>
                <td>#INV-0001</td>
                <td>Global Technologies</td>
                <td>11 Mar 2019</td>
                <td>$380</td>
                <td>
                  <button className="px-3 py-1 border rounded-full bg-[#FDE2E7] text-red-500">
                    Unpaid
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="recentCard overflow-x-auto ">
          <div className="flex items-center justify-between">
            <h3 className="m-3 text-xl block font-semibold">Recent Invoice </h3>
            <Link to="/dashboard/invoice-view">
              <button className=" flex items-center mr-2  rounded-full px-3 py-1 bg-[#DDDDDD]">
                <small className="">See More</small>
                <HiOutlineArrowNarrowRight size={15} className="ml-1" />
              </button>
            </Link>
          </div>

          <hr />
          <table className="min-w-full">
            <thead>
              <th>Invoice ID</th>
              <th>Client</th>
              <th>Due Date</th>
              <th>Total</th>
              <th>Status</th>
            </thead>
            <tbody>
              <tr>
                <td>#INV-0001</td>
                <td>Global Technologies</td>
                <td>11 Mar 2019</td>
                <td>$380</td>
                <td>
                  <button className="px-3 py-1 border rounded-full bg-[#E2F6ED] text-[#60BE6B]">
                    Paid
                  </button>
                </td>
              </tr>
              <tr>
                <td>#INV-0001</td>
                <td>Global Technologies</td>
                <td>11 Mar 2019</td>
                <td>$380</td>
                <td>
                  <button className="px-3 py-1 border rounded-full bg-[#E2F6ED] text-[#60BE6B]">
                    Paid
                  </button>
                </td>
              </tr>
              <tr>
                <td>#INV-0001</td>
                <td>Global Technologies</td>
                <td>11 Mar 2019</td>
                <td>$380</td>
                <td>
                  <button className="px-3 py-1 border rounded-full bg-[#E2F6ED] text-[#60BE6B]">
                    Paid
                  </button>
                </td>
              </tr>
              <tr>
                <td>#INV-0001</td>
                <td>Global Technologies</td>
                <td>11 Mar 2019</td>
                <td>$380</td>
                <td>
                  <button className="px-3 py-1 border rounded-full bg-[#E2F6ED] text-[#60BE6B]">
                    Paid
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className=" xl:flex  justify-between mt-10">
        <div className="earningCardWrap ">
          <p className="mb-3 font-semibold">Employee Statistic</p>
          <div className="grid grid-cols-1 md:grid-cols-2 justify-between gap-5">
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
                <b className="text-sm">Active Employee </b>
              </div>
              <b>40 / 45 </b>
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
                <b className="text-sm">Total Holiday </b>
              </div>
              <b> 5 / 30 </b>
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
                <b className="text-sm">Today Leave </b>
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
                        stroke: `#EF4444`, // Set the color of the progress bar
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
                <b className="text-sm ">Today Late </b>
              </div>
              <b> 5 / 45</b>
            </div>
            <div className="flex items-center w-40 justify-between earningCard">
              <div>
                <div style={{ width: 60, height: 60 }}>
                  <CircularProgressbar
                    value={70}
                    text={`${50}%`}
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
                <b className="text-sm">Advance Salary </b>
              </div>
              <b className="">৳5984595</b>
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
                        stroke: `#EF4444`, // Set the color of the progress bar
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
                <b className="text-sm ">Due Salary </b>
              </div>
              <b className="">৳7595</b>
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
                <HiOutlineCheckCircle className="text-[#60BE6B] mr-1" />
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
                <HiOutlineCheckCircle className="text-[#EF4444]  mr-1" />
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
            <h3 className="font-semibold mr-3">Leave Request </h3>
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
            <div className="my-3 flex items-center justify-between ">
              <div>
                <small className="block">4 Mar 2022</small>
                <small>Leave Date </small>
              </div>
              <b className="bg-[#FDE2E7] text-red-500  py-1 px-2  rounded-md text-sm ">
                Pending
              </b>
            </div>
          </div>
          <div className="flex items-center justify-end ">
            <Link to="/dashboard/employee-leave">
              <button className=" flex items-center mr-2  rounded-full px-3 py-1 bg-[#DDDDDD]">
                <small className="">See More</small>
                <HiOutlineArrowNarrowRight size={15} className="ml-1" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
