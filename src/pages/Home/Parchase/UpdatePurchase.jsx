/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-no-undef */

import TextField from "@mui/material/TextField";
import { FaUsers, FaCloudUploadAlt } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Autocomplete,
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { toast } from "react-toastify";

import { countries } from "../../../constant";
import HeaderButton from "../../../components/CommonButton/HeaderButton";
import { FaUserGear } from "react-icons/fa6";
import { NotificationAdd } from "@mui/icons-material";

import { ErrorMessage } from "../../../components/error-message";
import uploadFile from "../../../helper/uploadFile";

import { Button } from "react-scroll";

import {
  useRemovePurchaseMutation,
  useUpdatePurchaseMutation,
} from "../../../redux/api/purchase";
const AddSuppliers = () => {
  const [grandTotal, setGrandTotal] = useState(0);
  const [discount, setDiscount] = useState("");
  const [vat, setVAT] = useState("");
  const [items, setItems] = useState([
    { description: "", quantity: "", rate: "", total: "" },
  ]);

  const [url, setUrl] = useState("");

  const [loading, setLoading] = useState(false);

  const [reload, setReload] = useState("");
  const [addButton, setAddButton] = useState(false);

  const partsDiscountRef = useRef(null);
  const netTotalAmountRef = useRef(null);

  const [countryCode, setCountryCode] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState("");

  const [specificPurchase, setSpecificPurchase] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [updatePurchase, { isLoading: updateLoading, error: updateError }] =
    useUpdatePurchaseMutation();
  const [removePurchase, { isLoading: removeLoading }] =
    useRemovePurchaseMutation();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/v1/purchases/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSpecificPurchase(data.data);
      });
  }, [id, reload]);

  useEffect(() => {
    if (specificPurchase) {
      reset({
        full_name: specificPurchase?.full_name || "",
        country_code: specificPurchase?.country_code || "",
        phone_number: specificPurchase?.phone_number || "",

        email: specificPurchase?.email || "",
        category: specificPurchase?.category || "",
        shop_name: specificPurchase?.shop_name || "",
        country: specificPurchase?.country || "",
        city: specificPurchase?.city || "",
        state: specificPurchase?.state || "",
      });
    }
  }, [specificPurchase, reset]);

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

  useEffect(() => {
    const totalSum = specificPurchase?.input_data?.reduce(
      (sum, item) => sum + Number(item.total),
      0
    );

    const totalSum2 = items.reduce((sum, item) => sum + Number(item.total), 0);

    const newTotalSum = isNaN(totalSum) ? 0 : totalSum;
    const newTotalSum2 = isNaN(totalSum2) ? 0 : totalSum2;

    const newGrandTotal = newTotalSum + newTotalSum2;

    const totalGrand = parseFloat(newGrandTotal).toFixed(2);

    setGrandTotal(totalGrand);
  }, [items, specificPurchase?.input_data]);

  const handleDescriptionChange = (index, value) => {
    const newItems = [...specificPurchase.input_data];
    newItems[index] = {
      ...newItems[index],
      description: value,
    };
    setSpecificPurchase((prevState) => ({
      ...prevState,
      input_data: newItems,
    }));
  };

  const handleDescriptionChange2 = (index, value) => {
    const newItems = [...items];

    newItems[index].description = value;

    setItems(newItems);
  };

  const handleQuantityChange = (index, value) => {
    if (!isNaN(value)) {
      // Create a deep copy of the specificPurchase object
      const newItems = [...specificPurchase.input_data];

      const roundedValue = Math.round(value);

      newItems[index].quantity = Number(roundedValue);
      newItems[index].total = Number(roundedValue) * newItems[index].rate;
      newItems[index].total = Number(newItems[index].total.toFixed(2));

      setSpecificPurchase((prevState) => ({
        ...prevState,
        input_data: newItems,
      }));
    }
  };

  const handleQuantityChange2 = (index, value) => {
    const newItems = [...items];
    const roundedValue = Math.round(value);
    newItems[index].quantity = Number(roundedValue);

    newItems[index].total = Number(roundedValue) * newItems[index].rate;
    newItems[index].total = Number(newItems[index].total.toFixed(2));
    setItems(newItems);
  };

  const handleRateChange = (index, value) => {
    const newItems = [...specificPurchase.input_data];
    newItems[index].rate = Number(value).toFixed(2);
    newItems[index].total = Number(
      newItems[index].quantity * newItems[index].rate
    );
    newItems[index].total = Number(newItems[index].total.toFixed(2));
    setSpecificPurchase((prevState) => ({
      ...prevState,
      input_data: newItems,
    }));
  };

  const handleRateChange2 = (index, value) => {
    const newItems = [...items];
    newItems[index].rate = Number(value).toFixed(2);
    newItems[index].total = Number(
      newItems[index].quantity * newItems[index].rate
    );
    newItems[index].total = Number(newItems[index].total.toFixed(2));
    setItems(newItems);
  };

  const handleDiscountChange = (value) => {
    const parsedValue = Number(value);

    if (!isNaN(parsedValue)) {
      setDiscount(parsedValue);
    }
  };

  const handleVATChange = (value) => {
    const parsedValue = Number(value);

    if (!isNaN(parsedValue)) {
      setVAT(parsedValue);
    }
  };

  const calculateFinalTotal = () => {
    let finalTotal;
    let differenceExistAndNewGrandTotal;
    let vatAsPercentage;
    let discountAsPercentage;

    let totalAfterDiscount;

    if (grandTotal > specificPurchase.total_amount) {
      differenceExistAndNewGrandTotal =
        grandTotal - specificPurchase.total_amount;
    } else if (grandTotal < specificPurchase.total_amount) {
      differenceExistAndNewGrandTotal =
        grandTotal - specificPurchase.total_amount;
    } else {
      differenceExistAndNewGrandTotal = 0;
    }

    if (discount > 0) {
      discountAsPercentage = discount;
    }
    if (discount === 0) {
      discountAsPercentage = 0;
    }
    if (discount === "") {
      discountAsPercentage = specificPurchase.discount;
    }

    const differenceWithoutDiscount =
      specificPurchase.total_amount + differenceExistAndNewGrandTotal;

    if (discountAsPercentage === 0) {
      totalAfterDiscount = differenceWithoutDiscount;
    } else if (discountAsPercentage === "") {
      totalAfterDiscount =
        differenceWithoutDiscount - specificPurchase.discount;
    } else {
      totalAfterDiscount = differenceWithoutDiscount - discountAsPercentage;
    }

    if (vat === 0) {
      vatAsPercentage = 0;
    }
    if (vat > 0) {
      vatAsPercentage = vat;
    }

    if (vat === "") {
      vatAsPercentage = specificPurchase.vat;
    }

    const totalAfterTax =
      totalAfterDiscount + totalAfterDiscount * (vatAsPercentage / 100);

    finalTotal = parseFloat(totalAfterTax).toFixed(2);

    return finalTotal;
  };

  const handleAddButton = () => {
    setAddButton(!addButton);
    if (partsDiscountRef.current) {
      partsDiscountRef.current.value = discount
        ? discount
        : specificPurchase?.discount;
      netTotalAmountRef.current.innerText = calculateFinalTotal();
    }
  };

  const handleAddClick = () => {
    setItems([
      ...items,
      { description: "", quantity: "", rate: "", total: "" },
    ]);
    if (partsDiscountRef.current) {
      partsDiscountRef.current.value = discount
        ? discount
        : specificPurchase?.discount;
      netTotalAmountRef.current.innerText = calculateFinalTotal();
    }
  };

  const handleRemoveButton = async (i) => {
    const values = {
      id: id,
      data: { index: i },
    };

    const res = await removePurchase(values).unwrap();
    if (res.success) {
      setReload(!reload);
      toast.success(res.message);
    }
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

  const inputData = [
    ...(specificPurchase?.input_data || []),
    ...items
      .filter((item) => item.total !== undefined && item.total !== "")
      .map((item) => ({
        description: item.description,
        quantity: item.quantity,
        rate: item.rate,
        total: item.total,
      })),
  ];

  const onSubmit = async (data) => {
    data.country_code = countryCode.code;
    data.phone_number = phoneNumber;
    data.image = url;
    data.input_data = inputData;
    data.total_amount = grandTotal || specificPurchase?.total_amount;
    data.discount =
      discount === 0 || discount > 0 ? discount : specificPurchase?.discount;
    data.vat = vat === 0 || vat > 0 ? vat : specificPurchase?.vat;
    data.net_total = calculateFinalTotal() || specificPurchase.net_total;

    const values = {
      id,
      data,
    };

    const response = await updatePurchase(values).unwrap();

    if (response.success) {
      toast.success(response.message);
      setReload(!reload);
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

  const handleOnSubmit = () => {
    handleSubmit(onSubmit)();
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

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="addProductWrap">
            <h3 className="text-xl font-bold mb-3">Seller Info </h3>
            <Box>
              <Grid container spacing={2}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Full Name "
                    id="Full Name "
                    {...register("full_name")}
                    focused={specificPurchase?.full_name || ""}
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
                    value={
                      phoneNumber ? phoneNumber : specificPurchase?.phone_number
                    }
                    onChange={handlePhoneNumberChange}
                    {...register("phone_number")}
                    focused={specificPurchase?.phone_number || ""}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Email Address "
                    id="Email Address "
                    {...register("email")}
                    focused={specificPurchase?.email || ""}
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
                      focused={specificPurchase?.category || ""}
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
                    focused={specificPurchase?.shop_name || ""}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Country "
                    {...register("country")}
                    focused={specificPurchase?.country || ""}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Town/City "
                    {...register("city")}
                    focused={specificPurchase?.city || ""}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    fullWidth
                    label="State "
                    {...register("state")}
                    focused={specificPurchase?.state || ""}
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
                            <span>
                              {specificPurchase?.image
                                ? specificPurchase.image.slice(0, 20)
                                : "Upload Image"}
                            </span>
                          )}
                        </>
                      )}
                    </label>
                  </div>
                </Grid>
              </Grid>
            </Box>
          </div>
        </form>
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
          <div>
            {specificPurchase?.input_data?.length > 0 && (
              <>
                {specificPurchase?.input_data?.map((item, i) => {
                  return (
                    <div key={i}>
                      <div className="qutationForm">
                        <div>
                          {items.length !== 0 && (
                            <button
                              disabled={removeLoading}
                              onClick={() => handleRemoveButton(i)}
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
                            placeholder="Description"
                            onChange={(e) =>
                              handleDescriptionChange(i, e.target.value)
                            }
                            defaultValue={item.description}
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
                            defaultValue={item.quantity}
                          />
                        </div>
                        <div>
                          <input
                            className="thirdInputField"
                            autoComplete="off"
                            type="number"
                            placeholder="Rate"
                            onChange={(e) =>
                              handleRateChange(i, e.target.value)
                            }
                            required
                            defaultValue={item.rate}
                          />
                        </div>
                        <div>
                          <input
                            className="thirdInputField"
                            autoComplete="off"
                            type="text"
                            placeholder="Amount"
                            value={item.total}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
          <div>
            {!addButton && (
              <button
                onClick={handleAddButton}
                className="bg-[#42A1DA] hover:bg-[#42A1DA] text-white rounded-md px-2 py-2 mb-2"
              >
                Add new
              </button>
            )}
            {addButton && (
              <button
                onClick={handleAddButton}
                className="border border-[#42A1DA] hover:border-[#42A1DA] text-black rounded-md px-2 py-2 mb-2"
              >
                Cancel
              </button>
            )}
            {addButton && (
              <>
                {items.map((item, i) => {
                  return (
                    <div key={i}>
                      <div className="qutationForm">
                        <div>
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
                            placeholder="Description"
                            onChange={(e) =>
                              handleDescriptionChange2(i, e.target.value)
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
                              handleQuantityChange2(i, e.target.value)
                            }
                            required
                          />
                        </div>
                        <div>
                          <input
                            className="thirdInputField"
                            autoComplete="off"
                            type="number"
                            placeholder="Rate"
                            onChange={(e) =>
                              handleRateChange2(i, e.target.value)
                            }
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
                            className="flex justify-end mt-2"
                          >
                            <button className="bg-[#42A1DA] hover:bg-[#42A1DA] text-white rounded-md px-2 py-2">
                              Add
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>

          <div className="discountFieldWrap">
            <div className="flex items-center ">
              <b className="mr-2 hideAmountText"> Total Amount: </b>
              <span>
                {grandTotal ? grandTotal : specificPurchase.total_amount}
              </span>
            </div>
            <div>
              <b className="mr-2 hideAmountText "> Discount: </b>
              <input
                className="py-1 text-center"
                onChange={(e) => handleDiscountChange(e.target.value)}
                autoComplete="off"
                type="text"
                placeholder="Discount"
                defaultValue={specificPurchase.discount}
                ref={partsDiscountRef}
              />
            </div>
            <div>
              <b className="mr-2 hideAmountText">Vat: </b>
              <input
                className="text-center"
                onChange={(e) => handleVATChange(e.target.value)}
                autoComplete="off"
                type="text"
                placeholder="Vat"
                defaultValue={specificPurchase?.vat}
              />
            </div>
            <div>
              <div className="flex items-center ml-3 ">
                <b className="mr-2 ">Final Total: </b>
                <span ref={netTotalAmountRef}>{calculateFinalTotal()}</span>
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
              <button
                onClick={handleOnSubmit}
                type="submit"
                disabled={updateLoading}
              >
                Add Purchase{" "}
              </button>
            </div>
          </div>
          <div className="my-2">
            {updateError && (
              <ErrorMessage messages={updateError?.data?.errorSources} />
            )}
          </div>
        </Box>
      </div>
    </section>
  );
};

export default AddSuppliers;
