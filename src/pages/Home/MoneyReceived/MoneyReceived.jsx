/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/no-unescaped-entities */
import "./MoneyReceived.css";
import logo from "../../../../public/assets/logo.png";
import { Email, Home, WhatsApp } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import AddMoneyReceiptList from "./AddMoneyReceiptList";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { FaGlobe } from "react-icons/fa";
import TADatePickers from "../../../components/form/TADatePickers";
 

const MoneyReceiptView = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [advance, setAdvance] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");

  const [job_no, setJob_no] = useState(null);
  const [jobCardData, setJobCardData] = useState({});
  const [loading, setLoading] = useState(false);

  const [advanceSelect, setAdvanceSelect] = useState(false);
  const [finalPayment, setFinalPayment] = useState(false);
  const [cash, setCash] = useState(false);
  const [cheque, setCheque] = useState(false);

  const navigate = useNavigate();

  const parsedDate = new Date();
  const day = parsedDate.getDate().toString().padStart(2, "0");
  const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0");
  const year = parsedDate.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;

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

  const totalAmountInWords = amountInWords(advance);

  const handleDateChange = (newDate) => {
    setSelectedDate(formatDate(newDate));
  };

  const getRemaining = () => {
    if (!isNaN(totalAmount) && !isNaN(advance)) {
      const remaining = totalAmount - advance;
      return remaining;
    }
  };

  useEffect(() => {
    if (job_no) {
      setLoading(true);
      fetch(`${import.meta.env.VITE_API_URL}/api/v1/jobCard/invoice/${job_no}`)
        .then((res) => res.json())
        .then((data) => {
          setJobCardData(data);
          setLoading(false);
        });
    }
  }, [job_no]);

  const formatDate = (dateString) => {
    const parsedDate = new Date(dateString);
    const day = parsedDate.getDate().toString().padStart(2, "0");
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0");
    const year = parsedDate.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  };

  const onSubmit = async (data) => {
    const dateOne = formatDate(data.date_one);
    const dateTwo = formatDate(data.date_two);

    const values = {
      Id: jobCardData?.Id,
      job_no: job_no,
      default_date: selectedDate || formattedDate || jobCardData.date,
      thanks_from: data.thanks_from,

      advance_select: advanceSelect,
      final_payment: finalPayment,

      against_bill_no: data.against_bill_no,
      vehicle_no: data.vehicle_no,
      cash: cash,
      cheque: cheque,

      cheque_no: data.cheque_no,
      date_one: dateOne,
      bank: data.bank,
      date_two: dateTwo,
      total_amount: data.total_amount,
      advance: data.advance,
      remaining: getRemaining(),
      taka_in_word: totalAmountInWords,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/money_receipt`,
        values
      );

      if (
        response.data.message ===
        "Successfully added money receipt information."
      ) {
        reset();
        navigate("/dashboard/money-receipt-list");
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

  return (
    <>
      <div className="moneyReceptWrap ">
        <div className="flex items-center justify-between flex-col lg:flex-row gap-3  ">
          <div className="logoWrap ">
            <img className="" src={logo} alt="logo" />
          </div>
          <div className="moneyHead ">
            <h2 className="receivedTitle ">Trust Auto Solution </h2>
            <small className="text-sm">
              It's trusted computerized Organization for all kinds of vehicle
              check up & maintenance such as computerized Engine Analysis,
              Engine tune up, Denting, Painting, Engine, AC, Electrical Works &
              Car Wash.{" "}
            </small>
          </div>
          <div>
            <div className="flex items-center mt-1">
              <FaGlobe className="hotlineIcon" />
              <small className="ml-1">trustautosolution.com</small>
            </div>
            <div className="flex items-center mt-1">
              <Email className="hotlineIcon" />
              <small className="ml-1">trustautosolution@gmail.com</small>
            </div>
            <div className="flex  mt-1">
              <Home className="hotlineIcon"> </Home>
              <small className="ml-1">
                Ka-93/4/C Kuril Bishawroad, <br /> Dhaka-1212
              </small>
            </div>
            <div className="flex items-center mt-1">
              <WhatsApp className="hotlineIcon" />
              <small className="ml-1">01821-216465</small>
            </div>
          </div>
        </div>
        <div className="receivedBtn md:mt-0 mt-5">
          <button>Receipt</button>
        </div>
        <div className="flex justify-between mt-5 md:mt-0 items-center lg:mt-0  mb-5">
          <b>Job No: {jobCardData?.job_no ? jobCardData?.job_no : 0}</b>

          <TADatePickers
            date={jobCardData?.date}
            handleDateChange={handleDateChange}
            selectedDate={selectedDate}
          />
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
          <div className="mt-5 lg:flex-row  flex flex-col gap-4 payAdvance">
            <div className="flex f receivedField">
              <label className="advanceText">
                <input
                  type="checkbox"
                  onClick={handleAdvanceSelect}
                  checked={advanceSelect}
                />{" "}
                Advance{" "}
                <input
               
                  type="checkbox"
                  onClick={handleFinalPayment}
                  checked={finalPayment}
                />{" "}
                Final Payment / against bill no
              </label>
              <div>
                <input
                  {...register("against_bill_no", { required: true })}
                  className=" moneyViewInputField advanceInput "
                  type="number"
                  onChange={(e) => setJob_no(e.target.value)}
                  autoComplete="off"
                />
                {errors.against_bill_no && job_no === null && (
                  <span className="text-sm text-red-400">
                    This field is required
                  </span>
                )}
              </div>
            </div>
            <div className="flex mt-12 md:mt-6 receivedField lg:mt-0">
              <label className="vehicleText">Vehicle No: </label>
              <div>
                <input
                  {...register("vehicle_no", { required: true })}
                  className=" moneyViewInputField advanceInput"
                  type="text"
                  autoComplete="off"
                />
                {errors.vehicle_no && (
                  <span className="text-sm text-red-400">
                    This field is required
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="mt-5 payAdvance lg:flex-row flex flex-col gap-4">
            <div className="flex lg:flex-row flex-col ">
              <div className="checqueText">
                {" "}
                <input
                  type="checkbox"
                  checked={cash}
                  onClick={handleCash}
                />{" "}
                <span className=" font-semibold">Cash </span>
                <input
                  type="checkbox"
                  checked={cheque}
                  onClick={handleCheque}
                />
                <span className=" font-semibold">Cheque No:</span>{" "}
              </div>
              <div>
                <input
                  {...register("cheque_no", { required: true })}
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
                  className="cashInput moneyViewInputField"
                  type="date"
                  autoComplete="off"
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
                  {...register("bank", { required: true })}
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
            <div className="flex lg:flex-row  flex-col">
              <label className="totalAmountText2">Total Amount Tk:</label>
              <div>
                <input
                  {...register("total_amount", { required: true })}
                  className="moneyViewInputField totalAmountInput"
                  type="number"
                  onChange={(e) => setTotalAmount(e.target.value)}
                />
                {errors.total_amount && totalAmount === null && (
                  <span className="text-sm text-red-400">
                    This field is required
                  </span>
                )}
              </div>
            </div>
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
          </div>
          <div className="mt-5 wordTaka">
            <label>in word (taka) </label>
            {totalAmountInWords}
          </div>

          <div className="my-5 receivedBtn">
            <button type="submit">Submit</button>
          </div>
        </form>
        <div>
          <small className="signature">Authorized Signature</small>
        </div>
      </div>

      <AddMoneyReceiptList />
    </>
  );
};

export default MoneyReceiptView;
