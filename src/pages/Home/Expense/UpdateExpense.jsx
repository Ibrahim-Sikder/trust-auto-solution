/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-no-undef */

import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FaFileInvoice, FaCloudUploadAlt } from "react-icons/fa";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";

const UpdateExpense = () => {
  const [payment, setPayment] = useState("");

  const handlePaymentChange = (e) => {
    setPayment(e.target.value);
  };
  const [url, setUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [getSingleExpense, setGetSingleExpense] = useState({});
  const [filterType, setFilterType] = useState("");
  const [noMatching, setNoMatching] = useState(null);
  const [reload, setReload] = useState(false);

  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/expense/one/${id}`)
      .then((response) => {
        setGetSingleExpense(response.data.expense);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [id, reload]);

  console.log(getSingleExpense);

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
        category: data.category || getSingleExpense.category,
        sub_category: data.sub_category || getSingleExpense.sub_category,
        expense_for: data.expense_for || getSingleExpense.expense_for,
        tax_application:
          data.tax_application || getSingleExpense.tax_application,
        individual_markup_first:
          data.individual_markup_first ||
          getSingleExpense.individual_markup_first,
        expense_note_first:
          data.expense_note_first || getSingleExpense.expense_note_first,
        individual_markup_second:
          data.individual_markup_second ||
          getSingleExpense.individual_markup_second,
        expense_note_second:
          data.expense_note_second || getSingleExpense.expense_note_second,
        amount: data.amount || getSingleExpense.amount,
        paid_on: data.paid_on || getSingleExpense.paid_on,
        payment_individual_markup:
          data.payment_individual_markup ||
          getSingleExpense.payment_individual_markup,
        payment_account_first:
          payment || getSingleExpense.payment_account_first,
        payment_account_second:
          data.payment_account_second ||
          getSingleExpense.payment_account_second,
        check_no: data.check_no || getSingleExpense.check_no,
        check_expense_note:
          data.check_expense_note || getSingleExpense.check_expense_note,
        bank_account_no:
          data.bank_account_no || getSingleExpense.bank_account_no,

        bank_expense_note:
          data.bank_expense_note || getSingleExpense.bank_expense_note,
        cash_expense_note:
          data.cash_expense_note || getSingleExpense.cash_expense_note,
        card_number: data.card_number || getSingleExpense.card_number,
        card_holder_name:
          data.card_holder_name || getSingleExpense.card_holder_name,
        card_transaction_no:
          data.card_transaction_no || getSingleExpense.card_transaction_no,
        card_type: data.card_type || getSingleExpense.card_type,
        month_first: data.month_first || getSingleExpense.month_first,
        year: data.year || getSingleExpense.year,
        month_second: data.month_second || getSingleExpense.month_second,
        security_code: data.security_code || getSingleExpense.security_code,
        card_expense_note:
          data.card_expense_note || getSingleExpense.card_expense_note,
        other_transaction_no:
          data.other_transaction_no || getSingleExpense.other_transaction_no,
        other_expense_note:
          data.other_expense_note || getSingleExpense.other_expense_note,

        image: url ? url : getSingleExpense.image,
      };

      setLoading(true);
      const response = await axios.put(
        `http://localhost:5000/api/v1/expense/one/${id}`,
        values
      );

      if (response.data.message === "Successfully update card.") {
        toast.success("Successfully update card.");
        setLoading(false);
        setReload(!reload);
        navigate("/dashboard/expense");
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

  console.log(getSingleExpense);
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
                    label="Select Category "
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
                    {" "}
                    Sub Category{" "}
                  </InputLabel>
                  <Select
                    native
                    defaultValue=""
                    id="grouped-native-select"
                    label="Select Category "
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
                    className="flex items-center justify-center cursor-pointer bg-[#42A1DA] text-white py-2 rounded-md "
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
    </section>
  );
};

export default UpdateExpense;
