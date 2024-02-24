/* eslint-disable no-unused-vars */
import "./AddJobCard.css";
import car from "../../../../public/assets/car2.jpeg";
import logo from "../../../../public/assets/logo.png";
import swal from "sweetalert";
import { useEffect, useRef, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import {
  Autocomplete,
  FormControl,
  InputLabel,
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
import { carBrands, cmDmOptions, fuelType, totalYear, vehicleTypes } from "../../../constant";

const AddJobCard = () => {
  const [previousPostData, setPreviousPostData] = useState({});
  const [jobNo, setJobNo] = useState(previousPostData.job_no);
  const [allJobCard, setAllJobCard] = useState([]);
  const [noMatching, setNoMatching] = useState(null);
  const [chassisNo, setChassisNo] = useState(null);
  const [registration, setRegistration] = useState(null);
  const [carRegNo, setCarReg] = useState(null);
  const [vehicleModel, setCarModel] = useState(null);
  const [vehicleBrand, setVehicleBrand] = useState(null);
  const [mileage, setMileage] = useState(null);
  const [color, setColor] = useState(null);
  const [engineNo, setEngineNo] = useState(null);
  const [reference, setReference] = useState(null);
  const [companyName, setCompanyName] = useState(null);
  const [vehicleCategory, setVehicleCategory] = useState(null);
  const [customerName, setCustomerName] = useState(null);
  const [contactNo, setContactNo] = useState(null);
  const [driverName, setDriverName] = useState(null);
  const [phoneNo, setPhoneNo] = useState(null);
  const [vehicleBody, setVehicleBody] = useState(null);
  const [technicianName, setTechnicianName] = useState(null);
  const [technicianSignature, setTechnicianSignature] = useState(null);
  const [technicianDate, setTechnicianDate] = useState(null);
  const [owner, setOwner] = useState(null);
  const [error, setError] = useState(null);
  const [select, setSelect] = useState("SL No");
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  const [reload, setReload] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [formattedDate, setFormattedDate] = useState("");
  const [filterType, setFilterType] = useState("");

  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const formRef = useRef();
  const username = "683231669175";

  const handleAddToCard = async (e) => {
    e.preventDefault();
    try {
      const values = {
        // username: username,
        job_no: jobNo,
        date: formattedDate,
        chassis_no: chassisNo,
        carReg_no: carRegNo,
        car_registration_no: registration,
        vehicle_model: vehicleModel,
        vehicle_brand: vehicleBrand,
        mileage: mileage,
        color: color,
        engine_no: engineNo,
        reference_name: reference,
        company_name: companyName,
        vehicle_category: vehicleCategory,
        customer_name: customerName,
        contact_number: contactNo,
        driver_name: driverName,
        phone_number: phoneNo,
        vehicle_interior_parts: value,
        reported_defect: value2,
        reported_action: value3,
        vehicle_body_report: vehicleBody,
        technician_name: technicianName,
        technician_signature: technicianSignature,
        technician_date: technicianDate,
        vehicle_owner: owner,
      };
      const hasQuotationNullValues = Object.values(values).some(
        (val) => val === null
      );

      if (hasQuotationNullValues) {
        setError("Please fill in all the required fields.");
        return;
      }
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/v1/jobCard",
        values
      );

      console.log(response);
      if (response.data.message === "Successfully add to card post") {
        setLoading(false);
        const newJobNo = jobNo + 1;
        setJobNo(newJobNo);
        setReload(!reload);
        toast.success("Add to job card successful.");
        formRef.current.reset();
        setError(null);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong.");
    }
  };

  const navigate = useNavigate();

  const handlePreview = async (e) => {
    e.preventDefault();
    try {
      const values = {
        username: username,
        job_no: jobNo,
        date: formattedDate,
        chassis_no: chassisNo,
        carReg_no: carRegNo,
        car_registration_no: registration,
        vehicle_model: vehicleModel,
        vehicle_brand: vehicleBrand,
        mileage: mileage,
        color: color,
        engine_no: engineNo,
        reference_name: reference,
        company_name: companyName,
        vehicle_category: vehicleCategory,
        customer_name: customerName,
        contact_number: contactNo,
        driver_name: driverName,
        phone_number: phoneNo,
        vehicle_interior_parts: value,
        reported_defect: value2,
        reported_action: value3,
        vehicle_body_report: vehicleBody,
        technician_name: technicianName,
        technician_signature: technicianSignature,
        technician_date: technicianDate,
        vehicle_owner: owner,
      };
      const hasPreviewNullValues = Object.values(values).some(
        (val) => val === null
      );

      if (hasPreviewNullValues) {
        setError("Please fill in all the required fields.");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/v1/jobCard",
        values
      );
      if (response.data.message === "Successfully add to card post") {
        const newJobNo = jobNo + 1;
        setJobNo(newJobNo);
        setReload(!reload);
        fetch("http://localhost:5000/api/v1/jobCard/recent")
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              navigate(`/dashboard/preview?id=${data._id}`);
            }
          });

        // formRef.current.reset()
        reset();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleQuotation = async (e) => {
    e.preventDefault();
    try {
      const values = {
        username: username,
        job_no: jobNo,
        date: formattedDate,
        chassis_no: chassisNo,
        carReg_no: carRegNo,
        car_registration_no: registration,
        vehicle_model: vehicleModel,
        vehicle_brand: vehicleBrand,
        mileage: mileage,
        color: color,
        engine_no: engineNo,
        reference_name: reference,
        company_name: companyName,
        vehicle_category: vehicleCategory,
        customer_name: customerName,
        contact_number: contactNo,
        driver_name: driverName,
        phone_number: phoneNo,
        vehicle_interior_parts: value,
        reported_defect: value2,
        reported_action: value3,
        vehicle_body_report: vehicleBody,
        technician_name: technicianName,
        technician_signature: technicianSignature,
        technician_date: technicianDate,
        vehicle_owner: owner,
      };

      const hasQuotationNullValues = Object.values(values).some(
        (val) => val === null
      );

      if (hasQuotationNullValues) {
        setError("Please fill in all the required fields.");
        return;
      }
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/v1/jobCard",
        values
      );
      if (response.data.message === "Successfully add to card post") {
        const newJobNo = jobNo + 1;
        setJobNo(newJobNo);
        setReload(!reload);
        navigate(`/dashboard/qutation?order_no=${jobNo}`);
        // formRef.current.reset()
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong.");
    }
  };
  const handleInvoice = async (e) => {
    e.preventDefault();
    try {
      const values = {
        username: username,
        job_no: jobNo,
        date: formattedDate,
        chassis_no: chassisNo,
        carReg_no: carRegNo,
        car_registration_no: registration,
        vehicle_model: vehicleModel,
        vehicle_brand: vehicleBrand,
        mileage: mileage,
        color: color,
        engine_no: engineNo,
        reference_name: reference,
        company_name: companyName,
        vehicle_category: vehicleCategory,
        customer_name: customerName,
        contact_number: contactNo,
        driver_name: driverName,
        phone_number: phoneNo,
        vehicle_interior_parts: value,
        reported_defect: value2,
        reported_action: value3,
        vehicle_body_report: vehicleBody,
        technician_name: technicianName,
        technician_signature: technicianSignature,
        technician_date: technicianDate,
        vehicle_owner: owner,
      };

      const hasQuotationNullValues = Object.values(values).some(
        (val) => val === null
      );

      if (hasQuotationNullValues) {
        setError("Please fill in all the required fields.");
        return;
      }
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/v1/jobCard",
        values
      );
      if (response.data.message === "Successfully add to card post") {
        const newJobNo = jobNo + 1;
        setJobNo(newJobNo);
        setReload(!reload);
        setLoading(false);
        navigate(`/dashboard/invoice?order_no=${jobNo}`);
        // formRef.current.reset()
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong.");
    }
  };
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
  }, [username, reload]);

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

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));


  return (
    <div className="addJobCardWraps">
      <div className=" mb-5 pb-5 mx-auto text-center border-b-2 border-[#42A1DA]">

        <div className="w-full flex justify-between items-center mb-2 mt-5">
          <img src={logo} alt="logo" className="w-[70px] md:w-[210px]" />
          <div>
            <h2 className="  trustAutoTitle trustAutoTitleQutation ">
              Trust Auto Solution{" "}
            </h2>
            <span>Office: Ka-93/4/C, Kuril Bishawroad, Dhaka-1229</span>
          </div>
          <div className="text-left">
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
      <form ref={formRef}>
        <div>
          <div className=" flex  justify-between items-center my-5">
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
                <div className="flex items-center topSearchBa">
                <Autocomplete
                className="jobCardSelect"
                  onChange={(e) => setCarReg(e.target.value)}
                  id="free-solo-demo"
                  Customer ID 
                  options={cmDmOptions.map((option) => option.label)}
                  renderInput={(params) => (
                    <TextField {...params} label="Customer ID " />
                  )}
                />
                </div>
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
              <button className="bg-[#42A1DA] text-white px-2 py-2 rounded-sm ml-2">
                Add Customer
              </button>
            </div>
          </div>

          <div className="jobCardFieldWraps">
            <div className="jobCardFieldLeftSide">
              <h3 className="text-xl mb-5 font-bold">Vehicle Information </h3>

              <div className="mt-3 flex items-center ">
                <Autocomplete
                className="jobCardSelect"
                  onChange={(e) => setCarReg(e.target.value)}
                  id="free-solo-demo"
                  Car
                  Registration
                  No
                  options={cmDmOptions.map((option) => option.label)}
                  renderInput={(params) => (
                    <TextField {...params} label="Car Reg No" />
                  )}
                />
                <TextField
                    className="addJobInputField"
                    onChange={(e) => setRegistration(e.target.value)}
                    label="Car R (T&N)"
                  />
              </div>

              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  onChange={(e) => setChassisNo(e.target.value)}
                  label="Chassis No (T&N)"
                />
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  onChange={(e) => setEngineNo(e.target.value)}
                  label="ENGINE NO & CC (T&N) "
                />
              </div>

              <div className="mt-3">
                <Autocomplete
                  onChange={(e) => setCarReg(e.target.value)}
                  id="free-solo-demo"
                  Vehicle
                  Brand
                  options={carBrands.map((option) => option.label)}
                  renderInput={(params) => (
                    <TextField {...params} label="Vehicle Brand" />
                  )}
                />
              </div>

              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  onChange={(e) => setMileage(e.target.value)}
                  label="Vehicle Name "
                />
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
                <Autocomplete
                  onChange={(e) => setCarModel(e.target.value)}
                  id="free-solo-demo"
                  Vehicle
                  Brand
                  options={totalYear.map((option) => option.title)}
                  renderInput={(params) => (
                    <TextField {...params} label=" Vehicle Model" />
                  )}
                />
              </div>

              <div className="mt-3">
                <Autocomplete
                  onChange={(e) => setVehicleCategory(e.target.value)}
                  id="free-solo-demo"
                  Vehicle
                  Types
                  options={vehicleTypes.map((option) => option.label)}
                  renderInput={(params) => (
                    <TextField {...params} label=" Vehicle Categories " />
                  )}
                />
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  onChange={(e) => setColor(e.target.value)}
                  label="Color & Code (T&N) "
                />
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  onChange={(e) => setMileage(e.target.value)}
                  label="Mileage (N) "
                />
              </div>
              <div className="mt-3">
                <Autocomplete
                  onChange={(e) => setColor(e.target.value)}
                  id="free-solo-demo"
                  Fuel
                  Type
                  options={fuelType.map((option) => option.label)}
                  renderInput={(params) => (
                    <TextField {...params} label=" Fuel Type" />
                  )}
                />
              </div>
            </div>

            <div className="jobCardFieldRightSide">
              <h3 className="text-xl mb-5 font-bold ">Customer Information </h3>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  onChange={(e) => setCompanyName(e.target.value)}
                  label="Company Name (T)"
                />
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  onChange={(e) => setCustomerName(e.target.value)}
                  label="Vehicle User Name (T)"
                />
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  onChange={(e) => setCompanyName(e.target.value)}
                  label="Company Address (T)"
                />
              </div>

              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  onChange={(e) => setCustomerName(e.target.value)}
                  label="Customer Name (T)"
                />
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  onChange={(e) => setContactNo(e.target.value)}
                  label="Customer Contact No (N)"
                />
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  onChange={(e) => setContactNo(e.target.value)}
                  label="Customer Email Address (N)"
                />
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Customer Address (T) "
                />
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  onChange={(e) => setDriverName(e.target.value)}
                  label="Driver Name (T)"
                />
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  onChange={(e) => setPhoneNo(e.target.value)}
                  label="Driver Contact No (N)"
                />
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  onChange={(e) => setReference(e.target.value)}
                  label="Reference Name (T) "
                />
              </div>
            </div>
          </div>

          <div className="vehicleReport mt-10">
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
              <div className="imgWrap mt-2">
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
          <div className="flex items-center justify-between mt-3">
            <div>
              <TextField
                className=" "
                onChange={(e) => setTechnicianName(e.target.value)}
                label="Technician Name (T) "
              />
            </div>
            <div>
              <TextField
                className=" "
                o
                onChange={(e) => setTechnicianSignature(e.target.value)}
                label="Technician Signature (T) "
              />
            </div>
            <div>
              <input
                onChange={(e) => setTechnicianDate(e.target.value)}
                required
                autoComplete="off"
                type="date"
                placeholder="Date"
                min={currentDate}
                className="border-2 p-3"
              />
            </div>
            <div>
              <TextField
                className=" "
                onChange={(e) => setOwner(e.target.value)}
                label="Vehicle Owner (T) "
              />
            </div>
          </div>
          <div className="mt-3">
            <b>This is not an invoice, all estimates are valid for 30 days </b>
          </div>

          <div className="buttonGroup mt-5">
            <div>
              {/* <Link to={`/dashboard/preview?${id}`}> */}
              <button disabled={loading} onClick={handlePreview}>
                Preview
              </button>
              {/* </Link> */}
              {/* <Link to="/dashboard/preview"> */}
              {/* </Link>
              <Link to="/dashboard/preview"> */}
              {/* </Link> */}
              {/* <Link to={`/dashboard/qutation?order_no=${jobNo}`}> */}{" "}
              <button disabled={loading} onClick={handleQuotation}>
                Quotation
              </button>
              {/* </Link> */}
              {/* <Link to="/dashboard/invoice"> */}{" "}
              <button disabled={loading} onClick={handleInvoice}>
                Invoice
              </button>
              {/* </Link> */}
            </div>
            <div className="submitQutationBtn">
              <button
                disabled={loading}
                onClick={handleAddToCard}
                type="submit"
                className=""
              >
                Add To Job Card{" "}
              </button>
            </div>
          </div>
          <div className="pt-6 text-red-400 text-center">{error}</div>
        </div>
      </form>
      <div className="overflow-x-auto mt-20">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm lg:text-3xl font-bold mb-3">Job Card List:</h3>
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
        <div className="flex justify-center items-center text-xl">
          <Loading />
        </div>
      ) : (
        <div>
          {allJobCard?.length === 0 ||
          currentItems.length === 0 ||
          noMatching ? (
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

export default AddJobCard;
