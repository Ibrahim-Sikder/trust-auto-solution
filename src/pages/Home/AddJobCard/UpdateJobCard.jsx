/* eslint-disable no-unused-vars */
import "./AddJobCard.css";
import car from "../../../../public/assets/car2.jpeg";
import logo from "../../../../public/assets/logo.png";
import { useEffect, useRef, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import {
  carBrands,
  countries,
  vehicleModels,
  vehicleName,
  vehicleTypes,
} from "../../../constant";
import { HiOutlineChevronDown, HiOutlinePlus } from "react-icons/hi";
import { CalendarIcon } from "@mui/x-date-pickers";

const UpdateJobCard = () => {
  const [previousPostData, setPreviousPostData] = useState({});
  const [jobNo, setJobNo] = useState(previousPostData.job_no);

  const [customerConError, setCustomerConError] = useState("");
  const [driverConError, setDriverConError] = useState("");
  const [registrationError, setRegistrationError] = useState("");

  const [singleCard, setSingleCard] = useState({});

  const [technicianDateShow, setTechnicianDateShow] = useState(false);
  const [showCalender, setShowCalender] = useState(false);
  const [customerId, setCustomerId] = useState(null);

  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [getFuelType, setGetFuelType] = useState("");

  const [note, setNote] = useState(null);
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
  // const [filterType, setFilterType] = useState("");

  // country code set
  const [countryCode, setCountryCode] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneNumberChange = (e) => {
    const newPhoneNumber = e.target.value;
    if (
      /^\d*$/.test(newPhoneNumber) &&
      newPhoneNumber.length <= 11 &&
      (newPhoneNumber === "" ||
        !newPhoneNumber.startsWith("0") ||
        newPhoneNumber.length > 1)
    ) {
      setPhoneNumber(newPhoneNumber);
    }
  };

  const [loading, setLoading] = useState(false);
  // const [searchLoading, setSearchLoading] = useState(false);
  const formRef = useRef();
  const navigate = useNavigate();

  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`${import.meta.env.VITE_API_URL}/api/v1/jobCard/one/${id}`)
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
        job_no: singleCard.job_no,
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
        note: note || singleCard.note,
        vehicle_body_report: vehicleBody || singleCard.vehicle_body_report,
        technician_name: data.technician_name || singleCard.technician_name,
        technician_signature:
          data.technician_signature || singleCard.technician_signature,
        technician_date: technicianDateShow || singleCard.technician_date,
        vehicle_owner: data.vehicle_owner || singleCard.vehicle_owner,
      };

      setLoading(true);
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/jobCard/one/${id}`,
        values
      );
      if (response.data.message === "Successfully update card.") {
        navigate("/dashboard/jobcard-list");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong.");
    }
  };

  const handleNameChange = (_, newInputValue) => {
    setBrand(newInputValue);
  };
  const handleCategoryChange = (_, newInputValue) => {
    setCategory(newInputValue);
  };
  const handleFuelChange = (_, newInputValue) => {
    setGetFuelType(newInputValue);
  };

  const [selectedBrand, setSelectedBrand] = useState("");
  const [filteredVehicles, setFilteredVehicles] = useState([]);

  const handleBrandChange = (event, newValue) => {
    setSelectedBrand(newValue);
    const filtered = vehicleName.filter(
      (vehicle) => vehicle.label === newValue
    );
    setFilteredVehicles(filtered);
  };

  // year select only number 4 digit
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [yearSelectInput, setYearSelectInput] = useState("");

  // Handle input changes
  const handleYearSelectInput = (event) => {
    const value = event.target.value;
    // Check if the input is a number and does not exceed 4 digits
    if (/^\d{0,4}$/.test(value)) {
      setYearSelectInput(value);
      const filtered = vehicleModels.filter((option) =>
        option.label.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredOptions(filtered);
    }
  };
  const handleOptionClick = (option) => {
    setYearSelectInput(option.label);
    setFilteredOptions([]); // This assumes option.label is the value you want to set in the input
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
    setTechnicianDateShow(formattedDate);
  };

  const currentDate = new Date().toISOString().split("T")[0];

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
                  <b> ID:</b> {singleCard.Id}
                </span>
              </div>
              <input
                onChange={(e) => setCustomerId(e.target.value)}
                type="text"
                className="border-[#ddd] border w-56 h-10 mt-2 p-2 rounded-sm"
                defaultValue={singleCard.Id}
                readOnly
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

                {!showCalender && (
                  <>
                    <span className="mr-2">{singleCard.date}</span>
                    <CalendarIcon
                      onClick={() => setShowCalender(!showCalender)}
                      className="h-2 w-2"
                    />
                  </>
                )}
                {showCalender && (
                  <input
                    onChange={handleDateChange}
                    autoComplete="on"
                    type="date"
                    placeholder="Date"
                    max={currentDate}
                    defaultValue={singleCard.date}
                  />
                )}
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
                  value={singleCard.company_name}
                  // value={singleCard.company_name}
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
                  value={singleCard?.username}
                  onChange={(e) =>
                    setSingleCard({
                      ...singleCard,
                      username: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!singleCard?.username,
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
              </div>
              <div className="mt-3">
                {/* <TextField
                  className="addJobInputField"
                  label="Customer Contact No (N)"
                  {...register("customer_contact", {
                    pattern: {
                      value: /^\d{11}$/,
                      message: "Please enter a valid 11-digit number.",
                    },
                  })}
                  value={singleCard?.customer_contact}
                  onChange={(e) => {
                    if (e.target.value.length === 11) {
                      setCustomerConError("");
                    } else if (e.target.value > 11) {
                      setCustomerConError(
                        "Please enter a valid 11-digit number."
                      );
                    }
                    setSingleCard({
                      ...singleCard,
                      customer_contact: e.target.value,
                    });
                  }}
                  InputLabelProps={{
                    shrink: !!singleCard.customer_contact,
                  }}
                  error={!!errors.customer_contact | !!customerConError}
                  helperText={
                    errors.customer_contact
                      ? errors.customer_contact.message
                      : ""
                  }
                /> */}

                <div className="flex items-center">
                  <Autocomplete
                  sx={{marginRight:'2px'}}
                    className="jobCardSelect2"
                    freeSolo
                    options={countries}
                    getOptionLabel={(option) => option.label}
                    value={countryCode}
                    onChange={(event, newValue) => {
                      setCountryCode(newValue);
                      setPhoneNumber(""); // Reset the phone number when changing country codes
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Country Code"
                        variant="outlined"
                      />
                    )}
                  />
                  <TextField
                    className="carRegField"
                    label="Customer Contact No (N)"
                    variant="outlined"
                    fullWidth
                    type="tel"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    placeholder="Enter phone number"
                  />
                </div>

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
              </div>
              <div className="mt-3">
                {/* <TextField
                  className="addJobInputField"
                  label="Driver Contact No (N)"
                  {...register("driver_contact", {
                    pattern: {
                      value: /^\d{11}$/,
                      message: "Please enter a valid 11-digit number.",
                    },
                  })}
                  value={singleCard?.driver_contact}
                  onChange={(e) => {
                    if (e.target.value.length === 11) {
                      setDriverConError("");
                    } else if (e.target.value > 11) {
                      setDriverConError(
                        "Please enter a valid 11-digit number."
                      );
                    }
                    setSingleCard({
                      ...singleCard,
                      driver_contact: e.target.value,
                    });
                  }}
                  InputLabelProps={{
                    shrink: !!singleCard.driver_contact,
                  }}
                  error={!!errors.driver_contact | !!driverConError}
                  helperText={
                    errors.driver_contact ? errors.driver_contact.message : ""
                  }
                /> */}
                <div className="flex items-center">
                  <Autocomplete
                  sx={{marginRight:'2px'}}
                    className="jobCardSelect2"
                    freeSolo
                    options={countries}
                    getOptionLabel={(option) => option.label}
                    value={countryCode}
                    onChange={(event, newValue) => {
                      setCountryCode(newValue);
                      setPhoneNumber(""); // Reset the phone number when changing country codes
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Country Code"
                        variant="outlined"
                      />
                    )}
                  />
                  <TextField
                    className="carRegField"
                    label="Customer Contact No (N)"
                    variant="outlined"
                    fullWidth
                    type="tel"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    placeholder="Enter phone number"
                  />
                </div>
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
              </div>
            </div>

            <div className="jobCardFieldLeftSide lg:mt-0 mt-5">
              <h3 className="mb-5 text-xl font-bold">Vehicle Information </h3>

              <div className="space-y-3">
                <div className="flex gap-4 md:gap-0 items-center mt-3 ">
                  {/* <Autocomplete
                  className="jobCardSelect2"
                  value={singleCard?.carReg_no}
                  // onChange={handleBrandChange}
                  options={carBrands.map((option) => option.label)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Car Reg No "
                      {...register("carReg_no")}
                      InputLabelProps={{
                        shrink: !!singleCard?.carReg_no,
                      }}
                    />
                  )}
                /> */}
                  <Autocomplete
                    freeSolo
                    className="jobCardSelect2"
                    value={singleCard?.carReg_no || ""}
                    options={carBrands.map((option) => option.label)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Vehicle Reg No"
                        // Handle input props manually
                        InputLabelProps={{
                          shrink: !!singleCard?.carReg_no,
                        }}
                      />
                    )}
                  />

                  <TextField
                    className="carRegField"
                    label="Car R (N)"
                    {...register("car_registration_no", {
                      // required: "Car registration number is required",
                      pattern: {
                        value: /^[\d-]+$/,
                        message: "Only numbers are allowed",
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
                    value={singleCard?.car_registration_no}
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
                      setSingleCard({
                        ...singleCard,
                        car_registration_no: formattedValue,
                      });
                    }}
                    InputLabelProps={{
                      shrink: !!singleCard.car_registration_no,
                    }}
                    error={!!errors.car_registration_no || !!registrationError}
                  />
                </div>
                <div className="">
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
                </div>
                <div className="">
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
                </div>
                <div className="">
                  <Autocomplete
                    freeSolo
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
                  {/* <Autocomplete
                  className="addJobInputField"
                  value={singleCard?.vehicle_brand || ""}
                  onChange={handleBrandChange}
                  options={carBrands.map((option) => option.label)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Vehicle Brand"
                      {...register("vehicle_brand")}
                      InputLabelProps={{
                        shrink: !!singleCard?.vehicle_brand,
                      }}
                    />
                  )}
                /> */}
                </div>
                <div className="">
                  {/* <Autocomplete
                className="addJobInputField"
                freeSolo
                Vehicle
                Name
                onInputChange={(event, newValue) => {
                  handleNameChange(newValue); // Assuming you want the new value as input
                }}
                options={filteredVehicles.map((option) => option.value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Vehicle Name "
                    {...register("vehicle_name")}
                    value={singleCard?.vehicle_name}
                    focused={singleCard?.vehicle_name}
                  />
                )}
                getOptionLabel={(option) => option || ""}
                // disabled={!selectedBrand}
              /> */}
                  <Autocomplete
                    className="addJobInputField"
                    freeSolo
                    Vehicle
                    Name
                    value={singleCard?.vehicle_name || ""}
                    options={filteredVehicles.map((option) => option.value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Vehicle Name "
                        {...register("vehicle_name")}
                      />
                    )}
                    getOptionLabel={(option) => option || ""}
                    // disabled={!selectedBrand}
                  />
                </div>
                <div className=" relative ">
                  {/* <Autocomplete
                  className="addJobInputField"
                  // onInputChange={handleModelChange}
                  options={vehicleModels.map((option) => option.label)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label=" Vehicle Model "
                      {...register("vehicle_model")}
                      value={singleCard?.vehicle_model}
                      focused={singleCard?.vehicle_model}
                      onChange={(e) => {
                        const input = e.target.value;

                        if (/^\d{0,4}$/.test(input)) {
                          setSingleCard({
                            ...singleCard,
                            vehicle_model: input,
                          });
                        }
                      }}
                    />
                  )}
                /> */}
                  <input
                    value={yearSelectInput}
                    onInput={handleYearSelectInput}
                    {...register("vehicle_model")}
                    type="text"
                    className="border border-[#11111157] mb-5 w-[98%] h-12 p-3 rounded-md"
                    placeholder="Vehicle Model"
                    onChange={(e) => {
                      setSingleCard({
                        ...singleCard,
                        vehicle_model: e.target.value,
                      });
                    }}
                  />
                  {yearSelectInput && (
                    <ul className="options-list">
                      {filteredOptions.map((option, index) => (
                        <li
                          key={index}
                          onClick={() => handleOptionClick(option)}
                        >
                          {option.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="">
                  {/* <Autocomplete
                  className="addJobInputField"
                  value={singleCard?.vehicle_category}
                  focused={singleCard?.vehicle_category}
                  onInputChange={handleCategoryChange}
                  options={carBrands.map((option) => option.label)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Vehicle Category "
                      {...register("vehicle_category")}
                      InputLabelProps={{
                        shrink: !!singleCard?.vehicle_category,
                      }}
                    />
                  )}
                /> */}
                  <Autocomplete
                    freeSolo
                    className="addJobInputField"
                    value={singleCard?.vehicle_category || ""}
                    options={vehicleTypes.map((option) => option.label)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Vehicle Category"
                        // Handle input props manually
                        InputLabelProps={{
                          shrink: !!singleCard?.vehicle_category,
                        }}
                      />
                    )}
                  />
                </div>
                <div className="">
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
                </div>
                <div className="">
                  <TextField
                    className="addJobInputField"
                    label="Mileage (N) "
                    {...register("mileage", {
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
                  {errors.mileage && (
                    <span className="text-sm text-red-400">
                      {errors.mileage.message}
                    </span>
                  )}
                </div>
                <div className="">
                  {/* <Autocomplete
                  className="addJobInputField"
                  value={singleCard?.fuel_type}
                  focused={singleCard?.fuel_type}
                  id="free-solo-demo"
                  Fuel
                  Type
                  onInputChange={handleFuelChange}
                  options={carBrands.map((option) => option.label)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Fuel Type "
                      {...register("fuel_type")}
                      InputLabelProps={{
                        shrink: !!singleCard?.fuel_type,
                      }}
                    />
                  )}
                /> */}
                  <Autocomplete
                    freeSolo
                    className="addJobInputField"
                    value={singleCard?.fuel_type || ""}
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
                </div>
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
                <b className="block mb-1 "> Note </b>
                <textarea
                  onChange={(e) => setNote(e.target.value)}
                  autoComplete="off"
                  defaultValue={singleCard.note}
                ></textarea>
              </div>
              <div className="mt-5">
                <b className="block mb-1 "> Vehicle Body Report Comments</b>
                <textarea
                  className="p-5"
                  defaultValue={singleCard.vehicle_body_report}
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
                {...register("technician_name")}
                label="Technician Name (T) "
                value={singleCard.technician_name}
                onChange={(e) =>
                  setSingleCard({
                    ...singleCard,
                    technician_name: e.target.value,
                  })
                }
                InputLabelProps={{
                  shrink: !!singleCard?.technician_name,
                }}
              />
            </div>
            <div>
              <TextField
                className="ownerInput"
                o
                {...register("technician_signature")}
                label="Technician Signature (T) "
                disabled
              />
            </div>
            <div>
              {!technicianDateShow && (
                <div className="p-3 border-2 ownerInput">
                  {singleCard.technician_date}
                  <CalendarIcon
                    onClick={() => setTechnicianDateShow(!technicianDateShow)}
                  />
                </div>
              )}
              {technicianDateShow && (
                <>
                  <input
                    onChange={handleTechnicianDateChange}
                    required
                    autoComplete="off"
                    type="date"
                    placeholder="Date"
                    min={currentDate}
                    className="p-3 border-2 ownerInput"
                    defaultValue={singleCard.technician_date}
                  />
                  {errors.technician_date && (
                    <span className="text-sm text-red-400">
                      This field is required.
                    </span>
                  )}
                </>
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
            <button disabled={loading} type="submit" className="addJobBtn">
              Update Job Card{" "}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateJobCard;
