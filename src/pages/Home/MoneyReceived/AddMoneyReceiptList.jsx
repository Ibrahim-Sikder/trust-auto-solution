/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Pagination } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import {
  FaTrashAlt,
  FaEdit,
  FaArrowRight,
  FaArrowLeft,
  FaEye,
  FaFileInvoice,
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useDeleteMoneyReceiptMutation } from "../../../redux/api/money-receipt";
import { toast } from "react-toastify";
const AddMoneyReceiptList = ({
  moneyReceipts,
  setFilterType,
  setCurrentPage,
  currentPage,
}) => {
  const navigate = useNavigate();
  const textInputRef = useRef(null);

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
        await deleteMoneyReceipt(id);
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

  if (deleteError) {
    toast.error(deleteError?.message);
  }

  return (
    <div className="mt-5 overflow-x-auto">
      <div className="flex-wrap flex items-center justify-between mb-5 bg-[#F1F3F6] py-5 px-3">
        <h3 className="mb-3 text-xl font-bold md:text-3xl">
          Money Receipt List:
        </h3>
        <div className="flex items-center searcList">
          <div className="searchGroup">
            <button onClick={handleAllMoneyReceipt} className="SearchBtn mr-2">
              All{" "}
            </button>
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
          {moneyReceipts?.moneyReceipts?.map((card, index) => (
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
                  <Link to={`/dashboard/money-receipt-update?id=${card._id}`}>
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
      {moneyReceipts?.moneyReceipts?.length > 0 && (
        <div className="flex justify-center mt-4">
          <Pagination
            count={moneyReceipts?.data?.meta?.totalPages}
            page={currentPage}
            color="primary"
            onChange={(_, page) => setCurrentPage(page)}
          />
        </div>
      )}
    </div>
  );
};

export default AddMoneyReceiptList;
