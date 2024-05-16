/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */

import TextField from "@mui/material/TextField";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Autocomplete } from "@mui/material";
import {
  carBrands,
  cmDmOptions,
  countries,
  fuelType,
  vehicleModels,
  vehicleName,
  vehicleTypes,
} from "../../../constant";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

import { HiOfficeBuilding } from "react-icons/hi";
import HeaderButton from "../../../components/CommonButton/HeaderButton";
import { NotificationAdd } from "@mui/icons-material";
import { FaUserGear } from "react-icons/fa6";

const UpdateShowRoom = () => {
  const [showRoomData, setShowRoomData] = useState({});

  const [registrationError, setRegistrationError] = useState("");

  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const navigate = useNavigate();


  // country code 
  const [countryCode, setCountryCode] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [driverPhoneNumber, setDriverPhoneNumber] = useState("");

  const handlePhoneNumberChange = (e) => {
    const newPhoneNumber = e.target.value;
    if (/^\d*$/.test(newPhoneNumber) && newPhoneNumber.length <= 11 && (newPhoneNumber === '' || (!newPhoneNumber.startsWith('0') || newPhoneNumber.length > 1))) {
      setPhoneNumber(newPhoneNumber);
    }
  };


  const handleDriverPhoneNumberChange = (e) => {
    const newPhoneNumber = e.target.value;
    if (/^\d*$/.test(newPhoneNumber) && newPhoneNumber.length <= 11 && (newPhoneNumber === '' || (!newPhoneNumber.startsWith('0') || newPhoneNumber.length > 1))) {
      setDriverPhoneNumber(newPhoneNumber);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/v1/showRoom/one/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setShowRoomData(data);

        setLoading(false);
      });
  }, [id, reload]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const values = {
        showRoomId: showRoomData.showRoomId,
        showRoom_name: data.showRoom_name || showRoomData.showRoom_name,
        username: data.username || showRoomData.username,
        showRoom_address:
          data.showRoom_address || showRoomData.showRoom_address,
        company_name: data.company_name || showRoomData.company_name,
        company_address: data.company_address || showRoomData.company_address,
        company_contact: data.company_contact || showRoomData.company_contact,
        company_email: data.company_email || showRoomData.company_email,
        driver_name: data.driver_name || showRoomData.driver_name,
        driver_contact: data.driver_contact || showRoomData.driver_contact,
        reference_name: data.reference_name || showRoomData.reference_name,

        carReg_no: data.carReg_no || showRoomData.carReg_no,
        car_registration_no:
          data.car_registration_no || showRoomData.car_registration_no,
        chassis_no: data.chassis_no || showRoomData.chassis_no,
        engine_no: data.engine_no || showRoomData.engine_no,
        vehicle_brand: data.vehicle_brand || showRoomData.vehicle_brand,
        vehicle_name: data.vehicle_name || showRoomData.vehicle_name,
        vehicle_model: data.vehicle_model || showRoomData.vehicle_model,
        vehicle_category:
          data.vehicle_category || showRoomData.vehicle_category,
        color_code: data.color_code || showRoomData.color_code,
        mileage: data.mileage || showRoomData.mileage,
        fuel_type: data.fuel_type || showRoomData.fuel_type,
      };

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/showRoom/one/${id}`,
        values
      );

      if (response.data.message === "Successfully update card.") {
        setReload(!reload);
        navigate("/dashboard/show-room-list");
        toast.success("Successfully add to show room post");
        setLoading(false);
        reset();
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const [selectedBrand, setSelectedBrand] = useState("");
  //   const [filteredVehicles, setFilteredVehicles] = useState([]);

  // year select only number 4 digit
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [yearSelectInput, setYearSelectInput] = useState("");
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const handleBrandChange = (event, newValue) => {
    setSelectedBrand(newValue);
    const filtered = vehicleName.filter(
      (vehicle) => vehicle.label === newValue
    );
    setFilteredVehicles(filtered);
  };

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

  return (
    <section>
      <div className=" addProductWraps">
      <div className="flex justify-between pb-3 border-b-2 px-2">
          <HeaderButton />
          <div className="flex items-end justify-end">
            <NotificationAdd size={30} className="mr-2" />
            <FaUserGear size={30} />
          </div>
        </div>
        <div className="productHeadWrap">
          <div className="flex items-center justify-center ">
            <HiOfficeBuilding className="invoicIcon" />
            <div className="ml-2">
              <h3 className="text-xl font-bold md:text-2xl">
                {" "}
                Update Show Room{" "}
              </h3>
              <span>Update New Show Room </span>
            </div>
          </div>
          <div className="productHome">
            <span>Home / </span>
            <span>Show Room / </span>
            <span>New Show Room </span>
          </div>
        </div>

        <div className="addProductWrap">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap justify-center">
              <div>
                <h3 className="mb-1 ml-2 text-xl font-bold md:ml-0">
                  Show Room Information{" "}
                </h3>
                <div>
                  <TextField
                    className="productField"
                    on
                    label="Show Room Name (T)"
                    {...register("showRoom_name")}
                    defaultValue={showRoomData.showRoom_name}
                    value={showRoomData.showRoom_name}
                    onChange={(e) =>
                      setShowRoomData({
                        ...showRoomData,
                        showRoom_name: e.target.value,
                      })
                    }
                    InputLabelProps={{
                      shrink: !!showRoomData.showRoom_name,
                    }}
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    onC
                    label="Vehicle User Name (T)"
                    {...register("username")}
                    defaultValue={showRoomData.username}
                    value={showRoomData.username}
                    onChange={(e) =>
                      setShowRoomData({
                        ...showRoomData,
                        username: e.target.value,
                      })
                    }
                    InputLabelProps={{
                      shrink: !!showRoomData.username,
                    }}
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    on
                    label="Show Room Address (T)"
                    {...register("showRoom_address")}
                    defaultValue={showRoomData.showRoom_address}
                    value={showRoomData.showRoom_address}
                    onChange={(e) =>
                      setShowRoomData({
                        ...showRoomData,
                        showRoom_address: e.target.value,
                      })
                    }
                    InputLabelProps={{
                      shrink: !!showRoomData.showRoom_address,
                    }}
                  />
                </div>

                <div>
                  <TextField
                    className="productField"
                    onC
                    label="Company Name (T)"
                    {...register("company_name")}
                    defaultValue={showRoomData.company_name}
                    value={showRoomData.company_name}
                    onChange={(e) =>
                      setShowRoomData({
                        ...showRoomData,
                        company_name: e.target.value,
                      })
                    }
                    InputLabelProps={{
                      shrink: !!showRoomData.company_name,
                    }}
                  />
                </div>
                {/* <div>
                  <TextField
                    className="productField"
                    label="Company Contact No (N)"
                    {...register("company_contact", {
                      pattern: {
                        value: /^\d{11}$/,
                        message: "Please enter a valid number.",
                      },
                    })}
                    defaultValue={showRoomData.company_contact}
                    value={showRoomData.company_contact}
                    onChange={(e) =>
                      setShowRoomData({
                        ...showRoomData,
                        company_contact: e.target.value,
                      })
                    }
                    InputLabelProps={{
                      shrink: !!showRoomData.company_contact,
                    }}
                  />
                  {errors.company_contact && (
                    <span className="text-sm text-red-400">
                      {errors.company_contact.message}
                    </span>
                  )}
                </div> */}

                <div className="flex items-center my-1">
                  <Autocomplete
                    sx={{ marginRight: "2px", marginLeft: '5px' }}
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
                   {...register("company_contact")}
                    className="productField2"
                    label="Company Contact No (N)"
                    variant="outlined"
                    fullWidth
                    type="tel"
                    value={phoneNumber ? phoneNumber : showRoomData.company_contact}
                    onChange={handlePhoneNumberChange}
                    placeholder="Enter phone number"
                    focused ={showRoomData.company_contact}
                    InputLabelProps={{
                      shrink: !!showRoomData.company_contact,
                    }}
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="Company Email Address (N)"
                    {...register("company_email")}
                    type="email"
                    defaultValue={showRoomData.company_email}
                    value={showRoomData.company_email}
                    onChange={(e) =>
                      setShowRoomData({
                        ...showRoomData,
                        company_email: e.target.value,
                      })
                    }
                    InputLabelProps={{
                      shrink: !!showRoomData.company_email,
                    }}
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="Company Address (T) "
                    {...register("company_address")}
                    defaultValue={showRoomData.company_address}
                    value={showRoomData.company_address}
                    onChange={(e) =>
                      setShowRoomData({
                        ...showRoomData,
                        company_address: e.target.value,
                      })
                    }
                    InputLabelProps={{
                      shrink: !!showRoomData.company_address,
                    }}
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    o
                    label="Driver Name (T)"
                    {...register("driver_name")}
                    defaultValue={showRoomData.driver_name}
                    value={showRoomData.driver_name}
                    onChange={(e) =>
                      setShowRoomData({
                        ...showRoomData,
                        driver_name: e.target.value,
                      })
                    }
                    InputLabelProps={{
                      shrink: !!showRoomData.driver_name,
                    }}
                  />
                </div>
                {/* <div>
                  <TextField
                    className="productField"
                    label="Driver Contact No (N)"
                    {...register("driver_contact", {
                      pattern: {
                        value: /^\d{11}$/,
                        message: "Please enter a valid number.",
                      },
                    })}
                    defaultValue={showRoomData.driver_contact}
                    value={showRoomData.driver_contact}
                    onChange={(e) =>
                      setShowRoomData({
                        ...showRoomData,
                        driver_contact: e.target.value,
                      })
                    }
                    InputLabelProps={{
                      shrink: !!showRoomData.driver_contact,
                    }}
                  />
                  {errors.driver_contact && (
                    <span className="text-sm text-red-400">
                      {errors.driver_contact.message}
                    </span>
                  )}
                </div> */}

                <div className="flex items-center my-1">
                  <Autocomplete
                    sx={{ marginRight: "2px", marginLeft: '5px' }}
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
                   {...register("driver_contact")}
                    className="productField2"
                    label="Driver Contact No (N)"
                    variant="outlined"
                    fullWidth
                    type="tel"
                    value={driverPhoneNumber ? driverPhoneNumber : showRoomData.driver_contact}
                    onChange={handleDriverPhoneNumberChange}
                    placeholder="Enter phone number"
                    focused ={showRoomData.driver_contact}
                    InputLabelProps={{
                      shrink: !!showRoomData.driver_contact,
                    }}
                  />
                </div>


                <div>
                  <TextField
                    className="productField"
                    label="Reference Name (T) "
                    {...register("reference_name")}
                    defaultValue={showRoomData.reference_name}
                    value={showRoomData.reference_name}
                    onChange={(e) =>
                      setShowRoomData({
                        ...showRoomData,
                        reference_name: e.target.value,
                      })
                    }
                    InputLabelProps={{
                      shrink: !!showRoomData.reference_name,
                    }}
                  />
                </div>
              </div>

              <div className="mt-5 md:mt-0">
                <h3 className="mb-1 ml-2 text-xl font-bold md:ml-0">
                  Vehicle Information{" "}
                </h3>
                <div className="flex items-center mt-1 productField">
                  <Autocomplete
                    className="addJobInputField"
                    value={showRoomData?.carReg_no || ""}
                    options={carBrands.map((option) => option.label)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Car Reg No "
                        // Handle input props manually
                        InputLabelProps={{
                          shrink: !!showRoomData?.carReg_no,
                        }}
                      />
                    )}
                  />

                  <TextField
                    className="carRegNumbers"
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
                    value={showRoomData?.car_registration_no}
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
                      setShowRoomData({
                        ...showRoomData,
                        car_registration_no: formattedValue,
                      });
                    }}
                    InputLabelProps={{
                      shrink: !!showRoomData.car_registration_no,
                    }}
                    error={!!errors.car_registration_no || !!registrationError}
                  />
                </div>

                <div>
                  <TextField
                    className="productField"
                    label="Chassis No (T&N)"
                    {...register("chassis_no")}
                    defaultValue={showRoomData.chassis_no}
                    value={showRoomData.chassis_no}
                    onChange={(e) =>
                      setShowRoomData({
                        ...showRoomData,
                        chassis_no: e.target.value,
                      })
                    }
                    InputLabelProps={{
                      shrink: !!showRoomData.chassis_no,
                    }}
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="ENGINE NO & CC (T&N) "
                    {...register("engine_no")}
                    defaultValue={showRoomData.engine_no}
                    value={showRoomData.engine_no}
                    onChange={(e) =>
                      setShowRoomData({
                        ...showRoomData,
                        engine_no: e.target.value,
                      })
                    }
                    InputLabelProps={{
                      shrink: !!showRoomData.engine_no,
                    }}
                  />
                </div>

                <div>
                  {/* <Autocomplete
                  className="addJobInputField"
                  value={showRoomData?.vehicle_brand || ""}
                  options={carBrands.map((option) => option.label)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Vehicle Brand "
                      // Handle input props manually
                      InputLabelProps={{
                        shrink: !!showRoomData?.vehicle_brand,
                      }}
                    />
                  )}
                /> */}
                  <Autocomplete
                    freeSolo
                    className="productField"
                    value={showRoomData?.vehicle_brand || ""}
                    onChange={handleBrandChange}
                    options={carBrands.map((option) => option.label)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Vehicle Brand"
                        // Handle input props manually
                        InputLabelProps={{
                          shrink: !!showRoomData?.vehicle_brand,
                        }}
                      />
                    )}
                  />
                </div>
                <div>
                  {/* <TextField
                    className="productField"
                    label="Vehicle Name "
                    {...register("vehicle_name")}
                    defaultValue={showRoomData.vehicle_name}
                    value={showRoomData.vehicle_name}
                    onChange={(e) =>
                      setShowRoomData({
                        ...showRoomData,
                        vehicle_name: e.target.value,
                      })
                    }
                    InputLabelProps={{
                      shrink: !!showRoomData.vehicle_name,
                    }}
                  /> */}
                  <Autocomplete
                    className="productField"
                    freeSolo
                    Vehicle
                    Name
                    value={showRoomData?.vehicle_name || ""}
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
                <div className="relative">
                  {/* <TextField
                    className="productField"
                    label="Vehicle Model (N)"
                    {...register("vehicle_model", {
                      pattern: {
                        value: /^\d+$/,
                        message: "Please enter a valid model number.",
                      },
                    })}
                    defaultValue={showRoomData.vehicle_model}
                    value={showRoomData.vehicle_model}
                    onChange={(e) =>
                      setShowRoomData({
                        ...showRoomData,
                        company_name: e.target.value,
                      })
                    }
                    InputLabelProps={{
                      shrink: !!showRoomData.vehicle_model,
                    }}
                  /> */}
                  <input
                    value={showRoomData?.vehicle_model}
                    onInput={handleYearSelectInput}
                    {...register("vehicle_model")}
                    type="text"
                    className="border productField border-[#11111194] mb-5 w-[98%] h-12 p-3 rounded-md"
                    placeholder="Vehicle Model"
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
                  {errors.vehicle_model && (
                    <span className="text-sm text-red-400">
                      {errors.vehicle_model.message}
                    </span>
                  )}
                </div>
                <div className="mt-3">
                  {/* <Autocomplete
                  className="addJobInputField"
                  value={showRoomData?.vehicle_category || ""}
                  options={carBrands.map((option) => option.label)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Vehicle Category "
                      // Handle input props manually
                      InputLabelProps={{
                        shrink: !!showRoomData?.vehicle_category,
                      }}
                    />
                  )}
                /> */}
                  <Autocomplete
                    freeSolo
                    className="productField"
                    value={showRoomData?.vehicle_category || ""}
                    options={vehicleTypes.map((option) => option.label)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Vehicle Category"
                        // Handle input props manually
                        InputLabelProps={{
                          shrink: !!showRoomData?.vehicle_category,
                        }}
                      />
                    )}
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="Color & Code (T&N) "
                    {...register("color_code")}
                    defaultValue={showRoomData.color_code}
                    value={showRoomData.color_code}
                    onChange={(e) =>
                      setShowRoomData({
                        ...showRoomData,
                        color_code: e.target.value,
                      })
                    }
                    InputLabelProps={{
                      shrink: !!showRoomData.color_code,
                    }}
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="Mileage (N) "
                    {...register("mileage", {
                      pattern: {
                        value: /^\d+$/,
                        message: "Please enter a valid number.",
                      },
                    })}
                    defaultValue={showRoomData.mileage}
                    value={showRoomData.mileage}
                    onChange={(e) =>
                      setShowRoomData({
                        ...showRoomData,
                        mileage: e.target.value,
                      })
                    }
                    InputLabelProps={{
                      shrink: !!showRoomData.mileage,
                    }}
                  />
                  {errors.mileage && (
                    <span className="text-sm text-red-400">
                      {errors.mileage.message}
                    </span>
                  )}
                </div>
                <div>
                  {/* <Autocomplete
                  className="addJobInputField"
                  value={showRoomData?.fuel_type || ""}
                  options={carBrands.map((option) => option.label)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Fuel Type "
                      // Handle input props manually
                      InputLabelProps={{
                        shrink: !!showRoomData?.fuel_type,
                      }}
                    />
                  )}
                /> */}

                  <Autocomplete
                    freeSolo
                    className="productField"
                    value={showRoomData?.fuel_type || ""}
                    options={carBrands.map((option) => option.label)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Fuel Type "
                        // Handle input props manually
                        InputLabelProps={{
                          shrink: !!showRoomData?.fuel_type,
                        }}
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="mt-2 ml-3 savebtn">
              <button disabled={loading}>Update Show Room </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdateShowRoom;
