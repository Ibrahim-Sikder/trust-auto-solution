/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { FaCarSide, FaRegEdit } from "react-icons/fa";
import Card from "../../../../components/Card/Card";
import { HiOutlineEye } from "react-icons/hi";
import { Link } from "react-router-dom";
const CompanyAccount = ({
  profileData,
  jobCardData,
  quotationData,
  moneyReceiptData,
  invoiceData
}) => {
  
  console.log(quotationData)
  console.log(jobCardData)
  console.log(moneyReceiptData)
  console.log(profileData)


  
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
             User Name : <b className="capitalize">{profileData?.username} </b>
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
            <h3 className="text-xl font-semibold">Recent Quotation </h3>
            <Link to="/dashboard/qutation">
              {" "}
              <FaRegEdit size={30} />
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center my-3">
              <div className="cardIcon ">
              <p>{new Date(quotationData[0]?.createdAt).toLocaleString('en-US', { month: 'short' })}</p>
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
            <Link to={`/dashboard/quotation-view?id=${quotationData[0]?._id}`}>
            <b className="cursor-pointer">
              <HiOutlineEye size={35} />
            </b>
            </Link>
           
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center my-3">
              <div className="cardIcon bg-[#48CAE4]">
              <p>{new Date(quotationData[1]?.createdAt).toLocaleString('en-US', { month: 'short' })}</p>
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
          <h3 className="text-xl font-semibold">Recent Job Card </h3>
          <Link to="/dashboard/addjob">
            {" "}
            <FaRegEdit size={30} />
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center my-3">
            <div className="cardIcon ">
            <p>{new Date(jobCardData[0]?.createdAt).toLocaleString('en-US', { month: 'short' })}</p>
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
           { jobCardData[1]?.createdAt ?  <p>{new Date(jobCardData[1]?.createdAt).toLocaleString('en-US', { month: 'short' })}</p>: 'March'}
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
              <p>{new Date(quotationData[0]?.createdAt).toLocaleString('en-US', { month: 'short' })}</p>
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
            <Link to={`/dashboard/quotation-view?id=${quotationData[0]?._id}`}>
            <b className="cursor-pointer">
              <HiOutlineEye size={35} />
            </b>
            </Link>
           
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center my-3">
              <div className="cardIcon bg-[#48CAE4]">
              <p>{new Date(quotationData[1]?.createdAt).toLocaleString('en-US', { month: 'short' })}</p>
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
              <p>{new Date(invoiceData[0]?.createdAt).toLocaleString('en-US', { month: 'short' })}</p>
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
            <Link to={`/dashboard/detail?id=${invoiceData[0]?._id}`}>
            <b className="cursor-pointer">
              <HiOutlineEye size={35} />
            </b>
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center my-3">
              <div className="cardIcon bg-[#48CAE4]">
              <p>{new Date(invoiceData[1]?.createdAt).toLocaleString('en-US', { month: 'short' })}</p>
                {invoiceData && invoiceData?.length > 0 && (
                  <div key={invoiceData[1]?.Id}>
                    <b>{invoiceData[1]?.date?.slice(0, 2)}</b>
                  </div>
                )}
              </div>
              <div className="ml-3">
                {invoiceData && invoiceData?.length > 0 && (
                  <div key={invoiceData[1]?.Id}>
                    <b>{invoiceData[1]?.vehicle_name}</b>
                  </div>
                )}
                {invoiceData && invoiceData.length > 0 && (
                  <div key={invoiceData[1]?.Id}>
                    <b>৳{invoiceData[1]?.net_total}</b>
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
                  <p>{new Date(moneyReceiptData[0]?.createdAt).toLocaleString('en-US', { month: 'short' })}</p>
                    <b>{moneyReceiptData[0]?.createdAt?.slice(0, 2)}</b>
                  </div>
                )}
              </div>
              <div className="ml-3">
                {moneyReceiptData && moneyReceiptData?.length > 0 && (
                  <div key={moneyReceiptData[0]?.Id}>
                   <div className="flex items-center">
                   <span className="mr-2">Remaining :</span>
                   <b> ৳{moneyReceiptData[0]?.remaining}</b>
                   </div>
                  </div>
                )}
                {moneyReceiptData && moneyReceiptData?.length > 0 && (
                  <div key={moneyReceiptData[0]?.Id}>
                    <div className="flex items-center">
                    <span className="mr-2">Total Amount : </span>
                    <b> ৳{moneyReceiptData[0]?.total_amount}</b>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <Link to={`/dashboard/detail?id=${moneyReceiptData[0]?._id}`}>
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
                    <p>{new Date(moneyReceiptData[0]?.createdAt).toLocaleString('en-US', { month: 'short' })}</p>
                    <b>{moneyReceiptData[1]?.createdAt?.slice(0, 2)}</b>
                  </div>
                )}
              </div>
              <div className="ml-3">
                {moneyReceiptData && moneyReceiptData?.length > 0 && (
                  <div key={moneyReceiptData[1]?.Id}>
                   <div className="flex items-center">
                   <span className="mr-2">Remaining :</span>
                   <b> ৳{moneyReceiptData[1]?.remaining}</b>
                   </div>
                  </div>
                )}
                {moneyReceiptData && moneyReceiptData?.length > 0 && (
                  <div key={moneyReceiptData[1]?.Id}>
                    <div className="flex items-center">
                    <span className="mr-2">Total Amount : </span>
                    <b> ৳{moneyReceiptData[1]?.total_amount}</b>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <Link to={`/dashboard/detail?id=${moneyReceiptData[0]?._id}`}>
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

export default CompanyAccount;
