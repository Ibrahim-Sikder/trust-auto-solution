/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */

import TextField from "@mui/material/TextField";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import {
  carBrands,
  cmDmOptions,
  countries,
  fuelType,
  vehicleModels,
  vehicleName,
  vehicleTypes,
} from "../../../constant";
import { Autocomplete } from "@mui/material";
import { HiOfficeBuilding } from "react-icons/hi";
import HeaderButton from "../../../components/CommonButton/HeaderButton";
import { FaUserGear } from "react-icons/fa6";
import { NotificationAdd } from "@mui/icons-material";

const UpdateCompany = () => {
  const [registrationError, setRegistrationError] = useState("");

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

  // country code set
  const [countryCode, setCountryCode] = useState(countries[0]);
  const [driverCountryCode, setDriverCountryCode] = useState(countries[0]);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [driverPhoneNumber, setDriverPhoneNumber] = useState("");

  const handlePhoneNumberChange = (e) => {
    const newPhoneNumber = e.target.value;
    if (
      /^\d*$/.test(newPhoneNumber) &&
      newPhoneNumber.length <= 10 &&
      (newPhoneNumber === "" ||
        !newPhoneNumber.startsWith("0") ||
        newPhoneNumber.length > 1)
    ) {
      setPhoneNumber(newPhoneNumber);
    }
  };

  const handleDriverPhoneNumberChange = (e) => {
    const newPhoneNumber = e.target.value;
    if (
      /^\d*$/.test(newPhoneNumber) &&
      newPhoneNumber.length <= 10 &&
      (newPhoneNumber === "" ||
        !newPhoneNumber.startsWith("0") ||
        newPhoneNumber.length > 1)
    ) {
      setDriverPhoneNumber(newPhoneNumber);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [singleCard, setSingleCard] = useState({});

  console.log(singleCard);

  const navigate = useNavigate();
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");


  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`${import.meta.env.VITE_API_URL}/api/v1/company/one/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setSingleCard(data);
          setLoading(false);
        });
    }
  }, [id]);

  const onSubmit = async (data) => {
    setLoading(true);

    const values = {
      company_name: data?.company_name || singleCard?.company_name,
      username: data.username || singleCard.username,
      company_address: data.company_address || singleCard.company_address,

      company_country_code: data.company_country_code  || singleCard.company_country_code,

      company_contact: data.company_contact || singleCard.company_contact,
      company_email: data.company_email || singleCard.company_email,

      driver_name: data.driver_name || singleCard.driver_name,

      driver_country_code: data.driver_country_code  || singleCard.driver_country_code,

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
    };

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/company/one/${id}`,
        values
      );
      if (response.data.message === "Successfully update card.") {
        navigate("/dashboard/company-list");
        toast.success("Update successful.");
        setLoading(false);
        reset();
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
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
              <h3 className="text-2xl font-bold"> Update Company </h3>
              <span>Update Company </span>
            </div>
          </div>
          <div className="productHome">
            <span>Dashboard / </span>
            <span>Update Company </span>
          </div>
        </div>

        <div className="addProductWrap">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-center">
              <div>
                <h3 className="mb-1 text-xl font-bold">Company Information </h3>
                <div>
                  <TextField
                    className="productField"
                    on
                    label="Company Name (T)"
                    {...register("company_name")}
                    value={singleCard?.company_name}
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
                <div>
                  <TextField
                    className="productField"
                    onC
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
                      shrink: !!singleCard.username,
                    }}
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    on
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
                
                <div className="flex items-center my-1">
                  <Autocomplete
                    sx={{ marginRight: "2px", marginLeft: "5px" }}
                    className="jobCardSelect2"
                    freeSolo
                    options={countries}
                    getOptionLabel={(option) => option.code}
                    value={countryCode}
                    onChange={(event, newValue) => {
                      setCountryCode(newValue);
                      setPhoneNumber(""); // Reset the phone number when changing country codes
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        {...register("company_country_code")}
                        label="Select Country Code"
                        variant="outlined"
                        value={singleCard?.company_country_code}
                        focused={singleCard?.company_country_code}
                        InputLabelProps={{
                          shrink: !!singleCard.company_country_code,
                        }}
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
                    value={
                      phoneNumber ? phoneNumber : singleCard.company_contact
                    }
                    onChange={handlePhoneNumberChange}
                    placeholder="Enter phone number"
                    focused={singleCard.company_contact || phoneNumber}
                    InputLabelProps={{
                      shrink: !!singleCard.company_contact,
                    }}
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="Company Email Address (N)"
                    {...register("company_email")}
                    value={singleCard?.company_email}
                    onChange={(e) =>
                      setSingleCard({
                        ...singleCard,
                        company_email: e.target.value,
                      })
                    }
                    InputLabelProps={{
                      shrink: !!singleCard.company_email,
                    }}
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    o
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
                 
                <div className="flex items-center my-1">
                  <Autocomplete
                    sx={{ marginRight: "2px", marginLeft: "5px" }}
                    className="jobCardSelect2"
                    freeSolo
                    options={countries}
                    getOptionLabel={(option) => option.code}
                    value={driverCountryCode}
                    onChange={(event, newValue) => {
                      setDriverCountryCode(newValue);
                      setPhoneNumber("");  
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        {...register("driver_country_code")}
                        label="Select Country Code"
                        variant="outlined"
                        value={singleCard?.driver_country_code}
                        focused={singleCard?.driver_country_code}
                        InputLabelProps={{
                          shrink: !!singleCard.driver_country_code,
                        }}
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
                    value={
                      driverPhoneNumber
                        ? driverPhoneNumber
                        : singleCard.driver_contact
                    }
                    onChange={handleDriverPhoneNumberChange}
                    placeholder="Enter phone number"
                    focused={singleCard.driver_contact}
                    InputLabelProps={{
                      shrink: !!singleCard.driver_contact,
                    }}
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
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

              <div>
                <h3 className="mb-2 text-xl font-bold">Vehicle Information </h3>
                <div className="flex items-center mt-1 productField">
                <Autocomplete
                    freeSolo
                    className="productField"
                    value={singleCard?.carReg_no || ""}
                    options={cmDmOptions.map((option) => option.label)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Fuel Type "
                        {...register("carReg_no")}
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

                <div>
                  <TextField
                    className="productField"
                    label="Chassis No (T&N)"
                    {...register("chassis_no")}
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
                <div>
                  <TextField
                    className="productField"
                    label="ENGINE NO & CC (T&N) "
                    {...register("engine_no")}
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

                <div>
                   
                  <Autocomplete
                    freeSolo
                    className="productField"
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
                  />
                </div>
                <div>
                   
                  <Autocomplete
                    className="productField"
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
                    
                  />
                </div>
                <div className="relative ">
                   
                  <input
                    value={singleCard.vehicle_model}
                    onInput={handleYearSelectInput}
                    {...register("vehicle_model")}
                    type="text"
                    className="border productField border-[#11111194] mb-5 w-[98%] h-12 p-3 rounded-md"
                    placeholder={singleCard.vehicle_model}
                    defaultValue={singleCard.vehicle_model}
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
                <div>
                  <Autocomplete
                    className="productField"
                    value={singleCard?.vehicle_category || ""}
                    options={vehicleTypes.map((option) => option.label)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Vehicle Category"
                        {...register("vehicle_category")}
                        InputLabelProps={{
                          shrink: !!singleCard?.vehicle_category,
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
                <div>
                  <Autocomplete
                    className="productField"
                    value={singleCard?.fuel_type || ""}
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
                  />
                </div>
              </div>
            </div>

            <div className="mt-2 ml-3 savebtn flex justify-end">
              <button>Update Company </button>
            </div>
          </form>
        </div>
      </div>
       
    </section>
  );
};

export default UpdateCompany;
