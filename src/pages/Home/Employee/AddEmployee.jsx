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
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
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
import uploadFile from "../../../helper/uploadFile";

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

  const handleImageUpload = async (event) => {
    setLoading(true);
    const file = event.target.files?.[0];

    if (file) {
      const uploadPhoto = await uploadFile(file);
      setUrl(uploadPhoto?.secure_url);
      setLoading(false);
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
                <Box>
                  <h3 className="text-xl font-bold mb-5 text-center ">
                    Personal Information
                  </h3>
                  <Grid container spacing={2}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <TextField
                        fullWidth
                        label="Full Name "
                        id="Full Name "
                        {...register("full_name")}
                      />
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <TextField
                        fullWidth
                        label="Date of Birth"
                        {...register("date_of_birth")}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <TextField
                        fullWidth
                        label="NID Number"
                        {...register("nid_number")}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <TextField
                        fullWidth
                        label="Blood Group "
                        {...register("blood_group")}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <TextField
                        fullWidth
                        label="Religion"
                        {...register("religion")}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <Grid container spacing={2}>
                        <Grid item lg={4} md={6} sm={3} xs={12}>
                          <Autocomplete
                            sx={{ marginRight: "2px" }}
                            fullWidth
                            freeSolo
                            options={countries}
                            getOptionLabel={(option) => option.code}
                            value={countryCode}
                            onChange={(event, newValue) => {
                              setCountryCode(newValue);
                              setPhoneNumber("");
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Select Country Code"
                                variant="outlined"
                              />
                            )}
                          />
                        </Grid>
                        <Grid item lg={8} md={6} sm={9} xs={12}>
                          <TextField
                            {...register("phone_number")}
                            fullWidth
                            label="Phone No"
                            variant="outlined"
                            type="tel"
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <TextField
                        fullWidth
                        label="Email Address "
                        id="Email Address "
                        {...register("email")}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor="grouped-native-select">
                          Select Gender
                        </InputLabel>
                        <Select
                          id="grouped-native-select"
                          label="Select Gender"
                          {...register("gender")}
                        >
                          <MenuItem value="Male">Male</MenuItem>

                          <MenuItem value="Female">Female</MenuItem>
                          <MenuItem value="Other">Other</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <TextField
                        fullWidth
                        label="Password"
                        id="Password"
                        {...register("password")}
                        type="password"
                      />
                    </Grid>
                  </Grid>
                </Box>
                <Box sx={{ marginTop: "30px" }}>
                  <h3 className="text-xl font-bold mb-5 text-center ">
                    Employee Information
                  </h3>
                  <Grid container spacing={2}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <TextField
                        fullWidth
                        label="Join Date  "
                        id="Join Date  "
                        {...register("join_date")}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <TextField
                        fullWidth
                        label="Designation  "
                        id="Designation  "
                        {...register("designation")}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor="grouped-native-select">
                          Select Employee Status
                        </InputLabel>
                        <Select
                          
                          id="grouped-native-select"
                          label="Select Employee Status"
                          {...register("status")}
                        >
                             <MenuItem value="Active">Active</MenuItem>
                             <MenuItem value="Inactive">Inactive</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>

                <Box sx={{ marginTop: "30px" }}>
                  <h3 className="text-xl font-bold mb-5 text-center ">
                    Guardian Information
                  </h3>
                  <Grid container spacing={2}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <TextField
                        fullWidth
                        label="Father Name "
                        {...register("father_name")}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <TextField
                        fullWidth
                        label="Mother Name "
                        {...register("mother_name")}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <TextField
                        fullWidth
                        label="Guardian Name"
                        {...register("guardian_name")}
                      />
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <Grid container spacing={2}>
                        <Grid item lg={4} md={6} sm={3} xs={12}>
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
                        </Grid>
                        <Grid item lg={8} md={6} sm={9} xs={12}>
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
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <TextField
                        fullWidth
                        label="Relationship"
                        {...register("relationship")}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <TextField
                        fullWidth
                        label="Nationality"
                        {...register("nationality")}
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Box sx={{ marginTop: "30px" }}>
                  <h3 className="text-xl font-bold mb-5 text-center ">
                    Address
                  </h3>
                  <Grid container spacing={2}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <TextField
                        fullWidth
                        label="Present Address "
                        {...register("local_address")}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <TextField
                        fullWidth
                        label="Permanent Address "
                        {...register("local_address")}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
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
                    </Grid>
                  </Grid>
                </Box>
              </div>
            </div>
            <div className="my-2">
              {createError && (
                <ErrorMessage messages={createError.data.errorSources} />
              )}
            </div>
            <div className="flex justify-end">
              <Button
                sx={{ color: "white" }}
                type="submit"
                disabled={createLoading}
              >
                Add Employee
              </Button>
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
          <div className="flex flex-wrap gap-3 items-center m">
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
