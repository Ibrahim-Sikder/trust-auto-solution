/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-no-undef */

import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  FaFileInvoice,
  FaEye,
  FaReddit,
  FaTrashAlt,
  FaCloudUploadAlt,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import { useState } from "react";
const UpdateExpense = () => {
  const [payment, setPayment] = useState("");

  const handlePaymentChange = (e) => {
    setPayment(e.target.value);
  };
  console.log(payment);
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
          <form>
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
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Tas Applicable"
                  id="Tax"
                />
              </div>

              <div className="productFieldWrap">
                <TextField
                  className="productField"
                  fullWidth
                  label=" Individual Markup  "
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Expanse Note "
                />
              </div>
              <div className="productFieldWrap">
                <TextField
                  className="productField"
                  fullWidth
                  label="Individual Markup"
                  id="Total Amount"
                />
                <div className="productField">
                  <input type="file" id="files" className="hidden" />

                  <label
                    for="files"
                    className="flex items-center justify-center cursor-pointer bg-[#42A1DA] text-white py-2 rounded-md "
                  >
                    <span>
                      <FaCloudUploadAlt size={30} className="mr-2" />
                    </span>
                    Attach Document
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
                />
              </div>
            </div>

            <h3 className="mt-10 text-xl font-semibold">Add payment </h3>
            <div>
              <div className="productFieldWrap">
                <TextField
                  className="productField"
                  fullWidth
                  label="Amount"
                  id="Tax"
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Paid On "
                  id="Tax"
                />
              </div>

              <div className="productFieldWrap">
                <TextField
                  className="productField"
                  fullWidth
                  label=" Individual Markup  "
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
                  >
                    <option aria-label="None" value="" />
                    <option value="Cash"> Cash </option>
                    <option value="Check"> Check </option>
                    <option value="Card"> Card </option>
                    <option value="Bank Transfer ">Bank Transfer </option>
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
                    <TextField
                      className="productField"
                      fullWidth
                      label=" Check No  "
                    />
                  ) : payment === "Bank Transfer" ? (
                    <TextField
                      className="productField"
                      fullWidth
                      label=" Bank Account No "
                    />
                  ) : payment === "Card" ? (
                    <div>
                      <div className="productFieldWrap">
                        <TextField
                          className="productField"
                          fullWidth
                          label="Card Number"
                          id="Tax"
                        />
                        <TextField
                          className="productField"
                          fullWidth
                          label="Card holder name"
                          id="Tax"
                        />
                      </div>

                      <div className="productFieldWrap">
                        <TextField
                          className="productField"
                          fullWidth
                          label="Card Transaction No."
                          id="Tax"
                        />
                        <TextField
                          className="productField"
                          fullWidth
                          label="Card Type "
                          id="Tax"
                        />
                      </div>

                      <div className="productFieldWrap">
                        <TextField
                          className="productField"
                          fullWidth
                          label="Month "
                          id="Tax"
                        />
                        <TextField
                          className="productField"
                          fullWidth
                          label="Year"
                          id="Tax"
                        />
                      </div>

                      <div className="productFieldWrap">
                        <TextField
                          className="productField"
                          fullWidth
                          label="Month "
                          id="Tax"
                        />
                        <TextField
                          className="productField"
                          fullWidth
                          label="Security Code "
                          id="Tax"
                        />
                      </div>

                      <div className="mt-4 productDetailWrap">
                        <textarea
                          placeholder="Expense Note "
                          className="productDetail"
                          name=""
                        />
                      </div>
                    </div>
                  ) :  payment === "Other" ? (
                    <TextField
                      className="productField"
                      fullWidth
                      label="Transition No "
                    />
                  ) 
                  
                  
                 : null)}
              </div>
            </div>
            <div className="flex justify-end mt-2 savebtn">
              <button>Update Expense </button>
            </div>
          </form>
        </div>
      </div>
      
    </section>
  );
};

export default UpdateExpense;
