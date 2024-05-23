/* eslint-disable no-unused-vars */
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../../public/assets/logo.png";
import {
  FaTrashAlt,
  FaEdit,
  FaArrowRight,
  FaArrowLeft,
  FaEye,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading/Loading";
import { Autocomplete, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

import { formatDate } from "../../../utils/formateDate";
import TADatePickers from "../../../components/form/TADatePickers";
import { countries } from "../../../constant";

const AddQuotation = () => {
  const [select, setSelect] = useState(null);

  const location = useLocation();
  const serial_no = new URLSearchParams(location.search).get("serial_no");
  const navigate = useNavigate();
  const [job_no, setJob_no] = useState(serial_no);
  const [jobCardData, setJobCardData] = useState({});

  const [error, setError] = useState("");
  const [postError, setPostError] = useState("");
  const [registrationError, setRegistrationError] = useState("");

  const [getAllQuotation, setGetAllQuotation] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [noMatching, setNoMatching] = useState(null);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [jobLoading, setJobLoading] = useState(false);

  const [customerId, setCustomerId] = useState(null);

  const [preview, setPreview] = useState("");

  const [selectedDate, setSelectedDate] = useState("");

  const [items, setItems] = useState([
    { description: "", quantity: "", rate: "", total: "" },
  ]);

  // for customer id edit
  const handleInputChange = (e) => {
    const newId = e.target.value;
    console.log("New ID:", newId); // Log the input for debugging
    setJobCardData({ ...jobCardData, Id: newId });
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (job_no) {
      setJobLoading(true);
      fetch(`${import.meta.env.VITE_API_URL}/api/v1/jobCard/invoice/${job_no}`)
        .then((res) => res.json())
        .then((data) => {
          setJobCardData(data);
          setJobLoading(false);
        });
    }
  }, [job_no]);

  const handleDateChange = (newDate) => {
    setSelectedDate(formatDate(newDate));
  };

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

  const [grandTotal, setGrandTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [vat, setVAT] = useState(0);

  useEffect(() => {
    const totalSum = items.reduce((sum, item) => sum + Number(item.total), 0);

    // Limiting totalSum to two decimal places
    const roundedTotalSum = parseFloat(totalSum.toFixed(2));

    setGrandTotal(roundedTotalSum);
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

    // Convert rate to a number
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
    finalTotal = parseFloat(finalTotal.toFixed(2));
    return finalTotal;
  };

  const onSubmit = async (data) => {
    if (!jobCardData.Id) {
      return toast.error("No account found.");
    }
    try {
      const values = {
        username: jobCardData.username || data.username,
        Id: customerId || jobCardData.Id,
        job_no: job_no || jobCardData.job_no,
        date: selectedDate || jobCardData.date,

        company_name: data.company_name || jobCardData.company_name,
        customer_name: data.customer_name || jobCardData.customer_name,
        customer_contact: data.customer_contact || jobCardData.customer_contact,
        customer_address: data.customer_address || jobCardData.customer_address,

        car_registration_no:
          data.car_registration_no || jobCardData.car_registration_no,
        chassis_no: data.chassis_no || jobCardData.chassis_no,
        engine_no: data.engine_no || jobCardData.engine_no,
        vehicle_name: data.vehicle_name || jobCardData.vehicle_name,
        mileage: data.mileage || jobCardData.mileage,

        total_amount: grandTotal,
        discount: discount,
        vat: vat,
        net_total: calculateFinalTotal(),
        input_data: items,
      };
      console.log(values)

      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/quotation`,
        values
      );

      if (response.data.message === "Successfully quotation post") {
        setPostError("");
        setError("");

        if (preview === "") {
          toast.success("Quotation added successful.");
          navigate("/dashboard/quotaiton-list");
        }
        setReload(!reload);
        if (preview === "preview") {
          fetch(`${import.meta.env.VITE_API_URL}/api/v1/quotation`)
            .then((res) => res.json())
            .then((data) => {
              if (data) {
                navigate(`/dashboard/quotation-view?id=${data._id}`);
              }
            });
        }
        setLoading(false);
      }
    } catch (error) {
      if (error.response) {
        setPostError(error.response.data.message);
        setError("");
      }
    }
  };

  const handleIconPreview = async (e) => {
    navigate(`/dashboard/quotation-view?id=${e}`);
  };

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/v1/quotation/all`)
      .then((res) => res.json())
      .then((data) => {
        setGetAllQuotation(data);
        setLoading(false);
      });
  }, [reload]);

  // pagination

  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(
    Number(sessionStorage.getItem("q_n")) || 1
  );
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  // country code set
  const [countryCode, setCountryCode] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState("");

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

  const deletePackage = async (id) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this card?",
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/quotation/one/${id}`,
          {
            method: "DELETE",
          }
        );
        const data = await res.json();

        if (data.message == "Quotation card delete successful") {
          setGetAllQuotation(getAllQuotation?.filter((pkg) => pkg._id !== id));
          setReload(!reload);
        }
        swal("Deleted!", "Card delete successful.", "success");
      } catch (error) {
        swal("Error", "An error occurred while deleting the card.", "error");
      }
    }
  };

  useEffect(() => {
    sessionStorage.setItem("q_n", currentPage.toString());
  }, [currentPage]);
  // ...

  useEffect(() => {
    const storedPage = Number(sessionStorage.getItem("q_n")) || 1;
    setCurrentPage(storedPage);
    setMaxPageNumberLimit(
      Math.ceil(storedPage / pageNumberLimit) * pageNumberLimit
    );
    setMinPageNumberLimit(
      Math.ceil(storedPage / pageNumberLimit - 1) * pageNumberLimit
    );
  }, [pageNumberLimit]);

  // ...

  const handleClick = (e) => {
    const pageNumber = Number(e.target.id);
    setCurrentPage(pageNumber);
    sessionStorage.setItem("q_n", pageNumber.toString());
  };
  const pages = [];
  for (let i = 1; i <= Math.ceil(getAllQuotation?.length / limit); i++) {
    pages.push(i);
  }

  const renderPagesNumber = pages?.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={
            currentPage === number
              ? "bg-green-500 text-white px-3 rounded-md cursor-pointer"
              : "cursor-pointer text-black border border-green-500 px-3 rounded-md"
          }
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const lastIndex = currentPage * limit;
  const startIndex = lastIndex - limit;

  let currentItems;
  if (Array.isArray(getAllQuotation)) {
    currentItems = getAllQuotation.slice(startIndex, lastIndex);
  } else {
    currentItems = [];
  }

  const renderData = (getAllQuotation) => {
    return (
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
          {getAllQuotation?.map((card, index) => (
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
                  {/* <Link to="/dashboard/preview"> */}
                  <FaEye className="editIcon" />
                  {/* </Link> */}
                </div>
              </td>
              <td>
                <div className="editIconWrap edit">
                  <Link to={`/dashboard/update-quotation?id=${card._id}`}>
                    <FaEdit className="editIcon" />
                  </Link>
                </div>
              </td>
              <td>
                <div
                  onClick={() => deletePackage(card._id)}
                  className="editIconWrap"
                >
                  <FaTrashAlt className="deleteIcon" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const handlePrevious = () => {
    const newPage = currentPage - 1;
    setCurrentPage(newPage);
    sessionStorage.setItem("q_n", newPage.toString());

    if (newPage % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  const handleNext = () => {
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
    sessionStorage.setItem("q_n", newPage.toString());

    if (newPage > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages?.length > maxPageNumberLimit) {
    pageIncrementBtn = (
      <li
        onClick={() => handleClick({ target: { id: maxPageNumberLimit + 1 } })}
        className="pl-1 text-black cursor-pointer"
      >
        &hellip;
      </li>
    );
  }

  let pageDecrementBtn = null;
  if (currentPage > pageNumberLimit) {
    pageDecrementBtn = (
      <li
        onClick={() => handleClick({ target: { id: minPageNumberLimit } })}
        className="pr-1 text-black cursor-pointer"
      >
        &hellip;
      </li>
    );
  }

  const handleFilterType = async () => {
    try {
      const data = {
        filterType,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/quotation/all`,
        data
      );

      if (response.data.message === "Filter successful") {
        setGetAllQuotation(response.data.result);
        setNoMatching(null);
      }
      if (response.data.message === "No matching found") {
        setGetAllQuotation([]);
        setNoMatching(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleAllQuotation = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/v1/quotation/all`)
      .then((res) => res.json())
      .then((data) => {
        setGetAllQuotation(data);
        setNoMatching(null);
      });
  };

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
          <div className="space-y-1 text-justify jobCardContactInfo">
            <span className="block">
              <span className="font-bold">Mobile:</span> 01821-216465
            </span>
            <span className="block">
              <small className="font-bold">Email:</small>{" "}
              trustautosolution@gmail.com
            </span>
            <span className="block font-bold ">trustautosolution.com</span>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex md:flex-row flex-col justify-between items-center">
            <div className="hidden"></div>
            <div className="vehicleCard">Create Quotation </div>

            <div>
              <TADatePickers
                date={jobCardData?.date}
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
                  onChange={(e) => setJob_no(e.target.value)}
                  value={jobCardData?.job_no}
                  focused={jobCardData?.job_no}
                />
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Customer Id"
                  onChange={handleInputChange}
                  value={jobCardData?.Id}
                  focused={jobCardData?.Id}
                  required
                />
              </div>

              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Company"
                  value={jobCardData?.company_name}
                  focused={jobCardData?.company_name}
                  {...register("company_name")}
                  onChange={(e) =>
                    setJobCardData({
                      ...jobCardData,
                      company_name: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!jobCardData?.company_name,
                  }}
                />
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Customer"
                  value={jobCardData?.customer_name}
                  focused={jobCardData?.customer_name}
                  {...register("customer_name")}
                  onChange={(e) =>
                    setJobCardData({
                      ...jobCardData,
                      customer_name: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!jobCardData?.customer_name,
                  }}
                />
              </div>
              <div className="mt-3">
                <div className="flex md:flex-row flex-col gap-2 items-center mt-3">
                  <Autocomplete
                    sx={{ marginRight: "2px" }}
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
                    label="Customer Contact No (N)"
                    variant="outlined"
                    fullWidth
                    type="tel"
                    value={
                      phoneNumber ? phoneNumber : jobCardData?.customer_contact
                    }
                    onChange={handlePhoneNumberChange}
                    placeholder="Enter phone number"
                    InputLabelProps={{
                      shrink: !!jobCardData?.customer_contact,
                    }}
                  />
                  {/* <TextField
                    className="addJobInputField"
                    label="Phone"
                    // value={jobCardData?.customer_contact}
                    focused={jobCardData?.customer_contact}
                    {...register("customer_contact")}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      if (inputValue.length <= 11) {
                        setJobCardData({
                          ...jobCardData,
                          customer_contact: inputValue,
                        });
                      }
                    }}
                    InputLabelProps={{
                      shrink: !!jobCardData?.customer_contact,
                    }}
                  /> */}
                </div>
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Address"
                  value={jobCardData?.customer_address}
                  focused={jobCardData?.customer_address}
                  {...register("customer_address")}
                  onChange={(e) =>
                    setJobCardData({
                      ...jobCardData,
                      customer_address: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!jobCardData?.customer_address,
                  }}
                />
              </div>
            </div>

            <div className="mt-3 lg:mt-0 jobCardFieldRightSide">
              <h3 className="text-xl lg:text-3xl font-bold">Vehicle Info</h3>

              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Car R (N)"
                  {...register("car_registration_no", {
                    pattern: {
                      value: /^[\d-]+$/,
                      message: "Only numbers and hyphens are allowed",
                    },
                    minLength: {
                      value: 7,
                      message:
                        "Car registration number must be exactly 6 digits",
                    },
                    maxLength: {
                      value: 7,
                      message:
                        "Car registration number must be exactly 6 digits",
                    },
                  })}
                  value={jobCardData?.car_registration_no}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length === 7) {
                      setRegistrationError("");
                    } else if (value.length < 7) {
                      setRegistrationError(
                        "Car registration number must be 7 characters"
                      );
                    }
                    const formattedValue = value
                      .replace(/\D/g, "")
                      .slice(0, 6)
                      .replace(/(\d{2})(\d{1,4})/, "$1-$2");
                    setJobCardData({
                      ...jobCardData,
                      car_registration_no: formattedValue,
                    });
                  }}
                  InputLabelProps={{
                    shrink: !!jobCardData?.car_registration_no,
                  }}
                  error={!!errors.car_registration_no || !!registrationError}
                />
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Chassis No"
                  value={jobCardData?.chassis_no}
                  focused={jobCardData?.chassis_no}
                  {...register("chassis_no")}
                  onChange={(e) =>
                    setJobCardData({
                      ...jobCardData,
                      chassis_no: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!jobCardData?.chassis_no,
                  }}
                />
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Engine & CC"
                  value={jobCardData?.engine_no}
                  focused={jobCardData?.engine_no}
                  {...register("engine_no")}
                  onChange={(e) =>
                    setJobCardData({
                      ...jobCardData,
                      engine_no: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!jobCardData?.engine_no,
                  }}
                />
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Vehicle Name"
                  value={jobCardData?.vehicle_name}
                  focused={jobCardData?.vehicle_name}
                  {...register("vehicle_name")}
                  onChange={(e) =>
                    setJobCardData({
                      ...jobCardData,
                      vehicle_name: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!jobCardData?.vehicle_name,
                  }}
                />
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Mileage"
                  value={jobCardData?.mileage}
                  focused={jobCardData?.mileage}
                  {...register("mileage")}
                  onChange={(e) =>
                    setJobCardData({
                      ...jobCardData,
                      mileage: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!jobCardData?.mileage,
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-around labelWrap">
            <label>SL No </label>
            <label>Description </label>
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
                      type="number"
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
              {/* <Link to={}> */}
              <Button onClick={() => setPreview("preview")}>Preview</Button>
              {/* </Link> */}
              <Button>Download </Button>
              <Button>Print </Button>
            </div>
            <div className="submitQutationBtn">
              <button type="submit">Add Quotation </button>
            </div>
          </div>
          {error && (
            <div className="pt-6 text-center text-red-400">{error}</div>
          )}
          {postError && (
            <div className="pt-6 text-center text-red-400">{postError}</div>
          )}
        </form>
      </div>
      <div className="mt-20 overflow-x-auto">
        <div className="flex flex-wrap items-center justify-between mb-5">
          <h3 className="mb-3 text-md md:text-3xl font-bold">
            Quotation List:
          </h3>
          <div className="flex items-center searcList">
            <div className="searchGroup space-x-2">
              <Button sx={{background:'#42A1DA'}} onClick={handleAllQuotation}>
                All
              </Button>
              <input
                onChange={(e) => setFilterType(e.target.value)}
                autoComplete="off"
                type="text"
                placeholder={select}
              />
            </div>
            <button onClick={handleFilterType} className="SearchBtn ">
              Search
            </button>
          </div>
        </div>
        {loading ? (
          <div className="flex items-center justify-center text-xl">
            <Loading />
          </div>
        ) : (
          <div>
            {getAllQuotation?.length === 0 || currentItems.length === 0 ? (
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
        )}
      </div>
    </div>
  );
};

export default AddQuotation;
