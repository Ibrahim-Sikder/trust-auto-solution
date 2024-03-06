/* eslint-disable no-unused-vars */
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../../../public/assets/logo.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
const UpdateInvoice = () => {
  const [specificInvoice, setSpecificInvoice] = useState({});
  const [orderNo, setOrderNo] = useState(null);
  const [customerName, setCustomerName] = useState(null);
  const [carNumber, setCarNumber] = useState(null);
  const [mobileNumber, setMobileNumber] = useState(null);
  const [date, setDate] = useState(null);
  const [grandTotal, setGrandTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [vat, setVAT] = useState(0);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [inputList, setinputList] = useState([
    { flyingFrom: "", flyingTo: "", date: "" },
  ]);

  const handleRemove = (index) => {
    if (!index) {
      const list = [...inputList];

      setinputList(list);
    } else {
      const list = [...inputList];
      list.splice(index, 1);
      setinputList(list);
    }
  };

  const handleAddClick = () => {
    setinputList([...inputList, { flyingFrom: "", flyingTo: "", date: "" }]);
  };

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/invoice/one/${id}`)
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
    const totalSum = items?.reduce((sum, item) => sum + Number(item.total), 0);
    setGrandTotal(totalSum);
  }, [items]);

  const handleDescriptionChange = (index, value) => {
    const newItems = [...specificInvoice.input_data];
    newItems[index].description = value;
    setItems(newItems);
  };

  // const handleQuantityChange = (index, value) => {
  //   const newItems = [...specificInvoice.input_data];
  //   newItems[index].quantity = Number(value);
  //   // Convert quantity to a number and calculate total
  //   newItems[index].total = Number(value) * newItems[index].rate;
  //   setItems(newItems);
  // };
  const handleQuantityChange = (index, value) => {
    const newItems = [...specificInvoice.input_data];
    const roundedValue = Math.round(value);
    newItems[index].quantity = roundedValue;
    // newItems[index].quantity = value;
    // Convert quantity to a number and calculate total

    newItems[index].total = roundedValue * newItems[index].rate;

    setItems(newItems);
    // newItems[index].total = Number(value) * newItems[index].rate;
    // setItems(newItems);
  };

  // const handleRateChange = (index, value) => {
  //   const newItems = [...specificInvoice.input_data];
  //   newItems[index].rate = Number(value);
  //   // Convert rate to a number and calculate total
  //   newItems[index].total = newItems[index].quantity * Number(value);
  //   setItems(newItems);
  // };
  const handleRateChange = (index, value) => {
    const newItems = [...specificInvoice.input_data];

    // Convert rate to a number
    newItems[index].rate = parseFloat(value);

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

  const trust_auto_id = Cookies.get("trust_auto_id");

  const handleRemoveButton = (i) => {
    if (specificInvoice.customerId !== trust_auto_id) {
      return toast.error("Unauthorized");
    }
    axios
      .put(`http://localhost:5000/api/v1/invoice/${id}`, { index: i })
      .then((response) => {
        if (response.data.message === "Deleted successful") {
          setReload(!reload);
        }
      })
      .catch((error) => {});
  };


 


  const handleUpdateInvoice = async (e) => {
    e.preventDefault();
    if (specificInvoice.customerId !== trust_auto_id) {
      return toast.error("Unauthorized");
    }
    try {
      const values = {
        username: specificInvoice.username,
        // serial_no: formattedSerialNo,
        customerId: specificInvoice.customerId,
        job_no: orderNo || specificInvoice.job_no,
        date: date || specificInvoice.date,
        car_registration_no: carNumber || specificInvoice.car_registration_no,
        customer_name: customerName || specificInvoice?.customer_name,
        contact_number: mobileNumber || specificInvoice?.contact_number,
        total_amount: grandTotal || specificInvoice?.total_amount,
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
      const hasPreviewNullValues = Object.values(values).some(
        (val) => val === null
      );

      if (hasPreviewNullValues) {
        setError("Please fill in all the required fields.");

        return;
      }
      const response = await axios.put(
        `http://localhost:5000/api/v1/invoice/one/${id}`,
        values
      );

      if (response.data.message === "Successfully update card.") {
        setError("");
        navigate("/dashboard/invoice-view");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      }
    }
  };
  return (
    <div className="py-10 px-5">
      <div className=" mb-5 pb-5 mx-auto text-center border-b-2 border-[#42A1DA]">
        <div className="flex items-center justify-center">
          <img src={logo} alt="logo" className="w-[70px] md:w-[160px]" />
          <div className="invoiceHead">
            <h2 className=" font-bold text-center trustAuto word-sp">
              Trust Auto Solution{" "}
            </h2>
            <p className="-mt-5 text-sm">
              It is trusted computerized Ogranizetion for all the kinds of
              vehicle check up & maintenance such as computerized Engine
              Analysis Engine tune up, Denting, Painting, Engine, AC, Electrical
              Works & Car Wash.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <div>
          <div className="qutationForm invoicForm">
            <div>
              <label className="block">Order Number </label>
              <input
                onChange={(e) => setOrderNo(e.target.value)}
                autoComplete="off"
                type="text"
                placeholder="Order Number"
                defaultValue={specificInvoice.job_no}
                className="orderNumber"
              />
            </div>
            <div>
              <label className="block">Customer Name </label>
              <input
                onChange={(e) => setCustomerName(e.target.value)}
                autoComplete="off"
                type="text"
                placeholder="Customer Name "
                defaultValue={specificInvoice.customer_name}
              />
            </div>

            <div>
              <label className="block">Car Number </label>
              <input
                onChange={(e) => setCarNumber(e.target.value)}
                defaultValue={specificInvoice.car_registration_no}
                autoComplete="off"
                type="text"
                placeholder="Car Number"
              />
            </div>
            <div>
              <label className="block">Mobile Number </label>
              <input
                onChange={(e) => setMobileNumber(e.target.value)}
                autoComplete="off"
                type="text"
                placeholder="Mobile Number "
                defaultValue={specificInvoice.contact_number}
              />
            </div>
            <div>
              <label className="block">Date</label>
              <input
                onChange={(e) => setDate(e.target.value)}
                defaultValue={specificInvoice.date}
                autoComplete="off"
                type="date"
                placeholder="Date"
                className="orderNumber"
              />
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
                  className="text-center py-1"
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
          {/* <div className="discountFieldWrap">
          <div className="flex items-center">
              <b> Total Amount: </b>
              <span>{grandTotal ? grandTotal : specificInvoice.total_amount}</span>
            </div>
            <div>
              <b> Discount: </b>
              <input
                className="text-center py-1"
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
          {/* </div>
            </div>
          </div> */}

          <div className="buttonGroup updateJobCardBtn mt-8">
            <div onClick={handleUpdateInvoice} className="submitQutationBtn">
              <button className="">Update Invoice </button>
            </div>
          </div>
          {error && (
            <div className="pt-6 text-red-400 text-center">{error}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateInvoice;
