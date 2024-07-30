/* eslint-disable no-unused-vars */

import "./AddJobCard.css";
import car from "../../../../public/assets/car2.jpeg";
import logo from "../../../../public/assets/logo.png";
import swal from "sweetalert";
import { useEffect, useRef, useState } from "react";
import {
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  TextField,
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import InputMask from "react-input-mask";
import { Link, useNavigate } from "react-router-dom";
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
import {
  HiOutlineChevronDown,
  HiOutlinePlus,
  HiOutlineSearch,
} from "react-icons/hi";

import TrustAutoAddress from "../../../components/TrustAutoAddress/TrustAutoAddress";
import { useGetAllCustomersQuery } from "../../../redux/api/customerApi";
import { useGetAllCompaniesQuery } from "../../../redux/api/companyApi";
import { useGetAllShowRoomsQuery } from "../../../redux/api/showRoomApi";
import {
  useCreateJobCardMutation,
  useDeleteJobCardMutation,
  useGetAllJobCardsQuery,
} from "../../../redux/api/jobCard";
import { ErrorMessage } from "../../../components/error-message";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";

const AddJobCard = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [idType, setIdType] = useState(null);
  const [showId, setShowId] = useState([]);
  const [userId, setUserId] = useState(null);
  const [newId, setNewId] = useState("customer");

  // const [showCustomerData, setShowCustomerData] = useState({});

  const [inputValue, setInputValue] = useState("");

  // country code
  const [countryCode, setCountryCode] = useState(countries[0]);
  const [driverCountryCode, setDriverCountryCode] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [driverPhoneNumber, setDriverPhoneNumber] = useState("");

  const [note, setNote] = useState(null);
  const [vehicleBody, setVehicleBody] = useState(null);
  const [clickControl, setClickControl] = useState(null);

  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");

  const [selectedBrand, setSelectedBrand] = useState("");
  const [filteredVehicles, setFilteredVehicles] = useState([]);

  const [filteredOptions, setFilteredOptions] = useState([]);
  const [yearSelectInput, setYearSelectInput] = useState("");
  const [technicianDate, setTechnicianDate] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const [filterType, setFilterType] = useState("");

  const [getDataWithChassisNo, setGetDataWithChassisNo] = useState("");
  const [getDataWithId, setGetDataWithId] = useState({});

  const formRef = useRef();
  const textInputRef = useRef(null);
  const navigate = useNavigate();
  const limit = 10;
  const jobCardLimit = 5000;

  const {
    register,
    handleSubmit,
    reset,
    setValue: setVModelValue,
    formState: { errors },
  } = useForm();

  const [
    createJobCard,
    { isLoading: createJobCardLoading, error: jobCardCreateError },
  ] = useCreateJobCardMutation();

  const [deleteJobCard, { isLoading: deleteLoading }] =
    useDeleteJobCardMutation();

  const { data: customerData, isLoading: customerLoading } =
    useGetAllCustomersQuery({
      limit: jobCardLimit,
      page: currentPage,
    });
  const { data: companyData, isLoading: companyLoading } =
    useGetAllCompaniesQuery({ limit: jobCardLimit, page: currentPage });
  const { data: showroomData, isLoading: showroomLoading } =
    useGetAllShowRoomsQuery({ limit: jobCardLimit, page: currentPage });

  const { data: allJobCards, isLoading: jobCardLoading } =
    useGetAllJobCardsQuery({
      limit,
      page: currentPage,
      searchTerm: filterType,
    });

  const lastJobCard = allJobCards?.data?.jobCards
    ? [...allJobCards.data.jobCards].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )[0]
    : null;

  const jobNumber =
    (Number(lastJobCard?.job_no) && !isNaN(Number(lastJobCard.job_no))
      ? Number(lastJobCard.job_no)
      : 0) + 1;

  const paddedJobNumber = jobNumber.toString().padStart(4, "0");

  useEffect(() => {
    if (getDataWithId && newId === "customer") {
      reset({
        company_name: getDataWithId?.company_name,
        vehicle_username: getDataWithId?.vehicle_username,
        company_address: getDataWithId?.company_address,
        customer_name: getDataWithId?.customer_name,
        customer_country_code: getDataWithId?.customer_country_code,
        customer_contact: phoneNumber || getDataWithId?.customer_contact,
        customer_email: getDataWithId?.customer_email,
        customer_address: getDataWithId?.customer_address,
        driver_name: getDataWithId?.driver_name,
        driver_country_code: getDataWithId?.driver_country_code,
        driver_contact: driverPhoneNumber || getDataWithId?.driver_contact,
        reference_name: getDataWithId?.reference_name,

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
    if (getDataWithId && newId === "company") {
      reset({
        company_name: getDataWithId?.company_name,
        vehicle_username: getDataWithId?.vehicle_username,
        company_address: getDataWithId?.company_address,
        company_contact: getDataWithId?.company_contact,
        company_country_code: getDataWithId?.company_country_code,
        company_email: getDataWithId?.company_email,
        customer_address: getDataWithId?.customer_address,

        driver_name: getDataWithId?.driver_name,
        driver_country_code: getDataWithId?.driver_country_code,
        driver_contact: driverPhoneNumber || getDataWithId?.driver_contact,
        reference_name: getDataWithId?.reference_name,

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
    if (getDataWithId && newId === "showRoom") {
      reset({
        showRoom_name: getDataWithId?.showRoom_name,
        vehicle_username: getDataWithId?.vehicle_username,
        showRoom_address: getDataWithId?.showRoom_address,
        company_name: getDataWithId?.company_name,
        company_contact: phoneNumber || getDataWithId?.company_contact,
        company_country_code: getDataWithId?.company_country_code,
        company_email: getDataWithId?.company_email,
        company_address: getDataWithId?.company_address,
        driver_name: getDataWithId?.driver_name,
        driver_country_code: getDataWithId?.driver_country_code,
        driver_contact: driverPhoneNumber || getDataWithId?.driver_contact,
        reference_name: getDataWithId?.reference_name,

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
  }, [
    customerData,
    reset,
    phoneNumber,
    driverPhoneNumber,
    getDataWithChassisNo?.carReg_no,
    getDataWithChassisNo?.car_registration_no,
    getDataWithChassisNo?.engine_no,
    getDataWithChassisNo?.vehicle_brand,
    getDataWithChassisNo?.vehicle_name,
    getDataWithChassisNo?.vehicle_model,
    getDataWithChassisNo?.vehicle_category,
    getDataWithChassisNo?.color_code,
    getDataWithChassisNo?.mileage,
    getDataWithChassisNo?.fuel_type,
    getDataWithId,
    newId,
    userId,
  ]);

  useEffect(() => {
    if (!getDataWithId) {
      formRef.current.reset();
    }
  }, [getDataWithId]);

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
    if (!newId) {
      return toast.error("Please add your Id.");
    }

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
      Id: userId,
      job_no: lastJobCard?.job_no,
      user_type: newId,
      date: formattedDate,
      vehicle_interior_parts: value,
      reported_defect: value2,
      reported_action: value3,
      note: note,
      vehicle_body_report: vehicleBody,
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

    const res = await createJobCard(newCard).unwrap();

    if (res.success) {
      toast.success(res.message);
      if (clickControl === "preview") {
        navigate(`/dashboard/preview?id=${res?.data?._id}`);
      }
      if (clickControl === "quotation") {
        navigate(`/dashboard/qutation?order_no=${res?.data?.job_no}`);
      }
      if (clickControl === "invoice") {
        navigate(`/dashboard/invoice?order_no=${res?.data?.job_no}`);
      }
      if (clickControl === null) {
        navigate("/dashboard/jobcard-list");
      }
    }
  };

  const handleBrandChange = (event, newValue) => {
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

  // get id
  const getIdWithIdType = (userType) => {
    setIdType(userType);
    setNewId(userType);

    console.log({ userType });

    switch (userType) {
      case "customer":
        setShowId(
          customerData?.data?.customers?.map((option) => option.customerId)
        );

        break;
      case "company":
        setShowId(
          companyData?.data?.companies?.map((option) => option.companyId)
        );

        break;
      case "showRoom":
        setShowId(
          showroomData?.data?.showrooms?.map((option) => option.showRoomId)
        );
        break;
      default:
        toast.error("Invalid id type");
    }
  };

  const handleIconPreview = async (e) => {
    navigate(`/dashboard/preview?id=${e}`);
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

  const deletePackage = async (id) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this card?",
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      try {
        await deleteJobCard(id).unwrap();

        swal("Deleted!", "Card delete successful.", "success");
      } catch (error) {
        swal("Error", "An error occurred while deleting the card.", "error");
      }
    }
  };

  const handleIdChange = (_, newValue) => {
    setUserId(newValue);

    if (newId === "customer") {
      const filtered = customerData?.data?.customers?.find(
        (customer) => customer.customerId === newValue
      );

      setGetDataWithId(filtered);
    } else if (newId === "company") {
      const filtered = companyData?.data?.companies?.find(
        (company) => company.companyId === newValue
      );

      setGetDataWithId(filtered);
    } else if (newId === "showRoom") {
      const filtered = showroomData?.data?.showrooms?.find(
        (showroom) => showroom.showRoomId === newValue
      );

      setGetDataWithId(filtered);
    } else {
      setGetDataWithId({});
    }
  };

  const handleChassisChange = (_, newValue) => {
    if (getDataWithId?.vehicles) {
      const filtered = getDataWithId?.vehicles?.find(
        (vehicle) => vehicle.chassis_no === newValue
      );
      setGetDataWithChassisNo(filtered);
    }
  };

  const currentDate = new Date().toISOString().split("T")[0];

  const handleAllJobCard = () => {
    setFilterType("");
    if (textInputRef.current) {
      textInputRef.current.value = "";
    }
  };

  if (customerLoading || companyLoading || showroomLoading || jobCardLoading) {
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
                <span> {paddedJobNumber}</span>
              </div>
              <div>
                <span>
                  {idType === "company" && <b>Company Id :</b>}
                  {idType === "customer" && <b>Customer Id :</b>}
                  {idType === "showRoom" && <b>Show room Id :</b>}
                  {idType === null && <b>Select Id :</b>}

                  {userId ? userId : "....."}
                </span>
              </div>
              <div className="flex items-center mt-2">
                <FormControl sx={{ m: 1, minWidth: 170 }} size="small">
                  <InputLabel id="demo-select-small-label">
                    Select Customer
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    className="py-1"
                    label="Select Customer"
                    // onChange={(e) => setNewId(e.target.value)}
                    onChange={(e) => getIdWithIdType(e.target.value)}
                  >
                    <MenuItem value="company">Company ID </MenuItem>
                    <MenuItem value="customer">Customer ID</MenuItem>
                    <MenuItem value="showRoom">Show Room ID </MenuItem>
                  </Select>
                </FormControl>

                <Autocomplete
                  className="w-40 "
                  id="free-solo-demo"
                  options={showId.map((option) => option)}
                  onChange={handleIdChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Id"
                      // onChange={(e) => handleIdChange(e.target.value)}
                      className="w-40"
                    />
                  )}
                />
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
                  <input
                    className="outline-none curs"
                    onChange={handleDateChange}
                    autoComplete="off"
                    type="date"
                    placeholder="Date"
                    max={currentDate}
                    defaultValue={
                      currentDate
                      // formattedDate ? formatDate(formattedDate) : currentDate
                    }
                  />
                </div>

                <div className="addCustomerRelative">
                  <div className="flex items-center w-40 h-10 mt-2 p-2 rounded-sm bg-[#42A1DA] text-white">
                    <p>Add Customer </p>
                    <HiOutlineChevronDown className="ml-1" size={20} />
                  </div>
                  <div className="space-y-2 addCustomerDropDown ">
                    <Link to="/dashboard/add-customer">
                      {" "}
                      <span className="flex items-center">
                        <HiOutlinePlus size={20} /> Add Customer{" "}
                      </span>
                    </Link>
                    <Link to="/dashboard/add-company">
                      {" "}
                      <span className="flex items-center">
                        <HiOutlinePlus size={20} /> Add Company{" "}
                      </span>
                    </Link>

                    <Link to="/dashboard/add-show-room">
                      {" "}
                      <span className="flex items-center">
                        <HiOutlinePlus size={20} /> Add Show Room{" "}
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="jobCardFieldWraps">
            <div className="jobCardFieldRightSide">
              {newId &&
                (newId === "customer" ? (
                  <div>
                    <h3 className="mb-5 text-xl font-bold ">
                      Customer Information{" "}
                    </h3>
                    <div>
                      <TextField
                        className="addJobInputField"
                        label="Customer Name (T)"
                        {...register("customer_name")}
                        focused={getDataWithId?.customer_name || ""}
                      />
                    </div>
                    <div className="mt-3">
                      <TextField
                        className="addJobInputField"
                        label="Customer Email Address (T)"
                        {...register("customer_email")}
                        type="email"
                        focused={getDataWithId?.customer_email || ""}
                      />
                    </div>
                    <div className="mt-3">
                      <TextField
                        className="addJobInputField"
                        label="Customer Address (T) "
                        {...register("customer_address")}
                        focused={getDataWithId?.customer_address || ""}
                      />
                    </div>
                    <div className="mt-3">
                      <TextField
                        className="addJobInputField"
                        {...register("company_name")}
                        label="Company Name (T)"
                        focused={getDataWithId?.company_name || ""}
                      />
                    </div>

                    <div className="mt-3">
                      <TextField
                        className="addJobInputField"
                        label="Company Address (T)"
                        {...register("company_address")}
                        focused={getDataWithId?.company_address || ""}
                      />
                    </div>
                    <div className="mt-3">
                      <TextField
                        className="addJobInputField"
                        label="Vehicle User Name (T)"
                        {...register("vehicle_username")}
                        focused={getDataWithId?.vehicle_username || ""}
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
                            countryCode || getDataWithId?.customer_country_code
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
                              : getDataWithId?.customer_contact
                          }
                          onChange={handlePhoneNumberChange}
                          placeholder="Customer Contact No (N)"
                          focused={getDataWithId?.customer_contact || ""}
                        />
                      </div>
                    </div>

                    <div className="mt-3">
                      <TextField
                        className="addJobInputField"
                        label="Driver Name (T)"
                        {...register("driver_name")}
                        focused={getDataWithId?.driver_name || ""}
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
                            getDataWithId?.driver_country_code
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
                              : getDataWithId?.driver_contact
                          }
                          onChange={handleDriverPhoneNumberChange}
                          placeholder="Driver Contact Number "
                          focused={getDataWithId?.driver_contact || ""}
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <TextField
                        className="addJobInputField"
                        label="Reference Name (T) "
                        {...register("reference_name")}
                        focused={getDataWithId?.reference_name || ""}
                      />
                    </div>
                  </div>
                ) : newId === "company" ? (
                  <div>
                    <h3 className="mb-5 text-xl font-bold ">
                      Company Information{" "}
                    </h3>
                    <div>
                      <TextField
                        className="addJobInputField"
                        {...register("company_name")}
                        label="Company Name (T)"
                        focused={getDataWithId?.company_name || ""}
                      />
                    </div>
                    <div className="mt-3">
                      <TextField
                        className="addJobInputField"
                        label="Vehicle User Name (T)"
                        {...register("vehicle_username")}
                        focused={getDataWithId?.vehicle_username || ""}
                      />
                    </div>
                    <div className="mt-3">
                      <TextField
                        className="addJobInputField"
                        label="Company Address (T)"
                        {...register("company_address")}
                        focused={getDataWithId?.company_address || ""}
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
                            countryCode || getDataWithId?.company_country_code
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
                              : getDataWithId?.company_contact
                          }
                          onChange={handlePhoneNumberChange}
                          placeholder="Company Contact No"
                          focused={getDataWithId?.company_contact || ""}
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <TextField
                        className="addJobInputField"
                        label="Company Email Address"
                        {...register("company_email")}
                        type="email"
                        focused={getDataWithId?.company_email || ""}
                      />
                    </div>
                    <div className="mt-3">
                      <TextField
                        className="addJobInputField"
                        label="Driver Name (T)"
                        {...register("driver_name")}
                        focused={getDataWithId?.driver_name || ""}
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
                            getDataWithId?.driver_country_code
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
                              : getDataWithId?.driver_contact
                          }
                          onChange={handleDriverPhoneNumberChange}
                          placeholder="Driver Contact Number "
                          focused={getDataWithId?.driver_contact || ""}
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <TextField
                        className="addJobInputField"
                        label="Reference Name (T) "
                        {...register("reference_name")}
                        focused={getDataWithId?.reference_name || ""}
                      />
                    </div>
                  </div>
                ) : newId === "showRoom" ? (
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
                        focused={getDataWithId?.showRoom_name || ""}
                      />
                    </div>
                    <div className="mt-3">
                      <TextField
                        className="addJobInputField"
                        label="Vehicle User Name (T)  "
                        {...register("vehicle_username")}
                        focused={getDataWithId?.vehicle_username || ""}
                      />
                    </div>
                    <div className="mt-3">
                      <TextField
                        className="addJobInputField"
                        on
                        label="Show Room Address (T)  "
                        {...register("showRoom_address")}
                        focused={getDataWithId?.showRoom_address || ""}
                      />
                    </div>
                    <div className="mt-3">
                      <TextField
                        className="addJobInputField"
                        {...register("company_name")}
                        label="Company Name (T)"
                        focused={getDataWithId?.company_name || ""}
                      />
                    </div>

                    <div className="mt-3">
                      <TextField
                        className="addJobInputField"
                        label="Company Address (T)"
                        {...register("company_address")}
                        focused={getDataWithId?.company_address || ""}
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
                            countryCode || getDataWithId?.company_country_code
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
                          value={phoneNumber || getDataWithId?.company_contact}
                          onChange={handlePhoneNumberChange}
                          placeholder="Enter phone number"
                          focused={getDataWithId?.company_contact || ""}
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <TextField
                        className="addJobInputField"
                        label="Company Email Address"
                        {...register("company_email")}
                        type="email"
                        focused={getDataWithId?.company_email || ""}
                      />
                    </div>

                    <div className="mt-3">
                      <TextField
                        className="addJobInputField"
                        label="Driver Name (T)"
                        {...register("driver_name")}
                        focused={getDataWithId?.driver_name || ""}
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
                            getDataWithId?.driver_country_code
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
                              : getDataWithId?.driver_contact
                          }
                          onChange={handleDriverPhoneNumberChange}
                          placeholder="Driver Contact Number "
                          focused={getDataWithId?.driver_contact || ""}
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <TextField
                        className="addJobInputField"
                        label="Reference Name (T) "
                        {...register("reference_name")}
                        focused={getDataWithId?.reference_name || ""}
                      />
                    </div>
                  </div>
                ) : null)}
            </div>
            <div className="jobCardFieldLeftSide lg:mt-0 mt-5">
              <h3 className="mb-5 text-xl font-bold">Vehicle Information </h3>

              <div className="mb-3">
                {getDataWithId?.vehicles ? (
                  <Autocomplete
                    disableClearable
                    freeSolo
                    className="addJobInputField mb-3"
                    onChange={handleChassisChange}
                    options={
                      getDataWithId?.vehicles
                        ? getDataWithId?.vehicles?.map(
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
                        required
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
                      required
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
                  value={value}
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
                  value={value2}
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
                  value={value3}
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
                  onChange={(e) => setNote(e.target.value)}
                  autoComplete="off"
                ></textarea>
              </div>
              <div className="mt-3">
                <b className="block mb-1 "> Vehicle Body Report Comments</b>
                <textarea
                  onChange={(e) => setVehicleBody(e.target.value)}
                  autoComplete="off"
                  className="p-5"
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
              />
              <br />
              {errors.technician_name && (
                <span className="text-sm text-red-400">
                  This field is required.
                </span>
              )}
            </div>
            <div>
              <TextField
                disabled
                className="ownerInput"
                o
                {...register("technician_signature")}
                label="Technician Signature (T) "
              />
            </div>
            <div>
              <input
                onChange={handleTechnicianDateChange}
                autoComplete="off"
                type="date"
                placeholder="Date"
                min={currentDate}
                className="p-3 border-2 ownerInput"
              />
              {errors.technician_date && (
                <span className="text-sm text-red-400">
                  This field is required.
                </span>
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
              <button
                disabled={createJobCardLoading}
                onClick={() => setClickControl("preview")}
              >
                Preview
              </button>
              <button
               
              >
                Print
              </button>
              <button
               
              >
                Download
              </button>

              <button
                disabled={createJobCardLoading}
                onClick={() => setClickControl("quotation")}
              >
                Quotation
              </button>

              <button
                disabled={createJobCardLoading}
                onClick={() => setClickControl("invoice")}
              >
                Invoice
              </button>
            </div>
            <div>
              <Button disabled={createJobCardLoading} type="submit">
                Add To Job Card
              </Button>
            </div>
          </div>
          <div className="my-2">
            {jobCardCreateError && (
              <ErrorMessage messages={jobCardCreateError?.data?.errorSources} />
            )}
          </div>
        </div>
      </form>
      <div className="w-full mt-5 mb-24">
        <div className="flex flex-wrap items-center justify-between mb-5">
          <h3 className="txt-center tet-sm ml- sm:ml-0 ont-bold md:text-3xl">
            {" "}
            Job card List:{" "}
          </h3>
          <div className="flex flex-wrap items-center">
            <button
              onClick={handleAllJobCard}
              className="bg-[#42A1DA] text-white px-4 py-2 rounded-md mr-1"
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
            <button
              className="bg-[#42A1DA] text-white px-2 py-2 rounded-md ml-1"
              disabled={filterType === ""}
            >
              {" "}
              <HiOutlineSearch size={25} />
            </button>
          </div>
        </div>
        {jobCardLoading ? (
          <div className="flex items-center justify-center text-xl">
            <Loading />
          </div>
        ) : (
          <div>
            {allJobCards?.data?.jobCards?.length === 0 ? (
              <div className="flex items-center justify-center h-full text-xl text-center">
                No matching card found.
              </div>
            ) : (
              <section>
                <table className="table">
                  <thead className="tableWrap">
                    <tr>
                      <th>SL No</th>
                      <th> User Id</th>
                      <th>Order Number </th>
                      <th>User type</th>
                      <th>Mobile Number</th>
                      <th>Date</th>
                      <th colSpan={3}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allJobCards?.data?.jobCards?.map((card, index) => {
                      //  console.log(card)

                      return (
                        <tr key={card?._id}>
                          <td>{index + 1}</td>
                          <td>{card?.Id}</td>
                          <td>{card?.job_no}</td>
                          {/* <td>{lastVehicle?.fullRegNum}</td> */}
                          <td>{card?.user_type}</td>

                          {card?.customer?.length !== 0 && (
                            <td>{card?.customer[0]?.fullCustomerNum}</td>
                          )}
                          {card?.company?.length !== 0 && (
                            <td>{card?.company[0]?.fullCompanyNum}</td>
                          )}
                          {card?.showRoom.length !== 0 && (
                            <td>{card?.showRoom[0]?.fullCompanyNum}</td>
                          )}
                          <td>{card?.date}</td>

                          <td>
                            <div
                              onClick={() => handleIconPreview(card._id)}
                              className="flex items-center justify-center cursor-pointer"
                            >
                              <FaEye className="h-[22px] w-[22px]" />
                            </div>
                          </td>

                          <td>
                            <div className="editIconWrap edit">
                              <Link
                                to={`/dashboard/update-jobcard?id=${card._id}`}
                              >
                                <FaEdit className="editIcon" />
                              </Link>
                            </div>
                          </td>
                          <td>
                            <button
                              disabled={deleteLoading}
                              onClick={() => deletePackage(card?._id)}
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
        {allJobCards?.data?.jobCards?.length > 0 && (
          <div className="flex justify-center mt-4">
            <Pagination
              count={allJobCards?.data?.meta?.totalPages}
              page={currentPage}
              color="primary"
              onChange={(_, page) => setCurrentPage(page)}
            />
          </div>
        )}
      </div>
      {/* <div className="mt-20 overflow-x-auto">
        <div className="flex flex-wrap items-center justify-between mb-5">
          <h3 className="mb-3 text-sm font-bold lg:text-3xl">Job Card List:</h3>
          <div className="flex items-center searcList space-x-2">
            <div className="searchGroup space-x-2">
              <Button
                sx={{ background: "#42A1DA" }}
                onClick={handleAllAddToJobCard}
                className=""
              >
                All{" "}
              </Button>
              <input
                onChange={(e) => setFilterType(e.target.value)}
                autoComplete="off"
                type="text"
                placeholder="Search"
              />
            </div>
            <Button
              sx={{ background: "#42A1DA" }}
              onClick={handleFilterType}
              className="SearchBtn "
            >
              Search{" "}
            </Button>
          </div>
        </div>
      </div>

      {searchLoading ? (
        <div className="flex items-center justify-center text-xl">
          <Loading />
        </div>
      ) : (
        <div>
          {allJobCard?.length === 0 ||
          currentItems.length === 0 ||
          noMatching ? (
            <div className="flex items-center justify-center h-full text-xl text-center">
              No matching card found.
            </div>
          ) : (
            <>
              <section>
                {renderData(currentItems)}
                <ul
                  className={
                    minPageNumberLimit < 5
                      ? "flex justify-center gap-2 md:gap-4 pb-5 mt-6"
                      : "flex justify-center gap-[5px] md:gap-2 pb-5 mt-6"
                  }
                >
                  <button
                    onClick={handlePrevious}
                    disabled={currentPage === pages[0] ? true : false}
                    className={
                      currentPage === pages[0]
                        ? "text-gray-600"
                        : "text-gray-300"
                    }
                  >
                    Previous
                  </button>
                  <span
                    className={minPageNumberLimit < 5 ? "hidden" : "inline"}
                  >
                    {pageDecrementBtn}
                  </span>
                  {renderPagesNumber}
                  {pageIncrementBtn}
                  <button
                    onClick={handleNext}
                    disabled={
                      currentPage === pages[pages?.length - 1] ? true : false
                    }
                    className={
                      currentPage === pages[pages?.length - 1]
                        ? "text-gray-700"
                        : "text-gray-300 pl-1"
                    }
                  >
                    Next
                  </button>
                </ul>
              </section>
            </>
          )}
        </div>
      )} */}
    </div>
  );
};

export default AddJobCard;
