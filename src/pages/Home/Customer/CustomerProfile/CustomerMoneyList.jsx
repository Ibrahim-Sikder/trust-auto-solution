/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Pagination } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FaTrashAlt, FaEdit, FaEye } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import swal from "sweetalert";
import Loading from "../../../../components/Loading/Loading";
import {
  useDeleteMoneyReceiptMutation,
  useGetAllMoneyReceiptsQuery,
} from "../../../../redux/api/money-receipt";
const CustomerMoneyList = ({ id }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState("");

  const navigate = useNavigate();
  const textInputRef = useRef(null);
  const limit = 10;

  const { data: allMoneyReceipts, isLoading: moneyReceiptLoading } =
    useGetAllMoneyReceiptsQuery({
      id,
      limit,
      page: currentPage,
      searchTerm: filterType,
    });

  const [deleteMoneyReceipt, { isLoading: deleteLoading, error: deleteError }] =
    useDeleteMoneyReceiptMutation();

  const handleIconPreview = async (e) => {
    navigate(`/dashboard/money-receipt-view?id=${e}`);
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
        await deleteMoneyReceipt(id).unwrap();
        swal("Deleted!", "Card delete successful.", "success");
      } catch (error) {
        swal("Error", "An error occurred while deleting the card.", "error");
      }
    }
  };

  const handleAllMoneyReceipt = () => {
    setFilterType("");
    if (textInputRef.current) {
      textInputRef.current.value = "";
    }
  };

  if (moneyReceiptLoading) {
    return <Loading />;
  }

  if (deleteError) {
    toast.error(deleteError?.message);
  }
  return (
    <div className=" mb-24 mt-10 w-full">
      {allMoneyReceipts?.data?.moneyReceipts?.length > 0 && (
        <div className="flex items-center justify-between mb-5 bg-[#F1F3F6] py-5 px-3">
          <Link to="/dashboard/money-receive">
            <button className="bg-[#42A1DA] text-white px-2 py-3 rounded-sm ">
              Add Money
            </button>
          </Link>
          <div className="flex items-center searcList">
            <div
              onClick={handleAllMoneyReceipt}
              className="mx-6 font-semibold cursor-pointer flex justify-center items-center SearchBtn"
            >
              All
            </div>

            <div className="searchGroup">
              <input
                onChange={(e) => setFilterType(e.target.value)}
                autoComplete="off"
                type="text"
                ref={textInputRef}
                placeholder="Write here..."
              />
            </div>
            <button className="SearchBtn ">Search </button>
          </div>
        </div>
      )}
      {allMoneyReceipts?.data?.moneyReceipts?.length === 0 ? (
        <div className="flex items-center justify-center h-full text-xl text-center">
          No money receipt exist
        </div>
      ) : (
        <div>
          <table className="table">
            <thead className="tableWrap">
              <tr>
                <th>SL No</th>
                <th>Received with thanks from</th>
                <th>Final Payment against bill no</th>
                <th>Total Amount </th>

                <th>Payable amount</th>
                <th>Date</th>
                <th colSpan={3}>Action</th>
              </tr>
            </thead>
            <tbody>
              {allMoneyReceipts?.data?.moneyReceipts?.map((card, index) => (
                <tr key={card._id}>
                  <td>{index + 1}</td>
                  <td>{card.thanks_from}</td>
                  <td>{card.job_no}</td>
                  <td>{card.total_amount}</td>

                  <td> {card.remaining} </td>
                  <td>{card.date_one}</td>
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
                        to={`/dashboard/money-receipt-update?id=${card._id}`}
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
              ))}
            </tbody>
          </table>
          {allMoneyReceipts?.data?.moneyReceipts?.length > 0 && (
            <div className="flex justify-center mt-4">
              <Pagination
                count={allMoneyReceipts?.data?.meta?.totalPages}
                page={currentPage}
                color="primary"
                onChange={(_, page) => setCurrentPage(page)}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomerMoneyList;
