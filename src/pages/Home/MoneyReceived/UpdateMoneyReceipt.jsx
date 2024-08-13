/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import "./MoneyReceived.css";
import logo from "../../../../public/assets/logo.png";
import { Email, Home, WhatsApp, LocalPhone } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { formatDate } from "../../../utils/formateDate";
import TADatePickers from "../../../components/form/TADatePickers";
import {
  Button,
  ButtonBase,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { FaGlobe } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import {
  useGetSingleMoneyReceiptQuery,
  useUpdateMoneyReceiptMutation,
} from "../../../redux/api/money-receipt";
import { ErrorMessage } from "../../../components/error-message";

const UpdateMoneyReceipt = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const { watch } = useForm();
  const { data: singleMoneyReceipt, refetch } =
    useGetSingleMoneyReceiptQuery(id);

  const [updateMoneyReceipt, { isLoading: updateLoading, error: updateError }] =
    useUpdateMoneyReceiptMutation();

  const [advance, setAdvance] = useState(0);
  const [remaining, setRemaining] = useState(
    singleMoneyReceipt?.data?.remaining
  );
  const [paymentMethod, setPaymentMethod] = useState("");
  const [billNo, setBillNo] = useState("Final Payment against bill no");
  const [totalAmount, setTotalAmount] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const [advanceSelect, setAdvanceSelect] = useState(false);
  const [finalPayment, setFinalPayment] = useState(false);
  const [cash, setCash] = useState(false);
  const [cheque, setCheque] = useState(false);
  const bill = watch("against_bill_no_method");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    if (singleMoneyReceipt?.data?.default_date) {
      setSelectedDate(singleMoneyReceipt?.data?.default_date);
    }
  }, [singleMoneyReceipt?.data?.default_date]);

  const formatDateForInput = (date) => {
    const [day, month, year] = date.split("-");
    return `${year}-${month}-${day}`;
  };

  const defaultDateOne = formatDateForInput(
    singleMoneyReceipt?.data?.date_one || ""
  );
  const defaultDateTwo = formatDateForInput(
    singleMoneyReceipt?.data?.date_two || ""
  );

  useEffect(() => {
    reset({
      Id: singleMoneyReceipt?.data?.Id,
      job_no: singleMoneyReceipt?.data?.job_no,
      default_date: selectedDate || singleMoneyReceipt?.data?.default_date,

      advance_select: singleMoneyReceipt?.data?.advance_select,
      final_payment: singleMoneyReceipt?.data?.final_payment,

      thanks_from: singleMoneyReceipt?.data?.thanks_from,
      against_bill_no_method: singleMoneyReceipt?.data?.against_bill_no_method,
      vehicle_no: singleMoneyReceipt?.data?.vehicle?.fullRegNum,

      payment_method: singleMoneyReceipt?.data?.payment_method,
      payment_number: singleMoneyReceipt?.data?.payment_number,
      bank_number: singleMoneyReceipt?.data?.bank_number,
      date_one: defaultDateOne,
      date_two: defaultDateTwo,
      total_amount: singleMoneyReceipt?.data?.total_amount,
      advance: singleMoneyReceipt?.data?.advance,
      remaining: singleMoneyReceipt?.data?.remaining,
      taka_in_word: singleMoneyReceipt?.data?.taka_in_word,
    });
  }, [
    defaultDateOne,
    defaultDateTwo,
    reset,
    selectedDate,
    singleMoneyReceipt?.data?.Id,
    singleMoneyReceipt?.data?.advance,
    singleMoneyReceipt?.data?.advance_select,
    singleMoneyReceipt?.data?.against_bill_no_method,
    singleMoneyReceipt?.data?.bank_number,
    singleMoneyReceipt?.data?.cash,
    singleMoneyReceipt?.data?.cheque,
    singleMoneyReceipt?.data.date_two,
    singleMoneyReceipt?.data?.default_date,
    singleMoneyReceipt?.data?.final_payment,
    singleMoneyReceipt?.data?.job_no,
    singleMoneyReceipt?.data?.payment_method,
    singleMoneyReceipt?.data?.payment_number,
    singleMoneyReceipt?.data?.remaining,
    singleMoneyReceipt?.data?.taka_in_word,
    singleMoneyReceipt?.data?.thanks_from,
    singleMoneyReceipt?.data?.total_amount,
    singleMoneyReceipt?.data?.vehicle?.fullRegNum,
  ]);

  const amountInWords = (amount) => {
    const numberWords = [
      "Zero",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];

    const tensWords = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    const convertLessThanOneThousand = (num) => {
      if (num === 0) {
        return "";
      }

      let result = "";

      if (num >= 100) {
        result += numberWords[Math.floor(num / 100)] + " Hundred ";
        num %= 100;
      }

      if (num >= 20) {
        result += tensWords[Math.floor(num / 10)] + " ";
        num %= 10;
      }

      if (num > 0) {
        result += numberWords[num] + " ";
      }

      return result;
    };

    const convert = (num) => {
      if (num === 0) {
        return "Zero";
      }

      let result = "";

      let integerPart = Math.floor(num);
      const decimalPart = Math.round((num - integerPart) * 100);

      if (integerPart >= 10000000) {
        result +=
          convertLessThanOneThousand(Math.floor(integerPart / 10000000)) +
          "Crore ";
        integerPart %= 10000000;
      }

      if (integerPart >= 100000) {
        result +=
          convertLessThanOneThousand(Math.floor(integerPart / 100000)) +
          "Lakh ";
        integerPart %= 100000;
      }

      if (integerPart >= 1000) {
        result +=
          convertLessThanOneThousand(Math.floor(integerPart / 1000)) +
          "Thousand ";
        integerPart %= 1000;
      }

      result += convertLessThanOneThousand(integerPart);

      if (decimalPart > 0) {
        result +=
          "Taka " +
          " " +
          "and" +
          " " +
          convertLessThanOneThousand(decimalPart) +
          "Paisa ";
      } else {
        result += "Taka";
      }

      return result;
    };

    const takaInWords = convert(amount);
    return `${takaInWords} only`;
  };

  const totalAmountInWords = amountInWords(advance ? advance : remaining);

  const handleDateChange = (newDate) => {
    setSelectedDate(formatDate(newDate));
  };

  const getRemaining = () => {
    if (!isNaN(totalAmount) && totalAmount && !isNaN(advance) && advance) {
      const remaining = totalAmount - advance;
      return remaining;
    }

    if (totalAmount === null && advance) {
      const remaining = singleMoneyReceipt?.data?.total_amount - advance;
      return remaining;
    }
    if (totalAmount && advance === null) {
      const remaining =
        totalAmount - singleMoneyReceipt?.data?.total_amount.advance;
      return remaining;
    }
  };
  const onSubmit = async (data) => {
    const dateOne = formatDate(data.date_one);
    const dateTwo = formatDate(data.date_two);

    data.bank_number = Number(data.bank_number);
    data.total_amount = Number(data.total_amount);
    data.advance = Number(data.advance);
    data.remaining = Number(data.remaining);
    data.default_date = selectedDate || singleMoneyReceipt?.data?.default_date;
    data.payment_method = paymentMethod;

    data.date_one = dateOne;

    data.date_two = dateTwo;

    data.advance = Number(data.advance);
    data.remaining = getRemaining() || remaining;
    data.taka_in_word = totalAmountInWords;

    try {
      const values = {
        id,
        data,
      };

      const response = await updateMoneyReceipt(values).unwrap();

      if (response.success) {
        toast.success(response.message);
        navigate("/dashboard/money-receipt-list");
        refetch();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleAdvanceSelect = () => {
    setAdvanceSelect(!advanceSelect);
    setFinalPayment(false);
  };
  const handleFinalPayment = () => {
    setFinalPayment(!finalPayment);
    setAdvanceSelect(false);
  };
  const handleCash = () => {
    setCash(!cash);
    setCheque(false);
  };
  const handleCheque = () => {
    setCheque(!cheque);
    setCash(false);
  };

  const handleChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleTotalAmount = (value) => {
    setTotalAmount(value);
    setRemaining(value);
  };

  const handleChange2 = (event) => {
    setBillNo(event.target.value);
  };
  console.log(bill);

  const buttonStyle = {
    color: "white",
    borderRadius: "20px",
  };

  return (
    <div className="moneyReceptWrap ">
      <div className="flex items-center justify-between flex-col lg:flex-row gap-3 ">
        <div className="logoWrap ">
          <img className="" src={logo} alt="logo" />
        </div>
        <div className="moneyHead ">
          <h2 className="receivedTitle ">Trust Auto Solution </h2>
          <small>
            It's trusted computerized Organization for all kinds of vehicle
            check up & maintenance such as computerized Engine Analysis, Engine
            tune up, Denting, Painting, Engine, AC, Electrical Works & Car Wash.{" "}
          </small>
        </div>
        <div>
          <div className="flex items-center mt-1">
            <FaGlobe className="hotlineIcon" />
            <small className="ml-1">www.trustautosolution.com</small>
          </div>
          <div className="flex items-center mt-1">
            <Email className="hotlineIcon" />
            <small className="ml-1">trustautosolution@gmail.com</small>
          </div>
          <div className="flex  mt-1">
            <FaLocationDot className="hotlineIcon"> </FaLocationDot>
            <small className="ml-1">
              Ka-93/4/C Kuril Bishawroad, <br /> Dhaka-1212
            </small>
          </div>
          <div className="flex items-center mt-1">
            <WhatsApp className="hotlineIcon" />
            <small className="ml-1">+880 1821-216465</small>
          </div>
        </div>
      </div>
      <div className="receivedBtn">
        <Button>Receipt</Button>
      </div>
      <div className="flex justify-between mt-5 md:mt-0">
        <b>Job No: {singleMoneyReceipt?.data?.job_no}</b>
        <b className="flex gap-x-2">
          <TADatePickers
            // date={specificMoneyReceipt?.default_date}
            handleDateChange={handleDateChange}
            selectedDate={selectedDate}
          />
        </b>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex mt-3 receivedField">
          <label className="receivedMoneyText">
            Received with thanks from{" "}
          </label>
          <div>
            <input
              {...register("thanks_from", { required: true })}
              className="moneyViewInputField receiptInput"
              type="text"
              autoComplete="off"
            />
            {errors.thanks_from && (
              <span className="text-sm text-red-400">
                This field is required
              </span>
            )}
          </div>
        </div>
        <div className="mt-5 lg:flex-row  flex flex-col gap-4 ">
          <div className="flex f ">
            <FormControl
              sx={{
                minWidth: 170,
                minHeight: "30px",
                marginRight: 0.5,
                backgroundColor: "#D9D9D9",
              }}
              size="small"
            >
              <InputLabel id="demo-select-small-label">
                Against bill no
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
           
                label=" Against bill no"
                onChange={handleChange2}
                {...register("against_bill_no_method", { required: true })}
              >
                <MenuItem value="Final payment against bill no">
                  Final payment against bill no
                </MenuItem>
                <MenuItem value="Advance against bill no">
                  Advance against bill no
                </MenuItem>
              </Select>
            </FormControl>
            <div>
              <input
                {...register("job_no", { required: true })}
                className="moneyViewInputField advanceInput "
                // type="number"
                // onChange={(e) => setJob_no(e.target.value)}
                autoComplete="off"
                readOnly
              />
              {errors.against_bill_no && (
                <span className="text-sm text-red-400">
                  This field is required
                </span>
              )}
            </div>
          </div>
          <div>
            <div className="flex mt-12 md:mt-6 receivedField lg:mt-0">
              <label className="vehicleText">Vehicle No: </label>
              <input
                {...register("vehicle_no", { required: true })}
                className=" moneyViewInputField advanceInput"
                type="text"
                autoComplete="off"
                readOnly
              />
              <br />
            </div>
            {errors.vehicle_no && (
              <span className="text-sm text-red-400 ml-24">
                This field is required
              </span>
            )}
          </div>
        </div>
        <div className="mt-5 payAdvance lg:flex-row flex flex-col gap-4">
          <div className="flex lg:flex-row flex-col ">
            <FormControl
              sx={{
                minWidth: 170,
                minHeight: "30px",
                marginRight: 0.5,
                backgroundColor: "#D9D9D9",
              }}
              size="small"
            >
              <InputLabel id="demo-select-small-label">
                Payment Method{" "}
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={paymentMethod}
                label="Payment Method "
                onChange={handleChange}
              >
                <MenuItem value="Bkash">Bkash</MenuItem>
                <MenuItem value="Nagad">Nagad</MenuItem>
                <MenuItem value="Nagad">Rocket</MenuItem>
                <MenuItem value="Check">Check</MenuItem>
                <MenuItem value="Bank">Bank Transfer</MenuItem>
              </Select>
            </FormControl>
            <div>
              <input
                {...register("payment_number", { required: true })}
                className="cashInput moneyViewInputField"
                type="text"
                autoComplete="off"
              />
              {errors.cheque_no && (
                <span className="text-sm text-red-400">
                  This field is required
                </span>
              )}
            </div>
          </div>
          <div className="flex mt-6 receivedField md:mt-0">
            <b className="mr-2 date2">Date: </b>
            <div>
              <input
                {...register("date_one", { required: true })}
                className="cashInput moneyViewInputField cursor-pointer"
                type="date"
                autoComplete="off"
                // defaultValue={defaultDate}
              />
              {errors.date_one && (
                <span className="text-sm text-red-400">
                  This field is required
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="mt-5 payAdvance lg:flex-row sm:flex flex-col gap-4">
          <div className="flex receivedField">
            <label className="backText">Bank: </label>
            <div>
              <input
                {...register("bank_number", { required: true })}
                className=" moneyViewInputField bankInput"
                type="text"
                autoComplete="off"
              />
              {errors.bank && (
                <span className="text-sm text-red-400">
                  This field is required
                </span>
              )}
            </div>
          </div>
          <div className="flex receivedField">
            <label className="date2 "> Date:</label>
            <div>
              <input
                {...register("date_two", { required: true })}
                className=" moneyViewInputField bankInput"
                type="date"
                autoComplete="off"
              />
              {errors.date_two && (
                <span className="text-sm text-red-400">
                  This field is required
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="mt-5 amount2 lg:flex-row sm:flex flex-col gap-4">
          <div className="flex items-center">
            <div className="flex lg:flex-row  flex-col">
              <label className="totalAmountText2">Total Amount Tk:</label>
              <div>
                <input
                  {...register("total_amount", { required: true })}
                  className="moneyViewInputField totalAmountInput"
                  type="number"
                  onChange={(e) => handleTotalAmount(e.target.value)}
                />
                {errors.total_amount && totalAmount === null && (
                  <span className="text-sm text-red-400">
                    This field is required
                  </span>
                )}
              </div>
            </div>
            {bill === "Final payment against bill no" ? null : (
              <div className="flex lg:flex-row  flex-col ">
                <label>Payable Amount :</label>
                <input
                  {...register("remaining")}
                  className="moneyViewInputField totalAmountInput"
                  type="text"
                  value={remaining}
                  readOnly
                />
              </div>
            )}
          </div>
          {bill === "Advance against bill no" ? (
            <div className="flex lg:flex-row  flex-col">
              <label>Advance:</label>
              <div>
                <input
                  {...register("advance", { required: true })}
                  className="moneyViewInputField totalAmountInput"
                  type="number"
                  onChange={(e) => setAdvance(e.target.value)}
                />
                {errors.advance && advance === null && (
                  <span className="text-sm text-red-400">
                    This field is required
                  </span>
                )}
              </div>
            </div>
          ) : null}
          {bill === "Advance against bill no" ? (
            <div className="flex lg:flex-row  flex-col ">
              <label>Remaining:</label>
              <input
                {...register("remaining")}
                className="moneyViewInputField totalAmountInput"
                type="text"
                value={getRemaining()}
                readOnly
              />
            </div>
          ) : null}
        </div>
        <div className="mt-5 wordTaka">
          <label>in word (taka) </label>
          {advance || remaining
            ? totalAmountInWords
            : singleMoneyReceipt?.data?.taka_in_word}
        </div>

        <div className="my-5 receivedBtn">
          <Button type="submit" disabled={updateLoading}>
            Submit
          </Button>
        </div>
      </form>
      <div className="my-2">
        {updateError && (
          <ErrorMessage messages={updateError?.data?.errorSources} />
        )}
      </div>
      <div className="">
        <small className="signature">Authorized Signature</small>
      </div>
      <div className="flex gap-2">
        <Button sx={buttonStyle}>Preview</Button>
        <Button sx={buttonStyle}>Print </Button>
        <Button sx={buttonStyle}>Download </Button>
      </div>
    </div>
  );
};

export default UpdateMoneyReceipt;
