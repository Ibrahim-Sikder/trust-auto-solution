/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */

import TextField from "@mui/material/TextField";
import { FaTrashAlt, FaEdit, FaUserTie } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Autocomplete } from "@mui/material";
import {
  carBrands,
  cmDmOptions,
  fuelType,
  vehicleTypes,
} from "../../../constant";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import swal from "sweetalert";
import Loading from "../../../components/Loading/Loading";
import { HiOutlineSearch, HiOutlineUserGroup } from "react-icons/hi";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";

const AddCustomer = () => {
  const [filterType, setFilterType] = useState("");
  const [customerData, setCustomerData] = useState([]);
  const [noMatching, setNoMatching] = useState(null);

  // const [brand, setBrand] = useState("");
  // const [category, setCategory] = useState("");
  // const [getFuelType, setGetFuelType] = useState("");
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    // const uniqueId = 'Id_' + Math.random().toString(36).substr(2, 9);
    const customerNamePrefix = data.customer_name.substring(0, 4);
    const randomNumber = Math.floor(Math.random() * 1000); // Generates a number between 0 and 999
    const paddedNumber = randomNumber.toString().padStart(4, "0"); // Ensures the number is 3 digits long

    // Concatenate the name and the number to form the unique ID
    const uniqueId = `${customerNamePrefix}${paddedNumber}`;
    data.customerId = uniqueId;
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/customer",
        data
      );

      if (response.data.message === "Successfully add to customer post") {
        setReload(!reload);
        Cookies.set("trust_auto_id", response.data.result.customerId);
        Cookies.set("customer_type", "customer");
        navigate("/dashboard/customer-list");
        toast.success("Successfully add to customer post");
        setLoading(false);
        reset();
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  // const handleBrandChange = (_, newInputValue) => {
  //   setBrand(newInputValue);
  // };
  // const handleCategoryChange = (_, newInputValue) => {
  //   setCategory(newInputValue);
  // };
  // const handleFuelChange = (_, newInputValue) => {
  //   setGetFuelType(newInputValue);
  // };

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/v1/customer`)
      .then((res) => res.json())
      .then((data) => {
        setCustomerData(data);

        setLoading(false);
      });
  }, [reload]);

  const handleIconPreview = async (e) => {
    console.log(e);
    navigate(`/dashboard/customer-profile?id=${e}`);
  };

  //  show data

  // pagination

  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(
    Number(sessionStorage.getItem("cust")) || 1
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
          `http://localhost:5000/api/v1/customer/one/${id}`,
          {
            method: "DELETE",
          }
        );
        const data = await res.json();

        if (data.message == "Customer card delete successful") {
          setCustomerData(customerData?.filter((pkg) => pkg._id !== id));
        }
        swal("Deleted!", "Card delete successful.", "success");
      } catch (error) {
        swal("Error", "An error occurred while deleting the card.", "error");
      }
    }
  };

  useEffect(() => {
    sessionStorage.setItem("cust", currentPage.toString());
  }, [currentPage]);

  useEffect(() => {
    const storedPage = Number(sessionStorage.getItem("cust")) || 1;
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
    sessionStorage.setItem("cust", pageNumber.toString());
  };
  const pages = [];
  for (let i = 1; i <= Math.ceil(customerData?.length / limit); i++) {
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
  if (Array.isArray(customerData)) {
    currentItems = customerData.slice(startIndex, lastIndex);
  } else {
    currentItems = [];
  }

  const renderData = (customerData) => {
    return (
      <table className="table">
        <thead className="tableWrap">
          <tr>
            <th>SL No</th>
            <th>Customer Name</th>
            <th>Order Number </th>
            <th>Car Number </th>
            <th>Mobile Number</th>
            <th colSpan={3}>Action</th>
          </tr>
        </thead>
        <tbody>
          {customerData?.map((card, index) => (
            <tr key={card._id}>
              {/* <td>{index + 1}</td> */}
              <td>{card.customerId}</td>
              <td>{card.customer_name}</td>

              <td>{card.car_registration_no}</td>
              <td> {card.customer_contact} </td>
              <td>{card.date}</td>
              <td>

              <div 
              onClick={() => handleIconPreview(card.customerId)}
              className="flex items-center justify-center ">
              <Link to="/dashboard/employee-profile">
                <FaUserTie size={25} className="" />
              </Link>
            </div>


               
              </td>

              <td>
                <div className="editIconWrap edit">
                  <Link to={`/dashboard/update-customer?id=${card._id}`}>
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
    sessionStorage.setItem("cust", newPage.toString());

    if (newPage % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  const handleNext = () => {
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
    sessionStorage.setItem("cust", newPage.toString());

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

  console.log(filterType);
  const handleFilterType = async () => {
    try {
      const data = {
        filterType,
      };
      setSearchLoading(true);
      const response = await axios.post(
        `http://localhost:5000/api/v1/customer/all`,
        data
      );

      if (response.data.message === "Filter successful") {
        setCustomerData(response.data.result);
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
    fetch(`http://localhost:5000/api/v1/customer`)
      .then((res) => res.json())
      .then((data) => {
        setCustomerData(data);
        setNoMatching(null);
      });
  };

  return (
    <section>
      <div className=" addProductWraps">
        <div className="flex items-center mr-[80px]  justify-end topProductBtn">
          <Link to="/dashboard/addjob">
            <button> Add Job </button>
          </Link>
          <Link to="/dashboard/qutation">
            <button>Qutation </button>
          </Link>
          <Link to="/dashboard/invoice">
            <button>Invoice </button>
          </Link>
        </div>
        <div className="productHeadWrap">
          <div className="flex flex-wrap items-center justify-center">
            <HiOutlineUserGroup className="invoicIcon" />
            <div className="ml-2">
              <h3 className="text-sm font-bold md:text-2xl"> New Customer </h3>
              <span>Add New Customer </span>
            </div>
          </div>
          <div className="productHome">
            <span>Home / </span>
            <span>Product / </span>
            <span>New Customer </span>
          </div>
        </div>

        <div className="addProductWrap">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="addCustomerInputFieldWrap">
              <div>
                <h3 className="mb-1 text-xl font-bold">
                  Customer Information{" "}
                </h3>
                <div>
                  <TextField
                    className="productField"
                    on
                    label="Company Name (T)"
                    {...register("company_name")}
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    onC
                    label="Vehicle User Name (T)"
                    {...register("username")}
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    on
                    label="Company Address (T)"
                    {...register("company_address")}
                  />
                </div>

                <div>
                  <TextField
                    className="productField"
                    onC
                    label="Customer Name (T)"
                    {...register("customer_name")}
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="Customer Contact No (N)"
                    {...register("customer_contact", {
                      pattern: {
                        value: /^\d{11}$/,
                        message: "Please enter a valid number.",
                      },
                    })}
                  />
                  {errors.customer_contact && (
                    <span className="text-sm text-red-400">
                      {errors.customer_contact.message}
                    </span>
                  )}
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="Customer Email Address (T)"
                    {...register("customer_email")}
                    type="email"
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="Customer Address (T) "
                    {...register("customer_address")}
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    o
                    label="Driver Name (T)"
                    {...register("driver_name")}
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="Driver Contact No (N)"
                    {...register("driver_contact", {
                      pattern: {
                        value: /^\d{11}$/,
                        message: "Please enter a valid number.",
                      },
                    })}
                  />
                  {errors.driver_contact && (
                    <span className="text-sm text-red-400">
                      {errors.driver_contact.message}
                    </span>
                  )}
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="Reference Name (T) "
                    {...register("reference_name")}
                  />
                </div>
              </div>

              <div className="mt-5 lg:mt-0">
                <h3 className="mb-2 text-xl font-bold">Vehicle Information </h3>
                <div className="flex items-center mt-1 productField">
                  <Autocomplete
                    className="jobCardSelect"
                    id="reg"
                    Car
                    Registration
                    No
                    options={cmDmOptions.map((option) => option.label)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Car Reg No"
                        {...register("carReg_no")}
                      />
                    )}
                  />
                  <TextField
                    className="carRegNumbers"
                    label="Car R (T&N)"
                    {...register("car_registration_no")}
                  />
                </div>

                <div>
                  <TextField
                    className="productField"
                    label="Chassis No (T&N)"
                    {...register("chassis_no")}
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="ENGINE NO & CC (T&N) "
                    {...register("engine_no")}
                  />
                </div>

                <div>
                  <Autocomplete
                    className="productField"
                    id="free-solo-demo"
                    Vehicle
                    Brand
                    options={carBrands.map((option) => option.label)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Vehicle Brand"
                        {...register("vehicle_brand")}
                      />
                    )}
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="Vehicle Name "
                    {...register("vehicle_name")}
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="Vehicle Model (N)"
                    {...register("vehicle_model", {
                      pattern: {
                        value: /^\d+$/,
                        message: "Please enter a valid model number.",
                      },
                    })}
                  />
                  {errors.vehicle_model && (
                    <span className="text-sm text-red-400">
                      {errors.vehicle_model.message}
                    </span>
                  )}
                </div>
                <div>
                  <Autocomplete
                    className="productField"
                    Vehicle
                    Types
                    options={vehicleTypes.map((option) => option.label)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=" Vehicle Categories "
                        {...register("vehicle_category")}
                      />
                    )}
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="Color & Code (T&N) "
                    {...register("color_code")}
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="Mileage (N)"
                    {...register("mileage", {
                      pattern: {
                        value: /^\d+$/,
                        message: "Please enter a valid number.",
                      },
                    })}
                  />
                  {errors.mileage && (
                    <span className="text-sm text-red-400">
                      {errors.mileage.message}
                    </span>
                  )}
                </div>
                <div>
                  <Autocomplete
                    className="productField"
                    Fuel
                    Type
                    options={fuelType.map((option) => option.label)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=" Fuel Type"
                        {...register("fuel_type")}
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="mt-2 ml-3 savebtn">
              <button disabled={loading}>Add Customer </button>
            </div>
          </form>
        </div>
      </div>
      <div className="w-full mt-5 mb-24">
        <div className="flex flex-wrap items-center justify-between mb-5">
          <h3 className="txt-center tet-sm ml- sm:ml-0 ont-bold md:text-3xl">
            {" "}
            Customer List:{" "}
          </h3>
          <div className="flex flex-wrap items-center">
            <input
              onChange={(e) => setFilterType(e.target.value)}
              type="text"
              placeholder="Search"
              className="border py-2 px-3 rounded-md border-[#ddd]"
            />
            <button
              onClick={handleFilterType}
              className="bg-[#42A1DA] text-white px-2 py-2 rounded-full ml-1"
            >
              {" "}
              <HiOutlineSearch size={25} />
            </button>
          </div>
        </div>
        {searchLoading ? (
          <div className="flex items-center justify-center text-xl">
            <Loading />
          </div>
        ) : (
          <div>
            {customerData?.length === 0 ||
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
    </section>
  );
};

export default AddCustomer;
