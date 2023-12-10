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
import service from '../../../public/assets/service.png'
import service2 from '../../../public/assets/service2.png'
import service4 from '../../../public/assets/service4.png'
import customer from '../../../public/assets/customer.png'
import bill from '../../../public/assets/bill.png'
import './Home.css'
import { useState } from "react";
import { Link } from "react-router-dom";
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
    <div className='mt-10'>
      <div className="dashBoardRight  ">
        <div className="md:flex items-center justify-between md:p-[0px] lg:p-[18px]">
          <div className="mt-3 md:mt-0 flex items-center">

            <Link to='/addjob'><button className="SearchBtn ">Job Card </button></Link>
            <Link to='/qutation'> <button className="SearchBtn ">Qutation</button></Link>
            <Link to='/invoice'> <button className="SearchBtn ">Invoice</button></Link>
          </div>
          <div className="searchGroup">
            <input autoComplete="off" type="text" placeholder='Search' />
            <button className="SearchBtn ">Search </button>
          </div>

        </div>
        <div className="nameWrap px-3 py-3">
          <div className="projectName">
            <h2 className="text-[#654FC3]">Admin Dashboard</h2>
          </div>
        </div>

        <div className="nameWrap downWrap  px-3">
          <div className="value">
            <div className="valueWrap firstCard">
              <div className="leftValue">
                <div className="text-xl font-bold">Running Services</div>
                <span className="text-2xl font-bold">99 </span>
              </div>
              <div className="valueRight">
                <img src={service} alt="" />
              </div>
            </div>
          </div>
          <div className="value">
            <div className="valueWrap secondCard">
              <div className="leftValue">
                <div className="text-xl font-bold">Completed Services</div>
                <span className=" text-2xl font-bold">50</span>
              </div>
              <div className="valueRight">
                <img src={service2} alt="" />
              </div>
            </div>
          </div>
          <div className="value">
            <div className="valueWrap thirdCard">
              <div className="leftValue">
                <div className="text-xl font-bold">Our Customer </div>
                <span className="text-2xl font-bold">65</span>
              </div>
              <div className="valueRight">
                <img src={customer} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="nameWrap downWrap py-5 px-3 mb-5">
          <div className="value">
            <div className="valueWrap firstCard">
              <div className="leftValue">
                <div className="text-xl font-bold">Due Service Bill </div>
                <span className="text-2xl font-bold">856৳</span>
              </div>
              <div className="valueRight">
                <img src={bill} alt="" />
              </div>
            </div>
          </div>
          <div className="value">
            <div className="valueWrap secondCard">
              <div className="leftValue">
                <div className="text-xl font-bold">Paid Services Bill </div>
                <span className=" text-2xl font-bold">989৳</span>
              </div>
              <div className="valueRight">
                <img src={bill} alt="" />
              </div>
            </div>
          </div>
          <div className="value">
            <div className="valueWrap thirdCard">
              <div className="leftValue">
                <div className="text-xl font-bold">About Company </div>
                <span className="text-2xl font-bold">Best Auto Solution </span>
              </div>
              <div className="valueRight">
                <img src={service4} alt="" />
              </div>
            </div>
          </div>
        </div>

        <div className="chart px-5">
          <div className="barChart">
            <BarChart
              width={500}
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

            <h2 className="text-xl centerText font-bold text-[#654FC3]">
              Yearly Income Chart
            </h2>
          </div>
          <div className="pieChart">
            <PieChart width={400} height={400}>
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
            <h2 className="text-xl centerText center font-bold text-[#654FC3]">
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
