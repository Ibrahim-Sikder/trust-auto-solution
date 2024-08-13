/* eslint-disable no-unused-vars */
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../../public/assets/logo.png";
import { useEffect, useRef, useState } from "react";
import swal from "sweetalert";
import { toast } from "react-toastify";
import InputMask from "react-input-mask";
import Loading from "../../../components/Loading/Loading";
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
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import TrustAutoAddress from "../../../components/TrustAutoAddress/TrustAutoAddress";
import { useGetSingleJobCardWithJobNoQuery } from "../../../redux/api/jobCard";
import { cmDmOptions, countries } from "../../../constant";
import TADatePickers from "../../../components/form/TADatePickers";
import { formatDate } from "../../../utils/formateDate";
import {
  useCreateQuotationMutation,
  useDeleteQuotationMutation,
  useGetAllQuotationsQuery,
} from "../../../redux/api/quotation";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { ErrorMessage } from "../../../components/error-message";

const AddQuotation = () => {
  const parsedDate = new Date();
  const day = parsedDate.getDate().toString().padStart(2, "0");
  const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0");
  const year = parsedDate.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;

  const location = useLocation();
  const job_no = new URLSearchParams(location.search).get("order_no");

  const [orderNumber, setOrderNumber] = useState(job_no);

  const navigate = useNavigate();
  const textInputRef = useRef(null);

  const [filterType, setFilterType] = useState("");

  const [preview, setPreview] = useState("");

  const [selectedDate, setSelectedDate] = useState(formattedDate);
  const [countryCode, setCountryCode] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [grandTotal, setGrandTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [vat, setVAT] = useState(0);
  const [partsTotal, setPartsTotal] = useState(0);
  const [serviceTotal, setServiceTotal] = useState(0);

  const [getDataWithChassisNo, setGetDataWithChassisNo] = useState({});

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

  const limit = 10;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [
    createQuotation,
    { error: createQuotationError, isLoading: createLoading },
  ] = useCreateQuotationMutation();

  const [deleteQuotation, { isLoading: deleteLoading, error: deleteError }] =
    useDeleteQuotationMutation();

  const { data: jobCardData, refetch } =
    useGetSingleJobCardWithJobNoQuery(orderNumber);

  const {
    data: allQuotations,
    isLoading: quotationLoading,
    refetch: allQuotationRefetch,
  } = useGetAllQuotationsQuery({
    limit,
    page: currentPage,
    searchTerm: filterType,
  });

  useEffect(() => {
    if (jobCardData?.data?.user_type === "customer") {
      reset({
        Id: jobCardData?.data?.Id,
        company_name: jobCardData?.data?.customer?.company_name,

        customer_name: jobCardData?.data?.customer?.customer_name,
        customer_country_code:
          jobCardData?.data?.customer?.customer_country_code,
        customer_contact: jobCardData?.data?.customer?.customer_contact,

        customer_address: jobCardData?.data?.customer?.customer_address,

        carReg_no: getDataWithChassisNo?.carReg_no,
        car_registration_no: getDataWithChassisNo?.car_registration_no,
        engine_no: getDataWithChassisNo?.engine_no,
        vehicle_brand: getDataWithChassisNo?.vehicle_brand,
        vehicle_name: getDataWithChassisNo?.vehicle_name,

        mileage: getDataWithChassisNo?.mileage,
      });
    }
    if (jobCardData?.data?.user_type === "company") {
      reset({
        Id: jobCardData?.data?.Id,
        company_name: jobCardData?.data?.company?.company_name,
        vehicle_username: jobCardData?.data?.company?.vehicle_username,
        company_address: jobCardData?.data?.company?.company_address,
        company_contact: jobCardData?.data?.company?.company_contact,
        company_country_code: jobCardData?.data?.company?.company_country_code,
        company_email: jobCardData?.data?.company?.company_email,
        customer_address: jobCardData?.data?.company?.customer_address,

        carReg_no: getDataWithChassisNo?.carReg_no,
        car_registration_no: getDataWithChassisNo?.car_registration_no,
        engine_no: getDataWithChassisNo?.engine_no,
        vehicle_brand: getDataWithChassisNo?.vehicle_brand,
        vehicle_name: getDataWithChassisNo?.vehicle_name,

        mileage: getDataWithChassisNo?.mileage,
      });
    }
    if (jobCardData?.data?.user_type === "showRoom") {
      reset({
        Id: jobCardData?.data?.Id,
        showRoom_name: jobCardData?.data?.showRoom_name,
        vehicle_username: jobCardData?.data?.vehicle_username,
        showRoom_address: jobCardData?.data?.showRoom_address,
        company_name: jobCardData?.data?.company_name,
        company_contact: phoneNumber || jobCardData?.data?.company_contact,
        company_country_code: jobCardData?.data?.company_country_code,

        carReg_no: getDataWithChassisNo?.carReg_no,
        car_registration_no: getDataWithChassisNo?.car_registration_no,
        engine_no: getDataWithChassisNo?.engine_no,
        vehicle_brand: getDataWithChassisNo?.vehicle_brand,
        vehicle_name: getDataWithChassisNo?.vehicle_name,

        mileage: getDataWithChassisNo?.mileage,
      });
    }
  }, [
    getDataWithChassisNo?.carReg_no,
    getDataWithChassisNo?.car_registration_no,
    getDataWithChassisNo?.engine_no,
    getDataWithChassisNo?.mileage,
    getDataWithChassisNo?.vehicle_brand,
    getDataWithChassisNo?.vehicle_name,
    jobCardData?.data?.Id,
    jobCardData?.data?.company?.company_address,
    jobCardData?.data?.company?.company_contact,
    jobCardData?.data?.company?.company_country_code,
    jobCardData?.data?.company?.company_email,
    jobCardData?.data?.company?.company_name,
    jobCardData?.data?.company?.customer_address,
    jobCardData?.data?.company?.vehicle_username,
    jobCardData?.data?.company_address,
    jobCardData?.data?.company_contact,
    jobCardData?.data?.company_country_code,
    jobCardData?.data?.company_email,
    jobCardData?.data?.company_name,
    jobCardData?.data?.customer?.company_name,
    jobCardData?.data?.customer?.customer_address,
    jobCardData?.data?.customer?.customer_contact,
    jobCardData?.data?.customer?.customer_country_code,
    jobCardData?.data?.customer?.customer_name,
    jobCardData?.data?.showRoom_address,
    jobCardData?.data?.showRoom_name,
    jobCardData?.data?.user_type,
    jobCardData?.data?.vehicle_username,
    phoneNumber,
    reset,
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
    setItems([
      ...items,
      { description: "", quantity: "", rate: "", total: "" },
    ]);
  };

  const handleServiceAdd = () => {
    setServiceItems([
      ...serviceItems,
      { description: "", quantity: "", rate: "", total: "" },
    ]);
  };

  const handleServiceDescriptionRemove = (index) => {
    if (!index) {
      const list = [...serviceItems];

      setServiceItems(list);
    } else {
      const list = [...serviceItems];
      list.splice(index, 1);
      setServiceItems(list);
    }
  };

  useEffect(() => {
    const totalSum = items.reduce((sum, item) => sum + Number(item.total), 0);
    const serviceTotalSum = serviceItems.reduce(
      (sum, item) => sum + Number(item.total),
      0
    );

    const roundedTotalSum = parseFloat(totalSum + serviceTotalSum).toFixed(2);
    setPartsTotal(Number(totalSum));
    setServiceTotal(Number(serviceTotalSum));
    setGrandTotal(Number(roundedTotalSum));
  }, [items, serviceItems]);

  const handleDescriptionChange = (index, value) => {
    const newItems = [...items];
    newItems[index].description = value;
    setItems(newItems);
  };
  const handleServiceDescriptionChange = (index, value) => {
    const newItems = [...serviceItems];
    newItems[index].description = value;
    setServiceItems(newItems);
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

  const handleServiceQuantityChange = (index, value) => {
    const newItems = [...serviceItems];
    const roundedValue = Math.round(value);

    newItems[index].quantity = roundedValue;

    newItems[index].total = roundedValue * newItems[index].rate;

    newItems[index].total = parseFloat(newItems[index].total.toFixed(2));

    setServiceItems(newItems);
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
  const handleServiceRateChange = (index, value) => {
    const newItems = [...serviceItems];

    newItems[index].rate = parseFloat(value).toFixed(2);

    // Calculate total with the updated rate
    newItems[index].total = newItems[index].quantity * newItems[index].rate;

    // Round total to two decimal places
    newItems[index].total = parseFloat(newItems[index].total.toFixed(2));

    setServiceItems(newItems);
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

  const handleDateChange = (newDate) => {
    setSelectedDate(formatDate(newDate));
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

  const handleIconPreview = async (e) => {
    navigate(`/dashboard/quotation-view?id=${e}`);
  };

  const onSubmit = async (data) => {
    const customer = {
      company_name: data.company_name,

      customer_name: data.customer_name,
      customer_contact: data.customer_contact,
      customer_country_code: data.company_country_code,

      customer_address: data.customer_address,
    };

    const company = {
      company_name: data.company_name,
      vehicle_username: data.vehicle_username,
      company_address: data.company_address,
      company_contact: data.company_contact,
      company_country_code: data.company_country_code,
    };

    const showRoom = {
      showRoom_name: data.showRoom_name,
      vehicle_username: data.vehicle_username,

      company_name: data.company_name,
      company_contact: data.company_contact,
      company_country_code: data.company_country_code,

      company_address: data.company_address,
    };

    data.mileage = Number(data.mileage);

    const vehicle = {
      carReg_no: data.carReg_no,
      car_registration_no: data.car_registration_no,
      chassis_no: data.chassis_no,
      engine_no: data.engine_no,
      vehicle_brand: data.vehicle_brand,
      vehicle_name: data.vehicle_name,
      mileage: data.mileage,
    };

    const quotation = {
      user_type: jobCardData?.data?.user_type,
      Id: jobCardData?.data?.Id,
      job_no: orderNumber,
      date: selectedDate,
      parts_total: partsTotal,
      service_total: serviceTotal,
      total_amount: grandTotal,
      discount: discount,
      vat: vat,
      net_total: calculateFinalTotal(),
      input_data: items,
      service_input_data: serviceItems,
    };

    const values = {
      customer,
      company,
      showRoom,
      vehicle,
      quotation,
    };

    const res = await createQuotation(values).unwrap();

    if (res.success) {
      toast.success(res.message);
      navigate("/dashboard/quotaiton-list");
      refetch();
      allQuotationRefetch();
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
        await deleteQuotation(id).unwrap();

        swal("Deleted!", "Card delete successful.", "success");
      } catch (error) {
        swal("Error", "An error occurred while deleting the card.", "error");
      }
    }
  };

  const handleChassisChange = (_, newValue) => {
    const filtered = jobCardData?.data?.vehicle?.find(
      (vehicle) => vehicle.chassis_no === newValue
    );
    setGetDataWithChassisNo(filtered);
  };

  const handleAllQuotation = () => {
    setFilterType("");
    if (textInputRef.current) {
      textInputRef.current.value = "";
    }
  };

  if (quotationLoading) {
    return <Loading />;
  }
  if (deleteError) {
    toast.error(deleteError?.message);
  }

  return (
    <div className="px-5 py-10">
      <div className=" mb-5 pb-5 mx-auto text-center border-b-2 border-[#42A1DA]">
        <div className=" addJobCardHeads">
          <img src={logo} alt="logo" className=" addJobLogoImg" />
          <div>
            <h2 className=" trustAutoTitle trustAutoTitleQutation">
              Trust Auto Solution{" "}
            </h2>
            <span className="text-[12px] lg:text-xl mt-5 block">
              Office: Ka-93/4/C, Kuril Bishawroad, Dhaka-1229
            </span>
          </div>
          <TrustAutoAddress />
        </div>
      </div>
      <div className="mt-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex md:flex-row flex-col justify-between items-center">
            <div className="hidden"></div>
            <div className="vehicleCard">Create Quotation </div>

            <div>
              <TADatePickers
                handleDateChange={handleDateChange}
                selectedDate={selectedDate}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 my-10">
            <Box>
              <h3 className="text-xl lg:text-3xl font-bold mb-5">Customer Info</h3>
              <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Job Card No"
                    onChange={(e) => setOrderNumber(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Customer Id"
                    {...register("Id")}
                    focused={jobCardData?.data?.Id}
                    required
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Company"
                    focused={
                      jobCardData?.data?.customer?.company_name ||
                      jobCardData?.data?.company?.company_name ||
                      jobCardData?.data?.showRoom?.company_name
                    }
                    {...register("company_name")}
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  {!jobCardData?.data && (
                    <TextField
                      fullWidth
                      label="Customer"
                      focused={jobCardData?.data?.customer?.customer_name}
                      {...register("customer_name")}
                    />
                  )}
                  {jobCardData?.data?.user_type === "customer" && (
                    <TextField
                      fullWidth
                      label="Customer"
                      focused={jobCardData?.data?.customer?.customer_name}
                      {...register("customer_name")}
                    />
                  )}
                  {(jobCardData?.data?.user_type === "company" ||
                    jobCardData?.data?.user_type === "showRoom") && (
                    <TextField
                      fullWidth
                      label="Customer"
                      focused={
                        jobCardData?.data?.company?.vehicle_username ||
                        jobCardData?.data?.showRoom?.vehicle_username
                      }
                      {...register("vehicle_username")}
                    />
                  )}
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Grid container spacing={1}>
                    <Grid item lg={3} md={4} sm={12} xs={12}>
                      <Autocomplete
                        fullWidth
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
                            {...register("customer_country_code")}
                            label="Select Country Code"
                            variant="outlined"
                            focused={
                              jobCardData?.data?.customer?.customer_country_code
                            }
                          />
                        )}
                      />
                    </Grid>
                    <Grid item lg={9} md={8} sm={12} xs={12}>
                      {!jobCardData?.data && (
                        <TextField
                          {...register("customer_contact")}
                          variant="outlined"
                          fullWidth
                          type="tel"
                          value={
                            phoneNumber
                              ? phoneNumber
                              : jobCardData?.data?.customer?.customer_contact
                          }
                          onChange={handlePhoneNumberChange}
                          placeholder="Customer Contact No (N)"
                        />
                      )}
                      {jobCardData?.data?.user_type === "customer" && (
                        <TextField
                          {...register("customer_contact")}
                          variant="outlined"
                          fullWidth
                          type="tel"
                          value={
                            phoneNumber
                              ? phoneNumber
                              : jobCardData?.data?.customer?.customer_contact
                          }
                          onChange={handlePhoneNumberChange}
                          placeholder="Customer Contact No (N)"
                          focused={
                            jobCardData?.data?.customer?.customer_contact || ""
                          }
                        />
                      )}
                      {(jobCardData?.data?.user_type === "company" ||
                        jobCardData?.data?.user_type === "showRoom") && (
                        <TextField
                          {...register("company_contact")}
                          variant="outlined"
                          fullWidth
                          type="tel"
                          value={
                            phoneNumber
                              ? phoneNumber
                              : jobCardData?.data?.customer?.customer_contact
                          }
                          onChange={handlePhoneNumberChange}
                          placeholder="Company Contact No (N)"
                          focused={
                            jobCardData?.data?.company?.company_contact ||
                            jobCardData?.data?.showRoom?.company_contact
                          }
                        />
                      )}
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12}>
                  {!jobCardData?.data && (
                    <TextField
                      fullWidth
                      label="Address"
                      {...register("customer_address")}
                    />
                  )}
                  {jobCardData?.data?.user_type === "customer" && (
                    <TextField
                      fullWidth
                      label="Address"
                      {...register("customer_address")}
                      focused={jobCardData?.data?.customer?.customer_address}
                    />
                  )}
                  {jobCardData?.data?.user_type === "company" && (
                    <TextField
                      fullWidth
                      label="Address"
                      {...register("company_address")}
                      focused={
                        jobCardData?.data?.company?.company_address || ""
                      }
                    />
                  )}
                  {jobCardData?.data?.user_type === "showRoom" && (
                    <TextField
                      fullWidth
                      label="Address"
                      {...register("showRoom_address")}
                      focused={
                        jobCardData?.data?.showRoom?.showRoom_address || ""
                      }
                    />
                  )}
                </Grid>
              </Grid>
            </Box>

            <Box>
              <h3 className="text-xl lg:text-3xl font-bold mb-5 ">Vehicle Info</h3>
              <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Autocomplete
                    disabled={
                      jobCardData?.data?.vehicle?.length === 0 ||
                      !jobCardData?.data?.vehicle
                    }
                    disableClearable
                    freeSolo
                    fullWidth
                    onChange={handleChassisChange}
                    options={jobCardData?.data?.vehicle?.map(
                      (option) => option.chassis_no
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        label="Chassis No"
                        {...register("chassis_no")}
                        inputProps={{
                          ...params.inputProps,
                          maxLength:
                            jobCardData?.data?.chassis_no?.length || 30,
                        }}
                        required
                      />
                    )}
                  />
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Grid container spacing={1}>
                    <Grid item lg={3} md={4} sm={12} xs={12}>
                      <Autocomplete
                        sx={{ marginRight: "5px" }}
                        freeSolo
                        fullWidth
                        id="free-solo-demo"
                        options={cmDmOptions.map((option) => option.label)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Vehicle Reg No"
                            {...register("carReg_no")}
                            focused={getDataWithChassisNo?.carReg_no || ""}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item lg={9} md={8} sm={12} xs={12}>
                      <InputMask
                        mask="99-9999"
                        maskChar={null}
                        {...register("car_registration_no")}
                      >
                        {(inputProps) => (
                          <TextField
                            fullWidth
                            {...inputProps}
                            {...register("car_registration_no")}
                            label="Car R (N)"
                            focused={getDataWithChassisNo?.carReg_no || ""}
                          />
                        )}
                      </InputMask>
                    </Grid>
                  </Grid>
                </Grid>

              
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Engine & CC"
                    {...register("engine_no")}
                    focused={getDataWithChassisNo?.engine_no || ""}
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Vehicle Name"
                    {...register("vehicle_name")}
                    focused={getDataWithChassisNo?.vehicle_name || ""}
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Mileage"
                    {...register("mileage")}
                    focused={getDataWithChassisNo?.mileage || ""}
                  />
                </Grid>
              </Grid>
            </Box>
          </div>

          <div className="flex items-center justify-around labelWrap">
            <label>SL No </label>
            <label>Parts description </label>
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
                      placeholder="Description"
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
                      onChange={(e) => handleQuantityChange(i, e.target.value)}
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
          <Box sx={{ marginTop: "50px" }}>
            <div className="flex items-center justify-around labelWrap">
              <label>SL No </label>
              <label>Service description </label>
              <label>Qty </label>
              <label>Rate</label>
              <label>Amount </label>
            </div>
            {serviceItems.map((item, i) => {
              return (
                <div key={i}>
                  <div className="qutationForm">
                    <div className="removeBtn">
                      {serviceItems.length !== 0 && (
                        <button
                          onClick={() => handleServiceDescriptionRemove(i)}
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
                          handleServiceDescriptionChange(i, e.target.value)
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
                          handleServiceQuantityChange(i, e.target.value)
                        }
                        required
                      />
                    </div>
                    <div>
                      <input
                        className="thirdInputField"
                        autoComplete="off"
                        placeholder="Rate"
                        onChange={(e) =>
                          handleServiceRateChange(i, e.target.value)
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
                    {serviceItems.length - 1 === i && (
                      <div
                        onClick={handleServiceAdd}
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
          </Box>

          <div className="discountFieldWrap">
            <div className="flex items-center ">
              <b className="mr-2 hideAmountText"> Total Amount: </b>
              <span>{grandTotal}</span>
            </div>
            <div>
              <b className="mr-2 hideAmountText "> Discount: </b>
              <input
                className="py-1 text-center"
                onChange={(e) => handleDiscountChange(e.target.value)}
                autoComplete="off"
                type="text"
                placeholder="Discount"
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
              <Button onClick={() => setPreview("preview")}>Preview</Button>

              <Button>Download </Button>
              <Button>Print </Button>
              <Button>Invoice </Button>
            </div>
            <div className="submitQutationBtn">
              <button type="submit" disabled={createLoading}>
                Add Quotation{" "}
              </button>
            </div>
          </div>
        </form>
        <div className="my-2">
          {createQuotationError && (
            <ErrorMessage messages={createQuotationError?.data?.errorSources} />
          )}
        </div>
      </div>
      <div className="w-full mt-5 mb-24">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-3xl font-bold text-center "> Quotation List: </h3>
          <div className="flex items-center">
            <button
              onClick={handleAllQuotation}
              className="mx-6 font-semibold cursor-pointer bg-[#42A1DA] px-2 py-1 rounded-md text-white"
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
            <button className="SearchBtn ">Search</button>
          </div>
        </div>
        {quotationLoading ? (
          <div className="flex items-center justify-center text-xl">
            <Loading />
          </div>
        ) : (
          <div>
            {allQuotations?.data?.quotations?.length === 0 ? (
              <div className="flex items-center justify-center h-full text-xl text-center">
                No matching card found.
              </div>
            ) : (
              <section>
                <table className="table">
                  <thead className="tableWrap">
                    <tr>
                      <th>Order Number </th>
                      <th>Name</th>

                      <th>Car Number </th>
                      <th>Mobile Number</th>
                      <th>Date</th>
                      <th colSpan={3}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allQuotations?.data?.quotations?.map((card, index) => {
                      return (
                        <tr key={card._id}>
                          <td>{card.job_no}</td>

                          {card?.customer && (
                            <td>{card?.customer?.customer_name}</td>
                          )}
                          {card?.company && (
                            <td>{card?.company?.company_name}</td>
                          )}
                          {card?.showRoom && (
                            <td>{card?.showRoom?.showRoom_name}</td>
                          )}

                          <td>{card?.vehicle?.fullRegNum}</td>
                          {card?.customer && (
                            <td>{card?.customer?.fullCustomerNum}</td>
                          )}
                          {card?.company && (
                            <td>{card?.company?.fullCompanyNum}</td>
                          )}
                          {card?.showRoom && (
                            <td>{card?.showRoom?.fullCompanyNum}</td>
                          )}
                          <td>{card.date}</td>
                          <td>
                            <div
                              onClick={() => handleIconPreview(card._id)}
                              className="editIconWrap edit2"
                            >
                              <FaEye className="editIcon" />
                            </div>
                          </td>
                          <td>
                            <div className="editIconWrap edit">
                              <Link
                                to={`/dashboard/update-quotation?id=${card._id}`}
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
                      );
                    })}
                  </tbody>
                </table>
              </section>
            )}
          </div>
        )}
        {allQuotations?.data?.quotations?.length > 0 && (
          <div className="flex justify-center mt-4">
            <Pagination
              count={allQuotations?.data?.meta?.totalPages}
              page={currentPage}
              color="primary"
              onChange={(_, page) => setCurrentPage(page)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddQuotation;
