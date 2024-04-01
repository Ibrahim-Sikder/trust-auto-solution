/* eslint-disable no-unused-vars */
import axios from "axios";
import logo from "../../../../public/assets/logo.png";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
const UpdateQuotation = () => {
  const [specificInvoice, setSpecificInvoice] = useState({});
  console.log('quotation data ', specificInvoice)
  // const [orderNo, setOrderNo] = useState(null);
  // const [customerName, setCustomerName] = useState(null);
  // const [carNumber, setCarNumber] = useState(null);
  // const [mobileNumber, setMobileNumber] = useState(null);
  // const [date, setDate] = useState(null);
  // const [descriptions, setDescriptions] = useState([]);
  // const [quantity, setQuantity] = useState([]);
  // const [rate, setRate] = useState([]);
  // const [total, setTotal] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);

  const [discount, setDiscount] = useState(0);
  const [vat, setVAT] = useState(0);
  const [error, setError] = useState("");
  const [dateHandle, setDateHandle] = useState(false);
  const [reload, setReload] = useState(false);
  const [quantityIndex, setQuantityIndex] = useState(null);
  const [rateIndex, setRateIndex] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [inputList, setinputList] = useState([
    { flyingFrom: "", flyingTo: "", date: "" },
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
  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/quotation/one/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSpecificInvoice(data);

        setDiscount(data.discount);
        setVAT(data.vat);
      });
  }, [id, reload]);

  const [items, setItems] = useState([
    { description: "", quantity: "", rate: "", total: "" },
  ]);

  useEffect(() => {
    const totalSum = specificInvoice.input_data?.reduce(
      (sum, item) => sum + Number(item.total),
      0
    );
    setGrandTotal(totalSum);
  }, [items, specificInvoice.input_data]);

  const handleDescriptionChange = (index, value) => {
    const newItems = [...specificInvoice.input_data];
    newItems[index].description = value;
    setItems(newItems);
  };

  const handleQuantityChange = (index, value) => {
    const newItems = [...specificInvoice.input_data];
    newItems[index].quantity = Number(value);
    // Convert quantity to a number and calculate total
    newItems[index].total = Number(value) * newItems[index].rate;
    setItems(newItems);
  };

  const handleRateChange = (index, value) => {
    const newItems = [...specificInvoice.input_data];
    newItems[index].rate = Number(value);
    // Convert rate to a number and calculate total
    newItems[index].total = newItems[index].quantity * Number(value);
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
    const finalTotal =
      totalAfterDiscount + totalAfterDiscount * vatAsPercentage;

    return finalTotal;
  };

  // const trust_auto_id = Cookies.get("trust_auto_id");

  const onSubmit = async (data) => {
    if (!specificInvoice.Id) {
      return toast.error("Unauthorized");
    }
    try {
      const values = {
        username: specificInvoice.username || data.username,
        Id: data.customerId || specificInvoice.Id,
        job_no: data.job_no || specificInvoice.job_no,
        date: specificInvoice.date,

        company_name: data.company_name || specificInvoice.company_name,
        customer_name: data.customer_name || specificInvoice.customer_name,
        contact_contact: data.contact_contact || specificInvoice.contact_number,
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
        input_data: specificInvoice?.input_data.map((item) => ({
          description: item.description,
          quantity: item.quantity,
          rate: item.rate,
          total: item.total,
        })),
      };
      // const hasPreviewNullValues = Object.values(values).some(
      //   (val) => val === null
      // );

      // if (hasPreviewNullValues) {
      //   setError("Please fill in all the required fields.");

      //   return;
      // }
      const response = await axios.put(
        `http://localhost:5000/api/v1/quotation/one/${id}`,
        values
      );

      if (response.data.message === "Successfully update card.") {
        setError("");
        navigate("/dashboard/quotaiton-list");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      }
    }
  };

  const handleRemoveButton = (i) => {
    if (!specificInvoice.Id) {
      return toast.error("Unauthorized");
    }
    axios
      .put(`http://localhost:5000/api/v1/quotation/${id}`, { index: i })
      .then((response) => {
        if (response.data.message === "Deleted successful") {
          setReload(!reload);
        }
      })
      .catch((error) => {
        toast.error("Something went wrong");
      });
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
                  className="addJobInputField"
                  label="Customer Id"
                  {...register("customerId")}
                  value={specificInvoice?.Id}
                  onChange={(e) =>
                    setSpecificInvoice({
                      ...specificInvoice,
                      customerId: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!specificInvoice.customerId,
                  }}
                />
              </div>

              <div className="mt-3">
                <TextField
                  className="addJobInputField"
                  label="Company"
                  value={specificInvoice?.company_name}
                  onChange={(e) =>
                    setSpecificInvoice({
                      ...specificInvoice,
                      company_name: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!specificInvoice.company_name,
                  }}
                  {...register("company_name")}
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
                <TextField
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
                />
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
                  label="Registration No"
                  value={specificInvoice?.car_registration_no}
                  {...register("car_registration_no")}
                  onChange={(e) =>
                    setSpecificInvoice({
                      ...specificInvoice,
                      car_registration_no: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!specificInvoice.car_registration_no,
                  }}
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
          <div className="vehicleCard">Update Quotation </div>
          <div className="flex items-center justify-around labelWrap">
            <label>SL No </label>
            <label>Description </label>
            <label>Quantity </label>
            <label>Rate</label>
            <label>Amount </label>
          </div>
          <div>
            {specificInvoice?.input_data ? (
              <>
                {specificInvoice?.input_data.map((item, i) => {
                  return (
                    <div key={i}>
                      <div className="qutationForm">
                        <div>
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

                      {/* <div className="addInvoiceItem">
                        {specificInvoice?.input_data.length - 1 === i && (
                          <div
                            onClick={handleAddClick}
                            className="flex justify-end mt-2"
                          >
                            <button className="btn bg-[#42A1DA] hover:bg-[#42A1DA] text-white">
                              Add
                            </button>
                          </div>
                        )}
                      </div> */}
                    </div>
                  );
                })}
              </>
            ) : (
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
                            placeholder="Quantity"
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
                            type="number"
                            placeholder="Rate"
                            onChange={(e) =>
                              handleRateChange(i, e.target.value)
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
                            <button className="btn bg-[#42A1DA] hover:bg-[#42A1DA] text-white">
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
          </div>

          <div>
            <button className="addJobBtn">Update Quotation </button>
          </div>

          {error && (
            <div className="pt-6 text-center text-red-400">{error}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default UpdateQuotation;
