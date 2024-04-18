/* eslint-disable no-unused-vars */
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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import swal from "sweetalert";

const AddEmployee = () => {
  const [active, setActive] = useState("");
  const [url, setUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [getAllEmployee, setGetAllEmployee] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [noMatching, setNoMatching] = useState(null);
  const [reload, setReload] = useState(false);

 

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleChange = (event) => {
    setActive(event.target.value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/employee")
      .then((response) => {
        setGetAllEmployee(response.data.employee);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [reload]);

 

  const handleImageUpload = async (e) => {
    try {
      const file = e.target.files[0];  
      const formData = new FormData();
      formData.append("image", file);  
      setImageLoading(true);
      const response = await fetch("http://localhost:5000/api/v1/uploads", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.message === "Image uploaded successful") {
        setUrl(data.image_url);
        setImageLoading(false);
      }
    } catch (error) {
      setImageLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setError("");

    const randomNumber = Math.floor(Math.random() * 1000);
    const paddedNumber = randomNumber.toString().padStart(4, "0");
    const uniqueId = `TAS${paddedNumber}`;

    try {
      const values = {
        employeeId: uniqueId,
        full_name: data.full_name,
        date_of_birth: data.date_of_birth,
        nid_number: data.nid_number,
        blood_group: data.blood_group,
        phone_number: data.phone_number,
        email: data.email,
        gender: data.gender,
        join_date: data.join_date,
        designation: data.designation,
        status: data.status,
        password: data.password,
        confirm_password: data.confirm_password,
        father_name: data.father_name,
        mother_name: data.mother_name,
        nationality: data.nationality,
        religion: data.religion,

        country: data.country,
        city: data.city,
        address: data.address,
        image: url,
      };

      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/v1/employee",
        values
      );

      if (response.data.message === "Successfully employee post") {
        toast.success("Successfully employee added.");
        setLoading(false);
       
        setReload(!reload);
        reset();
        setError("");
      }
    } catch (error) {
      if (error.response) {
        setLoading(false);
        setError(error.response.data.message);
      }
    }
  };

 
// pagination 
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(
    Number(sessionStorage.getItem("supplier")) || 1
  );
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const deletePackage = async (id) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this card?",
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      try {
        const res = await fetch(
          `http://localhost:5000/api/v1/employee/one/${id}`,
          {
            method: "DELETE",
          }
        );
        const data = await res.json();

        if (data.message == "Employee delete successful") {
          setGetAllEmployee(getAllEmployee?.filter((pkg) => pkg._id !== id));
          setReload(!reload);
        }
        swal("Deleted!", "Card delete successful.", "success");
      } catch (error) {
        swal("Error", "An error occurred while deleting the card.", "error");
      }
    }
  };

  useEffect(() => {
    sessionStorage.setItem("supplier", currentPage.toString());
  }, [currentPage]);

  useEffect(() => {
    const storedPage = Number(sessionStorage.getItem("supplier")) || 1;
    setCurrentPage(storedPage);
    setMaxPageNumberLimit(
      Math.ceil(storedPage / pageNumberLimit) * pageNumberLimit
    );
    setMinPageNumberLimit(
      Math.ceil(storedPage / pageNumberLimit - 1) * pageNumberLimit
    );
  }, [pageNumberLimit]);

  const handleClick = (e) => {
    const pageNumber = Number(e.target.id);
    setCurrentPage(pageNumber);
    sessionStorage.setItem("supplier", pageNumber.toString());
  };
  const pages = [];
  for (let i = 1; i <= Math.ceil(getAllEmployee?.length / limit); i++) {
    pages.push(i);
  }

  const renderPagesNumber = pages?.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={
            currentPage === number
              ? "bg-green-500 text-white px-3 rounded-md cursor-pointer"
              : "cursor-pointer text-black border border-green-500 px-3 rounded-md"
          }
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const lastIndex = currentPage * limit;
  const startIndex = lastIndex - limit;

  let currentItems;
  if (Array.isArray(getAllEmployee)) {
    currentItems = getAllEmployee?.slice(startIndex, lastIndex);
  } else {
    currentItems = [];
  }

  const renderData = (getAllEmployee) => {
    return (
      <table className="table">
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
          {getAllEmployee?.map((card, index) => (
            <tr key={card._id}>
              <td>{index + 1}</td>
              <td>{card?.full_name}</td>
              <td>{card?.phone_number}</td>
              <td>{card?.email}</td>
              <td>
                <div className="flex items-center justify-center ">
                  <Link to="/dashboard/employee-profile">
                    <FaUserTie size={25} className="" />
                  </Link>
                </div>
              </td>

              <td>
                <div className="editIconWrap edit">
                  <Link to={`/dashboard/update-employee?id=${card._id}`}>
                    <FaEdit className="editIcon" />
                  </Link>
                </div>
              </td>

              <td>
                <div
                  onClick={() => deletePackage(card._id)}
                  className="editIconWrap"
                >
                  <FaTrashAlt className="deleteIcon" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const handlePrevious = () => {
    const newPage = currentPage - 1;
    setCurrentPage(newPage);
    sessionStorage.setItem("supplier", newPage.toString());

    if (newPage % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  const handleNext = () => {
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
    sessionStorage.setItem("supplier", newPage.toString());

    if (newPage > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages?.length > maxPageNumberLimit) {
    pageIncrementBtn = (
      <li
        onClick={() => handleClick({ target: { id: maxPageNumberLimit + 1 } })}
        className="pl-1 text-black cursor-pointer"
      >
        &hellip;
      </li>
    );
  }

  let pageDecrementBtn = null;
  if (currentPage > pageNumberLimit) {
    pageDecrementBtn = (
      <li
        onClick={() => handleClick({ target: { id: minPageNumberLimit } })}
        className="pr-1 text-black cursor-pointer"
      >
        &hellip;
      </li>
    );
  }

  const handleFilterType = async () => {
    try {
      const data = {
        filterType,
      };
      setLoading(true);
      const response = await axios.post(
        `http://localhost:5000/api/v1/employee/all`,
        data
      );

      if (response.data.message === "Filter successful") {
        setGetAllEmployee(response.data.result);
        setNoMatching(null);
        setLoading(false);
      }
      if (response.data.message === "No matching found") {
        setNoMatching(response.data.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handleAllEmployee = () => {
    try {
      fetch(`http://localhost:5000/api/v1/employee`)
        .then((res) => res.json())
        .then((data) => {
          setGetAllEmployee(data.employee);
          setNoMatching(null);
        });
    } catch (error) {
      toast.error("Something went wrong");
    }
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex">
              <div>
                <h3 className="text-xl font-bold">Personal Info </h3>
                <TextField
                  className="productField"
                  fullWidth
                  label="Full Name "
                  id="Full Name "
                  {...register("full_name")}
                />

                <TextField
                  className="productField"
                  fullWidth
                  label="Date of Birth"
                  {...register("date_of_birth")}
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="NID Number"
                  {...register("nid_number")}
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Blood Group "
                  {...register("blood_group")}
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Phone Number "
                  id="Phone Number "
                  {...register("phone_number")}
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Email Address "
                  id="Email Address "
                  {...register("email")}
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
                    {...register("gender")}
                  >
                    <option>Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Select>
                </FormControl>

                <TextField
                  className="productField"
                  fullWidth
                  label="Join Date  "
                  id="Join Date  "
                  {...register("join_date")}
                />

                <TextField
                  className="productField"
                  fullWidth
                  label="Designation  "
                  id="Designation  "
                  {...register("designation")}
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
                    {...register("status")}
                  >
                    <MenuItem>Select</MenuItem>
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  className="productField"
                  fullWidth
                  label="Password"
                  id="Password"
                  {...register("password")}
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Confirm Password "
                  id="Confirm Password  "
                  {...register("confirm_password")}
                />
              </div>

              <div>
                <h3 className="text-xl font-bold">Family Address </h3>
                <TextField
                  className="productField"
                  fullWidth
                  label="Father Name "
                  {...register("father_name")}
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Mother Name "
                  {...register("mother_name")}
                />
                <TextField
                className="productField"
                fullWidth
                label="New Field "
                {...register("guardian_name")}
              />
              <TextField
              className="productField"
              fullWidth
              label="New Field "
              {...register("guardian_contact")}
            />
            <TextField
            className="productField"
            fullWidth
            label="New Field "
            {...register("relationship")}
          />
                <TextField
                  className="productField"
                  fullWidth
                  label="Nationality"
                  {...register("nationality")}
                />

                <TextField
                  className="productField"
                  fullWidth
                  label="Religion"
                  {...register("religion")}
                />

                <TextField
                  className="productField"
                  fullWidth
                  label="Country "
                  {...register("country")}
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Town/City "
                  {...register("city")}
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Local Address "
                  {...register("address")}
                />
                <div className="productField">
                  <input
                    onChange={handleImageUpload}
                    type="file"
                    id="files"
                    className="hidden"
                  />
                  <label
                    for="files"
                    className="flex items-center justify-center cursor-pointer bg-[#42A1DA] text-white py-2 rounded-md "
                  >
                    <span>
                      <FaCloudUploadAlt size={30} className="mr-2" />
                    </span>
                    {imageLoading ? (
                      <span>Uploading...</span>
                    ) : (
                      <>
                        {url ? (
                          <span>Uploaded</span>
                        ) : (
                          <span> Upload Image</span>
                        )}
                      </>
                    )}
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="submitQutationBtn">
                <button
                  // onClick={handleAddToCard}
                  type="submit"
                  disabled={loading || imageLoading}
                >
                  Add Employee
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="w-full mt-5 mb-24">
        

        <div className="mt-20 overflow-x-auto">
        <div className="flex flex-wrap items-center justify-between mb-5">
          <h3 className="mb-3 text-sm font-bold lg:text-3xl">Employee List:</h3>
          <div className="flex items-center searcList">
            <div
              onClick={handleAllEmployee}
              className="mx-6 font-semibold cursor-pointer bg-[#42A1DA] px-2 py-1 rounded-md text-white"
            >
              All
            </div>
            <div className="searchGroup">
              <input
                onChange={(e) => setFilterType(e.target.value)}
                autoComplete="off"
                type="text"
                placeholder="Search"
              />
            </div>
            <button onClick={handleFilterType} className="SearchBtn ">
              Search{" "}
            </button>
          </div>
        </div>
      </div>
        {loading ? (
          <div className="flex items-center justify-center text-xl">
            Loading...
          </div>
        ) : (
          <div>
            {getAllEmployee?.length === 0 || currentItems.length === 0 ? (
              <div className="flex items-center justify-center h-full text-xl text-center">
                No matching suppliers found.
              </div>
            ) : (
              <>
                <section>
                  {renderData(currentItems)}
                  <ul
                    className={
                      minPageNumberLimit < 5
                        ? "flex justify-center gap-2 md:gap-4 pb-5 mt-6"
                        : "flex justify-center gap-[5px] md:gap-2 pb-5 mt-6"
                    }
                  >
                    <button
                      onClick={handlePrevious}
                      disabled={currentPage === pages[0] ? true : false}
                      className={
                        currentPage === pages[0]
                          ? "text-gray-600"
                          : "text-gray-300"
                      }
                    >
                      Previous
                    </button>
                    <span
                      className={minPageNumberLimit < 5 ? "hidden" : "inline"}
                    >
                      {pageDecrementBtn}
                    </span>
                    {renderPagesNumber}
                    {pageIncrementBtn}
                    <button
                      onClick={handleNext}
                      disabled={
                        currentPage === pages[pages?.length - 1] ? true : false
                      }
                      className={
                        currentPage === pages[pages?.length - 1]
                          ? "text-gray-700"
                          : "text-gray-300 pl-1"
                      }
                    >
                      Next
                    </button>
                  </ul>
                </section>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default AddEmployee;
