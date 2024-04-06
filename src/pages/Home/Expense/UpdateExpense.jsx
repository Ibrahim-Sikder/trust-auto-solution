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
  console.log(getSingleExpense.category);
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
                    value={getSingleExpense?.expense_for}
                    onChange={(e) =>
                      setGetSingleExpense({
                        ...getSingleExpense,
                        expense_for: e.target.value,
                      })
                    }
                    InputLabelProps={{
                      shrink: !!getSingleExpense.expense_for,
                    }}
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
                  value={getSingleExpense?.expense_for}
                  onChange={(e) =>
                    setGetSingleExpense({
                      ...getSingleExpense,
                      expense_for: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!getSingleExpense.expense_for,
                  }}
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Tax Applicable"
                  id="Tax"
                  {...register("tax_application")}
                  value={getSingleExpense?.tax_application}
                  onChange={(e) =>
                    setGetSingleExpense({
                      ...getSingleExpense,
                      tax_application: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!getSingleExpense.tax_application,
                  }}
                />
              </div>

              <div className="productFieldWrap">
                <TextField
                  className="productField"
                  fullWidth
                  label=" Individual Markup  "
                  {...register("individual_markup_first")}
                  value={getSingleExpense?.individual_markup_first}
                  onChange={(e) =>
                    setGetSingleExpense({
                      ...getSingleExpense,
                      individual_markup_first: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!getSingleExpense.individual_markup_first,
                  }}
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Expanse Note "
                  {...register("expense_note_first")}
                  value={getSingleExpense?.expense_note_first}
                  onChange={(e) =>
                    setGetSingleExpense({
                      ...getSingleExpense,
                      expense_note_first: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!getSingleExpense.expense_note_first,
                  }}
                />
              </div>
              <div className="productFieldWrap">
                <TextField
                  className="productField"
                  fullWidth
                  label="Individual Markup"
                  id="Total Amount"
                  {...register("individual_markup_second")}
                  value={getSingleExpense?.individual_markup_second}
                  onChange={(e) =>
                    setGetSingleExpense({
                      ...getSingleExpense,
                      individual_markup_second: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!getSingleExpense.individual_markup_second,
                  }}
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
                  value={getSingleExpense?.amount}
                  onChange={(e) =>
                    setGetSingleExpense({
                      ...getSingleExpense,
                      amount: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!getSingleExpense.amount,
                  }}
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Paid On "
                  id="Tax"
                  {...register("paid_on")}
                  value={getSingleExpense?.paid_on}
                  onChange={(e) =>
                    setGetSingleExpense({
                      ...getSingleExpense,
                      paid_on: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!getSingleExpense.paid_on,
                  }}
                />
              </div>

              <div className="productFieldWrap">
                <TextField
                  className="productField"
                  fullWidth
                  label=" Individual Markup  "
                  {...register("payment_individual_markup")}
                  value={getSingleExpense?.payment_individual_markup}
                  onChange={(e) =>
                    setGetSingleExpense({
                      ...getSingleExpense,
                      payment_individual_markup: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!getSingleExpense.payment_individual_markup,
                  }}
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
                        value={getSingleExpense?.check_no}
                        onChange={(e) =>
                          setGetSingleExpense({
                            ...getSingleExpense,
                            check_no: e.target.value,
                          })
                        }
                        InputLabelProps={{
                          shrink: !!getSingleExpense.check_no,
                        }}
                      />
                      <textarea
                        placeholder="Expense Note "
                        className="productDetail"
                        name=""
                        {...register("check_expense_note")}
                        value={getSingleExpense?.check_expense_note}
                        onChange={(e) =>
                          setGetSingleExpense({
                            ...getSingleExpense,
                            check_expense_note: e.target.value,
                          })
                        }
                        InputLabelProps={{
                          shrink: !!getSingleExpense.check_expense_note,
                        }}
                      />
                    </div>
                  ) : payment === "Bank Transfer" ? (
                    <div className="mt-4 ">
                      <TextField
                        className="productField"
                        fullWidth
                        label=" Bank Account No "
                        {...register("bank_account_no")}
                        value={getSingleExpense?.bank_account_no}
                        onChange={(e) =>
                          setGetSingleExpense({
                            ...getSingleExpense,
                            bank_account_no: e.target.value,
                          })
                        }
                        InputLabelProps={{
                          shrink: !!getSingleExpense.bank_account_no,
                        }}
                      />
                      <textarea
                        placeholder="Expense Note "
                        className="productDetail"
                        name=""
                        {...register("bank_expense_note")}
                        value={getSingleExpense?.bank_expense_note}
                        onChange={(e) =>
                          setGetSingleExpense({
                            ...getSingleExpense,
                            bank_expense_note: e.target.value,
                          })
                        }
                        InputLabelProps={{
                          shrink: !!getSingleExpense.bank_expense_note,
                        }}
                      />
                    </div>
                  ) : payment === "Cash" ? (
                    <div className="mt-4 ">
                      <textarea
                        placeholder="Expense Note "
                        className="productDetail"
                        name=""
                        {...register("cash_expense_note")}
                        value={getSingleExpense?.cash_expense_note}
                        onChange={(e) =>
                          setGetSingleExpense({
                            ...getSingleExpense,
                            cash_expense_note: e.target.value,
                          })
                        }
                        InputLabelProps={{
                          shrink: !!getSingleExpense.cash_expense_note,
                        }}
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
                          value={getSingleExpense?.card_number}
                        onChange={(e) =>
                          setGetSingleExpense({
                            ...getSingleExpense,
                            card_number: e.target.value,
                          })
                        }
                        InputLabelProps={{
                          shrink: !!getSingleExpense.card_number,
                        }}
                        />
                        <TextField
                          className="productField"
                          fullWidth
                          label="Card holder name"
                          id="Tax"
                          {...register("card_holder_name")}
                          value={getSingleExpense?.card_holder_name}
                          onChange={(e) =>
                            setGetSingleExpense({
                              ...getSingleExpense,
                              card_holder_name: e.target.value,
                            })
                          }
                          InputLabelProps={{
                            shrink: !!getSingleExpense.card_holder_name,
                          }}
                        />
                      </div>

                      <div className="productFieldWrap">
                        <TextField
                          className="productField"
                          fullWidth
                          label="Card Transaction No."
                          id="Tax"
                          {...register("card_transaction_no")}
                          value={getSingleExpense?.card_transaction_no}
                          onChange={(e) =>
                            setGetSingleExpense({
                              ...getSingleExpense,
                              card_transaction_no: e.target.value,
                            })
                          }
                          InputLabelProps={{
                            shrink: !!getSingleExpense.card_transaction_no,
                          }}
                        />
                        <TextField
                          className="productField"
                          fullWidth
                          label="Card Type "
                          id="Tax"
                          {...register("card_type")}
                          value={getSingleExpense?.card_type}
                          onChange={(e) =>
                            setGetSingleExpense({
                              ...getSingleExpense,
                              card_type: e.target.value,
                            })
                          }
                          InputLabelProps={{
                            shrink: !!getSingleExpense.card_type,
                          }}
                        />
                      </div>

                      <div className="productFieldWrap">
                        <TextField
                          className="productField"
                          fullWidth
                          label="Month "
                          id="Tax"
                          {...register("month_first")}
                          value={getSingleExpense?.month_first}
                          onChange={(e) =>
                            setGetSingleExpense({
                              ...getSingleExpense,
                              month_first: e.target.value,
                            })
                          }
                          InputLabelProps={{
                            shrink: !!getSingleExpense.month_first,
                          }}
                        />
                        <TextField
                          className="productField"
                          fullWidth
                          label="Year"
                          id="Tax"
                          {...register("year")}
                          value={getSingleExpense?.year}
                          onChange={(e) =>
                            setGetSingleExpense({
                              ...getSingleExpense,
                              year: e.target.value,
                            })
                          }
                          InputLabelProps={{
                            shrink: !!getSingleExpense.year,
                          }}
                        />
                      </div>

                      <div className="productFieldWrap">
                        <TextField
                          className="productField"
                          fullWidth
                          label="Month "
                          id="Tax"
                          {...register("month_second")}
                          value={getSingleExpense?.month_second}
                          onChange={(e) =>
                            setGetSingleExpense({
                              ...getSingleExpense,
                              month_second: e.target.value,
                            })
                          }
                          InputLabelProps={{
                            shrink: !!getSingleExpense.month_second,
                          }}
                        />
                        <TextField
                          className="productField"
                          fullWidth
                          label="Security Code "
                          id="Tax"
                          {...register("security_code")}
                          value={getSingleExpense?.security_code}
                          onChange={(e) =>
                            setGetSingleExpense({
                              ...getSingleExpense,
                              security_code: e.target.value,
                            })
                          }
                          InputLabelProps={{
                            shrink: !!getSingleExpense.security_code,
                          }}
                        />
                      </div>

                      <div className="mt-4 productDetailWrap">
                        <textarea
                          placeholder="Expense Note "
                          className="productDetail"
                          name=""
                          {...register("card_expense_note")}
                          value={getSingleExpense?.card_expense_note}
                          onChange={(e) =>
                            setGetSingleExpense({
                              ...getSingleExpense,
                              card_expense_note: e.target.value,
                            })
                          }
                          InputLabelProps={{
                            shrink: !!getSingleExpense.card_expense_note,
                          }}
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
                        value={getSingleExpense?.other_transaction_no}
                          onChange={(e) =>
                            setGetSingleExpense({
                              ...getSingleExpense,
                              other_transaction_no: e.target.value,
                            })
                          }
                          InputLabelProps={{
                            shrink: !!getSingleExpense.other_transaction_no,
                          }}
                      />
                      <textarea
                        placeholder="Expense Note "
                        className="productDetail"
                        name=""
                        {...register("other_expense_note")}
                        value={getSingleExpense?.other_expense_note}
                        onChange={(e) =>
                          setGetSingleExpense({
                            ...getSingleExpense,
                            other_expense_note: e.target.value,
                          })
                        }
                        InputLabelProps={{
                          shrink: !!getSingleExpense.other_expense_note,
                        }}
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
