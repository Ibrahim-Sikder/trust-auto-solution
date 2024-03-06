/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { FaTrashAlt, FaEdit, FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineSearch } from "react-icons/hi";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../../../../components/Loading/Loading";
const CustomerInvoiceList = ({ invoiceData, setInvoiceData, id }) => {
  // const jobData = [
  //   {
  //     id: 1,
  //     customerName: "Rahim Ullah",
  //     carNumber: "33566",
  //   },
  //   {
  //     id: 1,
  //     customerName: "Rahim Ullah",
  //     carNumber: "33566",
  //   },
  //   {
  //     id: 1,
  //     customerName: "Rahim Ullah",
  //     carNumber: "33566",
  //   },
  //   {
  //     id: 1,
  //     customerName: "Rahim Ullah",
  //     carNumber: "33566",
  //   },
  //   {
  //     id: 1,
  //     customerName: "Rahim Ullah",
  //     carNumber: "33566",
  //   },
  //   {
  //     id: 1,
  //     customerName: "Rahim Ullah",
  //     carNumber: "33566",
  //   },
  // ];

  const [filterType, setFilterType] = useState("");
  const [noMatching, setNoMatching] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleIconPreview = async (e) => {
    navigate(`/dashboard/detail?id=${e}`);
  };

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
          `http://localhost:5000/api/v1/invoice/one/${id}`,
          {
            method: "DELETE",
          }
        );
        const data = await res.json();

        if (data.message == "Invoice card delete successful") {
          setInvoiceData(invoiceData?.filter((pkg) => pkg._id !== id));
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
  for (let i = 1; i <= Math.ceil(invoiceData?.length / limit); i++) {
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
  if (Array.isArray(invoiceData)) {
    currentItems = invoiceData?.slice(startIndex, lastIndex);
  } else {
    currentItems = [];
  }

  const renderData = (invoiceData) => {
    return (
      <div className="px-5 py-14 bg-[#F1F3F6] ">
        <table className="table bg-[#fff]">
          <thead className="tableWrap">
            <tr>
              <th>SL No</th>
              <th>Customer Name</th>
              <th>Order Number </th>
              <th>Car Number </th>
              <th>Mobile Number</th>
              <th>Date</th>
              <th colSpan={3}>Action</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData?.map((card, index) => (
              <tr key={card._id}>
                <td>{index + 1}</td>
                <td>{card.customer_name}</td>
                <td>{card.job_no}</td>
                <td>{card.car_registration_no}</td>
                <td> {card.contact_number} </td>
                <td>{card.date}</td>
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
                    <Link to={`/dashboard/update-invoice?id=${card._id}`}>
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
      </div>
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
        className="cursor-pointer text-black pl-1"
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
        className="cursor-pointer text-black pr-1"
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
        `http://localhost:5000/api/v1/invoice/all`,
        data
      );

      if (response.data.message === "Filter successful") {
        setInvoiceData(response.data.result);
        setNoMatching(null);
        setLoading(false);
      }
      if (response.data.message === "No matching found") {
        setNoMatching(response.data.message);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handleAllInvoice = () => {
    try {
      fetch(`http://localhost:5000/api/v1/invoice/${id}`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "success") {
            setInvoiceData(data.jobCard);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle errors
        });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className=" mb-24 mt-10 w-full">
      {invoiceData.length > 0 && (
        <div className="flex items-center justify-between mb-5 bg-[#F1F3F6] py-5 px-3">
          <Link to="/dashboard/invoice">
            <button className="bg-[#42A1DA] text-white px-2 py-3 rounded-sm ">
              Add Invoice
            </button>
          </Link>
          <div className="flex items-center searcList">
            <div
              onClick={handleAllInvoice}
              className="mx-6 font-semibold cursor-pointer bg-[#42A1DA] px-2 py-1 rounded-md text-white"
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
      )}

      {loading ? (
        <div className="flex justify-center items-center text-xl">
          <Loading />
        </div>
      ) : (
        <div>
          {invoiceData?.length === 0 || currentItems.length === 0 ? (
            <div className="text-xl text-center flex justify-center items-center h-full">
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

export default CustomerInvoiceList;
