/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */

import TextField from "@mui/material/TextField";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
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
import { Autocomplete, Box, Grid } from "@mui/material";
import { HiOfficeBuilding } from "react-icons/hi";
import HeaderButton from "../../../components/CommonButton/HeaderButton";
import { FaUserGear } from "react-icons/fa6";
import { NotificationAdd } from "@mui/icons-material";
import {
  useGetSingleCompanyQuery,
  useUpdateCompanyMutation,
} from "../../../redux/api/companyApi";
import Loading from "../../../components/Loading/Loading";
import { ErrorMessage } from "../../../components/error-message";

const UpdateCompany = () => {
  const [errorMessage, setErrorMessage] = useState([]);

  const [filteredVehicles, setFilteredVehicles] = useState([]);

  const [filteredOptions, setFilteredOptions] = useState([]);
  const [yearSelectInput, setYearSelectInput] = useState("");
  const [countryCode, setCountryCode] = useState(countries[0]);
  const [driverCountryCode, setDriverCountryCode] = useState(countries[0]);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [driverPhoneNumber, setDriverPhoneNumber] = useState("");
  const [getDataWithChassisNo, setGetDataWithChassisNo] = useState({});

  const navigate = useNavigate();
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const handleBrandChange = (event, newValue) => {
    const filtered = vehicleName.filter(
      (vehicle) => vehicle.label === newValue
    );
    setFilteredVehicles(filtered);
  };

  // year select only number 4 digit

  // Handle input changes
  const handleYearSelectInput = (event) => {
    const value = event.target.value;
    // Check if the input is a number and does not exceed 4 digits
    if (/^\d{0,4}$/.test(value)) {
      setYearSelectInput(value);
      const filtered = vehicleModels?.filter((option) =>
        option.label.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      event.target.value = value.slice(0, 4);
    }
  };

  const handleOptionClick = (option) => {
    setYearSelectInput(option.label);
    setFilteredOptions([]); // This assumes option.label is the value you want to set in the input
  };

  // country code set

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

  const { data: singleCard, isLoading, refetch } = useGetSingleCompanyQuery(id);

  const [updateCustomer, { isLoading: updateLoading, error }] =
    useUpdateCompanyMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (singleCard?.data) {
      reset({
        company_name: singleCard?.data?.company_name,
        vehicle_username: singleCard?.data?.vehicle_username,
        company_address: singleCard?.data?.company_address,
        company_contact:phoneNumber || singleCard?.data?.company_contact,
        company_country_code: singleCard?.data?.company_country_code,
        company_email:  singleCard?.data?.company_email,
        customer_address: singleCard?.data?.customer_address,

        driver_name: singleCard?.data?.driver_name,
        driver_country_code: singleCard?.data?.driver_country_code,
        driver_contact: driverPhoneNumber || singleCard?.data?.driver_contact,
        reference_name: singleCard?.data?.reference_name,

        carReg_no: getDataWithChassisNo?.carReg_no,
        car_registration_no: getDataWithChassisNo?.car_registration_no,
        engine_no: getDataWithChassisNo?.engine_no,
        vehicle_brand: getDataWithChassisNo?.vehicle_brand,
        vehicle_name: getDataWithChassisNo?.vehicle_name,
        vehicle_model: getDataWithChassisNo?.vehicle_model,
        vehicle_category: getDataWithChassisNo?.vehicle_category,
        color_code: getDataWithChassisNo?.color_code,
        mileage: getDataWithChassisNo?.mileage,
        fuel_type: getDataWithChassisNo?.fuel_type,
      });
    }
  }, [
    singleCard,
    reset,
    phoneNumber,
    driverPhoneNumber,
    getDataWithChassisNo?.carReg_no,
    getDataWithChassisNo?.car_registration_no,
    getDataWithChassisNo?.engine_no,
    getDataWithChassisNo?.vehicle_brand,
    getDataWithChassisNo?.vehicle_name,
    getDataWithChassisNo?.vehicle_model,
    getDataWithChassisNo?.vehicle_category,
    getDataWithChassisNo?.color_code,
    getDataWithChassisNo?.mileage,
    getDataWithChassisNo?.fuel_type,
  ]);

  const onSubmit = async (data) => {
    const company = {
      company_name: data.company_name,
      vehicle_username: data.vehicle_username,
      company_address: data.company_address,
      company_contact: data.company_contact,
      company_country_code: countryCode.code,
      company_email: data.company_email,
      customer_address: data.customer_address,
      driver_name: data.driver_name,
      driver_contact: data.driver_contact,
      driver_country_code: driverCountryCode.code,
      reference_name: data.reference_name,
    };

    data.vehicle_model = Number(data.vehicle_model);
    data.mileage = Number(data.mileage);

    // Extract vehicle information
    const vehicle = {
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
    };

    const newData = {
      company,
      vehicle,
    };

    const updateData = {
      id: id,
      data: newData,
    };

    try {
      const res = await updateCustomer(updateData).unwrap();

      if (res.success) {
        toast.success(res.message);
        navigate("/dashboard/company-list");
        refetch();
        reset();
      }
    } catch (err) {
      toast.error("Failed to update customer");
    }
  };

  const handleChassisChange = (_, newValue) => {
    const filtered = singleCard?.data?.vehicles?.find(
      (vehicle) => vehicle.chassis_no === newValue
    );
    setGetDataWithChassisNo(filtered);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center text-xl">
        <Loading />
      </div>
    );
  }

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ">
              <Box>
                <h3 className=" text-xl font-bold mb-3">
                  Company Information{" "}
                </h3>
                <Grid container spacing={2}>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextField
                      fullWidth
                      on
                      label="Company Name (T)"
                      {...register("company_name")}
                      value={singleCard?.company_name}
                      focused={singleCard?.data?.company_name || ""}
                    />
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextField
                      fullWidth
                      onC
                      label="Vehicle User Name (T)"
                      {...register("vehicle_username")}
                      value={singleCard?.vehicle_username}
                      focused={singleCard?.data?.vehicle_username || ""}
                    />
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextField
                      fullWidth
                      on
                      label="Company Address (T)"
                      {...register("company_address")}
                      value={singleCard?.company_address}
                      focused={singleCard?.data?.company_address || ""}
                    />
                  </Grid>

                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Grid container spacing={1}>
                      <Grid item lg={3} md={4} sm={12} xs={12}>
                        <Autocomplete
                          sx={{ marginRight: "2px", marginLeft: "5px" }}
                          fullWidth
                          freeSolo
                          options={countries}
                          getOptionLabel={(option) => option.code}
                          value={
                            countryCode ||
                            singleCard?.data?.company_country_code
                          }
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
                              focused={
                                singleCard?.data?.company_country_code || ""
                              }
                            />
                          )}
                        />
                      </Grid>
                      <Grid item lg={9} md={8} sm={12} xs={12}>
                        <TextField
                          {...register("company_contact")}
                          label="Company Contact No (N)"
                          variant="outlined"
                          fullWidth
                          type="tel"
                          value={
                            phoneNumber
                              ? phoneNumber
                              : singleCard?.data?.company_contact
                          }
                          onChange={handlePhoneNumberChange}
                          placeholder="Enter phone number"
                          focused={singleCard?.data?.company_contact || ""}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextField
                      fullWidth
                      label="Company Email Address (N)"
                      {...register("company_email")}
                      focused={singleCard?.data?.company_email || ""}
                    />
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextField
                      fullWidth
                      o
                      label="Driver Name (T)"
                      {...register("driver_name")}
                      focused={singleCard?.data?.driver_name || ""}
                    />
                  </Grid>

                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Grid container spacing={1}>
                      <Grid item lg={3} md={4} sm={12} xs={12}>
                        <Autocomplete
                          sx={{ marginRight: "2px", marginLeft: "5px" }}
                          className="jobCardSelect2"
                          freeSolo
                          options={countries}
                          getOptionLabel={(option) => option.code}
                          value={
                            driverCountryCode ||
                            singleCard?.data?.driver_country_code
                          }
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
                              focused={
                                singleCard?.data?.driver_country_code || ""
                              }
                            />
                          )}
                        />
                      </Grid>
                      <Grid item lg={9} md={8} sm={12} xs={12}>
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
                              : singleCard?.data?.driver_contact
                          }
                          onChange={handleDriverPhoneNumberChange}
                          placeholder="Enter phone number"
                          focused={singleCard?.data?.driver_contact || ""}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextField
                      fullWidth
                      label="Reference Name (T) "
                      {...register("reference_name")}
                      value={singleCard?.reference_name}
                      focused={singleCard?.data?.reference_name || ""}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Box>
                <h3 className=" text-xl font-bold mb-3">
                  Vehicle Information{" "}
                </h3>
                <Grid container spacing={2}>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Autocomplete
                      disableClearable
                      freeSolo
                      fullWidth
                      onChange={handleChassisChange}
                      options={singleCard?.data?.vehicles.map(
                        (option) => option.chassis_no
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select Chassis no"
                          {...register("chassis_no")}
                          inputProps={{
                            ...params.inputProps,
                            maxLength:
                              getDataWithChassisNo?.chassis_no?.length || 30,
                          }}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Grid container spacing={1}>
                      <Grid item lg={3} md={4} sm={12} xs={12}>
                        <Autocomplete
                          freeSolo
                          fullWidth
                          // value={singleCard?.carReg_no || ""}
                          options={cmDmOptions.map((option) => option.label)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="CarReg no"
                              {...register("carReg_no")}
                              focused={getDataWithChassisNo?.carReg_no || ""}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item lg={9} md={8} sm={12} xs={12}>
                        <InputMask
                          mask="99-9999"
                          maskChar={null}
                          {...register("car_registration_no")}
                        >
                          {(inputProps) => (
                            <TextField
                              {...inputProps}
                              {...register("car_registration_no")}
                              fullWidth
                              label="Car R (N)"
                              focused={
                                getDataWithChassisNo?.car_registration_no || ""
                              }
                            />
                          )}
                        </InputMask>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextField
                      fullWidth
                      label="ENGINE NO & CC (T&N) "
                      {...register("engine_no")}
                      // value={singleCard?.engine_no}
                      focused={getDataWithChassisNo?.engine_no || ""}
                    />
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Autocomplete
                      freeSolo
                      fullWidth
                      // value={singleCard?.vehicle_brand || ""}
                      onChange={handleBrandChange}
                      options={carBrands.map((option) => option.label)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Vehicle Brand"
                          {...register("vehicle_brand")}
                          focused={getDataWithChassisNo?.vehicle_brand || ""}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Autocomplete
                      fullWidth
                      freeSolo
                      Vehicle
                      Name
                      // value={singleCard?.vehicle_name || ""}
                      options={filteredVehicles.map((option) => option.value)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Vehicle Name "
                          {...register("vehicle_name")}
                          focused={getDataWithChassisNo?.vehicle_name || ""}
                        />
                      )}
                      getOptionLabel={(option) => option || ""}
                    />
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <div className="relative ">
                      <input
                        onInput={handleYearSelectInput}
                        {...register("vehicle_model")}
                        type="text"
                        className="border  border-[#11111194] w-[100%] h-14 p-3 rounded-md"
                        placeholder="Vehicle Model"
                        defaultValue={getDataWithChassisNo?.vehicle_model}
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
                      // value={singleCard?.vehicle_category || ""}
                      options={vehicleTypes.map((option) => option.label)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Vehicle Category"
                          {...register("vehicle_category")}
                          focused={getDataWithChassisNo?.vehicle_category || ""}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextField
                      fullWidth
                      label="Color & Code (T&N) "
                      {...register("color_code")}
                      // value={singleCard?.color_code}
                      focused={getDataWithChassisNo?.color_code || ""}
                    />
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextField
                      type="number"
                      fullWidth
                      label="Mileage (N) "
                      {...register("mileage", {
                        pattern: {
                          value: /^\d+$/,
                          message: "Please enter a valid number.",
                        },
                      })}
                      // value={singleCard?.mileage}
                      focused={getDataWithChassisNo?.mileage || ""}
                    />
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Autocomplete
                      fullWidth
                      // value={singleCard?.fuel_type || ""}
                      options={carBrands.map((option) => option.label)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Fuel Type "
                          {...register("fuel_type")}
                          focused={getDataWithChassisNo?.fuel_type || ""}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Box>
            </div>
            <div className="my-2">
              {error && <ErrorMessage messages={error.data.errorSources} />}
            </div>

            <div className="mt-2 ml-3 savebtn flex justify-end">
              <button disabled={updateLoading}>Update Company </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdateCompany;
