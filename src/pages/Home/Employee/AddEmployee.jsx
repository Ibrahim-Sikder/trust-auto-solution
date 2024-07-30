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
import { Link, useNavigate } from "react-router-dom";
import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { countries } from "../../../constant";
import {
  useCreateEmployeeMutation,
  useDeleteEmployeeMutation,
  useGetAllEmployeesQuery,
} from "../../../redux/api/employee";
import { ErrorMessage } from "../../../components/error-message";
import Loading from "../../../components/Loading/Loading";
import { HiOutlineSearch } from "react-icons/hi";

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

  // set country code
  const [countryCode, setCountryCode] = useState(countries[0]);
  const [guardianCountryCode, setGuardianCountryCode] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [guardianPhoneNumber, setGuardianPhoneNumber] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const textInputRef = useRef(null);
  const limit = 10;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [createEmployee, { isLoading: createLoading, error: createError }] =
    useCreateEmployeeMutation();
  const [deleteEmployee, { isLoading: deleteLoading, error: deleteError }] =
    useDeleteEmployeeMutation();

  const {
    data: employees,
    isLoading: employeesLoading,
    error: employeesError,
  } = useGetAllEmployeesQuery({
    limit,
    page: currentPage,
    searchTerm: filterType,
  });

  const handleChange = (event) => {
    setActive(event.target.value);
  };

  const handleImageUpload = async (e) => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      setImageLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/uploads`,
        {
          method: "POST",
          body: formData,
        }
      );

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
    data.country_code = countryCode.code;
    data.guardian_country_code = guardianCountryCode.code;
    data.image = url;
    data.nid_number = Number(data.nid_number);

    const res = await createEmployee(data).unwrap();
    if (res.success) {
      toast.success(res.message);
      navigate("/dashboard/employee-list");
    }
  };

  const deletePackage = async (id) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this card?",
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      try {
        await deleteEmployee(id).unwrap();
        swal("Deleted!", "Card delete successful.", "success");
      } catch (error) {
        swal("Error", "An error occurred while deleting the card.", "error");
      }
    }
  };

  const handlePhoneNumberChange = (e) => {
    const newPhoneNumber = e.target.value;
    if (
      /^\d*$/.test(newPhoneNumber) &&
      newPhoneNumber.length <= 10 &&
      (newPhoneNumber === "" ||
        !newPhoneNumber.startsWith("0") ||
        newPhoneNumber.length > 1)
    ) {
      setPhoneNumber(newPhoneNumber);
    }
  };
  const handleGuardianPhoneNumberChange = (e) => {
    const newPhoneNumber = e.target.value;
    if (
      /^\d*$/.test(newPhoneNumber) &&
      newPhoneNumber.length <= 10 &&
      (newPhoneNumber === "" ||
        !newPhoneNumber.startsWith("0") ||
        newPhoneNumber.length > 1)
    ) {
      setGuardianPhoneNumber(newPhoneNumber);
    }
  };

  const handleAllEmployee = () => {
    setFilterType("");
    if (textInputRef.current) {
      textInputRef.current.value = "";
    }
  };

  if (employeesError) {
    toast.error(employeesError?.data?.message);
  }
  if (deleteError) {
    toast.error(deleteError?.data?.message);
  }

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
            <div className="addEmployeeFieldWraps space-y-3">
              <div>
                <h3 className="text-xl font-bold">Personal Info </h3>
                <TextField
                  className="productField"
                  label="Full Name "
                  id="Full Name "
                  {...register("full_name")}
                />

                <TextField
                  className="productField"
                  label="Date of Birth"
                  {...register("date_of_birth")}
                />
                <TextField
                  className="productField"
                  label="NID Number"
                  {...register("nid_number")}
                />
                <TextField
                  className="productField"
                  label="Blood Group "
                  {...register("blood_group")}
                />
                {/* <TextField
                  className="productField"
                  label="Phone Number "
                  id="Phone Number "
                  {...register("phone_number")}
                /> */}
                <div className="flex items-center my-1">
                  <Autocomplete
                    sx={{ marginRight: "2px", marginLeft: "5px" }}
                    className="jobCardSelect2"
                    freeSolo
                    options={countries}
                    getOptionLabel={(option) => option.code}
                    value={countryCode}
                    onChange={(event, newValue) => {
                      setCountryCode(newValue);
                      setPhoneNumber(""); // Reset the phone number when changing country codes
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Country Code"
                        variant="outlined"
                      />
                    )}
                  />
                  <TextField
                    {...register("phone_number")}
                    className="productField2"
                    label="Phone No"
                    variant="outlined"
                    fullWidth
                    type="tel"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                  />
                </div>
                <TextField
                  className="productField"
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

                <FormControl className="productField">
                  <InputLabel htmlFor="grouped-native-select">
                    Select Status
                  </InputLabel>
                  <Select
                    className="productField"
                    native
                    id="grouped-native-select"
                    label="Select Status "
                    {...register("status")}
                  >
                    <option>Select</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </Select>
                </FormControl>

                <TextField
                  className="productField"
                  fullWidth
                  label="Password"
                  id="Password"
                  {...register("password")}
                  type="password"
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Confirm Password "
                  id="Confirm Password  "
                  {...register("confirm_password")}
                  type="password"
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
                  label="Guardian Name"
                  {...register("guardian_name")}
                />
                <div className="flex items-center my-1">
                  <Autocomplete
                    sx={{ marginRight: "2px", marginLeft: "5px" }}
                    className="jobCardSelect2"
                    freeSolo
                    options={countries}
                    getOptionLabel={(option) => option.code}
                    value={guardianCountryCode}
                    onChange={(event, newValue) => {
                      setGuardianCountryCode(newValue);
                      setGuardianPhoneNumber("");
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Country Code"
                        variant="outlined"
                      />
                    )}
                  />
                  <TextField
                    {...register("guardian_contact")}
                    className="productField2"
                    label="Guardian Phone No"
                    variant="outlined"
                    fullWidth
                    type="tel"
                    value={guardianPhoneNumber}
                    onChange={handleGuardianPhoneNumberChange}
                  />
                </div>

                <TextField
                  className="productField"
                  fullWidth
                  label="Relationship"
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
                  {...register("local_address")}
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
            <div className="my-2">
              {createError && (
                <ErrorMessage messages={createError.data.errorSources} />
              )}
            </div>
            <div className="flex justify-end">
              <div className="submitQutationBtn">
                <button type="submit" disabled={createLoading}>
                  Add Employee
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="w-full mt-5 mb-24">
        <div className="flex flex-wrap items-center justify-between mb-5">
          <h3 className="txt-center tet-sm ml- sm:ml-0 ont-bold md:text-3xl">
            {" "}
            Employee List:{" "}
          </h3>
          <div className="flex flex-wrap items-center">
            <button
              onClick={handleAllEmployee}
              className="bg-[#42A1DA] text-white px-4 py-2 rounded-md mr-1"
            >
              All
            </button>
            <input
              onChange={(e) => setFilterType(e.target.value)}
              type="text"
              placeholder="Search"
              className="border py-2 px-3 rounded-md border-[#ddd]"
              ref={textInputRef}
            />
            <button
              className="bg-[#42A1DA] text-white px-2 py-2 rounded-md ml-1"
              disabled={filterType === ""}
            >
              {" "}
              <HiOutlineSearch size={25} />
            </button>
          </div>
        </div>
        {employeesLoading ? (
          <div className="flex items-center justify-center text-xl">
            <Loading />
          </div>
        ) : (
          <div>
            {employees?.data?.employees?.length === 0 ? (
              <div className="flex items-center justify-center h-full text-xl text-center">
                No matching card found.
              </div>
            ) : (
              <section>
                <table className="table">
                  <thead className="tableWrap">
                    <tr>
                      <th>SL</th>
                      <th>Employee Id </th>
                      <th>Employee Name </th>
                      <th>Phone Number </th>
                      <th>Email</th>
                      <th colSpan={3}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees?.data?.employees?.map((card, index) => (
                      <tr key={card?._id}>
                        <td>{index + 1}</td>
                        <td>{card?.employeeId}</td>
                        <td>{card?.full_name}</td>
                        <td>{card?.full_phone_number}</td>
                        <td>{card?.email}</td>
                        <td>
                          <div className="flex items-center justify-center ">
                            <Link
                              to={`/dashboard/employee-profile?id=${card?._id}`}
                            >
                              <FaUserTie size={25} className="" />
                            </Link>
                          </div>
                        </td>

                        <td>
                          <div className="editIconWrap edit">
                            <Link
                              to={`/dashboard/update-employee?id=${card._id}`}
                            >
                              <FaEdit className="editIcon" />
                            </Link>
                          </div>
                        </td>

                        <td>
                          <button
                            disabled={deleteLoading}
                            onClick={() => deletePackage(card._id)}
                            className="editIconWrap"
                          >
                            <FaTrashAlt className="deleteIcon" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            )}
          </div>
        )}
        {employees?.data?.employees?.length > 0 && (
          <div className="flex justify-center mt-4">
            <Pagination
              count={employees?.data?.meta?.totalPages}
              page={currentPage}
              color="primary"
              onChange={(_, page) => setCurrentPage(page)}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default AddEmployee;
