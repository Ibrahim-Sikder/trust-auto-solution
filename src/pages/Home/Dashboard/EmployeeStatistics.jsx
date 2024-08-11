
import { FaRegUser } from 'react-icons/fa';
import { HiOutlineArrowNarrowRight, HiOutlineCheckCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { CircularProgressbar } from "react-circular-progressbar";


const EmployeeStatistics = () => {
    return (
        <>
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
        </>
    );
};

export default EmployeeStatistics;