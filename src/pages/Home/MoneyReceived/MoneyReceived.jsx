/* eslint-disable react/no-unescaped-entities */
import './MoneyReceived.css'
import logo from '../../../../public/assets/logo.png'
import { Email,Home,WhatsApp,LocalPhone } from '@mui/icons-material'
import {  useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { usePDF } from "react-to-pdf";
import { Link } from "react-router-dom";

const MoneyReceiptView = () => {
    const componentRef = useRef();
    const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });
    return (
       <section className='receiptMoneyWrap'>
        <div ref={targetRef} className="moneyReceivedWrap ">
         <div ref={componentRef} className='moneyFormWrap moneyWraps'>
            <div className="moneyRecieved ">
             <div className="logoWrap logoWrap2">
             <img className="" src={logo} alt="logo" />
             </div>
              <div className='moneyHead moneyHead2'>
              <h2 className="receivedTitle receivedTitle2">Trust Auto Solution </h2>
              <small>It's trusted computerized Organization for all kinds of vehicle check up & maintenance such as computerized Engine Analysis, Engine tune up, Denting, Painting, Engine, AC, Electrical Works & Car Wash. </small>
              </div>
              <div>
                <h3>Hotline</h3>
                <div className='flex items-center mt-1'>
                    <LocalPhone className='hotlineIcon'/>
                <b className='ml-1'>+880 1821-216465</b>
                </div>
               <div className="flex items-center mt-1">
                <Email className='hotlineIcon'/>
               <small className='ml-1'>trustautosolution@gmail.com</small>
               </div>
               <div className="flex items-center mt-1">
                <Home className='hotlineIcon'> </Home>
               <small className='ml-1'>Ka-93/4/C Kuril Bishawroad, <br /> Dhaka-1212</small>
               </div>
               <div className="flex items-center mt-1">
                <WhatsApp className='hotlineIcon'/>
               <small className='ml-1'>+88 1972-216465</small>
               </div>
              </div>
            </div>
            <div className='receivedBtn'>
                <button>Receipt</button>
            </div>
            <div className="flex justify-between ">
                <b>Serial No: 01</b>
                <b>Date: 12-12-21</b>
            </div>
            <div className='flex receivedField mt-3'>
                <label className='receivedMoneyText'>Received with thanks from </label>
                <input className='moneyViewInputField'  type="text" autoComplete='off' />
            </div>
           <div className=" payAdvance mt-5">
           <div className='flex  receivedField'>
                <label className='advance'>Advance/Final Payment agint bill no:  </label>
                <input className=' moneyViewInputField' type="text" autoComplete='off' />
            </div>
            <div className='flex receivedField'>
                <label className='vehicleText'>Vehicle No: </label>
                <input className=' moneyViewInputField' type="text" autoComplete='off' />
            </div>
           </div>
           <div className="payAdvance mt-5">
           <div className='flex  receivedField'>
                <label className='checqueText'>Cash/Checque No: </label>
                <input className='cashInput moneyViewInputField' type="text" autoComplete='off' />
            </div>
            <div className='flex receivedField'>
                <b className='date'>Date: </b>
                <input className='dateInput moneyViewInputField' type="text" autoComplete='off' />
            </div>
           </div>
           <div className=" payAdvance mt-5">
           <div className='flex  receivedField'>
                <label className='backText'>Bank : </label>
                <input className=' moneyViewInputField' type="text" autoComplete='off' />
            </div>
            <div className='flex receivedField'>
                <label className='date'>Date : </label>
                <input className=' moneyViewInputField' type="text" autoComplete='off' />
            </div>
           </div>
           <div className="amount mt-5">
            <div>
                <label>Total Amount Tk:</label>
                <input type="text" />
            </div>
            <div>
                <label>Advance:</label>
                <input type="text" />
            </div>
            <div>
                <label>Remaining:</label>
                <input type="text" />
            </div>
           </div>
           <div className='wordTaka mt-5'> 
            <label>in word (takta) </label>
            <input type="text" />
           </div>
           <div className=''>
            <small className='signature'>Authorized Signature</small>
           </div>
           <div className="customerSignature">
            <b>Customer Signature : </b>
            <b>Trust Auto Solution</b>
          </div>
          <hr className="my-3" />
          <div className="text-center mt-5">
            <p>
              <b>Office: </b>Ka-93/4/C, Kuril Bishawroad, Dhaka-1229,
              www.trustautosolution.com
            </p>
            <p>
              {" "}
              <b>Mobile:</b> 01821-216465, 01972-216465 , <b>Email:</b>{" "}
              trustautosolution@gmail.com{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="moneyReceiptBtnGroup">
        <button onClick={handlePrint}>Print </button>
        <button onClick={() => toPDF()}>Pdf </button>
 

        <Link to="/dashboard/money-receive">
          <button> Edit </button>
        </Link>
 
      </div>
       </section>
    );
};

export default MoneyReceiptView;