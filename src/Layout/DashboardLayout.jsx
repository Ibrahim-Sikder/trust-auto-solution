/* eslint-disable no-mixed-spaces-and-tabs */
import { NavLink, Outlet } from "react-router-dom";
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
  FaHome,
  FaAngleDoubleUp,
} from "react-icons/fa";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useRef, useState } from "react";
import "./Layout.css";
import {
  Home,
  Logout,
  Receipt,
  CurrencyExchange,
  ShoppingBag,
} from "@mui/icons-material";
import { animateScroll as scroll } from "react-scroll";
import { HiOutlineUserGroup } from "react-icons/hi";

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

  return (
    <main>
      <div className=" ">
        <div
          ref={containerRef}
          onClick={handleToggleCloseBtn}
          className={`${toggle ? `drawer-content` : `activeDrawer`}`}
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
            <div className="mb-5">
              <NavLink to="/" className="shadow-md z-10">
                <h3 className="text-2xl font-bold mt-3 ml-3">T A Solutions </h3>
              </NavLink>
            </div>

            <NavLink to="/dashboard">
              <div className="flex items-center dashboardItems">
                <FaHome className="dashboardIcon" />
                <span>Dashboard</span>
              </div>
            </NavLink>
            <Accordion
              className="dashboardAccordion "
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon className="accordionExpandIcon" />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography>
                  <div className="flex items-center justify-center">
                    <FaCarAlt />
                    <span className="ml-2">Vehicle Job Card</span>
                  </div>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="accordionTypoGrapy">
                  <span className="flex items-center">
                    <FaPlus className="mr-2" />
                    <NavLink to="/dashboard/addjob">Add job card</NavLink>
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
              className="dashboardAccordion"
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary
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
                    <NavLink to="/dashboard/qutation">Add Quotation</NavLink>
                  </span>
                </Typography>
                <Typography className="accordionTypoGrapy">
                  <span className="flex items-center">
                    <FaThLarge className="mr-2" />
                    <NavLink to="/dashboard/quotaiton-list">
                      View Qutation List
                    </NavLink>
                  </span>
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              className="dashboardAccordion"
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
            >
              <AccordionSummary
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
                    <NavLink to="/dashboard/invoice">Add Invoice Card</NavLink>
                  </span>
                </Typography>
                <Typography className="accordionTypoGrapy">
                  <span className="flex items-center">
                    <FaThLarge className="mr-2" />
                    <NavLink to="/dashboard/invoice-view">
                      View Invoice List{" "}
                    </NavLink>
                  </span>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              className="dashboardAccordion"
              expanded={expanded === "panel4"}
              onChange={handleChange("panel4")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon className="accordionExpandIcon" />}
                aria-controls="panel4a-content"
                id="panel4a-header"
              >
                <Typography>
                  <div className="flex items-center justify-center">
                    <CurrencyExchange className="dashboardIcon" />
                    <span className="ml-2">Money receipt</span>
                  </div>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="accordionTypoGrapy">
                  <span className="flex items-center">
                    <FaPlus className="mr-2" />
                    <NavLink to="/dashboard/money-receive">
                      Add Money Receipt
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
              className="dashboardAccordion"
              expanded={expanded === "panel5"}
              onChange={handleChange("panel5")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon className="accordionExpandIcon" />}
                aria-controls="panel5a-content"
                id="panel5a-header"
              >
                <Typography className="accordionName">
                  <div className="flex items-center justify-center">
                    <FaProjectDiagram />
                    <span className="ml-2"> Projects</span>
                  </div>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="accordionTypoGrapy">
                  <NavLink to="/dashboard/addjob">Running Project</NavLink>
                </Typography>
                <Typography className="accordionTypoGrapy">
                  Completed Project
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              className="dashboardAccordion"
              expanded={expanded === "panel6"}
              onChange={handleChange("panel6")}
            >
              <AccordionSummary
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
                    <NavLink to="/dashboard/add-product">Add Product </NavLink>
                  </div>
                </Typography>
                <Typography className="accordionTypoGrapy">
                  <div className="flex items-center">
                    <FaThLarge className="mr-2" />
                    <NavLink to="/dashboard/product">All Product List </NavLink>
                  </div>
                </Typography>
                <Typography className="accordionTypoGrapy">
                  <div className="flex items-center">
                    <FaPlus className="mr-2" />
                    <NavLink to="/dashboard/add-purchase">Add Purchase</NavLink>
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
              className="dashboardAccordion"
              expanded={expanded === "panel7"}
              onChange={handleChange("panel7")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon className="accordionExpandIcon" />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                className="dashboardAccordionSummary"
              >
                <Typography>
                  <div className="flex items-center justify-center">
                    <FaUserTie className="dashboardIcon" />
                    <span className="ml-2"> Customer</span>
                  </div>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="accordionTypoGrapy">
                  <span className="flex items-center">
                    <FaPlus className="mr-2" />
                    <NavLink to="/dashboard/add-customer">
                      Add Customer{" "}
                    </NavLink>
                  </span>
                </Typography>
                <Typography className="accordionTypoGrapy">
                  <span className="flex items-center">
                    <FaThLarge className="mr-2" />
                    <NavLink to="/dashboard/customer-list">
                      All Customer
                    </NavLink>
                  </span>
                </Typography>
                <Typography className="accordionTypoGrapy">
                <span className="flex items-center">
                  <HiOutlineUserGroup className="mr-2" />
                  <NavLink to="/dashboard/add-company">
                    Add Company
                  </NavLink>
                </span>
              </Typography>
              <Typography className="accordionTypoGrapy">
                <span className="flex items-center">
                  <FaThLarge className="mr-2" />
                  <NavLink to="/dashboard/company-list">
                  Company List 
                  </NavLink>
                </span>
              </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              className="dashboardAccordion"
              expanded={expanded === "panel9"}
              onChange={handleChange("panel9")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon className="accordionExpandIcon" />}
                aria-controls="panel6a-content"
                id="panel6a-header"
              >
                <Typography>
                  <span className="flex items-center justify-center">
                    <ShoppingBag />
                    <span className="ml-2"> Suppliers </span>
                  </span>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="accordionTypoGrapy">
                  <div className="flex items-center">
                    <FaPlus className="mr-2" />
                    <NavLink to="/dashboard/add-supplier">
                      Add Supplier{" "}
                    </NavLink>
                  </div>
                </Typography>
                <Typography className="accordionTypoGrapy">
                  <div className="flex items-center">
                    <FaThLarge className="mr-2" />
                    <NavLink to="/dashboard/supplier-list">
                      SupplierList{" "}
                    </NavLink>
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              className="dashboardAccordion"
              expanded={expanded === "panel8"}
              onChange={handleChange("panel8")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon className="accordionExpandIcon" />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                className="dashboardAccordionSummary"
              >
                <Typography>
                  <div className="flex items-center dashboardItems">
                    <FaUsers className="dashboardIcon" />
                    <span>Employee</span>
                  </div>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="accordionTypoGrapy">
                  <span className="flex items-center">
                    <FaPlus className="mr-2" />
                    <NavLink to="/dashboard/add-employee">Add Employee</NavLink>
                  </span>
                </Typography>
                <Typography className="accordionTypoGrapy">
                  <span className="flex items-center">
                    <FaThLarge className="mr-2" />
                    <NavLink to="/dashboard/employee-list">
                      All Employee
                    </NavLink>
                  </span>
                </Typography>
              </AccordionDetails>
            </Accordion>

            <NavLink to="/dashboard/expense">
              <div className="flex items-center dashboardItems">
                <FaCriticalRole className="dashboardIcon" />
                <span> Expense </span>
              </div>
            </NavLink>
            <Accordion
              className="dashboardAccordion"
              expanded={expanded === "panel7"}
              onChange={handleChange("panel7")}
            >
              <AccordionSummary
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
            <NavLink to="/dashboard/services">
              <div className="flex items-center dashboardItems">
                <FaAlipay className="dashboardIcon" />
                <span> Bill Pay</span>
              </div>
            </NavLink>

            <NavLink to="/dashboard/profile">
              <div className="flex items-center dashboardItems">
                <FaUsersCog className="dashboardIcon" />
                <span> Profile</span>
              </div>
            </NavLink>
            <NavLink to="/dashboard/services">
              <div className="flex items-center dashboardItems">
                <FaDatabase className="dashboardIcon" />
                <span> Data Backup </span>
              </div>
            </NavLink>
            <NavLink to="/dashboard/services">
              <div className="flex items-center dashboardItems">
                <FaHeadset className="dashboardIcon" />
                <span>Support</span>
              </div>
            </NavLink>
            <NavLink to="/dashboard/services">
              <div className="flex items-center dashboardItems">
                <Logout className="dashboardIcon" />
                <span>Log Out </span>
              </div>
            </NavLink>
          </div>
          <div
            className={`${toggle ? `activeToggle` : `navActive`}`}
            ref={navRef}
            onClick={toggleSideBar}
          >
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </div>
          <div
            className={`${
              toggle ? `rightSideBarWrap` : `activeRightSideBarWrap`
            }`}
          >
            <div className="mt-14">
              <div>
                <div className="toolTipWrap">
                  <Home className="tooltipIcon" />
                  <b className="toolTip">Dashboard </b>
                </div>
              </div>

              <div className="mt-[14px]">
                <div className="toolTipWrap">
                  <FaCarAlt className="tooltipIcon" />
                  <b className="toolTip">Job Card</b>
                </div>
              </div>
              <div className="mt-[14px]">
                <div className="toolTipWrap">
                  <FaCarAlt className="tooltipIcon" />
                  <b className="toolTip">Qutation Card</b>
                </div>
              </div>
              <div className="mt-[14px]">
                <div className="toolTipWrap">
                  <Receipt className="tooltipIcon" />
                  <b className="toolTip">Invoice Card</b>
                </div>
              </div>
              <div className="mt-[14px]">
                <div className="toolTipWrap">
                  <FaProjectDiagram className="tooltipIcon" />
                  <b className="toolTip">Project</b>
                </div>
              </div>
              <div className="mt-[14px]">
                <div className="toolTipWrap">
                  <FaProductHunt className="tooltipIcon" />
                  <b className="toolTip">Product</b>
                </div>
              </div>
              <div className="mt-[14px]">
                <div className="toolTipWrap">
                  <FaUserTie className="tooltipIcon" />
                  <b className="toolTip">Customer</b>
                </div>
              </div>
              <div className="mt-[14px]">
                <div className="toolTipWrap">
                  <FaCriticalRole className="tooltipIcon" />
                  <b className="toolTip">Expense </b>
                </div>
              </div>
              <div className="mt-[14px]">
                <div className="toolTipWrap">
                  <FaCriticalRole className="tooltipIcon" />
                  <b className="toolTip">Role </b>
                </div>
              </div>
              <div className="mt-[14px]">
                <div className="toolTipWrap">
                  <FaAlipay className="tooltipIcon" />
                  <b className="toolTip">Bill Pay </b>
                </div>
              </div>
              <div className="mt-[14px]">
                <div className="toolTipWrap">
                  <FaUsers className="tooltipIcon" />
                  <b className="toolTip">Employee </b>
                </div>
              </div>
              <div className="mt-[14px]">
                <div className="toolTipWrap">
                  <FaUsersCog className="tooltipIcon" />
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
                  <FaHeadset className="tooltipIcon" />
                  <b className="toolTip">Support </b>
                </div>
              </div>
              <div className="mt-[14px]">
                <div className="toolTipWrap">
                  <Logout className="tooltipIcon" />
                  <b className="toolTip">Log Out </b>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
      <button onClick={scrollToTop} id="button">
        <FaAngleDoubleUp size={25} />
      </button>
    </main>
  );
};

export default DashboardLayout;
