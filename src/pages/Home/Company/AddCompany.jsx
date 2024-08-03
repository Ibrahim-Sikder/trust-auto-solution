/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */

import TextField from "@mui/material/TextField";
import { FaEye, FaTrashAlt, FaEdit, FaUserTie } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Autocomplete, Box, Grid, Pagination } from "@mui/material";
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
import { useEffect, useRef, useState } from "react";
import swal from "sweetalert";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Loading from "../../../components/Loading/Loading";
import HeaderButton from "../../../components/CommonButton/HeaderButton";
import { NotificationAdd } from "@mui/icons-material";
import { FaUserGear } from "react-icons/fa6";
import {
  useCreateCompanyMutation,
  useDeleteCompanyMutation,
  useGetAllCompaniesQuery,
} from "../../../redux/api/companyApi";
import { ErrorMessage } from "../../../components/error-message";

const AddCompany = () => {
  const textInputRef = useRef(null);
  const [filterType, setFilterType] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [registrationError, setRegistrationError] = useState("");

  const [selectedBrand, setSelectedBrand] = useState("");
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [yearSelectInput, setYearSelectInput] = useState("");
  const [countryCode, setCountryCode] = useState(countries[0]);
  const [driverCountryCode, setDriverCountryCode] = useState(countries[0]);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [driverPhoneNumber, setDriverPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const limit = 10;

  const {
    data: companyData,
    isLoading: companyLoading,
    refetch,
  } = useGetAllCompaniesQuery({
    limit,
    page: currentPage,
    searchTerm: filterType,
  });
  const [createCompany, { isLoading, error }] = useCreateCompanyMutation();
  const [
    deleteCompany,
    { isLoading: companyDeleteLoading, error: deleteError },
  ] = useDeleteCompanyMutation();

  const handleBrandChange = (event, newValue) => {
    setSelectedBrand(newValue);
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

    const res = await createCompany(newData).unwrap();

    if (res.success) {
      toast.success("Successfully add to company post");
      navigate("/dashboard/company-list");
      refetch();
    }
  };

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
        await deleteCompany(id).unwrap();
        refetch();
        swal("Deleted!", "Card delete successful.", "success");
      } catch (error) {
        swal("Error", "An error occurred while deleting the card.", "error");
      }
    }
  };

  const handleAllCompany = () => {
    setFilterType("");
    if (textInputRef.current) {
      textInputRef.current.value = "";
    }
  };

  if (deleteError) {
    toast.error(deleteError?.message);
  }

  if (companyLoading) {
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-10">
              <Box>
                <h3 className="mb-1 ml-2 text-xl font-bold md:ml-0">
                  Company Information{" "}
                </h3>
                <Grid container spacing={2}>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextField
                      fullWidth
                      on
                      label="Company Name (T)"
                      {...register("company_name")}
                    />
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextField
                      fullWidth
                      onC
                      label="Vehicle User Name (T)"
                      {...register("vehicle_username")}
                    />
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextField
                      fullWidth
                      on
                      label="Company Address (T)"
                      {...register("company_address")}
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
                      </Grid>
                      <Grid item lg={9} md={8} sm={12} xs={12}>
                        <TextField
                          {...register("company_contact")}
                          fullWidth
                          label="Company Contact No (N)"
                          variant="outlined"
                          type="tel"
                          value={phoneNumber}
                          onChange={handlePhoneNumberChange}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextField
                      fullWidth
                      label="Company Email Address (N)"
                      {...register("company_email")}
                      type="email"
                    />
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextField
                      fullWidth
                      o
                      label="Driver Name (T)"
                      {...register("driver_name")}
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
                      </Grid>
                      <Grid item lg={9} md={8} sm={12} xs={12}>
                        <TextField
                          {...register("driver_contact")}
                          fullWidth
                          label="Driver Contact No (N)"
                          variant="outlined"
                          type="tel"
                          value={driverPhoneNumber}
                          onChange={handleDriverPhoneNumberChange}
                          placeholder="Enter phone number"
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <div className="flex items-center my-1"></div>
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextField
                      fullWidth
                      label="Reference Name (T) "
                      {...register("reference_name")}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Box>
                <h3 className="mb-1 ml-2 text-xl font-bold md:ml-0">
                  Vehicle Information{" "}
                </h3>
                <Grid container spacing={2}>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Grid container spacing={1}>
                      <Grid item lg={3} md={4} sm={12} xs={12}>
                        <Autocomplete
                          fullWidth
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
                      <Grid item lg={9} md={8} sm={12} xs={12}>
                        <TextField
                          fullWidth
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
                          error={
                            !!errors.car_registration_no || !!registrationError
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextField
                      fullWidth
                      label="Chassis No (T&N)"
                      {...register("chassis_no")}
                    />
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextField
                      fullWidth
                      label="ENGINE NO & CC (T&N) "
                      {...register("engine_no")}
                    />
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Autocomplete
                      fullWidth
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
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Autocomplete
                      fullWidth
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
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <div className="relative ">
                      <input
                        value={yearSelectInput}
                        onInput={handleYearSelectInput}
                        {...register("vehicle_model")}
                        type="text"
                        className="border  border-[#11111194]  w-[100%] h-14 p-3 rounded-md"
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
                      freeSolo
                      fullWidth
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
                      label="Color & Code (T&N) "
                      {...register("color_code")}
                    />
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextField
                      fullWidth
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
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Autocomplete
                      freeSolo
                      fullWidth
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
                </Grid>
              </Box>
            </div>
            <div className="my-2">
              {error && <ErrorMessage messages={error.data.errorSources} />}
            </div>
            <div className="mt-2 ml-0 md:ml-3 savebtn">
              <button disabled={isLoading}>Add Company </button>
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
              ref={textInputRef}
            />
            <button className="bg-[#42A1DA] text-white px-2 py-2 rounded-sm ml-1">
              {" "}
              <HiOutlineSearch size={22} />
            </button>
          </div>
        </div>
        {companyLoading ? (
          <div className="flex items-center justify-center text-xl">
            <Loading />
          </div>
        ) : (
          <div>
            {companyData?.data?.companies?.length === 0 ? (
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
                        <th>Vehicle Name </th>
                        <th colSpan={3}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {companyData?.data?.companies?.map((card) => {
                        const lastVehicle = card?.vehicles
                          ? [...card.vehicles].sort(
                              (a, b) =>
                                new Date(b.createdAt) - new Date(a.createdAt)
                            )[0]
                          : null;

                        return (
                          <tr key={card._id}>
                            <td>{card.companyId}</td>
                            <td>{card?.company_name}</td>

                            <td>{lastVehicle?.fullRegNum}</td>
                            <td>{card?.fullCompanyNum} </td>
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
                                  to={`/dashboard/update-company?id=${card._id}`}
                                >
                                  <FaEdit className="editIcon" />
                                </Link>
                              </div>
                            </td>
                            <td>
                              <button
                                disabled={companyDeleteLoading}
                                onClick={() => deletePackage(card._id)}
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
              </>
            )}
          </div>
        )}
        {companyData?.data?.companies?.length > 0 && (
          <div className="flex justify-center mt-4">
            <Pagination
              count={companyData?.data?.meta?.totalPages}
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

export default AddCompany;
