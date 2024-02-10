/* eslint-disable react/jsx-no-undef */

import TextField from "@mui/material/TextField";
import { FaEye, FaTrashAlt, FaEdit, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const UpdateEmployee = () => {
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
            <button>Quotation </button>
          </Link>
          <Link to="/dashboard/invoice">
            <button>Invoice </button>
          </Link>
        </div>
        <div className="productHeadWrap">
          <div className="flex items-center justify-center ">
            <FaUsers className="invoicIcon" />
            <div className="ml-2">
              <h3 className="text-2xl font-bold"> Update Employee </h3>
              <span> Update Employee </span>
            </div>
          </div>
          <div className="productHome">
            <span>Home / </span>
            <span>Product / </span>
            <span>Update Employee </span>
          </div>
        </div>

        <div className="addProductWrap">
          <form>
            <div className="flex">
              <div>
                <h3 className="text-xl font-bold">Personal Info </h3>
                <TextField
                  className="productField"
                  fullWidth
                  label="Given Name "
                  id="Give Name "
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Sur Name "
                  id="Sur Name "
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Phone Number "
                  id="Phone Number "
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Email Address "
                  id="Email Address "
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Gender "
                  id="Gender "
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Password"
                  id="Password"
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Confirm Password "
                  id="Confirm Password  "
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Join Date  "
                  id="Join Date  "
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Left Date"
                  id="Left Date"
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Designation  "
                  id="Designation  "
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Date of Birth "
                />
                <TextField className="productField" fullWidth label="Color " />
                
              </div>

              <div>
                <h3 className="text-xl font-bold">Address </h3>

                <TextField
                  className="productField"
                  fullWidth
                  label="Country "
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Town/City "
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Address "
                />
                <TextField type="file" className="productField" fullWidth />
              </div>
            </div>
            <div className="savebtn mt-2">
              <button>Update Employee </button>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-5 mb-24 w-full">
        <div className="flex items-center justify-between  mb-5">
          <h3 className="text-3xl font-bold text-center "> Employee List: </h3>
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
                <th>Employee Name </th>
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
                  <div className="editIconWrap edit2">
                    <Link to="/dashboard/update-product">
                      <FaEye className="editIcon" />
                    </Link>
                  </div>
                </td>
                <td>
                  <div className="editIconWrap edit">
                    <Link to="/dashboard/update-Employee">
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

export default UpdateEmployee;
