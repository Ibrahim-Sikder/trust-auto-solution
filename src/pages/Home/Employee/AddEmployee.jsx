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
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

const AddEmployee = () => {
  const [active, setActive] = useState("");

  const handleChange = (event) => {
    setActive(event.target.value);
  };

  

  
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
                <FormControl className="productField">
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
                  label="Join Date  "
                  id="Join Date  "
                />

                <TextField
                  className="productField"
                  fullWidth
                  label="Designation  "
                  id="Designation  "
                />

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Select Status
                  </InputLabel>
                  <Select
                    className="productField"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={active}
                    label="Select Status"
                    onChange={handleChange}
                  >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
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
              </div>

              <div>
                <h3 className="text-xl font-bold">Family Address </h3>
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
                  label="Nationality"
                />

                <TextField
                  className="productField"
                  fullWidth
                  label="Religion"
                />

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
                  label="Local Address "
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
        </div>

        <div className="grid grid-cols-5 gap-5 my-8">
          <div className="relative rounded-sm w-max">
            <input className="peer employeeInput" type="text" placeholder="" />
            <label className="employeeLavel" htmlFor="">
              Employee ID
            </label>
          </div>
          <div className="relative rounded-sm w-max">
            <input className="peer employeeInput" type="text" placeholder="" />
            <label className="employeeLavel" htmlFor="">
              Employee Name
            </label>
          </div>
          <div className="relative rounded-sm w-max">
            <input className="peer employeeInput" type="text" placeholder="" />
            <label className="employeeLavel" htmlFor="">
              Designation
            </label>
          </div>
          <div className="relative rounded-sm w-max">
            <button className="employeeBtn employeeInput">Search</button>
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
                <td>Mr Khan</td>
                <td>BMW2343</td>
                <td>BDT1005</td>
                <td>
                  <div className="flex items-center justify-center ">
                    <Link to="/dashboard/employee-profile">
                      <FaUserTie size={25} className="" />
                    </Link>
                  </div>
                </td>
                <td>
                  <div className="editIconWrap edit">
                    <Link to="/dashboard/update-employee">
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

export default AddEmployee;
