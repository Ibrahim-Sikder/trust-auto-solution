/* eslint-disable no-unused-vars */
import { NotificationAdd } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaTrashAlt,
  FaEdit,
  FaArrowRight,
  FaArrowLeft,
  FaEye,
  FaFileInvoice,
} from "react-icons/fa";
import { FaUserGear } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import swal from "sweetalert";
const MoneyReceiptList = () => {
 
  const [getMoneyReceipt, setGetMoneyReceipt] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [noMatching, setNoMatching] = useState(null);
  const navigate = useNavigate();

  const handleIconPreview = async (e) => {
    navigate(`/dashboard/money-receipt-view?id=${e}`);
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/v1/money_receipt`)
      .then((res) => res.json())
      .then((data) => {
        setGetMoneyReceipt(data.moneyReceipt);
      });
  }, []);

  // pagination

  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(
    Number(sessionStorage.getItem("q_n")) || 1
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
          `${import.meta.env.VITE_API_URL}/api/v1/money_receipt/${id}`,
          {
            method: "DELETE",
          }
        );
        const data = await res.json();

        if (data.message == "MoneyReceipt delete successful") {
          setGetMoneyReceipt(getMoneyReceipt?.filter((pkg) => pkg._id !== id));
        }
        swal("Deleted!", "Card delete successful.", "success");
      } catch (error) {
        swal("Error", "An error occurred while deleting the card.", "error");
      }
    }
  };

  useEffect(() => {
    sessionStorage.setItem("q_n", currentPage.toString());
  }, [currentPage]);
  // ...

  useEffect(() => {
    const storedPage = Number(sessionStorage.getItem("q_n")) || 1;
    setCurrentPage(storedPage);
    setMaxPageNumberLimit(
      Math.ceil(storedPage / pageNumberLimit) * pageNumberLimit
    );
    setMinPageNumberLimit(
      Math.ceil(storedPage / pageNumberLimit - 1) * pageNumberLimit
    );
  }, [pageNumberLimit]);

  // ...

  const handleClick = (e) => {
    const pageNumber = Number(e.target.id);
    setCurrentPage(pageNumber);
    sessionStorage.setItem("q_n", pageNumber.toString());
  };
  const pages = [];
  for (let i = 1; i <= Math.ceil(getMoneyReceipt?.length / limit); i++) {
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
  if (Array.isArray(getMoneyReceipt)) {
    currentItems = getMoneyReceipt?.slice(startIndex, lastIndex);
  } else {
    currentItems = [];
  }

  const renderData = (getMoneyReceipt) => {
    return (
      <table className="table">
        <thead className="tableWrap">
          <tr>
            <th>SL No</th>
            <th>Received with thanks from</th>
            <th>Final Payment against bill no</th>
            <th>Vehicle No </th>
            <th>Check Number </th>
            <th>Bank</th>
            <th>Total Amount</th>
            <th colSpan={3}>Action</th>
          </tr>
        </thead>
        <tbody>
          {getMoneyReceipt?.map((card, index) => (
            <tr key={card._id}>
              <td>{index + 1}</td>
              <td>{card.thanks_from}</td>
              <td>{card.against_bill_no}</td>
              <td>{card.vehicle_no}</td>
              <td> {card.cheque_no} </td>
              <td> {card.bank} </td>
              <td>{card.date_one}</td>
              <td>
                <div
                  onClick={() => handleIconPreview(card._id)}
                  className="editIconWrap edit2"
                >
                  {/* <Link to="/dashboard/preview"> */}
                  <FaEye className="editIcon" />
                  {/* </Link> */}
                </div>
              </td>
              <td>
                <div className="editIconWrap edit">
                  <Link to={`/dashboard/money-receipt-update?id=${card._id}`}>
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
    sessionStorage.setItem("q_n", newPage.toString());

    if (newPage % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  const handleNext = () => {
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
    sessionStorage.setItem("q_n", newPage.toString());

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
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/money_receipt/all`,
        data
      );
    
      if (response.data.message === "Filter successful") {
        setGetMoneyReceipt(response.data.result);
        setNoMatching(null);
      }
      if (response.data.message === "No matching found") {
        setGetMoneyReceipt([])
        setNoMatching(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong")
    }
  };

  const handleAllMoneyReceipt = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/v1/money_receipt`)
      .then((res) => res.json())
      .then((data) => {
        setGetMoneyReceipt(data.moneyReceipt);
        setNoMatching(null);
      });
  };

  return (
    <div className="mt-5 overflow-x-auto">
      <div className="flex flex-wrap justify-end pb-3 border-b-2">
       
        <div className="flex items-end justify-end">
          <NotificationAdd size={30} className="mr-2" />
          <FaUserGear size={30} />
        </div>
      </div>
      <div className="flex items-center justify-between mt-5 mb-8">
        <div className="flex flex-wrap items-center justify-center">
          <FaFileInvoice className="invoicIcon" />
          <div className="ml-2">
            <h3 className="text-sm font-bold md:text-2xl"> Money Receipt </h3>
            <span>Manage Money Receipt </span>
          </div>
        </div>
        <div className="productHome">
          <span>Home / </span>
          <span>Money / </span>
          <span> Money receipt </span>
        </div>
      </div>

      <div className="flex-wrap flex items-center justify-between mb-5 bg-[#F1F3F6] py-5 px-3">
        <h3 className="mb-3 text-xl font-bold md:text-3xl">Money Receipt List:</h3>
        <div className="flex items-center searcList">
          <div
            onClick={handleAllMoneyReceipt}
            className="mx-6 font-semibold cursor-pointer"
          >
            All
          </div>
           
          <div className="searchGroup">
            <input
              onChange={(e) => setFilterType(e.target.value)}
              autoComplete="off"
              type="text"
             
            />
          </div>
          <button onClick={handleFilterType} className="SearchBtn ">
            Search{" "}
          </button>
        </div>
      </div>

      <div>
        {getMoneyReceipt?.length === 0 || currentItems.length === 0 ? (
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
                    currentPage === pages[0] ? "text-gray-600" : "text-gray-300"
                  }
                >
                  Previous
                </button>
                <span className={minPageNumberLimit < 5 ? "hidden" : "inline"}>
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
    </div>
  );
};

export default MoneyReceiptList;
