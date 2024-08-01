/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { FaCarSide, FaRegEdit } from "react-icons/fa";
import Card from "../../../../components/Card/Card";
import { Link } from "react-router-dom";
import { HiOutlineEye } from "react-icons/hi";
import { formatDate } from "../../../../utils/formateDate";
const CustomerAccount = ({ profileData }) => {
  const lastVehicle =
    profileData?.data?.vehicles?.length > 0
      ? [...profileData.data.vehicles].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )[0]
      : null;
  const beforeLastVehicle =
    profileData?.data?.vehicles?.length > 0
      ? [...profileData.data.vehicles].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )[1]
      : null;

  const lastJobCard =
    profileData?.data?.jobCards?.length > 0
      ? [...profileData.data.jobCards].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )[0]
      : null;

  const beforeLastJobCard =
    profileData?.data?.jobCards?.length > 0
      ? [...profileData.data.jobCards].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )[1]
      : null;
  const lastQuotation =
    profileData?.data?.quotations?.length > 0
      ? [...profileData.data.quotations].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )[0]
      : null;




  const beforeLastQuotation =
    profileData?.data?.quotations?.length > 0
      ? [...profileData.data.quotations].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )[1]
      : null;

  const lastInvoice =
    profileData?.data?.invoices?.length > 0
      ? [...profileData.data.invoices].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )[0]
      : null;

  const beforeLastInvoice =
    profileData?.data?.invoices?.length > 0
      ? [...profileData.data.invoices].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )[1]
      : null;
  const lastMoneyReceipt =
    profileData?.data?.money_receipts?.length > 0
      ? [...profileData.data.money_receipts].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )[0]
      : null;

  const beforeLastMoneyReceipt =
    profileData?.data?.money_receipts?.length > 0
      ? [...profileData.data.money_receipts
      ].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )[1]
      : null;


 console.log(lastQuotation)

  return (
    <div className="customerProfileWrap">
      <div className="justify-between block mt-5 md:flex">
        <Card>
          <h3 className="mb-2 text-xl font-semibold"> Contact Info </h3>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div>
                Customer Name :{" "}
                <b className="capitalize ">
                  {profileData?.data?.customer_name}{" "}
                </b>
              </div>
              <div>
                Vehicle Name : <b>{lastVehicle?.vehicle_name} </b>
              </div>
              <div>
                Registration No : <b>{lastVehicle?.fullRegNum}</b>
              </div>
              <div>
                Vehicle Model : <b>{`${lastVehicle?.vehicle_model}`} </b>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                Company Name :{" "}
                <b className="capitalize">{profileData?.data?.company_name} </b>
              </div>
              <div>
                Company Address : <b>{profileData?.data?.company_address}</b>
              </div>
              <div>
                Reference Name : <b> {profileData?.data?.reference_name}</b>
              </div>
              <div>
                Date : <b> {formatDate(profileData?.data?.createdAt)}</b>
              </div>
            </div>
          </div>
        </Card>
        {/* <Card>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Recent Vehicles </h3>
            <FaRegEdit size={30} />
          </div>
          <div className="flex items-center my-3">
            <div className="cardIcon bg-[#42A1DA]">
              <FaCarSide size={50} className="text-white" />
            </div>
            <div className="ml-3">
              <b>{lastVehicle?.vehicle_name}</b>
              <p>{lastVehicle?.fullRegNum}</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="cardIcon bg-[#0A9396]">
              <FaCarSide size={50} className="text-white" />
            </div>
            <div className="ml-3">
              <b>{beforeLastVehicle?.vehicle_name}</b>
              <p>{beforeLastVehicle?.fullRegNum}</p>
            </div>
          </div>
        </Card> */}
        <Card>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Recent Vehicle </h3>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center my-3">
              <div className="cardIcon ">
                <p className="text-[10px]">
                  {lastVehicle
                    ? `${new Date(lastVehicle?.createdAt).toLocaleString(
                        "en-US",
                        { month: "short" }
                      )}`
                    : "No Invoice"}
                </p>
              </div>
              <div className="ml-3">
                {lastVehicle && (
                  <div className="flex items-center ">
                    <b className="recentJobs">Vehicle name </b>:{" "}
                    <span className="ml-3">{lastVehicle?.vehicle_name}</span>
                  </div>
                )}
                {lastVehicle && (
                  <div className="flex items-center ">
                    <b className="recentJobs">Car Reg no </b>:{" "}
                    <span className="ml-3">{lastVehicle?.fullRegNum}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center my-3">
              <div className="cardIcon bg-[#48CAE4]">
                <p className="text-[10px]">
                  {beforeLastVehicle
                    ? `${new Date(beforeLastVehicle?.createdAt).toLocaleString(
                        "en-US",
                        { month: "short" }
                      )}`
                    : "No Vehicle"}
                </p>
              </div>
              <div className="ml-3">
                {beforeLastVehicle && (
                  <div className="flex items-center ">
                    <b className="recentJobs">Vehicle name </b>:{" "}
                    <span className="ml-3">
                      {beforeLastVehicle?.vehicle_name}
                    </span>
                  </div>
                )}
                {beforeLastVehicle && (
                  <div className="flex items-center ">
                    <b className="recentJobs">Car Reg no </b>:{" "}
                    <span className="ml-3">
                      {beforeLastVehicle?.fullRegNum}
                    </span>
                  </div>
                )}
              </div>
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
                  {lastJobCard
                    ? `${new Date(lastJobCard?.createdAt).toLocaleString(
                        "en-US",
                        { month: "short" }
                      )}`
                    : "No Job Card"}
                </p>

                <div>
                  <b>{lastJobCard?.date?.slice(0, 2)}</b>
                </div>
              </div>
              {lastJobCard && (
                <div className="ml-3 ">
                  <div className="flex items-center ">
                    <b className="recentJobs">Vehicle Name </b>:
                    <small className="ml-3">{lastVehicle?.vehicle_name}</small>
                  </div>

                  <div className="flex items-center">
                    <b className="recentJobs">Job No </b>:
                    <small className="ml-3"> {lastJobCard?.job_no}</small>
                  </div>
                </div>
              )}
            </div>
            <b className="cursor-pointer">
              <Link to={`/dashboard/preview?id=${lastJobCard?._id}`}>
                {" "}
                <HiOutlineEye size={35} />
              </Link>
            </b>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center my-3">
              <div className="cardIcon bg-[#48CAE4]">
                <p className="text-[10px]">
                  {beforeLastJobCard
                    ? `${new Date(beforeLastJobCard?.createdAt).toLocaleString(
                        "en-US",
                        { month: "short" }
                      )}`
                    : "No Job Card"}
                </p>

                <div>
                  <b>{beforeLastJobCard?.date?.slice(0, 2)}</b>
                </div>
              </div>
              <div className="ml-3">
                {beforeLastJobCard && (
                  <div className="flex items-center ">
                    <b className="recentJobs">Vehicle Name </b> :
                    <small className="ml-3">
                      {beforeLastVehicle?.vehicle_name}
                    </small>
                  </div>
                )}
                {beforeLastJobCard && (
                  <div className="flex items-center">
                    <b className="recentJobs"> Job No </b>:{" "}
                    <small className="ml-3 ">{beforeLastJobCard?.job_no}</small>
                  </div>
                )}
              </div>
            </div>
            <b className="cursor-pointer">
              <Link to={`/dashboard/preview?id=${beforeLastJobCard?._id}`}>
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
              <div className="cardIcon">
                <p className="text-[10px]">
                  {lastQuotation
                    ? `${new Date(lastQuotation?.createdAt).toLocaleString(
                        "en-US",
                        { month: "short" }
                      )}`
                    : "No Quotation"}
                </p>

                {lastQuotation && (
                  <div>
                    <b>{lastQuotation?.date?.slice(0, 2)}</b>
                  </div>
                )}
              </div>
              <div className="ml-3">
                {lastQuotation && (
                  <div className="flex items-center ">
                    <b className="recentJobs">Quotation Number </b>:{" "}
                    <small className="ml-3">{lastQuotation?.job_no}</small>
                  </div>
                )}
                {lastQuotation && (
                  <div className="flex items-center">
                    <b className="recentJobs">Vehicle Name</b>:{" "}
                    <small className="ml-3">
                      {lastQuotation?.vehicle?.vehicle_name}
                    </small>
                  </div>
                )}
                {lastQuotation && (
                  <div className="flex items-center ">
                    <b className="recentJobs">Total Amount</b>:{" "}
                    <small className="ml-3">৳{lastQuotation?.net_total}</small>
                  </div>
                )}
              </div>
            </div>
            <Link to={`/dashboard/quotation-view?id=${lastQuotation?._id}`}>
              <b className="cursor-pointer">
                <HiOutlineEye size={35} />
              </b>
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center my-3">
              <div className="cardIcon bg-[#48CAE4]">
                <p className="text-[10px]">
                  {beforeLastQuotation
                    ? `${new Date(
                        beforeLastQuotation?.createdAt
                      ).toLocaleString("en-US", { month: "short" })}`
                    : "No Quotation"}
                </p>

                {beforeLastQuotation && (
                  <div>
                    <b>{beforeLastQuotation?.date?.slice(0, 2)}</b>
                  </div>
                )}
              </div>
              <div className="ml-3">
                {beforeLastQuotation && (
                  <div className="flex items-center">
                    <b className="recentJobs">Quotation Number </b>:{" "}
                    <small className="ml-3">
                      {beforeLastQuotation?.job_no}
                    </small>
                  </div>
                )}
                {beforeLastQuotation && (
                  <div className="flex items-center">
                    <b className="recentJobs">Vehicle Name </b>:{" "}
                    <small className="ml-3">
                      {beforeLastQuotation?.vehicle?.vehicle_name}
                    </small>
                  </div>
                )}
                {beforeLastQuotation && (
                  <div className="flex items-center ">
                    <b className="recentJobs">Total Amount</b>:{" "}
                    <small className="ml-3">
                      ৳{beforeLastQuotation?.net_total}
                    </small>
                  </div>
                )}
              </div>
            </div>
            <Link
              to={`/dashboard/quotation-view?id=${beforeLastQuotation?._id}`}
            >
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
                  {lastInvoice
                    ? `${new Date(lastInvoice?.createdAt).toLocaleString(
                        "en-US",
                        { month: "short" }
                      )}`
                    : "No Invoice"}
                </p>

                {lastInvoice && (
                  <div>
                    <b>{lastInvoice?.date?.slice(0, 2)}</b>
                  </div>
                )}
              </div>
              <div className="ml-3">
                {lastInvoice && (
                  <div className="flex items-center ">
                    <b className="recentJobs">Invoice No </b>:{" "}
                    <span className="ml-3">{lastInvoice?.job_no}</span>
                  </div>
                )}
                {lastInvoice && (
                  <div className="flex items-center ">
                    <b className="recentJobs">Vehicle Name </b>:{" "}
                    <span className="ml-3">{lastInvoice?.vehicle?.vehicle_name}</span>
                  </div>
                )}
                {lastInvoice && (
                  <div className="flex items-center ">
                    <b className="recentJobs">Total Amount</b>:{" "}
                    <span className="ml-3">৳{lastInvoice?.net_total}</span>
                  </div>
                )}
              </div>
            </div>
            <Link to={`/dashboard/detail?id=${lastInvoice?._id}`}>
              <b className="cursor-pointer">
                <HiOutlineEye size={35} />
              </b>
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center my-3">
              <div className="cardIcon bg-[#48CAE4]">
                <p className="text-[10px]">
                  {beforeLastInvoice
                    ? `${new Date(beforeLastInvoice?.createdAt).toLocaleString(
                        "en-US",
                        { month: "short" }
                      )}`
                    : "No Invoice"}
                </p>

                {beforeLastInvoice && (
                  <div>
                    <b>{beforeLastInvoice?.date?.slice(0, 2)}</b>
                  </div>
                )}
              </div>
              <div className="ml-3">
                {beforeLastInvoice && (
                  <div className="flex items-center ">
                    <b className="recentJobs">Invoice No </b>:
                    <span className="ml-3">{beforeLastInvoice?.job_no}</span>
                  </div>
                )}
                {beforeLastInvoice && (
                  <div className="flex items-center ">
                    <b className="recentJobs">Vehicle Name </b>:{" "}
                    <span className="ml-3">
                      {beforeLastInvoice?.vehicle?.vehicle_name}
                    </span>
                  </div>
                )}
                {beforeLastInvoice && (
                  <div className="flex items-center ">
                    <b className="recentJobs">Total Amount</b>:{" "}
                    <span className="ml-3">
                      ৳{beforeLastInvoice?.net_total}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <Link to={`/dashboard/detail?id=${beforeLastInvoice?._id}`}>
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
                <div>
                  <p className="text-[10px]">
                    {lastMoneyReceipt
                      ? `${new Date(lastMoneyReceipt?.createdAt).toLocaleString(
                          "en-US",
                          { month: "short" }
                        )}`
                      : "No Money Receipt"}
                  </p>
                  {lastMoneyReceipt && (
                    <b>{lastMoneyReceipt?.createdAt?.slice(0, 2)}</b>
                  )}
                </div>
              </div>
              <div className="ml-3">
                {lastMoneyReceipt && (
                  <div>
                    <div className="flex items-center">
                      <b className="recentJobs">Against bill no</b>:
                      <span className="ml-3">
                        {" "}
                        {lastMoneyReceipt?.job_no}
                      </span>
                    </div>
                  </div>
                )}
                {lastMoneyReceipt && (
                  <div>
                    <div className="flex items-center">
                      <b className="recentJobs">Remaining </b>:{" "}
                      <small className="ml-3">
                        {" "}
                        ৳{lastMoneyReceipt?.remaining}
                      </small>
                    </div>
                  </div>
                )}
                {lastMoneyReceipt && (
                  <div>
                    <div className="flex items-center">
                      <b className="recentJobs">Total Amount </b>:{" "}
                      <small className="ml-3">
                        {" "}
                        ৳{lastMoneyReceipt?.total_amount}
                      </small>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <Link
              to={`/dashboard/money-receipt-view?id=${lastMoneyReceipt?._id}`}
            >
              <b className="cursor-pointer">
                <HiOutlineEye size={35} />
              </b>
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center my-3">
              <div className="cardIcon bg-[#48CAE4]">
                <b className="block"></b>
                <div>
                  <p className="text-[10px]">
                    {beforeLastMoneyReceipt
                      ? `${new Date(
                          beforeLastMoneyReceipt?.createdAt
                        ).toLocaleString("en-US", { month: "short" })}`
                      : "No Money Receipt"}
                  </p>
                  {beforeLastMoneyReceipt && (
                    <b>{beforeLastMoneyReceipt?.createdAt?.slice(0, 2)}</b>
                  )}
                </div>
              </div>
              <div className="ml-3">
                {beforeLastMoneyReceipt && (
                  <div>
                    <div className="flex items-center">
                      <b className="recentJobs">Against bill no</b>:{" "}
                      <span className="ml-3">
                        {" "}
                        {beforeLastMoneyReceipt?.job_no}
                      </span>
                    </div>
                  </div>
                )}
                {beforeLastMoneyReceipt && (
                  <div>
                    <div className="flex items-center">
                      <b className="recentJobs">Remaining</b>:{" "}
                      <small className="ml-3">
                        {" "}
                        ৳{beforeLastMoneyReceipt?.remaining}
                      </small>
                    </div>
                  </div>
                )}
                {beforeLastMoneyReceipt && (
                  <div>
                    <div className="flex items-center">
                      <b className="recentJobs">Total Amount </b>:{" "}
                      <small className="ml-3">
                        {" "}
                        ৳{beforeLastMoneyReceipt?.total_amount}
                      </small>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <Link to={`/dashboard/detail?id=${beforeLastMoneyReceipt?._id}`}>
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

export default CustomerAccount;
