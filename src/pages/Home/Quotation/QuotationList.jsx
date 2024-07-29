/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaTrashAlt,
  FaEdit,
  FaArrowRight,
  FaArrowLeft,
  FaEye,
  FaFileInvoice,
} from "react-icons/fa";
import { FaUserGear } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Loading from "../../../components/Loading/Loading";
import { NotificationAdd } from "@mui/icons-material";
import { toast } from "react-toastify";
import { formatDate } from "../../../utils/formateDate";
import { Button, Pagination } from "@mui/material";
import HeaderButton from "../../../components/CommonButton/HeaderButton";
import {
  useDeleteQuotationMutation,
  useGetAllQuotationsQuery,
} from "../../../redux/api/quotation";
const QuotationList = () => {
  const [getAllQuotation, setGetAllQuotation] = useState([]);
  console.log(getAllQuotation);
  const [filterType, setFilterType] = useState("");
  const [noMatching, setNoMatching] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const limit = 10;

  const handleIconPreview = async (e) => {
    navigate(`/dashboard/quotation-view?id=${e}`);
  };

  const [deleteQuotation, { idLoading: deleteLoading, error: deleteError }] =
    useDeleteQuotationMutation();

  const { data: allQuotations, isLoading: quotationLoading } =
    useGetAllQuotationsQuery({
      limit,
      page: currentPage,
      searchTerm: filterType,
    });

  const deletePackage = async (id) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this card?",
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      try {
        await deleteQuotation(id).unwrap();

        swal("Deleted!", "Card delete successful.", "success");
      } catch (error) {
        swal("Error", "An error occurred while deleting the card.", "error");
      }
    }
  };

  const handleAllQuotation = () => {
    setFilterType("");
  };
  return (
    <div>
      <div className="overflow-x-auto mt-5">
        <div className="flex justify-between border-b-2 pb-3">
          <HeaderButton />
          <div className="flex  justify-end items-end">
            <NotificationAdd size={30} className="mr-2" />
            <FaUserGear size={30} />
          </div>
        </div>

        <div className="flex items-center justify-between my-3 mb-8">
          <div className="flex items-center justify-center ">
            <FaFileInvoice className="invoicIcon" />
            <div className="ml-2">
              <h3 className="text-2xl font-bold"> Quotation </h3>
              <span>Manage Quotation </span>
            </div>
          </div>
          <div className="productHome">
            <span>Dashboard / </span>
            <span>Quotation / </span>
            <span>Quotation List </span>
          </div>
        </div>

        <div className="w-full mt-5 mb-24">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-3xl font-bold text-center ">
              {" "}
              Quotation List:{" "}
            </h3>
            <div className="flex items-center">
              <button
                // onClick={handleAllShowRoom}
                className="mx-6 font-semibold cursor-pointer bg-[#42A1DA] px-2 py-1 rounded-md text-white"
              >
                All
              </button>
              <input
                onChange={(e) => setFilterType(e.target.value)}
                type="text"
                placeholder="Search"
                className="border py-2 px-3 rounded-md border-[#ddd]"
                // ref={textInputRef}
              />
              <button className="SearchBtn ">Search</button>
            </div>
          </div>
          {quotationLoading ? (
            <div className="flex items-center justify-center text-xl">
              <Loading />
            </div>
          ) : (
            <div>
              {allQuotations?.data?.showrooms?.length === 0 ? (
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
                      {allQuotations?.data?.quotations?.map((card, index) => {
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
                                  to={`/dashboard/update-quotation?id=${card._id}`}
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
          {allQuotations?.data?.quotations?.length > 0 && (
            <div className="flex justify-center mt-4">
              <Pagination
                count={allQuotations?.data?.meta?.totalPages}
                page={currentPage}
                color="primary"
                onChange={(_, page) => setCurrentPage(page)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuotationList;
