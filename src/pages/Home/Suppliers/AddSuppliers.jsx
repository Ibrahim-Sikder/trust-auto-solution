/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-no-undef */

import TextField from "@mui/material/TextField";
import {  FaTrashAlt, FaEdit, FaUsers, FaUserTie, FaCloudUploadAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FormControl, InputLabel, Select } from "@mui/material";
import { HiOutlineSearch } from "react-icons/hi";
const AddSuppliers = () => {


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
              <h3 className="text-2xl font-bold"> New Supplier </h3>
              <span>Add New Supplier </span>
            </div>
          </div>
          <div className="productHome">
            <span>Home / </span>
            <span>Supplier / </span>
            <span>New Supplier </span>
          </div>
        </div>

        <div className="addProductWrap">
          <form>
            <div className="block md:flex">
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
                  label="Phone Number "
                  id="Phone Number "
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Email Address "
                  id="Email Address "
                />
                <div >
                <FormControl  className="productField">
                  <InputLabel htmlFor="grouped-native-select">
                    Vendor Categories
                  </InputLabel>
                  <Select
                    className="addJobInputField"
                    
                    native
                    id="grouped-native-select"
                    label="Car Registration No  "
                  >
                
                  <option value="Acura">New Parts </option>
                  <option value="Acura">Recondition Parts</option>
                  <option value="Acura">New & Recondition Parts</option>
                  <option value="Acura">Body Items</option>
                  <option value="Acura">Engine & Suspension Items</option>
                  <option value="Acura">Electric Items</option>
                  <option value="Acura">Others</option>
                  </Select>
                </FormControl>
              </div>
                <TextField
                  className="productField"
                  fullWidth
                  label="Shop Name"
                  id="Password"
                />
                
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
            <div className="mt-2 savebtn">
              <button>Add Supplier </button>
            </div>
          </form>
        </div>
      </div>
      <div className="w-full mt-5 mb-24">
        <div className="flex flex-wrap items-center justify-between mb-5">
          <h3 className="text-3xl font-bold text-center "> Supplier List: </h3>
          <div className="flex items-center mt-2 md:mt-0 ">
        {/**
          <button
            onClick={handleAllCustomer}
            className="mx-6 font-semibold cursor-pointer bg-[#42A1DA] px-2 py-1 rounded-md text-white"
          >
            All
          </button>
          */}
          <input
    
          type="text"
          placeholder="Search"
          className="border py-2 px-3 rounded-md border-[#ddd]"
        />
        <button
     
        className="bg-[#42A1DA] text-white px-2 py-2 rounded-sm ml-1"
      >
        {" "}
        <HiOutlineSearch size={25} />
      </button>
        </div>
        </div>
        <div className="overflow-x-auto ">
          <table className="table ">
            <thead className="tableWrap">
              <tr>
                <th>SL</th>
                <th>Supplier Name </th>
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
                  <Link to='/dashboard/Supplier-profile'>
                  <FaUserTie className="invoicIcon" />
                  </Link>
                </div>
              </td>
              <td >
                <div className='editIconWrap edit'>
                  <Link to='/dashboard/update-Supplier'>
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

export default AddSuppliers;
