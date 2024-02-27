/* eslint-disable react/jsx-no-undef */

import TextField from "@mui/material/TextField";
import { FaFileInvoice, FaTrashAlt, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const UpdateCustomer = () => {
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
            <FaFileInvoice className="invoicIcon" />
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
            <div className="flex">
              <div>
                <h3 className="text-xl font-bold">Customer Info </h3>
                <TextField
                  className="productField"
                  fullWidth
                  label="Customer Name"
                  id="Customer Name "
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
                  label="Reference Name "
                  id="Reference Name "
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Car Driver Name "
                  id="Car Driver Name "
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Address"
                  id="Car address"
                />
              </div>

              <div>
                <h3 className="text-xl font-bold">Vehicle Info </h3>
                <TextField
                  className="productField"
                  fullWidth
                  label="Chassis No "
                  id="Chassis No  "
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Engine No  "
                  id="Engine No  "
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Mileage  "
                  id="Mileage  "
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Car Registration No  "
                  id="Car Registration No  "
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Company Name"
                />
                <TextField className="productField" fullWidth label="Color " />
                <TextField
                  className="productField"
                  fullWidth
                  label="Vehicle Model "
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Vehicle Brand "
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Vehicle Category "
                />
              </div>
            </div>

            {/* <div className="productDetailWrap mt-8">
						<label className="block"> Customer Details </label>
						<textarea
							placeholder="Product Details "
							className="productDetail"
							name=""
							id=""
							cols="30"
							rows="10"
						/>
					</div> */}
            <div className="savebtn mt-2">
              <button>Add Customer </button>
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

export default UpdateCustomer;
