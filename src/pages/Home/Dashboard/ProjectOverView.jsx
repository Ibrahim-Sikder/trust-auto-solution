import { FaCarSide, FaFileInvoice } from "react-icons/fa";
import {
  HiOutlineBriefcase,
  HiOutlineUserGroup,
  HiOutlineUsers,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import ExpanseIncomeChart from "../../../components/Chart/ExpanseIncomeChart";
import { useGetAllJobCardsQuery } from "../../../redux/api/jobCard";
import { useGetAllQuotationsQuery } from "../../../redux/api/quotation";
import { useGetAllInvoicesQuery } from "../../../redux/api/invoice";
import { useGetAllCustomersQuery } from "../../../redux/api/customerApi";
import { useGetAllShowRoomsQuery } from "../../../redux/api/showRoomApi";
import { useGetAllCompaniesQuery } from "../../../redux/api/companyApi";
const ProjectOverView = () => {
  const { data: jobCardData, isLoading:jobCardLoading } = useGetAllJobCardsQuery({
    limit: 10,
    page: 1,
  });

  const { data: qutationData, isLoading: quotationLoading } = useGetAllQuotationsQuery({
    limit: 10,
    page: 1,
  });

  const { data: invoiceData, isLoading:invoiceLoading } = useGetAllInvoicesQuery({
    limit: 10,
    page: 1,
  });
  const { data: customerData, isLoading:customerLoading } = useGetAllCustomersQuery({
    limit: 10,
    page: 1,
  });
  const { data: showRoomData, isLoading:showRoomLoading } = useGetAllShowRoomsQuery({
    limit: 10,
    page: 1,
  });
  const { data: companyData, isLoading:companyLoading } = useGetAllCompaniesQuery({
    limit: 10,
    page: 1,
  });
  if(jobCardLoading || invoiceLoading || showRoomLoading || companyLoading || customerLoading || quotationLoading ){
    return <p>Loading.......</p>
  }

  const userData = [
    {
      id: 2,
      name: " Customers ",
      user: customerData?.data?.customers?.length,
    },
    {
      id: 1,
      name: "Show Room ",
      user: showRoomData?.data?.showrooms?.length,
    },

    {
      id: 3,
      name: "Company",
      user: companyData?.data?.companies?.length,
    },

    {
      id: 5,
      name: "Job Card",
      user: jobCardData?.data?.jobCards?.length,
    },
    {
      id: 6,
      name: " Quotation ",
      user: qutationData?.data?.quotations?.length,
    },
    {
      id: 6,
      name: "Invoice ",
      user: invoiceData?.data?.invoices?.length,
    },
  ];
  return (
    <>
      <div className="grid grid-cols-1  xl:grid-cols-2 gap-5  sectionMargin place-content-center justify-content-center ">
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-4
        5"
        >
          {userData.map((data, i) => (
            <div key={data.id}>
              <Link
                to={
                  i == 0
                    ? `${`/dashboard/add-customer`}`
                    : i == 1
                    ? `${`/dashboard/add-show-room`}`
                    : i == 2
                    ? `${`/dashboard/add-company`}`
                    : i == 3
                    ? `${`/dashboard/addjob`}`
                    : i == 4
                    ? `${`/dashboard/invoice`}`
                    : i == 5
                    ? `${`/dashboard/qutation`}`
                    : i == 2
                    ? `${`/dashboard/add-company`}`
                    : null
                }
              >
                <div className="dashboardCard">
                  <div className="dashboardIconWrap">
                    {i == 0 ? (
                      <HiOutlineUserGroup className="dashboardIcon" size={50} />
                    ) : i == 1 ? (
                      <HiOutlineUsers className="dashboardIcon" size={50} />
                    ) : i == 2 ? (
                      <HiOutlineUsers className="dashboardIcon" size={50} />
                    ) : i == 3 ? (
                      <HiOutlineBriefcase className="dashboardIcon" size={50} />
                    ) : i == 4 ? (
                      <FaCarSide className="dashboardIcon" size={50} />
                    ) : i == 5 ? (
                      <FaFileInvoice className="dashboardIcon" size={50} />
                    ) : null}
                  </div>
                  <div className="mt-2">
                    <span>{data.user}</span>
                    <h2 className="mt-2">{data.name}</h2>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <>
          <ExpanseIncomeChart />
        </>
      </div>
      <h3 className="text-3xl font-bold flex justify-end mr-20 lg:mr-72">
        Project Overview
      </h3>
    </>
  );
};

export default ProjectOverView;
