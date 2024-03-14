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
import "./Invoice.css";
import axios from "axios";
import swal from "sweetalert";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { Autocomplete, TextField } from "@mui/material";
const Invoice = () => {
  const [select, setSelect] = useState(null);

  const location = useLocation();
  const orderNo = new URLSearchParams(location.search).get("order_no");
  const navigate = useNavigate();
  const [job_no, setJob_no] = useState(orderNo);
  const [jobCardData, setJobCardData] = useState({});
  const [error, setError] = useState("");
  const [postError, setPostError] = useState("");
  const [getAllInvoice, setGetAllInvoice] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [noMatching, setNoMatching] = useState(null);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);

  const [customerDetails, setCustomerDetails] = useState([]);
  const [showCustomerData, setShowCustomerData] = useState({});
  const [customerId, setCustomerId] = useState(null);

  useEffect(() => {
    if (job_no) {
      setLoading(true);
      fetch(`http://localhost:5000/api/v1/jobCard/invoice/${job_no}`)
        .then((res) => res.json())
        .then((data) => {
          setJobCardData(data);
          setLoading(false);
        });
    }
  }, [job_no]);

  const [inputList, setInputList] = useState([
    { flyingFrom: "", flyingTo: "", date: "" },
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

  //  add to invoice

  // const [descriptions, setDescriptions] = useState([]);
  // const [quantity, setQuantity] = useState([]);
  // const [rate, setRate] = useState([]);
  // const [total, setTotal] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [vat, setVAT] = useState(0);

  const [items, setItems] = useState([
    { description: "", quantity: "", rate: "", total: "" },
  ]);

  // useEffect(() => {
  //   const totalSum = items.reduce((sum, item) => sum + Number(item.total), 0);
  //   setGrandTotal(totalSum);
  // }, [items]);

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
    const roundedValue = Math.round(value);
    newItems[index].quantity = roundedValue;
    // newItems[index].quantity = value;
    // Convert quantity to a number and calculate total

    newItems[index].total = roundedValue * newItems[index].rate;

    setItems(newItems);
    // newItems[index].total = Number(value) * newItems[index].rate;
    // setItems(newItems);
  };

  // const handleQuantityChange = (index, value) => {
  //   const newItems = [...items];

  //   // Round the value to the nearest integer
  //   const roundedValue = Math.round(value);

  //   newItems[index].quantity = roundedValue;
  //   newItems[index].total = roundedValue * newItems[index].rate;

  //   setItems(newItems);
  // };

  // const handleRateChange = (index, value) => {
  //   const newItems = [...items];
  //   newItems[index].rate = value;
  //   // Convert rate to a number and calculate total
  //   newItems[index].total = newItems[index].quantity * Number(value);
  //   setItems(newItems);
  // };

  const handleRateChange = (index, value) => {
    const newItems = [...items];

    // Convert rate to a number
    newItems[index].rate = parseFloat(value);

    // Calculate total with the updated rate
    newItems[index].total = newItems[index].quantity * newItems[index].rate;

    // Round total to two decimal places
    newItems[index].total = parseFloat(newItems[index].total.toFixed(2));

    setItems(newItems);
  };

  // const handleDescriptionChange = (index, value) => {
  //   if (value === "") {
  //     const newDescriptions = [...descriptions];
  //     newDescriptions[index] = "";
  //     setDescriptions(newDescriptions);
  //   } else {
  //     const newDescriptions = [...descriptions];
  //     newDescriptions[index] = value;
  //     setDescriptions(newDescriptions);
  //   }
  // };
  // const handleQuantityChange = (index, value) => {
  //   const parsedValue = value === "" ? "" : parseFloat(value);

  //   if (!isNaN(parsedValue)) {
  //     const newQuantity = [...quantity];
  //     newQuantity[index] = parsedValue;
  //     setQuantity(newQuantity);
  //     updateTotal(index, parsedValue, rate[index]);
  //   }
  // };
  // const handleRateChange = (index, value) => {
  //   const parsedValue = value === "" ? "" : parseFloat(value);

  //   if (!isNaN(parsedValue)) {
  //     const newRate = [...rate];
  //     newRate[index] = parsedValue;
  //     setRate(newRate);
  //     updateTotal(index, quantity[index], parsedValue);
  //   }
  // };

  // const updateTotal = (index, quantityValue, rateValue) => {
  //   const newTotal = [...total];
  //   // const rateAsPercentage = rateValue / 100; // Convert rate to percentage
  //   newTotal[index] = quantityValue * rateValue;
  //   setTotal(newTotal);
  //   const newGrandTotal = newTotal.reduce((sum, value) => sum + value, 0);
  //   setGrandTotal(newGrandTotal);
  // };

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

  const trust_auto_id = Cookies.get("trust_auto_id");
  const customer_type = Cookies.get("customer_type");

  const handleAddToInvoice = async (e) => {
    e.preventDefault();
    if (!trust_auto_id) {
      return toast.error("No account found.");
    }
    try {
      const values = {
        username: jobCardData?.username,
        // serial_no: formattedSerialNo,
        customerId: customerId,
        companyId: customerId,
        showRoomId: customerId,
        job_no: job_no,
        date: jobCardData.date,
        car_registration_no: jobCardData.car_registration_no,
        customer_name: jobCardData?.customer_name,
        contact_number: jobCardData?.contact_number,
        mileage: jobCardData.mileage,
        total_amount: grandTotal,
        discount: discount,
        vat: vat,
        net_total: calculateFinalTotal(),
        input_data: items,
      };
      const hasPreviewNullValues = Object.values(values).some(
        (val) => val === null
      );

      if (hasPreviewNullValues) {
        setError("Please fill in all the required fields.");
        setPostError("");
        return;
      }
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/v1/invoice",
        values
      );

      if (response.data.message === "Successfully Invoice post") {
        setReload(!reload);
        setPostError("");
        setError("");
        toast.success("Quotation added successful.");
        setLoading(false);
      }
    } catch (error) {
      if (error.response) {
        setPostError(error.response.data.message);
        setError("");
      }
    }
  };

  const handlePreview = async (e) => {
    e.preventDefault();

    if (!trust_auto_id) {
      return toast.error("No account found.");
    }

    const values = {
      username: jobCardData?.username,
      // serial_no: formattedSerialNo,
      customerId: customerId,
      companyId: customerId,
      showRoomId: customerId,
      job_no: job_no,
      date: jobCardData.date,
      car_registration_no: jobCardData.car_registration_no,
      customer_name: jobCardData.customer_name,
      contact_number: jobCardData.contact_number,
      mileage: jobCardData.mileage,
      // descriptions: descriptions,
      // quantity: quantity,
      // rate: rate,
      // amount: total,
      total_amount: grandTotal,
      discount: discount,
      vat: vat,
      net_total: calculateFinalTotal(),
      input_data: items,
    };
    const hasPreviewNullValues = Object.values(values).some(
      (val) => val === null
    );

    if (hasPreviewNullValues) {
      setError("Please fill in all the required fields.");
      return;
    }
    const response = await axios.post(
      "http://localhost:5000/api/v1/invoice",
      values
    );
    if (response.data.message === "Successfully Invoice post") {
      fetch("http://localhost:5000/api/v1/invoice")
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            navigate(`/dashboard/detail?id=${data._id}`);
          }
        });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = "";
        switch (customer_type) {
          case "customer":
            apiUrl = "http://localhost:5000/api/v1/customer";
            break;
          case "company":
            apiUrl = "http://localhost:5000/api/v1/company";
            break;
          case "show_room":
            apiUrl = "http://localhost:5000/api/v1/showRoom";
            break;
          default:
            throw new Error("Invalid customer type");
        }

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setCustomerDetails(data);

        const selectedCustomer = data.find((customer) => {
          switch (customer_type) {
            case "customer":
              return customer.customerId === customerId;
            case "company":
              return customer.companyId === customerId;
            case "show_room":
              return customer.showRoomId === customerId;
            default:
              return false;
          }
        });
        setShowCustomerData(selectedCustomer);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [customerId, customer_type]);

  const handleIconPreview = async (e) => {
    navigate(`/dashboard/detail?id=${e}`);
  };

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/v1/invoice/all`)
      .then((res) => res.json())
      .then((data) => {
        setGetAllInvoice(data);
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
          `http://localhost:5000/api/v1/invoice/one/${id}`,
          {
            method: "DELETE",
          }
        );
        const data = await res.json();

        if (data.message == "Invoice card delete successful") {
          setGetAllInvoice(getAllInvoice?.filter((pkg) => pkg._id !== id));
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
  for (let i = 1; i <= Math.ceil(getAllInvoice?.length / limit); i++) {
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
  if (Array.isArray(getAllInvoice)) {
    currentItems = getAllInvoice?.slice(startIndex, lastIndex);
  } else {
    currentItems = [];
  }

  const renderData = (getAllInvoice) => {
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
          {getAllInvoice?.map((card, index) => (
            <tr key={card._id}>
              <td>{index + 1}</td>
              <td>{card.customer_name}</td>
              <td>{card.job_no}</td>
              <td>{card.car_registration_no}</td>
              <td> {card.contact_number} </td>
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
                  <Link to={`/dashboard/update-invoice?id=${card._id}`}>
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
      setLoading(true);
      const response = await axios.post(
        `http://localhost:5000/api/v1/invoice/all`,
        data
      );
      if (response.data.message === "Filter successful") {
        setGetAllInvoice(response.data.result);
        setNoMatching(null);
        setLoading(false);
      }
      if (response.data.message === "No matching found") {
        setNoMatching(response.data.message);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handleAllInvoice = () => {
    try {
      fetch(`http://localhost:5000/api/v1/invoice/all`)
        .then((res) => res.json())
        .then((data) => {
          setGetAllInvoice(data);
          setNoMatching(null);
        });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="px-5 py-10">
      <div className=" mb-5 pb-5 mx-auto text-center border-b-2 border-[#42A1DA]">
        {/* <div className="flex items-center justify-center">
          <img src={logo} alt="logo" className="w-[70px] md:w-[160px]" />
          <div className="invoiceHead">
            <h2 className="text-3xl font-bold text-center md:text-4xl lg:text-6xl trustAuto word-sp">
              Trust Auto Solution{" "}
            </h2>
            <p className="text-sm ">
              It is trusted computerized Ogranizetion for all the kinds of
              vehicle check up & maintenance such as computerized Engine
              Analysis Engine tune up, Denting, Painting, Engine, AC, Electrical
              Works & Car Wash.
            </p>
          </div>
        </div> */}
        <div className="flex items-center justify-between w-full mt-5 mb-2">
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
      </div>
      <div className="mt-5">
        <form>

        {/** 
          <div className="qutationForm invoicForm">
            <div>
              <label className="block">Order Number </label>
              <input
                onChange={(e) => setJob_no(e.target.value)}
                autoComplete="off"
                type="text"
                placeholder="Order Number"
                defaultValue={orderNo}
                className="orderNumber"
              />
            </div>
            <div>
              <label className="block">Customer Name </label>
              <input
                autoComplete="off"
                type="text"
                placeholder="Customer Name"
                defaultValue={jobCardData?.customer_name}
              />
            </div>

            <div>
              <label className="block">Car Number </label>
              <input
                defaultValue={jobCardData?.car_registration_no}
                autoComplete="off"
                type="text"
                placeholder="Car Number"
              />
            </div>
            <div>
              <label className="block">Mobile Number </label>
              <input
                autoComplete="off"
                type="text"
                placeholder="Mobile Number "
                defaultValue={jobCardData?.contact_number}
              />
            </div>
            <div>
              <label className="block">Date</label>
              <input
                defaultValue={jobCardData?.date}
                autoComplete="off"
                placeholder="Date"
                className="orderNumber"
                // onChange={handleDateChange}
              />
            </div>
          </div>
         */}





<div className="mb-10 jobCardFieldWraps">
  
<div className='jobCardFieldLeftSide'>
<h3 className="text-3xl font-bold">Customer Info</h3>
<div className="mt-3">
<TextField
className="addJobInputField"
  label="Customer Id" 
/>
</div>
<div className="mt-3">
<TextField
className="addJobInputField"
  label="Serial No"
/>
</div>
<div className="mt-3">
<TextField
  className="addJobInputField"
  label="Company"
/>
</div>
<div className="mt-3">
<TextField
  className="addJobInputField"
  label="Customer"
/>
</div>
<div className="mt-3">
<TextField
  className="addJobInputField"
  label="Phone"
/>
</div>
<div className="mt-3">
<TextField
  className="addJobInputField"
  label="Address"
/>
</div>
</div>

<div className='jobCardFieldRightSide'>
<h3 className="text-3xl font-bold">Vehicle Info</h3>




<div className="mt-3">
<TextField
  className="addJobInputField"
  label="Registration No"
/>
</div>
<div className="mt-3">
<TextField
  className="addJobInputField"
  label="Chassis No"
/>
</div>
<div className="mt-3">
<TextField
  className="addJobInputField"
  label="Engine & CC"
/>
</div>
<div className="mt-3">
<TextField
  className="addJobInputField"
  label="Vehicle Name"
/>
</div>
<div className="mt-3">
<TextField
  className="addJobInputField"
  label="Mileage"
/>
</div>
</div>
</div>

          <div className="vehicleCard">Invoice Card </div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center topSearchBa">
             
              
            </div>
            {customer_type === "customer" && (
              <Link to="/dashboard/add-customer">
                {" "}
                <button className="bg-[#42A1DA] text-white px-2 py-2 rounded-sm ml-2">
                  Add Customer
                </button>
              </Link>
            )}

           
          </div>
          <div className="flex items-center justify-around mb-3 labelWrap">
            <label>SL No </label>
            <label>Description </label>
            <label>Quantity </label>
            <label>Rate</label>
            <label>Amount </label>
          </div>
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
                      type="text"
                      placeholder="Quantity "
                      onChange={(e) => handleQuantityChange(i, e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <input
                      className="thirdInputField"
                      autoComplete="off"
                      type="text"
                      placeholder="Rate "
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
                    />
                  </div>
                </div>

                <div className="addInvoiceItem">
                  {inputList.length - 1 === i && (
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
          <div className="discountFieldWrap">
            <div className="flex items-center">
              <b className="mr-2"> Total Amount: </b>
              <span>{grandTotal}</span>
            </div>
            <div>
              <b className="mr-2"> Discount: </b>
              <input
                className="py-1 text-center"
                onChange={(e) => handleDiscountChange(e.target.value)}
                autoComplete="off"
                type="text"
                placeholder="Discount"
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
              />
            </div>
            <div>
              <div className="flex items-center ml-3 ">
                <b className="mr-2">Final Total:</b>
                <span>{calculateFinalTotal()}</span>
              </div>
            </div>
            <div>
              <b className="mr-2">Advance: </b>
              <input
                className="text-center"
                onChange={(e) => handleVATChange(e.target.value)}
                autoComplete="off"
                type="text"
                placeholder="Advance"
              />
            </div>
            <div>
              <div className="flex items-center ml-3 ">
                <b className="mr-2">Due:</b>
                <span>{calculateFinalTotal()}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 buttonGroup">
            <div>
              {/* <Link to={}> */}
              <button onClick={handlePreview}>Preview</button>
              {/* </Link> */}
              <button>Download </button>
              <button>Print </button>
            </div>
            <div className="submitQutationBtn">
              <button onClick={handleAddToInvoice} className="">
                Add To Invoice{" "}
              </button>
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
        <div className="flex items-center justify-between mb-5">
          <h3 className="mb-3 text-3xl font-bold">Invoice List:</h3>
          <div className="flex items-center searcList">
            <div
              onClick={handleAllInvoice}
              className="mx-6 font-semibold cursor-pointer bg-[#42A1DA] px-2 py-1 rounded-md text-white"
            >
              All
            </div>
            <div className="searchGroup">
              <input
                onChange={(e) => setFilterType(e.target.value)}
                autoComplete="off"
                type="text"
                placeholder={select}
              />
            </div>
            <button onClick={handleFilterType} className="SearchBtn ">
              Search{" "}
            </button>
          </div>
        </div>
        {loading ? (
          <div className="flex items-center justify-center text-xl">
            Loading...
          </div>
        ) : (
          <div>
            {getAllInvoice?.length === 0 || currentItems.length === 0 ? (
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

      {/* <div className="pagination">
        <div className="paginationBtn">
          <button>
            <FaArrowLeft className="arrowLeft" />
          </button>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>5</button>
          <button>
            <FaArrowRight className="arrowRight" />
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default Invoice;
