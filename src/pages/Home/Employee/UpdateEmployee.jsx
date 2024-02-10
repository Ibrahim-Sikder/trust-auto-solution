/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-no-undef */

import TextField from "@mui/material/TextField";
import {  FaUsers, FaCloudUploadAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const UpdateEmployee = () => {



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
            <FaUsers size={70} className="invoicIcon" />
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
            <div className="savebtn mt-2 ">
              <button>Update Employee </button>
            </div>
          </form>
        </div>
      </div>
    
    </section>
  );
};

export default UpdateEmployee;
