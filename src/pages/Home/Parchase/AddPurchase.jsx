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

import { countries } from "../../../constant";
import HeaderButton from "../../../components/CommonButton/HeaderButton";
import { FaUserGear } from "react-icons/fa6";
import { NotificationAdd } from "@mui/icons-material";

import { ErrorMessage } from "../../../components/error-message";
import uploadFile from "../../../helper/uploadFile";
import Loading from "../../../components/Loading/Loading";
import { Button } from "react-scroll";
import PurchaseList from "./PurchasList";
import {
  useCreatePurchaseMutation,
  useGetAllPurchasesQuery,
} from "../../../redux/api/purchase";
const AddSuppliers = () => {
  const [grandTotal, setGrandTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [vat, setVAT] = useState(0);
  const [items, setItems] = useState([
    { description: "", quantity: "", rate: "", total: "" },
  ]);

  const [url, setUrl] = useState("");

  const [loading, setLoading] = useState(false);

  const [filterType, setFilterType] = useState("");

  const [countryCode, setCountryCode] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const limit = 10;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [createPurchase, { isLoading: createLoading, error: createError }] =
    useCreatePurchaseMutation();

  const { data: purchases, isLoading: purchasesLoading } =
    useGetAllPurchasesQuery({
      limit,
      page: currentPage,
      searchTerm: filterType,
    });

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
    setItems([
      ...items,
      { description: "", quantity: "", rate: "", total: "" },
    ]);
  };

  useEffect(() => {
    const totalSum = items.reduce((sum, item) => sum + Number(item.total), 0);

    const roundedTotalSum = parseFloat(totalSum).toFixed(2);

    setGrandTotal(Number(roundedTotalSum));
  }, [items]);

  const handleDescriptionChange = (index, value) => {
    const newItems = [...items];
    newItems[index].description = value;
    setItems(newItems);
  };

  const handleQuantityChange = (index, value) => {
    const newItems = [...items];

    // Round the value to the nearest integer
    const roundedValue = Math.round(value);

    newItems[index].quantity = roundedValue;
    newItems[index].total = roundedValue * newItems[index].rate;
    newItems[index].total = parseFloat(newItems[index].total.toFixed(2));

    setItems(newItems);
  };

  const handleRateChange = (index, value) => {
    const newItems = [...items];

    newItems[index].rate = parseFloat(value).toFixed(2);

    // Calculate total with the updated rate
    newItems[index].total = newItems[index].quantity * newItems[index].rate;

    // Round total to two decimal places
    newItems[index].total = parseFloat(newItems[index].total.toFixed(2));

    setItems(newItems);
  };

  const handleDiscountChange = (value) => {
    const parsedValue = value === "" ? 0 : parseFloat(value);

    if (!isNaN(parsedValue)) {
      setDiscount(parsedValue);
    }
  };

  const handleVATChange = (value) => {
    const parsedValue = value === "" ? 0 : parseFloat(value);

    if (!isNaN(parsedValue)) {
      setVAT(parsedValue);
    }
  };

  const calculateFinalTotal = () => {
    const discountAsPercentage = discount;
    const totalAfterDiscount = grandTotal - discountAsPercentage;

    const vatAsPercentage = vat / 100;
    let finalTotal = totalAfterDiscount + totalAfterDiscount * vatAsPercentage;
    finalTotal = parseFloat(finalTotal).toFixed(2);
    return finalTotal;
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
    data.phone_number = phoneNumber;
    data.image = url;
    data.input_data = items;
    data.total_amount = grandTotal;
    data.discount = discount;
    data.vat = vat;
    data.net_total = calculateFinalTotal();

    const response = await createPurchase(data).unwrap();

    if (response.success) {
      toast.success(response.message);
      navigate("/dashboard/purchase-list");
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

  if (purchasesLoading) {
    return <Loading />;
  }

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

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="addProductWrap">
            <div>
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
                        {...register("category")}
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
                        <MenuItem value="Electric Items">
                          Electric Items
                        </MenuItem>
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
                    <TextField
                      fullWidth
                      label="State "
                      {...register("state")}
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
            </div>
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
                        onChange={(e) =>
                          handleDescriptionChange(i, e.target.value)
                        }
                        required
                      />
                    </div>
                    <div>
                      <input
                        className="firstInputField"
                        autoComplete="off"
                        type="number"
                        placeholder="Qty"
                        onChange={(e) =>
                          handleQuantityChange(i, e.target.value)
                        }
                        required
                      />
                    </div>
                    <div>
                      <input
                        className="thirdInputField"
                        autoComplete="off"
                        placeholder="Rate"
                        onChange={(e) => handleRateChange(i, e.target.value)}
                        required
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
                <span>{grandTotal}</span>
              </div>
              <div>
                <b className="mr-2 hideAmountText "> Discount: </b>
                <input
                  className="py-1 text-center"
                  autoComplete="off"
                  type="text"
                  placeholder="Discount"
                  onChange={(e) => handleDiscountChange(e.target.value)}
                />
              </div>
              <div>
                <b className="mr-2 hideAmountText">Vat: </b>
                <input
                  className="text-center"
                  autoComplete="off"
                  type="text"
                  placeholder="Vat"
                  onChange={(e) => handleVATChange(e.target.value)}
                />
              </div>
              <div>
                <div className="flex items-center ml-3 ">
                  <b className="mr-2 ">Final Total: </b>
                  <span>{calculateFinalTotal()}</span>
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
                <button disabled={createLoading} type="submit">
                  Add Purchase{" "}
                </button>
              </div>
            </div>
            <div className="my-2">
              {createError && (
                <ErrorMessage messages={createError?.data?.errorSources} />
              )}
            </div>
          </Box>
        </form>

        <PurchaseList
          purchases={purchases}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </section>
  );
};

export default AddSuppliers;
