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
      name: " Job Card ",
      user: 10,
    },
    {
      id: 6,
      name: " Quotation ",
      user: 10,
    },
    {
      id: 6,
      name: " Invoice ",
      user: 10,
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
      </div>

      <div className="grid grid-cols-2 gap-3 my-14">
        <div
          className="flex flex-wrap gap-4
        5"
        >
          {userData.map((data, i) => (
            <div key={data.id} className="dashboardCard">
              <div className="dashboardIconWrap">
                {i == 0 ? (
                  <HiOutlineUserGroup className="text-[#fff]" size={50} />
                ) : i == 1 ? (
                  <HiOutlineUsers className="text-[#fff]" size={50} />
                ) : i == 2 ? (
                  <HiOutlineUsers className="text-[#fff]" size={50} />
                ) : i == 3 ? (
                  <HiOutlineBriefcase className="text-[#fff]" size={50} />
                ) : i == 4 ? (
                  <FaCarSide className="text-[#fff]" size={50} />
                ) : i == 5 ? (
                  <FaFileInvoice className="text-[#fff]" size={50} />
                ) : null}
              </div>
              <div className="mt-2">
                <span>{data.user}</span>
                <h2 className="mt-2">{data.name}</h2>
              </div>
            </div>
          ))}
        </div>
        <ChartComponent />
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
            <HiOutlineCheckCircle className="text-[#FFBC34] mr-1"/>
            <span className="font-semibold">Complete Task </span>
            </div>
       <b>455</b>
       </div>
     <div className="flex items-center justify-between ">
            <div className="flex items-center">
            <HiOutlineCheckCircle className="text-[#FFBC34] mr-1"/>
            <span className="font-semibold">Inprogress Task </span>
            </div>
       <b>25</b>
       </div>
       <div className="flex items-center justify-between ">
            <div className="flex items-center">
            <HiOutlineCheckCircle className="text-[#FFBC34] mr-1"/>
            <span className="font-semibold">Pending Task </span>
            </div>
       <b>25</b>
       </div>
       <div className="flex items-center justify-between ">
            <div className="flex items-center">
            <HiOutlineCheckCircle className="text-[#FFBC34] mr-1"/>
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
       <FaRegUser size={30}/>
       </div>
        <span>Md Raihan</span>
        </div>
        <div className="my-3 flex items-center justify-between">
         <div >
         <small className="block">4 Mar 2022</small>
          <small>Leave Date </small>
         </div>
         <b className="bg-[#E2F6ED] text-[#55CE63] text-sm  py-1 px-2  rounded-md  ">Approved</b> 
        </div>
       </div>
       <div className="absentCard">
        <div className="flex items-center">
        <div className="userImgWrap">
       <FaRegUser size={30}/>
       </div>
        <span>Md Karim</span>
        </div>
        <div className="my-3 flex items-center justify-between">
         <div >
         <small className="block">4 Mar 2022</small>
          <small>Leave Date </small>
         </div>
         <b className="bg-[#FDE2E7] text-red-500  py-1 px-2  rounded-md text-sm ">Pending</b> 
        </div>
       </div>
      </div>
     </div>


      
      <div className="flex mt-16">
        <MonthlyBarChart />
        <YearlyIncomeChart />
      </div>
    </div>
  );
};

export default Home;
