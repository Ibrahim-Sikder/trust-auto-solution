/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Autocomplete, TextField } from "@mui/material";
import {
  carBrands,
  cmDmOptions,
  fuelType,
  totalYear,
  vehicleModels,
  vehicleName,
  vehicleTypes,
} from "../../../../constant";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

const JobCardForm = ({ onClose }) => {
  const [registrationError, setRegistrationError] = useState("");

  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    data.customerId = id;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/vehicle`,
        data
      );

      if (response.data.message === "Successfully add to vehicle post") {
        toast.success("Successfully add to vehicle post");
        onClose();
        setLoading(false);
        reset();
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
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

  return (
    <div className=" flex items-center px-10">
      <div className="w-full">
        <h2 className="text-center text-[#42A1DA] font-bold text-2xl uppercase mb-3">
          Add Vehicle
        </h2>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-x-6"></div>
            <div>
              <div className="mt-3 mb-3">
                <div className="flex items-center">
                  <Autocomplete
                    freeSolo
                    className="jobCardSelect2"
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
                  {/* <TextField
                  sx={{width:'485px'}}
                    className=""
                    on
                    label="Car R (T&N)"
                    {...register("car_registration_no")}
                  /> */}
                  <TextField
                    className="carRegField"
                    label="Car R (N)"
                    {...register("car_registration_no", {
                      pattern: {
                        value: /^[\d-]+$/,
                        message: "Only numbers and hyphens are allowed",
                      },
                      maxLength: {
                        value: 7,
                        message:
                          "Car registration number must be exactly 7 characters",
                      },
                    })}
                    onChange={(e) => {
                      let value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
                      if (value.length > 2) {
                        value = value.slice(0, 2) + "-" + value.slice(2); // Add hyphen after first two numbers
                      }

                      setRegistrationError(""); // Clear previous error
                      if (value.length !== 7) {
                        setRegistrationError(
                          "Car registration number must be 7 characters"
                        );
                      }
                      // Update input value
                      setValue("car_registration_no", value, {
                        shouldValidate: true,
                      });
                    }}
                    error={!!errors.car_registration_no || !!registrationError}
                  />
                </div>
              </div>
              <div>
                <TextField
                  className="addJobInputField"
                  label="Chassis No (T&N)"
                  {...register("chassis_no")}
                />
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="ENGINE NO & CC (T&N) "
                  {...register("engine_no")}
                />
              </div>
              <div className="mt-3">
                <Autocomplete
                className="addJobInputField"
                  freeSolo
                  onInputChange={(event, newValue) => {
                    handleBrandChange(newValue);
                  }}
                  options={carBrands.map((option) => option.label)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Vehicle Brand"
                      {...register("vehicle_brand")}
                    />
                  )}
                  onChange={handleBrandChange}
                  value={selectedBrand}
                  style={{ marginBottom: 20 }}
                />
              </div>
              <div className="mt-3">
                <Autocomplete
                className="addJobInputField"
                  freeSolo
                  Vehicle
                  Name
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
              <div className="relative mt-3 ">
                {/* <TextField
                    className="productField"
                    label="Vehicle Model (N)"
                    {...register("vehicle_model", {
                      pattern: {
                        value: /^\d+$/,
                        message: "Please enter a valid model number.",
                      },
                    })}
                  /> */}
                <input
                  value={yearSelectInput}
                  onInput={handleYearSelectInput}
                  {...register("vehicle_model")}
                  type="text"
                  className="border addJobInputField border-[#11111194] mb-5 w-[98%] h-12 p-3 rounded-md"
                  placeholder="Vehicle Model"
                />
                {yearSelectInput && (
                  <ul className="options-list">
                    {filteredOptions.map((option, index) => (
                      <li key={index} onClick={() => handleOptionClick(option)}>
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
                 className="addJobInputField"
                  freeSolo
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
              <div className="mt-3">
                <TextField
                 className="addJobInputField"
                  freeSolo
                  label="Color & Code (T&N) "
                  {...register("color_code")}
                />
              </div>
              <div className="mt-3">
                <TextField
                 className="addJobInputField"
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
              <div className="mt-3">
                <Autocomplete
                 className="addJobInputField"
                  freeSolo
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
            <button
              disabled={loading}
              className="block mt-3 w-full bg-[#42A1DA] text-white font-bold p-4 rounded-lg"
            >
              Add Vehicle
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobCardForm;
