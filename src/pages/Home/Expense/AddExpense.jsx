/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-no-undef */

import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  FaFileInvoice,
  FaEye,
  FaTrashAlt,
  FaCloudUploadAlt,
  FaUser,
  FaEdit,
} from "react-icons/fa";
import { TiEdit } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import swal from "sweetalert";

const AddExpense = () => {
  const [payment, setPayment] = useState("");

  const [url, setUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [getAllExpense, setGetAllExpense] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [noMatching, setNoMatching] = useState(null);
  const [reload, setReload] = useState(false);

  const handlePaymentChange = (e) => {
    setPayment(e.target.value);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/expense")
      .then((response) => {
        setGetAllExpense(response.data.expense);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [reload]);

  const handleImageUpload = async (e) => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      setImageLoading(true);
      const response = await fetch("http://localhost:5000/api/v1/uploads", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.message === "Image uploaded successful") {
        setUrl(data.image_url);
        setImageLoading(false);
      }
    } catch (error) {
      setImageLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setError("");

    try {
      const values = {
        category: data.category,
        sub_category: data.sub_category,
        expense_for: data.expense_for,
        tax_application: data.tax_application,
        individual_markup_first: data.individual_markup_first,
        expense_note_first: data.expense_note_first,
        individual_markup_second: data.individual_markup_second,
        expense_note_second: data.expense_note_second,
        amount: data.amount,
        paid_on: data.paid_on,
        payment_individual_markup: data.payment_individual_markup,
        payment_account_first: payment,
        payment_account_second: data.payment_account_second,
        check_no: data.check_no,
        check_expense_note: data.check_expense_note,
        bank_account_no: data.bank_account_no,

        bank_expense_note: data.bank_expense_note,
        cash_expense_note: data.cash_expense_note,
        card_number: data.card_number,
        card_holder_name: data.card_holder_name,
        card_transaction_no: data.card_transaction_no,
        card_type: data.card_type,
        month_first: data.month_first,
        year: data.year,
        month_second: data.month_second,
        security_code: data.security_code,
        card_expense_note: data.card_expense_note,
        other_transaction_no: data.other_transaction_no,
        other_expense_note: data.other_expense_note,

        image: url,
      };

      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/v1/expense",
        values
      );

      if (response.data.message === "Successfully expense post") {
        toast.success("Successfully expense added.");
        setLoading(false);
        setReload(!reload);
        reset();
        setError("");
      }
    } catch (error) {
      if (error.response) {
        setLoading(false);
        setError(error.response.data.message);
      }
    }
  };

  // pagination
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(
    Number(sessionStorage.getItem("supplier")) || 1
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
          `http://localhost:5000/api/v1/expense/one/${id}`,
          {
            method: "DELETE",
          }
        );
        const data = await res.json();

        if (data.message == "Expense delete successful") {
          setGetAllExpense(getAllExpense?.filter((pkg) => pkg._id !== id));
          setReload(!reload);
        }
        swal("Deleted!", "Card delete successful.", "success");
      } catch (error) {
        swal("Error", "An error occurred while deleting the card.", "error");
      }
    }
  };

  useEffect(() => {
    sessionStorage.setItem("supplier", currentPage.toString());
  }, [currentPage]);

  useEffect(() => {
    const storedPage = Number(sessionStorage.getItem("supplier")) || 1;
    setCurrentPage(storedPage);
    setMaxPageNumberLimit(
      Math.ceil(storedPage / pageNumberLimit) * pageNumberLimit
    );
    setMinPageNumberLimit(
      Math.ceil(storedPage / pageNumberLimit - 1) * pageNumberLimit
    );
  }, [pageNumberLimit]);

  const handleClick = (e) => {
    const pageNumber = Number(e.target.id);
    setCurrentPage(pageNumber);
    sessionStorage.setItem("supplier", pageNumber.toString());
  };
  const pages = [];
  for (let i = 1; i <= Math.ceil(getAllExpense?.length / limit); i++) {
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
  if (Array.isArray(getAllExpense)) {
    currentItems = getAllExpense?.slice(startIndex, lastIndex);
  } else {
    currentItems = [];
  }

  const renderData = (getAllExpense) => {
    return (
      <table className="table">
        <thead className="tableWrap">
          <tr>
            <th>SL</th>
            <th>Expense Category </th>
            <th>Sub Category </th>
            <th>Expense For </th>
            <th>Total Amount </th>
            <th>Payment Method </th>
            <th colSpan={3}>Action</th>
          </tr>
        </thead>
        <tbody>
          {getAllExpense?.map((card, index) => (
            <tr key={card._id}>
              <td>{index + 1}</td>
              <td>{card?.category}</td>
              <td>{card?.sub_category}</td>
              <td>{card?.expense_for}</td>
              <td>{card?.amount}</td>
              <td>{card?.payment_account_first}</td>
              <td>
                <div className="flex items-center justify-center ">
                  {/* <Link to="/dashboard/employee-profile"> */}
                  <FaEye size={25} className="" />
                  {/* </Link> */}
                </div>
              </td>

              <td>
                <div className="editIconWrap edit">
                  <Link to={`/dashboard/update-expense?id=${card._id}`}>
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
    sessionStorage.setItem("supplier", newPage.toString());

    if (newPage % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  const handleNext = () => {
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
    sessionStorage.setItem("supplier", newPage.toString());

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
        `http://localhost:5000/api/v1/expense/all`,
        data
      );

      if (response.data.message === "Filter successful") {
        setGetAllExpense(response.data.result);
        setNoMatching(null);
        setLoading(false);
      }
      if (response.data.message === "No matching found") {
        setNoMatching(response.data.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handleAllExpense = () => {
    try {
      fetch(`http://localhost:5000/api/v1/expense`)
        .then((res) => res.json())
        .then((data) => {
          setGetAllExpense(data.expense);
          setNoMatching(null);
        });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <section>
      <div className="addProductWraps">
        <div className="productHeadWrap">
          <div className="flex items-center justify-center ">
            <FaFileInvoice className="invoicIcon" />
            <div className="ml-2">
              <h3 className="text-2xl font-bold">Add Expense </h3>
              <span>Dashboard / Expense </span>
            </div>
          </div>
        </div>

        <div className="addProductWrap">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="productFieldWrap">
                <FormControl className="productField">
                  <InputLabel htmlFor="grouped-native-select">
                    Expense Category{" "}
                  </InputLabel>
                  <Select
                    className="productField"
                    native
                    defaultValue=""
                    id="grouped-native-select"
                    label="Expense Category"
                    {...register("category")}
                  >
                    <option aria-label="None" value="" />
                    <option value="First Category "> Daily </option>
                    <option value="First Category "> Monthly </option>
                    <option value="First Category "> Yearly </option>
                  </Select>
                </FormControl>
                <FormControl className="productField">
                  <InputLabel htmlFor="grouped-native-select">
                    Sub Category
                  </InputLabel>
                  <Select
                    native
                    defaultValue=""
                    id="grouped-native-select"
                    label="Sub Category"
                    {...register("sub_category")}
                  >
                    <option aria-label="None" value="" />
                    <option value="First Category "> Rent </option>
                    <option value="First Category "> Salary </option>
                    <option value="First Category ">Electricity </option>
                    <option value="First Category ">Other </option>
                  </Select>
                </FormControl>
              </div>

              <div className="productFieldWrap">
                <TextField
                  className="productField"
                  fullWidth
                  label="Expense For"
                  id="Tax"
                  {...register("expense_for")}
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Tax Applicable"
                  id="Tax"
                  {...register("tax_application")}
                />
              </div>

              <div className="productFieldWrap">
                <TextField
                  className="productField"
                  fullWidth
                  label=" Individual Markup  "
                  {...register("individual_markup_first")}
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Expanse Note "
                  {...register("expense_note_first")}
                />
              </div>
              <div className="productFieldWrap">
                <TextField
                  className="productField"
                  fullWidth
                  label="Individual Markup"
                  id="Total Amount"
                  {...register("individual_markup_second")}
                />
                <div className="productField">
                  <input
                    onChange={handleImageUpload}
                    type="file"
                    id="files"
                    className="hidden"
                  />

                  <label
                    for="files"
                    className="text-sm flex items-center justify-center cursor-pointer bg-[#42A1DA] text-white py-2 rounded-md "
                  >
                    <span>
                      <FaCloudUploadAlt size={30} className="mr-2" />
                    </span>
                    {imageLoading ? (
                      <span>Uploading...</span>
                    ) : (
                      <>
                        {url ? (
                          <span>Uploaded</span>
                        ) : (
                          <span> Attach Document</span>
                        )}
                      </>
                    )}
                  </label>
                </div>
              </div>

              <div className="mt-4 productDetailWrap">
                <textarea
                  placeholder="Expense Note "
                  className="productDetail"
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  {...register("expense_note_second")}
                />
              </div>
            </div>

            <h3 className="mt-10 text-xl font-semibold"> Payment Method </h3>
            <div>
              <div className="productFieldWrap">
                <TextField
                  className="productField"
                  fullWidth
                  label="Amount"
                  id="Tax"
                  {...register("amount")}
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Paid On "
                  id="Tax"
                  {...register("paid_on")}
                />
              </div>

              <div className="productFieldWrap">
                <TextField
                  className="productField"
                  fullWidth
                  label=" Individual Markup  "
                  {...register("payment_individual_markup")}
                />
                <FormControl className="productField">
                  <InputLabel htmlFor="grouped-native-select">
                    Payment Method
                  </InputLabel>
                  <Select
                    onChange={handlePaymentChange}
                    native
                    id="grouped-native-select"
                    label="Payment Account "
                    // {...register("payment_account_first")}
                  >
                    <option aria-label="None" value="" />
                    <option value="Cash"> Cash </option>
                    <option value="Check"> Check </option>
                    <option value="Card"> Card </option>
                    <option value="Bank Transfer">Bank Transfer </option>
                    <option value="Other">Other </option>
                  </Select>
                </FormControl>
              </div>
              <div className="productFieldWrap">
                <FormControl className="productField">
                  <InputLabel htmlFor="grouped-native-select">
                    Payment Account
                  </InputLabel>
                  <Select
                    native
                    id="grouped-native-select"
                    label="Payment Account "
                    {...register("payment_account_second")}
                  >
                    <option aria-label="None" value="" />
                    <option value="First Category "> None </option>
                    <option value="First Category ">Bank Transfer </option>
                  </Select>
                </FormControl>
              </div>
              <div className="mt-10">
                {payment &&
                  (payment === "Check" ? (
                    <div>
                      <TextField
                        className="productField"
                        fullWidth
                        label=" Check No  "
                        {...register("check_no")}
                      />
                      <textarea
                        placeholder="Expense Note "
                        className="productDetail"
                        name=""
                        {...register("check_expense_note")}
                      />
                    </div>
                  ) : payment === "Bank Transfer" ? (
                    <div className="mt-4 ">
                      <TextField
                        className="productField"
                        fullWidth
                        label=" Bank Account No "
                        {...register("bank_account_no")}
                      />
                      <textarea
                        placeholder="Expense Note "
                        className="productDetail"
                        name=""
                        {...register("bank_expense_note")}
                      />
                    </div>
                  ) : payment === "Cash" ? (
                    <div className="mt-4 ">
                      <textarea
                        placeholder="Expense Note "
                        className="productDetail"
                        name=""
                        {...register("cash_expense_note")}
                      />
                    </div>
                  ) : payment === "Card" ? (
                    <div>
                      <div className="productFieldWrap">
                        <TextField
                          className="productField"
                          fullWidth
                          label="Card Number"
                          id="Tax"
                          {...register("card_number")}
                        />
                        <TextField
                          className="productField"
                          fullWidth
                          label="Card holder name"
                          id="Tax"
                          {...register("card_holder_name")}
                        />
                      </div>

                      <div className="productFieldWrap">
                        <TextField
                          className="productField"
                          fullWidth
                          label="Card Transaction No."
                          id="Tax"
                          {...register("card_transaction_no")}
                        />
                        <TextField
                          className="productField"
                          fullWidth
                          label="Card Type "
                          id="Tax"
                          {...register("card_type")}
                        />
                      </div>

                      <div className="productFieldWrap">
                        <TextField
                          className="productField"
                          fullWidth
                          label="Month "
                          id="Tax"
                          {...register("month_first")}
                        />
                        <TextField
                          className="productField"
                          fullWidth
                          label="Year"
                          id="Tax"
                          {...register("year")}
                        />
                      </div>

                      <div className="productFieldWrap">
                        <TextField
                          className="productField"
                          fullWidth
                          label="Month "
                          id="Tax"
                          {...register("month_second")}
                        />
                        <TextField
                          className="productField"
                          fullWidth
                          label="Security Code "
                          id="Tax"
                          {...register("security_code")}
                        />
                      </div>

                      <div className="mt-4 productDetailWrap">
                        <textarea
                          placeholder="Expense Note "
                          className="productDetail"
                          name=""
                          {...register("card_expense_note")}
                        />
                      </div>
                    </div>
                  ) : payment === "Other" ? (
                    <div>
                      <TextField
                        className="productField"
                        fullWidth
                        label="Transition No "
                        {...register("other_transaction_no")}
                      />
                      <textarea
                        placeholder="Expense Note "
                        className="productDetail"
                        name=""
                        {...register("other_expense_note")}
                      />
                    </div>
                  ) : null)}
              </div>
            </div>
            <div className="mt-2 savebtn">
              <button>Add Expense </button>
            </div>
          </form>
        </div>
      </div>
      <div className="w-full mt-5 mb-24">
        <div className="mt-20 overflow-x-auto">
          <div className="flex flex-wrap items-center justify-between mb-5">
            <h3 className="mb-3 text-sm font-bold lg:text-3xl">
              Expense List:
            </h3>
            <div className="flex items-center searcList">
              <div
                onClick={handleAllExpense}
                className="mx-6 font-semibold cursor-pointer bg-[#42A1DA] px-2 py-1 rounded-md text-white"
              >
                All
              </div>
              <div className="searchGroup">
                <input
                  onChange={(e) => setFilterType(e.target.value)}
                  autoComplete="off"
                  type="text"
                  placeholder="Search"
                />
              </div>
              <button onClick={handleFilterType} className="SearchBtn ">
                Search{" "}
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center text-xl">
            Loading...
          </div>
        ) : (
          <div>
            {getAllExpense?.length === 0 || currentItems.length === 0 ? (
              <div className="flex items-center justify-center h-full text-xl text-center">
                No matching suppliers found.
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
    </section>
  );
};

export default AddExpense;
