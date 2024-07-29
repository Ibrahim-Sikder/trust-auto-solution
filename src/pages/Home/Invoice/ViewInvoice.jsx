/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { FaTrashAlt, FaEdit, FaEye, FaFileInvoice } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Loading from "../../../components/Loading/Loading";
import { NotificationAdd } from "@mui/icons-material";
import { FaUserGear } from "react-icons/fa6";
import { toast } from "react-toastify";
import { formatDate } from "../../../utils/formateDate";
import HeaderButton from "../../../components/CommonButton/HeaderButton";
import {
  useDeleteInvoiceMutation,
  useGetAllInvoicesQuery,
} from "../../../redux/api/invoice";
import { Pagination } from "@mui/material";
import { Button } from "react-scroll";
const ViewInvoice = () => {
  const [select, setSelect] = useState(null);
  const [getAllInvoice, setGetAllInvoice] = useState([]);

  const [filterType, setFilterType] = useState("");
  const [noMatching, setNoMatching] = useState(null);
  const [loading, setLoading] = useState(false);

  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const handleIconPreview = async (e) => {
    navigate(`/dashboard/detail?id=${e}`);
  };

  const [deleteInvoice, { isLoading: deleteLoading, error: deleteError }] =
    useDeleteInvoiceMutation();

  const { data: allInvoices, isLoading: invoiceLoading } =
    useGetAllInvoicesQuery({
      limit,
      page: currentPage,
      searchTerm: filterType,
    });

  // pagination

  const deletePackage = async (id) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this card?",
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      try {
        await deleteInvoice(id).unwrap();
        swal("Deleted!", "Card delete successful.", "success");
      } catch (error) {
        swal("Error", "An error occurred while deleting the card.", "error");
      }
    }
  };

  //   <table className="table bg-[#fff]">
  //   <thead className="tableWrap">
  //     <tr>
  //       <th>SL No</th>
  //       <th>Customer Name</th>
  //       <th>Order Number </th>
  //       <th>Car Number </th>
  //       <th>Mobile Number</th>
  //       <th>Date</th>
  //       <th colSpan={3}>Action</th>
  //     </tr>
  //   </thead>
  //   <tbody>
  //     {getAllInvoice?.map((card, index) => (
  //       <tr key={card._id}>
  //         <td>{index + 1}</td>
  //         <td>{card.customer_name}</td>
  //         <td>{card.job_no}</td>
  //         <td>{card.car_registration_no}</td>
  //         <td> {card.customer_contact} </td>
  //         <td>{card.date}</td>
  //         <td>
  //           <div
  //             onClick={() => handleIconPreview(card._id)}
  //             className="editIconWrap edit2"
  //           >

  //             <FaEye className="editIcon" />

  //           </div>
  //         </td>
  //         <td>
  //           <div className="editIconWrap edit">
  //             <Link to={`/dashboard/update-invoice?id=${card._id}`}>
  //               <FaEdit className="editIcon" />
  //             </Link>
  //           </div>
  //         </td>
  //         <td>
  //           <div
  //             onClick={() => deletePackage(card._id)}
  //             className="editIconWrap"
  //           >
  //             <FaTrashAlt className="deleteIcon" />
  //           </div>
  //         </td>
  //       </tr>
  //     ))}
  //   </tbody>
  // </table>

  const handleAllInvoice = () => {
    setFilterType("");
  };
  return (
    <div className="mt-5 overflow-x-auto">
      <div className="flex justify-between pb-3 border-b-2">
        <HeaderButton />
        <div className="flex items-end justify-end">
          <NotificationAdd size={30} className="mr-2" />
          <FaUserGear size={30} />
        </div>
      </div>

      <div className="flex items-center justify-between mt-5 mb-8">
        <div className="flex items-center justify-center ">
          <FaFileInvoice className="invoicIcon" />
          <div className="ml-2">
            <h3 className="text-2xl font-bold"> Invoice </h3>
            <span>Manage Invoice </span>
          </div>
        </div>
        <div className="productHome">
          <span>Home / </span>
          <span>Invoice / </span>
          <span> Invoice List </span>
        </div>
      </div>
      <div className="mt-20 overflow-x-auto">
        <div className="flex items-center justify-between mb-5">
          <h3 className="mb-3 text-3xl font-bold">Invoice List:</h3>
          <div className="flex items-center searcList">
            <div className="searchGroup">
              <Button onClick={handleAllInvoice} className="SearchBtn mr-2">
                All{" "}
              </Button>
              <input
                onChange={(e) => setFilterType(e.target.value)}
                autoComplete="off"
                type="text"
                placeholder={select}
              />
            </div>
            <button className="SearchBtn ">Search </button>
          </div>
        </div>
        {invoiceLoading ? (
          <div className="flex items-center justify-center text-xl">
            <Loading />
          </div>
        ) : (
          <div>
            {allInvoices?.data?.invoices?.length === 0 ? (
              <div className="flex items-center justify-center h-full text-xl text-center">
                No matching card found.
              </div>
            ) : (
              <section>
                <table className="table">
                  <thead className="tableWrap">
                    <tr>
                      <th>SL No</th>
                      <th>Customer Name</th>
                      <th>Order Number </th> 
                      <th>Car Number </th>
                      <th>Mobile Number</th>
                      <th>Date</th> 
                      <th colSpan={3}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allInvoices?.data?.invoices?.map((card, index) => {
                      const lastVehicle = card?.vehicles
                        ? [...card.vehicles].sort(
                            (a, b) =>
                              new Date(b.createdAt) - new Date(a.createdAt)
                          )[0]
                        : null;

                      return (
                        <tr key={card._id}>
                          <td>{index + 1}</td>
                          <td>{card.customer_name}</td>
                          <td>{card.job_no}</td>
                          <td>{card.car_registration_no}</td>
                          <td> {card.customer_contact} </td>
                          <td>{card.date}</td>
                          <td>
                            <div
                              onClick={() => handleIconPreview(card._id)}
                              className="editIconWrap edit2"
                            >
                              <FaEye className="editIcon" />
                            </div>
                          </td>
                          <td>
                            <div className="editIconWrap edit">
                              <Link
                                to={`/dashboard/update-invoice?id=${card._id}`}
                              >
                                <FaEdit className="editIcon" />
                              </Link>
                            </div>
                          </td>
                          <td>
                            <button
                              disabled={deleteLoading}
                              onClick={() => deletePackage(card._id)}
                              className="editIconWrap"
                            >
                              <FaTrashAlt className="deleteIcon" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </section>
            )}
          </div>
        )}
        {allInvoices?.data?.invoices?.length > 0 && (
          <div className="flex justify-center mt-4">
            <Pagination
              count={allInvoices?.data?.meta?.totalPages}
              page={currentPage}
              color="primary"
              onChange={(_, page) => setCurrentPage(page)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewInvoice;
