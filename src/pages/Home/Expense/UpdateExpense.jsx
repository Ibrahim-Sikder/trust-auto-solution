/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-no-undef */

import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputMask from "react-input-mask";
import {
  FaFileInvoice,
  FaEye,
  FaTrashAlt,
  FaCloudUploadAlt,
  FaUser,
  FaEdit,
} from "react-icons/fa";
import { TiEdit } from "react-icons/ti";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import swal from "sweetalert";
import {
  useCreateExpenseMutation,
  useDeleteExpenseMutation,
  useGetAllExpensesQuery,
  useGetSingleExpenseQuery,
  useUpdateExpenseMutation,
} from "../../../redux/api/expense";
import { ErrorMessage } from "../../../components/error-message";
import Loading from "../../../components/Loading/Loading";
import { Box, Button, Grid, MenuItem, Typography } from "@mui/material";
import uploadFile from "../../../helper/uploadFile";

const AddExpense = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const { register, watch, handleSubmit, reset } = useForm();

  const payment = watch("payment_method");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const [updateExpense, { isLoading: updateLoading, error: updateError }] =
    useUpdateExpenseMutation();

  const { data: singleExpense, isLoading: expenseLoading } =
    useGetSingleExpenseQuery(id);

  useEffect(() => {
    if (singleExpense?.data) {
      reset({
        category: singleExpense?.data?.category || "",
        sub_category: singleExpense?.data?.sub_category || "",
        expense_for: singleExpense?.data?.expense_for || "",
        tax_application: singleExpense?.data?.tax_application || "",
        amount: singleExpense?.data?.amount || "",
        paid_on: singleExpense?.data?.paid_on || "",
        payment_individual_markup:
          singleExpense?.data?.payment_individual_markup || "",
        payment_method: singleExpense?.data?.payment_method || "",
        transaction_no: singleExpense?.data?.transaction_no || "",
        transactionId: singleExpense?.data?.transactionId || "",
        expense_note: singleExpense?.data?.expense_note || "",
        selected_bank: singleExpense?.data?.selected_bank || "",
        bank_account_no: singleExpense?.data?.bank_account_no || "",
        card_number: singleExpense?.data?.card_number || "",
        card_holder_name: singleExpense?.data?.card_holder_name || "",
        card_transaction_no: singleExpense?.data?.card_transaction_no || "",
        card_type: singleExpense?.data?.card_type || "",
        month_first: singleExpense?.data?.month_first || "",
        year: singleExpense?.data?.year || "",
        month_second: singleExpense?.data?.month_second || "",
        security_code: singleExpense?.data?.security_code || "",
        check_no: singleExpense?.data?.check_no || "",
        image: singleExpense?.data?.image || "",
      });
    }
  }, [reset, singleExpense?.data]);

  const handleImageUpload = async (event) => {
    setLoading(true);
    const file = event.target.files?.[0];

    if (file) {
      const uploadPhoto = await uploadFile(file);
      setUrl(uploadPhoto?.secure_url);
      setLoading(false);
    }
  };
  const onSubmit = async (data) => {
    data.payment_method = payment;
    data.image = url;

    const values = {
      id,
      data,
    };

    try {
      const response = await updateExpense(values).unwrap();
      if (response.success) {
        toast.success(response.message);
        navigate("/dashboard/expense");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (expenseLoading) {
    return <Loading />;
  }

  return (
    <section>
      <div className="addProductWraps">
        <div className="productHeadWrap">
          <div className="flex items-center md:justify-center ">
            <FaFileInvoice className="invoicIcon" />
            <div className="ml-2">
              <h3 className="md:text-2xl font-bold">Add Expense </h3>
              <span className="text-sm">Dashboard / Expense </span>
            </div>
          </div>
        </div>

        <div className="addProductWrap">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="productFieldWrap">
                <Box>
                  <Grid container spacing={2}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor="grouped-native-select">
                          Expense Category
                        </InputLabel>
                        <Select
                          labelId="payment-method-label"
                          id="grouped-native-select"
                          label="Expense Category"
                          {...register("category")}
                        >
                          <MenuItem value="Daily">Daily</MenuItem>
                          <MenuItem value="Monthly">Monthly</MenuItem>
                          <MenuItem value="Yearly">Yearly</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor="grouped-native-select">
                          Sub Category
                        </InputLabel>
                        <Select
                          labelId="payment-method-label"
                          id="grouped-native-select"
                          label="Sub Category"
                          {...register("sub_category")}
                        >
                          <MenuItem value="Rent">Rent</MenuItem>
                          <MenuItem value="Salary">Salary</MenuItem>
                          <MenuItem value="Electricity">Electricity</MenuItem>
                          <MenuItem value="Salary">Salary</MenuItem>
                          <MenuItem value="Other">Other</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <TextField
                        fullWidth
                        label="Expense For"
                        id="Tax"
                        {...register("expense_for")}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <TextField
                        fullWidth
                        label="Tax Applicable"
                        id="Tax"
                        {...register("tax_application")}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
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
                          {loading ? (
                            <span>Uploading...</span>
                          ) : (
                            <>
                              {url ? (
                                <span>Uploaded</span>
                              ) : (
                                <span>
                                  {" "}
                                  {singleExpense?.data?.image
                                    ? singleExpense?.data?.image.slice(0, 20)
                                    : "Attach Document"}
                                </span>
                              )}
                            </>
                          )}
                        </label>
                      </div>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <textarea
                        placeholder="Expense Note "
                        className="productDetail"
                        id=""
                        cols="30"
                        rows="10"
                        {...register("expense_note_first")}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </div>
            </div>

            <Box marginTop="20px">
              <Typography variant="h5" fontWeight="bold" marginBottom="20px">
                Payment Method
              </Typography>
              <Grid container spacing={2}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <InputMask
                    mask="99999999999999999999999999999999999999999"
                    maskChar={null}
                    {...register("amount")}
                  >
                    {() => (
                      <TextField
                        fullWidth
                        label="Amount"
                        {...register("amount")}
                      />
                    )}
                  </InputMask>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Paid On"
                    {...register("paid_on")}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Individual Markup"
                    {...register("payment_individual_markup")}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="payment-method-select">
                      Payment Method
                    </InputLabel>
                    <Select
                      //   onChange={handlePaymentChange}
                      label="Payment Method"
                      id="payment-method-select"
                      {...register("payment_method")}
                    >
                      <MenuItem value="Bkash">Bkash</MenuItem>
                      <MenuItem value="Nagad">Nagad</MenuItem>
                      <MenuItem value="Rocket">Rocket</MenuItem>
                      <MenuItem value="Check">Check</MenuItem>
                      <MenuItem value="Card">Card</MenuItem>
                      <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Box marginTop={4}>
                <Grid container spacing={2}>
                  {payment && (
                    <>
                      {payment === "Check" && (
                        <>
                          <Grid item lg={6}>
                            <FormControl fullWidth>
                              <InputLabel htmlFor="payment-account-select">
                                Select Bank
                              </InputLabel>
                              <Select
                                label="Payment Account"
                                id="payment-account-select"
                                {...register("selected_bank")}
                              >
                                <MenuItem value="Bangladesh Bank">
                                  Bangladesh Bank
                                </MenuItem>
                                <MenuItem value="Sonali Bank">
                                  Sonali Bank
                                </MenuItem>
                                <MenuItem value="Janata Bank">
                                  Janata Bank
                                </MenuItem>
                                <MenuItem value="Agrani Bank">
                                  Agrani Bank
                                </MenuItem>
                                <MenuItem value="Rupali Bank">
                                  Rupali Bank
                                </MenuItem>
                                <MenuItem value="Pubali Bank">
                                  Pubali Bank
                                </MenuItem>
                                <MenuItem value="Uttara Bank">
                                  Uttara Bank
                                </MenuItem>
                                <MenuItem value="Islami Bank Bangladesh Limited">
                                  Islami Bank Bangladesh Limited
                                </MenuItem>
                                <MenuItem value="Dutch-Bangla Bank">
                                  Dutch-Bangla Bank
                                </MenuItem>
                                <MenuItem value="BRAC Bank">BRAC Bank</MenuItem>
                                <MenuItem value="Eastern Bank">
                                  Eastern Bank
                                </MenuItem>
                                <MenuItem value="National Bank">
                                  National Bank
                                </MenuItem>
                                <MenuItem value="Prime Bank">
                                  Prime Bank
                                </MenuItem>
                                <MenuItem value="South Bangla Agriculture and Commerce Bank">
                                  South Bangla Agriculture and Commerce Bank
                                </MenuItem>
                                <MenuItem value="Standard Bank">
                                  Standard Bank
                                </MenuItem>
                                <MenuItem value="One Bank">One Bank</MenuItem>
                                <MenuItem value="Bank Asia">Bank Asia</MenuItem>
                                <MenuItem value="Trust Bank">
                                  Trust Bank
                                </MenuItem>
                                <MenuItem value="Jamuna Bank">
                                  Jamuna Bank
                                </MenuItem>
                                <MenuItem value="Shahjalal Islami Bank">
                                  Shahjalal Islami Bank
                                </MenuItem>
                                <MenuItem value="City Bank">City Bank</MenuItem>
                                <MenuItem value="Southeast Bank">
                                  Southeast Bank
                                </MenuItem>
                                <MenuItem value="Social Islami Bank">
                                  Social Islami Bank
                                </MenuItem>
                                <MenuItem value="AB Bank">AB Bank</MenuItem>
                                <MenuItem value="IFIC Bank">IFIC Bank</MenuItem>
                                <MenuItem value="Mercantile Bank">
                                  Mercantile Bank
                                </MenuItem>
                                <MenuItem value="Mutual Trust Bank">
                                  Mutual Trust Bank
                                </MenuItem>
                                <MenuItem value="EXIM Bank">EXIM Bank</MenuItem>
                                <MenuItem value="NCC Bank">NCC Bank</MenuItem>
                                <MenuItem value="SBAC Bank">SBAC Bank</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item lg={6}>
                            <TextField
                              fullWidth
                              label="Account Number"
                              {...register("bank_account_no")}
                            />
                          </Grid>
                          <Grid item lg={6}>
                            <TextField
                              fullWidth
                              label="Check No"
                              {...register("check_no")}
                            />
                          </Grid>
                        </>
                      )}
                      {payment === "Bank Transfer" && (
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                          <TextField
                            fullWidth
                            label="Bank Account No"
                            {...register("bank_account_no")}
                            marginTop={2}
                          />
                        </Grid>
                      )}
                      {payment === "Cash" && (
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                          <TextField
                            fullWidth
                            multiline
                            rows={4}
                            placeholder="Expense Note"
                            {...register("expense_note")}
                            marginTop={2}
                          />
                        </Grid>
                      )}
                      {payment === "Card" && (
                        <>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                              fullWidth
                              label="Card Number"
                              {...register("card_number")}
                            />
                          </Grid>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                              fullWidth
                              label="Card Holder Name"
                              {...register("card_holder_name")}
                            />
                          </Grid>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                              fullWidth
                              label="Card Transaction No."
                              {...register("card_transaction_no")}
                            />
                          </Grid>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                              fullWidth
                              label="Card Type"
                              {...register("card_type")}
                            />
                          </Grid>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                              fullWidth
                              label="Month"
                              {...register("month_first")}
                            />
                          </Grid>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                              fullWidth
                              label="Year"
                              {...register("year")}
                            />
                          </Grid>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                              fullWidth
                              label="Month"
                              {...register("month_second")}
                            />
                          </Grid>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                              fullWidth
                              label="Security Code"
                              {...register("security_code")}
                            />
                          </Grid>
                        </>
                      )}
                      {payment === "Other" && (
                        <>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                              fullWidth
                              label="Transition No"
                              {...register("transaction_no")}
                              marginTop={2}
                            />
                          </Grid>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                              fullWidth
                              label="Transition ID"
                              {...register("transactionId")}
                              marginTop={2}
                            />
                          </Grid>
                        </>
                      )}
                      {(payment === "Bkash" ||
                        payment === "Nagad" ||
                        payment === "Rocket") && (
                        <>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                              fullWidth
                              label="Transition No"
                              {...register("transaction_no")}
                              marginTop={2}
                            />
                          </Grid>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                              fullWidth
                              label="Transition ID"
                              {...register("transactionId")}
                              marginTop={2}
                            />
                          </Grid>
                        </>
                      )}
                      <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextField
                          fullWidth
                          multiline
                          rows={4}
                          placeholder="Expense Note"
                          {...register("expense_note")}
                          marginTop={4}
                        />
                      </Grid>
                    </>
                  )}
                </Grid>
              </Box>
              <div className="flex justify-end mt-3">
                <button
                  disabled={updateLoading}
                  className="bg-[#42A1DA] text-white px-5 py-2 rounded-md"
                >
                  Update
                </button>
              </div>
            </Box>
          </form>

          {updateError && (
            <ErrorMessage messages={updateError?.data?.errorSources} />
          )}
        </div>
      </div>
    </section>
  );
};

export default AddExpense;
