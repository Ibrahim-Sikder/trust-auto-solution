/* eslint-disable no-unused-vars */
import axios from "axios";
import logo from "../../../../public/assets/logo.png";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Autocomplete, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import TADatePickers from "../../../components/form/TADatePickers";
import { cmDmOptions, countries } from "../../../constant";
import TrustAutoAddress from "../../../components/TrustAutoAddress/TrustAutoAddress";
import {
  useRemoveQuotationMutation,
  useUpdateQuotationMutation,
} from "../../../redux/api/quotation";
import { ErrorMessage } from "../../../components/error-message";
import { formatDate } from "../../../utils/formateDate";

const UpdateQuotation = () => {
  const [specificQuotation, setSpecificQuotation] = useState({});
  const [partsTotal, setPartsTotal] = useState(0);
  const [serviceTotal, setServiceTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  const [discount, setDiscount] = useState("");
  const [vat, setVAT] = useState("");

  const [error, setError] = useState("");
  const [registrationError, setRegistrationError] = useState("");

  const [removeButton, setRemoveButton] = useState("");
  const [reload, setReload] = useState(false);
  const [addButton, setAddButton] = useState(false);
  const [serviceAddButton, setServiceAddButton] = useState(false);
  const partsDiscountRef = useRef(null);
  const netTotalAmountRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  // country code set
  const [countryCode, setCountryCode] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState("");

  const [selectedDate, setSelectedDate] = useState(null);
  const [getDataWithChassisNo, setGetDataWithChassisNo] = useState({});

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

  const [items, setItems] = useState([
    { description: "", quantity: "", rate: "", total: "" },
  ]);
  const [serviceItems, setServiceItems] = useState([
    { description: "", quantity: "", rate: "", total: "" },
  ]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [updateQuotation, { isLoading: updateLoading, error: updateError }] =
    useUpdateQuotationMutation();
  const [removeQuotation, { isLoading: removeLoading, error: removeError }] =
    useRemoveQuotationMutation();

  useEffect(() => {
    if (specificQuotation?.date) {
      setSelectedDate(specificQuotation.date);
    }
  }, [specificQuotation]);

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
    fetch(`${import.meta.env.VITE_API_URL}/api/v1/quotations/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSpecificQuotation(data.data);
      });
  }, [id, reload]);

  useEffect(() => {
    if (specificQuotation?.user_type === "customer") {
      reset({
        Id: specificQuotation?.Id,
        job_no: specificQuotation?.job_no,
        company_name: specificQuotation?.customer?.company_name,

        customer_name: specificQuotation?.customer?.customer_name,
        customer_country_code:
          specificQuotation?.customer?.customer_country_code,
        customer_contact: specificQuotation?.customer?.customer_contact,

        customer_address: specificQuotation?.customer?.customer_address,

        carReg_no: specificQuotation?.vehicle?.carReg_no,
        car_registration_no: specificQuotation?.vehicle?.car_registration_no,
        engine_no: specificQuotation?.vehicle?.engine_no,
        vehicle_brand: specificQuotation?.vehicle?.vehicle_brand,
        vehicle_name: specificQuotation?.vehicle?.vehicle_name,
        chassis_no: specificQuotation?.vehicle?.chassis_no,
        mileage: specificQuotation?.vehicle?.mileage,
      });
    }
    if (specificQuotation?.user_type === "company") {
      reset({
        Id: specificQuotation?.Id,
        job_no: specificQuotation?.job_no,
        company_name: specificQuotation?.company?.company_name,
        vehicle_username: specificQuotation?.company?.vehicle_username,
        company_address: specificQuotation?.company?.company_address,
        company_contact: specificQuotation?.company?.company_contact,
        company_country_code: specificQuotation?.company?.company_country_code,
        company_email: specificQuotation?.company?.company_email,
        customer_address: specificQuotation?.company?.customer_address,

        carReg_no: specificQuotation?.vehicle?.carReg_no,
        car_registration_no: specificQuotation?.vehicle?.car_registration_no,
        engine_no: specificQuotation?.vehicle?.engine_no,
        vehicle_brand: specificQuotation?.vehicle?.vehicle_brand,
        vehicle_name: specificQuotation?.vehicle?.vehicle_name,
        chassis_no: specificQuotation?.vehicle?.chassis_no,
        mileage: specificQuotation?.vehicle?.mileage,
      });
    }
    if (specificQuotation?.user_type === "showRoom") {
      reset({
        Id: specificQuotation?.Id,
        job_no: specificQuotation?.job_no,
        showRoom_name: specificQuotation?.showRoom_name,
        vehicle_username: specificQuotation?.vehicle_username,
        showRoom_address: specificQuotation?.showRoom_address,
        company_name: specificQuotation?.company_name,
        company_contact: phoneNumber || specificQuotation?.company_contact,
        company_country_code: specificQuotation?.company_country_code,

        carReg_no: specificQuotation?.vehicle?.carReg_no,
        car_registration_no: specificQuotation?.vehicle?.car_registration_no,
        engine_no: specificQuotation?.vehicle?.engine_no,
        vehicle_brand: specificQuotation?.vehicle?.vehicle_brand,
        vehicle_name: specificQuotation?.vehicle?.vehicle_name,
        chassis_no: specificQuotation?.vehicle?.chassis_no,

        mileage: specificQuotation?.vehicle?.mileage,
      });
    }
  }, [phoneNumber, reset, specificQuotation?.Id, specificQuotation?.company?.company_address, specificQuotation?.company?.company_contact, specificQuotation?.company?.company_country_code, specificQuotation?.company?.company_email, specificQuotation?.company?.company_name, specificQuotation?.company?.customer_address, specificQuotation?.company?.vehicle_username, specificQuotation?.company_contact, specificQuotation?.company_country_code, specificQuotation?.company_name, specificQuotation?.customer?.company_name, specificQuotation?.customer?.customer_address, specificQuotation?.customer?.customer_contact, specificQuotation?.customer?.customer_country_code, specificQuotation?.customer?.customer_name, specificQuotation?.job_no, specificQuotation?.showRoom_address, specificQuotation?.showRoom_name, specificQuotation?.user_type, specificQuotation?.vehicle?.carReg_no, specificQuotation?.vehicle?.car_registration_no, specificQuotation?.vehicle?.chassis_no, specificQuotation?.vehicle?.engine_no, specificQuotation?.vehicle?.mileage, specificQuotation?.vehicle?.vehicle_brand, specificQuotation?.vehicle?.vehicle_name, specificQuotation?.vehicle_username]);

  useEffect(() => {
    const totalSum = specificQuotation.input_data?.reduce(
      (sum, item) => sum + Number(item.total),
      0
    );

    const totalSum2 = items.reduce((sum, item) => sum + Number(item.total), 0);

    const serviceTotalSum = specificQuotation?.service_input_data?.reduce(
      (sum, item) => sum + Number(item.total),
      0
    );

    const serviceTotalSum2 = serviceItems.reduce(
      (sum, item) => sum + Number(item.total),
      0
    );

    const newTotalSum = isNaN(totalSum) ? 0 : totalSum;
    const newTotalSum2 = isNaN(totalSum2) ? 0 : totalSum2;
    const newServiceTotalSum = isNaN(serviceTotalSum) ? 0 : serviceTotalSum;
    const newServiceTotalSum2 = isNaN(serviceTotalSum2) ? 0 : serviceTotalSum2;

    const newGrandTotal = newTotalSum + newTotalSum2;
    const newServiceGrandTotal = newServiceTotalSum + newServiceTotalSum2;

    const totalGrand = parseFloat(newGrandTotal + newServiceGrandTotal).toFixed(
      2
    );
    setPartsTotal(newGrandTotal);
    setServiceTotal(newServiceGrandTotal);
    setGrandTotal(totalGrand);
  }, [
    items,
    serviceItems,
    specificQuotation.input_data,
    specificQuotation?.service_input_data,
  ]);
  const handleDateChange = (newDate) => {
    setSelectedDate(formatDate(newDate));
  };

  const handleDescriptionChange = (index, value) => {
    const newItems = [...specificQuotation.input_data];
    newItems[index] = {
      ...newItems[index],
      description: value,
    };
    setSpecificQuotation((prevState) => ({
      ...prevState,
      input_data: newItems,
    }));
  };
  const handleDescriptionChange2 = (index, value) => {
    const newItems = [...items];

    newItems[index].description = value;

    setItems(newItems);
  };
  const handleServiceDescriptionChange = (index, value) => {
    const newItems = [...specificQuotation.service_input_data];
    newItems[index] = {
      ...newItems[index],
      description: value,
    };
    setSpecificQuotation((prevState) => ({
      ...prevState,
      service_input_data: newItems,
    }));
  };
  const handleServiceDescriptionChange2 = (index, value) => {
    const newItems = [...serviceItems];

    newItems[index].description = value;

    setServiceItems(newItems);
  };

  const handleQuantityChange = (index, value) => {
    if (!isNaN(value)) {
      const newItems = [...specificQuotation.input_data];
      const roundedValue = Math.round(value);
      newItems[index].quantity = Number(roundedValue);

      newItems[index].total = Number(roundedValue) * newItems[index].rate;
      newItems[index].total = Number(newItems[index].total.toFixed(2));
      setSpecificQuotation((prevState) => ({
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
  const handleServiceQuantityChange = (index, value) => {
    if (!isNaN(value)) {
      const newItems = [...specificQuotation.service_input_data];
      const roundedValue = Math.round(value);
      newItems[index].quantity = Number(roundedValue);

      newItems[index].total = Number(roundedValue) * newItems[index].rate;
      newItems[index].total = Number(newItems[index].total.toFixed(2));
      setSpecificQuotation((prevState) => ({
        ...prevState,
        service_input_data: newItems,
      }));
    }
  };

  const handleServiceQuantityChange2 = (index, value) => {
    const newItems = [...serviceItems];
    const roundedValue = Math.round(value);
    newItems[index].quantity = Number(roundedValue);

    newItems[index].total = Number(roundedValue) * newItems[index].rate;
    newItems[index].total = Number(newItems[index].total.toFixed(2));
    setServiceItems(newItems);
  };

  const handleRateChange = (index, value) => {
    const newItems = [...specificQuotation.input_data];
    newItems[index].rate = Number(value).toFixed(2);
    newItems[index].total = Number(
      newItems[index].quantity * newItems[index].rate
    );
    newItems[index].total = Number(newItems[index].total.toFixed(2));
    setSpecificQuotation((prevState) => ({
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
  const handleServiceRateChange = (index, value) => {
    const newItems = [...specificQuotation.service_input_data];
    newItems[index].rate = Number(value).toFixed(2);
    newItems[index].total = Number(
      newItems[index].quantity * newItems[index].rate
    );
    newItems[index].total = Number(newItems[index].total.toFixed(2));
    setSpecificQuotation((prevState) => ({
      ...prevState,
      service_input_data: newItems,
    }));
  };

  const handleServiceRateChange2 = (index, value) => {
    const newItems = [...serviceItems];
    newItems[index].rate = Number(value).toFixed(2);
    newItems[index].total = Number(
      newItems[index].quantity * newItems[index].rate
    );
    newItems[index].total = Number(newItems[index].total.toFixed(2));
    setServiceItems(newItems);
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

    if (grandTotal > specificQuotation.total_amount) {
      differenceExistAndNewGrandTotal =
        grandTotal - specificQuotation.total_amount;
    } else if (grandTotal < specificQuotation.total_amount) {
      differenceExistAndNewGrandTotal =
        grandTotal - specificQuotation.total_amount;
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
      discountAsPercentage = specificQuotation.discount;
    }

    const differenceWithoutDiscount =
      specificQuotation.total_amount + differenceExistAndNewGrandTotal;

    if (discountAsPercentage === 0) {
      totalAfterDiscount = differenceWithoutDiscount;
    } else if (discountAsPercentage === "") {
      totalAfterDiscount =
        differenceWithoutDiscount - specificQuotation.discount;
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
      vatAsPercentage = specificQuotation.vat;
    }

    const totalAfterTax =
      totalAfterDiscount + totalAfterDiscount * (vatAsPercentage / 100);

    finalTotal = parseFloat(totalAfterTax).toFixed(2);

    return finalTotal;
  };

  const handleAddClick = () => {
    setItems([...items, { flyingFrom: "", flyingTo: "", date: "" }]);
    if (partsDiscountRef.current) {
      partsDiscountRef.current.value = discount
        ? discount
        : specificQuotation?.discount;
      netTotalAmountRef.current.innerText = calculateFinalTotal();
    }
  };

  const handleServiceDescriptionAdd = () => {
    setServiceItems([
      ...serviceItems,
      { description: "", quantity: "", rate: "", total: "" },
    ]);
    if (partsDiscountRef.current) {
      partsDiscountRef.current.value = discount
        ? discount
        : specificQuotation?.discount;
      netTotalAmountRef.current.innerText = calculateFinalTotal();
    }
  };

  const handlePartsAddButton = () => {
    setAddButton(!addButton);
    if (partsDiscountRef.current) {
      partsDiscountRef.current.value = discount
        ? discount
        : specificQuotation?.discount;
      netTotalAmountRef.current.innerText = calculateFinalTotal();
    }
  };

  const handleServiceAddButton = () => {
    setServiceAddButton(!serviceAddButton);
    if (partsDiscountRef.current) {
      partsDiscountRef.current.value = discount
        ? discount
        : specificQuotation?.discount;
      netTotalAmountRef.current.innerText = calculateFinalTotal();
    }
  };

  const handleRemoveButton = async (i, name) => {
    const values = {
      id: id,
      data: { index: i, quotation_name: name },
    };

    const res = await removeQuotation(values).unwrap();
    if (res.success) {
      setReload(!reload);
      toast.success(res.message);
    }
  };

  const input_data = [
    ...(specificQuotation?.input_data || []),
    ...items
      .filter((item) => item.total !== undefined && item.total !== "")
      .map((item) => ({
        description: item.description,
        quantity: item.quantity,
        rate: item.rate,
        total: item.total,
      })),
  ];
  const service_input_data = [
    ...(specificQuotation?.service_input_data || []),
    ...serviceItems
      .filter((item) => item.total !== undefined && item.total !== "")
      .map((item) => ({
        description: item.description,
        quantity: item.quantity,
        rate: item.rate,
        total: item.total,
      })),
  ];

  const onSubmit = async (data) => {
    setRemoveButton("");
    try {
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
        user_type: specificQuotation?.user_type,
        Id: specificQuotation?.Id,
        job_no: specificQuotation?.job_no,
        date: selectedDate || specificQuotation?.date,

        parts_total: partsTotal || specificQuotation.parts_total,
        service_total: serviceTotal || specificQuotation.serviceTotal,
        total_amount: grandTotal || specificQuotation?.total_amount,
        discount: discount || specificQuotation?.discount,
        vat: vat === 0 || vat > 0 ? vat : specificQuotation?.vat,
        net_total: calculateFinalTotal() || specificQuotation.net_total,

        input_data: input_data,
        service_input_data: service_input_data,
      };

      const values = {
        customer,
        company,
        showRoom,
        vehicle,
        quotation,
      };

      const newValue = {
        id: id,
        data: values,
      };

      if (removeButton === "") {
        const res = await updateQuotation(newValue).unwrap();
        if (res.success) {
          toast.success(res.message);
          setReload(!reload);
          navigate("/dashboard/quotaiton-list");
        }
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      }
    }
  };

  const handleChassisChange = (_, newValue) => {
    const filtered = specificQuotation?.vehicle?.find(
      (vehicle) => vehicle.chassis_no === newValue
    );
    setGetDataWithChassisNo(filtered);
  };

  const handleOnSubmit = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <div className="px-5 py-10">
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

      <div className="mt-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex md:flex-row flex-col justify-between items-center">
            <div className="hidden"></div>
            <div className="vehicleCard">Update Quotation </div>

            <div>
              <TADatePickers
                handleDateChange={handleDateChange}
                selectedDate={selectedDate}
              />
            </div>
          </div>
          <div className="mb-10 jobCardFieldWraps">
            <div className="jobCardFieldLeftSide">
              <h3 className="text-xl lg:text-3xl font-bold">Customer Info</h3>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Job Card No"
                  {...register("job_no")}
                  // onChange={(e) => setOrderNumber(e.target.value)}
                  focused={specificQuotation?.job_no || ""}
                  required
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>

              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Customer Id"
                  {...register("Id")}
                  focused={specificQuotation?.Id || ""}
                  required
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Company"
                  focused={
                    specificQuotation?.customer?.company_name ||
                    specificQuotation?.company?.company_name ||
                    specificQuotation?.showRoom?.company_name
                  }
                  {...register("company_name")}
                />
              </div>
              <div className="mt-3">
                {!specificQuotation && (
                  <TextField
                    className="addJobInputField"
                    label="Customer"
                    focused={specificQuotation?.customer?.customer_name || ""}
                    {...register("customer_name")}
                  />
                )}
                {specificQuotation?.user_type === "customer" && (
                  <TextField
                    className="addJobInputField"
                    label="Customer"
                    focused={specificQuotation?.customer?.customer_name || ""}
                    {...register("customer_name")}
                  />
                )}
                {(specificQuotation?.user_type === "company" ||
                  specificQuotation?.user_type === "showRoom") && (
                  <TextField
                    className="addJobInputField"
                    label="Customer"
                    focused={
                      specificQuotation?.company?.vehicle_username ||
                      specificQuotation?.showRoom?.vehicle_username
                    }
                    {...register("vehicle_username")}
                  />
                )}
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
                        {...register("customer_country_code")}
                        label="Select Country Code"
                        variant="outlined"
                        focused={
                          specificQuotation?.customer?.customer_country_code || ""
                        }
                      />
                    )}
                  />

                  {!specificQuotation && (
                    <TextField
                      {...register("customer_contact")}
                      className="carRegField"
                      variant="outlined"
                      fullWidth
                      type="tel"
                      value={
                        phoneNumber
                          ? phoneNumber
                          : specificQuotation?.customer?.customer_contact
                      }
                      onChange={handlePhoneNumberChange}
                      placeholder="Customer Contact No (N)"
                    />
                  )}
                  {specificQuotation?.user_type === "customer" && (
                    <TextField
                      {...register("customer_contact")}
                      className="carRegField"
                      variant="outlined"
                      fullWidth
                      type="tel"
                      value={
                        phoneNumber
                          ? phoneNumber
                          : specificQuotation?.customer?.customer_contact
                      }
                      onChange={handlePhoneNumberChange}
                      placeholder="Customer Contact No (N)"
                      focused={
                        specificQuotation?.customer?.customer_contact || ""
                      }
                    />
                  )}
                  {(specificQuotation?.user_type === "company" ||
                    specificQuotation?.user_type === "showRoom") && (
                    <TextField
                      {...register("company_contact")}
                      className="carRegField"
                      variant="outlined"
                      fullWidth
                      type="tel"
                      value={
                        phoneNumber
                          ? phoneNumber
                          : specificQuotation?.customer?.customer_contact
                      }
                      onChange={handlePhoneNumberChange}
                      placeholder="Company Contact No (N)"
                      focused={
                        specificQuotation?.company?.company_contact ||
                        specificQuotation?.showRoom?.company_contact
                      }
                    />
                  )}
                </div>
              </div>
              <div className="mt-3">
                {!specificQuotation && (
                  <TextField
                    className="addJobInputField"
                    label="Address"
                    {...register("customer_address")}
                  />
                )}
                {specificQuotation?.user_type === "customer" && (
                  <TextField
                    className="addJobInputField"
                    label="Address"
                    {...register("customer_address")}
                    focused={specificQuotation?.customer?.customer_address}
                  />
                )}
                {specificQuotation?.user_type === "company" && (
                  <TextField
                    className="addJobInputField"
                    label="Address"
                    {...register("company_address")}
                    focused={specificQuotation?.company?.company_address || ""}
                  />
                )}
                {specificQuotation?.user_type === "showRoom" && (
                  <TextField
                    className="addJobInputField"
                    label="Address"
                    {...register("showRoom_address")}
                    focused={
                      specificQuotation?.showRoom?.showRoom_address || ""
                    }
                  />
                )}
              </div>
            </div>

            <div className="mt-3 lg:mt-0 jobCardFieldRightSide">
              <h3 className="text-xl lg:text-3xl font-bold">Vehicle Info</h3>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Chassis No"
                  value={specificQuotation?.chassis_no}
                  {...register("chassis_no")}
                  focused={
                    specificQuotation?.vehicle?.chassis_no || ""
                  }
                  InputProps={{
                    readOnly: true,
                  }}
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
                      label="Vehicle Reg No ( New field ) "
                      {...register("carReg_no")}
                      focused={specificQuotation?.vehicle?.carReg_no}
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
                      focused={
                        specificQuotation?.vehicle?.car_registration_no || ""
                      }
                     
                    />
                  )}
                </InputMask>
              </div>

             
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Engine & CC"
                  value={specificQuotation?.engine_no}
                  {...register("engine_no")}
                  focused={
                    specificQuotation?.vehicle?.engine_no || ""
                  }
                />
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Vehicle Name"
                  value={specificQuotation?.vehicle_name}
                  {...register("vehicle_name")}
                  focused={
                    specificQuotation?.vehicle?.vehicle_name || ""
                  }
                />
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Mileage"
                  value={specificQuotation?.mileage}
                  {...register("mileage")}
                  focused={
                    specificQuotation?.vehicle?.mileage || ""
                  }
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
          <div>
            {specificQuotation?.input_data?.length > 0 && (
              <>
                {specificQuotation?.input_data?.map((item, i) => {
                  return (
                    <div key={i}>
                      <div className="qutationForm">
                        <div onClick={() => setRemoveButton("remove")}>
                          {items.length !== 0 && (
                            <button
                              disabled={removeLoading}
                              onClick={() => handleRemoveButton(i, "parts")}
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
                onClick={handlePartsAddButton}
                className="bg-[#42A1DA] hover:bg-[#42A1DA] text-white rounded-md px-2 py-2 mb-2"
              >
                Add new
              </button>
            )}
            {addButton && (
              <button
                onClick={handlePartsAddButton}
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
          <div className="flex items-center justify-around labelWrap">
            <label>SL No </label>
            <label>Service description </label>
            <label>Qty </label>
            <label>Rate</label>
            <label>Amount </label>
          </div>
          <div>
            {specificQuotation?.service_input_data?.length > 0 && (
              <>
                {specificQuotation?.service_input_data?.map((item, i) => {
                  return (
                    <div key={i}>
                      <div className="qutationForm">
                        <div onClick={() => setRemoveButton("remove")}>
                          {items.length !== 0 && (
                            <button
                              disabled={removeLoading}
                              onClick={() => handleRemoveButton(i, "service")}
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
                              handleServiceQuantityChange(i, e.target.value)
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
                              handleServiceRateChange(i, e.target.value)
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
        </form>
        <div>
          {!serviceAddButton && (
            <button
              onClick={handleServiceAddButton}
              className="bg-[#42A1DA] hover:bg-[#42A1DA] text-white rounded-md px-2 py-2 mb-2"
            >
              Add new
            </button>
          )}
          {serviceAddButton && (
            <button
              onClick={handleServiceAddButton}
              className="border border-[#42A1DA] hover:border-[#42A1DA] text-black rounded-md px-2 py-2 mb-2"
            >
              Cancel
            </button>
          )}
          {serviceAddButton && (
            <>
              {serviceItems.map((item, i) => {
                return (
                  <div key={i}>
                    <div className="qutationForm">
                      <div>
                        {items.length !== 0 && (
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
                            handleServiceDescriptionChange2(i, e.target.value)
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
                            handleServiceQuantityChange2(i, e.target.value)
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
                            handleServiceRateChange2(i, e.target.value)
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
                          onClick={handleServiceDescriptionAdd}
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
          <div className="flex items-center">
            <b> Total Amount: </b>
            <span>
              {grandTotal ? grandTotal : specificQuotation.total_amount}
            </span>
          </div>
          <div>
            <b> Discount: </b>
            <input
              className="py-1 text-center"
              onChange={(e) => handleDiscountChange(e.target.value)}
              autoComplete="off"
              type="text"
              placeholder="Discount"
              defaultValue={specificQuotation.discount}
              ref={partsDiscountRef}
            />
          </div>
          <div>
            <b>Vat: </b>
            <input
              className="text-center"
              onChange={(e) => handleVATChange(e.target.value)}
              autoComplete="off"
              type="text"
              placeholder="Vat"
              defaultValue={specificQuotation?.vat}
            />
          </div>
          <div>
            <div className="ml-3">
              <strong>
                Final Total:{" "}
                <span ref={netTotalAmountRef}>
                  {calculateFinalTotal()
                    ? calculateFinalTotal()
                    : specificQuotation?.net_total}
                </span>
              </strong>
            </div>
          </div>
        </div>

        <div className="mt-8 buttonGroup buttonMargin">
          <div className="flex md:flex-row flex-col justify-end">
            <Button>Preview</Button>

            <Button>Download </Button>
            <Button>Print </Button>
            <Button LinkComponent={Link} to="/dashboard/invoice">
              Invoice{" "}
            </Button>
          </div>
        </div>

        <div className="mt-10">
          <div className="flex  justify-center align-items-center">
            <Button
              sx={{ background: "#42A1DA" }}
              onClick={handleOnSubmit}
              className="addJobBtn"
              disabled={updateLoading}
            >
              Update Quotation
            </Button>
          </div>
          <div className="my-2">
            {updateError && (
              <ErrorMessage messages={updateError?.data?.errorSources} />
            )}
          </div>
        </div>

        {error && <div className="pt-6 text-center text-red-400">{error}</div>}
      </div>
    </div>
  );
};

export default UpdateQuotation;