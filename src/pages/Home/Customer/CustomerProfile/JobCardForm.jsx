/* eslint-disable react/prop-types */
import { Autocomplete, TextField } from "@mui/material";
import {
  carBrands,
  cmDmOptions,
  fuelType,
  totalYear,
  vehicleTypes,
} from "../../../../constant";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

const JobCardForm = ({ onClose }) => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    data.customerId = id;
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/vehicle",
        data
      );
      console.log(response);
      if (response.data.message === "Successfully add to vehicle post") {
        toast.success("Successfully add to vehicle post");
        onClose();
        setLoading(false);
        reset();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className=" flex items-center py-8 px-10">
      <div className="w-full">
        <h2 className="text-center text-[#42A1DA] font-bold text-2xl uppercase mb-5">
          Add Vehicle
        </h2>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-3 gap-x-6"></div>
            <div>
              <div className="mt-3 mb-3">
                <div className="flex items-center">
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
                        {...register("carReg_no")}
                      />
                    )}
                  />
                  <TextField
                    className="addJobInputField"
                    on
                    label="Car R (T&N)"
                    {...register("car_registration_no")}
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
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  {...register("vehicle_name")}
                  label="Vehicle Name "
                />
              </div>
              <div className="mt-3">
                <Autocomplete
                  id="free-solo-demo"
                  Vehicle
                  Brand
                  options={totalYear.map((option) => option.title)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label=" Vehicle Model"
                      {...register("vehicle_model", {
                        pattern: {
                          value: /^\d+$/,
                          message: "Please enter a valid model number.",
                        },
                      })}
                    />
                  )}
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
                  label="Color & Code (T&N) "
                  {...register("color_code")}
                />
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Mileage (N) "
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
                  id="free-solo-demo"
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
