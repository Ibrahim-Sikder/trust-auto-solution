/* eslint-disable no-unused-vars */
import axios from "axios";
import logo from "../../../../public/assets/logo.png";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const UpdateQutation = () => {
  const [specificInvoice, setSpecificInvoice] = useState({});
  const [orderNo, setOrderNo] = useState(null);
  const [customerName, setCustomerName] = useState(null);
  const [carNumber, setCarNumber] = useState(null);
  const [mobileNumber, setMobileNumber] = useState(null);
  const [date, setDate] = useState(null);
  const [descriptions, setDescriptions] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [rate, setRate] = useState([]);
  const [total, setTotal] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [vat, setVAT] = useState(0);
  const [error, setError] = useState("");
  const [dateHandle, setDateHandle] = useState(false);
  const [reload, setReload] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [inputList, setinputList] = useState([
    { flyingFrom: "", flyingTo: "", date: "" },
  ]);

  // const handleRemove = (index) => {
  //   if (!index) {
  //     const list = [...inputList];

  //     setinputList(list);
  //   } else {
  //     const list = [...inputList];
  //     list.splice(index, 1);
  //     setinputList(list);
  //   }
  // };

  const handleAddClick = () => {
    setinputList([...inputList, { flyingFrom: "", flyingTo: "", date: "" }]);
  };

  useEffect(() => {
    fetch(`https://trust-auto-solution-server.vercel.app/api/v1/quotation/one/${id}`)
      .then((res) => res.json())
      .then((data) => setSpecificInvoice(data));
  }, [id, reload]);

  const handleDescriptionChange = (index, value) => {
    if (value === "") {
      const newDescriptions = [...descriptions];
      newDescriptions[index] = "";
      setDescriptions(newDescriptions);
    } else {
      const newDescriptions = [...descriptions];
      newDescriptions[index] = value;
      setDescriptions(newDescriptions);
    }
  };
  const handleQuantityChange = (index, value) => {
    const parsedValue = value === "" ? "" : parseFloat(value);

    if (!isNaN(parsedValue)) {
      const newQuantity = [...quantity];
      newQuantity[index] = parsedValue;
      setQuantity(newQuantity);
      updateTotal(index, parsedValue, rate[index]);
    }
  };
  const handleRateChange = (index, value) => {
    const parsedValue = value === "" ? "" : parseFloat(value);

    if (!isNaN(parsedValue)) {
      const newRate = [...rate];
      newRate[index] = parsedValue;
      setRate(newRate);
      updateTotal(index, quantity[index], parsedValue);
    }
  };

  const updateTotal = (index, quantityValue, rateValue) => {
    const newTotal = [...total];
    // const rateAsPercentage = rateValue / 100; // Convert rate to percentage
    newTotal[index] = quantityValue * rateValue;
    setTotal(newTotal);
    const newGrandTotal = newTotal.reduce((sum, value) => sum + value, 0);
    setGrandTotal(newGrandTotal);
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
    const finalTotal =
      totalAfterDiscount + totalAfterDiscount * vatAsPercentage;

    return finalTotal;
  };

  const handleUpdateInvoice = async (e) => {
    e.preventDefault();

    try {
      const values = {
        username: specificInvoice.username,
        // serial_no: formattedSerialNo,
        job_no: orderNo || specificInvoice.job_no,
        date: date || specificInvoice.date,
        car_registration_no: carNumber || specificInvoice.car_registration_no,
        customer_name: customerName || specificInvoice?.customer_name,
        contact_number: mobileNumber || specificInvoice?.contact_number,
        descriptions: descriptions,
        quantity: quantity,
        rate: rate,
        amount: total,
        total_amount: grandTotal,
        discount: discount,
        vat: vat,
        net_total: calculateFinalTotal(),
      };
      const hasPreviewNullValues = Object.values(values).some(
        (val) => val === null
      );

      if (hasPreviewNullValues) {
        setError("Please fill in all the required fields.");

        return;
      }
      const response = await axios.put(
        `https://trust-auto-solution-server.vercel.app/api/v1/quotation/one/${id}`,
        values
      );

      if (response.data.message === "Successfully update card.") {
        setError("");
        navigate("/dashboard/qutation-view");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      }
    }
  };

  const handleRemoveButton = (i) => {
    axios
      .put(`https://trust-auto-solution-server.vercel.app/api/v1/quotation/${id}`, { index: i })
      .then((response) => {
        console.log(response.data.message);
        if (response.data.message === "Description deleted successfully") {
          setReload(!reload);
        }
      })
      .catch((error) => {});
  };

  return (
    <div className="py-10 px-5">
      <div className=" mb-5 pb-5 mx-auto text-center border-b-2 border-[#351E98]">
        <div className="flex items-center justify-center">
          <img src={logo} alt="logo" className="w-[70px] md:w-[160px]" />
          <div className="invoiceHead">
            <h2 className=" font-bold text-center trustAuto word-sp">
              Trust Auto Solution{" "}
            </h2>
            <p className=" text-sm">
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
                defaultValue={specificInvoice?.job_no}
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
                defaultValue={specificInvoice?.customer_name}
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

              {dateHandle ? (
                <input
                  onChange={(e) => setDate(e.target.value)}
                  defaultValue={specificInvoice.date}
                  autoComplete="off"
                  type="date"
                  placeholder="Date"
                  className="orderNumber"
                />
              ) : (
                <div onClick={() => setDateHandle(true)}>
                  {specificInvoice.date}
                </div>
              )}
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
          {specificInvoice?.descriptions?.length === 0 ? (
            <>
              {inputList.map((_, i) => {
                return (
                  <div key={i}>
                    <div className="qutationForm">
                      <div>
                        <>
                          {inputList.length !== 0 && (
                            <button
                              onClick={() => handleRemoveButton(i)}
                              className="  bg-[#351E98] hover:bg-[#351E98] text-white rounded-md px-2 py-2 my-1"
                            >
                              Remove
                            </button>
                          )}
                        </>
                      </div>
                      <div>
                        <input
                          key={i}
                          className="firstInputField my-1"
                          autoComplete="off"
                          type="text"
                          placeholder="SL No "
                          defaultValue={`${i + 1 < 10 ? `0${i + 1}` : i + 1}`}
                          required
                        />
                      </div>
                      {/* <div>
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
                  </div> */}
                      <div>
                        <input
                          className="secondInputField my-1"
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
                          key={i}
                          className="firstInputField my-1"
                          autoComplete="off"
                          type="text"
                          placeholder="Quantity "
                          onChange={(e) =>
                            handleQuantityChange(i, e.target.value)
                          }
                          required
                        />
                      </div>
                      <div>
                        <input
                          key={i}
                          className="thirdInputField my-1"
                          autoComplete="off"
                          type="text"
                          placeholder="Rate "
                          onChange={(e) => handleRateChange(i, e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <div className="my-1">
                          <input type="text" 
                          placeholder="Amount"
                          defaultValue={total[i]}
                          />
                          
                        </div>
                      </div>
                    </div>

                    <div className="addInvoiceItem">
                      {inputList.length - 1 === i && (
                        <div
                          onClick={handleAddClick}
                          className="flex justify-end mt-2"
                        >
                          <button className="btn bg-[#351E98] hover:bg-[#351E98] text-white">
                            Add
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              <div className="discountFieldWrap">
                <div className="flex items-center">
                  <b> Total Amount: </b>
                  <span>{grandTotal}</span>
                </div>
                <div>
                  <b> Discount: </b>
                  <input
                    className="text-center py-1"
                    onChange={(e) => handleDiscountChange(e.target.value)}
                    autoComplete="off"
                    type="text"
                    placeholder="Discount"
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
                  />
                </div>
                <div>
                  <div className="ml-3">
                    <strong>
                      Final Total: <span>{calculateFinalTotal()}</span>
                    </strong>
                    {/* <b>Net Total: </b> */}
                    {/* <input autoComplete="off" type="text" placeholder="Net" /> */}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {inputList.map((_, i) => {
                return (
                  <div key={i}>
                    <div className="qutationForm">
                      <div>
                        {specificInvoice?.descriptions?.map((_, i) => (
                          <>
                            {specificInvoice?.descriptions.length !== 0 && (
                              <button
                                onClick={() => handleRemoveButton(i)}
                                className="  bg-[#351E98] hover:bg-[#351E98] text-white rounded-md px-2 py-2 my-1"
                              >
                                Remove
                              </button>
                            )}
                          </>
                        ))}
                      </div>
                      <div>
                        {specificInvoice?.descriptions?.map((_, i) => (
                          <input
                            key={i}
                            className="firstInputField my-1"
                            autoComplete="off"
                            type="text"
                            placeholder="SL No "
                            defaultValue={`${i + 1 < 10 ? `0${i + 1}` : i + 1}`}
                            required
                          />
                        ))}
                      </div>
                      {/* <div>
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
                  </div> */}
                      <div>
                        {specificInvoice?.descriptions?.map(
                          (description, index) => (
                            <input
                              key={index}
                              className="secondInputField my-1"
                              autoComplete="off"
                              type="text"
                              placeholder="Description"
                              defaultValue={description}
                              onChange={(e) =>
                                handleDescriptionChange(index, e.target.value)
                              }
                              required
                            />
                          )
                        )}
                      </div>

                      <div>
                        {specificInvoice?.quantity?.map((qnt, i) => (
                          <input
                            key={i}
                            className="firstInputField my-1"
                            autoComplete="off"
                            type="text"
                            placeholder="Quantity "
                            onChange={(e) =>
                              handleQuantityChange(i, e.target.value)
                            }
                            required
                            defaultValue={qnt}
                          />
                        ))}
                      </div>
                      <div>
                        {specificInvoice?.rate?.map((rt, i) => (
                          <input
                            key={i}
                            className="thirdInputField my-1"
                            autoComplete="off"
                            type="text"
                            placeholder="Rate "
                            onChange={(e) =>
                              handleRateChange(i, e.target.value)
                            }
                            required
                            defaultValue={rt}
                          />
                        ))}
                      </div>
                      <div>
                        {specificInvoice?.amount?.map((amt, i) => (
                          <div key={i} className="  my-1">
                            {" "}
                            {total[i] ? total[i] : amt}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="addInvoiceItem">
                      {inputList.length - 1 === i && (
                        <div
                          onClick={handleAddClick}
                          className="flex justify-end mt-2"
                        >
                          <button className="btn bg-[#351E98] hover:bg-[#351E98] text-white">
                            Add
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
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
            </>
          )}

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

export default UpdateQutation;
