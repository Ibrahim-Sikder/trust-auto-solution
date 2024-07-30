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
import { MenuItem, Pagination } from "@mui/material";
import { HiOutlineSearch } from "react-icons/hi";

const AddExpense = () => {
  const textInputRef = useRef(null);
  const [filterType, setFilterType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [payment, setPayment] = useState("");

  const [url, setUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(false);

  const handlePaymentChange = (e) => {
    setPayment(e.target.value);
  };
  const limit = 10;

  const { register, handleSubmit } = useForm();

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
                <FormControl className="productField">
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
                <FormControl className="productField">
                  <InputLabel htmlFor="grouped-native-select">
                    Sub Category
                  </InputLabel>
                  <Select
                    onChange={handlePaymentChange}
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
                <FormControl fullWidth className="productField">
                  <InputLabel htmlFor="grouped-native-select">
                    Payment Method
                  </InputLabel>
                  <Select
                    onChange={handlePaymentChange}
                    // {...register("payment_account_first")}
                    labelId="payment-method-label"
                    label="Payment Method"
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
              </div>
              <div className="productFieldWrap">
                <FormControl className="productField">
                  <InputLabel htmlFor="grouped-native-select">
                    Payment Account
                  </InputLabel>
                  <Select
                    id="grouped-native-select"
                    label="Payment Account "
                    {...register("payment_account")}
                  >
                    <MenuItem value="Bkash">Bank Transfer</MenuItem>
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
                    </div>
                  ) : payment === "Bank Transfer" ? (
                    <div className="mt-4 ">
                      <TextField
                        className="productField"
                        fullWidth
                        label=" Bank Account No "
                        {...register("bank_account_no")}
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
                    </div>
                  ) : payment === "Other" ? (
                    <div>
                      <div>
                        <TextField
                          className="productField"
                          fullWidth
                          label="Transition No "
                          {...register("other_transaction_no")}
                        />
                      </div>
                      <div className="mt-4">
                        <TextField
                          className="productField"
                          fullWidth
                          label="Transition ID "
                          {...register("other_transaction_no")}
                        />
                      </div>
                    </div>
                  ) : (payment === "Bkash") |
                    (payment === "Nagad") |
                    (payment === "Rocket") ? (
                    <div>
                      <div>
                        <TextField
                          className="productField"
                          fullWidth
                          label="Transition No "
                          {...register("other_transaction_no")}
                        />
                      </div>
                      <div>
                        <TextField
                          className="productField"
                          fullWidth
                          label="Transition ID "
                          {...register("other_transaction_no")}
                        />
                      </div>
                    </div>
                  ) : null)}

                <div className="mt-4">
                  <textarea
                    placeholder="Expense Note "
                    className="productDetail"
                    name=""
                    {...register("other_expense_note")}
                  />
                </div>
              </div>
            </div>
            <div className="my-2">
              {createError && (
                <ErrorMessage messages={createError.data.errorSources} />
              )}
            </div>
            <div className="mt-2 savebtn">
              <button disabled={createLoading}>Add Expense </button>
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
