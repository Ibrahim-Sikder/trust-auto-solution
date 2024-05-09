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
import { useState } from "react";
import { FaGlobe } from "react-icons/fa";
import TADatePickers from "../../../components/form/TADatePickers";
 
const MoneyReceiptView = () => {
  const { register, handleSubmit, reset } = useForm();
  const [advance, setAdvance] = useState(null);
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

  const onSubmit = async (data) => {
    const values = {
      Id: "",

      thanks_from: data.thanks_from,
      against_bill_no: data.against_bill_no,
      vehicle_no: data.vehicle_no,
      cheque_no: data.cheque_no,
      date_one: data.date_one,
      bank: data.bank,
      date_two: data.date_two,
      total_amount: data.total_amount,
      advance: data.advance,
      remaining: data.remaining,
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

  return (
    <>
      <div className="moneyReceptWrap ">
        <div className="moneyRecieved ">
          <div className="logoWrap ">
            <img className="" src={logo} alt="logo" />
          </div>
          <div className="moneyHead ">
            <h2 className="receivedTitle ">Trust Auto Solution </h2>
            <small>
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
        <div className="receivedBtn">
          <button>Receipt</button>
        </div>
        <div className="flex justify-between items-center lg:mt-0  mb-5">
          <b>Job No: 01</b>
         
          <TADatePickers/>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex mt-3 receivedField">
            <label className="receivedMoneyText">
              Received with thanks from{" "}
            </label>
            <input
              {...register("thanks_from", { required: true })}
              className="moneyViewInputField"
              type="text"
              autoComplete="off"
            />
          </div>
          <div className="mt-5 payAdvance">
            <div className="flex receivedField">
              <label className="advance">
                <input type="checkbox" /> Advance <input type="checkbox" />{" "}
                Final Payment / against bill no
              </label>
              <input
                {...register("against_bill_no", { required: true })}
                className=" moneyViewInputField"
                type="text"
                autoComplete="off"
              />
            </div>
            <div className="flex mt-12 md:mt-6 receivedField lg:mt-0">
              <label className="vehicleText">Vehicle No: </label>
              <input
                {...register("vehicle_no", { required: true })}
                className=" moneyViewInputField"
                type="text"
                autoComplete="off"
              />
            </div>
          </div>
          <div className="mt-5 payAdvance">
            <div className="flex receivedField">
              <label className="checqueText">
                {" "}
                <input type="checkbox" /> Cash <input type="checkbox" />
                Cheque No:{" "}
              </label>
              <input
                {...register("cheque_no", { required: true })}
                className="cashInput moneyViewInputField"
                type="text"
                autoComplete="off"
              />
            </div>
            <div className="flex mt-6 receivedField md:mt-0">
              <b className="mr-2 date2">Date: </b>
              <input
                {...register("date_one", { required: true })}
                className="dateInput moneyViewInputField"
                type="date"
                autoComplete="off"
              />
            </div>
          </div>
          <div className="mt-5 payAdvance">
            <div className="flex receivedField">
              <label className="backText">Bank: </label>
              <input
                {...register("bank", { required: true })}
                className=" moneyViewInputField"
                type="text"
                autoComplete="off"
              />
            </div>
            <div className="flex receivedField">
              <label className="date2 "> Date:</label>
              <input
                {...register("date_two", { required: true })}
                className=" moneyViewInputField"
                type="date"
                autoComplete="off"
              />
            </div>
          </div>
          <div className="mt-5 amount2">
            <div className="flex ">
              <label className="totalAmountText2">Total Amount Tk:</label>
              <input
                {...register("total_amount", { required: true })}
                className="moneyViewInputField totalAmountInput"
                type="text"
                
              />
            </div>
            <div className="flex ">
              <label>Advance:</label>
              <input
                {...register("advance", { required: true })}
                className="moneyViewInputField totalAmountInput"
                type="text"
                onChange={(e) => setAdvance(e.target.value)}
              />
            </div>
            <div className="flex">
              <label>Remaining:</label>
              <input
                {...register("remaining", { required: true })}
                className="moneyViewInputField totalAmountInput"
                type="text"
              />
            </div>
          </div>
          <div className="mt-5 wordTaka">
            <label>in word (taka) </label>
            {/* <input
              {...register("taka_in_word", { required: true })}
              className="moneyViewInputField"
              type="text"
              defaultValue={totalAmountInWords}
            /> */}
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
