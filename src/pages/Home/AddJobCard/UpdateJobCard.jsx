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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import {
  carBrands,
  cmDmOptions,
  fuelType,
  totalYear,
  vehicleName,
  vehicleTypes,
} from "../../../constant";
import Cookies from "js-cookie";
import { HiOutlineChevronDown, HiOutlinePlus } from "react-icons/hi";
import { Controller } from "react-hook-form";
const UpdateJobCard = () => {
  const [previousPostData, setPreviousPostData] = useState({});
  const [jobNo, setJobNo] = useState(previousPostData.job_no);
  const [allJobCard, setAllJobCard] = useState([]);

  const [singleCard, setSingleCard] = useState({});
  console.log(singleCard);

  const [noMatching, setNoMatching] = useState(null);
  const [customerId, setCustomerId] = useState(null);

  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [getFuelType, setGetFuelType] = useState("");

  const [vehicleBody, setVehicleBody] = useState(null);

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
    watch,
    formState: { errors },
  } = useForm();
  const [formattedDate, setFormattedDate] = useState("");
  const [filterType, setFilterType] = useState("");

  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const formRef = useRef();
  const navigate = useNavigate();

  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`http://localhost:5000/api/v1/jobCard/one/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setSingleCard(data);
          setLoading(false);
        });
    }
  }, [id]);

  const onSubmit = async (data) => {
    try {
      if (!singleCard.Id) {
        return toast.error("Please add your Id.");
      }
      const values = {
        Id: customerId || singleCard.Id,
        job_no: jobNo || singleCard.job_no,
        date: formattedDate || singleCard.date,
        company_name: data.company_name || singleCard.company_name,
        username: data.username || singleCard.username,
        company_address: data.company_address || singleCard.company_address,
        customer_name: data.customer_name || singleCard.customer_name,
        customer_contact: data.customer_contact || singleCard.customer_contact,
        customer_email: data.customer_email || singleCard.customer_email,
        customer_address: data.customer_address || singleCard.customer_address,
        driver_name: data.driver_name || singleCard.driver_name,
        driver_contact: data.driver_contact || singleCard.driver_contact,
        reference_name: data.reference_name || singleCard.reference_name,
        carReg_no: data.carReg_no || singleCard.carReg_no,
        car_registration_no:
          data.car_registration_no || singleCard.car_registration_no,
        chassis_no: data.chassis_no || singleCard.chassis_no,
        engine_no: data.engine_no || singleCard.engine_no,
        vehicle_brand: data.vehicle_brand || singleCard.vehicle_brand,
        vehicle_name: data.vehicle_name || singleCard.vehicle_name,
        vehicle_model: data.vehicle_model || singleCard.vehicle_model,
        vehicle_category: data.vehicle_category || singleCard.vehicle_category,
        color_code: data.color_code || singleCard.color_code,
        mileage: data.mileage || singleCard.mileage,
        fuel_type: data.fuel_type || singleCard.fuel_type,
        vehicle_interior_parts: value || singleCard.vehicle_interior_parts,
        reported_defect: value2 || singleCard.reported_defect,
        reported_action: value3 || singleCard.reported_action,
        vehicle_body_report: vehicleBody || singleCard.vehicle_body_report,
        technician_name: data.technician_name || singleCard.technician_name,
        technician_signature:
          data.technician_signature || singleCard.technician_signature,
        technician_date: data.technician_date || singleCard.technician_date,
        vehicle_owner: data.vehicle_owner || singleCard.vehicle_owner,
      };

      setLoading(true);
      const response = await axios.put(
        `http://localhost:5000/api/v1/jobCard/one/${id}`,
        values
      );
      if (response.data.message === "Successfully update card.") {
        navigate("/dashboard/addjob");
        setLoading(false);
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

  const currentDate = new Date().toISOString().split("T")[0];
  useEffect(() => {
    const currentDate = new Date();

    // Set the day to 1 to get the first day of the month
    currentDate.setDate(1);

    // Get the current month and year
    const currentMonth = currentDate.getMonth() + 1; // Note: January is 0
    const currentYear = currentDate.getFullYear();

    // Format the date string as "YYYY-MM-DD"
    const formattedDate = `${currentYear}-${
      currentMonth < 10 ? "0" : ""
    }${currentMonth}-01`;

    setFormattedDate(currentDate);
  }, []);



  return (
    <div className="mb-20 addJobCardWraps">
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
                <span>{singleCard.job_no}</span>
              </div>
              <div>
                <span>
                  <b>Customer ID:</b> TAS000
                </span>
              </div>
              <input
                onChange={(e) => setCustomerId(e.target.value)}
                type="text"
                className="border-[#ddd] border w-56 h-10 mt-2 p-2 rounded-sm"
                defaultValue={singleCard.Id}
              />
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
                  defaultValue={singleCard.date}
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

          <div className="jobCardFieldWraps">
            <div className="jobCardFieldRightSide">
              <h3 className="mb-5 text-xl font-bold ">Customer Information </h3>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  {...register("company_name")}
                  label="Company Name (T)"
                  defaultValue={singleCard.company_name}
                  value={singleCard.company_name}
                  onChange={(e) =>
                    setSingleCard({
                      ...singleCard,
                      company_name: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!singleCard.company_name,
                  }}
                />
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Vehicle User Name (T)"
                  {...register("username")}
                  defaultValue={singleCard?.username}
                  onChange={(e) =>
                    setSingleCard({
                      ...singleCard,
                      username: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!singleCard.username,
                  }}
                />
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Company Address (T)"
                  {...register("company_address")}
                  value={singleCard?.company_address}
                  onChange={(e) =>
                    setSingleCard({
                      ...singleCard,
                      company_address: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!singleCard.company_address,
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
                  value={singleCard?.customer_name}
                  onChange={(e) =>
                    setSingleCard({
                      ...singleCard,
                      customer_name: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!singleCard.customer_name,
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
                    // required: "This field is required.",
                    pattern: {
                      value: /^\d{11}$/,
                      message: "Please enter a valid number.",
                    },
                  })}
                  value={singleCard?.customer_contact}
                  onChange={(e) =>
                    setSingleCard({
                      ...singleCard,
                      customer_contact: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!singleCard.customer_contact,
                  }}
                />
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Customer Email Address (T)"
                  {...register("customer_email")}
                  type="email"
                  value={singleCard?.customer_email}
                  onChange={(e) =>
                    setSingleCard({
                      ...singleCard,
                      customer_email: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!singleCard.customer_email,
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
                  value={singleCard?.customer_address}
                  onChange={(e) =>
                    setSingleCard({
                      ...singleCard,
                      customer_address: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!singleCard.customer_address,
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
                  value={singleCard?.driver_name}
                  onChange={(e) =>
                    setSingleCard({
                      ...singleCard,
                      driver_name: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!singleCard.driver_name,
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
                    // required: "This field is required.",
                    pattern: {
                      value: /^\d{11}$/,
                      message: "Please enter a valid number.",
                    },
                  })}
                  value={singleCard?.driver_contact}
                  onChange={(e) =>
                    setSingleCard({
                      ...singleCard,
                      driver_contact: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!singleCard.driver_contact,
                  }}
                />
                {/* {errors.driver_contact && (
              <span className="text-sm text-red-400">
                {errors.driver_contact.message}
              </span>
            )} */}
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Reference Name (T) "
                  {...register("reference_name")}
                  value={singleCard?.reference_name}
                  onChange={(e) =>
                    setSingleCard({
                      ...singleCard,
                      reference_name: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!singleCard.reference_name,
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

              <div className="flex flex-wrap gap-4 md:gap-0 items-center mt-3 ">
              <Autocomplete
                  className="addJobInputField"
                  value={singleCard?.carReg_no || ""}
                  onChange={handleBrandChange}
                  options={carBrands.map((option) => option.label)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Car Reg No "
                      // Handle input props manually
                      InputLabelProps={{
                        shrink: !!singleCard?.carReg_no,
                      }}
                    />
                  )}
                />

               
                <TextField
                  className="jobCardSelect2"
                  label="Car R (T&N)"
                  {...register("car_registration_no")}
                  value={singleCard?.car_registration_no}
                  onChange={(e) =>
                    setSingleCard({
                      ...singleCard,
                      car_registration_no: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!singleCard.car_registration_no,
                  }}
                />
              </div>

              {/* {errors.car_registration_no && (
                <span className="text-sm text-red-400">
                  This field is required.
                </span>
              )} */}

              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  {...register("chassis_no")}
                  label="Chassis No (T&N)"
                  value={singleCard?.chassis_no}
                  onChange={(e) =>
                    setSingleCard({
                      ...singleCard,
                      chassis_no: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!singleCard.chassis_no,
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
                  value={singleCard?.engine_no}
                  onChange={(e) =>
                    setSingleCard({
                      ...singleCard,
                      engine_no: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!singleCard.engine_no,
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
                  value={singleCard?.vehicle_brand || ""}
                  onChange={handleBrandChange}
                  options={carBrands.map((option) => option.label)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Vehicle Brand"
                      // Handle input props manually
                      InputLabelProps={{
                        shrink: !!singleCard?.vehicle_brand,
                      }}
                    />
                  )}
                />
               
              </div>

              <div className="mt-3">
              <Autocomplete
                  className="addJobInputField"
                  value={singleCard?.vehicle_name || ""}
                  onChange={handleBrandChange}
                  options={carBrands.map((option) => option.label)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Vehicle Name "
                      // Handle input props manually
                      InputLabelProps={{
                        shrink: !!singleCard?.vehicle_name,
                      }}
                    />
                  )}
                />
                {/* {errors.vehicle_brand && !brand && (
                <span className="text-sm text-red-400">
                  This field is required.
                </span>
              )} */}
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
                className="addJobInputField"
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
                    // required: "This field is required.",
                    pattern: {
                      value: /^\d+$/,
                      message: "Please enter a valid model number.",
                    },
                  })}
                  value={singleCard?.vehicle_model}
                  onChange={(e) =>
                    setSingleCard({
                      ...singleCard,
                      vehicle_model: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!singleCard.vehicle_model,
                  }}
                />

                {/* {errors.vehicle_model && (
                  <span className="text-sm text-red-400">
                    {errors.vehicle_model.message}
                  </span>
                )} */}
              </div>

              <div className="mt-3">
              <Autocomplete
                  className="addJobInputField"
                  value={singleCard?.vehicle_category || ""}
                  onChange={handleBrandChange}
                  options={carBrands.map((option) => option.label)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Vehicle Category "
                      // Handle input props manually
                      InputLabelProps={{
                        shrink: !!singleCard?.vehicle_category,
                      }}
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
                  value={singleCard?.color_code}
                  onChange={(e) =>
                    setSingleCard({
                      ...singleCard,
                      color_code: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!singleCard.color_code,
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
                  value={singleCard?.mileage}
                  onChange={(e) =>
                    setSingleCard({
                      ...singleCard,
                      mileage: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!singleCard.mileage,
                  }}
                />
                {/* {errors.mileage && (
                  <span className="text-sm text-red-400">
                    {errors.mileage.message}
                  </span>
                )} */}
              </div>
              <div className="mt-3">
              <Autocomplete
                  className="addJobInputField"
                  value={singleCard?.fuel_type || ""}
                  onChange={handleBrandChange}
                  options={carBrands.map((option) => option.label)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Fuel Type "
                      // Handle input props manually
                      InputLabelProps={{
                        shrink: !!singleCard?.fuel_type,
                      }}
                    />
                  )}
                />

                {/* <Autocomplete
                  className="addJobInputField"
                  value={singleCard?.fuel_type}
                  focused={singleCard?.fuel_type}
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
                      value={singleCard?.fuel_type}
                    />
                  )}
                /> */}
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
                  value={singleCard.vehicle_interior_parts}
                  className="textEditor"
                  onChange={(content) =>
                    setSingleCard((prevState) => ({
                      ...prevState,
                      vehicle_interior_parts: content,
                    }))
                  }
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
                  value={singleCard.reported_defect}
                  className="textEditor"
                  onChange={(content) =>
                    setSingleCard((prevState) => ({
                      ...prevState,
                      reported_defect: content,
                    }))
                  }
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
                  value={singleCard.reported_action}
                  className="textEditor"
                  onChange={(content) =>
                    setSingleCard((prevState) => ({
                      ...prevState,
                      reported_action: content,
                    }))
                  }
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
              <div className="mt-5">
                <b className="block mb-1 "> Note  </b>
                <textarea
                  onChange={(e) => setVehicleBody(e.target.value)}
                  required
                  autoComplete="off"
                ></textarea>
              </div>
              <div className="mt-5">
                <b className="block mb-1 "> Vehicle Body Report Comments</b>
                <textarea
                  className="p-5"
                  value={singleCard.vehicle_body_report}
                  onChange={(e) =>
                    setSingleCard((prevState) => ({
                      ...prevState,
                      vehicle_body_report: e.target.value,
                    }))
                  }
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
                {...register("technician_name")}
                label="Technician Name (T) "
              />
            </div>
            <div>
              <TextField
                // disabled
                className="ownerInput"
                o
                {...register("technician_signature")}
                label="Technician Signature (T) "
              />
            </div>
            <div>
              <input
                {...register("technician_date")}
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
              <br />
              {errors.vehicle_owner && (
                <span className="text-sm text-red-400">
                  This field is required.
                </span>
              )}
            </div>
          </div>

          <div className="mt-12">
            <button
              disabled={loading}
              // onClick={handleAddToCard}
              type="submit"
              className="addJobBtn"
            >
              Update Job Card{" "}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateJobCard;
