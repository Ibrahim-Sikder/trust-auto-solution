/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */

import TextField from "@mui/material/TextField";
import { FaFileInvoice, FaEye, FaTrashAlt, FaEdit } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import {
  carBrands,
  cmDmOptions,
  fuelType,
  vehicleModels,
  vehicleName,
  vehicleTypes,
} from "../../../constant";
import { Autocomplete } from "@mui/material";
import { HiOfficeBuilding } from "react-icons/hi";

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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [singleCard, setSingleCard] = useState({});
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

      company_contact: data.customer_contact || singleCard.customer_contact,
      company_email: data.customer_email || singleCard.customer_email,

      driver_name: data.driver_name || singleCard.driver_name,
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
              <h3 className="text-2xl font-bold"> Update Company </h3>
              <span>Update Company </span>
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
                    value={singleCard?.company_contact}
                    onChange={(e) =>
                      setSingleCard({
                        ...singleCard,
                        company_contact: e.target.value,
                      })
                    }
                    InputLabelProps={{
                      shrink: !!singleCard.company_contact,
                    }}
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
                    value={singleCard?.driver_contact}
                    onChange={(e) =>
                      setSingleCard({
                        ...singleCard,
                        driver_contact: e.target.value,
                      })
                    }
                    InputLabelProps={{
                      shrink: !!singleCard.driver_contact,
                    }}
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
                    className="customerSelect"
                    value={singleCard?.carReg_no || ""}
                    options={carBrands.map((option) => option.label)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Car Reg No "
                        // Handle input props manually
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
                  {/* <Autocomplete
                     className="productField"
                    value={singleCard?.vehicle_brand || ""}
                    options={carBrands.map((option) => option.label)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Vehicle Brand"
                        // Handle input props manually
                        InputLabelProps={{
                          shrink: !!singleCard?.vehicle_brand,
                        }}
                      />
                    )}
                  /> */}
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
                        // Handle input props manually
                        InputLabelProps={{
                          shrink: !!singleCard?.vehicle_brand,
                        }}
                      />
                    )}
                  />
                </div>
                <div>
                  {/* <TextField
                    className="productField"
                    label="Vehicle Name "
                    {...register("vehicle_name")}
                    value={singleCard?.vehicle_name}
                    onChange={(e) =>
                      setSingleCard({
                        ...singleCard,
                        vehicle_name: e.target.value,
                      })
                    }
                    InputLabelProps={{
                      shrink: !!singleCard.vehicle_name,
                    }}
                  /> */}
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
                    // disabled={!selectedBrand}
                  />
                </div>
                <div className="relative ">
                  {/* <TextField
                    className="productField"
                    label="Vehicle Model (N)"
                    {...register("vehicle_model", {
                      pattern: {
                        value: /^\d+$/,
                        message: "Please enter a valid model number.",
                      },
                    })}
                    value={singleCard?.vehicle_model}
                    onChange={(e) =>
                      setSingleCard({
                        ...singleCard,
                        vehicle_model: e.target.value,
                      })
                    }
                    InputLabelProps={{
                      shrink: !!singleCard.vehicle_model,
                    }}
                  /> */}
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
                    className="productField"
                    value={singleCard?.vehicle_category || ""}
                    options={vehicleTypes.map((option) => option.label)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Vehicle Category"
                        // Handle input props manually
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
                        // Handle input props manually
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
      {/* <div className="w-full mt-5 mb-24">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-3xl font-bold text-center "> Customer List: </h3>
          <div className="flex items-center">
            <Search>
              <SearchIconWrapper>
                <SearchIcon className="searchIcon" />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <button className="bg-[#42A1DA] text-white px-2 py-2 rounded-sm ml-2">
              Search
            </button>
          </div>
        </div>
        <div className="overflow-x-auto ">
          <table className="table ">
            <thead className="tableWrap">
              <tr>
                <th>SL</th>
                <th>Customer Name </th>
                <th>Phone Number </th>
                <th>Reference Name </th>
                <th colSpan={3}>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>01</td>
                <td>Car </td>
                <td>BMW2343</td>
                <td>BDT1005</td>
                <td>
                  <div className="editIconWrap edit2">
                    <Link to="/dashboard/update-product">
                      <FaEye className="editIcon" />
                    </Link>
                  </div>
                </td>
                <td>
                  <div className="editIconWrap edit">
                    <Link to="/dashboard/update-customer">
                      <FaEdit className="editIcon" />
                    </Link>
                  </div>
                </td>
                <td>
                  <div className="editIconWrap">
                    <FaTrashAlt className="deleteIcon" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div> */}
    </section>
  );
};

export default UpdateCompany;
