/* eslint-disable no-unused-vars */
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../../../public/assets/logo.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
const UpdateInvoice = () => {
  const [specificInvoice, setSpecificInvoice] = useState({});

  const [grandTotal, setGrandTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [vat, setVAT] = useState(0);
  const [advance, setAdvance] = useState(0);

  const [error, setError] = useState("");
  const [registrationError, setRegistrationError] = useState("");

  const [reload, setReload] = useState(false);

  const [removeButton, setRemoveButton] = useState("");
  const [addButton, setAddButton] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const [items, setItems] = useState([
    { description: "", quantity: "", rate: "", total: "" },
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

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/v1/invoice/one/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSpecificInvoice(data);
        setDiscount(data.discount);
        setVAT(data.vat);
      });
  }, [id, reload]);

  // useEffect(() => {
  //   const totalSum = items?.reduce((sum, item) => sum + Number(item.total), 0);
  //   setGrandTotal(totalSum);
  // }, [items]);
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
    // Ensure value is a valid number
    if (!isNaN(value)) {
      const newItems = [...specificInvoice.input_data];
      // Round the quantity to the nearest integer
      const roundedQuantity = Math.round(Number(value));
      newItems[index] = {
        ...newItems[index],
        quantity: roundedQuantity,
        total: (roundedQuantity * newItems[index].rate).toFixed(2),
      };
      setSpecificInvoice((prevState) => ({
        ...prevState,
        input_data: newItems,
      }));
    }
  };

  const handleQuantityChange2 = (index, value) => {
    if (!isNaN(value)) {
      const newItems = [...items];
      const roundedValue = Math.round(value);
      newItems[index].quantity = Number(roundedValue);
      newItems[index].total = roundedValue * newItems[index].rate;
      newItems[index].total = parseFloat(newItems[index].total.toFixed(2));
      setItems(newItems);
    }
  };

  const handleRateChange = (index, value) => {
    if (!isNaN(value)) {
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
    }
  };

  const handleRateChange2 = (index, value) => {
    if (!isNaN(value)) {
      const newItems = [...items];
      newItems[index].rate = parseFloat(value).toFixed(2);
      newItems[index].total = newItems[index].quantity * newItems[index].rate;
      newItems[index].total = parseFloat(newItems[index].total.toFixed(2));
      setItems(newItems);
    }
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

  const handleAdvance = (value) => {
    const parsedValue = value === "" ? 0 : parseFloat(value);

    if (!isNaN(parsedValue)) {
      setAdvance(parsedValue);
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

  const calculateDue = () => {
    if (advance && advance !== 0) {
      const due = calculateFinalTotal() - advance;
      return due;
    } else {
      const due = calculateFinalTotal() - specificInvoice.advance;
      return due;
    }
  };

  const handleRemoveButton = (i) => {
    if (!specificInvoice.Id) {
      return toast.error("Unauthorized");
    }
    axios
      .put(`${import.meta.env.VITE_API_URL}/api/v1/invoice/${id}`, { index: i })
      .then((response) => {
        if (response.data.message === "Deleted successful") {
          setReload(!reload);
        }
      })
      .catch((error) => {});
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

        total_amount: grandTotal || specificInvoice?.total_amount,
        discount: discount || specificInvoice?.discount,

        vat: vat || specificInvoice?.vat,
        advance: advance || specificInvoice.advance,
        due: calculateDue() || specificInvoice.due,

        net_total: calculateFinalTotal(),
        input_data: input_data,
      };

      if (removeButton === "") {
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/api/v1/invoice/one/${id}`,
          values
        );

        if (response.data.message === "Successfully update card.") {
          setError("");
          navigate("/dashboard/invoice-view");
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
      <div className="flex items-center justify-between w-full mt-5 mb-2 border-b-2 border-[#42A1DA]">
        <img src={logo} alt="logo" className="w-[70px] md:w-[210px]" />
        <div>
          <h2 className=" trustAutoTitle trustAutoTitleQutation">
            Trust Auto Solution{" "}
          </h2>
          <span>Office: Ka-93/4/C, Kuril Bishawroad, Dhaka-1229</span>
        </div>
        <div className="space-y-1 text-justify">
          <span className="block">
            <span className="font-bold">Mobile:</span> 345689789666
          </span>
          <span className="block">
            <small className="font-bold">Email:</small>{" "}
            trustautosolution@gmail.com
          </span>
          <span className="block font-bold ">trustautosolution.com</span>
        </div>
      </div>

      <div className="mt-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-10 jobCardFieldWraps">
            <div className="jobCardFieldLeftSide">
              <h3 className="text-xl lg:text-3xl  font-bold">Customer Info</h3>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Serial No"
                  {...register("job_no")}
                  value={specificInvoice?.job_no}
                  focused={specificInvoice?.job_no}
                />
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Customer Id"
                  {...register("customerId")}
                  value={specificInvoice?.Id}
                  focused={specificInvoice?.Id}
                  required
                />
              </div>

              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Company"
                  value={specificInvoice?.company_name}
                  focused={specificInvoice?.company_name}
                  {...register("company_name")}
                />
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Customer"
                  value={specificInvoice?.customer_name}
                  focused={specificInvoice?.customer_name}
                  {...register("customer_name")}
                />
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Phone"
                  value={specificInvoice?.customer_contact}
                  focused={specificInvoice?.customer_contact}
                  {...register("customer_contact")}
                />
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Address"
                  value={specificInvoice?.customer_address}
                  focused={specificInvoice?.customer_address}
                  {...register("customer_address")}
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
                  focused={specificInvoice?.chassis_no}
                  {...register("chassis_no")}
                />
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Engine & CC"
                  value={specificInvoice?.engine_no}
                  focused={specificInvoice?.engine_no}
                  {...register("engine_no")}
                />
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Vehicle Name"
                  value={specificInvoice?.vehicle_name}
                  focused={specificInvoice?.vehicle_name}
                  {...register("vehicle_name")}
                />
              </div>
              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Mileage"
                  value={specificInvoice?.mileage}
                  focused={specificInvoice?.mileage}
                  {...register("mileage")}
                />
              </div>
            </div>
          </div>

          <div className="vehicleCard">Update Invoice </div>
          <div className="flex items-center justify-around labelWrap">
            <label>SL No </label>
            <label>Description </label>
            <label>Quantity </label>
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
                            placeholder="Quantity"
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
                        placeholder="Quantity"
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
        <div className="discountFieldWrap">
          <div className="flex items-center">
            <b className="mr-2"> Total Amount: </b>
            <span>
              {grandTotal ? grandTotal : specificInvoice.total_amount}
            </span>
          </div>
          <div>
            <b className="mr-2"> Discount: </b>
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
            <b className="mr-2">Vat: </b>
            <input
              className="text-center"
              onChange={(e) => handleVATChange(e.target.value)}
              autoComplete="off"
              type="text"
              placeholder="Vat"
              defaultValue={specificInvoice.vat}
            />
          </div>
          <div className="flex items-center ">
            <b className="mr-3">Final Total: </b>
            <span>
              {calculateFinalTotal()
                ? calculateFinalTotal()
                : specificInvoice.net_total}
            </span>
            {/* <b>Net Total: </b> */}
          </div>
          <div>
            <b className="mr-2">Advance: </b>
            <input
              className="text-center"
              onChange={(e) => handleAdvance(e.target.value)}
              autoComplete="off"
              type="text"
              placeholder="Advance"
              defaultValue={specificInvoice.advance}
            />
          </div>

          <div className="flex items-center ">
            <b className="mr-2">Due: </b>
            <span>{calculateDue() ? calculateDue() : specificInvoice.due}</span>
          </div>
        </div>
        <div className="mb-12">
          <button onClick={handleOnSubmit} className="addJobBtn">
            Update Invoice{" "}
          </button>
        </div>

        {error && <div className="pt-6 text-center text-red-400">{error}</div>}
      </div>
    </div>
  );
};

export default UpdateInvoice;
