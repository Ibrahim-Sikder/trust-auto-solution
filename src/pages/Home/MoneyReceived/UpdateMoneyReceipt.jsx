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
import { Button, ButtonBase } from "@mui/material";
const UpdateMoneyReceipt = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [specificMoneyReceipt, setSpecificMoneyReceipt] = useState({});
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

  useEffect(() => {
    if (id) {
      fetch(`${import.meta.env.VITE_API_URL}/api/v1/money_receipt/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setSpecificMoneyReceipt(data);
        });
    }
  }, [id]);

  const handleDateChange = (newDate) => {
    setSelectedDate(formatDate(newDate));
  };

  const getRemaining = () => {
    if (!isNaN(totalAmount) && totalAmount && !isNaN(advance) && advance) {
      const remaining = totalAmount - advance;
      return remaining;
    }

    if (totalAmount === null && advance) {
      const remaining = specificMoneyReceipt.total_amount - advance;
      return remaining;
    }
    if (totalAmount && advance === null) {
      const remaining = totalAmount - specificMoneyReceipt.advance;
      return remaining;
    }
  };
  const onSubmit = async (data) => {
    const values = {
      Id: specificMoneyReceipt.Id,
      job_no: specificMoneyReceipt.job_no,
      default_date: selectedDate || specificMoneyReceipt.default_date,

      advance_select: specificMoneyReceipt.advance_select,
      final_payment: specificMoneyReceipt.final_payment,

      cash: specificMoneyReceipt.cash,
      cheque: specificMoneyReceipt.cheque,

      thanks_from: data.thanks_from || specificMoneyReceipt.thanks_from,
      against_bill_no:
        data.against_bill_no || specificMoneyReceipt.against_bill_no,
      vehicle_no: data.vehicle_no || specificMoneyReceipt.vehicle_no,
      cheque_no: data.cheque_no || specificMoneyReceipt.cheque_no,
      date_one: data.date_one || specificMoneyReceipt.date_one,
      bank: data.bank || specificMoneyReceipt.bank,
      date_two: data.date_two || specificMoneyReceipt.date_two,
      total_amount: data.total_amount || specificMoneyReceipt.total_amount,
      advance: data.advance || specificMoneyReceipt.advance,
      remaining: getRemaining() || specificMoneyReceipt.remaining,
      taka_in_word: advance
        ? totalAmountInWords
        : specificMoneyReceipt.taka_in_word,
    };
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/money_receipt/${id}`,
        values
      );

      if (response.data.message === "Successfully update card.") {
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
            <LocalPhone className="hotlineIcon" />
            <b className="ml-1">+880 1821-216465</b>
          </div>
          <div className="flex items-center mt-1">
            <Email className="hotlineIcon" />
            <small className="ml-1">trustautosolution@gmail.com</small>
          </div>
          <div className="flex items-center mt-1">
            <Home className="hotlineIcon"> </Home>
            <small className="ml-1">
              Ka-93/4/C Kuril Bishawroad, <br /> Dhaka-1212
            </small>
          </div>
          <div className="flex items-center mt-1">
            <WhatsApp className="hotlineIcon" />
            <small className="ml-1">+88 1972-216465</small>
          </div>
        </div>
      </div>
      <div className="receivedBtn">
        <Button>Receipt</Button>
      </div>
      <div className="flex justify-between mt-5 md:mt-0">
        <b>Job No: {specificMoneyReceipt.against_bill_no}</b>
        <b className="flex gap-x-2">
          <TADatePickers
            date={specificMoneyReceipt?.default_date}
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
          <input
            className="moneyViewInputField receiptInput"
            type="text"
            autoComplete="off"
            defaultValue={specificMoneyReceipt.thanks_from}
            {...register("thanks_from")}
          />
        </div>
        <div className="mt-5 flex md:flex-row flex-col payAdvance">
          
          <div className="flex  receivedField">
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
                defaultValue={specificMoneyReceipt.against_bill_no}
                {...register("against_bill_no")}
                className=" moneyViewInputField advanceInput "
                type="number"
                onChange={(e) => setJob_no(e.target.value)}
                autoComplete="off"
              />
            </div>
          </div>
          <div className="flex mt-12 md:mt-6 receivedField lg:mt-0">
            <label className="vehicleText2">Vehicle No: </label>
            <input
              defaultValue={specificMoneyReceipt.vehicle_no}
              className=" moneyViewInputField"
              type="text"
              autoComplete="off"
              {...register("vehicle_no")}
            />
          </div>
        </div>
        <div className="mt-5 payAdvance flex flex-col lg:flex-row">
          <div className="flex flex-col md:flex-row ">
            <div className="checqueText space-x-1">
              {" "}
              <input type="checkbox" checked={cash} onClick={handleCash} />{" "}
              <span className=" font-semibold">Cash </span>
              <input type="checkbox" checked={cheque} onClick={handleCheque} />
              <span className=" font-semibold">Cheque No:</span>{" "}
            </div>
            <div>
              <input
                defaultValue={specificMoneyReceipt.cheque_no}
                {...register("cheque_no")}
                className="cashInput moneyViewInputField"
                type="text"
                autoComplete="off"
              />
            </div>
          </div>

          <div className="flex mt-6 receivedField md:mt-0">
            <b className="date">Date: </b>
            <input
              defaultValue={specificMoneyReceipt?.date_one}
              className="dateInput moneyViewInputField"
              type="text"
              autoComplete="off"
              {...register("date_one")}
            />
          </div>
        </div>
        <div className="mt-5 flex flex-col lg:flex-row payAdvance">
          <div className="flex receivedField">
            <label className="backText">Bank : </label>
            <input
              defaultValue={specificMoneyReceipt.bank}
              className=" moneyViewInputField"
              type="text"
              autoComplete="off"
              {...register("bank")}
            />
          </div>
          <div className="flex receivedField">
            <label className="date">Date : </label>
            <input
              defaultValue={specificMoneyReceipt?.date_two}
              className=" moneyViewInputField"
              type="text"
              autoComplete="off"
              {...register("date_two")}
            />
          </div>
        </div>
        <div className="mt-5 amount2 flex flex-col lg:flex-row gap-2">
          <div className="flex flex-col md:flex-row">
            <label className="totalAmountText2">Total Amount Tk:</label>
            <input
              defaultValue={specificMoneyReceipt?.total_amount}
              className="moneyViewInputField  totalAmountInput"
              type="text"
              {...register("total_amount")}
              onChange={(e) => setTotalAmount(e.target.value)}
            />
          </div>
          <div className="flex flex-col md:flex-row ">
            <label>Advance:</label>
            <input
              defaultValue={specificMoneyReceipt.advance}
              className="moneyViewInputField totalAmountInput"
              type="text"
              {...register("advance")}
              onChange={(e) => setAdvance(e.target.value)}
            />
          </div>
          <div className="flex flex-col md:flex-row ">
            <label>Remaining:</label>
            <input
              value={
                getRemaining() ? getRemaining() : specificMoneyReceipt.remaining
              }
              className="moneyViewInputField totalAmountInput"
              type="text"
              {...register("remaining")}
            />
          </div>
        </div>
        <div className="mt-5 wordTaka">
          <label>in word (taka) </label>

          {advance ? totalAmountInWords : specificMoneyReceipt?.taka_in_word}
        </div>
        {/* <div>
            <button className="w-full my-10 btn btn-warning"> Update</button>
        </div> */}
        <div className="my-5 receivedBtn">
          <Button type="submit">Update</Button>
        </div>
      </form>
      <div className="">
        <small className="signature">Authorized Signature</small>
      </div>
      <hr className="my-3" />
      <div className="mt-5 text-center">
        <p>
          <b>Office: </b>Ka-93/4/C, Kuril Bishawroad, Dhaka-1229,
          www.trustautosolution.com
        </p>
        <p>
          <b>Mobile:</b> 01821-216465, 01972-216465 , <b>Email:</b>{" "}
          trustautosolution@gmail.com
        </p>
      </div>
    </div>
  );
};

export default UpdateMoneyReceipt;
