/* eslint-disable no-unused-vars */
import {
  FaCarSide,
  FaFileInvoice,
  FaFileInvoiceDollar,
  FaPercent,
  FaUsers,
  FaWrench,
} from "react-icons/fa";
import { FaCarOn } from "react-icons/fa6";
import { HiOutlineBriefcase } from "react-icons/hi";
import { useGetAllInvoicesQuery } from "../../../redux/api/invoice";
import { useGetAllQuotationsQuery } from "../../../redux/api/quotation";
import { useGetAllJobCardsQuery } from "../../../redux/api/jobCard";
import { useGetAllCustomersQuery } from "../../../redux/api/customerApi";
import { useGetAllCompaniesQuery } from "../../../redux/api/companyApi";
import { useGetAllShowRoomsQuery } from "../../../redux/api/showRoomApi";
import { useGetAllMoneyReceiptsQuery } from "../../../redux/api/money-receipt";

const AllServices = () => {
  const {
    data: invoiceData,
    error: invoiceError,
    isLoading: invoiceLoading,
  } = useGetAllInvoicesQuery({
    limit: 10,
    page: 1,
  });

  const {
    data: quotationData,
    error: quotationError,
    isLoading: quotationLoading,
  } = useGetAllQuotationsQuery({
    limit: 10,
    page: 1,
  });

  const {
    data: jobCardData,
    error: jobCardError,
    isLoading: jobCardLoading,
  } = useGetAllJobCardsQuery({
    limit: 10,
    page: 1,
  });
  const {
    data: customerData,
    error: customerError,
    isLoading: customerLoading,
  } = useGetAllCustomersQuery({
    limit: 10,
    page: 1,
  });
  const {
    data: showroomData,
    error: showroomError,
    isLoading: showroomLoading,
  } = useGetAllShowRoomsQuery({
    limit: 10,
    page: 1,
  });
  const {
    data: companyData,
    error: companyError,
    isLoading: companyLoading,
  } = useGetAllCompaniesQuery({
    limit: 10,
    page: 1,
  });
  const { data: moneyRecieptData } = useGetAllMoneyReceiptsQuery({
    limit: 10,
    page: 1,
  });

  if (invoiceLoading || quotationLoading || jobCardLoading)
    return <div>Loading...</div>;
  if (invoiceError || jobCardError || quotationError)
    return <div>Someting went to wrong!</div>;

  console.log(moneyRecieptData);
  const paidServiceBill = moneyRecieptData?.data?.moneyReceipts.reduce(
    (sum, paid) => sum + paid.total_amount,
    0
  );
  const remainingBill = moneyRecieptData?.data?.moneyReceipts.reduce(
    (sum, paid) => sum + paid.remaining,
    0
  );
  console.log(paidServiceBill);
  console.log(remainingBill);

  const allCustomer =
    Number(customerData?.data?.customers?.length) +
    Number(companyData?.data?.companies?.length) +
    Number(showroomData?.data?.showrooms?.length);

  return (
    <div className="dashBoardRight mt-5 lg:mt-0 ">
      <div className="md:flex items-center justify-between md:p-[0px] lg:p-[18px]"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-content-center gap-10  mb-5">
        <div className="completedServiceCards flex justify-between items-center rounded-lg bg-[#42A1DA] text-white ">
          <div className="mr-5">
            <h3 className="xl:text-xl">Completed Services</h3>
            <span className="text-2xl font-bold">
              {invoiceData?.data?.invoices?.length}{" "}
            </span>
          </div>
          <div className="valueRight">
            <HiOutlineBriefcase className="dashboardCardIcon" />
          </div>
        </div>

        <div className="completedServiceCards flex justify-between items-center  rounded-lg bg-[#42A1DA] text-white">
          <div className="mr-5">
            <h3 className="text-xl">Running Services</h3>
            <span className="xl:text-2xl font-bold">
              {" "}
              {quotationData?.data?.quotations?.length}{" "}
            </span>
          </div>
          <div className="valueRight">
            <FaWrench className="dashboardCardIcon" />
          </div>
        </div>

        <div className="completedServiceCards flex justify-between items-center  rounded-lg bg-[#48cae4] text-white">
          <div className="mr-5">
            <h3 className="xl:text-xl">Total Sale </h3>
            <span className="text-xl xl:text-2xl font-bold">99 </span>
          </div>
          <div className="valueRight">
            <FaPercent className="dashboardCardIcon" />
          </div>
        </div>
        <div className="completedServiceCards flex justify-between items-center  rounded-lg bg-[#03045e] text-white">
          <div className="mr-5">
            <h3 className="xl:text-xl">Total Product </h3>
            <span className="text-xl xl:text-2xl font-bold">99 </span>
          </div>
          <div className="valueRight">
            <FaCarSide className="dashboardCardIcon" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-content-center gap-10  mb-5">
        <div className="completedServiceCards flex justify-between items-center rounded-lg bg-[#f77f00] text-white">
          <div className="mr-5">
            <h3 className="xl:text-xl">Paid Services Bill</h3>
            <span className="text-xl xl:text-2xl font-bold">{paidServiceBill}৳</span>
          </div>
          <div className="valueRight">
            <FaFileInvoice className="dashboardCardIcon" />
          </div>
        </div>

        <div className="completedServiceCards flex justify-between items-center rounded-lg bg-[#ef233c] text-white">
          <div className="mr-5">
            <h3 className="xl:text-xl">Due Service Bill </h3>
            <span className="text-xl xl:text-2xl font-bold">{remainingBill}৳ </span>
          </div>
          <div className="valueRight">
            <FaFileInvoiceDollar className="dashboardCardIcon" />
          </div>
        </div>
        <div className="completedServiceCards flex justify-between items-center rounded-lg bg-[#0a9396] text-white">
          <div className="mr-5">
            <h3 className="xl:text-xl">Our Customer </h3>
            <span className="text-xl xl:text-2xl font-bold">
              {allCustomer}{" "}
            </span>
          </div>
          <div className="valueRight">
            <FaUsers className="dashboardCardIcon" />
          </div>
        </div>
        <div className=" completedServiceCards flex justify-between items-center rounded-lg bg-[#3a0ca3] text-white">
          <div className="mr-5">
            <h3 className=" xl:text-xl">About Trust Auto Solution</h3>
          </div>
          <div className="valueRight">
            <FaCarOn className="dashboardCardIcon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllServices;
