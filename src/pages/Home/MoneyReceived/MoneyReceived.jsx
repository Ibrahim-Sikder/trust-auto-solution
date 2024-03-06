/* eslint-disable react/no-unescaped-entities */
import "./MoneyReceived.css";
import logo from "../../../../public/assets/logo.png";
import { Email, Home, WhatsApp, LocalPhone } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
const MoneyReceiptView = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const trust_auto_id = Cookies.get("trust_auto_id");

  const onSubmit = async (data) => {

    if(!trust_auto_id){
      return toast.error("No customer id found.")
    }

    const values = {
      customerId: trust_auto_id,
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
      taka_in_word: data.taka_in_word,
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/money_receipt",
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
      console.log(error);
    }
  };

  return (
    <div className="moneyReceptWrap ">
      <div className="moneyRecieved ">
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
        <button>Receipt</button>
      </div>
      <div className="flex justify-between ">
        <b>Serial No: 01</b>
        <b>Date: 12-12-21</b>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex receivedField mt-3">
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
        <div className=" payAdvance mt-5">
          <div className="flex  receivedField">
            <label className="advance">
              <input type="checkbox" /> Advance <input type="checkbox" /> Final
              Payment / against bill no:{" "}
            </label>
            <input
              {...register("against_bill_no", { required: true })}
              className=" moneyViewInputField"
              type="text"
              autoComplete="off"
            />
          </div>
          <div className="flex receivedField">
            <label className="vehicleText">Vehicle No: </label>
            <input
              {...register("vehicle_no", { required: true })}
              className=" moneyViewInputField"
              type="text"
              autoComplete="off"
            />
          </div>
        </div>
        <div className="payAdvance mt-5">
          <div className="flex  receivedField">
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
          <div className="flex receivedField">
            <b className="date2 mr-2">Date: </b>
            <input
              {...register("date_one", { required: true })}
              className="dateInput moneyViewInputField"
              type="date"
              autoComplete="off"
            />
          </div>
        </div>
        <div className=" payAdvance mt-5">
          <div className="flex  receivedField">
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
        <div className="amount2 mt-5">
          <div className="flex ">
            <label className="totalAmountText2">Total Amount Tk:</label>
            <input
              {...register("total_amount", { required: true })}
              className="moneyViewInputField"
              type="text"
            />
          </div>
          <div className="flex ">
            <label>Advance:</label>
            <input
              {...register("advance", { required: true })}
              className="moneyViewInputField"
              type="text"
            />
          </div>
          <div className="flex">
            <label>Remaining:</label>
            <input
              {...register("remaining", { required: true })}
              className="moneyViewInputField"
              type="text"
            />
          </div>
        </div>
        <div className="wordTaka mt-5">
          <label>in word (taka) </label>
          <input
            {...register("taka_in_word", { required: true })}
            className="moneyViewInputField"
            type="text"
          />
        </div>
        {/* <div className="flex justify-end my-10">
          <button className="btn btn-primary w-full">submit</button>
        </div> */}
        <div className="receivedBtn my-5">
          <button type="submit">Submit</button>
        </div>
      </form>
      <div>
        <small className="signature">Authorized Signature</small>
      </div>
    </div>
  );
};

export default MoneyReceiptView;
