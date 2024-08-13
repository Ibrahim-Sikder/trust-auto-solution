/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useCallback, useEffect, useRef, useState } from "react";
import logo from "../../../../public/assets/logo.png";
import { useReactToPrint } from "react-to-print";
import { usePDF } from "react-to-pdf";
import { Link, useLocation } from "react-router-dom";

import "../Invoice/Invoice.css"; // Add a separate CSS file for print styles
import { formatDate } from "../../../utils/formateDate";
import { Divider } from "@mui/material";

const Detail = () => {
  const componentRef = useRef();
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [invoicePreview, setInvoicePreview] = useState({});

  // const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`${import.meta.env.VITE_API_URL}/api/v1/quotations/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setInvoicePreview(data.data);
          setLoading(false);
          // const p = Math.ceil(data?.input_data?.length / 20);
          // const arr = Array.from({ length: p }, (_, index) => index + 1);

          // setPages(arr);
        });
    }
  }, [id]);

  const [totalPages, setTotalPages] = useState(1);
  const [serviceTotalPages, setServiceTotalPages] = useState(1);
  const [pagesData, setPagesData] = useState([]);
  const [servicePagesData, setServicePagesData] = useState([]);

  const calculateItemsPerPage = useCallback((pageNumber) => {
    const itemHeight = 50;
    const pageHeight = 1800;
    const marginHeight = 10;
    const headerHeight = 100;
    const footerHeight = 100;

    const availableHeight =
      pageHeight - marginHeight - headerHeight - footerHeight;

    if (pageNumber !== undefined && pageNumber === 1) {
      return 28;
    }

    return Math.floor(availableHeight / itemHeight);
  });

  useEffect(() => {
    const totalPagesCount = Math.ceil(invoicePreview?.input_data?.length / 28);
    const totalServicePagesCount = Math.ceil(
      invoicePreview?.service_input_data?.length / 28
    );

    setTotalPages(totalPagesCount || 1);

    setServiceTotalPages(totalServicePagesCount || 1);
  }, [calculateItemsPerPage, invoicePreview?.input_data]);

  useEffect(() => {
    const allPagesData = [];
    let startIndex = 0;
    const allServicePagesData = [];
    let serviceStartIndex = 0;

    for (let i = 1; i <= totalPages; i++) {
      const itemsPerPage = calculateItemsPerPage(i);
      const endIndex = startIndex + itemsPerPage;
      const pageData = invoicePreview?.input_data?.slice(startIndex, endIndex);
      allPagesData.push(pageData);
      startIndex = endIndex;
    }
    for (let i = 1; i <= serviceTotalPages; i++) {
      const itemsPerPage = calculateItemsPerPage(i);
      const endIndex = serviceStartIndex + itemsPerPage;
      const pageData = invoicePreview?.service_input_data?.slice(
        serviceStartIndex,
        endIndex
      );
      allServicePagesData.push(pageData);
      serviceStartIndex = endIndex;
    }

    setPagesData(allPagesData);

    setServicePagesData(allServicePagesData);
  }, [totalPages, invoicePreview.input_data]);

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

  const totalAmountInWords = amountInWords(invoicePreview?.net_total);
  const partsTotalAmountInWords = amountInWords(invoicePreview?.parts_total);

  return (
    <div ref={componentRef} className="h-screen">
      {pagesData.length > 0 &&
        pagesData.map((pageData, pageNumber) => (
          <main ref={targetRef} key={pageNumber} className="invoicePrintWrap">
            <div>
              <div className="pb-5 px-14 invoicePrint">
                <div>
                  <div className=" mb-2 mx-auto text-center border-b-2 border-[#351E98] pb-2">
                    <div className="flex items-center justify-between w-full mt-5 mb-2">
                      <img className="w-[120px] " src={logo} alt="logo" />
                      <div>
                        <h2 className="trustAutoTitle qoutationTitle">
                          Trust Auto Solution{" "}
                        </h2>
                        <small className="block">
                          Office: Ka-93/4/C, Kuril Bishawroad, Dhaka-1229
                        </small>
                      </div>
                      <div className="text-left">
                        <small className="block">
                          <small className="font-bold">Mobile:</small> +88
                          01821-216465
                        </small>
                        <small className="block">
                          <small className="font-bold">Email:</small>{" "}
                          trustautosolution@gmail.com
                        </small>
                        <small className="block font-bold ">
                          www.trustautosolution.com
                        </small>
                      </div>
                    </div>
                  </div>

                  {pageNumber === 0 && (
                    <div className="px-10">
                      <div className="flex text-[12px] items-center justify-between border-b-2 pb-1 border-[#351E98]">
                        <span className="w-[200px] ">
                          {" "}
                          <b>ID:</b> {invoicePreview.Id}
                        </span>
                        <b className="mr-[88px] uppercase">Quotation</b>
                        <b>
                          Date: {invoicePreview?.date}
                        </b>
                      </div>

                      <div className="flex items-center justify-between mx-auto mt-2 ">
                        <div className="flex justify-between w-[280px] overflow-hidden ">
                          <div className="invoiceCustomerInfo">
                            <b>Quotation No</b>
                            <b>Company</b>
                            <b>Customer</b>
                            <b>Phone</b>
                            <b>Address</b>
                          </div>
                          <div className="invoiceCustomerInfo">
                            <small>: {invoicePreview?.quotation_no}</small>
                            <small>
                              : {invoicePreview?.customer?.company_name ||
                                invoicePreview?.company?.company_name ||
                                invoicePreview?.showRoom?.company_name}
                            </small>
                            <small>
                              : {invoicePreview?.customer?.customer_name ||
                                invoicePreview?.company?.vehicle_username ||
                                invoicePreview?.showRoom?.vehicle_username}
                            </small>
                            <small>
                              : {invoicePreview?.customer?.fullCustomerNum ||
                                invoicePreview?.company?.fullCustomerNum ||
                                invoicePreview?.showRoom?.fullCustomerNum}
                            </small>
                            <small>
                              : {invoicePreview?.customer?.customer_address ||
                                invoicePreview?.company?.company_address ||
                                invoicePreview?.showRoom?.showRoom_address}
                            </small>
                          </div>
                        </div>
                        <div className="invoiceLine"></div>
                        <div className="flex w-[280px] justify-between overflow-hidden">
                          <div className="invoiceCustomerInfo">
                            <b>Registration No </b>
                            <b>Chassis No </b>
                            <b>Engine & CC </b>
                            <b>Vehicle Name </b>
                            <b>Mileage </b>
                          </div>
                          <div className="invoiceCustomerInfo">
                            <small>
                              : {invoicePreview?.vehicle?.fullRegNum}
                            </small>
                            <small>: {invoicePreview?.vehicle?.chassis_no}</small>
                            <small>: {invoicePreview?.vehicle?.engine_no}</small>
                            <small>: {invoicePreview?.vehicle?.vehicle_name}</small>
                            <small>: {invoicePreview?.vehicle?.mileage}</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <table className="mt-5 invoiceTable2 qutationTables">
                    <thead className="tableWrap">
                      <tr>
                        <th className="serialNo">SL No</th>
                        <th>Description</th>
                        <th>Qty </th>
                        <th>Rate</th>
                        <th>Amount </th>
                      </tr>
                    </thead>
                    <tbody>
                      <>
                        {pageData?.map((data, index) => (
                          <tr key={data._id}>
                            <td>
                              {pageNumber === 0 && index + 1}
                              {pageNumber === 1 && 28 + index + 1}
                              {pageNumber === 2 && pageNumber * 30 + index}
                              {pageNumber === 3 && pageNumber * 30 + index + 1}
                              {pageNumber === 4 && pageNumber * 30 + index + 2}
                              {pageNumber === 5 && pageNumber * 30 + index + 3}
                              {pageNumber === 6 && pageNumber * 30 + index + 4}
                            </td>
                            <td>{data.description}</td>
                            <td>{data.quantity}</td>
                            <td>{data.rate}</td>
                            <td>{data.total}</td>
                          </tr>
                        ))}
                      </>
                    </tbody>
                  </table>

                  <div className="flex items-center justify-end text-[12px] mt-2">
                    <span>Total Amount :</span>
                    <b className="ml-3 ">৳ {invoicePreview?.parts_total}</b>
                  </div>
                  <div className="flex  justify-end ">
                    <Divider sx={{ width: "200px", marginTop: "5px" }} />
                  </div>
                  {servicePagesData[0]?.length === 0 && (
                    <>
                      {pageNumber === pagesData?.length - 1 && (
                        <div className="flex justify-between items-end mt-3 border-b-[1px] pb-3 border-[#ddd]">
                          <div className="mt-5 text-[12px] invisible">
                            <b className="">In words:</b> {totalAmountInWords}
                          </div>
                          <div className="flex netTotalAmounts">
                            <div className="">
                              <b>Sub Total </b>
                              {invoicePreview.discount !== 0 && (
                                <b> Discount </b>
                              )}
                              {invoicePreview.vat !== 0 && <b> VAT </b>}
                              <b> Net Total </b>
                            </div>
                            <div>
                              <small> : ৳ {invoicePreview.total_amount}</small>
                              {invoicePreview.discount !== 0 && (
                                <small> : {invoicePreview.discount}</small>
                              )}
                              {invoicePreview.vat !== 0 && (
                                <small> : {invoicePreview.vat}%</small>
                              )}
                              <small> : ৳ {invoicePreview?.net_total}</small>
                              {/* <small> : {invoicePreview.advance}</small>
                            <small> : {invoicePreview.due}</small> */}
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  {pageNumber === pagesData?.length - 1 && (
                    <div className="mt-5 text-[12px]">
                      <b className="">In words:</b> {partsTotalAmountInWords}
                    </div>
                  )}
                </div>

                {/* <div>
                  {pageNumber === pagesData?.length - 1 && (
                    <div className="customerSignatureWrap">
                      <b className="text-sm customerSignatur">
                        Customer Signature :{" "}
                      </b>
                      <b className="text-sm customerSignatur">
                        Trust Auto Solution
                      </b>
                    </div>
                  )}
                </div> */}
              </div>
            </div>
            {pageNumber === pagesData?.length - 1 && (
              <div className="printInvoiceBtnGroup">
                <button onClick={handlePrint}>Print </button>
                {/* <button onClick={() => toPDF()}>Pdf </button> */}

                <Link to={`/dashboard/update-quotation?id=${id}`}>
                  <button> Edit </button>
                </Link>

                <Link to="/dashboard/qutation">
                  {" "}
                  <button> Qutation </button>
                </Link>
              </div>
            )}
          </main>
        ))}
      {servicePagesData[0]?.length > 0 &&
        servicePagesData?.map((pageData, pageNumber) => (
          <main ref={targetRef} key={pageNumber} className="invoicePrintWrap">
            <div>
              <div className="pb-5 px-14 invoicePrint">
                <div>
                  <div className=" mb-2 mx-auto text-center border-b-2 border-[#351E98] pb-2">
                    <div className="flex items-center justify-between w-full mt-5 mb-2">
                      <img className="w-[120px] " src={logo} alt="logo" />
                      <div>
                        <h2 className="trustAutoTitle qoutationTitle">
                          Trust Auto Solution{" "}
                        </h2>
                        <small className="block">
                          Office: Ka-93/4/C, Kuril Bishawroad, Dhaka-1229
                        </small>
                      </div>
                      <div className="text-left">
                        <small className="block">
                          <small className="font-bold">Mobile:</small> +88
                          01821-216465
                        </small>
                        <small className="block">
                          <small className="font-bold">Email:</small>{" "}
                          trustautosolution@gmail.com
                        </small>
                        <small className="block font-bold ">
                          www.trustautosolution.com
                        </small>
                      </div>
                    </div>
                  </div>

                  {pageNumber === 0 && (
                    <div className="text-center border-b-2 border-[#351E98] pb-2">
                      Service description
                    </div>
                    // <div className="px-10">
                    //   <div className="flex text-[12px] items-center justify-between border-b-2 pb-1 border-[#351E98]">
                    //     <span className="w-[200px] ">
                    //       {" "}
                    //       <b>Customer ID:</b> {invoicePreview.Id}
                    //     </span>
                    //     <b className="mr-[88px] uppercase">Quotation</b>
                    //     <b>
                    //       Date:
                    //       {formatDate(invoicePreview?.createdAt)}
                    //     </b>
                    //   </div>

                    //   <div className="flex items-center justify-between mx-auto mt-2 ">
                    //     <div className="flex justify-between w-[280px] overflow-hidden ">
                    //       <div className="invoiceCustomerInfo">
                    //         <b>Quotation No</b>
                    //         <b>Company</b>
                    //         <b>Customer</b>
                    //         <b>Phone</b>
                    //         <b>Address</b>
                    //       </div>
                    //       <div className="invoiceCustomerInfo">
                    //         <small>: {invoicePreview.job_no}ssssssddddd</small>
                    //         <small>: {invoicePreview.company_name}</small>
                    //         <small>: {invoicePreview.customer_name}</small>
                    //         <small>: {invoicePreview.customer_contact}</small>
                    //         <small>
                    //           : {invoicePreview.customer_address}dddddddddddd
                    //         </small>
                    //       </div>
                    //     </div>
                    //     <div className="invoiceLine"></div>
                    //     <div className="flex w-[280px] justify-between overflow-hidden">
                    //       <div className="invoiceCustomerInfo">
                    //         <b>Registration No </b>
                    //         <b>Chassis No </b>
                    //         <b>Engine & CC </b>
                    //         <b>Vehicle Name </b>
                    //         <b>Mileage </b>
                    //       </div>
                    //       <div className="invoiceCustomerInfo">
                    //         <small>
                    //           : {invoicePreview.car_registration_no}
                    //         </small>
                    //         <small>: {invoicePreview.chassis_no}</small>
                    //         <small>: {invoicePreview.engine_no}</small>
                    //         <small>: {invoicePreview.vehicle_name}</small>
                    //         <small>: {invoicePreview.mileage}</small>
                    //       </div>
                    //     </div>
                    //   </div>
                    // </div>
                  )}
                  <table className="mt-5 invoiceTable2 qutationTables">
                    <thead className="tableWrap">
                      <tr>
                        <th className="serialNo">SL No</th>
                        <th>Description</th>
                        <th>Qty </th>
                        <th>Rate</th>
                        <th>Amount </th>
                      </tr>
                    </thead>
                    <tbody>
                      <>
                        {pageData?.map((data, index) => (
                          <tr key={data._id}>
                            <td>
                              {pageNumber === 0 && index + 1}
                              {pageNumber === 1 && 28 + index + 1}
                              {pageNumber === 2 && pageNumber * 30 + index}
                              {pageNumber === 3 && pageNumber * 30 + index + 1}
                              {pageNumber === 4 && pageNumber * 30 + index + 2}
                              {pageNumber === 5 && pageNumber * 30 + index + 3}
                              {pageNumber === 6 && pageNumber * 30 + index + 4}
                            </td>
                            <td>{data.description}</td>
                            <td>{data.quantity}</td>
                            <td>{data.rate}</td>
                            <td>{data.total}</td>
                          </tr>
                        ))}
                      </>
                    </tbody>
                  </table>

                  <div className="flex items-center justify-end text-[12px] mt-2">
                    <span>Total Amount :</span>
                    <b className="ml-3 ">৳ {invoicePreview?.service_total}</b>
                  </div>
                  <div className="flex  justify-end ">
                    <Divider sx={{ width: "200px", marginTop: "5px" }} />
                  </div>
                  {pageNumber === servicePagesData?.length - 1 && (
                    <div className="flex justify-between items-end mt-3 border-b-[1px] pb-3 border-[#ddd]">
                      <div className="mt-5 text-[12px] invisible">
                        <b className="">In words:</b> {totalAmountInWords}
                      </div>
                      <div className="flex netTotalAmounts">
                        <div className="">
                          <b>Sub Total </b>
                          {invoicePreview.discount !== 0 && <b> Discount </b>}
                          {invoicePreview.vat !== 0 && <b> VAT </b>}
                          <b> Net Total </b>
                        </div>
                        <div>
                          <small> : ৳ {invoicePreview.total_amount}</small>
                          {invoicePreview.discount !== 0 && (
                            <small> : {invoicePreview.discount}</small>
                          )}
                          {invoicePreview.vat !== 0 && (
                            <small> : {invoicePreview.vat}%</small>
                          )}
                          <small> : ৳ {invoicePreview?.net_total}</small>
                          {/* <small> : {invoicePreview.advance}</small>
                          <small> : {invoicePreview.due}</small> */}
                        </div>
                      </div>
                    </div>
                  )}
                  {pageNumber === servicePagesData?.length - 1 && (
                    <div className="mt-5 text-[12px]">
                      <b className="">In words:</b> {totalAmountInWords}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {pageNumber === servicePagesData?.length - 1 && (
              <div className="printInvoiceBtnGroup">
                <button onClick={handlePrint}>Print </button>

                <Link to={`/dashboard/update-quotation?id=${id}`}>
                  <button> Edit </button>
                </Link>

                <Link to="/dashboard/qutation">
                  {" "}
                  <button> Qutation </button>
                </Link>
              </div>
            )}
          </main>
        ))}
    </div>
  );
};

export default Detail;
