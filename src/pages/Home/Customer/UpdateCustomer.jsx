/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */

import TextField from "@mui/material/TextField";
import { FaFileInvoice, FaEye, FaTrashAlt, FaEdit } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import {
  carBrands,
  cmDmOptions,
  fuelType,
  vehicleTypes,
} from "../../../constant";
import { Autocomplete } from "@mui/material";
import { HiOutlineUserGroup } from "react-icons/hi";

const UpdateCustomer = () => {

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
      fetch(`http://localhost:5000/api/v1/customer/one/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setSingleCard(data);
          setLoading(false);
        });
    }
  }, [id]);

  console.log(singleCard);

  const onSubmit = async (data) => {
    setLoading(true);

    const values = {
      company_name: data.company_name || singleCard.company_name,
      username: data.username || singleCard.username,
      company_address: data.company_address || singleCard.company_address,
      customer_name: data.customer_name || singleCard.customer_name,
      customer_contact: data.customer_contact || singleCard.customer_contact,
      customer_email: data.customer_email || singleCard.customer_email,
      customer_address: data.customer_address || singleCard.customer_address,
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
        `http://localhost:5000/api/v1/customer/one/${id}`,
        values
      );
      if (response.data.message === "Successfully update card.") {
        navigate("/dashboard/customer-list");
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
            <button>Qutation </button>
          </Link>
          <Link to="/dashboard/invoice">
            <button>Invoice </button>
          </Link>
        </div>
        <div className="productHeadWrap">
        <div className="flex flex-wrap items-center justify-center">
          <HiOutlineUserGroup className="invoicIcon" />
          <div className="ml-2">
            <h3 className="text-sm font-bold md:text-2xl"> New Company </h3>
            <span>Update New Company </span>
          </div>
        </div>
        <div className="productHome">
          <span>Home / </span>
          <span>Product / </span>
          <span>New Company </span>
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
                   value={singleCard?.company_name}
                  onChange={(e) =>
                    setSingleCard({
                      ...singleCard,
                      company_name: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!singleCard?.company_name,
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
                    value={singleCard.company_address}
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
                    onC
                    label="Customer Name (T)"
                    {...register("customer_name")}
                    value={singleCard.customer_name}
                    onChange={(e) =>
                      setSingleCard({
                        ...singleCard,
                        customer_name: e.target.value,
                      })
                    }
                    InputLabelProps={{
                      shrink: !!singleCard.customer_name,
                    }}
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="Customer Contact No (N)"
                    {...register("customer_contact", {
                      pattern: {
                        value: /^\d{11}$/,
                        message: "Please enter a valid number.",
                      },
                    })}
                    value={singleCard.customer_contact}
                    onChange={(e) =>
                      setSingleCard({
                        ...singleCard,
                        customer_contact: e.target.value,
                      })
                    }
                    InputLabelProps={{
                      shrink: !!singleCard.customer_contact,
                    }}
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="Customer Email Address (T)"
                    {...register("customer_email")}
                    value={singleCard.customer_email}
                    onChange={(e) =>
                      setSingleCard({
                        ...singleCard,
                        customer_email: e.target.value,
                      })
                    }
                    InputLabelProps={{
                      shrink: !!singleCard.customer_email,
                    }}
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="Customer Address (T) "
                    {...register("customer_address")}
                    value={singleCard.customer_address}
                    onChange={(e) =>
                      setSingleCard({
                        ...singleCard,
                        customer_address: e.target.value,
                      })
                    }
                    InputLabelProps={{
                      shrink: !!singleCard.customer_address,
                    }}
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    o
                    label="Driver Name (T)"
                    {...register("driver_name")}
                    value={singleCard.driver_name}
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
                    value={singleCard.driver_contact}
                    onChange={(e) =>
                      setSingleCard({
                        ...singleCard,
                        driver_contact: e.target.value,
                      })
                    }
                    InputLabelProps={{
                      shrink: !!singleCard.driver_contact
                    }}
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="Reference Name (T) "
                    {...register("reference_name")}
                    value={singleCard.reference_name}
                    onChange={(e) =>
                      setSingleCard({
                        ...singleCard,
                        reference_name: e.target.value,
                      })
                    }
                    InputLabelProps={{
                      shrink: !!singleCard.reference_name
                    }}
                  />
                </div>
              </div>

              <div className="mt-5 lg:mt-0" >
                <h3 className="mb-2 text-xl font-bold">Vehicle Information </h3>
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
                    value={singleCard.carReg_no}
                    onChange={(e) =>
                      setSingleCard({
                        ...singleCard,
                        carReg_no: e.target.value,
                      })
                    }
                    InputLabelProps={{
                      shrink: !!singleCard.carReg_no
                    }}
                  />
                  <TextField
                    className="carRegNumbers"
                    label="Car R (T&N)"
                    {...register("car_registration_no")}
                    value={singleCard.car_registration_no}
                    onChange={(e) =>
                      setSingleCard({
                        ...singleCard,
                        car_registration_no: e.target.value,
                      })
                    }
                    InputLabelProps={{
                      shrink: !!singleCard.car_registration_no
                    }}
                  />
                </div>

                <div>
                  <TextField
                    className="productField"
                    label="Chassis No (T&N)"
                    {...register("chassis_no")}
                    value={singleCard.chassis_no}
                    onChange={(e) =>
                      setSingleCard({
                        ...singleCard,
                        chassis_no: e.target.value,
                      })
                    }
                    InputLabelProps={{
                      shrink: !!singleCard.chassis_no
                    }}
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="ENGINE NO & CC (T&N) "
                    {...register("engine_no")}
                    value={singleCard.engine_no}
                    onChange={(e) =>
                      setSingleCard({
                        ...singleCard,
                        engine_no: e.target.value,
                      })
                    }
                    InputLabelProps={{
                      shrink: !!singleCard.engine_no
                    }}
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
                    value={singleCard.vehicle_brand}
                    onChange={(e) =>
                      setSingleCard({
                        ...singleCard,
                        vehicle_brand: e.target.value,
                      })
                    }
                    InputLabelProps={{
                      shrink: !!singleCard.vehicle_brand
                    }}
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="Vehicle Name "
                    {...register("vehicle_name")}
                    value={singleCard.vehicle_name}
                    onChange={(e) =>
                      setSingleCard({
                        ...singleCard,
                        vehicle_name: e.target.value,
                      })
                    }
                    InputLabelProps={{
                      shrink: !!singleCard.vehicle_name
                    }}
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
                    value={singleCard.vehicle_model}
                    onChange={(e) =>
                      setSingleCard({
                        ...singleCard,
                        vehicle_model: e.target.value,
                      })
                    }
                    InputLabelProps={{
                      shrink: !!singleCard.vehicle_model
                    }}
                  />
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
                    value={singleCard.vehicle_category}
                    onChange={(e) =>
                      setSingleCard({
                        ...singleCard,
                        vehicle_category: e.target.value,
                      })
                    }
                    InputLabelProps={{
                      shrink: !!singleCard.vehicle_category
                    }}
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="Color & Code (T&N) "
                    {...register("color_code")}
                    value={singleCard.color_code}
                    onChange={(e) =>
                      setSingleCard({
                        ...singleCard,
                        color_code: e.target.value,
                      })
                    }
                    InputLabelProps={{
                      shrink: !!singleCard.color_code
                    }}
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
                    value={singleCard.mileage}
                    onChange={(e) =>
                      setSingleCard({
                        ...singleCard,
                        mileage: e.target.value,
                      })
                    }
                    InputLabelProps={{
                      shrink: !!singleCard.mileage
                    }}
                  />
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
                    value={singleCard.fuel_type}
                    onChange={(e) =>
                      setSingleCard({
                        ...singleCard,
                        fuel_type: e.target.value,
                      })
                    }
                    InputLabelProps={{
                      shrink: !!singleCard.fuel_type
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-2 ml-3 savebtn">
              <button disabled={loading}>Update Customer </button>
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

export default UpdateCustomer;
