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
  FormControl,
  Grid,
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
import PurchaseList from "./PurchasList";
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
      // setValue(name, file);

      const uploadPhoto = await uploadFile(file);
      console.log(uploadPhoto);
      setUrl(uploadPhoto?.secure_url);
      setLoading(false);
    }
  };

  // const handleImageUpload = async (e) => {
  //   try {
  //     const file = e.target.files[0]; // Get the selected file
  //     const formData = new FormData();
  //     formData.append("image", file); // Use "image" as the key for single image upload
  //     setImageLoading(true);
  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_URL}/api/v1/uploads`,
  //       {
  //         method: "POST",
  //         body: formData,
  //       }
  //     );

  //     const data = await response.json();
  //     if (data.message === "Image uploaded successful") {
  //       setUrl(data.image_url);
  //       setImageLoading(false);
  //     }
  //   } catch (error) {
  //     setImageLoading(false);
  //   }
  // };

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

  const [items, setItems] = useState([
    { description: "", quantity: "", rate: "", total: "" },
  ]);
  const [serviceItems, setServiceItems] = useState([
    {
      description: "",
      quantity: "",
      rate: "",
      total: "",
    },
  ]);

  const handleRemove = (index) => {
    if (!index) {
      const list = [...items];

      setItems(list);
    } else {
      const list = [...items];
      list.splice(index, 1);
      setItems(list);
    }
  };

  const handleAddClick = () => {
    setItems([...items, { flyingFrom: "", flyingTo: "", date: "" }]);
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
              <h3 className="text-2xl font-bold">Add Purchase </h3>
              <span>Add Add Purchase </span>
            </div>
          </div>
          <div className="productHome">
            <span>Home / </span>
            <span>Dashboard / </span>
            <span>New Purchase </span>
          </div>
        </div>

        <div className="addProductWrap">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="text-xl font-bold mb-3">Saller Info </h3>
            <Box>
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
                  <Autocomplete
                    fullWidth
                    sx={{ marginRight: "2px", marginLeft: "5px" }}
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
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    label="Phone No"
                    variant="outlined"
                    fullWidth
                    type="tel"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                  />
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
                      Vendor Categories
                    </InputLabel>
                    <Select
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
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Shop Name"
                    id="Password"
                    {...register("shop_name")}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Country "
                    {...register("country")}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Town/City "
                    {...register("city")}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField fullWidth label="State " {...register("state")} />
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
                </Grid>
              </Grid>
            </Box>
          </form>
        </div>

        <Box
          marginTop="30px"
          marginBottom="50px"
          padding={4}
          sx={{ background: "white" }}
        >
          <div className="flex items-center justify-around labelWrap">
            <label>SL No </label>
            <label>Purchase description </label>
            <label>Qty </label>
            <label>Rate</label>
            <label>Amount </label>
          </div>
          {items.map((item, i) => {
            return (
              <div key={i}>
                <div className="qutationForm">
                  <div className="removeBtn">
                    {items.length !== 0 && (
                      <button
                        onClick={() => handleRemove(i)}
                        className="  bg-[#42A1DA] hover:bg-[#42A1DA] text-white rounded-md px-2 py-2"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div>
                    <input
                      className="firstInputField"
                      autoComplete="off"
                      type="text"
                      placeholder="SL No "
                      defaultValue={`${i + 1 < 10 ? `0${i + 1}` : i + 1}`}
                      required
                    />
                  </div>
                  <div>
                    <input
                      className="secondInputField"
                      autoComplete="off"
                      type="text"
                      placeholder="Purchase Description"
                    />
                  </div>
                  <div>
                    <input
                      className="firstInputField"
                      autoComplete="off"
                      type="number"
                      placeholder="Qty"
                    />
                  </div>
                  <div>
                    <input
                      className="thirdInputField"
                      autoComplete="off"
                      placeholder="Rate"
                    />
                  </div>
                  <div>
                    <input
                      className="thirdInputField"
                      autoComplete="off"
                      type="text"
                      placeholder="Amount"
                      value={item.total}
                      readOnly
                    />
                  </div>
                </div>

                <div className="addInvoiceItem">
                  {items.length - 1 === i && (
                    <div
                      onClick={handleAddClick}
                      className="flex justify-end mt-2 addQuotationBtns "
                    >
                      <button className="btn bg-[#42A1DA] hover:bg-[#42A1DA] text-white p-2 rounded-md">
                        Add
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          <div className="discountFieldWrap">
            <div className="flex items-center ">
              <b className="mr-2 hideAmountText"> Total Amount: </b>
              <span>45678</span>
            </div>
            <div>
              <b className="mr-2 hideAmountText "> Discount: </b>
              <input
                className="py-1 text-center"
                autoComplete="off"
                type="text"
                placeholder="Discount"
              />
            </div>
            <div>
              <b className="mr-2 hideAmountText">Vat: </b>
              <input
                className="text-center"
                autoComplete="off"
                type="text"
                placeholder="Vat"
              />
            </div>
            <div>
              <div className="flex items-center ml-3 ">
                <b className="mr-2 ">Final Total: </b>
                <span>45678</span>
              </div>
            </div>
          </div>

          <div className="mt-8 buttonGroup buttonMargin">
            <div className="flex md:flex-row flex-col justify-end">
              <Button>Preview</Button>

              <Button>Download </Button>
              <Button>Print </Button>
            </div>
            <div className="submitQutationBtn">
              <Button type="submit">Add Purchase </Button>
            </div>
          </div>
        </Box>
      </div>
    </section>
  );
};

export default AddSuppliers;
