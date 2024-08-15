/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Autocomplete, Box, Grid, TextField } from "@mui/material";
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
import { toast } from "react-toastify";
import { ErrorMessage } from "../../../../components/error-message.tsx";
import { useCreateVehicleMutation } from "../../../../redux/api/vehicle";

const JobCardForm = ({ onClose, reload, setReload }) => {
  const [registrationError, setRegistrationError] = useState("");

  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  // const [loading, setLoading] = useState(false);

  const [createVehicle, { isLoading, error }] = useCreateVehicleMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    data.Id = id;
    data.vehicle_model = Number(data.vehicle_model);
    data.mileage = Number(data.mileage);

    const res = await createVehicle(data).unwrap();

    if (res.success) {
      onClose();
      toast.success(res.message);
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

  const handleCarRegistrationChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    if (value.length > 2) {
      value = value.slice(0, 2) + "-" + value.slice(2); // Add hyphen after first two numbers
    }

    if (value.length > 7) {
      value = value.slice(0, 7); // Ensure the value does not exceed 7 characters
    }

    setRegistrationError(""); // Clear previous error
    if (value.length !== 7) {
      setRegistrationError("Car registration number must be 7 characters");
    }

    // Update input value
    setValue("car_registration_no", value, {
      shouldValidate: true,
    });
  };

  return (
    <div className=" flex items-center px-10">
      <div className="w-full">
        <h2 className="text-center text-[#42A1DA] font-bold text-2xl uppercase mb-3">
          Add Vehicle
        </h2>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <Grid container spacing={2}>
                <Grid  item lg={12} md={12} sm={12} xs={12}>
                  <Autocomplete
                    freeSolo
                  fullWidth
                  size="small"
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
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <TextField
                fullWidth
                size="small"
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
                    onChange={handleCarRegistrationChange}
                    error={!!errors.car_registration_no || !!registrationError}
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <TextField
                   fullWidth
                   size="small"
                    label="Chassis No (T&N)"
                    {...register("chassis_no")}
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <TextField
                   fullWidth
                   size="small"
                    label="ENGINE NO & CC (T&N) "
                    {...register("engine_no")}
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Autocomplete
                  fullWidth
                  size="small"
                    freeSolo
                    onInputChange={(event, newValue) => {
                      handleBrandChange(newValue);
                    }}
                    options={carBrands.map((option) => option.label)}
                    renderInput={(params) => (
                      <TextField
                      fullWidth
                      size="small"
                        {...params}
                        label="Vehicle Brand"
                        {...register("vehicle_brand")}
                      />
                    )}
                    onChange={handleBrandChange}
                    value={selectedBrand}
                    
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Autocomplete
                  fullWidth
                  size="small"
                    freeSolo
                    Vehicle
                    Name
                    options={filteredVehicles.map((option) => option.value)}
                    renderInput={(params) => (
                      <TextField
                      fullWidth
                      size="small"
                        {...params}
                        label="Vehicle Name "
                        {...register("vehicle_name")}
                      />
                    )}
                    getOptionLabel={(option) => option || ""}
                    // disabled={!selectedBrand}
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <div className="relative">
                    <input
                      value={yearSelectInput}
                      onInput={handleYearSelectInput}
                      {...register("vehicle_model")}
                      type="text"
                      className="border  border-[#11111194]  w-[100%] h-10 p-3 rounded-md"
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
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Autocomplete
                  fullWidth
                  size="small"
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
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <TextField
                   fullWidth
                   size="small"
                    freeSolo
                    label="Color & Code (T&N) "
                    {...register("color_code")}
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                 
                    <TextField
                     fullWidth
                     size="small"
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
                 
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Autocomplete
                   fullWidth
                   size="small"
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
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}></Grid>
              </Grid>
            </Box>

            <div className="my-2">
              {error && <ErrorMessage messages={error?.data?.errorSources} />}
            </div>
            <button
              disabled={isLoading}
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
