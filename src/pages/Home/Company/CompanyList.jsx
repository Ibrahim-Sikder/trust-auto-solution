/* eslint-disable no-unused-vars */
import { FaTrashAlt, FaEdit, FaUserTie } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { NotificationAdd } from "@mui/icons-material";
import { FaUserGear } from "react-icons/fa6";
import { HiOutlineSearch, HiOutlineUserGroup } from "react-icons/hi";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import Loading from "../../../components/Loading/Loading";
import HeaderButton from "../../../components/CommonButton/HeaderButton";
const CompanyList = () => {
  const [filterType, setFilterType] = useState("");
  const [companyData, setCompanyData] = useState([]);

  const [noMatching, setNoMatching] = useState(null);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  const navigate = useNavigate();
  const handleIconPreview = async (e) => {
    navigate(`/dashboard/company-profile?id=${e}`);
  };

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/v1/company`)
      .then((res) => res.json())
      .then((data) => {
        setCompanyData(data);
        setLoading(false);
      });
  }, [reload]);

  // pagination

  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(
    Number(sessionStorage.getItem("com")) || 1
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
          `${import.meta.env.VITE_API_URL}/api/v1/company/one/${id}`,
          {
            method: "DELETE",
          }
        );
        const data = await res.json();

        if (data.message == "Company card delete successful") {
          setCompanyData(companyData?.filter((pkg) => pkg._id !== id));
        }
        swal("Deleted!", "Card delete successful.", "success");
      } catch (error) {
        swal("Error", "An error occurred while deleting the card.", "error");
      }
    }
  };

  useEffect(() => {
    sessionStorage.setItem("com", currentPage.toString());
  }, [currentPage]);

  useEffect(() => {
    const storedPage = Number(sessionStorage.getItem("com")) || 1;
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
    sessionStorage.setItem("com", pageNumber.toString());
  };
  const pages = [];
  for (let i = 1; i <= Math.ceil(companyData?.length / limit); i++) {
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
  if (Array.isArray(companyData)) {
    currentItems = companyData.slice(startIndex, lastIndex);
  } else {
    currentItems = [];
  }

  const renderData = (companyData) => {
    return (
      <table className="table">
        <thead className="tableWrap">
          <tr>
            <th>SL No</th>
            <th>Company ID</th>
            <th>Customer Name</th>

            <th>Car Number </th>
            <th>Mobile Number</th>
            <th>Date</th>
            <th colSpan={3}>Action</th>
          </tr>
        </thead>
        <tbody>
          {companyData?.map((card, index) => (
            <tr key={card._id}>
              <td>{index + 1}</td>
              <td>{card.companyId}</td>
              <td>{card.company_name}</td>
              <td>{card.car_registration_no}</td>
              <td> {card.company_contact} </td>

              <td>
                <div
                  onClick={() => handleIconPreview(card.companyId)}
                  className="flex items-center justify-center cursor-pointer"
                >
                  <FaUserTie size={25} className="" />
                </div>
              </td>

              <td>
                <div className="editIconWrap edit">
                  <Link to={`/dashboard/update-company?id=${card._id}`}>
                    <FaEdit className="editIcon" />
                  </Link>
                </div>
              </td>
              <td>
                <div
                  onClick={() => deletePackage(card._id)}
                  className="editIconWrap"
                >
                  <FaTrashAlt className="deleteIcon" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const handlePrevious = () => {
    const newPage = currentPage - 1;
    setCurrentPage(newPage);
    sessionStorage.setItem("com", newPage.toString());

    if (newPage % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  const handleNext = () => {
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
    sessionStorage.setItem("com", newPage.toString());

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
      setSearchLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/company/all`,
        data
      );

      if (response.data.message === "Filter successful") {
        setCompanyData(response.data.result);
        setNoMatching(null);
        setSearchLoading(false);
      }
      if (response.data.message === "No matching found") {
        setNoMatching(response.data.message);
        setSearchLoading(false);
      }
    } catch (error) {
      setSearchLoading(false);
    }
  };

  const handleAllCustomer = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/v1/company`)
      .then((res) => res.json())
      .then((data) => {
        setCompanyData(data);
        setNoMatching(null);
      });
  };

  return (
    <div className="w-full mt-5 mb-24">
     <div className="flex justify-between pb-3 border-b-2 px-2">
        <HeaderButton/>
        <div className="flex items-end justify-end">
          <NotificationAdd size={30} className="mr-2" />
          <FaUserGear size={30} />
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between my-3 mb-8">
        <div className="flex items-center justify-center ">
          <HiOutlineUserGroup className="invoicIcon" />
          <div className="ml-2">
            <h3 className="text-2xl font-bold"> Company </h3>
            <span>Manage Company </span>
          </div>
        </div>
        <div className="mt-2 productHome md:mt-0">
          <span>Home / </span>
          <span>Company / </span>
          <span>New Company </span>
        </div>
      </div>
      <div className="flex-wrap flex items-center justify-between mb-5 bg-[#F1F3F6] py-5 px-3">
        <h3 className="mb-3 text-xl font-bold md:text-3xl"> Company List:</h3>
        <div className="flex items-center">
          <button
            onClick={handleAllCustomer}
            className="mx-6 font-semibold cursor-pointer bg-[#42A1DA] px-3 py-2 rounded-md text-white"
          >
            All
          </button>

          <input
            type="text"
            placeholder="Search"
            className="border py-2 px-3 rounded-md border-[#ddd]"
            onChange={(e) => setFilterType(e.target.value)}
          />
          <button
            onClick={handleFilterType}
            className="bg-[#42A1DA] text-white px-2 py-2 rounded-sm ml-1"
          >
            {" "}
            <HiOutlineSearch size={22} />
          </button>
        </div>
      </div>

      {searchLoading ? (
        <div className="flex flex-wrap items-center justify-center text-xl">
          <Loading />
        </div>
      ) : (
        <div>
          {companyData?.length === 0 ||
          currentItems.length === 0 ||
          noMatching ? (
            <div className="flex items-center justify-center h-full text-xl text-center">
              No matching card found.
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
  );
};

export default CompanyList;
