/* eslint-disable no-unused-vars */
import { FaTrashAlt, FaEdit, FaUserTie } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { NotificationAdd } from "@mui/icons-material";
import { FaUserGear } from "react-icons/fa6";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import Loading from "../../../components/Loading/Loading";
import { HiOutlineSearch } from "react-icons/hi";
import HeaderButton from "../../../components/CommonButton/HeaderButton";
import { Pagination } from "@mui/material";
import { toast } from "react-toastify";
const ShowRoomList = () => {
  const [filterType, setFilterType] = useState("");
  const [showRoomData, setShowRoomData] = useState([]);
  const [showRoomPage, setShowRoomPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [noMatching, setNoMatching] = useState(null);

  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    try {
      fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/showRoom?page=${currentPage}`
      )
        .then((res) => res.json())
        .then((data) => {
          setShowRoomData(data);
          setShowRoomData(data?.allShowRoom);
          setShowRoomPage(data?.totalPages);
          if (data?.allShowRoom?.length === 0) {
            setCurrentPage((pre) => pre - 1);
          }

          setLoading(false);
        });
    } catch (error) {
      toast.error(error?.message || "Something went wrong!");
      setLoading(false);
    }
  }, [currentPage, reload]);

  const handleIconPreview = async (e) => {
    navigate(`/dashboard/show-room-profile?id=${e}`);
  };
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
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/showRoom/one/${id}`,
          {
            method: "DELETE",
          }
        );
        const data = await res.json();

        if (data.message == "Show room card delete successful") {
          setShowRoomData(showRoomData?.filter((pkg) => pkg._id !== id));
          setReload(!reload)
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
        `${import.meta.env.VITE_API_URL}/api/v1/showRoom/all`,
        data
      );

      if (response.data.message === "Filter successful") {
        setShowRoomData(response.data.result);
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

  const handleAllShowRoom = () => {
    setLoading(true);
    try {
      fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/showRoom?page=${currentPage}`
      )
        .then((res) => res.json())
        .then((data) => {
          setShowRoomData(data);
          setShowRoomData(data?.allShowRoom);
          setShowRoomPage(data?.totalPages);
          setNoMatching(null);

          setLoading(false);
        });
    } catch (error) {
      toast.error(error?.message || "Something went wrong!");
      setLoading(false);
    }
  };

  return (
    <div className="w-full mt-5 mb-24">
      <div className="flex justify-between pb-3 border-b-2 px-2">
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
            <h3 className="text-2xl font-bold"> Dashboard </h3>
            <span>Show Room List </span>
          </div>
        </div>
        <div className="productHome">
          <span>Dashboard / </span>
          <span>Show Room / </span>
          <span>Show Room List </span>
        </div>
      </div>
      <div className="flex-wrap flex items-center justify-between mb-5 bg-[#F1F3F6] py-5 px-3 ">
        <h3 className="mb-3 text-3xl font-bold"> Show Room List:</h3>
        <div className="flex items-center">
          <button
            onClick={handleAllShowRoom}
            className="mx-6 font-semibold cursor-pointer bg-[#42A1DA] px-2 py-1 rounded-md text-white"
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
          >
            {" "}
            <HiOutlineSearch size={25} />
          </button>
        </div>
      </div>

      {searchLoading ? (
        <div className="flex items-center justify-center text-xl">
          <Loading />
        </div>
      ) : (
        <div>
          {showRoomData?.length === 0 || noMatching ? (
            <div className="flex items-center justify-center h-full text-xl text-center">
              No matching card found.
            </div>
          ) : (
            <section>
              <table className="table">
                <thead className="tableWrap">
                  <tr>
                    <th>SL No</th>
                    <th>Show room Name</th>

                    <th>Car Number </th>
                    <th>Mobile Number</th>

                    <th colSpan={3}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {showRoomData?.map((card) => (
                    <tr key={card._id}>
                      <td>{card?.showRoomId}</td>
                      <td>{card?.showRoom_name}</td>

                      <td>{card?.fullRegNum}</td>
                      <td> {card?.fullCompanyNum} </td>

                      <td>
                        <div
                          onClick={() => handleIconPreview(card.showRoomId)}
                          className="flex items-center justify-center cursor-pointer"
                        >
                          <FaUserTie size={25} className="" />
                        </div>
                      </td>

                      <td>
                        <div className="editIconWrap edit">
                          <Link
                            to={`/dashboard/update-show-room?id=${card._id}`}
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
      {showRoomData?.length > 0 && (
        <div className="flex justify-center mt-4">
          <Pagination
            count={showRoomPage}
            page={currentPage}
            color="primary"
            onChange={(_, page) => setCurrentPage(page)}
          />
        </div>
      )}
    </div>
  );
};

export default ShowRoomList;
