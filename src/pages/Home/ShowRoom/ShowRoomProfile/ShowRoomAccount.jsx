/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { FaCarSide, FaInfo, FaRegEdit } from "react-icons/fa";
import Card from "../../../../components/Card/Card";
import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineEye } from "react-icons/hi";
import { formatDate } from "../../../../utils/formateDate";
// import invoice from "../../../../../public/assets/invoice.png";

const ShowRoomAccount = ({
  profileData,
  jobCardData,
  quotationData,
  moneyReceiptData,
  invoiceData,
}) => {

  return (
    <div className="customerProfileWrap">
      <div className="justify-between block mt-5 md:flex">
        <Card>
          <h3 className="mb-2 text-xl font-semibold"> Contact Info </h3>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div>
                Show Room Name :{" "}
                <b className="capitalize ">{profileData?.company_name} </b>
              </div>
              <div>
                Vehicle Name : <b>{profileData?.vehicle_name} </b>
              </div>
              <div>
                Registration No : <b>{profileData?.car_registration_no}</b>
              </div>
            </div>

            <div className="space-y-2">
              <div>
              Date : <b> {formatDate(profileData?.createdAt)}</b>
              </div>
              <div>
                Company Address : <b>{profileData?.company_address}</b>
              </div>
              <div>
                Reference Name : <b> {profileData?.reference_name}</b>
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Recent Vehicles </h3>
            <FaRegEdit size={30} />
          </div>
          <div className="flex items-center my-3">
            <div className="cardIcon bg-[#42A1DA]">
              <FaCarSide size={50} className="text-white" />
            </div>
            <div className="ml-3">
              <b>Ferrari</b>
              <p>Bangladesh </p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="cardIcon bg-[#0A9396]">
              <FaCarSide size={50} className="text-white" />
            </div>
            <div className="ml-3">
              <b>Ferrari</b>
              <p>Bangladesh </p>
            </div>
          </div>
        </Card>
      </div>
      <div className="justify-between block mt-5 md:flex">
      <Card>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Recent Job Card </h3>
            <Link to="/dashboard/addjob">
              {" "}
              <FaRegEdit size={30} />
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center my-3">
              <div className="cardIcon ">
                <p className="text-[10px]">
                  {jobCardData[0]
                    ? `${new Date(
                        jobCardData[0]?.createdAt
                      ).toLocaleString("en-US", { month: "short" })}`
                    : "No Job Card"}
                </p>

                {jobCardData && jobCardData?.length > 0 && (
                  <div key={jobCardData[0]?.Id}>
                    <b>{jobCardData[0]?.date?.slice(0, 2)}</b>
                  </div>
                )}
              </div>
              <div className="ml-3 ">
                {jobCardData && invoiceData?.length > 0 && (
                  <div key={jobCardData[0]?.Id} className="flex items-center ">
                    <b className="recentJobs">Vehicle Name </b>
                    :<small className="ml-3">
                       {jobCardData[0]?.vehicle_name}
                    </small>
                  </div>
                )}
                {jobCardData && jobCardData.length > 0 && (
                  <div key={jobCardData[0]?.Id} className="flex items-center">
                    <b className="recentJobs">Job No  </b>
                    : <small className="ml-3">  {jobCardData[0]?.job_no}</small>
                  </div>
                )}
              </div>
            </div>
            <b className="cursor-pointer">
              <Link to={`/dashboard/preview?id=${jobCardData[0]?._id}`}>
                {" "}
                <HiOutlineEye size={35} />
              </Link>
            </b>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center my-3">
              <div className="cardIcon bg-[#48CAE4]">
                <p className="text-[10px]">
                  {jobCardData[1]
                    ? `${new Date(
                        jobCardData[0]?.createdAt
                      ).toLocaleString("en-US", { month: "short" })}`
                    : "No Job Card"}
                </p>
                {jobCardData && jobCardData?.length > 0 && (
                  <div key={jobCardData[1]?.Id}>
                    <b>{jobCardData[1]?.date?.slice(0, 2)}</b>
                  </div>
                )}
              </div>
              <div className="ml-3">
                {jobCardData && jobCardData?.length > 0 && (
                  <div key={jobCardData[1]?.Id} className="flex items-center ">
                    <b className="recentJobs">Vehicle Name </b>
                    :<small className="ml-3">
                      {jobCardData[1]?.vehicle_name}
                    </small>
                  </div>
                )}
                {jobCardData && jobCardData?.length > 0 && (
                  <div
                    key={jobCardData[1]?.job_no}
                    className="flex items-center"
                  >
                    <b className="recentJobs"> Job No </b>
                     : <small className="ml-3 ">{jobCardData[1]?.job_no}</small>
                  </div>
                )}
              </div>
            </div>
            <b className="cursor-pointer">
              <Link to={`/dashboard/preview?id=${jobCardData[1]?._id}`}>
                {" "}
                <HiOutlineEye size={35} />
              </Link>
            </b>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Recent Quotation </h3>
            <Link to="/dashboard/qutation">
              {" "}
              <FaRegEdit size={30} />
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center my-3">
              <div className="cardIcon ">
                <p>
                  {quotationData[0]
                    ? `${new Date(
                        quotationData[0]?.createdAt
                      ).toLocaleString("en-US", { month: "short" })}`
                    : "No Quotation"}
                </p>

                {quotationData && quotationData.length > 0 && (
                  <div key={quotationData[0]?.Id}>
                    <b>{quotationData[0]?.date?.slice(0, 2)}</b>
                  </div>
                )}
              </div>
              <div className="ml-3">
                {quotationData && quotationData.length > 0 && (
                  <div key={quotationData[0]?.Id} className="flex items-center ">
                    <b  className="recentJobs">Quotation Number </b>
                    : <small className="ml-3">{quotationData[0]?.job_no}</small>
                  </div>
                )}
                {quotationData && quotationData.length > 0 && (
                  <div key={quotationData[0]?.Id} className="flex items-center">
                    <b className="recentJobs">Vehicle Name</b>
                    : <small className="ml-3">{quotationData[0]?.vehicle_name}</small>
                  </div>
                )}
                {quotationData && quotationData.length > 0 && (
                  <div key={quotationData[0]?.Id} className="flex items-center ">
                    <b className="recentJobs">Total Amount</b>
                    : <small className="ml-3">৳{quotationData[0]?.net_total}</small>
                  </div>
                )}
              </div>
            </div>
            <Link to={`/dashboard/quotation-view?id=${quotationData[0]?._id}`}>
              <b className="cursor-pointer">
                <HiOutlineEye size={35} />
              </b>
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center my-3">
              <div className="cardIcon bg-[#48CAE4]">
                <p className="text-[10px]">
                  {quotationData[1]
                    ? `${new Date(
                        quotationData[1]?.createdAt
                      ).toLocaleString("en-US", { month: "short" })}`
                    : "No Quotation"}
                </p>

                {quotationData && quotationData?.length > 0 && (
                  <div key={quotationData[1]?.Id}>
                    <b>{quotationData[1]?.date?.slice(0, 2)}</b>
                  </div>
                )}
              </div>
              <div className="ml-3">
                {quotationData && quotationData.length > 0 && (
                  <div key={quotationData[1]?.Id} className="flex items-center">
                    <b className="recentJobs">Quotation Number </b>
                    : <small className="ml-3">{quotationData[1]?.job_no}</small>
                  </div>
                )}
                {quotationData && quotationData.length > 0 && (
                  <div key={quotationData[1]?.Id} className="flex items-center">
                    <b className="recentJobs">Vehicle Name </b>
                    : <small className="ml-3">{quotationData[1]?.vehicle_name}</small>
                  </div>
                )}
                {quotationData && quotationData.length > 0 && (
                  <div key={quotationData[1]?.Id} className="flex items-center ">
                    <b className="recentJobs">Total Amount</b>
                    : <small className="ml-3">৳{quotationData[1]?.net_total}</small>
                  </div>
                )}
              </div>
            </div>
            <Link to={`/dashboard/quotation-view?id=${quotationData[1]?._id}`}>
              <b className="cursor-pointer">
                <HiOutlineEye size={35} />
              </b>
            </Link>
          </div>
        </Card>
      </div>
      <div className="justify-between block mt-5 md:flex">
      <Card>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Recent Invoice </h3>
            <Link to="/dashboard/invoice">
              {" "}
              <FaRegEdit size={30} />
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center my-3">
              <div className="cardIcon ">
                <p className="text-[10px]">
                  {invoiceData[0]
                    ? `${new Date(
                        invoiceData[0]?.createdAt
                      ).toLocaleString("en-US", { month: "short" })}`
                    : "No Invoice"}
                </p>

                <p></p>
                {invoiceData && invoiceData?.length > 0 && (
                  <div key={invoiceData[0]?.Id}>
                    <b>{invoiceData[0]?.date?.slice(0, 2)}</b>
                  </div>
                )}
              </div>
              <div className="ml-3">
                {invoiceData && invoiceData?.length > 0 && (
                  <div key={invoiceData[0]?.Id} className="flex items-center ">
                    <b className="recentJobs">Invoice No  </b>
                    : <span className="ml-3">{invoiceData[0]?.job_no}</span>
                  </div>
                )}
                {invoiceData && invoiceData?.length > 0 && (
                  <div key={invoiceData[0]?.Id} className="flex items-center ">
                    <b className="recentJobs">Vehicle Name  </b>
                    : <span className="ml-3">{invoiceData[0]?.vehicle_name}</span>
                  </div>
                )}
                {invoiceData && invoiceData.length > 0 && (
                  <div key={invoiceData[0]?.Id} className="flex items-center ">
                    <b className="recentJobs">Total Amount</b>
                    : <span className="ml-3">৳{invoiceData[0]?.net_total}</span>
                  </div>
                )}
              </div>
            </div>
            <Link to={`/dashboard/detail?id=${invoiceData[0]?._id}`}>
              <b className="cursor-pointer">
                <HiOutlineEye size={35} />
              </b>
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center my-3">
              <div className="cardIcon bg-[#48CAE4]">
                <p className="text-[10px]">
                  {invoiceData[1]
                    ? `${new Date(
                        invoiceData[1]?.createdAt
                      ).toLocaleString("en-US", { month: "short" })}`
                    : "No Invoice"}
                </p>

                {invoiceData && invoiceData?.length > 0 && (
                  <div key={invoiceData[1]?.Id}>
                    <b>{invoiceData[1]?.date?.slice(0, 2)}</b>
                  </div>
                )}
              </div>
              <div className="ml-3">
                {invoiceData && invoiceData?.length > 0 && (
                  <div key={invoiceData[1]?.Id} className="flex items-center ">
                    <b className="recentJobs">Invoice No  </b>
                    :<span className="ml-3">{invoiceData[1]?.job_no}</span>
                  </div>
                )}
                {invoiceData && invoiceData?.length > 0 && (
                  <div key={invoiceData[1]?.Id} className="flex items-center ">
                    <b className="recentJobs">Vehicle Name  </b>
                    : <span className="ml-3">{invoiceData[1]?.vehicle_name}</span>
                  </div>
                )}
                {invoiceData && invoiceData.length > 0 && (
                  <div key={invoiceData[1]?.Id} className="flex items-center ">
                    <b className="recentJobs">Total Amount</b>
                    : <span className="ml-3">৳{invoiceData[1]?.net_total}</span>
                  </div>
                )}
              </div>
            </div>
            <Link to={`/dashboard/detail?id=${invoiceData[1]?._id}`}>
              <b className="cursor-pointer">
                <HiOutlineEye size={35} />
              </b>
            </Link>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Recent Money Receipt </h3>
            <Link to="/dashboard/money-receive">
              {" "}
              <FaRegEdit size={30} />
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center my-3">
              <div className="cardIcon ">
                <b className="block"></b>
                {moneyReceiptData && moneyReceiptData?.length > 0 && (
                  <div key={moneyReceiptData[0]?.Id}>
                    <p className="text-[10px]">
                      {moneyReceiptData[0]
                        ? `${new Date(
                            moneyReceiptData[0]?.createdAt
                          ).toLocaleString("en-US", { month: "short" })}`
                        : "No Money Receipt"}
                    </p>

                    <b>{moneyReceiptData[0]?.createdAt?.slice(0, 2)}</b>
                  </div>
                )}
              </div>
              <div className="ml-3">
                {moneyReceiptData && moneyReceiptData?.length > 0 && (
                  <div key={moneyReceiptData[0]?.Id}>
                    <div className="flex items-center">
                      <b className="recentJobs">Against bill no</b>
                      :<span className="ml-3"> {moneyReceiptData[0]?.against_bill_no}</span>
                    </div>
                  </div>
                )}
                {moneyReceiptData && moneyReceiptData?.length > 0 && (
                  <div key={moneyReceiptData[0]?.Id}>
                    <div className="flex items-center">
                      <b className="recentJobs">Remaining </b>
                     :  <small className="ml-3"> ৳{moneyReceiptData[0]?.remaining}</small>
                    </div>
                  </div>
                )}
                {moneyReceiptData && moneyReceiptData?.length > 0 && (
                  <div key={moneyReceiptData[0]?.Id}>
                    <div className="flex items-center">
                      <b className="recentJobs">Total Amount </b>
                     :  <small className="ml-3"> ৳{moneyReceiptData[0]?.total_amount}</small>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <Link
              to={`/dashboard/money-receipt-view?id=${moneyReceiptData[0]?._id}`}
            >
              <b className="cursor-pointer">
                <HiOutlineEye size={35} />
              </b>
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center my-3">
              <div className="cardIcon ">
                <b className="block"></b>
                {moneyReceiptData && moneyReceiptData?.length > 0 && (
                  <div key={moneyReceiptData[1]?.Id}>
                    <p className="text-[10px]">
                      {moneyReceiptData[1]
                        ? `${new Date(
                            moneyReceiptData[1]?.createdAt
                          ).toLocaleString("en-US", { month: "short" })}`
                        : "No Money Receipt"}
                    </p>
                    <b>{moneyReceiptData[1]?.createdAt?.slice(0, 2)}</b>
                  </div>
                )}
              </div>
              <div className="ml-3">
                {moneyReceiptData && moneyReceiptData?.length > 0 && (
                  <div key={moneyReceiptData[1]?.Id}>
                    <div className="flex items-center">
                      <b className="recentJobs">Against bill no</b>
                      : <span className="ml-3"> {moneyReceiptData[1]?.against_bill_no}</span>
                    </div>
                  </div>
                )}
                {moneyReceiptData && moneyReceiptData?.length > 0 && (
                  <div key={moneyReceiptData[1]?.Id}>
                    <div className="flex items-center">
                      <b className="recentJobs">Remaining</b>
                     :  <small className="ml-3"> ৳{moneyReceiptData[1]?.remaining}</small>
                    </div>
                  </div>
                )}
                {moneyReceiptData && moneyReceiptData?.length > 0 && (
                  <div key={moneyReceiptData[1]?.Id}>
                    <div className="flex items-center">
                      <b className="recentJobs" >Total Amount </b>
                     :  <small className="ml-3"> ৳{moneyReceiptData[1]?.total_amount}</small>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <Link to={`/dashboard/detail?id=${moneyReceiptData[1]?._id}`}>
              <b className="cursor-pointer">
                <HiOutlineEye size={35} />
              </b>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ShowRoomAccount;
