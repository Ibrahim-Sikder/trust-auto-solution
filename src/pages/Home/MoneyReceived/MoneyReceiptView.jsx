/* eslint-disable react/no-unescaped-entities */
import './MoneyReceived.css'
import logo from '../../../../public/assets/logo.png'
import { Email,Home,WhatsApp,LocalPhone } from '@mui/icons-material'
import {  useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { usePDF } from "react-to-pdf";
import { Link } from 'react-router-dom';
const MoneyReceived = () => {
    const componentRef = useRef();
    const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });
    return (
      <section className='viewMoneyReceiptWrap'>
         <div className="moneyWraps">
        <div ref={targetRef}>
        <div ref={componentRef} className='moneyFormWrap'>
            <div className="moneyRecieved">
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
            <div className='receivedBtn receivedBtn2'>
                <button>Receipt</button>
            </div>
            <div className="flex justify-between ">
                <b>Serial No: 01</b>
                <b>Date: 12-12-21</b>
            </div>
           <div className="allInputWraps">
           <div className='flex receivedField mt-3'>
                <label className='receivedMoneyText2'>Received with thanks from </label>
                <input disabled  type="text" autoComplete='off' />
            </div>
           <div className=" payAdvance mt-5">
           <div className='flex  receivedField'>
                <label className='advance2'>Advance/Final Payment agint bill no:  </label>
                <input disabled className='' type="text" autoComplete='off' />
            </div>
            <div className='flex receivedField'>
                <label className='vehicleText2'>Vehicle No: </label>
                <input disabled className='' type="text" autoComplete='off' />
            </div>
           </div>
           <div className="payAdvance mt-5">
           <div className='flex  receivedField'>
                <label className='checqueText2'>Cash/Checque No: </label>
                <input disabled className='cashInput' type="text" autoComplete='off' />
            </div>
            <div className='flex receivedField'>
                <label className='date'>Date: </label>
                <input disabled className='dateInput' type="text" autoComplete='off' />
            </div>
           </div>
           <div className=" payAdvance mt-5">
           <div className='flex  receivedField'>
                <label className='backText2'>Bank : </label>
                <input disabled className='' type="text" autoComplete='off' />
            </div>
            <div className='flex receivedField'>
                <label className='date'>Date : </label>
                <input disabled className='' type="text" autoComplete='off' />
            </div>
           </div>
           <div className="amount mt-5">
            <div className='flex receivedField'>
                <label className='totalAmountText'>Total Amount Tk:</label>
                <input className='totalAmountInput' disabled type="text" />
            </div>
            <div className='flex receivedField'>
                <label>Advance:</label>
                <input disabled type="text" />
            </div>
            <div className='flex receivedField'>
                <label>Remaining:</label>
                <input className='totalAmountInput' disabled type="text" />
            </div>
           </div>
           <div className='wordTaka mt-5'> 
            <label>in word (takta) </label>
            <input className='inWordTk' disabled type="text" />
           </div>
           </div>
           <div className=''>
            <small className='signature'>Authorized Signature</small>
           </div>
        </div>
        </div>
       
       </div>
       <div className="moneyReceiptBtnGroup mt-5">
        <button onClick={handlePrint}>Print </button>
        <button onClick={() => toPDF()}>Pdf </button>
        <Link to="/dashboard/money-receive">
          <button> Edit </button>
        </Link>
 
      </div>
      </section>
    );
};

export default MoneyReceived;