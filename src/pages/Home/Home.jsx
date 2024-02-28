/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import {
  FaHouseDamage,
  FaGripHorizontal,
  FaChartLine,
  FaBookmark,
  FaHandHoldingUsd,
  FaUserAlt,
  FaScribd,
  FaSearch,
  FaUsers,
  FaStripeS,
  FaWrench,
  FaFileInvoiceDollar,
  FaFileInvoice,
  FaCarSide,
  FaPercent,
} from "react-icons/fa";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  Pie,
  Sector,
  Cell,
  PieChart,
  BarChart,
  ResponsiveContainer,
} from "recharts";
import { FaCarOn } from "react-icons/fa6";
import "./Home.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineBriefcase } from "react-icons/hi";
import { TextField } from "@mui/material";
const Home = () => {
  const [expanded, setExpanded] = React.useState(false);
  const [salesData, setSalesData] = useState([]);

  const totalSalse = parseInt(
    salesData.reduce((total, { price }) => total + parseInt(price), 0)
  );
  // const sum = parseInt(totalSalse);

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const data01 = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];
  const data02 = [
    { name: "A1", value: 100 },
    { name: "A2", value: 300 },
    { name: "B1", value: 100 },
    { name: "B2", value: 80 },
    { name: "B3", value: 40 },
    { name: "B4", value: 30 },
    { name: "B5", value: 50 },
    { name: "C1", value: 100 },
    { name: "C2", value: 200 },
    { name: "D1", value: 150 },
    { name: "D2", value: 50 },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="mt-10">
      <div className="dashBoardRight  ">
        <div className="md:flex items-center justify-between md:p-[0px] lg:p-[18px]">
          <div className="flex items-center justify-center ">
            {/* <input autoComplete="off" type="text" placeholder='Search' /> */}
            <TextField
              className="searchInptu"
              id="outlined-basic"
              label="Search..."
              variant="outlined"
            />
            <button className="searchBtn">Search </button>
          </div>
          <div className="mt-3 md:mt-0 flex items-center">
            <Link to="/dashboard/addjob">
              <button className="btn btn-outline border-0 border-b-4  ">
                Job Card{" "}
              </button>
            </Link>
            <Link to="/dashboard/qutation">
              {" "}
              <button className="mx-2 btn btn-outline border-0 border-b-4">
                Qutation
              </button>
            </Link>
            <Link to="/dashboard/invoice">
              {" "}
              <button className="btn btn-outline border-0 border-b-4 ">
                Invoice
              </button>
            </Link>
          </div>
        </div>
        <div className="nameWrap px-3 py-3">
          <div className="projectName">
            <h2 className="text-[#654FC3] font-bold text-2xl">
              Admin Dashboard
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 place-content-center gap-10  mb-5">
          <div className="completedServiceCards flex justify-between items-center rounded-lg bg-[#42A1DA] text-white ">
            <div className="mr-5">
              <div>Completed Services</div>
              <span className="text-2xl font-bold">99 </span>
            </div>
            <div className="valueRight">
              <HiOutlineBriefcase size={50} />
            </div>
          </div>
          <div className="completedServiceCards flex justify-between items-center  rounded-lg bg-[#42A1DA] text-white">
            <div className="mr-5">
              <div>Running Services</div>
              <span className="text-2xl font-bold">200 </span>
            </div>
            <div className="valueRight">
              <FaWrench size={50} />
            </div>
          </div>

          <div className="completedServiceCards flex justify-between items-center  rounded-lg bg-[#48cae4] text-white">
            <div className="mr-5">
              <div>Total Sale </div>
              <span className="text-2xl font-bold">99 </span>
            </div>
            <div className="valueRight">
              <FaPercent size={50} />
            </div>
          </div>
          <div className="completedServiceCards flex justify-between items-center  rounded-lg bg-[#03045e] text-white">
            <div className="mr-5">
              <div>Total Product </div>
              <span className="text-2xl font-bold">99 </span>
            </div>
            <div className="valueRight">
              <FaCarSide size={50} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 place-content-center gap-10  mb-5">
          <div className="completedServiceCards flex justify-between items-center rounded-lg bg-[#f77f00] text-white">
            <div className="mr-5">
              <div>Paid Services Bill</div>
              <span className="text-2xl font-bold">856৳</span>
            </div>
            <div className="valueRight">
              <FaFileInvoice size={50} />
            </div>
          </div>

          <div className="completedServiceCards flex justify-between items-center rounded-lg bg-[#ef233c] text-white">
            <div className="mr-5">
              <div>Due Service Bill </div>
              <span className="text-2xl font-bold">8106৳ </span>
            </div>
            <div className="valueRight">
              <FaFileInvoiceDollar size={50} />
            </div>
          </div>
          <div className="completedServiceCards flex justify-between items-center rounded-lg bg-[#0a9396] text-white">
            <div className="mr-5">
              <div>Our Customer </div>
              <span className="text-2xl font-bold">159 </span>
            </div>
            <div className="valueRight">
              <FaUsers size={50} />
            </div>
          </div>
          <div className=" completedServiceCards flex justify-between items-center rounded-lg bg-[#3a0ca3] text-white">
            <div className="mr-5">
              <div>About Trust Auto Solution</div>
              <span className="text-2xl font-bold">99 </span>
            </div>
            <div className="valueRight">
              <FaCarOn size={50} />
            </div>
          </div>
        </div>

        <div className="flex justify-between px-5 mt-24">
          <div className="">
            <BarChart
              width={600}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#8884d8" />
              <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>

            <h2 className="text-xl centerText font-bold text-[#42A1DA]">
              Yearly Income Chart
            </h2>
          </div>
          <div className="pieChart">
            <PieChart width={500} height={380}>
              <Pie
                data={data01}
                dataKey="value"
                cx={200}
                cy={200}
                outerRadius={100}
                fill="#8884d8"
              />
              <Pie
                data={data02}
                dataKey="value"
                cx={200}
                cy={200}
                innerRadius={100}
                outerRadius={120}
                fill="#82ca9d"
                label
              />
            </PieChart>
            <h2 className="text-xl centerText center font-bold text-[#42A1DA]">
              Monthly Income Chart
            </h2>
          </div>
        </div>
      </div>
      {/*  */}
      <div>
        {salesData.map((data) => (
          <>
            <p>{data.length}</p>
          </>
        ))}
      </div>
    </div>
  );
};

export default Home;
