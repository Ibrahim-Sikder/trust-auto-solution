/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */

import TextField from "@mui/material/TextField";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Autocomplete } from "@mui/material";
import {
  carBrands,
  cmDmOptions,
  fuelType,
  vehicleTypes,
} from "../../../constant";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

import { HiOfficeBuilding } from "react-icons/hi";

const UpdateShowRoom = () => {
  const [showRoomData, setShowRoomData] = useState({});
  console.log(showRoomData);

  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/v1/showRoom/one/${id}`)
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
        `http://localhost:5000/api/v1/showRoom/one/${id}`,
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
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <section>
      <div className=" addProductWraps">
        <div className="flex items-center mr-[80px]  justify-end topProductBtn">
          <Link to="/dashboard/addjob">
            <button> Add Job </button>
          </Link>
          <Link to="/dashboard/qutation">
            <button>Quotation </button>
          </Link>
          <Link to="/dashboard/invoice">
            <button>Invoice </button>
          </Link>
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
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    onC
                    label="Vehicle User Name (T)"
                    {...register("username")}
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    on
                    label="Show Room Address (T)"
                    {...register("showRoom_address")}
                  />
                </div>

                <div>
                  <TextField
                    className="productField"
                    onC
                    label="Company Name (T)"
                    {...register("company_name")}
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="Company Contact No (N)"
                    {...register("company_contact", {
                      pattern: {
                        value: /^\d{11}$/,
                        message: "Please enter a valid number.",
                      },
                    })}
                  />
                  {errors.company_contact && (
                    <span className="text-sm text-red-400">
                      {errors.company_contact.message}
                    </span>
                  )}
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="Company Email Address (N)"
                    {...register("company_email")}
                    type="email"
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="Company Address (T) "
                    {...register("company_address")}
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    o
                    label="Driver Name (T)"
                    {...register("driver_name")}
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="Driver Contact No (N)"
                    {...register("driver_contact", {
                      pattern: {
                        value: /^\d{11}$/,
                        message: "Please enter a valid number.",
                      },
                    })}
                  />
                  {errors.driver_contact && (
                    <span className="text-sm text-red-400">
                      {errors.driver_contact.message}
                    </span>
                  )}
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="Reference Name (T) "
                    {...register("reference_name")}
                  />
                </div>
              </div>

              <div className="mt-5 md:mt-0">
                <h3 className="mb-1 ml-2 text-xl font-bold md:ml-0">
                  Vehicle Information{" "}
                </h3>
                <div className="flex items-center mt-1 productField">
                  <Autocomplete
                    className="jobCardSelect"
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
                  <TextField
                    className="carRegNumbers"
                    label="Car R (T&N)"
                    {...register("car_registration_no")}
                  />
                </div>

                <div>
                  <TextField
                    className="productField"
                    label="Chassis No (T&N)"
                    {...register("chassis_no")}
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="ENGINE NO & CC (T&N) "
                    {...register("engine_no")}
                  />
                </div>

                <div>
                  <Autocomplete
                    className="productField"
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
                <div>
                  <TextField
                    className="productField"
                    label="Vehicle Name "
                    {...register("vehicle_name")}
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="Vehicle Model (N)"
                    {...register("vehicle_model", {
                      pattern: {
                        value: /^\d+$/,
                        message: "Please enter a valid model number.",
                      },
                    })}
                  />
                  {errors.vehicle_model && (
                    <span className="text-sm text-red-400">
                      {errors.vehicle_model.message}
                    </span>
                  )}
                </div>
                <div>
                  <Autocomplete
                    className="productField"
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
                <div>
                  <TextField
                    className="productField"
                    label="Color & Code (T&N) "
                    {...register("color_code")}
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
