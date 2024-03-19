/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-no-undef */

import TextField from "@mui/material/TextField";
import {  FaTrashAlt, FaEdit, FaUsers, FaUserTie, FaCloudUploadAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { FormControl, InputLabel, Select } from "@mui/material";

const AddEmployee = () => {
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
        
        <div className="productHeadWrap">
          <div className="flex items-center justify-center ">
            <FaUsers size={70} className="invoicIcon" />
            <div className="ml-2">
              <h3 className="text-2xl font-bold"> New Employee </h3>
              <span>Add New Employee </span>
            </div>
          </div>
          <div className="productHome">
            <span>Home / </span>
            <span>Employee / </span>
            <span>New Employee </span>
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
                  label="Full Name "
                  id="Full Name "
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Father Name "
                />
                <TextField
                className="productField"
                fullWidth
                label="Mother Name "
              />
              <TextField
              className="productField"
              fullWidth
              label="Date of Birth"
            />
            <TextField
            className="productField"
            fullWidth
            label="NID Number"
          />
          <TextField
          className="productField"
          fullWidth
          label="Blood Group "
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
                <FormControl  className="productField">
                <InputLabel htmlFor="grouped-native-select">
                  Gender
                </InputLabel>
                <Select
                  className=""
                  
                  native
                  id="grouped-native-select"
                  label="Gender"
                >
              
                <option value="Acura">Male</option>
                <option value="Acura">Female</option>
                </Select>
              </FormControl>
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
            
                
              </div>

              <div>
                <h3 className="text-xl font-bold">Family Address </h3>

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
                <div className="productField">
                <input type="file" id="files" className="hidden" />
                <label for="files" className="flex items-center justify-center cursor-pointer bg-[#42A1DA] text-white py-2 rounded-md ">
                  <span >
                    <FaCloudUploadAlt size={30} className="mr-2"  />
                  </span>
                  Upload Image
                </label>
              </div>
              </div>
            </div>
           <div className="flex justify-end">
           <div className="submitQutationBtn">
           <button
            
             // onClick={handleAddToCard}
             type="submit"
             className=""
           >
             Add Employee
           </button>
         </div>
           </div>
          </form>
        </div>
      </div>
      <div className="w-full mt-5 mb-24">
        <div className="flex items-center justify-between mb-5">
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
              <td>Car  </td>
              <td>BMW2343</td>
              <td>BDT1005</td>
              <td >
                <div className='flex items-center justify-center '>
                  <Link to='/dashboard/employee-profile'>
                  <FaUserTie size={25} className="" />
                  </Link>
                </div>
              </td>
              <td >
                <div className='editIconWrap edit'>
                  <Link to='/dashboard/update-employee'>
                    <FaEdit className='editIcon' />
                  </Link>
                </div>
              </td>
              <td>
                <div className='editIconWrap'>
                  <FaTrashAlt className='deleteIcon' />
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

export default AddEmployee;
