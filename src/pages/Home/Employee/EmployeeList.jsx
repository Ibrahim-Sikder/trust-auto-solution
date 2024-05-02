/* eslint-disable no-unused-vars */
import { FaUsers } from "react-icons/fa";
import { NotificationAdd } from "@mui/icons-material";
import { FaUserGear } from "react-icons/fa6";
import "./Employee.css";
import avatar from "../../../../public/assets/avatar.jpg";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import { toast } from "react-toastify";

const EmployeeList = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [getAllEmployee, setGetAllEmployee] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [noMatching, setNoMatching] = useState(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/v1/employee`)
      .then((response) => {
        setGetAllEmployee(response.data.employee);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  // pagination

  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(
    Number(sessionStorage.getItem("supplier")) || 1
  );
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const deletePackage = async (id) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this card?",
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/employee/one/${id}`,
          {
            method: "DELETE",
          }
        );
        const data = await res.json();

        if (data.message == "Employee delete successful") {
          setGetAllEmployee(getAllEmployee?.filter((pkg) => pkg._id !== id));
          setReload(!reload);
        }
        swal("Deleted!", "Card delete successful.", "success");
      } catch (error) {
        swal("Error", "An error occurred while deleting the card.", "error");
      }
    }
  };

  useEffect(() => {
    sessionStorage.setItem("supplier", currentPage.toString());
  }, [currentPage]);

  useEffect(() => {
    const storedPage = Number(sessionStorage.getItem("supplier")) || 1;
    setCurrentPage(storedPage);
    setMaxPageNumberLimit(
      Math.ceil(storedPage / pageNumberLimit) * pageNumberLimit
    );
    setMinPageNumberLimit(
      Math.ceil(storedPage / pageNumberLimit - 1) * pageNumberLimit
    );
  }, [pageNumberLimit]);

  const handleClick = (e) => {
    const pageNumber = Number(e.target.id);
    setCurrentPage(pageNumber);
    sessionStorage.setItem("supplier", pageNumber.toString());
  };
  const pages = [];
  for (let i = 1; i <= Math.ceil(getAllEmployee?.length / limit); i++) {
    pages.push(i);
  }

  const renderPagesNumber = pages?.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={
            currentPage === number
              ? "bg-green-500 text-white px-3 rounded-md cursor-pointer"
              : "cursor-pointer text-black border border-green-500 px-3 rounded-md"
          }
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const lastIndex = currentPage * limit;
  const startIndex = lastIndex - limit;

  let currentItems;
  if (Array.isArray(getAllEmployee)) {
    currentItems = getAllEmployee?.slice(startIndex, lastIndex);
  } else {
    currentItems = [];
  }

  const renderData = (getAllEmployee) => {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2  gap-5">
        {getAllEmployee.map((employee) => (
          <Link key={employee._id} to={`/dashboard/employee-profile?id=${employee._id}`}>
            <div className="employeeCard">
              <div>
                <img className="employeeCardImg" src={employee?.image} alt="" />
                <h3 className="text-xl font-semibold">
                  {employee?.full_name}{" "}
                </h3>
                <p>{employee?.designation}</p>

                <div className="flex items-center justify-center">
                  <span>See More </span>
                  <HiOutlineArrowNarrowRight className="ml-1 " />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  };

  const handlePrevious = () => {
    const newPage = currentPage - 1;
    setCurrentPage(newPage);
    sessionStorage.setItem("supplier", newPage.toString());

    if (newPage % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  const handleNext = () => {
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
    sessionStorage.setItem("supplier", newPage.toString());

    if (newPage > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages?.length > maxPageNumberLimit) {
    pageIncrementBtn = (
      <li
        onClick={() => handleClick({ target: { id: maxPageNumberLimit + 1 } })}
        className="pl-1 text-black cursor-pointer"
      >
        &hellip;
      </li>
    );
  }

  let pageDecrementBtn = null;
  if (currentPage > pageNumberLimit) {
    pageDecrementBtn = (
      <li
        onClick={() => handleClick({ target: { id: minPageNumberLimit } })}
        className="pr-1 text-black cursor-pointer"
      >
        &hellip;
      </li>
    );
  }

  const handleFilterType = async () => {
    try {
      const data = {
        filterType,
      };
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/employee/all`,
        data
      );

      if (response.data.message === "Filter successful") {
        setGetAllEmployee(response.data.result);
        setNoMatching(null);
        setLoading(false);
      }
      if (response.data.message === "No matching found") {
        setNoMatching(response.data.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handleAllEmployee = () => {
    try {
      fetch(`${import.meta.env.VITE_API_URL}/api/v1/employee`)
        .then((res) => res.json())
        .then((data) => {
          setGetAllEmployee(data.employee);
          setNoMatching(null);
        });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full mt-5 mb-24">
      <div className="flex justify-end pb-3 border-b-2">
        <div className="flex items-end justify-end">
          <NotificationAdd size={30} className="mr-2" />
          <FaUserGear size={30} />
        </div>
      </div>
      <div className="block md:flex items-center justify-between my-3 mb-8">
        <div className="flex items-center justify-center ">
          <FaUsers size={70} className="invoicIcon" />
          <div className="ml-2">
            <h3 className="text-2xl font-bold"> Employee </h3>
            <span> Manage Customer </span>
          </div>
        </div>
        <div className="productHome">
          <span> Home / </span> <span> Employee / </span>
          <span> New Employee </span>
        </div>
      </div>
      <div className="employeeCardWraps">
        <div className="mt-20 overflow-x-auto">
          <div className="md:flex block  items-center justify-between mb-5">
            <h3 className="mb-3 text-sm font-bold lg:text-3xl">
              Employee List:
            </h3>
            <div className="flex items-center searcList">
             <button onClick={handleAllEmployee} className="btn btn-sm mr-1">All</button>
              <div className="searchGroup">
                <input
                  onChange={(e) => setFilterType(e.target.value)}
                  autoComplete="off"
                  type="text"
                  placeholder="Search"
                />
              </div>
              <button onClick={handleFilterType} className="SearchBtn ">
                Search{" "}
              </button>
            </div>
          </div>
        </div>
        <div className="text-sm text-red-400 py-2">{error}</div>
        {loading ? (
          <div className="flex items-center justify-center text-xl">
            Loading...
          </div>
        ) : (
          <div>
            {getAllEmployee?.length === 0 || currentItems.length === 0 ? (
              <div className="flex items-center justify-center h-full text-xl text-center">
                No matching suppliers found.
              </div>
            ) : (
              <>
                <section>
                  {renderData(currentItems)}
                  <ul
                    className={
                      minPageNumberLimit < 5
                        ? "flex justify-center gap-2 md:gap-4 pb-5 mt-6"
                        : "flex justify-center gap-[5px] md:gap-2 pb-5 mt-6"
                    }
                  >
                    <button
                      onClick={handlePrevious}
                      disabled={currentPage === pages[0] ? true : false}
                      className={
                        currentPage === pages[0]
                          ? "text-gray-600"
                          : "text-gray-300"
                      }
                    >
                      Previous
                    </button>
                    <span
                      className={minPageNumberLimit < 5 ? "hidden" : "inline"}
                    >
                      {pageDecrementBtn}
                    </span>
                    {renderPagesNumber}
                    {pageIncrementBtn}
                    <button
                      onClick={handleNext}
                      disabled={
                        currentPage === pages[pages?.length - 1] ? true : false
                      }
                      className={
                        currentPage === pages[pages?.length - 1]
                          ? "text-gray-700"
                          : "text-gray-300 pl-1"
                      }
                    >
                      Next
                    </button>
                  </ul>
                </section>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;
