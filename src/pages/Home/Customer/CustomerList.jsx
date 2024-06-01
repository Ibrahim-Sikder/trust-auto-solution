/* eslint-disable no-unused-vars */
import { FaTrashAlt, FaEdit, FaUserTie } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { NotificationAdd } from "@mui/icons-material";
import { FaUserGear } from "react-icons/fa6";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import Loading from "../../../components/Loading/Loading";
import { HiOutlineSearch } from "react-icons/hi";
import HeaderButton from "../../../components/CommonButton/HeaderButton";
import { Pagination } from "@mui/material";


const CustomerList = () => {
  const [filterType, setFilterType] = useState("");
  
  const [customerData, setCustomerData] = useState([]);
  const [customerPage, setCustomerPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
 

  const [noMatching, setNoMatching] = useState(null);

  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);


  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/v1/customer?page=${currentPage}`)
      .then((res) => res.json())
      .then((data) => {
        setCustomerData(data?.allCustomer);
        setCustomerPage(data?.totalPages);
        if (data?.allCustomer?.length === 0) {
          setCurrentPage((pre) => pre - 1);
        }

        setLoading(false);
      });
  }, [currentPage, reload]);

  const handleIconPreview = async (e) => {
    navigate(`/dashboard/customer-profile?id=${e}`);
  };

  const deletePackage = async (id) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this card?",
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/customer/one/${id}`,
          {
            method: "DELETE",
          }
        );
        const data = await res.json();

        if (data.message == "Customer card delete successful") {
          setCustomerData(customerData?.filter((pkg) => pkg._id !== id));
          setReload(!reload);
        }
        swal("Deleted!", "Card delete successful.", "success");
      } catch (error) {
        swal("Error", "An error occurred while deleting the card.", "error");
      }
    }
  };

  const handleFilterType = async () => {
    try {
      const data = {
        filterType,
      };
      setSearchLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/customer/all`,
        data
      );

      if (response.data.message === "Filter successful") {
        setCustomerData(response.data.result);
        setNoMatching(null);
        setSearchLoading(false);
      }
      if (response.data.message === "No matching found") {
        setNoMatching(response.data.message);
        setSearchLoading(false);
      }
    } catch (error) {
      setSearchLoading(false);
    }
  };

  const handleAllCustomer = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/v1/customer?page=${currentPage}`)
      .then((res) => res.json())
      .then((data) => {
        setCustomerData(data.allCustomer);
        setCustomerPage(data?.totalPages);
        setNoMatching(null);
      });
  };

 
 

  return (
    <div className="w-full mt-5 mb-24">
      <div className="flex justify-between pb-3 border-b-2">
        <HeaderButton />
        <div className="flex items-end justify-end">
          <NotificationAdd size={30} className="mr-2" />
          <FaUserGear size={30} />
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between my-3 mb-8">
        <div className="flex items-center justify-center ">
          <FaUserTie className="invoicIcon" />
          <div className="ml-2">
            <h3 className="text-2xl font-bold"> Customer </h3>
            <span>Manage Customer </span>
          </div>
        </div>
        <div className="mt-2 productHome md:mt-0 ">
          <span>Dashboard / </span>
          <span> Customer List</span>
        </div>
      </div>
      <div className="flex-wrap flex items-center justify-between mb-5 bg-[#F1F3F6] py-5 px-3">
        <h3 className="mb-3 text-3xl font-bold"> Customer List:</h3>
        <div className="flex items-center">
          <button
            onClick={handleAllCustomer}
            className="bg-[#42A1DA] text-white px-4 py-2 rounded-md mr-1"
          >
            All
          </button>
          <input
            onChange={(e) => setFilterType(e.target.value)}
            type="text"
            placeholder="Search"
            className="border py-2 px-3 rounded-md border-[#ddd]"
          />
          <button
            onClick={handleFilterType}
            className="bg-[#42A1DA] text-white px-2 py-2 rounded-md ml-1"
            disabled={filterType === ""}
          >
            {" "}
            <HiOutlineSearch size={25} />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto ">
        {searchLoading ? (
          <div className="flex items-center justify-center text-xl">
            <Loading />
          </div>
        ) : (
          <div>
            {customerData?.length === 0 || noMatching ? (
              <div className="flex items-center justify-center h-full text-xl text-center">
                No matching card found.
              </div>
            ) : (
              <>
                <section>
                  <table className="table">
                    <thead className="tableWrap">
                      <tr>
                        <th>Customer ID </th>
                        <th>Customer Name</th>
                        <th>Car Number </th>
                        <th>Mobile Number</th>
                        <th>Vehicle Name </th>
                        <th colSpan={3}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customerData?.map((card) => (
                        <tr key={card?._id}>
                          <td>{card?.customerId}</td>
                          <td>{card?.customer_name}</td>
                          <td>{card?.fullRegNum}</td>
                          <td>
                            {card?.fullCustomerNum}
                          </td>
                          <td> {card?.vehicle_name} </td>
                          <td>
                            <div
                              onClick={() => handleIconPreview(card?.customerId)}
                              className="flex items-center justify-center cursor-pointer"
                            >
                              {/* <Link to="/dashboard/employee-profile"> */}
                              <FaUserTie size={25} className="" />
                              {/* </Link> */}
                            </div>
                          </td>

                          <td>
                            <div className="editIconWrap edit">
                              <Link
                                to={`/dashboard/update-customer?id=${card?._id}`}
                              >
                                <FaEdit className="editIcon" />
                              </Link>
                            </div>
                          </td>
                          <td>
                            <div
                              onClick={() => deletePackage(card?._id)}
                              className="editIconWrap"
                            >
                              <FaTrashAlt className="deleteIcon" />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              </>
            )}
          </div>
        )}
      </div>
  
      {customerData?.length > 0 && (
          <div className="flex justify-center mt-4">
            <Pagination
              count={customerPage}
              page={currentPage} // Add this line to indicate the current page
              color="primary"
              onChange={(_, page) => setCurrentPage(page)}
            />
          </div>
        )}
    
    </div>
  );
};

export default CustomerList;
