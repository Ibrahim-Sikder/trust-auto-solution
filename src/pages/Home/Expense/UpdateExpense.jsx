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
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import swal from "sweetalert";
import {
  useCreateExpenseMutation,
  useDeleteExpenseMutation,
  useGetAllExpensesQuery,
} from "../../../redux/api/expense";
import { ErrorMessage } from "../../../components/error-message";
import Loading from "../../../components/Loading/Loading";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Pagination,
  Typography,
} from "@mui/material";
import { HiOutlineSearch } from "react-icons/hi";
import uploadFile from "../../../helper/uploadFile";

const AddExpense = () => {
  const textInputRef = useRef(null);
  const [filterType, setFilterType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { register, watch, handleSubmit } = useForm();

  const payment = watch("payment_method");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const limit = 10;

  const [createExpense, { isLoading: createLoading, error: createError }] =
    useCreateExpenseMutation();

  const [deleteExpense, { isLoading: deleteLoading, error: deleteError }] =
    useDeleteExpenseMutation();

  const {
    data: allExpenses,
    isLoading: expenseLoading,
    error: expenseError,
  } = useGetAllExpensesQuery({
    limit,
    page: currentPage,
    searchTerm: filterType,
  });

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
    data.amount = Number(data.amount);

    try {
      const response = await createExpense(data).unwrap();
      if (response.success) {
        toast.success(response.message);
      }

      console.log(response);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deletePackage = async (id) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this card?",
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      try {
        await deleteExpense(id).unwrap;
        swal("Deleted!", "Card delete successful.", "success");
      } catch (error) {
        swal("Error", "An error occurred while deleting the card.", "error");
      }
    }
  };

  const handleAllExpense = () => {
    setFilterType("");
    if (textInputRef.current) {
      textInputRef.current.value = "";
    }
  };

  if (expenseError) {
    toast.error(expenseError?.data?.message);
  }
  if (deleteError) {
    toast.error(deleteError?.data?.message);
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
                          <MenuItem value="Bkash">Daily</MenuItem>
                          <MenuItem value="Bkash">Monthly</MenuItem>
                          <MenuItem value="Bkash">Yearly</MenuItem>
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
                          <MenuItem value="Bkash">Rent</MenuItem>
                          <MenuItem value="Nagad">Salary</MenuItem>
                          <MenuItem value="Nagad">Electricity</MenuItem>
                          <MenuItem value="Nagad">Other</MenuItem>
                          <MenuItem value="Nagad">Salary</MenuItem>
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
                                <span> Attach Document</span>
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
                        {...register("expense_note_second")}
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
                  <TextField fullWidth label="Amount" {...register("amount")} />
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
                                {...register("payment_account")}
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
                              label="Account Number "
                              {...register("check_no")}
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
                            {...register("cash_expense_note")}
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
                          <Grid item  lg={6} md={6} sm={12} xs={12}>
                            <TextField
                              fullWidth
                              label="Transition No"
                              {...register("other_transaction_no")}
                              marginTop={2}
                            />
                          </Grid>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                              fullWidth
                              label="Transition ID"
                              {...register("other_transaction_id")}
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
                              {...register("other_transaction_no")}
                              marginTop={2}
                            />
                          </Grid>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                              fullWidth
                              label="Transition ID"
                              {...register("other_transaction_id")}
                              marginTop={2}
                            />
                          </Grid>
                        </>
                      )}
                      <Grid item  lg={6} md={6} sm={12} xs={12}>
                        <TextField
                          fullWidth
                          multiline
                          rows={4}
                          placeholder="Expense Note"
                          {...register("other_expense_note")}
                          marginTop={4}
                        />
                      </Grid>
                    </>
                  )}
                </Grid>
              </Box>
              <div className="flex justify-end mt-3">
                <Button sx={{ color: "white", width: "200px" }}>Submit</Button>
              </div>
            </Box>
            <div className="my-2">
              {createError && (
                <ErrorMessage messages={createError.data.errorSources} />
              )}
            </div>
          </form>
        </div>
      </div>
      <div className="w-full mt-5 mb-24">
        <div className="flex flex-wrap items-center justify-between mb-5">
          <h3 className="txt-center tet-sm ml- sm:ml-0 ont-bold md:text-3xl">
            {" "}
            Expense List:{" "}
          </h3>
          <div className="flex flex-wrap items-center">
            <button
              onClick={handleAllExpense}
              className="bg-[#42A1DA] text-white px-4 py-2 rounded-md mr-1"
            >
              All
            </button>
            <input
              onChange={(e) => setFilterType(e.target.value)}
              type="text"
              placeholder="Search"
              className="border py-2 px-3 rounded-md border-[#ddd]"
              ref={textInputRef}
            />
            <button
              className="bg-[#42A1DA] text-white px-2 py-2 rounded-md ml-1"
              disabled={filterType === ""}
            >
              {" "}
              <HiOutlineSearch size={25} />
            </button>
          </div>
        </div>
        {expenseLoading ? (
          <div className="flex items-center justify-center text-xl">
            <Loading />
          </div>
        ) : (
          <div>
            {allExpenses?.data?.expenses?.length === 0 ? (
              <div className="flex items-center justify-center h-full text-xl text-center">
                No matching card found.
              </div>
            ) : (
              <section>
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
                    {allExpenses?.data?.expenses?.map((card, index) => (
                      <tr key={card._id}>
                        <td>{index + 1}</td>
                        <td>{card?.category}</td>
                        <td>{card?.sub_category}</td>
                        <td>{card?.expense_for}</td>
                        <td>{card?.amount}</td>
                        <td>{card?.payment_method}</td>
                        <td>
                          <div className="flex items-center justify-center ">
                            {/* <Link to="/dashboard/employee-profile"> */}
                            <FaEye size={25} className="" />
                            {/* </Link> */}
                          </div>
                        </td>

                        <td>
                          <div className="editIconWrap edit">
                            <Link
                              to={`/dashboard/update-expense?id=${card._id}`}
                            >
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
              </section>
            )}
          </div>
        )}
        {allExpenses?.data?.expenses?.length > 0 && (
          <div className="flex justify-center mt-4">
            <Pagination
              count={allExpenses?.data?.meta?.totalPages}
              page={currentPage}
              color="primary"
              onChange={(_, page) => setCurrentPage(page)}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default AddExpense;
