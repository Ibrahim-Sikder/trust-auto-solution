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
  vehicleModels,
  vehicleName,
  vehicleTypes,
} from "../../../constant";
import { Autocomplete } from "@mui/material";
import { HiOutlineUserGroup } from "react-icons/hi";
import HeaderButton from "../../../components/CommonButton/HeaderButton";
import { NotificationAdd } from "@mui/icons-material";
import { FaUserGear } from "react-icons/fa6";
import {
  useGetSingleCustomerQuery,
  useUpdateCustomerMutation,
} from "../../../redux/api/customerApi";
import Loading from "../../../components/Loading/Loading";
import { ErrorMessage } from "../../../components/error-message";

const UpdateCustomer = () => {
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [yearSelectInput, setYearSelectInput] = useState("");
  const [filteredVehicles, setFilteredVehicles] = useState([]);

  const [getDataWithChassisNo, setGetDataWithChassisNo] = useState({});

  const navigate = useNavigate();
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const handleBrandChange = (_, newValue) => {
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

  const {
    data: singleCard,
    isLoading,
    refetch,
  } = useGetSingleCustomerQuery(id);

  const [updateCustomer, { isLoading: updateLoading, error }] =
    useUpdateCustomerMutation();

  const { register, handleSubmit, reset } = useForm();

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

  useEffect(() => {
    if (singleCard?.data) {
      reset({
        company_name: singleCard?.data?.company_name,
        vehicle_username: singleCard?.data?.vehicle_username,
        company_address: singleCard?.data?.company_address,
        customer_name: singleCard?.data?.customer_name,
        customer_country_code: singleCard?.data?.customer_country_code,
        customer_contact: phoneNumber || singleCard?.data?.customer_contact,
        customer_email: singleCard?.data?.customer_email,
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
    const customer = {
      company_name: data.company_name,
      vehicle_username: data.vehicle_username,
      company_address: data.company_address,
      customer_name: data.customer_name,
      customer_contact: data.customer_contact,
      customer_country_code: countryCode.code,
      customer_email: data.customer_email,
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
      customer,
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
        navigate("/dashboard/customer-list");
        refetch();
        reset();
      }
    } catch (err) {
      toast.error("Failed to update customer");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center text-xl">
        <Loading />
      </div>
    );
  }

  const handleChassisChange = (_, newValue) => {
    const filtered = singleCard?.data?.vehicles?.find(
      (vehicle) => vehicle.chassis_no === newValue
    );
    setGetDataWithChassisNo(filtered);
  };

  return (
    <section>
      <div className=" addProductWraps">
        <div className="flex justify-between pb-3 border-b-2 px-2 ">
          <HeaderButton />
          <div className="flex items-end justify-end">
            <NotificationAdd size={30} className="mr-2" />
            <FaUserGear size={30} />
          </div>
        </div>
        <div className="productHeadWrap">
          <div className="flex flex-wrap items-center justify-center">
            <HiOutlineUserGroup className="invoicIcon" />
            <div className="ml-2">
              <h3 className="text-sm font-bold md:text-2xl">
                {" "}
                Update Customer{" "}
              </h3>
              <span>Update New Customer </span>
            </div>
          </div>
          <div className="productHome">
            <span>Dashboard / </span>
            <span>New Customer </span>
          </div>
        </div>

        <div className="addProductWrap">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap justify-center">
              <div>
                <h3 className="mb-1 text-xl font-bold">
                  Customer Information{" "}
                </h3>
                <div>
                  <TextField
                    className="productField"
                    label="Company Name (T)"
                    {...register("company_name")}
                    focused={singleCard?.data?.company_name || ""}
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    onC
                    label="Vehicle User Name (T)"
                    {...register("vehicle_username")}
                    focused={singleCard?.data?.vehicle_username || ""}
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    on
                    label="Company Address (T)"
                    {...register("company_address")}
                    focused={singleCard?.data?.company_address || ""}
                  />
                </div>

                <div>
                  <TextField
                    className="productField"
                    onC
                    label="Customer Name (T)"
                    {...register("customer_name")}
                    focused={singleCard?.data?.customer_name || ""}
                  />
                </div>

                <div className="flex items-center my-1">
                  <Autocomplete
                    sx={{ marginRight: "2px", marginLeft: "5px" }}
                    className="jobCardSelect2"
                    freeSolo
                    options={countries}
                    getOptionLabel={(option) => option.code}
                    value={
                      countryCode || singleCard?.data?.customer_country_code
                    }
                    onChange={(_, newValue) => {
                      setCountryCode(newValue);
                      setPhoneNumber("");
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Country Code"
                        {...register("customer_country_code")}
                        variant="outlined"
                        focused={singleCard?.data?.customer_country_code || ""}
                      />
                    )}
                  />
                  <TextField
                    {...register("customer_contact")}
                    className="productField2"
                    label="Customer Contact No (N)"
                    variant="outlined"
                    fullWidth
                    type="tel"
                    value={
                      phoneNumber
                        ? phoneNumber
                        : singleCard?.data?.customer_contact
                    }
                    onChange={handlePhoneNumberChange}
                    placeholder="Enter phone number"
                    focused={singleCard?.data?.customer_contact || ""}
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="Customer Email Address (T)"
                    {...register("customer_email")}
                    focused={singleCard?.data?.customer_email || ""}
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="Customer Address (T) "
                    {...register("customer_address")}
                    focused={singleCard?.data?.customer_address || ""}
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="Driver Name (T)"
                    {...register("driver_name")}
                    focused={singleCard?.data?.driver_name || ""}
                  />
                </div>

                <div className="flex items-center my-1">
                  <Autocomplete
                    sx={{ marginRight: "2px", marginLeft: "5px" }}
                    className="jobCardSelect2"
                    freeSolo
                    options={countries}
                    getOptionLabel={(option) => option.code}
                    value={
                      driverCountryCode || singleCard?.data?.driver_country_code
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
                        focused={singleCard?.data?.driver_country_code || ""}
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
                        : singleCard?.data?.driver_contact
                    }
                    onChange={handleDriverPhoneNumberChange}
                    placeholder="Enter phone number"
                    focused={singleCard?.data?.driver_contact || ""}
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="Reference Name (T) "
                    {...register("reference_name")}
                    focused={singleCard?.data?.reference_name || ""}
                  />
                </div>
              </div>

              <div className="mt-5 lg:mt-0">
                <h3 className="mb-2 text-xl font-bold">Vehicle Information </h3>
                <Autocomplete
                  disableClearable
                  freeSolo
                  className="productField"
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
                <div className="flex items-center mt-1 productField">
                  <Autocomplete
                    freeSolo
                    className="productField"
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

                  <InputMask
                    mask="99-9999"
                    maskChar={null}
                    {...register("car_registration_no")}
                  >
                    {(inputProps) => (
                      <TextField
                        {...inputProps}
                        {...register("car_registration_no")}
                        className="carRegField"
                        label="Car R (N)"
                        focused={
                          getDataWithChassisNo?.car_registration_no || ""
                        }
                      />
                    )}
                  </InputMask>
                </div>

                <div></div>
                <div>
                  <TextField
                    className="productField"
                    label="ENGINE NO & CC (T&N) "
                    {...register("engine_no")}
                    focused={getDataWithChassisNo?.engine_no || ""}
                  />
                </div>

                <div>
                  <Autocomplete
                    freeSolo
                    className="productField"
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
                </div>
                <div>
                  <Autocomplete
                    className="productField"
                    freeSolo
                    Vehicle
                    Name
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
                </div>
                <div className="relative mt-3">
                  <input
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
                </div>
                <div>
                  <Autocomplete
                    freeSolo
                    className="productField"
                    value={singleCard?.vehicle_category || ""}
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
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="Color & Code (T&N) "
                    {...register("color_code")}
                    focused={getDataWithChassisNo?.color_code || ""}
                  />
                </div>
                <div>
                  <TextField
                    type="number"
                    className="productField"
                    label="Mileage (N)"
                    {...register("mileage", {
                      pattern: {
                        value: /^\d+$/,
                        message: "Please enter a valid number.",
                      },
                    })}
                    focused={getDataWithChassisNo?.mileage || ""}
                  />
                </div>
                <div>
                  <Autocomplete
                    freeSolo
                    className="productField"
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
                </div>
              </div>
            </div>

            <div className="my-2">
              {error && <ErrorMessage messages={error.data.errorSources} />}
            </div>

            <div className="flex justify-end mt-2 ml-3 savebtn">
              <button disabled={updateLoading}>Update Customer </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdateCustomer;
