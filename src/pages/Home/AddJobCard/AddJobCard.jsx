/* eslint-disable no-unused-vars */
import "./AddJobCard.css";
import car from "../../../../public/assets/car2.jpeg";
import logo from "../../../../public/assets/logo.png";
import swal from "sweetalert";
import { useEffect, useRef, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
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
  vehicleTypes,
} from "../../../constant";
import Cookies from "js-cookie";

const AddJobCard = () => {
  const [previousPostData, setPreviousPostData] = useState({});
  const [jobNo, setJobNo] = useState(previousPostData.job_no);
  const [allJobCard, setAllJobCard] = useState([]);
  const [noMatching, setNoMatching] = useState(null);
  const [customerId, setCustomerId] = useState(null);

  const [customerDetails, setCustomerDetails] = useState([]);
  const [showCustomerData, setShowCustomerData] = useState({});

  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [getFuelType, setGetFuelType] = useState("");

  const [vehicleBody, setVehicleBody] = useState(null);
  const [clickControl, setClickControl] = useState(null);

  const [error, setError] = useState(null);
  const [select, setSelect] = useState("SL No");
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
  const [formattedDate, setFormattedDate] = useState("");
  const [filterType, setFilterType] = useState("");

  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const formRef = useRef();
  const navigate = useNavigate();

  const customer_type = Cookies.get("customer_type");

  const onSubmit = async (data) => {
    try {
      if (!customerId) {
        return toast.error("Please add your Id.");
      }
      const values = {
        customerId: customerId,
        companyId: customerId,
        showRoomId: customerId,
        job_no: jobNo,
        date: formattedDate,
        company_name: data.company_name,
        username: data.username,
        company_address: data.company_address,
        customer_name: data.customer_name,
        customer_contact: data.customer_contact,
        customer_email: data.customer_email,
        customer_address: data.customer_address,
        driver_name: data.driver_name,
        driver_contact: data.driver_contact,
        reference_name: data.reference_name,
        carReg_no: data.carReg_no,
        car_registration_no: data.car_registration_no,
        chassis_no: data.chassis_no,
        engine_no: data.engine_no,
        vehicle_brand: data.vehicle_brand,
        vehicle_name: data.vehicle_name,
        vehicle_model: data.vehicle_model,
        vehicle_category: data.vehicle_category,
        color_code: data.color_code,
        mileage: data.mileage,
        fuel_type: data.fuel_type,
        vehicle_interior_parts: value,
        reported_defect: value2,
        reported_action: value3,
        vehicle_body_report: vehicleBody,
        technician_name: data.technician_name,
        technician_signature: data.technician_signature,
        technician_date: data.technician_date,
        vehicle_owner: data.vehicle_owner,
      };

      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/v1/jobCard",
        values
      );

      if (response.data.message === "Successfully add to card post") {
        setLoading(false);
        const newJobNo = jobNo + 1;
        setJobNo(newJobNo);
        setReload(!reload);
        if (clickControl === "preview") {
          fetch("http://localhost:5000/api/v1/jobCard/recent")
            .then((res) => res.json())
            .then((data) => {
              if (data) {
                navigate(`/dashboard/preview?id=${data._id}`);
              }
            });
        }
        if (clickControl === "quotation") {
          navigate(`/dashboard/qutation?order_no=${jobNo}`);
        }
        if (clickControl === "invoice") {
          navigate(`/dashboard/invoice?order_no=${jobNo}`);
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
        let apiUrl = "";
        switch (customer_type) {
          case "customer":
            apiUrl = "http://localhost:5000/api/v1/customer";
            break;
          case "company":
            apiUrl = "http://localhost:5000/api/v1/company";
            break;
          case "show_room":
            apiUrl = "http://localhost:5000/api/v1/showRoom";
            break;
          default:
            throw new Error("Invalid customer type");
        }

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setCustomerDetails(data);

        const selectedCustomer = data.find((customer) => {
          switch (customer_type) {
            case "customer":
              return customer.customerId === customerId;
            case "company":
              return customer.companyId === customerId;
            case "show_room":
              return customer.showRoomId === customerId;
            default:
              return false;
          }
        });
        setShowCustomerData(selectedCustomer);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [customerId, customer_type]);


  // const handlePreview = async (e) => {
  //   e.preventDefault();
  // try {
  //   const values = {
  //     customerId: id,
  //     job_no: jobNo,
  //     date: formattedDate,
  //     chassis_no: chassisNo,
  //     carReg_no: carRegNo,
  //     car_registration_no: registration,
  //     vehicle_model: vehicleModel,
  //     vehicle_brand: vehicleBrand,
  //     mileage: mileage,
  //     color: color,
  //     engine_no: engineNo,
  //     reference_name: reference,
  //     company_name: companyName,
  //     vehicle_category: vehicleCategory,
  //     customer_name: customerName,
  //     contact_number: contactNo,
  //     driver_name: driverName,
  //     phone_number: phoneNo,
  //     vehicle_interior_parts: value,
  //     reported_defect: value2,
  //     reported_action: value3,
  //     vehicle_body_report: vehicleBody,
  //     technician_name: technicianName,
  //     technician_signature: technicianSignature,
  //     technician_date: technicianDate,
  //     vehicle_owner: owner,
  //   };
  //   const hasPreviewNullValues = Object.values(values).some(
  //     (val) => val === null
  //   );

  //   if (hasPreviewNullValues) {
  //     setError("Please fill in all the required fields.");
  //     return;
  //   }

  //   const response = await axios.post(
  //     "http://localhost:5000/api/v1/jobCard",
  //     values
  //   );
  //   if (response.data.message === "Successfully add to card post") {
  //     const newJobNo = jobNo + 1;
  //     setJobNo(newJobNo);
  //     setReload(!reload);
  //     fetch("http://localhost:5000/api/v1/jobCard/recent")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data) {
  //           navigate(`/dashboard/preview?id=${data._id}`);
  //         }
  //       });

  //     // formRef.current.reset()
  //     reset();
  //   }
  // } catch (error) {
  //   toast.error(error.message);
  // }
  // };
  // const handleQuotation = async (e) => {
  // e.preventDefault();
  // try {
  //   const values = {
  //     customerId: id,
  //     job_no: jobNo,
  //     date: formattedDate,
  //     chassis_no: chassisNo,
  //     carReg_no: carRegNo,
  //     car_registration_no: registration,
  //     vehicle_model: vehicleModel,
  //     vehicle_brand: vehicleBrand,
  //     mileage: mileage,
  //     color: color,
  //     engine_no: engineNo,
  //     reference_name: reference,
  //     company_name: companyName,
  //     vehicle_category: vehicleCategory,
  //     customer_name: customerName,
  //     contact_number: contactNo,
  //     driver_name: driverName,
  //     phone_number: phoneNo,
  //     vehicle_interior_parts: value,
  //     reported_defect: value2,
  //     reported_action: value3,
  //     vehicle_body_report: vehicleBody,
  //     technician_name: technicianName,
  //     technician_signature: technicianSignature,
  //     technician_date: technicianDate,
  //     vehicle_owner: owner,
  //   };
  //   const hasQuotationNullValues = Object.values(values).some(
  //     (val) => val === null
  //   );
  //   if (hasQuotationNullValues) {
  //     setError("Please fill in all the required fields.");
  //     return;
  //   }
  //   setLoading(true);
  //   const response = await axios.post(
  //     "http://localhost:5000/api/v1/jobCard",
  //     values
  //   );
  //   if (response.data.message === "Successfully add to card post") {
  //     const newJobNo = jobNo + 1;
  //     setJobNo(newJobNo);
  //     setReload(!reload);
  //     navigate(`/dashboard/qutation?order_no=${jobNo}`);
  //     // formRef.current.reset()
  //     setLoading(false);
  //   }
  // } catch (error) {
  //   setLoading(false);
  //   toast.error("Something went wrong.");
  // }
  // };
  // const handleInvoice = async (e) => {
  // e.preventDefault();
  // try {
  //   const values = {
  //     customerId: id,
  //     job_no: jobNo,
  //     date: formattedDate,
  //     chassis_no: chassisNo,
  //     carReg_no: carRegNo,
  //     car_registration_no: registration,
  //     vehicle_model: vehicleModel,
  //     vehicle_brand: vehicleBrand,
  //     mileage: mileage,
  //     color: color,
  //     engine_no: engineNo,
  //     reference_name: reference,
  //     company_name: companyName,
  //     vehicle_category: vehicleCategory,
  //     customer_name: customerName,
  //     contact_number: contactNo,
  //     driver_name: driverName,
  //     phone_number: phoneNo,
  //     vehicle_interior_parts: value,
  //     reported_defect: value2,
  //     reported_action: value3,
  //     vehicle_body_report: vehicleBody,
  //     technician_name: technicianName,
  //     technician_signature: technicianSignature,
  //     technician_date: technicianDate,
  //     vehicle_owner: owner,
  //   };
  //   const hasQuotationNullValues = Object.values(values).some(
  //     (val) => val === null
  //   );
  //   if (hasQuotationNullValues) {
  //     setError("Please fill in all the required fields.");
  //     return;
  //   }
  //   setLoading(true);
  //   const response = await axios.post(
  //     "http://localhost:5000/api/v1/jobCard",
  //     values
  //   );
  //   if (response.data.message === "Successfully add to card post") {
  //     const newJobNo = jobNo + 1;
  //     setJobNo(newJobNo);
  //     setReload(!reload);
  //     setLoading(false);
  //     navigate(`/dashboard/invoice?order_no=${jobNo}`);
  //     // formRef.current.reset()
  //   }
  // } catch (error) {
  //   setLoading(false);
  //   toast.error("Something went wrong.");
  // }
  // };
  const handleIconPreview = async (e) => {
    navigate(`/dashboard/preview?id=${e}`);
  };

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/v1/jobCard`)
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
    fetch(`http://localhost:5000/api/v1/jobCard/all`)
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
          `http://localhost:5000/api/v1/jobCard/one/${id}`,
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
  // ...

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

  // ...

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
      <table className="table overflow-scroll " >
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
              <td> {card.contact_number} </td>
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
        `http://localhost:5000/api/v1/jobCard/all`,
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
    fetch(`http://localhost:5000/api/v1/jobCard/all`)
      .then((res) => res.json())
      .then((data) => {
        setAllJobCard(data);
        setNoMatching(null);
      });
  };

  const currentDate = new Date().toISOString().split("T")[0];
  useEffect(() => {
    // Get the current date in the format YYYY-MM-DD
    const currentDate = new Date().toISOString().split("T")[0];
    setFormattedDate(currentDate);
  }, []);

  // const Search = styled("div")(({ theme }) => ({
  //   position: "relative",
  //   borderRadius: theme.shape.borderRadius,
  //   backgroundColor: alpha(theme.palette.common.white, 0.15),
  //   "&:hover": {
  //     backgroundColor: alpha(theme.palette.common.white, 0.25),
  //   },
  //   marginLeft: 0,
  //   width: "100%",
  //   [theme.breakpoints.up("sm")]: {
  //     marginLeft: theme.spacing(1),
  //     width: "auto",
  //   },
  // }));

  // const SearchIconWrapper = styled("div")(({ theme }) => ({
  //   padding: theme.spacing(0, 2),
  //   height: "100%",
  //   position: "absolute",
  //   pointerEvents: "none",
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  // }));

  // const StyledInputBase = styled(InputBase)(({ theme }) => ({
  //   color: "inherit",
  //   width: "100%",
  //   "& .MuiInputBase-input": {
  //     padding: theme.spacing(1, 1, 1, 0),
  //     // vertical padding + font size from searchIcon
  //     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  //     transition: theme.transitions.create("width"),
  //     [theme.breakpoints.up("sm")]: {
  //       width: "12ch",
  //       "&:focus": {
  //         width: "20ch",
  //       },
  //     },
  //   },
  // }));

  return (
    <div className="addJobCardWraps">
      <div className=" mb-5 pb-5 mx-auto text-center border-b-2 border-[#42A1DA]">
        <div className=" addJobCardHeads">
          <img src={logo} alt="logo" className=" addJobLogoImg" />
          <div>
            <h2 className=" trustAutoTitle trustAutoTitleQutation">
              Trust Auto Solution{" "}
            </h2>
            <span className="text-[12px] lg:text-xl">Office: Ka-93/4/C, Kuril Bishawroad, Dhaka-1229</span>
          </div>
          <div className="space-y-1 text-justify jobCardContactInfo">
            <span className="block">
              <span className="font-bold">Mobile:</span> 345689789666
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
          <div className="flex flex-wrap items-center justify-between my-5 ">
            <div>
              <div>
                <b>
                  Job No: <span className="requiredStart">*</span>
                </b>
                <span>{jobNo}</span>
              </div>
              <div>
                <span>
                  <b>Customer ID:</b> TAS000
                </span>
              
              </div>
            </div>
            <div>
              <div className="vehicleCard">Vehicle Job Card </div>
            </div>
            <div>
              <div>
                <b>
                  Date <span className="requiredStart">*</span>
                </b>
                <input
                  className="outline-none"
                  onChange={handleDateChange}
                  autoComplete="off"
                  type="date"
                  placeholder="Date"
                  max={currentDate}
                  defaultValue={formattedDate}
                />
              </div>
              {customer_type === "customer" && (
                <Link to="/dashboard/add-customer">
                  {" "}
                  <button className="bg-[#42A1DA] text-white px-2 py-2 rounded-sm ml-2">
                    Add Customer
                  </button>
                </Link>
              )}
              
              {customer_type === "company" && (
                <Link to="/dashboard/add-company">
                  {" "}
                  <button className="bg-[#42A1DA] text-white px-2 py-2 rounded-sm ml-2">
                    Add Company
                  </button>
                </Link>
              )}
              
            </div>
          </div>

          <div className="jobCardFieldWraps">
            <div className="jobCardFieldLeftSide">
              <h3 className="mb-5 text-xl font-bold">Vehicle Information </h3>

              <div className="flex items-center mt-3 ">
                <Autocomplete
                  className="jobCardSelect"
                  id="free-solo-demo"
                  Car
                  Registration
                  No
                  options={cmDmOptions.map((option) => option.label)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Car Reg No"
                      {...register("carReg_no", { required: true })}
                      value={showCustomerData?.carReg_no}
                      focused={showCustomerData?.carReg_no}
                    />
                  )}
                />
                <TextField
                  className="addJobInputField"
                  label="Car R (T&N)"
                  {...register("car_registration_no", { required: true })}
                  value={showCustomerData?.car_registration_no}
                  focused={showCustomerData?.car_registration_no}
                />
              </div>

              {errors.car_registration_no && (
                <span className="text-sm text-red-400">
                  This field is required.
                </span>
              )}

              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  {...register("chassis_no", { required: true })}
                  label="Chassis No (T&N)"
                  value={showCustomerData?.chassis_no}
                  focused={showCustomerData?.chassis_no}
                />
                {errors.chassis_no && (
                  <span className="text-sm text-red-400">
                    This field is required.
                  </span>
                )}
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  {...register("engine_no", { required: true })}
                  label="ENGINE NO & CC (T&N) "
                  value={showCustomerData?.engine_no}
                  focused={showCustomerData?.engine_no}
                />
                {errors.engine_no && (
                  <span className="text-sm text-red-400">
                    This field is required.
                  </span>
                )}
              </div>

              <div className="mt-3">
                <Autocomplete
                  id="free-solo-demo"
                  Vehicle
                  Brand
                  onInputChange={handleBrandChange}
                  options={carBrands.map((option) => option.label)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Vehicle Brand"
                      {...register("vehicle_brand", { required: true })}
                      value={showCustomerData?.vehicle_brand}
                      focused={showCustomerData?.vehicle_brand}
                    />
                  )}
                />
                {errors.vehicle_brand && !brand && (
                  <span className="text-sm text-red-400">
                    This field is required.
                  </span>
                )}
              </div>

              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  {...register("vehicle_name", { required: true })}
                  label="Vehicle Name "
                  value={showCustomerData?.vehicle_name}
                  focused={showCustomerData?.vehicle_name}
                />
                {errors.vehicle_name && (
                  <span className="text-sm text-red-400">
                    This field is required.
                  </span>
                )}
              </div>
              {/** 
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  onChange={(e) => setCarModel(e.target.value)}
                  label="Vehicle Model (N)"
                />
              </div>
              */}

              <div className="mt-3">
                {/* <Autocomplete
                  onChange={(e) => setCarModel(e.target.value)}
                  id="free-solo-demo"
                  Vehicle
                  Brand
                  options={totalYear.map((option) => option.title)}
                  renderInput={(params) => (
                    <TextField {...params} label=" Vehicle Model" />
                  )}
                /> */}
                <TextField
                  className="addJobInputField"
                  label="Vehicle Model (N)"
                  {...register("vehicle_model", {
                    required: "This field is required.",
                    pattern: {
                      value: /^\d+$/,
                      message: "Please enter a valid model number.",
                    },
                  })}
                  value={showCustomerData?.vehicle_model}
                  focused={showCustomerData?.vehicle_model}
                />

                {errors.vehicle_model && (
                  <span className="text-sm text-red-400">
                    {errors.vehicle_model.message}
                  </span>
                )}
              </div>

              <div className="mt-3">
                <Autocomplete
                  id="free-solo-demo"
                  Vehicle
                  Types
                  onInputChange={handleCategoryChange}
                  options={vehicleTypes.map((option) => option.label)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label=" Vehicle Categories "
                      {...register("vehicle_category", { required: true })}
                      value={showCustomerData?.vehicle_category}
                      focused={showCustomerData?.vehicle_category}
                    />
                  )}
                />
                {errors.vehicle_category && !category && (
                  <span className="text-sm text-red-400">
                    This field is required.
                  </span>
                )}
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  {...register("color_code", { required: true })}
                  label="Color & Code (T&N) "
                  value={showCustomerData?.color_code}
                  focused={showCustomerData?.color_code}
                />
                {errors.color_code && (
                  <span className="text-sm text-red-400">
                    This field is required.
                  </span>
                )}
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Mileage (N) "
                  {...register("mileage", {
                    required: "This field is required.",
                    pattern: {
                      value: /^\d+$/,
                      message: "Please enter a valid number.",
                    },
                  })}
                  value={showCustomerData?.mileage}
                  focused={showCustomerData?.mileage}
                />
                {errors.mileage && (
                  <span className="text-sm text-red-400">
                    {errors.mileage.message}
                  </span>
                )}
              </div>
              <div className="mt-3">
                <Autocomplete
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
                      {...register("fuel_type", { required: true })}
                      value={showCustomerData?.fuel_type}
                      focused={showCustomerData?.fuel_type}
                    />
                  )}
                />
                {errors.fuel_type && !getFuelType && (
                  <span className="text-sm text-red-400">
                    This field is required.
                  </span>
                )}
              </div>
            </div>

            <div className="jobCardFieldRightSide">
              <h3 className="mb-5 text-xl font-bold ">Customer Information </h3>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Company Name (T)"
                  {...register("company_name", { required: true })}
                  value={showCustomerData?.company_name}
                  focused={showCustomerData?.company_name}
                />
                {errors.company_name && (
                  <span className="text-sm text-red-400">
                    This field is required.
                  </span>
                )}
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Vehicle User Name (T)"
                  {...register("username", { required: true })}
                  value={showCustomerData?.username}
                  focused={showCustomerData?.username}
                />
                {errors.username && (
                  <span className="text-sm text-red-400">
                    This field is required.
                  </span>
                )}
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Company Address (T)"
                  {...register("company_address", { required: true })}
                  value={showCustomerData?.company_address}
                  focused={showCustomerData?.company_address}
                />
                {errors.company_address && (
                  <span className="text-sm text-red-400">
                    This field is required.
                  </span>
                )}
              </div>

              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Customer Name (T)"
                  {...register("customer_name", { required: true })}
                  value={showCustomerData?.customer_name}
                  focused={showCustomerData?.customer_name}
                />
                {errors.customer_name && (
                  <span className="text-sm text-red-400">
                    This field is required.
                  </span>
                )}
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Customer Contact No (N)"
                  {...register("customer_contact", {
                    required: "This field is required.",
                    pattern: {
                      value: /^\d{11}$/,
                      message: "Please enter a valid number.",
                    },
                  })}
                  value={showCustomerData?.customer_contact}
                  focused={showCustomerData?.customer_contact}
                />
                {errors.customer_contact && (
                  <span className="text-sm text-red-400">
                    {errors.customer_contact.message}
                  </span>
                )}
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Customer Email Address (T)"
                  {...register("customer_email", { required: true })}
                  type="email"
                  value={showCustomerData?.customer_email}
                  focused={showCustomerData?.customer_email}
                />
                {errors.customer_email && (
                  <span className="text-sm text-red-400">
                    This field is required.
                  </span>
                )}
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Customer Address (T) "
                  {...register("customer_address", { required: true })}
                  value={showCustomerData?.customer_address}
                  focused={showCustomerData?.customer_address}
                />
                {errors.customer_address && (
                  <span className="text-sm text-red-400">
                    This field is required.
                  </span>
                )}
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Driver Name (T)"
                  {...register("driver_name", { required: true })}
                  value={showCustomerData?.driver_name}
                  focused={showCustomerData?.driver_name}
                />
                {errors.driver_name && (
                  <span className="text-sm text-red-400">
                    This field is required.
                  </span>
                )}
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Driver Contact No (N)"
                  {...register("driver_contact", {
                    required: "This field is required.",
                    pattern: {
                      value: /^\d{11}$/,
                      message: "Please enter a valid number.",
                    },
                  })}
                  value={showCustomerData?.driver_contact}
                  focused={showCustomerData?.driver_contact}
                />
                {errors.driver_contact && (
                  <span className="text-sm text-red-400">
                    {errors.driver_contact.message}
                  </span>
                )}
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Reference Name (T) "
                  {...register("reference_name", { required: true })}
                  value={showCustomerData?.reference_name}
                  focused={showCustomerData?.reference_name}
                />
                {errors.reference_name && (
                  <span className="text-sm text-red-400">
                    This field is required.
                  </span>
                )}
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
                <h4 className="text-xl font-bold capitalize">Legend</h4>
                <div className="legend">
                  <ol>
                    <li>Scratch</li>
                    <li>Chip</li>
                    <li>Respainted</li>
                    <li>New Panel Filter </li>
                    <li>Scratch</li>
                  </ol>
                  <ol>
                    <li>Scratch</li>
                    <li>Chip</li>
                    <li>Respainted</li>
                    <li>New Panel Filter </li>
                    <li>Scratch</li>
                  </ol>
                </div>
              </div>
              <div className="mt-5">
                <b className="block mb-1 "> Vehicle Body Report Comments</b>
                <textarea
                  onChange={(e) => setVehicleBody(e.target.value)}
                  required
                  autoComplete="off"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between mt-5">
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
                {...register("technician_signature", { required: true })}
                label="Technician Signature (T) "
              />
              <br />
              {errors.technician_signature && (
                <span className="text-sm text-red-400">
                  This field is required.
                </span>
              )}
            </div>
            <div>
              <input
                {...register("technician_date", { required: true })}
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
                {...register("vehicle_owner", { required: true })}
                label="Vehicle Owner (T) "
              />
              <br />
              {errors.vehicle_owner && (
                <span className="text-sm text-red-400">
                  This field is required.
                </span>
              )}
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
                className=""
              >
                Add To Job Card{" "}
              </button>
            </div>
          </div>
          <div className="pt-6 text-center text-red-400">{error}</div>
        </div>
      </form>
      <div className="mt-20 overflow-x-auto">
        <div className="flex flex-wrap items-center justify-between mb-5">
          <h3 className="mb-3 text-sm font-bold lg:text-3xl">Job Card List:</h3>
          <div className="flex items-center searcList">
            <div
              onClick={handleAllAddToJobCard}
              className="mx-6 font-semibold cursor-pointer bg-[#42A1DA] px-2 py-1 rounded-md text-white"
            >
              All
            </div>
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
