/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-no-undef */

import TextField from "@mui/material/TextField";
import {
  FaTrashAlt,
  FaEdit,
  FaUsers,
  FaUserTie,
  FaCloudUploadAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { FormControl, InputLabel, Select } from "@mui/material";
import HeaderButton from "../../../components/CommonButton/HeaderButton";
import { NotificationAdd } from "@mui/icons-material";
import { FaUserGear } from "react-icons/fa6";
const UpdatePurchase = () => {
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
      <div className="flex justify-between pb-3 border-b-2">
        <HeaderButton/>
        <div className="flex items-end justify-end">
          <NotificationAdd size={30} className="mr-2" />
          <FaUserGear size={30} />
        </div>
      </div>
        <div className="productHeadWrap">
          <div className="flex items-center justify-center ">
            <FaUsers size={70} className="invoicIcon" />
            <div className="ml-2">
              <h3 className="text-2xl font-bold"> New Purchase </h3>
              <span>Add New Purchase </span>
            </div>
          </div>
          <div className="productHome">
            <span>Home / </span>
            <span>Purchase / </span>
            <span>New Purchase </span>
          </div>
        </div>

        <div className="addProductWrap">
          <form>
            <div className="flex">
              <div>
                <h3 className="text-xl font-bold">Purchase Info </h3>
                <TextField
                  className="productField"
                  fullWidth
                  label="Purchase No"
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Product Name"
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Purchase Date"
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Purchase Name"
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Mobile Number "
                />

                <TextField className="productField" fullWidth label="Email" />
                <TextField
                  className="productField"
                  fullWidth
                  label="Billing Address"
                />
                <FormControl className="productField">
                  <InputLabel htmlFor="grouped-native-select">
                    Select Branch
                  </InputLabel>
                  <Select
                    className="addJobInputField"
                    native
                    id="grouped-native-select"
                    label="Select Branch"
                  >
                    <option value="Acura">Main Branch </option>
                    <option value="Acura">Sub Branch </option>
                  </Select>
                </FormControl>
              </div>

              <div>
                <h3 className="text-xl font-bold">Purchase Details </h3>
                <FormControl className="productField">
                  <InputLabel htmlFor="grouped-native-select">
                  Select Manufacturer
                  </InputLabel>
                  <Select
                    className="addJobInputField"
                    native
                    id="grouped-native-select"
                    label="Car Registration No  "
                  >
                    <option value="Acura"> Manufacturer </option>
                    <option value="Acura"> Vendor </option>
                    <option value="Acura"> Supplier </option>
                  </Select>
                </FormControl>
                
                <TextField
                  className="productField"
                  fullWidth
                  label="Quantity"
                />
                <TextField className="productField" fullWidth label="Price " />
                <TextField className="productField" fullWidth label="Amount " />
                <TextField className="productField" fullWidth label="Stock In " />
                <TextField className="productField" fullWidth label="Stock Out" />
                <TextField
                  className="productField"
                  fullWidth
                  label="Supplier ID "
                />
                <div className="productField">
                  <input type="file" id="files" className="hidden" />
                  <label
                    for="files"
                    className="flex items-center justify-center cursor-pointer bg-[#42A1DA] text-white py-2 rounded-md "
                  >
                    <span>
                      <FaCloudUploadAlt size={30} className="mr-2" />
                    </span>
                    Upload Image
                  </label>
                </div>
              </div>
            </div>
            <div className="mt-2 savebtn">
              <button>Add Purchase </button>
            </div>
          </form>
        </div>
      </div>
      <div className="w-full mt-5 mb-24">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-3xl font-bold text-center "> Purchase List: </h3>
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
                <th>Purchase Name </th>
                <th>Phone Number </th>
                <th>Email</th>
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
                  <div className="flex items-center justify-center ">
                    <Link to="/dashboard/Purchase-profile">
                      <FaUserTie className="invoicIcon" />
                    </Link>
                  </div>
                </td>
                <td>
                  <div className="editIconWrap edit">
                    <Link to="/dashboard/update-Purchase">
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

export default UpdatePurchase;
