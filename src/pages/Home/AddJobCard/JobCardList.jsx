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
import {
  useDeleteJobCardMutation,
  useGetAllJobCardsQuery,
} from "../../../redux/api/jobCard";
import { Pagination } from "@mui/material";
import { HiOutlineSearch } from "react-icons/hi";

const JobCardList = () => {
  const [filterType, setFilterType] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const textInputRef = useRef(null);
  const navigate = useNavigate();

  const limit = 10;
  const { data: allJobCards, isLoading: jobCardLoading } =
    useGetAllJobCardsQuery({
      limit,
      page: currentPage,
      searchTerm: filterType,
    });

  const [deleteJobCard, { isLoading: deleteLoading }] =
    useDeleteJobCardMutation();

  const handleIconPreview = async (e) => {
    navigate(`/dashboard/preview?id=${e}`);
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
        await deleteJobCard(id).unwrap();
        swal("Deleted!", "Card delete successful.", "success");
      } catch (error) {
        swal("Error", "An error occurred while deleting the card.", "error");
      }
    }
  };

  const handleAllAddToJobCard = () => {
    setFilterType("");
    if (textInputRef.current) {
      textInputRef.current.value = "";
    }
  };


  console.log(allJobCards)
  return (
    <div>
      <div className="mt-5 overflow-x-auto">
        <div className="flex justify-between pb-3 border-b-2">
          <div className="flex items-center mr-[80px]  justify-center topProductBtn">
            <Link to="/dashboard/addjob">
              <button> Add Job </button>
            </Link>
            <Link to="/dashboard/qutation">
              <button>Quotation </button>
            </Link>
            <Link to="/dashboard/invoice">
              <button>Invoice </button>
            </Link>
          </div>
          <div className="flex items-end justify-end">
            <NotificationAdd size={30} className="mr-2" />
            <FaUserGear size={30} />
          </div>
        </div>
        <div className="flex items-center justify-between my-3 mb-8">
          <div className="flex flex-wrap items-center justify-center ">
            <FaFileInvoice className="invoicIcon" />
            <div className="ml-2">
              <h3 className="text-sm font-bold md:text-2xl"> Job Card </h3>
              <span className="text-sm">Manage Job Card </span>
            </div>
          </div>
          <div className="productHome">
            <span>Home / </span>
            <span>Job Card List </span>
          </div>
        </div>

        <div className="w-full mt-5 mb-24">
          <div className="flex flex-wrap items-center justify-between mb-5">
            <h3 className="txt-center tet-sm ml- sm:ml-0 ont-bold md:text-3xl">
              {" "}
              Customer List:{" "}
            </h3>
            <div className="flex flex-wrap items-center">
              <button
                onClick={handleAllAddToJobCard}
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
          {jobCardLoading ? (
            <div className="flex items-center justify-center text-xl">
              <Loading />
            </div>
          ) : (
            <div>
              {allJobCards?.data?.jobCards?.length === 0 ? (
                <div className="flex items-center justify-center h-full text-xl text-center">
                  No matching card found.
                </div>
              ) : (
                <section>
                  <table className="table">
                    <thead className="tableWrap">
                      <tr>
                        <th>Order Number </th>

                        <th>User Id</th>
                        <th>User type</th>
                        <th>Mobile Number</th>
                        <th>Date</th>
                        <th colSpan={3}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allJobCards?.data?.jobCards?.map((card) => {
                        return (
                          <tr key={card?._id}>
                            <td>{card?.job_no}</td>

                            <td>{card?.Id}</td>

                            <td>{card?.user_type}</td>

                            <td>{card?.customer[0]?.fullCustomerNum}</td>
                            <td>{card?.date}</td>
                            <td>
                              <div
                                onClick={() => handleIconPreview(card._id)}
                                className="flex items-center justify-center cursor-pointer"
                              >
                                <FaEye className="h-[22px] w-[22px]" />
                              </div>
                            </td>

                            <td>
                              <div className="editIconWrap edit">
                                <Link
                                  to={`/dashboard/update-jobcard?id=${card._id}`}
                                >
                                  <FaEdit className="editIcon" />
                                </Link>
                              </div>
                            </td>
                            <td>
                              <button
                                disabled={deleteLoading}
                                onClick={() => deletePackage(card?._id)}
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
          {allJobCards?.data?.jobCards?.length > 0 && (
            <div className="flex justify-center mt-4">
              <Pagination
                count={allJobCards?.data?.meta?.totalPages}
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

export default JobCardList;
