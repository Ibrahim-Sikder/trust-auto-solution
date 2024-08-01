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
import { HiOutlineSearch } from "react-icons/hi";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { countries } from "../../../constant";
import HeaderButton from "../../../components/CommonButton/HeaderButton";
import { FaUserGear } from "react-icons/fa6";
import { NotificationAdd } from "@mui/icons-material";
import {
  useCreateSupplierMutation,
  useDeleteSupplierMutation,
  useGetAllSuppliersQuery,
} from "../../../redux/api/supplier";
import { ErrorMessage } from "../../../components/error-message";
import uploadFile from "../../../helper/uploadFile";
import Loading from "../../../components/Loading/Loading";
import { Button } from "react-scroll";
const AddSuppliers = () => {
  const [url, setUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [getAllSuppliers, setGetAllSuppliers] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [noMatching, setNoMatching] = useState(null);
  const [reload, setReload] = useState(false);
  const [countryCode, setCountryCode] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const limit = 10;

  const textInputRef = useRef(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [createSupplier, { isLoading: createLoading, error: createError }] =
    useCreateSupplierMutation();

  const [deleteSupplier, { isLoading: supplierLoading }] =
    useDeleteSupplierMutation();

  const { data: suppliers, isLoading: suppliersLoading } =
    useGetAllSuppliersQuery({
      limit,
      page: currentPage,
      searchTerm: filterType,
    });

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
    setError("");

    const values = {
      full_name: data.full_name,
      phone_number: phoneNumber,
      country_code: countryCode.code,
      email: data.email,
      vendor: data.vendor,
      shop_name: data.shop_name,
      country: data.country,
      city: data.city,
      state: data.state,
      image: url,
    };

    const response = await createSupplier(values).unwrap();

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

  const deletePackage = async (id) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this card?",
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      try {
        await deleteSupplier(id).unwrap();
        swal("Deleted!", "Card delete successful.", "success");
      } catch (error) {
        swal("Error", "An error occurred while deleting the card.", "error");
      }
    }
  };

  const handleAllSuppliers = () => {
    setFilterType("");
    if (textInputRef.current) {
      textInputRef.current.value = "";
    }
  };

  return (
    <section>
      <div className=" addProductWraps min-h-screen ">
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
            <div className="block md:flex">
              <div>
                <h3 className="text-xl font-bold">Personal Info </h3>

                <TextField
                  className="productField"
                  fullWidth
                  label="Full Name "
                  id="Full Name "
                  {...register("full_name")}
                />

                <div className="flex items-center my-1">
                  <Autocomplete
                    sx={{ marginRight: "2px", marginLeft: "5px" }}
                    className="jobCardSelect2"
                    freeSolo
                    options={countries}
                    getOptionLabel={(option) => option.label}
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
                  <TextField
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
                  fullWidth
                  label="Email Address "
                  id="Email Address "
                  {...register("email")}
                />
                <div>
                  <FormControl className="productField">
                    <InputLabel htmlFor="grouped-native-select">
                      Vendor Categories
                    </InputLabel>
                    <Select
                      className="addJobInputField"
                      id="grouped-native-select"
                      label="Car Registration No  "
                      {...register("vendor")}
                    >
                      <MenuItem value="New Parts">New Parts</MenuItem>
                      <MenuItem value="Recondition Parts">
                        Recondition Parts
                      </MenuItem>
                      <MenuItem value="New & Recondition Parts">
                        New & Recondition Parts
                      </MenuItem>
                      <MenuItem value="Body Items">Body Items</MenuItem>
                      <MenuItem value="Engine & Suspension Items">
                        Engine & Suspension Items
                      </MenuItem>
                      <MenuItem value="Electric Items">Electric Items</MenuItem>
                      <MenuItem value="Others">Others</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <TextField
                  className="productField"
                  fullWidth
                  label="Shop Name"
                  id="Password"
                  {...register("shop_name")}
                />
              </div>

              <div>
                <h3 className="text-xl font-bold">Address </h3>

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
                  label="State "
                  {...register("state")}
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
                    {loading ? (
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
            <div className="mt-2 savebtn flex justify-end">
              <button disabled={createLoading || loading}>Add Supplier </button>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-20 overflow-x-auto">
        <div className="md:flex items-center justify-between mb-5">
          <h3 className="mb-3 text-xl md:text-3xl font-bold">
            Suppliers List:
          </h3>
          <div className="flex items-center searcList">
            <button
              onClick={handleAllSuppliers}
              className="bg-[#42A1DA] text-white px-4 py-2 rounded-md mr-1"
            >
              All
            </button>
            <div className="searchGroup">
              <input
                onChange={(e) => setFilterType(e.target.value)}
                autoComplete="off"
                type="text"
                ref={textInputRef}
              />
            </div>
            <button className="SearchBtn ">Search </button>
          </div>
        </div>
        {suppliersLoading ? (
          <div className="flex items-center justify-center text-xl">
            <Loading />
          </div>
        ) : (
          <div>
            {suppliers?.data?.suppliers?.length === 0 ? (
              <div className="flex items-center justify-center h-full text-xl text-center">
                No matching card found.
              </div>
            ) : (
              <section>
                <table className="table">
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
                    {suppliers?.data?.suppliers?.map((card, index) => (
                      <tr key={card._id}>
                        <td>{index + 1}</td>
                        <td>{card?.full_name}</td>
                        <td>{card?.full_Phone_number}</td>
                        <td>{card?.email}</td>

                        <td>
                          <div className="editIconWrap edit">
                            <Link
                              to={`/dashboard/update-Supplier?id=${card._id}`}
                            >
                              <FaEdit className="editIcon" />
                            </Link>
                          </div>
                        </td>
                        <td>
                          <button
                            disabled={supplierLoading}
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
        {suppliers?.data?.suppliers?.length > 0 && (
          <div className="flex justify-center mt-4">
            <Pagination
              count={suppliers?.data?.meta?.totalPages}
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

export default AddSuppliers;
