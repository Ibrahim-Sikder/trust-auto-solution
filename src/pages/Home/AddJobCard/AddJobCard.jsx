/* eslint-disable no-unused-vars */
import "./AddJobCard.css";
import car from "../../../../public/assets/car2.jpeg";
import logo from "../../../../public/assets/logo.png";
import swal from "sweetalert";
import { useEffect, useRef, useState } from "react";
import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaTrashAlt, FaEdit, FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading/Loading";
import {
  carBrands,
  cmDmOptions,
  fuelType,
  totalYear,
  vehicleModels,
  vehicleName,
  vehicleTypes,
} from "../../../constant";
import { HiOutlineChevronDown, HiOutlinePlus } from "react-icons/hi";
import { formatDate } from "../../../utils/formateDate";

const AddJobCard = () => {
  const [previousPostData, setPreviousPostData] = useState({});
  const [jobNo, setJobNo] = useState(previousPostData.job_no);
  const [allJobCard, setAllJobCard] = useState([]);

  const [noMatching, setNoMatching] = useState(null);
  const [idType, setIdType] = useState(null);
  const [showId, setShowId] = useState([]);
  const [customerId, setCustomerId] = useState(null);

  // const [customerDetails, setCustomerDetails] = useState([]);
  const [showCustomerData, setShowCustomerData] = useState({});
  const inputRef = useRef(null); // Create a ref for the input element
  const [inputValue, setInputValue] = useState(""); // Controlled input value state

  // Effect to manage focus when showCustomerData.carReg_no changes and is non-empty
  useEffect(() => {
    if (showCustomerData?.carReg_no && inputRef.current) {
      inputRef.current.focus(); // Focus the input element if data is present
      setInputValue(showCustomerData.carReg_no); // Set the input value to the loaded data
    }
  }, [showCustomerData]);

  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [getFuelType, setGetFuelType] = useState("");

  const [note, setNote] = useState(null);
  const [vehicleBody, setVehicleBody] = useState(null);
  const [clickControl, setClickControl] = useState(null);

  const [error, setError] = useState(null);

  const [customerConError, setCustomerConError] = useState("");
  const [driverConError, setDriverConError] = useState("");
  const [registrationError, setRegistrationError] = useState("");

  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  const [reload, setReload] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [technicianDate, setTechnicianDate] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const [filterType, setFilterType] = useState("");

  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const formRef = useRef();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      if (!customerId) {
        return toast.error("Please add your Id.");
      }
      const values = {
        Id: customerId,
        job_no: jobNo,
        date: formattedDate,
        company_name: data.company_name || showCustomerData.company_name,
        username: data.username || showCustomerData.username,
        company_address:
          data.company_address || showCustomerData.company_address,
        customer_name: data.customer_name || showCustomerData.customer_name,
        customer_contact:
          data.customer_contact || showCustomerData.customer_contact,
        customer_email: data.customer_email || showCustomerData.customer_email,
        customer_address:
          data.customer_address || showCustomerData.customer_address,
        driver_name: data.driver_name || showCustomerData.driver_name,
        driver_contact: data.driver_contact || showCustomerData.driver_contact,
        reference_name: data.reference_name || showCustomerData.reference_name,
        carReg_no: data.carReg_no || showCustomerData.carReg_no,
        car_registration_no:
          data.car_registration_no || showCustomerData.car_registration_no,
        chassis_no: data.chassis_no || showCustomerData.chassis_no,
        engine_no: data.engine_no || showCustomerData.engine_no,
        vehicle_brand: data.vehicle_brand || showCustomerData.vehicle_brand,
        vehicle_name: data.vehicle_name || showCustomerData.vehicle_name,
        vehicle_model: data.vehicle_model || showCustomerData.vehicle_model,
        vehicle_category:
          data.vehicle_category || showCustomerData.vehicle_category,
        color_code: data.color_code || showCustomerData.color_code,
        mileage: data.mileage || showCustomerData.mileage,
        fuel_type: data.fuel_type || showCustomerData.fuel_type,
        vehicle_interior_parts: value,
        reported_defect: value2,
        reported_action: value3,
        note: note,
        vehicle_body_report: vehicleBody,
        technician_name: data.technician_name,
        technician_signature: data.technician_signature,
        technician_date: technicianDate,
        vehicle_owner: data.vehicle_owner,
      };

      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/jobCard`,
        values
      );

      if (response.data.message === "Successfully add to card post") {
        setLoading(false);
        const newJobNo = jobNo + 1;
        setJobNo(newJobNo);
        navigate("/dashboard/jobcard-list");
        setReload(!reload);
        if (clickControl === "preview") {
          fetch(`${import.meta.env.VITE_API_URL}/api/v1/jobCard/recent`)
            .then((res) => res.json())
            .then((data) => {
              if (data) {
                navigate(`/dashboard/preview?id=${data._id}`);
              }
            });
        }
        if (clickControl === "quotation") {
          navigate(`/dashboard/qutation?serial_no=${jobNo}`);
        }
        if (clickControl === "invoice") {
          navigate(`/dashboard/invoice?serial_no=${jobNo}`);
        }
        toast.success("Add to job card successful.");
        formRef.current.reset();
        setError(null);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong.");
    }
  };

  const handleBrandChange = (_, newInputValue) => {
    setBrand(newInputValue);
  };
  const handleCategoryChange = (_, newInputValue) => {
    setCategory(newInputValue);
  };
  const handleFuelChange = (_, newInputValue) => {
    setGetFuelType(newInputValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiEndpoints = [
          `${import.meta.env.VITE_API_URL}/api/v1/customer/${customerId}`,
          `${import.meta.env.VITE_API_URL}/api/v1/company/${customerId}`,
          `${import.meta.env.VITE_API_URL}/api/v1/showRoom/${customerId}`,
        ];

        let data = null;

        for (const apiUrl of apiEndpoints) {
          const response = await fetch(apiUrl);
          if (response.ok) {
            data = await response.json();
            // Check if data exists and break the loop if found
            if (data) break;
          }
        }

        if (!data) {
          throw new Error("Failed to fetch data");
        }

        setShowCustomerData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [customerId]);

  // get id

  const getAndSetIds = (url, idExtractor) => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const ids = data.map(idExtractor);
        setShowId(ids);
        setLoading(false);
      });
  };

  const getIdWithIdType = (id) => {
    setIdType(id);

    switch (id) {
      case "customerId":
        getAndSetIds(
          `${import.meta.env.VITE_API_URL}/api/v1/customer`,
          (item) => item.customerId
        );
        break;
      case "companyId":
        getAndSetIds(
          `${import.meta.env.VITE_API_URL}/api/v1/company`,
          (item) => item.companyId
        );
        break;
      case "showRoomId":
        getAndSetIds(
          `${import.meta.env.VITE_API_URL}/api/v1/showRoom`,
          (item) => item.showRoomId
        );
        break;
      default:
        toast.error("Invalid id type");
    }
  };

  const handleIconPreview = async (e) => {
    navigate(`/dashboard/preview?id=${e}`);
  };

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/v1/jobCard`)
      .then((res) => res.json())
      .then((data) => {
        setPreviousPostData(data);
        setLoading(false);
      });
  }, [jobNo, reload]);

  useEffect(() => {
    if (previousPostData.job_no && !jobNo) {
      setJobNo(previousPostData.job_no + 1);
    }
  }, [previousPostData, jobNo, reload]);

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/v1/jobCard/all`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setAllJobCard(data);
      });
  }, [reload]);

  const handleDateChange = (event) => {
    const rawDate = event.target.value;
    const parsedDate = new Date(rawDate);
    const day = parsedDate.getDate().toString().padStart(2, "0");
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0");
    const year = parsedDate.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    setFormattedDate(formattedDate);
  };
  const handleTechnicianDateChange = (event) => {
    const rawDate = event.target.value;
    const parsedDate = new Date(rawDate);
    const day = parsedDate.getDate().toString().padStart(2, "0");
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0");
    const year = parsedDate.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    setTechnicianDate(formattedDate);
  };

  useEffect(() => {
    const parsedDate = new Date();
    const day = parsedDate.getDate().toString().padStart(2, "0");
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0");
    const year = parsedDate.getFullYear();
    const currentDate = `${day}-${month}-${year}`;
    setFormattedDate(currentDate);
  }, []);

  // pagination

  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(
    Number(sessionStorage.getItem("job")) || 1
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
          `${import.meta.env.VITE_API_URL}/api/v1/jobCard/one/${id}`,
          {
            method: "DELETE",
          }
        );
        const data = await res.json();

        if (data.message == "Job card delete successful") {
          setAllJobCard(allJobCard?.filter((pkg) => pkg._id !== id));
        }
        swal("Deleted!", "Card delete successful.", "success");
      } catch (error) {
        swal("Error", "An error occurred while deleting the card.", "error");
      }
    }
  };

  useEffect(() => {
    sessionStorage.setItem("job", currentPage.toString());
  }, [currentPage]);

  useEffect(() => {
    const storedPage = Number(sessionStorage.getItem("job")) || 1;
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
    sessionStorage.setItem("job", pageNumber.toString());
  };
  const pages = [];
  for (let i = 1; i <= Math.ceil(allJobCard?.length / limit); i++) {
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
  if (Array.isArray(allJobCard)) {
    currentItems = allJobCard.slice(startIndex, lastIndex);
  } else {
    currentItems = [];
  }

  // ...

  const renderData = (allJobCard) => {
    return (
      <table className="table overflow-scroll ">
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
          {allJobCard?.map((card, index) => (
            <tr key={card._id}>
              <td>{index + 1}</td>
              <td>{card.customer_name}</td>
              <td>{card.job_no}</td>
              <td>{card.car_registration_no}</td>
              <td> {card.customer_contact} </td>
              <td>{card.date}</td>
              <td>
                <div
                  onClick={() => handleIconPreview(card._id)}
                  className="editIconWrap edit2"
                >
                  {/* <Link to="/dashboard/preview"> */}
                  <FaEye className="editIcon " />
                  {/* </Link> */}
                </div>
              </td>

              <td>
                <div className="editIconWrap edit">
                  <Link to={`/dashboard/update-jobcard?id=${card._id}`}>
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
    sessionStorage.setItem("job", newPage.toString());

    if (newPage % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  const handleNext = () => {
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
    sessionStorage.setItem("job", newPage.toString());

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
        `${import.meta.env.VITE_API_URL}/api/v1/jobCard/all`,
        data
      );

      if (response.data.message === "Filter successful") {
        setAllJobCard(response.data.result);
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

  const handleAllAddToJobCard = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/v1/jobCard/all`)
      .then((res) => res.json())
      .then((data) => {
        setAllJobCard(data);
        setNoMatching(null);
      });
  };

  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <div className="addJobCardWraps">
      <div className=" mb-5 pb-5 mx-auto text-center border-b-2 border-[#42A1DA]">
        <div className=" addJobCardHeads">
          <img src={logo} alt="logo" className=" addJobLogoImg" />
          <div>
            <h2 className=" trustAutoTitle trustAutoTitleQutation">
              Trust Auto Solution{" "}
            </h2>
            <span className="text-[12px] lg:text-xl">
              Office: Ka-93/4/C, Kuril Bishawroad, Dhaka-1229
            </span>
          </div>
          <div className="space-y-1 text-justify jobCardContactInfo">
            <span className="block">
              <span className="font-bold">Mobile:</span> 01821-216465,
              01972-216465
            </span>
            <span className="block">
              <small className="font-bold">Email:</small>{" "}
              trustautosolution@gmail.com
            </span>
            <span className="block font-bold ">trustautosolution.com</span>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
        <div>
          <div className=" flex md:flex-row flex-col items-center justify-between my-5 ">
            <div>
              <div>
                <b>
                  Job No: <span className="requiredStart">*</span>
                </b>
                <span>{jobNo}</span>
              </div>
              <div>
                <span>
                  {idType === "companyId" && <b>Company Id :</b>}
                  {idType === "customerId" && <b>Customer Id :</b>}
                  {idType === "showRoomId" && <b>Show room Id :</b>}
                  {idType === null && <b>Select Id :</b>}

                  {customerId ? customerId : "....."}
                </span>
              </div>
              <div className="flex items-center mt-2">
                <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
                  <InputLabel id="demo-select-small-label">
                    Select Customer
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    className="py-1"
                    label="Select Customer"
                    onChange={(e) => getIdWithIdType(e.target.value)}
                  >
                    <MenuItem value="companyId">Company ID </MenuItem>
                    <MenuItem value="customerId">Customer ID</MenuItem>
                    <MenuItem value="showRoomId">Show Room ID </MenuItem>
                  </Select>
                </FormControl>

                <Autocomplete
                  className="w-40 "
                  id="free-solo-demo"
                  options={showId.map((option) => option)}
                  onChange={(e, value) => setCustomerId(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Id"
                      onChange={(e) => setCustomerId(e.target.value)}
                      className="w-40"
                    />
                  )}
                />
              </div>
            </div>
            <div>
              <div className="vehicleCard">Vehicle Job Card </div>
            </div>
            <div>
              <div>
                <div className="cursor-pointer">
                  <b>
                    Date <span className="requiredStart">*</span>
                  </b>
                  <input
                    className="outline-none curs"
                    onChange={handleDateChange}
                    autoComplete="off"
                    type="date"
                    placeholder="Date"
                    max={currentDate}
                    defaultValue={
                      formattedDate ? formatDate(formattedDate) : currentDate
                    }
                  />
                </div>

                <div className="addCustomerRelative">
                  <div className="flex items-center w-40 h-10 mt-2 p-2 rounded-sm bg-[#42A1DA] text-white">
                    <p>Add Customer </p>
                    <HiOutlineChevronDown className="ml-1" size={20} />
                  </div>
                  <div className="space-y-2 addCustomerDropDown ">
                    <Link to="/dashboard/add-customer">
                      {" "}
                      <span className="flex items-center">
                        <HiOutlinePlus size={20} /> Add Customer{" "}
                      </span>
                    </Link>
                    <Link to="/dashboard/add-company">
                      {" "}
                      <span className="flex items-center">
                        <HiOutlinePlus size={20} /> Add Company{" "}
                      </span>
                    </Link>

                    <Link to="/dashboard/add-show-room">
                      {" "}
                      <span className="flex items-center">
                        <HiOutlinePlus size={20} /> Add Show Room{" "}
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="jobCardFieldWraps">
            <div className="jobCardFieldRightSide">
              <h3 className="mb-5 text-xl font-bold ">Customer Information </h3>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  {...register("company_name")}
                  label="Company Name (T)"
                  focused={showCustomerData?.company_name}
                  value={showCustomerData?.company_name}
                  onChange={(e) =>
                    setShowCustomerData({
                      ...showCustomerData,
                      company_name: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!showCustomerData.company_name,
                  }}
                />
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Vehicle User Name (T)"
                  {...register("username")}
                  value={showCustomerData?.username}
                  focused={showCustomerData?.username}
                  onChange={(e) =>
                    setShowCustomerData({
                      ...showCustomerData,
                      username: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!showCustomerData.username,
                  }}
                />
                {/* {errors.username && (
              <span className="text-sm text-red-400">
                This field is required.
              </span>
            )} */}
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Company Address (T)"
                  {...register("company_address")}
                  value={showCustomerData?.company_address}
                  focused={showCustomerData?.company_address}
                  onChange={(e) =>
                    setShowCustomerData({
                      ...showCustomerData,
                      company_address: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!showCustomerData.company_address,
                  }}
                />
                {/* {errors.company_address && (
              <span className="text-sm text-red-400">
                This field is required.
              </span>
            )} */}
              </div>

              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Customer Name (T)"
                  {...register("customer_name")}
                  value={showCustomerData?.customer_name}
                  focused={showCustomerData?.customer_name}
                  onChange={(e) =>
                    setShowCustomerData({
                      ...showCustomerData,
                      customer_name: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!showCustomerData.customer_name,
                  }}
                />
                {/* {errors.customer_name && (
              <span className="text-sm text-red-400">
                This field is required.
              </span>
            )} */}
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Customer Contact No (N)"
                  {...register("customer_contact", {
                    pattern: {
                      value: /^\d{11}$/,
                      message: "Please enter a valid 11-digit number.",
                    },
                  })}
                  value={showCustomerData?.customer_contact}
                  onChange={(e) => {
                    if (e.target.value.length === 11) {
                      setCustomerConError("");
                    } else if (e.target.value > 11) {
                      setCustomerConError(
                        "Please enter a valid 11-digit number."
                      );
                    }
                    setShowCustomerData({
                      ...showCustomerData,
                      customer_contact: e.target.value,
                    });
                  }}
                  InputLabelProps={{
                    shrink: !!showCustomerData.customer_contact,
                  }}
                  error={!!errors.customer_contact | !!customerConError}
                  helperText={
                    errors.customer_contact
                      ? errors.customer_contact.message
                      : ""
                  }
                />
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Customer Email Address (T)"
                  {...register("customer_email")}
                  type="email"
                  value={showCustomerData?.customer_email}
                  focused={showCustomerData?.customer_email}
                  onChange={(e) =>
                    setShowCustomerData({
                      ...showCustomerData,
                      customer_email: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!showCustomerData.customer_email,
                  }}
                />
                {/* {errors.customer_email && (
              <span className="text-sm text-red-400">
                This field is required.
              </span>
            )} */}
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Customer Address (T) "
                  {...register("customer_address")}
                  value={showCustomerData?.customer_address}
                  focused={showCustomerData?.customer_address}
                  onChange={(e) =>
                    setShowCustomerData({
                      ...showCustomerData,
                      customer_address: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!showCustomerData.customer_address,
                  }}
                />
                {/* {errors.customer_address && (
              <span className="text-sm text-red-400">
                This field is required.
              </span>
            )} */}
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Driver Name (T)"
                  {...register("driver_name")}
                  value={showCustomerData?.driver_name}
                  focused={showCustomerData?.driver_name}
                  onChange={(e) =>
                    setShowCustomerData({
                      ...showCustomerData,
                      driver_name: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!showCustomerData.driver_name,
                  }}
                />
                {/* {errors.driver_name && (
              <span className="text-sm text-red-400">
                This field is required.
              </span>
            )} */}
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Driver Contact No (N)"
                  {...register("driver_contact", {
                    pattern: {
                      value: /^\d{11}$/,
                      message: "Please enter a valid 11-digit number.",
                    },
                  })}
                  value={showCustomerData?.driver_contact}
                  onChange={(e) => {
                    if (e.target.value.length === 11) {
                      setDriverConError("");
                    } else if (e.target.value > 11) {
                      setDriverConError(
                        "Please enter a valid 11-digit number."
                      );
                    }
                    setShowCustomerData({
                      ...showCustomerData,
                      driver_contact: e.target.value,
                    });
                  }}
                  InputLabelProps={{
                    shrink: !!showCustomerData.driver_contact,
                  }}
                  error={!!errors.driver_contact | !!driverConError}
                  helperText={
                    errors.driver_contact ? errors.driver_contact.message : ""
                  }
                />
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Reference Name (T) "
                  {...register("reference_name")}
                  value={showCustomerData?.reference_name}
                  focused={showCustomerData?.reference_name}
                  onChange={(e) =>
                    setShowCustomerData({
                      ...showCustomerData,
                      reference_name: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!showCustomerData.reference_name,
                  }}
                />
                {/* {errors.reference_name && (
              <span className="text-sm text-red-400">
                This field is required.
              </span>
            )} */}
              </div>
            </div>
            <div className="jobCardFieldLeftSide lg:mt-0 mt-5">
              <h3 className="mb-5 text-xl font-bold">Vehicle Information </h3>

              <div className="flex  md:gap-0 gap-4 items-center mt-3 ">
                <Autocomplete
                  className="jobCardSelect2"
                  id="free-solo-demo"
                  inputValue={inputValue}
                  onInputChange={(event, newValue) => setInputValue(newValue)}
                  options={cmDmOptions.map((option) => option.label)}
                  value={showCustomerData?.carReg_no}
                  focused={showCustomerData?.carReg_no}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Vehicle Reg No"
                      {...register("carReg_no")}
                    />
                  )}
                />

                <TextField
                  className="carRegField"
                  label="Car R (N)"
                  {...register("car_registration_no", {
                    pattern: {
                      value: /^[\d-]+$/,
                      message: "Only numbers and hyphens are allowed",
                    },
                    minLength: {
                      value: 7,
                      message:
                        "Car registration number must be exactly 6 digits",
                    },
                    maxLength: {
                      value: 7,
                      message:
                        "Car registration number must be exactly 6 digits",
                    },
                  })}
                  value={showCustomerData?.car_registration_no}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length === 7) {
                      setRegistrationError("");
                    } else if (value.length < 7) {
                      setRegistrationError(
                        "Car registration number must be 7 characters"
                      );
                    }
                    const formattedValue = value
                      .replace(/\D/g, "")
                      .slice(0, 6)
                      .replace(/(\d{2})(\d{1,4})/, "$1-$2");
                    setShowCustomerData({
                      ...showCustomerData,
                      car_registration_no: formattedValue,
                    });
                  }}
                  InputLabelProps={{
                    shrink: !!showCustomerData.car_registration_no,
                  }}
                  error={!!errors.car_registration_no || !!registrationError}
                  // helperText={
                  //   (errors.car_registration_no
                  //     ? errors.car_registration_no.message
                  //     : "") || registrationError
                  // }
                />
              </div>

              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  {...register("chassis_no")}
                  label="Chassis No (T&N)"
                  value={showCustomerData?.chassis_no}
                  focused={showCustomerData?.chassis_no}
                  onChange={(e) =>
                    setShowCustomerData({
                      ...showCustomerData,
                      chassis_no: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!showCustomerData.chassis_no,
                  }}
                />
                {/* {errors.chassis_no && (
                  <span className="text-sm text-red-400">
                    This field is required.
                  </span>
                )} */}
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  {...register("engine_no")}
                  label="ENGINE NO & CC (T&N) "
                  value={showCustomerData?.engine_no}
                  focused={showCustomerData?.engine_no}
                  onChange={(e) =>
                    setShowCustomerData({
                      ...showCustomerData,
                      engine_no: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!showCustomerData.engine_no,
                  }}
                />
                {/* {errors.engine_no && (
                  <span className="text-sm text-red-400">
                    This field is required.
                  </span>
                )} */}
              </div>

              <div className="mt-3">
                <Autocomplete
                  className="addJobInputField"
                  id="free-solo-demo"
                  Vehicle
                  Brand
                  onInputChange={handleBrandChange}
                  options={carBrands.map((option) => option.label)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Vehicle Brand"
                      {...register("vehicle_brand")}
                      value={showCustomerData?.vehicle_brand}
                      focused={showCustomerData?.vehicle_brand}
                    />
                  )}
                />
              </div>

              <div className="mt-3">
                <Autocomplete
                  className="addJobInputField"
                  id="free-solo-demo"
                  Vehicle
                  Brand
                  // onInputChange={handleBrandChange}
                  options={vehicleName.map((option) => option.label)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Vehicle Name "
                      {...register("vehicle_name")}
                      value={showCustomerData?.vehicle_name}
                      focused={showCustomerData?.vehicle_name}
                    />
                  )}
                />
              </div>

              <div className="mt-3">
                <div className="mt-3">
                  <Autocomplete
                    className="addJobInputField"
                    Vehicle
                    Types
                    onInputChange={handleCategoryChange}
                    options={vehicleModels.map((option) => option.label)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=" Vehicle Model "
                        {...register("vehicle_model")}
                        value={showCustomerData?.vehicle_model}
                        focused={showCustomerData?.vehicle_model}
                        onChange={(e) => {
                          const input = e.target.value;
                          // Only allow numbers and limit to 4 digits
                          if (/^\d{0,4}$/.test(input)) {
                            setShowCustomerData({
                              ...showCustomerData,
                              vehicle_model: input,
                            });
                          }
                        }}
                      />
                    )}
                  />
                </div>
              </div>

              <div className="mt-3">
                <Autocomplete
                  className="addJobInputField"
                  id="free-solo-demo"
                  Vehicle
                  Types
                  onInputChange={handleCategoryChange}
                  options={vehicleTypes.map((option) => option.label)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label=" Vehicle Categories "
                      {...register("vehicle_category")}
                      value={showCustomerData?.vehicle_category}
                      focused={showCustomerData?.vehicle_category}
                    />
                  )}
                />
                {/* {errors.vehicle_category && !category && (
                  <span className="text-sm text-red-400">
                    This field is required.
                  </span>
                )} */}
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  {...register("color_code")}
                  label="Color & Code (T&N) "
                  value={showCustomerData?.color_code}
                  focused={
                    showCustomerData?.color_code !== "" &&
                    showCustomerData?.color_code
                  }
                  onChange={(e) =>
                    setShowCustomerData({
                      ...showCustomerData,
                      color_code: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!showCustomerData.color_code,
                  }}
                />
                {/* {errors.color_code && (
                  <span className="text-sm text-red-400">
                    This field is required.
                  </span>
                )} */}
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Mileage (N) "
                  {...register("mileage", {
                    // required: "This field is required.",
                    pattern: {
                      value: /^\d+$/,
                      message: "Please enter a valid number.",
                    },
                  })}
                  value={showCustomerData?.mileage}
                  focused={showCustomerData?.mileage}
                  onChange={(e) =>
                    setShowCustomerData({
                      ...showCustomerData,
                      mileage: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!showCustomerData.mileage,
                  }}
                />
                {errors.mileage && (
                  <span className="text-sm text-red-400">
                    {errors.mileage.message}
                  </span>
                )}
              </div>
              <div className="mt-3">
                <Autocomplete
                  className="addJobInputField"
                  value={showCustomerData?.fuel_type}
                  focused={showCustomerData?.fuel_type}
                  id="free-solo-demo"
                  Fuel
                  Type
                  onInputChange={handleFuelChange}
                  options={fuelType.map((option) => option.label)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label=" Fuel Type"
                      {...register("fuel_type")}
                      value={showCustomerData?.fuel_type}
                      focused={showCustomerData?.fuel_type}
                    />
                  )}
                />
                {/* {errors.fuel_type && !getFuelType && (
                  <span className="text-sm text-red-400">
                    This field is required.
                  </span>
                )} */}
              </div>
            </div>
          </div>

          <div className="mt-10 vehicleReport">
            <div className="vehicleReportLeftSide">
              <div className=" vehicleTextField">
                <b className="block mb-3">
                  {" "}
                  Vehicle Interior Parts, Papers, Tools, Meter Light & Others{" "}
                </b>
                <ReactQuill
                  value={value}
                  className="textEditor"
                  onChange={setValue}
                  modules={{
                    toolbar: [
                      [{ font: [] }],
                      [{ size: ["small", false, "large", "huge"] }],
                      [{ header: [1, 2, 3, 4, 5, 6, false] }],
                      [{ color: [] }, { background: [] }],
                      [{ align: [] }],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["bold", "italic", "underline"],
                      [{ align: [] }],
                      ["link", "image"],
                      ["video"],
                      ["clean"],
                      ["blockquote", "code-block"],
                      ["direction"],
                      ["formula"],
                      ["strike"],
                    ],
                  }}
                />
              </div>
              <div className="mt-5">
                <b className="block mb-1"> Reported Defect </b>
                <ReactQuill
                  value={value2}
                  className="textEditor"
                  onChange={setValue2}
                  modules={{
                    toolbar: [
                      [{ font: [] }],
                      [{ size: ["small", false, "large", "huge"] }],
                      [{ header: [1, 2, 3, 4, 5, 6, false] }],
                      [{ color: [] }, { background: [] }],
                      [{ align: [] }],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["bold", "italic", "underline"],
                      [{ align: [] }],
                    ],
                  }}
                />
              </div>
              <div className="mt-5">
                <b className="block mb-1"> Reported Action </b>
                <ReactQuill
                  value={value3}
                  className="textEditor"
                  onChange={setValue3}
                  modules={{
                    toolbar: [
                      [{ font: [] }],
                      [{ size: ["small", false, "large", "huge"] }],
                      [{ header: [1, 2, 3, 4, 5, 6, false] }],
                      [{ color: [] }, { background: [] }],
                      [{ align: [] }],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["bold", "italic", "underline"],
                      [{ align: [] }],
                    ],
                  }}
                />
              </div>
            </div>
            <div className="vehicleReportRightSide">
              <b htmlFor="" className="block mb-3">
                {" "}
                Vehicle Body Report (Mark with X where damage )
              </b>
              <div className="mt-2 imgWrap">
                <img src={car} alt="car" />
              </div>
              <div className="mt-3">
                <b className="block mb-1 "> Note </b>
                <textarea
                  onChange={(e) => setNote(e.target.value)}
                  required
                  autoComplete="off"
                ></textarea>
              </div>
              <div className="mt-3">
                <b className="block mb-1 "> Vehicle Body Report Comments</b>
                <textarea
                  onChange={(e) => setVehicleBody(e.target.value)}
                  required
                  autoComplete="off"
                  className="p-5"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between mt-5 mb-10">
            <div>
              <TextField
                className="ownerInput"
                {...register("technician_name", { required: true })}
                label="Technician Name (T) "
              />
              <br />
              {errors.technician_name && (
                <span className="text-sm text-red-400">
                  This field is required.
                </span>
              )}
            </div>
            <div>
              <TextField
                disabled
                className="ownerInput"
                o
                {...register("technician_signature")}
                label="Technician Signature (T) "
              />
            </div>
            <div>
              <input
                onChange={handleTechnicianDateChange}
                required
                autoComplete="off"
                type="date"
                placeholder="Date"
                min={currentDate}
                className="p-3 border-2 ownerInput"
              />
              {errors.technician_date && (
                <span className="text-sm text-red-400">
                  This field is required.
                </span>
              )}
            </div>
            <div>
              <TextField
                disabled
                className="ownerInput"
                {...register("vehicle_owner")}
                label="Vehicle Owner (T) "
              />
            </div>
          </div>
          <div className="mt-3">
            <b>This is not an invoice, all estimates are valid for 30 days </b>
          </div>

          <div className="mt-5 buttonGroup">
            <div>
              {/* <Link to={`/dashboard/preview?${id}`}> */}
              <button
                disabled={loading}
                onClick={() => setClickControl("preview")}
              >
                Preview
              </button>
              {/* </Link> */}
              {/* <Link to="/dashboard/preview"> */}
              {/* </Link>
              <Link to="/dashboard/preview"> */}
              {/* </Link> */}
              {/* <Link to={`/dashboard/qutation?order_no=${jobNo}`}> */}{" "}
              <button
                disabled={loading}
                onClick={() => setClickControl("quotation")}
              >
                Quotation
              </button>
              {/* </Link> */}
              {/* <Link to="/dashboard/invoice"> */}{" "}
              <button
                disabled={loading}
                onClick={() => setClickControl("invoice")}
              >
                Invoice
              </button>
              {/* </Link> */}
            </div>
            <div className="submitQutationBtn">
              <button
                disabled={loading}
                // onClick={handleAddToCard}
                type="submit"
              >
                Add To Job Card{" "}
              </button>
            </div>
          </div>
          {/* <div className="pt-6 text-center text-red-400">{error}</div> */}
        </div>
      </form>
      <div className="mt-20 overflow-x-auto">
        <div className="flex flex-wrap items-center justify-between mb-5">
          <h3 className="mb-3 text-sm font-bold lg:text-3xl">Job Card List:</h3>
          <div className="flex items-center searcList">
            <div className="searchGroup">
              <button
                onClick={handleAllAddToJobCard}
                className="SearchBtn mr-2"
              >
                All{" "}
              </button>
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

      {searchLoading ? (
        <div className="flex items-center justify-center text-xl">
          <Loading />
        </div>
      ) : (
        <div>
          {allJobCard?.length === 0 ||
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

export default AddJobCard;
