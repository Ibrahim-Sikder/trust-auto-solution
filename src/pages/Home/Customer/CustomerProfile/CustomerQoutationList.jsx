/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useRef, useState } from "react";
import { FaTrashAlt, FaEdit, FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Loading from "../../../../components/Loading/Loading";
import {
  useDeleteQuotationMutation,
  useGetAllQuotationsQuery,
} from "../../../../redux/api/quotation";
import { Pagination } from "@mui/material";
import { toast } from "react-toastify";
const CustomerQoutationList = ({ id }) => {
  const [filterType, setFilterType] = useState("");

  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const textInputRef = useRef(null);

  const handleIconPreview = async (e) => {
    navigate(`/dashboard/quotation-view?id=${e}`);
  };

  const { data: allQuotations, isLoading: quotationLoading } =
    useGetAllQuotationsQuery({
      id,
      limit,
      page: currentPage,
      searchTerm: filterType,
    });
  const [deleteQuotation, { idLoading: deleteLoading, error: deleteError }] =
    useDeleteQuotationMutation();

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
    if (textInputRef.current) {
      textInputRef.current.value = "";
    }
  };

  if (deleteError) {
    toast.error(deleteError?.message);
  }

  return (
    <div className=" mb-24 mt-10 w-full">
      {allQuotations?.data?.quotations?.length > 0 && (
        <div className="flex items-center justify-between mb-5 bg-[#F1F3F6] py-5 px-3">
          <Link to="/dashboard/qutation">
            <button className="bg-[#42A1DA] text-white px-2 py-3 rounded-sm ">
              Add Quotation
            </button>
          </Link>
          <div className="flex items-center searcList">
            <div
              onClick={handleAllQuotation}
              className="mx-6 font-semibold cursor-pointer bg-[#42A1DA] px-2 py-1 rounded-md text-white"
            >
              All
            </div>
            <div className="searchGroup">
              <input
                onChange={(e) => setFilterType(e.target.value)}
                type="text"
                placeholder="Search"
                className="border py-2 px-3 rounded-md border-[#ddd]"
                ref={textInputRef}
              />
            </div>
            <button className="SearchBtn ">Search </button>
          </div>
        </div>
      )}

      <div className="w-full mt-5 mb-24">
        {quotationLoading ? (
          <div className="flex items-center justify-center text-xl">
            <Loading />
          </div>
        ) : (
          <div>
            {allQuotations?.data?.quotations?.length === 0 ? (
              <div className="flex items-center justify-center h-full text-xl text-center">
                No matching card found.
              </div>
            ) : (
              <section>
                <table className="table">
                  <thead className="tableWrap">
                    <tr>
                      <th>Order Number </th>
                      <th>Name</th>

                      <th>Car Number </th>
                      <th>Mobile Number</th>
                      <th>Date</th>
                      <th colSpan={3}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allQuotations?.data?.quotations?.map((card, index) => {
                      return (
                        <tr key={card._id}>
                          <td>{card.job_no}</td>

                          {card?.customer && (
                            <td>{card?.customer?.customer_name}</td>
                          )}
                          {card?.company && (
                            <td>{card?.company?.company_name}</td>
                          )}
                          {card?.showRoom && (
                            <td>{card?.showRoom?.showRoom_name}</td>
                          )}

                          <td>{card?.vehicle?.fullRegNum}</td>
                          {card?.customer && (
                            <td>{card?.customer?.fullCustomerNum}</td>
                          )}
                          {card?.company && (
                            <td>{card?.company?.fullCompanyNum}</td>
                          )}
                          {card?.showRoom && (
                            <td>{card?.showRoom?.fullCompanyNum}</td>
                          )}
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
  );
};

export default CustomerQoutationList;
