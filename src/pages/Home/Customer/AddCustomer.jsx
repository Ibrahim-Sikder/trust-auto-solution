/* eslint-disable react/jsx-no-undef */

import TextField from "@mui/material/TextField";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi";
import { Link } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Autocomplete } from "@mui/material";
import {
  carBrands,
  cmDmOptions,
  fuelType,
  vehicleTypes,
} from "../../../constant";

const AddCustomer = () => {
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

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
          <div className="flex items-center justify-center ">
            <HiOutlineUserGroup className="invoicIcon" />
            <div className="ml-2">
              <h3 className="text-2xl font-bold"> New Customer </h3>
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
          <form>
            <div className="flex justify-center">
              <div>
                <h3 className="text-xl  font-bold mb-1">Customer Information </h3>
                <div>
                  <TextField
                    className="productField"
                    on
                    label="Company Name (T)"
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    onC
                    label="Vehicle User Name (T)"
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    on
                    label="Company Address (T)"
                  />
                </div>

                <div>
                  <TextField
                    className="productField"
                    onC
                    label="Customer Name (T)"
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="Customer Contact No (N)"
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="Customer Email Address (N)"
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="Customer Address (T) "
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    o
                    label="Driver Name (T)"
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="Driver Contact No (N)"
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="Reference Name (T) "
                  />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">Vehicle Information </h3>
                <div className="flex items-center mt-1 productField">
                  <Autocomplete
                    className="jobCardSelect"
                    id="reg"
                    Car
                    Registration
                    No
                    options={cmDmOptions.map((option) => option.label)}
                    renderInput={(params) => (
                      <TextField {...params} label="Car Reg No" />
                    )}
                  />
                  <TextField className="carRegNumbers" label="Car R (T&N)" />
                </div>

                <div>
                  <TextField
                    className="productField"
                    label="Chassis No (T&N)"
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="ENGINE NO & CC (T&N) "
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
                      <TextField {...params} label="Vehicle Brand" />
                    )}
                  />
                </div>
                <div>
                  <TextField className="productField" label="Vehicle Name " />
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="Vehicle Model (N)"
                  />
                </div>
                <div>
                  <Autocomplete
                  className="productField" 
                    Vehicle
                    Types
                    options={vehicleTypes.map((option) => option.label)}
                    renderInput={(params) => (
                      <TextField {...params} label=" Vehicle Categories " />
                    )}
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="Color & Code (T&N) "
                  />
                </div>
                <div>
                  <TextField className="productField" label="Mileage (N) " />
                </div>
                <div>
                  <Autocomplete
                  className="productField"
                    Fuel
                    Type
                    options={fuelType.map((option) => option.label)}
                    renderInput={(params) => (
                      <TextField {...params} label=" Fuel Type" />
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="savebtn mt-2 ml-3">
              <button>Update Customer </button>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-5 mb-24 w-full">
        <div className="flex items-center justify-between  mb-5">
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
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>01</td>
                <td>Car </td>
                <td>BMW2343</td>
                <td>BDT1005</td>
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
      </div>
    </section>
  );
};

export default AddCustomer;
