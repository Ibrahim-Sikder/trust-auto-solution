/* eslint-disable no-unused-vars */
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../../public/assets/logo.png";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import { toast } from "react-toastify";
import InputMask from "react-input-mask";
import Loading from "../../../components/Loading/Loading";
import {
  Autocomplete,
  Box,
  Button,
  Pagination,
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

  const [createQuotation, { error: createQuotationError }] =
    useCreateQuotationMutation();

  const [deleteQuotation, { isLoading: deleteLoading, error: deleteError }] =
    useDeleteQuotationMutation();

  const { data: jobCardData, isLoading } =
    useGetSingleJobCardWithJobNoQuery(orderNumber);

  const { data: allQuotations, isLoading: quotationLoading } =
    useGetAllQuotationsQuery({
      limit,
      page: currentPage,
      searchTerm: filterType,
    });





    useEffect(() => {
      if (jobCardData?.data) {
        reset({
          Id: jobCardData?.data?.Id,
          company_name: jobCardData?.data?.company_name,
          vehicle_username: jobCardData?.data?.vehicle_username,
          company_address: jobCardData?.data?.company_address,
          customer_name: jobCardData?.data?.customer_name,
          customer_country_code: jobCardData?.data?.customer_country_code,
          customer_contact: phoneNumber || jobCardData?.data?.customer_contact,
          customer_email: jobCardData?.data?.customer_email,
          customer_address: jobCardData?.data?.customer_address,
          reference_name: jobCardData?.data?.reference_name,
  
          carReg_no: getDataWithChassisNo?.carReg_no,
          car_registration_no: getDataWithChassisNo?.car_registration_no,
          engine_no: getDataWithChassisNo?.engine_no,
          vehicle_brand: getDataWithChassisNo?.vehicle_brand,
          vehicle_name: getDataWithChassisNo?.vehicle_name,
          vehicle_model: getDataWithChassisNo?.vehicle_model,
          vehicle_category: getDataWithChassisNo?.vehicle_category,
          color_code: getDataWithChassisNo?.color_code,
          mileage: getDataWithChassisNo?.mileage,
          fuel_type: getDataWithChassisNo?.fuel_type,
        });
      }
    }, [getDataWithChassisNo?.carReg_no, getDataWithChassisNo?.car_registration_no, getDataWithChassisNo?.color_code, getDataWithChassisNo?.engine_no, getDataWithChassisNo?.fuel_type, getDataWithChassisNo?.mileage, getDataWithChassisNo?.vehicle_brand, getDataWithChassisNo?.vehicle_category, getDataWithChassisNo?.vehicle_model, getDataWithChassisNo?.vehicle_name, jobCardData?.data, phoneNumber, reset]);




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

  const handleServiceDescriptionAdd = () => {
    setServiceItems([
      ...serviceItems,
      { servicesDescription: "", quantity: "", rate: "", total: "" },
    ]);
  };

  useEffect(() => {
    const totalSum = items.reduce((sum, item) => sum + Number(item.total), 0);
    const serviceTotalSum = serviceItems.reduce(
      (sum, item) => sum + Number(item.total),
      0
    );

    const roundedTotalSum = parseFloat(totalSum + serviceTotalSum).toFixed(2);
    setPartsTotal(totalSum);
    setServiceTotal(serviceTotalSum);
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
    const customer = {};
    const company = {};

    const showRoom = {};
    const vehicle = {};

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
    console.log(res);
    if (res.success) {
      toast.success(res.message);
      //       navigate("/dashboard/quotaiton-list");
    }

    // try {
    //   const values = {
    //     username: jobCardData.username || data.username,
    //     Id: customerId || jobCardData.Id,
    //     job_no: job_no || jobCardData.job_no,
    //     date: selectedDate || jobCardData.date,

    //     company_name: data.company_name || jobCardData.company_name,
    //     customer_name: data.customer_name || jobCardData.customer_name,
    //     customer_contact: data.customer_contact || jobCardData.customer_contact,
    //     customer_address: data.customer_address || jobCardData.customer_address,

    //     car_registration_no:
    //       data.car_registration_no || jobCardData.car_registration_no,
    //     chassis_no: data.chassis_no || jobCardData.chassis_no,
    //     engine_no: data.engine_no || jobCardData.engine_no,
    //     vehicle_name: data.vehicle_name || jobCardData.vehicle_name,
    //     mileage: data.mileage || jobCardData.mileage,

    //     total_amount: grandTotal,
    //     discount: discount,
    //     vat: vat,
    //     net_total: calculateFinalTotal(),
    //     input_data: items,
    //   };
    //   console.log(values);

    //   const response = await axios.post(
    //     `${import.meta.env.VITE_API_URL}/api/v1/quotation`,
    //     values
    //   );

    //   if (response.data.message === "Successfully quotation post") {
    //     if (preview === "") {
    //       toast.success("Quotation added successful.");
    //       navigate("/dashboard/quotaiton-list");
    //     }

    //     if (preview === "preview") {
    //       fetch(`${import.meta.env.VITE_API_URL}/api/v1/quotation`)
    //         .then((res) => res.json())
    //         .then((data) => {
    //           if (data) {
    //             navigate(`/dashboard/quotation-view?id=${data._id}`);
    //           }
    //         });
    //     }
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
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

  if (quotationLoading) {
    return <Loading />;
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
          <div className="mb-10 jobCardFieldWraps">
            <div className="jobCardFieldLeftSide">
              <h3 className="text-xl lg:text-3xl  font-bold">Customer Info</h3>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Job Card No"
                  onChange={(e) => setOrderNumber(e.target.value)}
                  // value={jobCardData?.data?.job_no}
                  // focused={jobCardData?.data?.job_no}
                />
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Customer Id"
                  {...register("Id")}
                  focused={jobCardData?.data?.Id}
                  readOnly
                />
              </div>

              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Company"
                  // value={jobCardData?.data?.company_name}
                  // focused={jobCardData?.data?.company_name}
                  {...register("company_name")}
                  // onChange={(e) =>
                  //   setJobCardData({
                  //     ...jobCardData,
                  //     company_name: e.target.value,
                  //   })
                  // }
                  // InputLabelProps={{
                  //   shrink: !!jobCardData?.company_name,
                  // }}
                />
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Customer"
                  // value={jobCardData?.data?.customer_name}
                  // focused={jobCardData?.data?.customer_name}
                  {...register("customer_name")}
                  // onChange={(e) =>
                  //   setJobCardData({
                  //     ...jobCardData,
                  //     customer_name: e.target.value,
                  //   })
                  // }
                  // InputLabelProps={{
                  //   shrink: !!jobCardData?.data?.customer_name,
                  // }}
                />
              </div>
              <div className="mt-3">
                <div className="flex md:flex-row flex-col gap-0.5 items-center mt-3">
                  <Autocomplete
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
                      />
                    )}
                  />

                  <TextField
                    {...register("customer_contact")}
                    className="carRegField"
                    variant="outlined"
                    fullWidth
                    type="tel"
                    // value={
                    //   phoneNumber ? phoneNumber : jobCardData?.customer_contact
                    // }
                    onChange={handlePhoneNumberChange}
                    placeholder="Customer Contact No (N)"
                    // InputLabelProps={{
                    //   shrink: !!jobCardData?.customer_contact,
                    // }}
                  />
                </div>
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Address"
                  // value={jobCardData?.customer_address}
                  // focused={jobCardData?.customer_address}
                  {...register("customer_address")}
                  // onChange={(e) =>
                  //   setJobCardData({
                  //     ...jobCardData,
                  //     customer_address: e.target.value,
                  //   })
                  // }
                  // InputLabelProps={{
                  //   shrink: !!jobCardData?.customer_address,
                  // }}
                />
              </div>
            </div>

            <div className="mt-3 lg:mt-0 jobCardFieldRightSide">
              <h3 className="text-xl lg:text-3xl font-bold">Vehicle Info</h3>
              <div className="mt-3">
                <Autocomplete
                  disabled={
                    jobCardData?.data?.vehicle?.length === 0 ||
                    !jobCardData?.data?.vehicle
                  }
                  disableClearable
                  freeSolo
                  className="addJobInputField"
                  onChange={handleChassisChange}
                  options={jobCardData?.data?.vehicle?.map(
                    (option) => option.chassis_no
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      className="addJobInputField"
                      label="Chassis No"
                       
                      {...register("chassis_no")}
                      inputProps={{
                        ...params.inputProps,
                        maxLength: jobCardData?.data?.chassis_no?.length || 30,
                      }}
                    />
                  )}
                />
              </div>
              <div className="flex mt-3  md:gap-0 gap-4 items-center">
                <Autocomplete
                  sx={{ marginRight: "5px" }}
                  freeSolo
                  className="jobCardSelect2 "
                  id="free-solo-demo"
                  options={cmDmOptions.map((option) => option.label)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Vehicle Reg No"
                      {...register("carReg_no")}
                    />
                  )}
                />

                <InputMask
                  mask="99-9999"
                  maskChar={null}
                  {...register("car_registration_no")}
                >
                  {(inputProps) => (
                    <TextField
                      {...inputProps}
                      {...register("car_registration_no")}
                      className="carRegField"
                      label="Car R (N)"
                      focused={jobCardData?.car_registration_no || ""}
                    />
                  )}
                </InputMask>
              </div>

              {/* <div className="mt-3">
                {/* <TextField
                  className="addJobInputField"
                  label="Chassis No"
                  // value={jobCardData?.chassis_no}
                  // focused={jobCardData?.chassis_no}
                  {...register("chassis_no")}
                  // onChange={(e) =>
                  //   setJobCardData({
                  //     ...jobCardData,
                  //     chassis_no: e.target.value,
                  //   })
                  // }
                  // InputLabelProps={{
                  //   shrink: !!jobCardData?.chassis_no,
                  // }}
                /> */}
              {/* </div> */}
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Engine & CC"
                  // value={jobCardData?.engine_no}
                  // focused={jobCardData?.engine_no}
                  {...register("engine_no")}
                  // onChange={(e) =>
                  //   setJobCardData({
                  //     ...jobCardData,
                  //     engine_no: e.target.value,
                  //   })
                  // }
                  // InputLabelProps={{
                  //   shrink: !!jobCardData?.engine_no,
                  // }}
                />
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Vehicle Name"
                  // value={jobCardData?.vehicle_name}
                  // focused={jobCardData?.vehicle_name}
                  {...register("vehicle_name")}
                  // onChange={(e) =>
                  //   setJobCardData({
                  //     ...jobCardData,
                  //     vehicle_name: e.target.value,
                  //   })
                  // }
                  // InputLabelProps={{
                  //   shrink: !!jobCardData?.vehicle_name,
                  // }}
                />
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Mileage"
                  // value={jobCardData?.mileage}
                  // focused={jobCardData?.mileage}
                  {...register("mileage")}
                  // onChange={(e) =>
                  //   setJobCardData({
                  //     ...jobCardData,
                  //     mileage: e.target.value,
                  //   })
                  // }
                  // InputLabelProps={{
                  //   shrink: !!jobCardData?.mileage,
                  // }}
                />
              </div>
            </div>
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
                        onClick={handleServiceDescriptionAdd}
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
            </div>
            <div className="submitQutationBtn">
              <button type="submit">Add Quotation </button>
            </div>
          </div>
        </form>
        <div>
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
              // onClick={handleAllShowRoom}
              className="mx-6 font-semibold cursor-pointer bg-[#42A1DA] px-2 py-1 rounded-md text-white"
            >
              All
            </button>
            <input
              onChange={(e) => setFilterType(e.target.value)}
              type="text"
              placeholder="Search"
              className="border py-2 px-3 rounded-md border-[#ddd]"
              // ref={textInputRef}
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
                      <th>SL No</th>
                      <th>Customer Name</th>
                      <th>Order Number </th>
                      <th>Car Number </th>
                      <th>Mobile Number</th>
                      <th>Date</th>
                      <th colSpan={3}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allQuotations?.data?.quotations?.map((card, index) => {
                      const lastVehicle = card?.vehicles
                        ? [...card.vehicles].sort(
                            (a, b) =>
                              new Date(b.createdAt) - new Date(a.createdAt)
                          )[0]
                        : null;

                      return (
                        <tr key={card._id}>
                          <td>{index + 1}</td>
                          <td>{card.customer_name}</td>
                          <td>{card.job_no}</td>
                          <td>{card.car_registration_no}</td>
                          <td> {card.customer_contact} </td>
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
