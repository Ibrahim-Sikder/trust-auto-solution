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
} from "react-icons/fa";
import { TiEdit } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Axios } from "axios";
import { toast } from "react-toastify";

const AddExpense = () => {
  const [payment, setPayment] = useState("");

  const [url, setUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [getAllEmployee, setGetAllEmployee] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [noMatching, setNoMatching] = useState(null);
  const [reload, setReload] = useState(false);

  const handlePaymentChange = (e) => {
    setPayment(e.target.value);
  };
  console.log(payment);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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
    console.log(data)
    setError("");

    // const randomNumber = Math.floor(Math.random() * 1000);
    // const paddedNumber = randomNumber.toString().padStart(4, "0");
    // const uniqueId = `TAS${paddedNumber}`;

   
      const values = {
        // employeeId: uniqueId,
        full_name: data.full_name,
        date_of_birth: data.date_of_birth,
        nid_number: data.nid_number,
        blood_group: data.blood_group,
        phone_number: data.phone_number,
        email: data.email,
        gender: data.gender,
        join_date: data.join_date,
        designation: data.designation,
        status: data.status,
        password: data.password,
        confirm_password: data.confirm_password,
        father_name: data.father_name,
        mother_name: data.mother_name,
        nationality: data.nationality,
        religion: data.religion,

        country: data.country,
        city: data.city,
        address: data.address,
        image: url,
      };

      setLoading(true);
      // const response = await Axios.post(
      //   "http://localhost:5000/api/v1/employee",
      //   values
      // );

    //   if (response.data.message === "Successfully employee post") {
    //     toast.success("Successfully employee added.");
    //     setLoading(false);
    //     // const newId = empId + 1;
    //     // setEmpId(newId);
    //     setReload(!reload);
    //     reset();
    //     setError("");
    //   }
    // } catch (error) {
    //   if (error.response) {
    //     setLoading(false);
    //     setError(error.response.data.message);
    //   }
    // }
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
                    {...register("payment_account_first")}
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
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-3xl font-bold text-center "> Expense List: </h3>
          </div>

          <div className="flex items-center">
            <div className="searchGroup">
              <input autoComplete="off" type="text" />
            </div>
            <button className="SearchBtn ">Search </button>
          </div>
        </div>

        <div className="overflow-x-auto ">
          <table className="table ">
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
              <tr>
                <td>01</td>
                <td>Month </td>
                <td>Salary </td>
                <td>Electricity </td>
                <td>595995</td>
                <td>Card</td>
                <td>
                  <div className="editIconWrap edit">
                    <FaEye className="editIcon" />
                  </div>
                </td>
                <td>
                  <div className="editIconWrap edit">
                    <Link to="/dashboard/update-expense">
                      <TiEdit className="editIcon" />
                    </Link>
                  </div>
                </td>
                <td>
                  <div className="editIconWrap">
                    <FaTrashAlt className="deleteIcon" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AddExpense;
