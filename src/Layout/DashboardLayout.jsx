/* eslint-disable no-mixed-spaces-and-tabs */
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaCarAlt,
  FaProjectDiagram,
  FaProductHunt,
  FaUserTie,
  FaCriticalRole,
  FaAlipay,
  FaUsers,
  FaUsersCog,
  FaDatabase,
  FaHeadset,
  FaPlus,
  FaThLarge,
  FaAngleDoubleUp,
  FaRegListAlt,
  FaHospitalUser,
  FaSearch,
} from "react-icons/fa";
import {
  FaAnchorCircleCheck,
  FaCalendarDays,
  FaRegMessage,
} from "react-icons/fa6";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import "./Layout.css";
import {
  Home,
  Logout,
  Receipt,
  CurrencyExchange,
  ShoppingBag,
  NotificationsNone,
} from "@mui/icons-material";
import { animateScroll as scroll } from "react-scroll";
import {
  HiOutlineChat,
  HiOutlineChevronDown,
  HiOutlineCube,
  HiOutlineCurrencyDollar,
  HiOutlineHome,
  HiOutlineUserAdd,
  HiOutlineUserGroup,
} from "react-icons/hi";
import admin from "../../public/assets/avatar.jpg";
import user from "../../public/assets/chat.jpg";

const DashboardLayout = () => {
  const [expanded, setExpanded] = useState(false);
  const navRef = useRef();
  const [toggle, setToggle] = useState(false);
  const toggleSideBar = () => {
    setToggle((toggle) => !toggle);
  };

  const containerRef = useRef();
  const handleToggleCloseBtn = () => {
    setToggle(false);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const button = document.getElementById("button");
      if (window.scrollY > 50) {
        button.classList.add("scrollToTopBtn");
      } else {
        button.classList.remove("scrollToTopBtn");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo(0, 0);
    scroll.scrollToTop({ smooth: true });
  }

  const messageData = [
    {
      id: 1,
      name: "Mr John",
      text: "Hi Arif! Could you please...",
      time: "2hrs ago",
    },
    {
      id: 2,
      name: "Mr John",
      text: "Hi Arif! Could you please...",
      time: "3hrs ago",
    },
    {
      id: 3,
      name: "Mr John",
      text: "Hi Arif! Could you please...",
      time: "2hrs ago",
    },
    {
      id: 4,
      name: "Mr John",
      text: "Hi Arif! Could you please...",
      time: "8hrs ago",
    },
  ];

  const notificationData = [
    {
      id: 1,
      notification: "You have requested to Withdrawal",
      time: "2hrs ago",
    },
    {
      id: 2,
      notification: "A new user added in TAS ",
      time: "3hrs ago",
    },
    {
      id: 3,
      notification: "You have requested to Withdrawal",
      time: "5hrs ago",
    },
    {
      id: 4,
      notification: "You have requested to Withdrawal",
      time: "8hrs ago",
    },
  ];

  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("tas-auth");
    navigate("/");
  };

  return (
    <main>
      <div className="static w-full h-16">
        <div className="w-full h-16  bg-[#42A1DA] fixed z-10 ">
          <div className="flex items-center justify-between pr-8 pl-10 lg:pl-20 mt-2 lg:mt-3">
            <div
              className={`${toggle ? `activeToggle` : `navActive`}`}
              ref={navRef}
              onClick={toggleSideBar}
            >
              <span className="bar" />
              <span className="bar" />
              <span className="bar" />
            </div>
            <Link to="/dashboard">
              {" "}
              <h3 className="ml-5 text-xl lg:text-2xl font-semibold text-white hidden lg:block">
                Trust Auto Solution
              </h3>
            </Link>
            <div className="flex items-center space-x-5 flex-end  ">
              <div className="dashboardSearchBar lg:block hidden ">
                <input
                  placeholder="Search here"
                  type="text"
                  className="lg:block hidden "
                />
                <FaSearch size={20} className="text-[#fff]" />
              </div>
              <Link to="/dashboard/holiday">
                <FaCalendarDays
                  size={20}
                  className="text-[#fff] lg:block hidden"
                />
              </Link>
              <div className="relative lg:block hidden notificationIconsWraps cursor-pointer ">
                <div className="absolute rounded-full bg-[#1A90FF] text-white p-2 w-5 h-5 flex items-center justify-center text-sm -top-1 left-5">
                  5
                </div>
                <NotificationsNone
                  className="text-white notificationIcon"
                  size={30}
                />

                <div className="notificationModal">
                  <div className="flex items-center justify-between">
                    <h3>Notifications(5)</h3>
                    <span className="text-[#0F79F3]">Clear all</span>
                  </div>
                  {notificationData.slice(0, 3).map((data) => (
                    <div key={data.id} className="">
                      <Link to="/dashboard/notification">
                        <div className="notificationMessage space-y-5">
                          <div className="bg-[#EFF3F9] p-3 rounded-full hover:bg-[#0F79F3] hover:text-[#fff] transition-all mr-3">
                            <FaRegMessage size={25} />
                          </div>
                          <div>
                            <p>{data.notification}</p>
                            <small>{data.time}</small>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                  <Link to="/dashboard/notification">
                    <button className="text-[#0F79F3] border-b border-b-[#0F79F3] mt-8 text-center w-52 justify-center mx-auto flex ">
                      See All Notifications
                    </button>
                  </Link>
                </div>
              </div>
              <div className="relative lg:block hidden messageIconsWraps cursor-pointer ">
                <div className="absolute rounded-full bg-[#1A90FF] text-white p-2 w-5 h-5 flex items-center justify-center text-sm -top-1 left-5">
                  5
                </div>
                <HiOutlineChat className="text-white " size={30} />

                <div className=" messageModal">
                  <div className="flex items-center justify-between">
                    <h3>Notifications(5)</h3>
                    <span className="text-[#0F79F3]">Mark all as read</span>
                  </div>
                  {messageData.slice(0, 4).map((data) => (
                    <div key={data.id} className="">
                      <Link to="/dashboard/message">
                        <div className="notificationMessage space-y-5">
                          <img
                            src={user}
                            className="h-10 w-10 rounded-full "
                            alt="user"
                          />
                          <div>
                            <div className="flex items-center">
                              <h3 className="mr-2 font-semibold ">
                                {data.name}
                              </h3>
                              <small>{data.time}</small>
                            </div>
                            <p className="text-[#A8A8A8]">{data.text}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                  <Link to="/dashboard/message">
                    <button className="text-[#0F79F3] border-b border-b-[#0F79F3] mt-8 text-center w-52 justify-center mx-auto flex ">
                      See All Message
                    </button>
                  </Link>
                </div>
              </div>

              <div className="flex items-center adminProfileWrap ">
                <img src={admin} alt="admin" className="rounded-full w-10" />
                <div className="flex items-center text-white ml-2">
                  <span>Admin</span>
                  <HiOutlineChevronDown size={20} />
                </div>
                <div className="adminProfile space-y-2">
                  <Link to="/dashboard/profile">
                    <p>My Profile</p>
                  </Link>
                  <Link to="/dashboard/support">
                    <p>Settings</p>
                  </Link>
                  <Link to="/dashboard/support">
                    <p>Support</p>
                  </Link>
                  {/* <Link to="/"> */}
                  <p className=" cursor-pointer" onClick={handleLogout}>
                    Logout
                  </p>
                  {/* </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div
          ref={containerRef}
          onClick={handleToggleCloseBtn}
          className={`${toggle ? `drawer-content` : `activeDrawer`}  `}
        >
          <Outlet />
        </div>

        <aside className="flex ">
          <div
            className={`${
              toggle
                ? `fixed overflow-y-scroll overflow-x-hidden drawwerLeftSide  h-screen text-lg font-semibold  bg-[#2C3136] text-white`
                : `fixed overflow-y-scroll overflow-x-hidden sideBarActive h-screen text-lg font-semibold  bg-[#2C3136] text-white`
            }`}
          >
            {/* <div className="flex items-center justify-center p-5 bg-[#42A1DA] ">
              <NavLink to="/" className="z-10 ">
                <h3 className="text-3xl font-bold ">T A Solutions </h3>
              </NavLink>
            </div> */}

            <div className=" ">
              <NavLink to="/dashboard" className="z-10  flex p-4 items-center">
                <HiOutlineHome size={35} />
                <h3 className="text-xl font-semibold ml-2">Dashboard</h3>
              </NavLink>
            </div>

            {/* <NavLink to="/dashboard">
              <div className="flex items-center dashboardItems p-3">
                <FaHome className="dashboardIcon" />
                <span>Dashboard</span>
              </div>
            </NavLink> */}

            <Accordion
              sx={{ paddingBottom: "10px" }}
              className="dashboardAccordion "
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                sx={{ marginBottom: "-10px" }}
                expandIcon={<ExpandMoreIcon className="accordionExpandIcon" />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography>
                  <div className="flex items-center justify-center ">
                    <FaCarAlt />
                    <span className="ml-2">Vehicle Job Card</span>
                  </div>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="accordionTypoGrapy">
                  <span className="flex items-center">
                    <FaPlus className="mr-2" />
                    <NavLink to="/dashboard/addjob"> job card Add</NavLink>
                  </span>
                </Typography>
                <Typography className="accordionTypoGrapy">
                  <span className="flex items-center">
                    <FaThLarge className="mr-2" />
                    <NavLink to="/dashboard/jobcard-list">
                      Job Card List
                    </NavLink>
                  </span>
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              sx={{ paddingBottom: "10px" }}
              className="dashboardAccordion"
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary
                sx={{ marginBottom: "-10px" }}
                expandIcon={<ExpandMoreIcon className="accordionExpandIcon" />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                className="dashboardAccordionSummary"
              >
                <Typography>
                  <div className="flex items-center justify-center">
                    <FaCarAlt />
                    <span className="ml-2">Quotation</span>
                  </div>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="accordionTypoGrapy">
                  <span className="flex items-center">
                    <FaPlus className="mr-2" />
                    <NavLink to="/dashboard/qutation"> Quotation Add </NavLink>
                  </span>
                </Typography>
                <Typography className="accordionTypoGrapy">
                  <span className="flex items-center">
                    <FaThLarge className="mr-2" />
                    <NavLink to="/dashboard/quotaiton-list">
                      Quotation List
                    </NavLink>
                  </span>
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              sx={{ paddingBottom: "10px" }}
              className="dashboardAccordion"
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
            >
              <AccordionSummary
                sx={{ marginBottom: "-10px" }}
                expandIcon={<ExpandMoreIcon className="accordionExpandIcon" />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Typography>
                  <div className="flex items-center justify-center">
                    <Receipt />
                    <span className="ml-2">Invoice Card</span>
                  </div>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="accordionTypoGrapy">
                  <span className="flex items-center">
                    <FaPlus className="mr-2" />
                    <NavLink to="/dashboard/invoice"> Invoice Add </NavLink>
                  </span>
                </Typography>
                <Typography className="accordionTypoGrapy">
                  <span className="flex items-center">
                    <FaThLarge className="mr-2" />
                    <NavLink to="/dashboard/invoice-view">Invoice List</NavLink>
                  </span>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{ paddingBottom: "10px" }}
              className="dashboardAccordion"
              expanded={expanded === "panel4"}
              onChange={handleChange("panel4")}
            >
              <AccordionSummary
                sx={{ marginBottom: "-10px" }}
                expandIcon={<ExpandMoreIcon className="accordionExpandIcon" />}
                aria-controls="panel4a-content"
                id="panel4a-header"
              >
                <Typography>
                  <div className="flex items-center justify-center">
                    <CurrencyExchange />
                    <span className="ml-2">Money receipt</span>
                  </div>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="accordionTypoGrapy">
                  <span className="flex items-center">
                    <FaPlus className="mr-2" />
                    <NavLink to="/dashboard/money-receive">
                      Money Receipt Add
                    </NavLink>
                  </span>
                </Typography>
                <Typography className="accordionTypoGrapy">
                  <span className="flex items-center">
                    <FaThLarge className="mr-2" />
                    <NavLink to="/dashboard/money-receipt-list">
                      {" "}
                      Money Receipt List
                    </NavLink>
                  </span>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{ paddingBottom: "10px" }}
              className="dashboardAccordion"
              expanded={expanded === "panel5"}
              onChange={handleChange("panel5")}
            >
              <AccordionSummary
                sx={{ marginBottom: "-10px" }}
                expandIcon={<ExpandMoreIcon className="accordionExpandIcon" />}
                aria-controls="panel5a-content"
                id="panel5a-header"
              >
                <Typography className="accordionName">
                  <div className="flex items-center justify-center">
                    <HiOutlineCube size={22} />
                    <span className="ml-2"> Projects</span>
                  </div>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="accordionTypoGrapy">
                  <NavLink to="/dashboard/running-project">
                    <span className="flex items-center">
                      <HiOutlineCurrencyDollar size={22} className="mr-2" />
                      Running Project
                    </span>
                  </NavLink>
                </Typography>
                <Typography className="accordionTypoGrapy">
                  <NavLink to="/dashboard/complete-project">
                    <span className="flex items-center">
                      <HiOutlineCurrencyDollar size={22} className="mr-2" />
                      Complete Project
                    </span>
                  </NavLink>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{ paddingBottom: "10px" }}
              className="dashboardAccordion"
              expanded={expanded === "panel6"}
              onChange={handleChange("panel6")}
            >
              <AccordionSummary
                sx={{ marginBottom: "-10px" }}
                expandIcon={<ExpandMoreIcon className="accordionExpandIcon" />}
                aria-controls="panel6a-content"
                id="panel6a-header"
              >
                <Typography>
                  <span className="flex items-center justify-center">
                    <ShoppingBag />
                    <span className="ml-2"> Product </span>
                  </span>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="accordionTypoGrapy">
                  <div className="flex items-center">
                    <FaPlus className="mr-2" />
                    <NavLink to="/dashboard/add-product"> Product Add </NavLink>
                  </div>
                </Typography>
                <Typography className="accordionTypoGrapy">
                  <div className="flex items-center">
                    <FaThLarge className="mr-2" />
                    <NavLink to="/dashboard/product"> Product List </NavLink>
                  </div>
                </Typography>
                <Typography className="accordionTypoGrapy">
                  <div className="flex items-center">
                    <FaPlus className="mr-2" />
                    <NavLink to="/dashboard/add-purchase">
                      {" "}
                      Purchase Add{" "}
                    </NavLink>
                  </div>
                </Typography>
                <Typography className="accordionTypoGrapy">
                  <div className="flex items-center">
                    <FaThLarge className="mr-2" />
                    <NavLink to="/dashboard/purchase-list">
                      Purchase List{" "}
                    </NavLink>
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              sx={{ paddingBottom: "10px" }}
              className="dashboardAccordion"
              expanded={expanded === "panel7"}
              onChange={handleChange("panel7")}
            >
              <AccordionSummary
                sx={{ marginBottom: "-10px" }}
                expandIcon={<ExpandMoreIcon className="accordionExpandIcon" />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                className="dashboardAccordionSummary"
              >
                <Typography>
                  <div className="flex items-center justify-center">
                    <HiOutlineUserGroup size={22} />
                    <span className="ml-2"> Customer</span>
                  </div>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="accordionTypoGrapy">
                  <span className="flex items-center">
                    <HiOutlineUserAdd className="mr-2" />
                    <NavLink to="/dashboard/add-customer">Customer Add</NavLink>
                  </span>
                </Typography>
                <Typography className="accordionTypoGrapy">
                  <span className="flex items-center">
                    <FaThLarge className="mr-2" />
                    <NavLink to="/dashboard/customer-list">
                      Customer List
                    </NavLink>
                  </span>
                </Typography>
                <Typography className="accordionTypoGrapy">
                  <span className="flex items-center">
                    <HiOutlineUserAdd className="mr-2" />
                    <NavLink to="/dashboard/add-company"> Company Add </NavLink>
                  </span>
                </Typography>
                <Typography className="accordionTypoGrapy">
                  <span className="flex items-center">
                    <FaThLarge className="mr-2" />
                    <NavLink to="/dashboard/company-list">Company List</NavLink>
                  </span>
                </Typography>
                <Typography className="accordionTypoGrapy">
                  <span className="flex items-center">
                    <HiOutlineUserAdd className="mr-2" />
                    <NavLink to="/dashboard/add-show-room">
                      {" "}
                      Show Room Add
                    </NavLink>
                  </span>
                </Typography>
                <Typography className="accordionTypoGrapy">
                  <span className="flex items-center">
                    <FaThLarge className="mr-2" />
                    <NavLink to="/dashboard/show-room-list">
                      Show Room List
                    </NavLink>
                  </span>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{ paddingBottom: "10px" }}
              className="dashboardAccordion"
              expanded={expanded === "panel9"}
              onChange={handleChange("panel9")}
            >
              <AccordionSummary
                sx={{ marginBottom: "-10px" }}
                expandIcon={<ExpandMoreIcon className="accordionExpandIcon" />}
                aria-controls="panel6a-content"
                id="panel6a-header"
              >
                <Typography>
                  <span className="flex items-center justify-center">
                    <FaHospitalUser />
                    <span className="ml-2"> Suppliers </span>
                  </span>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="accordionTypoGrapy">
                  <div className="flex items-center">
                    <FaPlus className="mr-2" />
                    <NavLink to="/dashboard/add-supplier">Supplier Add</NavLink>
                  </div>
                </Typography>
                <Typography className="accordionTypoGrapy">
                  <div className="flex items-center">
                    <FaThLarge className="mr-2" />
                    <NavLink to="/dashboard/supplier-list">
                      Supplier List
                    </NavLink>
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              sx={{ paddingBottom: "10px" }}
              className="dashboardAccordion"
              expanded={expanded === "panel8"}
              onChange={handleChange("panel8")}
            >
              <AccordionSummary
                sx={{ marginBottom: "-10px" }}
                expandIcon={<ExpandMoreIcon className="accordionExpandIcon" />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                className=""
              >
                <Typography>
                  <div className="flex items-center dashboardItems">
                    <FaUsers size={22} />
                    <span className="ml-2">Employee</span>
                  </div>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="accordionTypoGrapy">
                  <span className="flex items-center">
                    <FaPlus className="mr-2" />
                    <NavLink to="/dashboard/add-employee">
                      {" "}
                      Employee Add{" "}
                    </NavLink>
                  </span>
                </Typography>
                <Typography className="accordionTypoGrapy">
                  <span className="flex items-center">
                    <FaThLarge className="mr-2" />
                    <NavLink to="/dashboard/employee-list">
                      Employee List{" "}
                    </NavLink>
                  </span>
                </Typography>
                <Typography className="accordionTypoGrapy">
                  <span className="flex items-center">
                    <FaThLarge className="mr-2" />
                    <NavLink to="/dashboard/employee-leave">Leave</NavLink>
                  </span>
                </Typography>
                <Typography className="accordionTypoGrapy">
                  <span className="flex items-center">
                    <FaThLarge className="mr-2" />
                    <NavLink to="/dashboard/holiday">Holiday</NavLink>
                  </span>
                </Typography>
                <Typography className="accordionTypoGrapy">
                  <span className="flex items-center">
                    <FaThLarge className="mr-2" />
                    <NavLink to="/dashboard/employee-salary">Salary</NavLink>
                  </span>
                </Typography>
                <Typography className="accordionTypoGrapy">
                  <span className="flex items-center">
                    <FaThLarge className="mr-2" />
                    <NavLink to="/dashboard/employee-overtime">
                      Overtime
                    </NavLink>
                  </span>
                </Typography>
                <Typography className="accordionTypoGrapy">
                  <span className="flex items-center">
                    <FaThLarge className="mr-2" />

                    <NavLink to="/dashboard/shift-list">
                      Shift & Schedule
                    </NavLink>
                  </span>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{ paddingBottom: "10px" }}
              className="dashboardAccordion"
              expanded={expanded === "panel10"}
              onChange={handleChange("panel10")}
            >
              <AccordionSummary
                sx={{ marginBottom: "-10px" }}
                expandIcon={<ExpandMoreIcon className="accordionExpandIcon" />}
                aria-controls="panel6a-content"
                id="panel6a-header"
              >
                <Typography>
                  <span className="flex items-center justify-center">
                    <FaRegListAlt />
                    <span className="ml-2"> Attendance </span>
                  </span>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="accordionTypoGrapy">
                  <div className="flex items-center">
                    <FaPlus className="mr-2" />
                    <NavLink to="/dashboard/add-attendance">
                      Attendance Add
                    </NavLink>
                  </div>
                </Typography>
                <Typography className="accordionTypoGrapy">
                  <div className="flex items-center">
                    <FaThLarge className="mr-2" />
                    <NavLink to="/dashboard/attendance-list">
                      Attendance List
                    </NavLink>
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              sx={{ paddingBottom: "10px" }}
              className="dashboardAccordion"
              expanded={expanded === "panel14"}
              onChange={handleChange("panel14")}
            >
              <AccordionSummary
                sx={{ marginBottom: "-10px" }}
                expandIcon={<ExpandMoreIcon className="accordionExpandIcon" />}
                aria-controls="panel6a-content"
                id="panel6a-header"
              >
                <Typography>
                  <span className="flex items-center justify-center ">
                    <ShoppingBag />
                    <span className="ml-2"> Income </span>
                  </span>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="accordionTypoGrapy">
                  <div className="flex items-center">
                    <FaPlus className="mr-2" />
                    <NavLink to="/dashboard/income"> Income Add </NavLink>
                  </div>
                </Typography>
                <Typography className="accordionTypoGrapy">
                  <div className="flex items-center">
                    <FaThLarge className="mr-2" />
                    <NavLink to="/dashboard/income-list">Income List</NavLink>
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{ paddingBottom: "10px" }}
              className="dashboardAccordion"
              expanded={expanded === "panel11"}
              onChange={handleChange("panel11")}
            >
              <AccordionSummary
                sx={{ marginBottom: "-10px" }}
                expandIcon={<ExpandMoreIcon className="accordionExpandIcon" />}
                aria-controls="panel6a-content"
                id="panel6a-header"
              >
                <Typography>
                  <span className="flex items-center justify-center ">
                    <ShoppingBag />
                    <span className="ml-2"> Expense </span>
                  </span>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="accordionTypoGrapy">
                  <div className="flex items-center">
                    <FaPlus className="mr-2" />
                    <NavLink to="/dashboard/add-expense"> Expense Add </NavLink>
                  </div>
                </Typography>
                <Typography className="accordionTypoGrapy">
                  <div className="flex items-center">
                    <FaThLarge className="mr-2" />
                    <NavLink to="/dashboard/expense">Expense List</NavLink>
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              sx={{ paddingBottom: "10px" }}
              className="dashboardAccordion"
              expanded={expanded === "panel12"}
              onChange={handleChange("panel12")}
            >
              <AccordionSummary
                sx={{ marginBottom: "-10px" }}
                expandIcon={<ExpandMoreIcon className="accordionExpandIcon" />}
                aria-controls="panel7a-content"
                id="panel7a-header"
              >
                <Typography>
                  <div className="flex items-center justify-center">
                    <FaCriticalRole />
                    <span className="ml-2">Role</span>
                  </div>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="accordionTypoGrapy">
                  <span className="flex items-center">
                    <FaPlus className="mr-2" />
                    <NavLink to="/dashboard/add-role">Add Role</NavLink>
                  </span>
                </Typography>
                <Typography className="accordionTypoGrapy">
                  <span className="flex items-center">
                    <FaThLarge className="mr-2" />
                    <NavLink to="/dashboard/role">View Role</NavLink>
                  </span>
                </Typography>
              </AccordionDetails>
            </Accordion>

            <div className="pl-3 space-y-3 mt-3 flex flex-col">
              <NavLink to="/dashboard/bill-pay">
                <div className="flex items-center dashboardItems">
                  <FaAlipay size={22} />
                  <span className="ml-2"> Bill Pay</span>
                </div>
              </NavLink>

              <NavLink to="/dashboard/profile">
                <div className="flex items-center dashboardItems">
                  <FaUsersCog size={22} />
                  <span className="ml-2"> Profile</span>
                </div>
              </NavLink>
              <div className="flex items-center dashboardItems">
                <FaDatabase size={22} />
                <span className="ml-2"> Data Backup </span>
              </div>
              <NavLink to="/dashboard/support">
                <div className="flex items-center dashboardItems">
                  <FaHeadset size={22} />
                  <span className="ml-2">Support</span>
                </div>
              </NavLink>
              <NavLink to="/dashboard/services">
                <div
                  onClick={handleLogout}
                  className="flex items-center dashboardItems"
                >
                  <Logout size={22} />
                  <span className="ml-2">Log Out </span>
                </div>
              </NavLink>
            </div>
          </div>
          {/* bar here  */}
          <div
            className={`${
              toggle ? `rightSideBarWrap` : `activeRightSideBarWrap`
            }`}
          >
            <div className="mt-14">
              <div>
                <div className="toolTipWrap">
                  <NavLink to="/dashboard">
                    <Home className="tooltipIcon" />
                  </NavLink>
                  <b className="toolTip">Dashboard </b>
                </div>
              </div>

              <div className="mt-[14px]">
                <div className="toolTipWrap">
                  <NavLink to="/dashboard/addjob">
                    {" "}
                    <FaCarAlt className="tooltipIcon" />
                  </NavLink>

                  <b className="toolTip">Job Card</b>
                </div>
              </div>
              <div className="mt-[14px]">
                <div className="toolTipWrap">
                  <NavLink to="/dashboard/qutation">
                    {" "}
                    <FaCarAlt className="tooltipIcon" />
                  </NavLink>
                  <b className="toolTip">Quotation</b>
                </div>
              </div>
              <div className="mt-[14px]">
                <div className="toolTipWrap">
                  <NavLink to="/dashboard/invoice">
                    {" "}
                    <Receipt className="tooltipIcon" />
                  </NavLink>
                  <b className="toolTip">Invoice Card</b>
                </div>
              </div>
              <div className="mt-[14px]">
                <div className="toolTipWrap">
                  <NavLink to="/dashboard/money-receive">
                    {" "}
                    <CurrencyExchange className="tooltipIcon" />
                  </NavLink>
                  <b className="toolTip text-sm">Money Receipt </b>
                </div>
              </div>
              <div className="mt-[14px]">
                <div className="toolTipWrap">
                  <NavLink to="/dashboard/running-project">
                    {" "}
                    <FaProjectDiagram className="tooltipIcon" />
                  </NavLink>

                  <b className="toolTip">Project</b>
                </div>
              </div>
              <div className="mt-[14px]">
                <div className="toolTipWrap">
                  <NavLink to="/dashboard/add-product">
                    <FaProductHunt className="tooltipIcon" />
                  </NavLink>

                  <b className="toolTip">Product</b>
                </div>
              </div>
              <div className="mt-[14px]">
                <div className="toolTipWrap">
                  <NavLink to="/dashboard/add-customer">
                    <FaUserTie className="tooltipIcon" />
                  </NavLink>
                  <b className="toolTip">Customer</b>
                </div>
              </div>
              <div className="mt-[14px]">
                <div className="toolTipWrap">
                  <NavLink to="/dashboard/add-supplier">
                    <FaHospitalUser className="tooltipIcon" />
                  </NavLink>
                  <b className="toolTip">Suppliers </b>
                </div>
              </div>
              <div className="mt-[14px]">
                <div className="toolTipWrap">
                  <NavLink to="/dashboard/add-employee">
                    <FaUsers className="tooltipIcon" />
                  </NavLink>
                  <b className="toolTip">Employee </b>
                </div>
              </div>
              <div className="mt-[14px]">
                <div className="toolTipWrap">
                  <NavLink to="/dashboard/add-attendance">
                    <FaRegListAlt className="tooltipIcon" />
                  </NavLink>
                  <b className="toolTip">Attendance </b>
                </div>
              </div>

              <div className="mt-[14px]">
                <div className="toolTipWrap">
                  <NavLink to="/dashboard/add-expense">
                    <FaCriticalRole className="tooltipIcon" />
                  </NavLink>
                  <b className="toolTip">Income </b>
                </div>
              </div>
              <div className="mt-[14px]">
                <div className="toolTipWrap">
                  <NavLink to="/dashboard/add-expense">
                    <FaCriticalRole className="tooltipIcon" />
                  </NavLink>
                  <b className="toolTip">Expense </b>
                </div>
              </div>
              <div className="mt-[14px]">
                <div className="toolTipWrap">
                  <NavLink to="/dashboard/add-expense">
                    <FaAnchorCircleCheck className="tooltipIcon" />
                  </NavLink>
                  <b className="toolTip">Role </b>
                </div>
              </div>
              <div className="mt-[14px]">
                <div className="toolTipWrap">
                  <NavLink to="/dashboard/bill-pay">
                    <FaAlipay className="tooltipIcon" />
                  </NavLink>

                  <b className="toolTip">Bill Pay </b>
                </div>
              </div>
              <div className="mt-[14px]">
                <div className="toolTipWrap">
                  <NavLink to="/dashboard/profile">
                    <FaUsersCog className="tooltipIcon" />
                  </NavLink>
                  <b className="toolTip">Profile </b>
                </div>
              </div>
              <div className="mt-[14px]">
                <div className="toolTipWrap">
                  <FaDatabase className="tooltipIcon" />
                  <b className="toolTip">Data Backup </b>
                </div>
              </div>
              <div className="mt-[14px]">
                <div className="toolTipWrap">
                  <NavLink to="/dashboard/support">
                    <FaHeadset className="tooltipIcon" />
                  </NavLink>

                  <b className="toolTip">Support </b>
                </div>
              </div>
              <div className="mt-[14px]">
                <div onClick={handleLogout} className="toolTipWrap">
                  <Logout className="tooltipIcon" />
                  <b className="toolTip">Log Out </b>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <button onClick={scrollToTop} id="button">
        <div className="scrollBtn">
          <FaAngleDoubleUp size={25} />
        </div>
      </button>
    </main>
  );
};

export default DashboardLayout;
