/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */

import TextField from "@mui/material/TextField";
import { FaEye, FaTrashAlt, FaEdit, FaUserTie } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
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
import { HiOutlineSearch, HiOutlineUserGroup } from "react-icons/hi";
import axios from "axios";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Loading from "../../../components/Loading/Loading";
import HeaderButton from "../../../components/CommonButton/HeaderButton";
import { NotificationAdd } from "@mui/icons-material";
import { FaUserGear } from "react-icons/fa6";

const AddCompany = () => {
  const [filterType, setFilterType] = useState("");
  const [companyData, setCompanyData] = useState([]);
  const [companyPage, setCompanyPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [noMatching, setNoMatching] = useState(null);

  const [registrationError, setRegistrationError] = useState("");

  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

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
    setYearSelectInput(option.value);
    setFilteredOptions([]);
    setValue("vehicle_model", option.label, {
      shouldValidate: true,
    });
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

  const onSubmit = async (data) => {
    setLoading(true);
    data.company_country_code = countryCode.code;
    data.driver_country_code = driverCountryCode.code;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/company`,
        data
      );
      if (response.data.message === "Successfully add to company post") {
        setReload(!reload);
        toast.success("Successfully add to company post");
        navigate("/dashboard/company-list");
        setLoading(false);
        reset();
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    try {
      fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/company?page=${currentPage}`
      )
        .then((res) => res.json())
        .then((data) => {
          setCompanyData(data?.allCompany);
          setCompanyPage(data?.totalPages);
          if (data?.allCompany?.length === 0) {
            setCurrentPage((pre) => pre - 1);
          }

          setLoading(false);
        });
    } catch (error) {
      toast.error(error?.message || "Something went wrong!");
      setLoading(false);
    }
  }, [currentPage, reload]);

  const handleIconPreview = async (e) => {
    navigate(`/dashboard/company-profile?id=${e}`);
  };

  //  show data

  const deletePackage = async (id) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this card?",
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/company/one/${id}`,
          {
            method: "DELETE",
          }
        );
        const data = await res.json();

        if (data.message == "Company card delete successful") {
          setCompanyData(companyData?.filter((pkg) => pkg._id !== id));
          setReload(!reload);
        }
        swal("Deleted!", "Card delete successful.", "success");
      } catch (error) {
        swal("Error", "An error occurred while deleting the card.", "error");
      }
    }
  };

  const handleFilterType = async () => {
    try {
      const data = {
        filterType,
      };
      setSearchLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/company/all`,
        data
      );

      if (response.data.message === "Filter successful") {
        setCompanyData(response.data.result);
        setNoMatching(null);
        setSearchLoading(false);
      }
      if (response.data.message === "No matching found") {
        setNoMatching(response.data.message);
        setSearchLoading(false);
      }
    } catch (error) {
      setSearchLoading(false);
    }
  };

  const handleAllCompany = () => {
    try {
      setLoading(true);
      fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/company?page=${currentPage}`
      )
        .then((res) => res.json())
        .then((data) => {
          setCompanyData(data?.allCompany);
          setCompanyPage(data?.totalPages);
          setNoMatching(null);

          setLoading(false);
        });
    } catch (error) {
      toast.error(error?.message || "Something went wrong!");
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
          <div className="flex flex-wrap items-center justify-center">
            <HiOutlineUserGroup className="invoicIcon" />
            <div className="ml-2">
              <h3 className="text-sm font-bold md:text-2xl"> New Company </h3>
              <span>Add New Company </span>
            </div>
          </div>
          <div className="productHome">
            <span>Home / </span>
            <span>New Company </span>
          </div>
        </div>

        <div className="addProductWrap">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="block md:flex">
              <div>
                <h3 className="mb-1 ml-2 text-xl font-bold md:ml-0">
                  Company Information{" "}
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
                    {...register("username")}
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
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                  />
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
                    o
                    label="Driver Name (T)"
                    {...register("driver_name")}
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
                  />
                  {errors.driver_contact && (
                    <span className="text-sm text-red-400">
                      {errors.driver_contact.message}
                    </span>
                  )}
                </div> */}
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
                <h3 className="mb-1 ml-2 text-xl font-bold md:ml-0">
                  Vehicle Information{" "}
                </h3>
                <div className="flex items-center mt-1 productField">
                  <Autocomplete
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
                    className="carRegNumbers"
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
                  {/* <Autocomplete
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
                  /> */}
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

            <div className="mt-2 ml-0 md:ml-3 savebtn">
              <button>Add Company </button>
            </div>
          </form>
        </div>
      </div>
      <div className="w-full mt-5 mb-24">
        <div className="flex flex-wrap items-center justify-between mb-5">
          <h3 className="ml-2 font-bold text-center md:ml-0 tex2t-sm md:text-3xl">
            {" "}
            Company List:{" "}
          </h3>
          <div className="flex items-center">
            <button
              className="bg-[#42A1DA] text-white px-2 py-2 rounded-sm mr-1"
              onClick={handleAllCompany}
            >
              All
            </button>
            <input
              type="text"
              placeholder="Search"
              className="border py-2 px-3 rounded-md border-[#ddd]"
              onChange={(e) => setFilterType(e.target.value)}
            />
            <button
              onClick={handleFilterType}
              className="bg-[#42A1DA] text-white px-2 py-2 rounded-sm ml-1"
            >
              {" "}
              <HiOutlineSearch size={22} />
            </button>
          </div>
        </div>
        {searchLoading ? (
          <div className="flex items-center justify-center text-xl">
            <Loading />
          </div>
        ) : (
          <div>
            {companyData?.length === 0 || noMatching ? (
              <div className="flex items-center justify-center h-full text-xl text-center">
                No matching card found.
              </div>
            ) : (
              <>
                <section>
                  <table className="table">
                    <thead className="tableWrap">
                      <tr>
                        <th>Company Id</th>
                        <th>Company Name</th>

                        <th>Car Number </th>
                        <th> Mobile Number</th>
                        <th colSpan={3}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {companyData?.map((card) => (
                        <tr key={card._id}>
                          <td>{card.companyId}</td>
                          <td>{card?.company_name}</td>

                          <td>{card?.fullRegNum}</td>
                          <td>{card?.fullCompanyNum} </td>

                          <td>
                            <div
                              onClick={() => handleIconPreview(card.companyId)}
                              className="flex items-center justify-center cursor-pointer"
                            >
                              <FaUserTie size={25} className="" />
                            </div>
                          </td>

                          <td>
                            <div className="editIconWrap edit">
                              <Link
                                to={`/dashboard/update-company?id=${card._id}`}
                              >
                                <FaEdit className="editIcon" />
                              </Link>
                            </div>
                          </td>
                          <td>
                            <div
                              onClick={() => deletePackage(card._id)}
                              className="editIconWrap"
                            >
                              <FaTrashAlt className="deleteIcon" />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              </>
            )}
          </div>
        )}
        {companyData?.length > 0 && (
          <div className="flex justify-center mt-4">
            <Pagination
              count={companyPage}
              page={currentPage} // Add this line to indicate the current page
              color="primary"
              onChange={(_, page) => setCurrentPage(page)}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default AddCompany;
