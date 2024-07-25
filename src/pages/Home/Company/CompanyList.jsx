/* eslint-disable no-unused-vars */
import { FaTrashAlt, FaEdit, FaUserTie } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { NotificationAdd } from "@mui/icons-material";
import { FaUserGear } from "react-icons/fa6";
import { HiOutlineSearch, HiOutlineUserGroup } from "react-icons/hi";
import { useRef, useState } from "react";
import swal from "sweetalert";
import Loading from "../../../components/Loading/Loading";
import HeaderButton from "../../../components/CommonButton/HeaderButton";
import { Pagination } from "@mui/material";
import { toast } from "react-toastify";
import {
  useDeleteCompanyMutation,
  useGetAllCompaniesQuery,
} from "../../../redux/api/companyApi";


const CompanyList = () => {
  const textInputRef = useRef(null);
  const [filterType, setFilterType] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const handleIconPreview = async (e) => {
    navigate(`/dashboard/company-profile?id=${e}`);
  };

  const limit = 10;

  const {
    data: companyData,
    isLoading: companyLoading,
    refetch,
  } = useGetAllCompaniesQuery({
    limit,
    page: currentPage,
    searchTerm: filterType,
  });

  const [
    deleteCompany,
    { isLoading: companyDeleteLoading, error: deleteError },
  ] = useDeleteCompanyMutation();

  const deletePackage = async (id) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this card?",
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      try {
        await deleteCompany(id).unwrap();
        refetch();
        swal("Deleted!", "Card delete successful.", "success");
      } catch (error) {
        swal("Error", "An error occurred while deleting the card.", "error");
      }
    }
  };

  const handleAllCompany = () => {
    setFilterType("");
    if (textInputRef.current) {
      textInputRef.current.value = "";
    }
  };

  if (companyLoading) {
    return (
      <div className="flex items-center justify-center text-xl">
        <Loading />
      </div>
    );
  }

  if (deleteError) {
    toast.error(deleteError?.message);
  }

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
          <HiOutlineUserGroup className="invoicIcon" />
          <div className="ml-2">
            <h3 className="text-2xl font-bold"> Company </h3>
            <span>Manage Company </span>
          </div>
        </div>
        <div className="mt-2 productHome md:mt-0">
          <span>Home / </span>
          <span>Company / </span>
          <span>New Company </span>
        </div>
      </div>
      <div className="flex-wrap flex items-center justify-between mb-5 bg-[#F1F3F6] py-5 px-3">
        <h3 className="mb-3 text-xl font-bold md:text-3xl"> Company List:</h3>
        <div className="flex items-center">
          <button
            onClick={handleAllCompany}
            className="mx-6 font-semibold cursor-pointer bg-[#42A1DA] px-3 py-2 rounded-md text-white"
          >
            All
          </button>

          <input
            type="text"
            placeholder="Search"
            className="border py-2 px-3 rounded-md border-[#ddd]"
            onChange={(e) => setFilterType(e.target.value)}
            ref={textInputRef}
          />
          <button className="bg-[#42A1DA] text-white px-2 py-2 rounded-sm ml-1">
            {" "}
            <HiOutlineSearch size={22} />
          </button>
        </div>
      </div>

      {companyLoading ? (
        <div className="flex flex-wrap items-center justify-center text-xl">
          <Loading />
        </div>
      ) : (
        <div>
          {companyData?.data?.companies?.length === 0 ? (
            <div className="flex items-center justify-center h-full text-xl text-center">
              No matching card found.
            </div>
          ) : (
            <>
              <section>
                <table className="table">
                  <thead className="tableWrap">
                    <tr>
                      <th>SL No</th>
                      <th>Company Id</th>
                      <th>Company Name</th>

                      <th>Car Number </th>
                      <th> Mobile Number</th>
                      <th>Vehicle Name </th>
                      <th colSpan={3}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companyData?.data?.companies?.map((card, index) => {
                      const lastVehicle = card?.vehicles
                        ? [...card.vehicles].sort(
                            (a, b) =>
                              new Date(b.createdAt) - new Date(a.createdAt)
                          )[0]
                        : null;
                      return (
                        <tr key={card._id}>
                          <td>{index + 1}</td>
                          <td>{card.companyId}</td>
                          <td>{card?.company_name}</td>

                          <td>{lastVehicle?.fullRegNum}</td>
                          <td>{card?.fullCompanyNum} </td>
                          <td>{lastVehicle?.vehicle_name}</td>

                          <td>
                            <div
                              onClick={() => handleIconPreview(card.companyId)}
                              className="flex items-center justify-center cursor-pointer"
                            >
                              <FaUserTie size={25} className="" />
                            </div>
                          </td>

                          <td>
                            <div className="editIconWrap edit">
                              <Link
                                to={`/dashboard/update-company?id=${card?._id}`}
                              >
                                <FaEdit className="editIcon" />
                              </Link>
                            </div>
                          </td>
                          <td>
                            <button
                              disabled={companyDeleteLoading}
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
            </>
          )}
        </div>
      )}
      {companyData?.data?.companies?.length > 0 && (
        <div className="flex justify-center mt-4">
          <Pagination
            count={companyData?.data?.meta?.totalPages}
            page={currentPage}
            color="primary"
            onChange={(_, page) => setCurrentPage(page)}
          />
        </div>
      )}
    </div>
  );
};

export default CompanyList;
