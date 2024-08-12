import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useGetAllInvoicesQuery } from "../../../redux/api/invoice";

const RecentInvoice = () => {
  const {
    data: invoiceData,
    error: invoiceError,
    isLoading: invoiceLoading,
  } = useGetAllInvoicesQuery({
    limit: 10,
    page: 1,
  });

  if (invoiceLoading) return <div>Loading...</div>;
  if (invoiceError) return <div>Someting went to wrong!</div>;

  console.log(invoiceData);
  return (
    <>
      <div className="recentCard overflow-x-auto ">
        <div className="flex items-center justify-between">
          <h3 className="m-3 text-xl block font-semibold">Recent Invoice </h3>
          <Link to="/dashboard/invoice-view">
            <button className=" flex items-center mr-2  rounded-full px-3 py-1 bg-[#DDDDDD]">
              <small className="">See More</small>
              <HiOutlineArrowNarrowRight size={15} className="ml-1" />
            </button>
          </Link>
        </div>

        <hr />
        <table className="min-w-full">
          <thead>
            <th>Invoice ID</th>
            <th>Invoice No </th>
            <th> Date</th>
            <th>Total Amount </th>
            <th>Net Total</th>
            <th>Status</th>
          </thead>
          <tbody>
            {invoiceData?.data?.invoices.map((invoice, i) => (
              <tr key={i}>
                <td>{invoice.Id}</td>
                <td>{invoice.invoice_no}</td>
                <td>{invoice.date}</td>
                <td>${invoice.total_amount}</td>
                <td>${invoice.net_total}</td>
                <td>
                  <button className="px-3 py-1 border rounded-full bg-[#E2F6ED] text-[#60BE6B]">
                    Paid
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RecentInvoice;
