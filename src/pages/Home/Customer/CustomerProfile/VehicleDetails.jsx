/* eslint-disable no-unused-vars */
import { FaCarSide, FaEye } from "react-icons/fa";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import { HiOutlinePlus, HiOutlineSearch } from "react-icons/hi";
import AddVehicleModal from "./AddVehicleModal";
import VehicleDetailsModal from "./VehicleDetailsModal";
import axios from "axios";
import Loading from "../../../../components/Loading/Loading";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const VehicleDetails = () => {
   

  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const [open, setOpen] = useState(false);
  const [vehicleDetails, setVehicleDetails] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [getId, setGetId] = useState("");
  const handVehicleDetailsOpen = (id) => {
    setVehicleDetails(true);
    setGetId(id);
  };
  const handleVehicleDetailsClose = () => setVehicleDetails(false);


  const [vehicleList, setVehicleList] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [filterType, setFilterType] = useState("");
  const [noMatching, setNoMatching] = useState(null);

  useEffect(() => {
    try {
      fetch(`http://localhost:5000/api/v1/vehicle/${id}`)
        .then((res) => res.json())
        .then((data) => setVehicleList(data));
    } catch (error) {
      toast.error(error.message)
    }
  }, [id]);

  // pagination

  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(
    Number(sessionStorage.getItem("com")) || 1
  );
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  // const deletePackage = async (id) => {
  //   const willDelete = await swal({
  //     title: "Are you sure?",
  //     text: "Are you sure that you want to delete this card?",
  //     icon: "warning",
  //     dangerMode: true,
  //   });

  //   if (willDelete) {
  //     try {
  //       const res = await fetch(
  //         `http://localhost:5000/api/v1/company/one/${id}`,
  //         {
  //           method: "DELETE",
  //         }
  //       );
  //       const data = await res.json();

  //       if (data.message == "Company card delete successful") {
  //         setVehicleList(vehicleList?.filter((pkg) => pkg._id !== id));
  //       }
  //       swal("Deleted!", "Card delete successful.", "success");
  //     } catch (error) {
  //       swal("Error", "An error occurred while deleting the card.", "error");
  //     }
  //   }
  // };

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
  for (let i = 1; i <= Math.ceil(vehicleList?.length / limit); i++) {
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
  if (Array.isArray(vehicleList)) {
    currentItems = vehicleList.slice(startIndex, lastIndex);
  } else {
    currentItems = [];
  }

  const renderData = (vehicleList) => {
    return (
      <table className="table">
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
          {vehicleList?.map((card, index) => (
            <tr key={card._id}>
              <td>{index + 1}</td>
              <td>{card.company_name}</td>

              <td>{card.car_registration_no}</td>
              <td> {card.company_contact} </td>
              <td>{card.date}</td>
              <td>
                <div
                  onClick={() => handVehicleDetailsOpen(card.customerId)}
                  className="editIconWrap edit2"
                >
                  <FaEye />
                </div>
              </td>

              {/*               
             <td>
               <div
                 onClick={() => deletePackage(card._id)}
                 className="editIconWrap"
               >
                 <FaTrashAlt className="deleteIcon" />
               </div>
             </td> */}
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
        `http://localhost:5000/api/v1/vehicle/all`,
        data
      );

      if (response.data.message === "Filter successful") {
        setVehicleList(response.data.result);
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
    fetch(`http://localhost:5000/api/v1/vehicle/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setVehicleList(data);
        setNoMatching(null);
      });
  };

  return (
    <div className="w-full mt-10 mb-24 ">
      <div className="flex-wrap flex items-center justify-between mb-5 bg-[#F1F3F6] py-5 px-3">
        <div className="flex items-center">
          <FormControl className="selectForm">
            <InputLabel id="demo-simple-select-label">
              Page
            </InputLabel>
            <Select
              className="selectForm"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              onChange={(e) => setLimit(e.target.value)}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
          </FormControl>
          <div>
            <button
              onClick={handleOpen}
              className="bg-[#42A1DA] text-white px-2 py-2 rounded-sm ml-2"
            >
              <HiOutlinePlus size={40} />
            </button>
          </div>
        </div>
        <div className="flex items-center mt-3 md:mt-0">
          <button
            onClick={handleAllCustomer}
            className="hidden md:block none mx-6 font-semibold cursor-pointer bg-[#42A1DA] px-2 py-1 rounded-md text-white"
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
        <div className="flex items-center justify-center text-xl">
          <Loading />
        </div>
      ) : (
        <div>
          {vehicleList?.length === 0 ||
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
      {open && <AddVehicleModal open={open} onClose={handleClose} />}
      {vehicleDetails && (
        <VehicleDetailsModal
          handVehicleDetailsOpen={handVehicleDetailsOpen}
          handleVehicleDetailsClose={handleVehicleDetailsClose}
          getId={getId}
        />
      )}
    </div>
  );
};

export default VehicleDetails;
