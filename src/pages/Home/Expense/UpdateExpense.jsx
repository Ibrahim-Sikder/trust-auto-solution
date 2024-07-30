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
import {
  useGetSingleExpenseQuery,
  useUpdateExpenseMutation,
} from "../../../redux/api/expense";
import { ErrorMessage } from "../../../components/error-message";
import Loading from "../../../components/Loading/Loading";

const UpdateExpense = () => {
  const [payment, setPayment] = useState("");

  const handlePaymentChange = (e) => {
    setPayment(e.target.value);
  };
  const [url, setUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(false);

  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {
    data: getSingleExpense,
    isLoading: singleExpenseLoading,
    error: singleExpenseError,
    refetch,
  } = useGetSingleExpenseQuery(id);

  const [updateExpense, { isLoading: updateLoading, error: updateError }] =
    useUpdateExpenseMutation();

  useEffect(() => {
    if (getSingleExpense?.data) {
      reset({
        category: getSingleExpense?.data?.category,
        sub_category: getSingleExpense?.data?.sub_category,
        expense_for: getSingleExpense?.data?.expense_for,
        tax_application: getSingleExpense?.data?.tax_application,
        individual_markup_first:
          getSingleExpense?.data?.individual_markup_first,
        expense_note_first: getSingleExpense?.data?.expense_note_first,
        individual_markup_second:
          getSingleExpense?.data?.individual_markup_second,
        expense_note_second: getSingleExpense?.data?.expense_note_second,
        amount: getSingleExpense?.data?.amount,
        paid_on: getSingleExpense?.data?.paid_on,
        payment_individual_markup:
          getSingleExpense?.data?.payment_individual_markup,
        payment_method: getSingleExpense?.data?.payment_method,
        payment_account: getSingleExpense?.data?.payment_account,
        check_no: getSingleExpense?.data?.check_no,
        check_expense_note: getSingleExpense?.data?.check_expense_note,
        bank_account_no: getSingleExpense?.data?.bank_account_no,

        bank_expense_note: getSingleExpense?.data?.bank_expense_note,
        cash_expense_note: getSingleExpense?.data?.cash_expense_note,
        card_number: getSingleExpense?.data?.card_number,
        card_holder_name: getSingleExpense?.data?.card_holder_name,
        card_transaction_no: getSingleExpense?.data?.card_transaction_no,
        card_type: getSingleExpense?.data?.card_type,
        month_first: getSingleExpense?.data?.month_first,
        year: getSingleExpense?.data?.year,
        month_second: getSingleExpense?.data?.month_second,
        security_code: getSingleExpense?.data?.security_code,
        card_expense_note: getSingleExpense?.data?.card_expense_note,
        other_transaction_no: getSingleExpense?.data?.other_transaction_no,
        other_expense_note: getSingleExpense?.data?.other_expense_note,

        image: getSingleExpense?.data?.image,
      });
    }
  }, [getSingleExpense?.data, reset]);

  const handleImageUpload = async (e) => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      setImageLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/uploads`,
        {
          method: "POST",
          body: formData,
        }
      );

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
    data.image = url;
    data.amount = Number(data.amount);

    const values = {
      id,
      data,
    };

    try {
      const response = await updateExpense(values).unwrap();
      if (response.success) {
        toast.success(response.message);
        navigate("/dashboard/expense");
        refetch();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (singleExpenseLoading) {
    return <Loading />;
  }

  if (singleExpenseError) {
    toast.error(singleExpenseError?.status);
  }
   
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
                    focused={getSingleExpense?.data?.category}
                  >
                    <option aria-label="None" value="" />
                    <option value="Daily"> Daily </option>
                    <option value="Monthly"> Monthly </option>
                    <option value="Yearly"> Yearly </option>
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
                    focused={getSingleExpense?.data?.sub_category}
                  >
                    <option aria-label="None" value="" />
                    <option value="Rent"> Rent </option>
                    <option value="Salary"> Salary </option>
                    <option value="Electricity">Electricity </option>
                    <option value="Other">Other </option>
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
                  focused={getSingleExpense?.data?.expense_for}
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Tax Applicable"
                  id="Tax"
                  {...register("tax_application")}
                  focused={getSingleExpense?.data?.tax_application}
                />
              </div>

              <div className="productFieldWrap">
                <TextField
                  className="productField"
                  fullWidth
                  label=" Individual Markup  "
                  {...register("individual_markup_first")}
                  focused={getSingleExpense?.data?.individual_markup_first}
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Expanse Note "
                  {...register("expense_note_first")}
                  focused={getSingleExpense?.data?.expense_note_first}
                />
              </div>
              <div className="productFieldWrap">
                <TextField
                  className="productField"
                  fullWidth
                  label="Individual Markup"
                  id="Total Amount"
                  {...register("individual_markup_second")}
                  focused={getSingleExpense?.data?.individual_markup_second}
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
                  focused={getSingleExpense?.data?.expense_note_second}
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
                  focused={getSingleExpense?.data?.amount}
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Paid On "
                  id="Tax"
                  {...register("paid_on")}
                  focused={getSingleExpense?.data?.paid_on}
                />
              </div>

              <div className="productFieldWrap">
                <TextField
                  className="productField"
                  fullWidth
                  label=" Individual Markup  "
                  {...register("payment_individual_markup")}
                  focused={getSingleExpense?.data?.payment_individual_markup}
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
                    {...register("payment_method")}
                    focused={getSingleExpense?.data?.payment_method}
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
                    {...register("payment_account")}
                    focused={getSingleExpense?.data?.payment_account}
                  >
                    <option aria-label="None" value="" />
                    <option value="None"> None </option>
                    <option value="Bank Transfer">Bank Transfer </option>
                  </Select>
                </FormControl>
              </div>
              {payment === "" && (
                <div className="mt-10">
                  {getSingleExpense?.data?.payment_method &&
                    (getSingleExpense?.data?.payment_method === "Check" ? (
                      <div>
                        <TextField
                          className="productField"
                          fullWidth
                          label=" Check No  "
                          {...register("check_no")}
                          focused={getSingleExpense?.data?.check_no}
                        />
                        <textarea
                          placeholder="Expense Note "
                          className="productDetail"
                          name=""
                          {...register("check_expense_note")}
                          focused={getSingleExpense?.data?.check_expense_note}
                        />
                      </div>
                    ) : getSingleExpense?.data?.payment_method ===
                      "Bank Transfer" ? (
                      <div className="mt-4 ">
                        <TextField
                          className="productField"
                          fullWidth
                          label=" Bank Account No "
                          {...register("bank_account_no")}
                          focused={getSingleExpense?.data?.bank_account_no}
                        />
                        <textarea
                          placeholder="Expense Note "
                          className="productDetail"
                          name=""
                          {...register("bank_expense_note")}
                          focused={getSingleExpense?.data?.bank_expense_note}
                        />
                      </div>
                    ) : getSingleExpense?.data?.payment_method === "Cash" ? (
                      <div className="mt-4 ">
                        <textarea
                          placeholder="Expense Note "
                          className="productDetail"
                          name=""
                          {...register("cash_expense_note")}
                          focused={getSingleExpense?.data?.cash_expense_note}
                        />
                      </div>
                    ) : getSingleExpense?.data?.payment_method === "Card" ? (
                      <div>
                        <div className="productFieldWrap">
                          <TextField
                            className="productField"
                            fullWidth
                            label="Card Number"
                            id="Tax"
                            {...register("card_number")}
                            focused={getSingleExpense?.data?.card_number}
                          />
                          <TextField
                            className="productField"
                            fullWidth
                            label="Card holder name"
                            id="Tax"
                            {...register("card_holder_name")}
                            focused={getSingleExpense?.data?.card_holder_name}
                          />
                        </div>

                        <div className="productFieldWrap">
                          <TextField
                            className="productField"
                            fullWidth
                            label="Card Transaction No."
                            id="Tax"
                            {...register("card_transaction_no")}
                            focused={
                              getSingleExpense?.data?.card_transaction_no
                            }
                          />
                          <TextField
                            className="productField"
                            fullWidth
                            label="Card Type "
                            id="Tax"
                            {...register("card_type")}
                            focused={getSingleExpense?.data?.card_type}
                          />
                        </div>

                        <div className="productFieldWrap">
                          <TextField
                            className="productField"
                            fullWidth
                            label="Month "
                            id="Tax"
                            {...register("month_first")}
                            focused={getSingleExpense?.data?.month_first}
                          />
                          <TextField
                            className="productField"
                            fullWidth
                            label="Year"
                            id="Tax"
                            {...register("year")}
                            focused={getSingleExpense?.data?.year}
                          />
                        </div>

                        <div className="productFieldWrap">
                          <TextField
                            className="productField"
                            fullWidth
                            label="Month "
                            id="Tax"
                            {...register("month_second")}
                            focused={getSingleExpense?.data?.month_second}
                          />
                          <TextField
                            className="productField"
                            fullWidth
                            label="Security Code "
                            id="Tax"
                            {...register("security_code")}
                            focused={getSingleExpense?.data?.security_code}
                          />
                        </div>

                        <div className="mt-4 productDetailWrap">
                          <textarea
                            placeholder="Expense Note "
                            className="productDetail"
                            name=""
                            {...register("card_expense_note")}
                            focused={getSingleExpense?.data?.card_expense_note}
                          />
                        </div>
                      </div>
                    ) : getSingleExpense?.data?.payment_method === "Other" ? (
                      <div>
                        <TextField
                          className="productField"
                          fullWidth
                          label="Transition No "
                          {...register("other_transaction_no")}
                          focused={getSingleExpense?.data?.other_transaction_no}
                        />
                        <textarea
                          placeholder="Expense Note "
                          className="productDetail"
                          name=""
                          {...register("other_expense_note")}
                          focused={getSingleExpense?.data?.other_expense_note}
                        />
                      </div>
                    ) : null)}
                </div>
              )}
            </div>
            <div className="my-2">
              {updateError && (
                <ErrorMessage messages={updateError.data.errorSources} />
              )}
            </div>
            <div className="mt-2 savebtn">
              <button disabled={updateLoading}>Update Expense </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdateExpense;
