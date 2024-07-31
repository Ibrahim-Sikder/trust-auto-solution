/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-no-undef */

import {
  Autocomplete,
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaUsers, FaCloudUploadAlt } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { countries } from "../../../constant";
import {
  useGetSingleEmployeeQuery,
  useUpdateEmployeeMutation,
} from "../../../redux/api/employee";
import ImageUploader from "../../../helper/uploadImage";
import { ErrorMessage } from "../../../components/error-message";
import Loading from "../../../components/Loading/Loading";

const UpdateEmployee = () => {
  const [url, setUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(false);

  const [countryCode, setCountryCode] = useState(countries[0]);
  const [guardianCountryCode, setGuardianCountryCode] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [guardianPhoneNumber, setGuardianPhoneNumber] = useState("");

  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {
    data: singleEmployee,
    isLoading: employeeLoading,
    error: employeeError,
  } = useGetSingleEmployeeQuery(id);

  const [updateEmployee, { isLoading: updateLoading, error: updateError }] =
    useUpdateEmployeeMutation();

  useEffect(() => {
    if (singleEmployee?.data) {
      reset({
        employeeId: singleEmployee.data.employeeId,
        full_name: singleEmployee?.data?.full_name,
        date_of_birth: singleEmployee?.data?.date_of_birth,
        nid_number: singleEmployee?.data?.nid_number,
        blood_group: singleEmployee?.data?.blood_group,
        country_code: singleEmployee?.data?.country_code,
        phone_number: singleEmployee?.data?.phone_number,
        email: singleEmployee?.data?.email,
        gender: singleEmployee?.data?.gender,
        join_date: singleEmployee?.data?.join_date,
        designation: singleEmployee?.data?.designation,
        status: singleEmployee?.data?.status,
        password: singleEmployee?.data?.password,
        confirm_password: singleEmployee?.data?.confirm_password,
        father_name: singleEmployee?.data?.father_name,
        mother_name: singleEmployee?.data?.mother_name,

        guardian_name: singleEmployee?.data?.guardian_name,
        guardian_country_code: singleEmployee?.data?.guardian_country_code,
        guardian_contact: singleEmployee?.data?.guardian_contact,
        relationship: singleEmployee?.data?.relationship,

        nationality: singleEmployee?.data?.nationality,
        religion: singleEmployee?.data?.religion,

        country: singleEmployee?.data?.country,
        city: singleEmployee?.data?.city,
        local_address: singleEmployee?.data?.local_address,
      });
    }
  }, [reset, singleEmployee?.data]);

  function isImage(url) {
    return /\.(jpg|jpeg|png)$/i.test(url);
  }

  function getFileName(url) {
    return url.split("/").pop().split(".")[0]; // Extract only the file name without extension
  }

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

    const values = {
      id,
      data,
    };

    const res = await updateEmployee(values).unwrap();
    if (res.success) {
      toast.success(res.message);
      navigate("/dashboard/employee-list");
    }
  };

  const handlePhoneNumberChange = (e) => {
    const newPhoneNumber = e.target.value;
    if (
      /^\d*$/.test(newPhoneNumber) &&
      newPhoneNumber.length <= 11 &&
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
      newPhoneNumber.length <= 11 &&
      (newPhoneNumber === "" ||
        !newPhoneNumber.startsWith("0") ||
        newPhoneNumber.length > 1)
    ) {
      setPhoneNumber(newPhoneNumber);
    }
  };

  if (employeeLoading) {
    return <Loading />;
  }
  if (employeeError) {
    toast.error(employeeError.data.message);
  }

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className=" space-y-3">
              <Box>
                <h3 className="text-xl font-bold mb-5 text-center ">
                  Employee Information{" "}
                </h3>
                <Grid container spacing={2}>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField
                      fullWidth
                      label="Full Name "
                      id="Full Name "
                      {...register("full_name")}
                      focused={singleEmployee?.data?.full_name || ""}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField
                      fullWidth
                      label="Date of Birth"
                      {...register("date_of_birth")}
                      focused={singleEmployee?.data?.date_of_birth || ""}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField
                      fullWidth
                      label="NID Number"
                      {...register("nid_number")}
                      focused={singleEmployee?.data?.nid_number || ""}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField
                      fullWidth
                      label="Blood Group "
                      {...register("blood_group")}
                      focused={singleEmployee?.data?.blood_group || ""}
                    />
                  </Grid>

                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Grid container spacing={2}>
                      <Grid item lg={4} md={6} sm={3} xs={12}>
                        <Autocomplete
                          sx={{ marginRight: "2px", marginLeft: "5px" }}
                          fullWidth
                          freeSolo
                          options={countries}
                          getOptionLabel={(option) => option.code}
                          value={
                            countryCode
                              ? countryCode
                              : singleEmployee?.data?.country_code
                          }
                          onChange={(event, newValue) => {
                            setCountryCode(newValue);
                            setPhoneNumber("");
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              {...register("country_code")}
                              label="Select Country Code"
                              variant="outlined"
                              focused={singleEmployee?.data?.country_code || ""}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item lg={8} md={6} sm={9} xs={12}>
                        <TextField
                          {...register("phone_number")}
                          className="productField2"
                          label="Phone No"
                          variant="outlined"
                          fullWidth
                          type="tel"
                          value={
                            phoneNumber
                              ? phoneNumber
                              : singleEmployee?.data?.phone_number
                          }
                          onChange={handlePhoneNumberChange}
                          focused={singleEmployee?.data?.phone_number || ""}
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
                      focused={singleEmployee?.data?.email || ""}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="grouped-native-select">
                        Gender
                      </InputLabel>
                      <Select
                        fullWidth
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
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField
                      fullWidth
                      label="Join Date  "
                      id="Join Date  "
                      {...register("join_date")}
                      focused={singleEmployee?.data?.join_date || ""}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField
                      fullWidth
                      label="Designation  "
                      id="Designation  "
                      {...register("designation")}
                      focused={singleEmployee?.data?.designation || ""}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="grouped-native-select">
                        Select Status
                      </InputLabel>
                      <Select
                        fullWidth
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
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField
                      fullWidth
                      label="Password"
                      id="Password"
                      {...register("password")}
                      type="password"
                      focused={singleEmployee?.data?.password || ""}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField
                      fullWidth
                      label="Confirm Password "
                      id="Confirm Password  "
                      {...register("confirm_password")}
                      type="password"
                      focused={singleEmployee?.data?.confirm_password || ""}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField
                      fullWidth
                      label="Father Name "
                      {...register("father_name")}
                      focused={singleEmployee?.data?.father_name || ""}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField
                      fullWidth
                      label="Mother Name "
                      {...register("mother_name")}
                      focused={singleEmployee?.data?.mother_name || ""}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField
                      fullWidth
                      label="Guardian Name"
                      {...register("guardian_name")}
                      focused={singleEmployee?.data?.guardian_name || ""}
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
                          value={
                            guardianCountryCode
                              ? guardianCountryCode
                              : singleEmployee?.data?.guardian_country_code
                          }
                          onChange={(event, newValue) => {
                            setGuardianCountryCode(newValue);
                            setGuardianPhoneNumber("");
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              {...register("guardian_country_code")}
                              label="Select Country Code"
                              variant="outlined"
                              focused={
                                singleEmployee?.data?.guardian_country_code ||
                                ""
                              }
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
                          value={
                            guardianPhoneNumber
                              ? guardianPhoneNumber
                              : singleEmployee?.data?.guardian_contact
                          }
                          onChange={handleGuardianPhoneNumberChange}
                          focused={singleEmployee?.data?.guardian_contact || ""}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField
                      fullWidth
                      label="Relationship"
                      {...register("relationship")}
                      focused={singleEmployee?.data?.relationship || ""}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField
                      fullWidth
                      label="Nationality"
                      {...register("nationality")}
                      focused={singleEmployee?.data?.nationality || ""}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField
                      className="productField"
                      fullWidth
                      label="Religion"
                      {...register("religion")}
                      focused={singleEmployee?.data?.religion || ""}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField
                      fullWidth
                      label="Country "
                      {...register("country")}
                      focused={singleEmployee?.data?.country || ""}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField
                      fullWidth
                      label="Town/City "
                      {...register("city")}
                      focused={singleEmployee?.data?.city || ""}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField
                      fullWidth
                      label="Local Address "
                      {...register("local_address")}
                      focused={singleEmployee?.data?.local_address || ""}
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
                      <ImageUploader />
                    </div>
                  </Grid>
                </Grid>
              </Box>
            </div>

            <div className="my-2">
              {updateError && (
                <ErrorMessage messages={updateError.data.errorSources} />
              )}
            </div>
            <div className="flex justify-end">
              <div className="bg-[#42a1da] text-white px-4 py-[10px] rounded-md">
                <button disabled={updateLoading} type="submit">
                  Update Employee
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdateEmployee;
