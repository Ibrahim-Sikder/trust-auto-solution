import { Link, Outlet } from 'react-router-dom'
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
	FaThLarge
} from 'react-icons/fa'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { FaHome } from 'react-icons/fa'
import { useRef, useState } from 'react'
import './Layout.css'
import { Home,Logout,Receipt } from '@mui/icons-material'
const DashboardLayout = () => {
	const navRef = useRef()
	const [ toggle, setToggle ] = useState(false)
	const toggleSideBar = () => {
		setToggle((toggle) => !toggle)
	}
	return (
		<main>
			<div className=" ">
				<div className={`${toggle ? `drawer-content` : `activeDrawer`}`}>
					<Outlet />
				</div>

				<aside className="flex ">
					<div
						className={`${toggle
							? `fixed overflow-y-scroll overflow-x-hidden drawwerLeftSide  h-screen text-lg font-semibold  bg-[#351E98] text-white`
							: `fixed overflow-y-scroll overflow-x-hidden sideBarActive h-screen text-lg font-semibold  bg-[#351E98] text-white`}`}
					>
						<div className="mb-5">
                        <Link to="/" className="shadow-md z-10">
							<h3 className="text-2xl font-bold mt-3 ml-3">T A Solutions </h3>
						</Link>
                        </div>
						
							
							<Link to="/dashboard">
									<div className="flex items-center dashboardItems">
                                    <FaHome className='dashboardIcon'/>
									<span>Dashboard</span>
                                    </div>
								</Link>

							<Accordion className="dashboardAccordion ">
								<AccordionSummary
									expandIcon={<ExpandMoreIcon  className="accordionExpandIcon" />}
									aria-controls="panel1a-content"
									id="panel1a-header"
								>
									<Typography >
										<div className="flex items-center justify-center">
											<FaCarAlt />
											<span className="ml-2">Vehicle Job Card</span>
										</div>
									</Typography>
								</AccordionSummary>
								<AccordionDetails >
									<Typography className='accordionTypoGrapy'>
										<span className="flex items-center">
											<FaPlus className="mr-2" />
											<Link to="/dashboard/addjob">Add job card</Link>
										</span>
									</Typography>
									<Typography className='accordionTypoGrapy'>
										<span className="flex items-center">
											<FaThLarge className="mr-2" />
											<Link to="/dashboard/jobcard-list">Job Card List</Link>
										</span>
									</Typography>
								</AccordionDetails>
							</Accordion>

							<Accordion className="dashboardAccordion">
								<AccordionSummary
									expandIcon={<ExpandMoreIcon className="accordionExpandIcon" />}
									aria-controls="panel1a-content"
									id="panel1a-header"
									className="dashboardAccordionSummary"
								>
									<Typography>
										<div className="flex items-center justify-center">
											<FaCarAlt />
											<span className="ml-2">Qutation Card</span>
										</div>
									</Typography>
								</AccordionSummary>
								<AccordionDetails >
									<Typography className='accordionTypoGrapy'>
										<span className="flex items-center">
											<FaPlus className="mr-2" />
											<Link to="/dashboard/qutation">Add Qutation Card</Link>
										</span>
									</Typography>
									<Typography className='accordionTypoGrapy'>
										<span className="flex items-center">
											<FaThLarge className="mr-2" />
											<Link to="/dashboard/qutation-view">View Qutation List</Link>
										</span>
									</Typography>
								</AccordionDetails>
							</Accordion>

							<Accordion className="dashboardAccordion">
								<AccordionSummary
									expandIcon={<ExpandMoreIcon className="accordionExpandIcon" />}
									aria-controls="panel1a-content"
									id="panel1a-header"
								>
									<Typography>
										<div className="flex items-center justify-center">
											<Receipt />
											<span className="ml-2">Invoice Card</span>
										</div>
									</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Typography className='accordionTypoGrapy'>
										<span className="flex items-center">
											<FaPlus className="mr-2" />
											<Link to="/dashboard/invoice">Add Invoice Card</Link>
										</span>
									</Typography>
									<Typography className='accordionTypoGrapy'>
										<span className="flex items-center">
											<FaThLarge className="mr-2" />
											<Link to="/dashboard/invoice-view">View Invoice List </Link>
										</span>
									</Typography>
								</AccordionDetails>
							</Accordion>

							<Accordion className="dashboardAccordion">
								<AccordionSummary
									expandIcon={<ExpandMoreIcon className="accordionExpandIcon" />}
									aria-controls="panel1a-content"
									id="panel1a-header"
								>
									<Typography className="accordionName">
										<div className="flex items-center justify-center">
											<FaProjectDiagram />
											<span className="ml-2"> Projects</span>
										</div>
									</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Typography className='accordionTypoGrapy'>
										<Link to="/dashboard/addjob">Running Project</Link>
									</Typography>
									<Typography className='accordionTypoGrapy'>Completed Project</Typography>
								</AccordionDetails>
							</Accordion>

							<Accordion className="dashboardAccordion">
								<AccordionSummary
									expandIcon={<ExpandMoreIcon className="accordionExpandIcon" />}
									aria-controls="panel1a-content"
									id="panel1a-header"
								>
									<Typography>
										<span className="flex items-center justify-center">
											<FaProductHunt />
											<span className="ml-2"> Product List </span>
										</span>
									</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Typography className='accordionTypoGrapy'>
										<Link to="/dashboard/product">All Product List </Link>
									</Typography>
								</AccordionDetails>
							</Accordion>
                            
							<Link to="/dashboard/services">
                            <div className="flex items-center dashboardItems">
                            <FaUserTie className='dashboardIcon'/>
								Customer List
                            </div>
							</Link>
							<Link to="/dashboard/expense">
                                <div className="flex items-center dashboardItems">
                                <FaCriticalRole className='dashboardIcon'/>
								<span> Expense </span>
                            </div>
							</Link>
							<Accordion className="dashboardAccordion">
								<AccordionSummary
									expandIcon={<ExpandMoreIcon className="accordionExpandIcon" />}
									aria-controls="panel1a-content"
									id="panel1a-header"
								>
									<Typography>
										<div className="flex items-center justify-center">
											<FaCriticalRole />
											<span className="ml-2">Role</span>
										</div>
									</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Typography className='accordionTypoGrapy'>
										<span className="flex items-center">
											<FaPlus className="mr-2" />
											<Link to="/dashboard/add-role">Add Role</Link>
										</span>
									</Typography>
									<Typography className='accordionTypoGrapy'>
										<span className="flex items-center">
											<FaThLarge className="mr-2" />
											<Link to="/dashboard/role">View Role</Link>
										</span>
									</Typography>
								</AccordionDetails>
							</Accordion>
							<Link to="/dashboard/services">
                            <div className="flex items-center dashboardItems">
                            <FaAlipay className='dashboardIcon' />
								<span> Bill Pay</span>
                            </div>
							</Link>

							<Link to="/dashboard/employee">
								<div className="flex items-center dashboardItems">
                                <FaUsers className='dashboardIcon'/>
								<span>Employee</span>
                                </div>
							</Link>
							<Link to="/dashboard/profile">
                            <div className="flex items-center dashboardItems">
                            <FaUsersCog className='dashboardIcon'/>
								<span> Profile</span>
                                </div>
								
							</Link>
							<Link to="/dashboard/services">
                            <div className="flex items-center dashboardItems">
                            <FaDatabase  className='dashboardIcon'/>
								<span> Data Backup </span>
                                </div>

								
							</Link>
							<Link to="/dashboard/services">
                            <div className="flex items-center dashboardItems">
                            <FaHeadset className='dashboardIcon'/>
								<span>Support</span>
                                </div>
								
							</Link>
								<Link to="/dashboard/services">
                                <div className="flex items-center dashboardItems">
                                <Logout className='dashboardIcon'/>
								<span>Log Out </span>
                                </div>

								
								</Link>
						
					</div>
					<div className={`${toggle ? `activeToggle` : `active`}`} ref={navRef} onClick={toggleSideBar}>
						<span className="bar" />
						<span className="bar" />
						<span className="bar" />
					</div>
					<div className={`${toggle ? `rightSideBarWrap` : `activeRightSideBarWrap`}`}>
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
		</main>
	)
}

export default DashboardLayout
