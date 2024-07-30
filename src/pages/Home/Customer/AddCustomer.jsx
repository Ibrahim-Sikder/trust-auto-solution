/* eslint-disable no-unused-vars */

import TextField from "@mui/material/TextField";
import { FaTrashAlt, FaEdit, FaUserTie } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Autocomplete, Pagination } from "@mui/material";
import {
  carBrands,
  cmDmOptions,
  countries,
  fuelType,
  vehicleModels,
  vehicleName,
  vehicleTypes,
} from "../../../constant";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import swal from "sweetalert";
import Loading from "../../../components/Loading/Loading";
import { HiOutlineSearch, HiOutlineUserGroup } from "react-icons/hi";
import HeaderButton from "../../../components/CommonButton/HeaderButton";
import { NotificationAdd } from "@mui/icons-material";
import { FaUserGear } from "react-icons/fa6";
import {
  useCreateCustomerMutation,
  useDeleteCustomerMutation,
  useGetAllCustomersQuery,
} from "../../../redux/api/customerApi";
import { ErrorMessage } from "../../../components/error-message";

const AddCustomer = () => {
  const textInputRef = useRef(null);
  const [filterType, setFilterType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [registrationError, setRegistrationError] = useState("");

  const [countryCode, setCountryCode] = useState(countries[0]);
  const [driverCountryCode, setDriverCountryCode] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [driverPhoneNumber, setDriverPhoneNumber] = useState("");

  const [selectedBrand, setSelectedBrand] = useState("");
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [yearSelectInput, setYearSelectInput] = useState("");

 

  const limit = 10;

  const {
    data,
    isLoading: customerLoading,
    refetch,
  } = useGetAllCustomersQuery({
    limit,
    page: currentPage,
    searchTerm: filterType,
  });

  const [createCustomer, { isLoading, error }] = useCreateCustomerMutation();

  const [
    deleteCustomer,
    { isLoading: customerDeleteLoading, error: deleteError },
  ] = useDeleteCustomerMutation();
  

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

  const {
    register,
    handleSubmit,

    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

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

    const res = await createCustomer(newData).unwrap();
    if (res.success) {
      navigate("/dashboard/customer-list");
      toast.success("Successfully add to customer post");
      refetch();
    }
  };

  const handleIconPreview = async (e) => {
    navigate(`/dashboard/customer-profile?id=${e}`);
  };

  const deletePackage = async (id) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this card?",
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      try {
        await deleteCustomer(id).unwrap();
        refetch();

        swal("Deleted!", "Card delete successful.", "success");
      } catch (error) {
        swal("Error", "An error occurred while deleting the card.", "error");
      }
    }
  };

  if (deleteError) {
    toast.error(error?.message);
  }

  

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
    setYearSelectInput(option.value);
    setFilteredOptions([]);
    setValue("vehicle_model", option.label, {
      shouldValidate: true,
    });
  };

  // useEffect(() => {
  //   const errorSources = error?.data?.errorSources;

  //   if (errorSources && Array.isArray(errorSources)) {
  //     errorSources.forEach((source) => {
  //       if (source?.message) {
  //         const parsedMessages = JSON.parse(source.message)[0];

  //         setErrorMessage(JSON.parse(parsedMessages.message));
  //       }
  //     });
  //   }
  // }, [error?.data?.errorSources]);

  if (customerLoading) {
    return (
      <div className="flex items-center justify-center text-xl">
        <Loading />
      </div>
    );
  }

  const handleAllCustomer = () => {
    setFilterType("");
    if (textInputRef.current) {
      textInputRef.current.value = "";
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
          <div className="flex flex-wrap items-center justify-center">
            <HiOutlineUserGroup className="invoicIcon" />
            <div className="ml-2">
              <h3 className="text-sm font-bold md:text-2xl"> New Customer </h3>
              <span>Add New Customer </span>
            </div>
          </div>
          <div className="productHome">
            <span>Home / </span>
            <span>Product / </span>
            <span>New Customer </span>
          </div>
        </div>

        <div className="addProductWrap">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="addCustomerInputFieldWrap">
              <div>
                <h3 className="mb-1 text-xl font-bold">
                  Customer Information{" "}
                </h3>

                <div>
                  <TextField
                    className="productField"
                    on
                    label="Company Name (T)"
                    {...register("company_name")}
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    onC
                    label="Vehicle User Name (T)"
                    {...register("vehicle_username")}
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    on
                    label="Company Address (T)"
                    {...register("company_address")}
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    onC
                    label="Customer Name (T)"
                    {...register("customer_name")}
                  />
                </div>
                <div className="flex xl:flex-row flex-col gap-0.5 items-center my-1">
                  <Autocomplete
                    sx={{ marginLeft: "5px" }}
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
                        label="Select Country Code"
                        variant="outlined"
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
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="Customer Email Address (T)"
                    {...register("customer_email")}
                    type="email"
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="Customer Address (T) "
                    {...register("customer_address")}
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

                <div className="flex xl:flex-row flex-col gap-0.5 items-center my-1">
                  <Autocomplete
                    sx={{ marginLeft: "5px" }}
                    className="jobCardSelect2"
                    freeSolo
                    options={countries}
                    getOptionLabel={(option) => option.code}
                    value={driverCountryCode}
                    onChange={(event, newValue) => {
                      setDriverCountryCode(newValue);
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
                    value={driverPhoneNumber}
                    onChange={handleDriverPhoneNumberChange}
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="Reference Name (T) "
                    {...register("reference_name")}
                  />
                </div>
              </div>

              <div className="mt-5 lg:mt-0">
                <h3 className="mb-2 text-xl font-bold">Vehicle Information </h3>
                <div className="flex items-center mt-1 productField">
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
                    onChange={handleCarRegistrationChange}
                    error={!!errors.car_registration_no || !!registrationError}
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
                <div>
                  {/* <TextField
                    className="productField"
                    label="Vehicle Name "
                    {...register("vehicle_name")}
                  /> */}
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
                      />
                    )}
                    getOptionLabel={(option) => option || ""}
                    // disabled={!selectedBrand}
                  />
                </div>
                <div className="relative mt-3 ">
                   
                  <input
                    value={yearSelectInput}
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
                <div>
                  <Autocomplete
                    freeSolo
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
                    freeSolo
                    className="productField"
                    label="Color & Code (T&N) "
                    {...register("color_code")}
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
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
                <div>
                  <Autocomplete
                    freeSolo
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

            <div className="my-2">
              {error && <ErrorMessage messages={error.data.errorSources} />}
            </div>

            <div className="mt-2 ml-3 savebtn">
              <button disabled={isLoading}>Add Customer </button>
            </div>
          </form>
        </div>
      </div>
      <div className="w-full mt-5 mb-24">
        <div className="flex flex-wrap items-center justify-between mb-5">
          <h3 className="txt-center tet-sm ml- sm:ml-0 ont-bold md:text-3xl">
            {" "}
            Customer List:{" "}
          </h3>
          <div className="flex flex-wrap items-center">
            <button
              onClick={handleAllCustomer}
              className="bg-[#42A1DA] text-white px-4 py-2 rounded-md mr-1"
            >
              All
            </button>
            <input
              onChange={(e) => setFilterType(e.target.value)}
              type="text"
              placeholder="Search"
              className="border py-2 px-3 rounded-md border-[#ddd]"
              ref={textInputRef}
            />
            <button
              className="bg-[#42A1DA] text-white px-2 py-2 rounded-md ml-1"
              disabled={filterType === ""}
            >
              {" "}
              <HiOutlineSearch size={25} />
            </button>
          </div>
        </div>
        {customerLoading ? (
          <div className="flex items-center justify-center text-xl">
            <Loading />
          </div>
        ) : (
          <div>
            {data?.data?.customers?.length === 0 ? (
              <div className="flex items-center justify-center h-full text-xl text-center">
                No matching card found.
              </div>
            ) : (
              <section>
                <table className="table">
                  <thead className="tableWrap">
                    <tr>
                      <th>Customer ID </th>
                      <th>Customer Name</th>
                      <th>Car Number </th>
                      <th>Mobile Number</th>
                      <th>Vehicle Name </th>
                      <th colSpan={3}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.data?.customers?.map((card) => {
                      const lastVehicle = card?.vehicles
                        ? [...card.vehicles].sort(
                            (a, b) =>
                              new Date(b.createdAt) - new Date(a.createdAt)
                          )[0]
                        : null;

                      return (
                        <tr key={card?._id}>
                          <td>{card?.customerId}</td>
                          <td>{card?.customer_name}</td>
                          <td>{lastVehicle?.fullRegNum}</td>
                          <td>{card?.fullCustomerNum}</td>

                          <td>{lastVehicle?.vehicle_name}</td>

                          <td>
                            <div
                              onClick={() => handleIconPreview(card?._id)}
                              className="flex items-center justify-center cursor-pointer"
                            >
                              <FaUserTie size={25} className="" />
                            </div>
                          </td>

                          <td>
                            <div className="editIconWrap edit">
                              <Link
                                to={`/dashboard/update-customer?id=${card?._id}`}
                              >
                                <FaEdit className="editIcon" />
                              </Link>
                            </div>
                          </td>
                          <td>
                            <button
                              disabled={customerDeleteLoading}
                              onClick={() => deletePackage(card?._id)}
                              className="editIconWrap"
                            >
                              <FaTrashAlt className="deleteIcon" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </section>
            )}
          </div>
        )}
        {data?.data?.customers?.length > 0 && (
          <div className="flex justify-center mt-4">
            <Pagination
              count={data?.data?.meta?.totalPages}
              page={currentPage}
              color="primary"
              onChange={(_, page) => setCurrentPage(page)}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default AddCustomer;
