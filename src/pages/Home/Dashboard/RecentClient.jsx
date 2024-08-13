import { HiOutlineArrowNarrowRight, HiOutlineEye } from "react-icons/hi";
import { Link } from "react-router-dom";
import client from "../../../../public/assets/avatar.jpg";
import { useGetAllCustomersQuery } from "../../../redux/api/customerApi";
const RecentClient = () => {
  const {
    data: customerData,
    error,
    isLoading,
  } = useGetAllCustomersQuery({
    limit: 10,
    page: 1,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="recentCard overflow-x-auto">
        <div className="flex items-center justify-between">
          <h3 className="m-3 text-xl block font-semibold">Client</h3>
          <Link to="/dashboard/customer-list">
            <button className=" flex items-center mr-2  rounded-full px-3 py-1 bg-[#DDDDDD]  ">
              <small className="">See More</small>
              <HiOutlineArrowNarrowRight size={15} className="ml-1" />
            </button>
          </Link>
        </div>
        <hr />
        <table className="min-w-full">
          <thead>
            <th>Customer Id </th>
            <th>Customer Name</th>
            <th>Phone </th>
           
            <th>Status</th>
            <th>Action</th>
          </thead>
          <tbody>
            {customerData?.data?.customers.map((customer, i) => (
              <tr key={i}>
                <td>{customer.customerId}</td>
                <td>
                  <div className="flex items-center">
                    <img
                      src={client}
                      className="rounded-full w-16"
                      alt="client"
                    />
                    <div className="ml-2 text-justify">
                      <h4 className="block">{customer.company_name}</h4>
                      <small>CEO</small>
                    </div>
                  </div>
                </td>
               
                <td>{customer.customer_contact}</td>
               
                <td>
                  <button className="px-3 py-1 border rounded-full ">
                    Active
                  </button>
                </td>
                <td>
                  <div>
                    <HiOutlineEye size={20} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RecentClient;
