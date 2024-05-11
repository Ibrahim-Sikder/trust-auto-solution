/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { FaCarSide, FaInfo, FaRegEdit } from "react-icons/fa";
import Card from "../../../../components/Card/Card";
import invoice from "../../../../../public/assets/invoice.png";
import { HiOutlineEye } from "react-icons/hi";
import { Link } from "react-router-dom";
const CompanyAccount = ({
  profileData,
  jobCardData,
  quotationData,
  moneyReceiptData,
  invoiceData
}) => {
  
  
  return (
    <div className="customerProfileWrap">
    <div className="justify-between block mt-5 md:flex">
      <Card>
        <h3 className="mb-2 text-xl font-semibold"> Contact Info </h3>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div>
             Company Name : <b className="capitalize ">{profileData?.company_name} </b>
            </div>
            <div>
             Vehicle Name : <b>{profileData?.vehicle_name} </b>
            </div>
            <div>
             Registration No : <b>{profileData?.car_registration_no}</b>
            </div>
            
          </div>

          <div className="space-y-2" >
            <div>
              Company Name : <b className="capitalize">{profileData?.company_name} </b>
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
              <b className="block">Feb</b>
              {jobCardData && jobCardData?.length > 0 && (
                <div key={jobCardData[0]?.Id}>
                  <b>{jobCardData[0]?.date?.slice(0, 2)}</b>
                </div>
              )}
            </div>
            <div className="ml-3">
              {jobCardData && invoiceData?.length > 0 && (
                <div key={jobCardData[0]?.Id}>
                  <b>{jobCardData[0]?.vehicle_name}</b>
                </div>
              )}
              {jobCardData && jobCardData.length > 0 && (
                <div key={jobCardData[0]?.Id}>
                  <b>{jobCardData[0]?.job_no}</b>
                </div>
              )}
            </div>
          </div>
          <b className="cursor-pointer">
          <Link to={`/dashboard/preview?id=${jobCardData?._id}`}> <HiOutlineEye size={35} /></Link>
          </b>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center my-3">
            <div className="cardIcon bg-[#48CAE4]">
              <b className="block">Feb</b>
              {jobCardData && jobCardData?.length > 0 && (
                <div key={jobCardData[1]?.Id}>
                  <b>{jobCardData[1]?.date?.slice(0, 2)}</b>
                </div>
              )}
            </div>
            <div className="ml-3">
              {jobCardData && jobCardData?.length > 0 && (
                <div key={jobCardData[1]?.Id}>
                  <b>{jobCardData[1]?.vehicle_name}</b>
                </div>
              )}
              {jobCardData && jobCardData?.length > 0 && (
                <div key={jobCardData[1]?.job_no}>
                  <b>{jobCardData[1]?.job_no}</b>
                </div>
              )}
            </div>
          </div>
          <b className="cursor-pointer">
          
           <Link to={`/dashboard/preview?id=${jobCardData?._id}`}> <HiOutlineEye size={35} /></Link>
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
              <b className="block">Feb</b>
              {quotationData && quotationData.length > 0 && (
                <div key={quotationData[0]?.Id}>
                  <b>{quotationData[0]?.date?.slice(0, 2)}</b>
                </div>
              )}
            </div>
            <div className="ml-3">
              {quotationData && quotationData.length > 0 && (
                <div key={quotationData[0]?.Id}>
                  <b>{quotationData[0]?.vehicle_name}</b>
                </div>
              )}
              {quotationData && quotationData.length > 0 && (
                <div key={quotationData[0]?.Id}>
                  <b>৳{quotationData[0]?.net_total}</b>
                </div>
              )}
            </div>
          </div>
          <Link to={`/dashboard/quotation-view?id=${quotationData?._id}`}>
          <b className="cursor-pointer">
            <HiOutlineEye size={35} />
          </b>
          </Link>
         
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center my-3">
            <div className="cardIcon bg-[#48CAE4]">
              <b className="block">Feb</b>
              {quotationData && quotationData?.length > 0 && (
                <div key={quotationData[1]?.Id}>
                  <b>{quotationData[1]?.date?.slice(0, 2)}</b>
                </div>
              )}
            </div>
            <div className="ml-3">
              {quotationData && quotationData?.length > 0 && (
                <div key={quotationData[1]?.Id}>
                  <b>{quotationData[1]?.vehicle_name}</b>
                </div>
              )}
              {quotationData && quotationData?.length > 0 && (
                <div key={quotationData[1]?.Id}>
                  <b>৳{quotationData[1]?.net_total}</b>
                </div>
              )}
            </div>
          </div>
          <Link to={`/dashboard/quotation-view?id=${quotationData?._id}`}>
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
              <b className="block">Feb</b>
              {invoiceData && invoiceData?.length > 0 && (
                <div key={invoiceData[0]?.Id}>
                  <b>{invoiceData[0]?.date?.slice(0, 2)}</b>
                </div>
              )}
            </div>
            <div className="ml-3">
              {invoiceData && invoiceData?.length > 0 && (
                <div key={invoiceData[0]?.Id}>
                  <b>{invoiceData[0]?.vehicle_name}</b>
                </div>
              )}
              {invoiceData && invoiceData.length > 0 && (
                <div key={invoiceData[0]?.Id}>
                  <b>৳{invoiceData[0]?.net_total}</b>
                </div>
              )}
            </div>
          </div>
          <Link to={`/dashboard/detail?id=${invoiceData?._id}`}>
          <b className="cursor-pointer">
            <HiOutlineEye size={35} />
          </b>
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center my-3">
            <div className="cardIcon bg-[#48CAE4]">
              <b className="block">Feb</b>
              {invoiceData && invoiceData?.length > 0 && (
                <div key={invoiceData[1]?.Id}>
                  <b>{invoiceData[1]?.date.slice(0, 2)}</b>
                </div>
              )}
            </div>
            <div className="ml-3">
              {invoiceData && quotationData?.length > 0 && (
                <div key={quotationData[1]?.Id}>
                  <b>{quotationData[1]?.vehicle_name}</b>
                </div>
              )}
              {invoiceData && quotationData.length > 0 && (
                <div key={quotationData[1]?.Id}>
                  <b>৳{quotationData[1]?.net_total}</b>
                </div>
              )}
            </div>
          </div>
          <Link to={`/dashboard/detail?id=${invoiceData?._id}`}>
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
              <b className="block">Feb</b>
              {invoiceData && invoiceData?.length > 0 && (
                <div key={invoiceData[0]?.Id}>
                  <b>{invoiceData[0]?.date?.slice(0, 2)}</b>
                </div>
              )}
            </div>
            <div className="ml-3">
              {invoiceData && invoiceData?.length > 0 && (
                <div key={invoiceData[0]?.Id}>
                  <b>{invoiceData[0]?.vehicle_name}</b>
                </div>
              )}
              {invoiceData && invoiceData?.length > 0 && (
                <div key={invoiceData[0]?.Id}>
                  <b>৳{invoiceData[0]?.net_total}</b>
                </div>
              )}
            </div>
          </div>
          <b className="cursor-pointer">
            <HiOutlineEye size={35} />
          </b>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center my-3">
            <div className="cardIcon bg-[#48CAE4]">
              <b className="block">Feb</b>
              {invoiceData && invoiceData?.length > 0 && (
                <div key={invoiceData[1]?.Id}>
                  <b>{invoiceData[1]?.date.slice(0, 2)}</b>
                </div>
              )}
            </div>
            <div className="ml-3">
              {invoiceData && quotationData?.length > 0 && (
                <div key={quotationData[1]?.Id}>
                  <b>{quotationData[1]?.vehicle_name}</b>
                </div>
              )}
              {invoiceData && quotationData?.length > 0 && (
                <div key={quotationData[1]?.Id}>
                  <b>৳{quotationData[1]?.net_total}</b>
                </div>
              )}
            </div>
          </div>
          <b className="cursor-pointer">
            {" "}
            <HiOutlineEye size={35} />
          </b>
        </div>
      </Card>
    </div>
  </div>
  );
};

export default CompanyAccount;
