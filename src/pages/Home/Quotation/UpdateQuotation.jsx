/* eslint-disable no-unused-vars */
import axios from "axios";
import logo from "../../../../public/assets/logo.png";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Autocomplete, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import TADatePickers from "../../../components/form/TADatePickers";
import { countries } from "../../../constant";
import TrustAutoAddress from "../../../components/TrustAutoAddress/TrustAutoAddress";
const UpdateQuotation = () => {
  const [specificInvoice, setSpecificInvoice] = useState({});

  const [grandTotal, setGrandTotal] = useState(0);

  const [discount, setDiscount] = useState(0);
  const [vat, setVAT] = useState(0);

  const [error, setError] = useState("");
  const [registrationError, setRegistrationError] = useState("");

  const [removeButton, setRemoveButton] = useState("");
  const [reload, setReload] = useState(false);
  const [addButton, setAddButton] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  // const [inputList, setinputList] = useState([
  //   { flyingFrom: "", flyingTo: "", date: "" },
  // ]);

  // country code set
  const [countryCode, setCountryCode] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState("");

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
    { servicesDescription: "", quantity: "", rate: "", total: "" },
  ]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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
    fetch(`${import.meta.env.VITE_API_URL}/api/v1/quotation/one/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSpecificInvoice(data);

        setDiscount(data.discount);
        setVAT(data.vat);
      });
  }, [id, reload]);

  useEffect(() => {
    const totalSum = specificInvoice.input_data?.reduce(
      (sum, item) => sum + Number(item.total),
      0
    );

    const totalSum2 = items.reduce((sum, item) => sum + Number(item.total), 0);

    const newTotalSum = isNaN(totalSum) ? 0 : totalSum;
    const newTotalSum2 = isNaN(totalSum2) ? 0 : totalSum2;

    let newGrandTotal = newTotalSum + newTotalSum2;
    newGrandTotal = parseFloat(newGrandTotal.toFixed(2));

    setGrandTotal(newGrandTotal);
  }, [items, specificInvoice.input_data]);

  const handleDescriptionChange = (index, value) => {
    const newItems = [...specificInvoice.input_data];
    newItems[index] = {
      ...newItems[index],
      description: value,
    };
    setSpecificInvoice((prevState) => ({
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
      const newItems = [...specificInvoice.input_data];
      const roundedQuantity = Math.round(Number(value));
      newItems[index] = {
        ...newItems[index],
        quantity: roundedQuantity,
        total: (Number(value) * newItems[index].rate).toFixed(2),
      };
      setSpecificInvoice((prevState) => ({
        ...prevState,
        input_data: newItems,
      }));
    }
  };

  const handleQuantityChange2 = (index, value) => {
    const newItems = [...items];
    const roundedValue = Math.round(value);
    newItems[index].quantity = Number(roundedValue);

    newItems[index].total = Number(value) * newItems[index].rate;
    newItems[index].total = parseFloat(newItems[index].total.toFixed(2));
    setItems(newItems);
  };

  const handleRateChange = (index, value) => {
    const newItems = [...specificInvoice.input_data];
    newItems[index] = {
      ...newItems[index],
      rate: Number(value).toFixed(2),
      total: (newItems[index].quantity * Number(value)).toFixed(2),
    };
    setSpecificInvoice((prevState) => ({
      ...prevState,
      input_data: newItems,
    }));
  };

  const handleRateChange2 = (index, value) => {
    const newItems = [...items];
    newItems[index].rate = parseFloat(value).toFixed(2);
    newItems[index].total = newItems[index].quantity * newItems[index].rate;
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

    let totalAfterDiscount;
    if (grandTotal) {
      totalAfterDiscount = grandTotal - discountAsPercentage;
    } else {
      totalAfterDiscount = specificInvoice.total_amount - discountAsPercentage;
    }

    const vatAsPercentage = vat / 100;
    let finalTotal = totalAfterDiscount + totalAfterDiscount * vatAsPercentage;
    finalTotal = parseFloat(finalTotal.toFixed(2));
    return finalTotal;
  };

  const handleRemoveButton = (i) => {
    if (!specificInvoice.Id) {
      return toast.error("Unauthorized");
    }
    axios
      .put(`${import.meta.env.VITE_API_URL}/api/v1/quotation/${id}`, {
        index: i,
      })
      .then((response) => {
        if (response.data.message === "Deleted successful") {
          setReload(!reload);
        }
      })
      .catch((error) => {
        toast.error("Something went wrong");
      });
  };

  const input_data = [
    ...(specificInvoice?.input_data || []),
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
    if (!specificInvoice.Id) {
      return toast.error("Unauthorized");
    }
    setRemoveButton("");
    try {
      const values = {
        username: specificInvoice.username || data.username,
        Id: data.customerId || specificInvoice.Id,
        job_no: data.job_no || specificInvoice.job_no,
        date: specificInvoice.date,

        company_name: data.company_name || specificInvoice.company_name,
        customer_name: data.customer_name || specificInvoice.customer_name,
        customer_contact:
          data.customer_contact || specificInvoice.customer_contact,
        customer_address:
          data.customer_address || specificInvoice.customer_address,

        car_registration_no:
          data.car_registration_no || specificInvoice.car_registration_no,
        chassis_no: data.chassis_no || specificInvoice.chassis_no,
        engine_no: data.engine_no || specificInvoice.engine_no,
        vehicle_name: data.vehicle_name || specificInvoice.vehicle_name,
        mileage: data.mileage || specificInvoice.mileage,

        total_amount: grandTotal || setSpecificInvoice.total_amount,
        discount: discount || specificInvoice?.discount,
        vat: vat || specificInvoice?.vat,
        net_total: calculateFinalTotal(),

        input_data: input_data,
      };

      if (removeButton === "") {
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/api/v1/quotation/one/${id}`,
          values
        );

        if (response.data.message === "Successfully update card.") {
          setError("");
          navigate("/dashboard/quotaiton-list");
        }
      }

      if (removeButton === "remove") {
        handleRemoveButton();
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      }
    }
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
              <TADatePickers />
            </div>
          </div>
          <div className="mb-10 jobCardFieldWraps">
            <div className="jobCardFieldLeftSide">
              <h3 className="text-xl lg:text-3xl  font-bold">Customer Info</h3>
              <div className="mt-3">
                <TextField
                  type="number"
                  className="addJobInputField"
                  label="Serial No"
                  {...register("job_no")}
                  value={specificInvoice?.job_no}
                  onChange={(e) =>
                    setSpecificInvoice({
                      ...specificInvoice,
                      job_no: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!specificInvoice.job_no,
                  }}
                />
              </div>

              <div className="mt-3">
                <TextField
                  readonly
                  className="addJobInputField"
                  label="Customer Id"
                  {...register("customerId")}
                  value={specificInvoice?.Id}
                  onChange={(e) =>
                    setSpecificInvoice({
                      ...specificInvoice,
                      Id: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!specificInvoice.Id,
                  }}
                />
              </div>

              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Company Name "
                  value={specificInvoice?.company_name}
                  {...register("company_name")}
                  onChange={(e) =>
                    setSpecificInvoice({
                      ...specificInvoice,
                      company_name: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!specificInvoice.company_name,
                  }}
                />
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Customer"
                  value={specificInvoice?.customer_name}
                  {...register("customer_name")}
                  onChange={(e) =>
                    setSpecificInvoice({
                      ...specificInvoice,
                      customer_name: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!specificInvoice.customer_name,
                  }}
                />
              </div>
              <div className="mt-3">
                {/* <TextField
                  className="addJobInputField"
                  label="Phone"
                  value={specificInvoice?.customer_contact}
                  {...register("customer_contact")}
                  onChange={(e) =>
                    setSpecificInvoice({
                      ...specificInvoice,
                      customer_contact: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!specificInvoice.customer_contact,
                  }}
                /> */}
                <div className="flex sm:flex-row flex-col gap-1 items-center">
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
                    className="carRegField"
                    label="Phone"
                    value={specificInvoice?.customer_contact}
                    {...register("customer_contact")}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      if (inputValue.length <= 11) {
                        setSpecificInvoice({
                          ...specificInvoice,
                          customer_contact: inputValue,
                        });
                      }
                    }}
                    InputLabelProps={{
                      shrink: !!specificInvoice.customer_contact,
                    }}
                  />
                </div>
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Address"
                  value={specificInvoice?.customer_address}
                  {...register("customer_address")}
                  onChange={(e) =>
                    setSpecificInvoice({
                      ...specificInvoice,
                      customer_address: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!specificInvoice.customer_address,
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
                  value={specificInvoice?.car_registration_no}
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
                    setSpecificInvoice({
                      ...specificInvoice,
                      car_registration_no: formattedValue,
                    });
                  }}
                  InputLabelProps={{
                    shrink: !!specificInvoice?.car_registration_no,
                  }}
                  error={!!errors.car_registration_no || !!registrationError}
                />
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Chassis No"
                  value={specificInvoice?.chassis_no}
                  {...register("chassis_no")}
                  onChange={(e) =>
                    setSpecificInvoice({
                      ...specificInvoice,
                      chassis_no: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!specificInvoice.chassis_no,
                  }}
                />
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Engine & CC"
                  value={specificInvoice?.engine_no}
                  {...register("engine_no")}
                  onChange={(e) =>
                    setSpecificInvoice({
                      ...specificInvoice,
                      engine_no: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!specificInvoice.engine_no,
                  }}
                />
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Vehicle Name"
                  value={specificInvoice?.vehicle_name}
                  {...register("vehicle_name")}
                  onChange={(e) =>
                    setSpecificInvoice({
                      ...specificInvoice,
                      vehicle_name: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!specificInvoice.vehicle_name,
                  }}
                />
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Mileage"
                  value={specificInvoice?.mileage}
                  {...register("mileage")}
                  onChange={(e) =>
                    setSpecificInvoice({
                      ...specificInvoice,
                      mileage: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!specificInvoice.mileage,
                  }}
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
            {specificInvoice?.input_data?.length > 0 && (
              <>
                {specificInvoice?.input_data?.map((item, i) => {
                  return (
                    <div key={i}>
                      <div className="qutationForm">
                        <div onClick={() => setRemoveButton("remove")}>
                          {items.length !== 0 && (
                            <button
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
                              handleDescriptionChange(
                                i,
                                e.target.value || item.description
                              )
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
                onClick={() => setAddButton(!addButton)}
                className="bg-[#42A1DA] hover:bg-[#42A1DA] text-white rounded-md px-2 py-2 mb-2"
              >
                Add new
              </button>
            )}
            {addButton && (
              <button
                onClick={() => setAddButton(!addButton)}
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
            {specificInvoice?.input_data?.length > 0 && (
              <>
                {specificInvoice?.input_data?.map((item, i) => {
                  return (
                    <div key={i}>
                      <div className="qutationForm">
                        <div onClick={() => setRemoveButton("remove")}>
                          {items.length !== 0 && (
                            <button
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
                              handleDescriptionChange(
                                i,
                                e.target.value || item.description
                              )
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
          
        </form>
        <div>
          {!addButton && (
            <button
              onClick={() => setAddButton(!addButton)}
              className="bg-[#42A1DA] hover:bg-[#42A1DA] text-white rounded-md px-2 py-2 mb-2"
            >
              Add new
            </button>
          )}
          {addButton && (
            <button
              onClick={() => setAddButton(!addButton)}
              className="border border-[#42A1DA] hover:border-[#42A1DA] text-black rounded-md px-2 py-2 mb-2"
            >
              Cancel
            </button>
          )}
          {addButton && (
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
                          onChange={(e) => handleRateChange2(i, e.target.value)}
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
              {grandTotal ? grandTotal : specificInvoice.total_amount}
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
              defaultValue={specificInvoice.discount}
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
              defaultValue={specificInvoice.vat}
            />
          </div>
          <div>
            <div className="ml-3">
              <strong>
                Final Total:{" "}
                <span>
                  {calculateFinalTotal()
                    ? calculateFinalTotal()
                    : specificInvoice.net_total}
                </span>
              </strong>
              {/* <b>Net Total: </b> */}
              {/* <input autoComplete="off" type="text" placeholder="Net" /> */}
            </div>
          </div>
        </div>
        <div>
          <div className="flex  justify-center align-items-center">
            <Button
              sx={{ background: "#42A1DA" }}
              onClick={handleOnSubmit}
              className="addJobBtn"
            >
              Update Quotation
            </Button>
          </div>
        </div>

        {error && <div className="pt-6 text-center text-red-400">{error}</div>}
      </div>
    </div>
  );
};

export default UpdateQuotation;
