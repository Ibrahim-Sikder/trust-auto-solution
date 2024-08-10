/* eslint-disable no-unused-vars */
import { FaTrashAlt, FaEdit, FaUserTie, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import { NotificationAdd } from "@mui/icons-material";
import { FaUserGear } from "react-icons/fa6";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useRef, useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import { toast } from "react-toastify";
import HeaderButton from "../../../components/CommonButton/HeaderButton";
import { useDeleteSupplierMutation, useGetAllSuppliersQuery } from "../../../redux/api/supplier";
import Loading from "../../../components/Loading/Loading";
import { Pagination } from "@mui/material";
 
const SupplierList = () => {
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

 
 
  const [filterType, setFilterType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const textInputRef = useRef(null);

  const [deleteSupplier, { isLoading: supplierLoading }] =
  useDeleteSupplierMutation();

 
  const { data: suppliers, isLoading: suppliersLoading } =
  useGetAllSuppliersQuery({
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
        await deleteSupplier(id).unwrap();
        swal("Deleted!", "Card delete successful.", "success");
      } catch (error) {
        swal("Error", "An error occurred while deleting the card.", "error");
      }
    }
  };
  

  

   
  

  

  const handleAllSuppliers = () => {
    setFilterType("");
    if (textInputRef.current) {
      textInputRef.current.value = "";
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
      <div className="md:flex items-center justify-between my-3 mb-8">
        <div className="flex items-center justify-center ">
          <FaUsers size={70} className="invoicIcon" />
          <div className="ml-2">
            <h3 className="text-2xl font-bold"> Supplier </h3>
            <span>Manage Supplier </span>
          </div>
        </div>
        <div className="productHome">
          <span>Home / </span>
          <span>Supplier / </span>
          <span> Supplier List </span>
        </div>
      </div>
      <div className="mt-20 overflow-x-auto">
        <div className="md:flex items-center justify-between mb-5">
          <h3 className="mb-3 text-xl md:text-3xl font-bold">
            Suppliers List:
          </h3>
          <div className="flex items-center searcList">
            <button
              onClick={handleAllSuppliers}
              className="bg-[#42A1DA] text-white px-4 py-2 rounded-md mr-1"
            >
              All
            </button>
            <div className="searchGroup">
              <input
                onChange={(e) => setFilterType(e.target.value)}
                autoComplete="off"
                type="text"
                ref={textInputRef}
              />
            </div>
            <button className="SearchBtn ">Search </button>
          </div>
        </div>
        {suppliersLoading ? (
          <div className="flex items-center justify-center text-xl">
            <Loading />
          </div>
        ) : (
          <div>
            {suppliers?.data?.suppliers?.length === 0 ? (
              <div className="flex items-center justify-center h-full text-xl text-center">
                No matching card found.
              </div>
            ) : (
              <section>
                <table className="table">
                  <thead className="tableWrap">
                    <tr>
                      <th>SL</th>
                      <th>Supplier Id </th>
                      <th>Supplier Name </th>
                      <th>Phone Number </th>
                      <th>Email</th>
                      <th colSpan={3}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {suppliers?.data?.suppliers?.map((card, index) => (
                      <tr key={card._id}>
                        <td>{index + 1}</td>
                        <td>{card?.supplierId}</td>
                        <td>{card?.full_name}</td>
                        <td>{card?.full_Phone_number}</td>
                        <td>{card?.email}</td>

                        <td>
                          <div className="editIconWrap edit">
                            <Link
                              to={`/dashboard/update-Supplier?id=${card._id}`}
                            >
                              <FaEdit className="editIcon" />
                            </Link>
                          </div>
                        </td>
                        <td>
                          <button 
                          disabled={supplierLoading}
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
              </section>
            )}
          </div>
        )}
        {suppliers?.data?.suppliers?.length > 0 && (
          <div className="flex justify-center mt-4">
            <Pagination
              count={suppliers?.data?.meta?.totalPages}
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

export default SupplierList;
