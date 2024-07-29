/* eslint-disable no-unused-vars */
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
import Loading from "../../../components/Loading/Loading";
import { NotificationAdd } from "@mui/icons-material";
import { FaUserGear } from "react-icons/fa6";
import { toast } from "react-toastify";
import HeaderButton from "../../../components/CommonButton/HeaderButton";
import { useGetAllExpensesQuery } from "../../../redux/api/expense";
import { HiOutlineSearch } from "react-icons/hi";
import { Pagination } from "@mui/material";
const ViewInvoice = () => {
  const [filterType, setFilterType] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const textInputRef = useRef(null);
  const limit = 10;

  const {
    data: allExpenses,
    isLoading: expenseLoading,
    error: expenseError,
  } = useGetAllExpensesQuery({
    limit,
    page: currentPage,
    searchTerm: filterType,
  });

  const handleIconPreview = async (e) => {
    navigate(`/dashboard/detail?id=${e}`);
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
          `${import.meta.env.VITE_API_URL}/api/v1/expense/one/${id}`,
          {
            method: "DELETE",
          }
        );
        const data = await res.json();

        if (data.message == "Expense delete successful") {
          // setGetAllExpense(getAllExpense?.filter((pkg) => pkg._id !== id));
        }
        swal("Deleted!", "Card delete successful.", "success");
      } catch (error) {
        swal("Error", "An error occurred while deleting the card.", "error");
      }
    }
  };

 

  const handleAllExpense = () => {
    setFilterType("");
    if (textInputRef.current) {
      textInputRef.current.value = "";
    }
  };
  return (
    <div className="mt-5 overflow-x-auto">
      <div className="flex justify-between pb-3 border-b-2 px-2">
        <HeaderButton />
        <div className="flex items-end justify-end">
          <NotificationAdd size={30} className="mr-2" />
          <FaUserGear size={30} />
        </div>
      </div>
      <div className=" md:flex items-center justify-between mt-5 mb-8">
        <div className=" items-center justify-center ">
          <FaFileInvoice className="invoicIcon" />
          <div className="ml-2">
            <h3 className="text-2xl font-bold"> Expense </h3>
            <span>Manage Expense </span>
          </div>
        </div>
        <div className="productHome md:mt-0 mt-3">
          <span>Dashboard / </span>
          <span>Expense / </span>
          <span>New Expense </span>
        </div>
      </div>
      <div className="w-full mt-5 mb-24">
        <div className="flex flex-wrap items-center justify-between mb-5">
          <h3 className="txt-center tet-sm ml- sm:ml-0 ont-bold md:text-3xl">
            {" "}
            Expense List:{" "}
          </h3>
          <div className="flex flex-wrap items-center">
            <button
              onClick={handleAllExpense}
              className="bg-[#42A1DA] text-white px-4 py-2 rounded-md mr-1"
            >
              All
            </button>
            <input
              onChange={(e) => setFilterType(e.target.value)}
              type="text"
              placeholder="Search"
              className="border py-2 px-3 rounded-md border-[#ddd]"
              ref={textInputRef}
            />
            <button
              className="bg-[#42A1DA] text-white px-2 py-2 rounded-md ml-1"
              disabled={filterType === ""}
            >
              {" "}
              <HiOutlineSearch size={25} />
            </button>
          </div>
        </div>
        {expenseLoading ? (
          <div className="flex items-center justify-center text-xl">
            <Loading />
          </div>
        ) : (
          <div>
            {allExpenses?.data?.expenses?.length === 0 ? (
              <div className="flex items-center justify-center h-full text-xl text-center">
                No matching card found.
              </div>
            ) : (
              <section>
                <table className="table">
                  <thead className="tableWrap">
                    <tr>
                      <th>SL</th>
                      <th>Expense Category </th>
                      <th>Sub Category </th>
                      <th>Expense For </th>
                      <th>Total Amount </th>
                      <th>Payment Method </th>
                      <th colSpan={3}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allExpenses?.data?.expenses?.map((card, index) => (
                      <tr key={card._id}>
                        <td>{index + 1}</td>
                        <td>{card?.category}</td>
                        <td>{card?.sub_category}</td>
                        <td>{card?.expense_for}</td>
                        <td>{card?.amount}</td>
                        <td>{card?.payment_method}</td>
                        <td>
                          <div className="flex items-center justify-center ">
                            {/* <Link to="/dashboard/employee-profile"> */}
                            <FaEye size={25} className="" />
                            {/* </Link> */}
                          </div>
                        </td>

                        <td>
                          <div className="editIconWrap edit">
                            <Link
                              to={`/dashboard/update-expense?id=${card._id}`}
                            >
                              <FaEdit className="editIcon" />
                            </Link>
                          </div>
                        </td>

                        <td>
                          <div
                            onClick={() => deletePackage(card._id)}
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
            )}
          </div>
        )}
        {allExpenses?.data?.expenses?.length > 0 && (
          <div className="flex justify-center mt-4">
            <Pagination
              count={allExpenses?.data?.meta?.totalPages}
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
