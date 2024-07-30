/* eslint-disable no-unused-vars */

import "./AddJobCard.css";
import car from "../../../../public/assets/car2.jpeg";
import logo from "../../../../public/assets/logo.png";
import { useEffect, useRef, useState } from "react";
import { Autocomplete, Button, TextField } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import InputMask from "react-input-mask";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { toast } from "react-toastify";
import Loading from "../../../components/Loading/Loading";
import {
  carBrands,
  cmDmOptions,
  countries,
  fuelType,
  vehicleModels,
  vehicleName,
  vehicleTypes,
} from "../../../constant";

import TrustAutoAddress from "../../../components/TrustAutoAddress/TrustAutoAddress";

import {
  useGetSingleJobCardQuery,
  useUpdateJobCardMutation,
} from "../../../redux/api/jobCard";
import { ErrorMessage } from "../../../components/error-message";

const UpdateJobCard = () => {
  const [inputValue, setInputValue] = useState("");

  const [countryCode, setCountryCode] = useState(countries[0]);
  const [driverCountryCode, setDriverCountryCode] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [driverPhoneNumber, setDriverPhoneNumber] = useState("");

  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");

  const [selectedBrand, setSelectedBrand] = useState("");
  const [filteredVehicles, setFilteredVehicles] = useState([]);

  const [filteredOptions, setFilteredOptions] = useState([]);
  const [yearSelectInput, setYearSelectInput] = useState("");
  const [technicianDate, setTechnicianDate] = useState("");
  const [formattedDate, setFormattedDate] = useState("");

  const [getDataWithChassisNo, setGetDataWithChassisNo] = useState("");

  const [vehicleInterior, setVehicleInterior] = useState("");
  const [reportedDefect, setReportedDefect] = useState("");
  const [reportedAction, setReportedAction] = useState("");

  const [dateChange, setDateChange] = useState(false);
  const [techDateChange, setTechDateChange] = useState(false);

  const formRef = useRef();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    setValue: setVModelValue,
    formState: { errors },
  } = useForm();

  const [
    updateJobCard,
    { isLoading: updateJobCardLoading, error: jobCardUpdateError },
  ] = useUpdateJobCardMutation();

  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const { data, isLoading, refetch } = useGetSingleJobCardQuery(id);

  const singleCard = data?.data;

  useEffect(() => {
    if (singleCard?.user_type === "customer") {
      reset({
        company_name: singleCard?.customer?.company_name,
        vehicle_username: singleCard?.customer?.vehicle_username,
        company_address: singleCard?.customer?.company_address,
        customer_name: singleCard?.customer?.customer_name,
        customer_country_code: singleCard?.customer?.customer_country_code,
        customer_contact: phoneNumber || singleCard?.customer?.customer_contact,
        customer_email: singleCard?.customer?.customer_email,
        customer_address: singleCard?.customer?.customer_address,
        driver_name: singleCard?.customer?.driver_name,
        driver_country_code: singleCard?.customer?.driver_country_code,
        driver_contact:
          driverPhoneNumber || singleCard?.customer?.driver_contact,
        reference_name: singleCard?.customer?.reference_name,

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

        vehicle_body_report: singleCard?.vehicle_body_report,
        note: singleCard?.note,
        technician_date: singleCard?.technician_date,
        technician_name: singleCard?.technician_name,
      });
    }
    if (singleCard && singleCard.user_type === "company") {
      reset({
        company_name: singleCard?.company?.company_name,
        vehicle_username: singleCard?.company?.vehicle_username,
        company_address: singleCard?.company?.company_address,
        company_contact: singleCard?.company?.company_contact,
        company_country_code: singleCard?.company?.company_country_code,
        company_email: singleCard?.company?.company_email,
        customer_address: singleCard?.company?.customer_address,

        driver_name: singleCard?.company?.driver_name,
        driver_country_code: singleCard?.company?.driver_country_code,
        driver_contact:
          driverPhoneNumber || singleCard?.company?.driver_contact,
        reference_name: singleCard?.company?.reference_name,

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

        vehicle_body_report: singleCard?.vehicle_body_report,
        note: singleCard?.note,
        technician_date: singleCard?.technician_date,
        technician_name: singleCard?.technician_name,
      });
    }
    if (singleCard && singleCard.user_type === "showRoom") {
      reset({
        showRoom_name: singleCard?.showRoom?.showRoom_name,
        vehicle_username: singleCard?.showRoom?.vehicle_username,
        showRoom_address: singleCard?.showRoom?.showRoom_address,
        company_name: singleCard?.showRoom?.company_name,
        company_contact: phoneNumber || singleCard?.showRoom?.company_contact,
        company_country_code: singleCard?.showRoom?.company_country_code,
        company_email: singleCard?.showRoom?.company_email,
        company_address: singleCard?.showRoom?.company_address,
        driver_name: singleCard?.showRoom?.driver_name,
        driver_country_code: singleCard?.showRoom?.driver_country_code,
        driver_contact:
          driverPhoneNumber || singleCard?.showRoom?.driver_contact,
        reference_name: singleCard?.showRoom?.reference_name,

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

        vehicle_body_report: singleCard?.vehicle_body_report,
        note: singleCard?.note,
        technician_date: singleCard?.technician_date,
        technician_name: singleCard?.technician_name,
      });
    }
  }, [
    driverPhoneNumber,
    getDataWithChassisNo?.carReg_no,
    getDataWithChassisNo?.car_registration_no,
    getDataWithChassisNo?.color_code,
    getDataWithChassisNo?.engine_no,
    getDataWithChassisNo?.fuel_type,
    getDataWithChassisNo?.mileage,
    getDataWithChassisNo?.vehicle_brand,
    getDataWithChassisNo?.vehicle_category,
    getDataWithChassisNo?.vehicle_model,
    getDataWithChassisNo?.vehicle_name,
    phoneNumber,
    reset,
    singleCard,
  ]);

  const extractTextFromHTML = (htmlString) => {
    const doc = new DOMParser().parseFromString(htmlString, "text/html");
    return doc.body.textContent || "";
  };

  useEffect(() => {
    if (singleCard && singleCard.vehicle_interior_parts) {
      const extractedText = extractTextFromHTML(
        singleCard.vehicle_interior_parts
      );
      setVehicleInterior(extractedText);
    }
    if (singleCard && singleCard.reported_defect) {
      const extractedText = extractTextFromHTML(singleCard.reported_defect);
      setReportedDefect(extractedText);
    }
    if (singleCard && singleCard.reported_action) {
      const extractedText = extractTextFromHTML(singleCard.reported_action);
      setReportedAction(extractedText);
    }
  }, [singleCard]);

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
  const handleDriverPhoneNumberChange = (e) => {
    const newPhoneNumber = e.target.value;
    if (
      /^\d*$/.test(newPhoneNumber) &&
      newPhoneNumber.length <= 10 &&
      (newPhoneNumber === "" ||
        !newPhoneNumber.startsWith("0") ||
        newPhoneNumber.length > 1)
    ) {
      setDriverPhoneNumber(newPhoneNumber);
    }
  };

  const onSubmit = async (data) => {
    const customer = {
      company_name: data.company_name,
      vehicle_username: data.vehicle_username,
      company_address: data.company_address,
      customer_name: data.customer_name,
      customer_contact: data.customer_contact,
      customer_country_code: countryCode.code,
      customer_email: data.customer_email,
      customer_address: data.customer_address,
      driver_name: data.driver_name,
      driver_contact: data.driver_contact,
      driver_country_code: driverCountryCode.code,
      reference_name: data.reference_name,
    };

    const company = {
      company_name: data.company_name,
      vehicle_username: data.vehicle_username,
      company_address: data.company_address,
      company_contact: data.company_contact,
      company_country_code: countryCode.code,
      company_email: data.company_email,
      customer_address: data.customer_address,
      driver_name: data.driver_name,
      driver_contact: data.driver_contact,
      driver_country_code: driverCountryCode.code,
      reference_name: data.reference_name,
    };

    const showroom = {
      showRoom_name: data.showRoom_name,
      vehicle_username: data.vehicle_username,
      showRoom_address: data.showRoom_address,
      company_name: data.company_name,
      company_contact: data.company_contact,
      company_country_code: countryCode.code,
      company_email: data.company_email,
      company_address: data.company_address,
      driver_name: data.driver_name,
      driver_contact: data.driver_contact,
      driver_country_code: driverCountryCode.code,
      reference_name: data.reference_name,
    };

    data.vehicle_model = Number(data.vehicle_model);
    data.mileage = Number(data.mileage);

    // Extract vehicle information
    const vehicle = {
      carReg_no: data.carReg_no,
      car_registration_no: data.car_registration_no,
      chassis_no: data.chassis_no,
      engine_no: data.engine_no,
      vehicle_brand: data.vehicle_brand,
      vehicle_name: data.vehicle_name,
      vehicle_model: data.vehicle_model,
      vehicle_category: data.vehicle_category,
      color_code: data.color_code,
      mileage: data.mileage,
      fuel_type: data.fuel_type,
    };

    const jobCard = {
      Id: singleCard.Id,
      job_no: singleCard.job_no,
      user_type: singleCard.user_type,
      date: formattedDate,
      vehicle_interior_parts: value,
      reported_defect: value2,
      reported_action: value3,
      note: data.note,
      vehicle_body_report: data.vehicle_body_report,
      technician_name: data.technician_name,
      technician_signature: data.technician_signature,
      technician_date: technicianDate,
      vehicle_owner: data.vehicle_owner,
    };

    const newCard = {
      customer,
      company,
      showroom,
      vehicle,
      jobCard,
    };

    const newData = {
      id,
      data: newCard,
    };

    const res = await updateJobCard(newData).unwrap();

    if (res.success) {
      toast.success(res.message);
      navigate("/dashboard/jobcard-list");
      refetch();
    }
  };

  const handleBrandChange = (_, newValue) => {
    setSelectedBrand(newValue);
    const filtered = vehicleName.filter(
      (vehicle) => vehicle.label === newValue
    );
    setFilteredVehicles(filtered);
  };

  // Handle input changes
  const handleYearSelectInput = (event) => {
    const value = event.target.value;

    // Check if the input is a number and does not exceed 4 digits
    if (/^\d{0,4}$/.test(value)) {
      setYearSelectInput(value);
      const filtered = vehicleModels.filter((option) =>
        option.label.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredOptions(filtered);
    }
  };

  const handleOptionClick = (option) => {
    setYearSelectInput(option.value);
    setFilteredOptions([]);
    setVModelValue("vehicle_model", option.label, {
      shouldValidate: true,
    });
  };

  const handleDateChange = (event) => {
    const rawDate = event.target.value;
    const parsedDate = new Date(rawDate);
    const day = parsedDate.getDate().toString().padStart(2, "0");
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0");
    const year = parsedDate.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    setFormattedDate(formattedDate);
  };

  const handleTechnicianDateChange = (event) => {
    const rawDate = event.target.value;
    const parsedDate = new Date(rawDate);
    const day = parsedDate.getDate().toString().padStart(2, "0");
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0");
    const year = parsedDate.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    setTechnicianDate(formattedDate);
  };

  useEffect(() => {
    const parsedDate = new Date();
    const day = parsedDate.getDate().toString().padStart(2, "0");
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0");
    const year = parsedDate.getFullYear();
    const currentDate = `${day}-${month}-${year}`;
    setFormattedDate(currentDate);
  }, []);

  const handleChassisChange = (_, newValue) => {
    if (singleCard?.customer?.vehicles) {
      const filtered = singleCard?.customer?.vehicles?.find(
        (vehicle) => vehicle.chassis_no === newValue
      );
      setGetDataWithChassisNo(filtered);
    }
  };

  const currentDate = new Date().toISOString().split("T")[0];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center text-xl">
        <Loading />
      </div>
    );
  }

  return (
    <div className="addJobCardWraps">
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
      <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
        <div>
          <div className=" flex lg:flex-row flex-col items-center justify-between my-5 lg:text-left text-center ">
            <div>
              <div>
                <b>
                  Job No: <span className="requiredStart">*</span>
                </b>
                <span> {singleCard?.job_no}</span>
              </div>
              <div className="py-1">
                <b>User type: </b>
                {singleCard?.user_type}
              </div>

              <div>
                <b>User Id: </b>
                {singleCard?.Id}
              </div>
            </div>
            <div>
              <div className="vehicleCard">Vehicle Job Card </div>
            </div>
            <div>
              <div>
                <div className="cursor-pointer">
                  <b>
                    Date <span className="requiredStart">*</span>
                  </b>

                  {dateChange ? (
                    <input
                      className="outline-none curs"
                      onChange={handleDateChange}
                      autoComplete="off"
                      type="date"
                      placeholder="Date"
                      max={currentDate}
                      defaultValue={currentDate}
                    />
                  ) : (
                    <p
                      onClick={() => setDateChange(!dateChange)}
                      className="border border-gray-600 rounded-md px-4 py-2"
                    >
                      {singleCard?.date}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="jobCardFieldWraps">
            <div className="jobCardFieldRightSide">
              {singleCard?.user_type &&
                (singleCard?.user_type === "customer" ? (
                  <div>
                    <h3 className="mb-5 text-xl font-bold ">
                      Customer Information{" "}
                    </h3>
                    <div>
                      <TextField
                        className="addJobInputField"
                        label="Customer Name (T)"
                        {...register("customer_name")}
                        focused={singleCard?.customer?.customer_name || ""}
                      />
                    </div>
                    <div className="mt-3">
                      <TextField
                        className="addJobInputField"
                        label="Customer Email Address (T)"
                        {...register("customer_email")}
                        type="email"
                        focused={singleCard?.customer?.customer_email || ""}
                      />
                    </div>
                    <div className="mt-3">
                      <TextField
                        className="addJobInputField"
                        label="Customer Address (T) "
                        {...register("customer_address")}
                        focused={singleCard?.customer?.customer_address || ""}
                      />
                    </div>
                    <div className="mt-3">
                      <TextField
                        className="addJobInputField"
                        {...register("company_name")}
                        label="Company Name (T)"
                        focused={singleCard?.customer?.company_name || ""}
                      />
                    </div>

                    <div className="mt-3">
                      <TextField
                        className="addJobInputField"
                        label="Company Address (T)"
                        {...register("company_address")}
                        focused={singleCard?.customer?.company_address || ""}
                      />
                    </div>
                    <div className="mt-3">
                      <TextField
                        className="addJobInputField"
                        label="Vehicle User Name (T)"
                        {...register("vehicle_username")}
                        focused={singleCard?.customer?.vehicle_username || ""}
                      />
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center">
                        <Autocomplete
                          sx={{ marginRight: "2px" }}
                          className="jobCardSelect2"
                          freeSolo
                          options={countries}
                          getOptionLabel={(option) => option.label}
                          value={
                            countryCode ||
                            singleCard?.customer?.customer_country_code
                          }
                          onChange={(event, newValue) => {
                            setCountryCode(newValue);
                            setPhoneNumber("");
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Select Country Code"
                              variant="outlined"
                              {...register("customer_country_code")}
                            />
                          )}
                        />
                        <TextField
                          {...register("customer_contact")}
                          className="carRegField"
                          label=""
                          variant="outlined"
                          fullWidth
                          type="tel"
                          value={
                            phoneNumber
                              ? phoneNumber
                              : singleCard?.customer?.customer_contact
                          }
                          onChange={handlePhoneNumberChange}
                          placeholder="Customer Contact No (N)"
                          focused={singleCard?.customer?.customer_contact || ""}
                        />
                      </div>
                    </div>

                    <div className="mt-3">
                      <TextField
                        className="addJobInputField"
                        label="Driver Name (T)"
                        {...register("driver_name")}
                        focused={singleCard?.customer?.driver_name || ""}
                      />
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center">
                        <Autocomplete
                          sx={{ marginRight: "2px" }}
                          className="jobCardSelect2"
                          freeSolo
                          options={countries}
                          getOptionLabel={(option) => option.label}
                          value={
                            driverCountryCode ||
                            singleCard?.customer?.driver_country_code
                          }
                          onChange={(event, newValue) => {
                            setDriverCountryCode(newValue);
                            setPhoneNumber("");
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Select Country Code"
                              {...register("driver_country_code")}
                              variant="outlined"
                            />
                          )}
                        />
                        <TextField
                          {...register("driver_contact")}
                          className="carRegField"
                          label=""
                          variant="outlined"
                          fullWidth
                          type="tel"
                          value={
                            driverPhoneNumber
                              ? driverPhoneNumber
                              : singleCard?.customer?.driver_contact
                          }
                          onChange={handleDriverPhoneNumberChange}
                          placeholder="Driver Contact Number "
                          focused={singleCard?.customer?.driver_contact || ""}
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <TextField
                        className="addJobInputField"
                        label="Reference Name (T) "
                        {...register("reference_name")}
                        focused={singleCard?.customer?.reference_name || ""}
                      />
                    </div>
                  </div>
                ) : singleCard?.user_type === "company" ? (
                  <div>
                    <h3 className="mb-5 text-xl font-bold ">
                      Company Information{" "}
                    </h3>
                    <div>
                      <TextField
                        className="addJobInputField"
                        {...register("company_name")}
                        label="Company Name (T)"
                        focused={singleCard?.company?.company_name || ""}
                      />
                    </div>
                    <div className="mt-3">
                      <TextField
                        className="addJobInputField"
                        label="Vehicle User Name (T)"
                        {...register("vehicle_username")}
                        focused={singleCard?.company?.vehicle_username || ""}
                      />
                    </div>
                    <div className="mt-3">
                      <TextField
                        className="addJobInputField"
                        label="Company Address (T)"
                        {...register("company_address")}
                        focused={singleCard?.company?.company_address || ""}
                      />
                    </div>

                    <div className="mt-3">
                      <div className="flex items-center">
                        <Autocomplete
                          sx={{ marginRight: "2px" }}
                          className="jobCardSelect2"
                          freeSolo
                          options={countries}
                          getOptionLabel={(option) => option.label}
                          value={
                            countryCode ||
                            singleCard?.company?.company_country_code
                          }
                          onChange={(event, newValue) => {
                            setCountryCode(newValue);
                            setPhoneNumber("");
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              {...register("company_country_code")}
                              label="Select Country Code"
                              variant="outlined"
                            />
                          )}
                        />
                        <TextField
                          {...register("company_contact")}
                          className="carRegField"
                          label=""
                          variant="outlined"
                          fullWidth
                          type="tel"
                          value={
                            phoneNumber
                              ? phoneNumber
                              : singleCard?.company?.company_contact
                          }
                          onChange={handlePhoneNumberChange}
                          placeholder="Company Contact No"
                          focused={singleCard?.company?.company_contact || ""}
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <TextField
                        className="addJobInputField"
                        label="Company Email Address"
                        {...register("company_email")}
                        type="email"
                        focused={singleCard?.company?.company_email || ""}
                      />
                    </div>
                    <div className="mt-3">
                      <TextField
                        className="addJobInputField"
                        label="Driver Name (T)"
                        {...register("driver_name")}
                        focused={singleCard?.company?.driver_name || ""}
                      />
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center">
                        <Autocomplete
                          sx={{ marginRight: "2px" }}
                          className="jobCardSelect2"
                          freeSolo
                          options={countries}
                          getOptionLabel={(option) => option.label}
                          value={
                            driverCountryCode ||
                            singleCard?.company?.driver_country_code
                          }
                          onChange={(event, newValue) => {
                            setDriverCountryCode(newValue);
                            setPhoneNumber("");
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              {...register("driver_country_code")}
                              label="Select Country Code"
                              variant="outlined"
                            />
                          )}
                        />
                        <TextField
                          {...register("driver_contact")}
                          className="carRegField"
                          label=""
                          variant="outlined"
                          fullWidth
                          type="tel"
                          value={
                            driverPhoneNumber
                              ? driverPhoneNumber
                              : singleCard?.company?.driver_contact
                          }
                          onChange={handleDriverPhoneNumberChange}
                          placeholder="Driver Contact Number "
                          focused={singleCard?.company?.driver_contact || ""}
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <TextField
                        className="addJobInputField"
                        label="Reference Name (T) "
                        {...register("reference_name")}
                        focused={singleCard?.company?.reference_name || ""}
                      />
                    </div>
                  </div>
                ) : singleCard?.user_type === "showRoom" ? (
                  <div>
                    <h3 className="mb-5 text-xl font-bold ">
                      Show Room Information{" "}
                    </h3>
                    <div>
                      <TextField
                        className="addJobInputField"
                        on
                        label="Show Room Name (T)"
                        {...register("showRoom_name")}
                        focused={singleCard?.showRoom?.showRoom_name || ""}
                      />
                    </div>
                    <div className="mt-3">
                      <TextField
                        className="addJobInputField"
                        label="Vehicle User Name (T)  "
                        {...register("vehicle_username")}
                        focused={singleCard?.showRoom?.vehicle_username || ""}
                      />
                    </div>
                    <div className="mt-3">
                      <TextField
                        className="addJobInputField"
                        on
                        label="Show Room Address (T)  "
                        {...register("showRoom_address")}
                        focused={singleCard?.showRoom?.showRoom_address || ""}
                      />
                    </div>
                    <div className="mt-3">
                      <TextField
                        className="addJobInputField"
                        {...register("company_name")}
                        label="Company Name (T)"
                        focused={singleCard?.showRoom?.company_name || ""}
                      />
                    </div>

                    <div className="mt-3">
                      <TextField
                        className="addJobInputField"
                        label="Company Address (T)"
                        {...register("company_address")}
                        focused={singleCard?.showRoom?.company_address || ""}
                      />
                    </div>

                    <div className="mt-3">
                      <div className="flex items-center my-1">
                        <Autocomplete
                          className="jobCardSelect2"
                          freeSolo
                          options={countries}
                          getOptionLabel={(option) => option.label}
                          value={
                            countryCode ||
                            singleCard?.showRoom?.company_country_code
                          }
                          onChange={(event, newValue) => {
                            setCountryCode(newValue);
                            setPhoneNumber(""); // Reset the phone number when changing country codes
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              {...register("company_country_code")}
                              label="Select Country Code"
                              variant="outlined"
                            />
                          )}
                        />
                        <TextField
                          {...register("company_contact")}
                          className="carRegField"
                          label="Company Contact No (N) (new field) "
                          variant="outlined"
                          fullWidth
                          type="tel"
                          value={
                            phoneNumber || singleCard?.showRoom?.company_contact
                          }
                          onChange={handlePhoneNumberChange}
                          placeholder="Enter phone number"
                          focused={singleCard?.showRoom?.company_contact || ""}
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <TextField
                        className="addJobInputField"
                        label="Company Email Address"
                        {...register("company_email")}
                        type="email"
                        focused={singleCard?.showRoom?.company_email || ""}
                      />
                    </div>

                    <div className="mt-3">
                      <TextField
                        className="addJobInputField"
                        label="Driver Name (T)"
                        {...register("driver_name")}
                        focused={singleCard?.showRoom?.driver_name || ""}
                      />
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center">
                        <Autocomplete
                          sx={{ marginRight: "2px" }}
                          className="jobCardSelect2"
                          freeSolo
                          options={countries}
                          getOptionLabel={(option) => option.label}
                          value={
                            driverCountryCode ||
                            singleCard?.showRoom?.driver_country_code
                          }
                          onChange={(event, newValue) => {
                            setDriverCountryCode(newValue);
                            setPhoneNumber(""); // Reset the phone number when changing country codes
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              {...register("driver_country_code")}
                              label="Select Country Code"
                              variant="outlined"
                            />
                          )}
                        />
                        <TextField
                          {...register("driver_contact")}
                          className="carRegField"
                          label=""
                          variant="outlined"
                          fullWidth
                          type="tel"
                          value={
                            driverPhoneNumber
                              ? driverPhoneNumber
                              : singleCard?.showRoom?.driver_contact
                          }
                          onChange={handleDriverPhoneNumberChange}
                          placeholder="Driver Contact Number "
                          focused={singleCard?.showRoom?.driver_contact || ""}
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <TextField
                        className="addJobInputField"
                        label="Reference Name (T) "
                        {...register("reference_name")}
                        focused={singleCard?.showRoom?.reference_name || ""}
                      />
                    </div>
                  </div>
                ) : null)}
            </div>
            <div className="jobCardFieldLeftSide lg:mt-0 mt-5">
              <h3 className="mb-5 text-xl font-bold">Vehicle Information </h3>

              <div className="mb-3">
                {singleCard?.customer?.vehicles ? (
                  <Autocomplete
                    disableClearable
                    freeSolo
                    className="addJobInputField mb-3"
                    onChange={handleChassisChange}
                    options={
                      singleCard?.customer?.vehicles
                        ? singleCard?.customer?.vehicles?.map(
                            (option) => option?.chassis_no
                          )
                        : ""
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Chassis no"
                        {...register("chassis_no")}
                        inputProps={{
                          ...params.inputProps,
                          maxLength:
                            getDataWithChassisNo?.chassis_no?.length || 30,
                        }}
                      />
                    )}
                  />
                ) : (
                  <div>
                    <TextField
                      className="addJobInputField"
                      {...register("chassis_no")}
                      label="Chassis no"
                      focused={getDataWithChassisNo?.chassis_no || ""}
                    />
                  </div>
                )}
              </div>

              <div className="flex  md:gap-0 gap-4 items-center">
                <Autocomplete
                  sx={{ marginRight: "5px" }}
                  freeSolo
                  className="jobCardSelect2"
                  id="free-solo-demo"
                  inputValue={inputValue}
                  onInputChange={(event, newValue) => setInputValue(newValue)}
                  options={cmDmOptions.map((option) => option?.label)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Vehicle Reg No"
                      {...register("carReg_no")}
                      focused={getDataWithChassisNo?.carReg_no || ""}
                    />
                  )}
                />

                <InputMask
                  mask="**-****"
                  maskChar={null}
                  {...register("car_registration_no")}
                >
                  {(inputProps) => (
                    <TextField
                      {...inputProps}
                      {...register("car_registration_no")}
                      className="carRegField"
                      label="Car R (N)"
                      focused={getDataWithChassisNo?.car_registration_no || ""}
                    />
                  )}
                </InputMask>
              </div>

              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  {...register("engine_no")}
                  label="ENGINE NO & CC (T&N) "
                  focused={getDataWithChassisNo?.engine_no || ""}
                />
              </div>

              <div className="mt-3">
                <Autocomplete
                  className="addJobInputField"
                  freeSolo
                  onInputChange={(event, newValue) => {
                    handleBrandChange(newValue);
                  }}
                  options={carBrands.map((option) => option.label)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Vehicle Brand"
                      {...register("vehicle_brand")}
                      focused={Boolean(getDataWithChassisNo?.vehicle_brand)}
                    />
                  )}
                  onChange={handleBrandChange}
                  value={selectedBrand}
                  style={{ marginBottom: 20 }}
                />
              </div>

              <div className="mt-3">
                <Autocomplete
                  className="addJobInputField"
                  freeSolo
                  Vehicle
                  Name
                  options={filteredVehicles.map((option) => option.value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Vehicle Name "
                      {...register("vehicle_name")}
                      focused={getDataWithChassisNo?.vehicle_name || ""}
                    />
                  )}
                  getOptionLabel={(option) => option || ""}
                />
              </div>

              <div className="mt-3 relative">
                <input
                  value={yearSelectInput}
                  onInput={handleYearSelectInput}
                  {...register("vehicle_model")}
                  type="text"
                  className="border border-[#11111163] mb-5 w-[98%] h-12 p-3 rounded-md"
                  placeholder="Vehicle Model"
                  defaultValue={getDataWithChassisNo?.vehicle_model}
                  // focused={getDataWithChassisNo?.vehicle_model}
                />
                {yearSelectInput && (
                  <ul className="options-list">
                    {filteredOptions.map((option, index) => (
                      <li key={index} onClick={() => handleOptionClick(option)}>
                        {option.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div>
                <Autocomplete
                  className="addJobInputField"
                  id="free-solo-demo"
                  Vehicle
                  Types
                  freeSolo
                  options={vehicleTypes.map((option) => option.label)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label=" Vehicle Categories "
                      {...register("vehicle_category")}
                      focused={getDataWithChassisNo?.vehicle_category || ""}
                    />
                  )}
                />
              </div>

              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  {...register("color_code")}
                  label="Color & Code (T&N) "
                  focused={getDataWithChassisNo?.color_code || ""}
                />
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Mileage (N) "
                  {...register("mileage", {
                    // required: "This field is required.",
                    pattern: {
                      value: /^\d+$/,
                      message: "Please enter a valid number.",
                    },
                  })}
                  focused={getDataWithChassisNo?.mileage || ""}
                />
                {errors.mileage && (
                  <span className="text-sm text-red-400">
                    {errors.mileage.message}
                  </span>
                )}
              </div>
              <div className="mt-3">
                <Autocomplete
                  className="addJobInputField"
                  id="free-solo-demo"
                  Fuel
                  Type
                  freeSolo
                  options={fuelType.map((option) => option.label)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label=" Fuel Type"
                      {...register("fuel_type")}
                      focused={getDataWithChassisNo?.fuel_type || ""}
                    />
                  )}
                />
              </div>
            </div>
          </div>

          <div className="mt-10 vehicleReport">
            <div className="vehicleReportLeftSide">
              <div className=" vehicleTextField">
                <b className="block mb-3">
                  {" "}
                  Vehicle Interior Parts, Papers, Tools, Meter Light & Others{" "}
                </b>
                <ReactQuill
                  value={value || vehicleInterior}
                  className="textEditor"
                  onChange={setValue}
                  modules={{
                    toolbar: [
                      [{ font: [] }],
                      [{ size: ["small", false, "large", "huge"] }],
                      [{ header: [1, 2, 3, 4, 5, 6, false] }],
                      [{ color: [] }, { background: [] }],
                      [{ align: [] }],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["bold", "italic", "underline"],
                      [{ align: [] }],
                      ["link", "image"],
                      ["video"],
                      ["clean"],
                      ["blockquote", "code-block"],
                      ["direction"],
                      ["formula"],
                      ["strike"],
                    ],
                  }}
                />
              </div>
              <div className="mt-5">
                <b className="block mb-1"> Reported Defect </b>
                <ReactQuill
                  value={value2 || reportedDefect}
                  className="textEditor"
                  onChange={setValue2}
                  modules={{
                    toolbar: [
                      [{ font: [] }],
                      [{ size: ["small", false, "large", "huge"] }],
                      [{ header: [1, 2, 3, 4, 5, 6, false] }],
                      [{ color: [] }, { background: [] }],
                      [{ align: [] }],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["bold", "italic", "underline"],
                      [{ align: [] }],
                    ],
                  }}
                />
              </div>
              <div className="mt-5">
                <b className="block mb-1"> Reported Action </b>
                <ReactQuill
                  value={value3 || reportedAction}
                  className="textEditor"
                  onChange={setValue3}
                  modules={{
                    toolbar: [
                      [{ font: [] }],
                      [{ size: ["small", false, "large", "huge"] }],
                      [{ header: [1, 2, 3, 4, 5, 6, false] }],
                      [{ color: [] }, { background: [] }],
                      [{ align: [] }],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["bold", "italic", "underline"],
                      [{ align: [] }],
                    ],
                  }}
                />
              </div>
            </div>
            <div className="vehicleReportRightSide">
              <b htmlFor="" className="block mb-3">
                {" "}
                Vehicle Body Report (Mark with X where damage )
              </b>
              <div className="mt-2 imgWrap">
                <img src={car} alt="car" />
              </div>
              <div className="mt-3">
                <b className="block mb-1 "> Note </b>
                <textarea
                  // onChange={(e) => setNote(e.target.value)}
                  autoComplete="off"
                  {...register("note")}
                ></textarea>
              </div>
              <div className="mt-3">
                <b className="block mb-1 "> Vehicle Body Report Comments</b>
                <textarea
                  // onChange={(e) => setVehicleBody(e.target.value)}
                  autoComplete="off"
                  className="p-5"
                  {...register("vehicle_body_report")}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between mt-5 mb-10">
            <div>
              <TextField
                className="ownerInput"
                {...register("technician_name")}
                label="Technician Name (T) "
                focused={singleCard?.technician_name || ""}
              />
              <br />
            </div>
            <div>
              <TextField
                disabled
                className="ownerInput"
                {...register("technician_signature")}
                label="Technician Signature (T) "
              />
            </div>
            <div className=" cursor-pointer">
              {techDateChange ? (
                <input
                  onChange={handleTechnicianDateChange}
                  autoComplete="off"
                  type="date"
                  placeholder="Date"
                  min={currentDate}
                  className="p-3 border-2 rounded-md ownerInput"
                  defaultValue={singleCard?.technician_date}
                />
              ) : (
                <button
                  onClick={() => setTechDateChange(!techDateChange)}
                  className="p-3 border-2 rounded-md ownerInput lg:w-36"
                >
                  {singleCard.technician_date}
                </button>
              )}
            </div>
            <div>
              <TextField
                disabled
                className="ownerInput"
                {...register("vehicle_owner")}
                label="Vehicle Owner (T) "
              />
            </div>
          </div>

          <div className="mt-3">
            <b>This is not an invoice, all estimates are valid for 30 days </b>
          </div>

          <div className="mt-5 buttonGroup">
            <div>
              <Button>Preview</Button>
              <Button>Print</Button>
              <Button>Download</Button>

              <Button>Quotation</Button>

              <Button>Invoice</Button>
            </div>
          </div>

          <div className="mt-12">
            <button
              disabled={updateJobCardLoading}
              type="submit"
              className="addJobBtn"
            >
              Update Job Card
            </button>
          </div>
          <div className="my-2">
            {jobCardUpdateError && (
              <ErrorMessage messages={jobCardUpdateError?.data?.errorSources} />
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateJobCard;
