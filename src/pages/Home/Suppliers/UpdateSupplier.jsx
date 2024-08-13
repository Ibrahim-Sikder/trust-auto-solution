/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-no-undef */

import TextField from "@mui/material/TextField";
import { FaUsers, FaCloudUploadAlt } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  Select,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { countries } from "../../../constant";
import HeaderButton from "../../../components/CommonButton/HeaderButton";
import { NotificationAdd } from "@mui/icons-material";
import { FaUserGear } from "react-icons/fa6";
import {
  useGetSingleSupplierQuery,
  useUpdateSupplierMutation,
} from "../../../redux/api/supplier";
import { ErrorMessage } from "../../../components/error-message";
import Loading from "../../../components/Loading/Loading";
import uploadFile from "../../../helper/uploadFile";

const UpdateSupplier = () => {
  const [url, setUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [getSingleSuppliers, setGetSingleSuppliers] = useState({});

  const [reload, setReload] = useState(false);

  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const navigate = useNavigate();

  const [countryCode, setCountryCode] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data: singleSupplier, isLoading: supplierLoading } =
    useGetSingleSupplierQuery(id);

  const [updateSupplier, { isLoading: updateLoading, error: updateError }] =
    useUpdateSupplierMutation();

  useEffect(() => {
    if (singleSupplier?.data) {
      reset({
        full_name: singleSupplier?.data?.full_name,
        country_code: singleSupplier?.data?.country_code,
        phone_number: singleSupplier?.data?.phone_number,
        email: singleSupplier?.data?.email,
        vendor: singleSupplier?.data?.vendor,
        shop_name: singleSupplier?.data?.shop_name,
        country: singleSupplier?.data?.country,
        city: singleSupplier?.data?.city,
        state: singleSupplier?.data?.state,
        image: url ? url : singleSupplier?.data?.image,
      });
    }
  }, [getSingleSuppliers.image, reset, singleSupplier?.data, url]);

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
    const values = {
      id,
      data,
    };

    const response = await updateSupplier(values).unwrap();

    if (response.success) {
      toast.success(response.message);
      navigate("/dashboard/supplier-list");
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

  if (supplierLoading) {
    return <Loading />;
  }

  return (
    <section>
      <div className=" addProductWraps">
        <div className="flex justify-between pb-3 border-b-2 px-2">
          <HeaderButton />
          <div className="flex items-end justify-end">
            <NotificationAdd size={30} className="mr-2" />
            <FaUserGear size={30} />
          </div>
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Box>
                <h3 className="text-xl font-bold">Personal Info </h3>
                <Grid container spacing={2}>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextField
                      className="productField"
                      fullWidth
                      label="Full Name "
                      id="Full Name "
                      {...register("full_name")}
                      focused={singleSupplier?.data?.full_name || ""}
                    />
                  </Grid>

                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Grid container spacing={1}>
                      <Grid item lg={3} md={4} sm={12} xs={12}>
                        <Autocomplete
                          sx={{ marginRight: "2px", marginLeft: "5px" }}
                          className="jobCardSelect2"
                          freeSolo
                          options={countries}
                          getOptionLabel={(option) => option.label}
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
                              {...register("country_code")}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item lg={9} md={8} sm={12} xs={12}>
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
                              : singleSupplier?.data?.phone_number
                          }
                          onChange={handlePhoneNumberChange}
                          focused={singleSupplier?.data?.phone_number || ""}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextField
                      className="productField"
                      fullWidth
                      label="Email Address "
                      id="Email Address "
                      {...register("email")}
                      focused={singleSupplier?.data?.email}
                    />
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor={singleSupplier?.data?.vendor}>
                        Vendor Categories
                      </InputLabel>
                      <Select
                        className="addJobInputField"
                        native
                        id="grouped-native-select"
                        label="Vendor Categories"
                        {...register("vendor")}
                        focused={singleSupplier?.data?.vendor}
                      >
                        <option>{singleSupplier?.data?.vendor} </option>
                        <option value="New Parts">New Parts </option>
                        <option value="Recondition Parts">
                          Recondition Parts
                        </option>
                        <option value="New & Recondition Parts">
                          New & Recondition Parts
                        </option>
                        <option value="Body Items">Body Items</option>
                        <option value="Engine & Suspension Items">
                          Engine & Suspension Items
                        </option>
                        <option value="Electric Items">Electric Items</option>
                        <option value="Others">Others</option>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextField
                      className="productField"
                      fullWidth
                      label="Shop Name"
                      id="Password"
                      {...register("shop_name")}
                      focused={singleSupplier?.data?.shop_name}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box>
                <h3 className="text-xl font-bold">Address </h3>
                <Grid container spacing={2}>
                  <Grid item l g={12} md={12} sm={12} xs={12}>
                    <TextField
                      className="productField"
                      fullWidth
                      label="Country "
                      {...register("country")}
                      focused={singleSupplier?.data?.country}
                    />
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextField
                      className="productField"
                      fullWidth
                      label="Town/City "
                      {...register("city")}
                      focused={singleSupplier?.data?.city}
                    />
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextField
                      className="productField"
                      fullWidth
                      label="State "
                      {...register("state")}
                      focused={singleSupplier?.data?.state}
                    />
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <div className="productField">
                      <input
                        onChange={handleImageUpload}
                        type="file"
                        id="files"
                        className="hidden"
                      />
                      <label
                        htmlFor="files"
                        className="flex items-center justify-center cursor-pointer bg-[#42A1DA] text-white py-2 rounded-md "
                      >
                        <span>
                          <FaCloudUploadAlt size={30} className="mr-2" />
                        </span>
                        {imageLoading ? (
                          <span>Uploading...</span>
                        ) : (
                          <>
                            {url || singleSupplier?.data?.image ? (
                              <div>
                                {/* Check if url exists, if yes, render it */}
                                {url && (
                                  <span className="overflow-hidden">
                                    {url.slice(0, 4)}
                                    {/* Display only the first 4 characters */}
                                    {url.slice(url.lastIndexOf("."))}{" "}
                                    {/* Display file extension */}
                                  </span>
                                )}
                                {/* Check if getSingleSuppliers.image exists, if yes, render it */}
                                {singleSupplier?.data?.image && (
                                  <span className="overflow-hidden">
                                    {singleSupplier?.data?.image.slice(0, 4)}
                                    {/* Display only the first 4 characters */}
                                    {singleSupplier?.data?.image.slice(
                                      singleSupplier?.data?.image.lastIndexOf(
                                        "."
                                      )
                                    )}{" "}
                                    {/* Display file extension */}
                                  </span>
                                )}
                              </div>
                            ) : (
                              <span>Upload Image</span>
                            )}
                          </>
                        )}
                      </label>
                    </div>
                  </Grid>
                </Grid>
              </Box>
            </div>
            <div className="text-start text-red-400 py-2">
              {updateError && (
                <ErrorMessage messages={updateError?.data?.errorSources} />
              )}{" "}
            </div>
            <div className="mt-2 savebtn">
              <Button
                type="submit"
                sx={{ color: "white" }}
                disabled={updateLoading || loading}
              >
                Update Supplier{" "}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdateSupplier;
