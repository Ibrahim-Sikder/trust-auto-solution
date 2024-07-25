/* eslint-disable no-unused-vars */
import { FaUsers } from "react-icons/fa";
import { NotificationAdd } from "@mui/icons-material";
import { FaUserGear } from "react-icons/fa6";
import "./Employee.css";
import avatar from "../../../../public/assets/avatar.jpg";
import { HiOutlineArrowNarrowRight, HiOutlineSearch } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import swal from "sweetalert";

import { toast } from "react-toastify";
import { useGetAllEmployeesQuery } from "../../../redux/api/employee";
import Loading from "../../../components/Loading/Loading";
import { Pagination } from "@mui/material";

const EmployeeList = () => {
  const [getAllEmployee, setGetAllEmployee] = useState([]);
  const [filterType, setFilterType] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const textInputRef = useRef(null);

  const limit = 20;

  const {
    data: employees,
    isLoading: employeesLoading,
    error: employeesError,
  } = useGetAllEmployeesQuery({
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
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/employee/one/${id}`,
          {
            method: "DELETE",
          }
        );
        const data = await res.json();

        if (data.message == "Employee delete successful") {
          setGetAllEmployee(getAllEmployee?.filter((pkg) => pkg._id !== id));
        }
        swal("Deleted!", "Card delete successful.", "success");
      } catch (error) {
        swal("Error", "An error occurred while deleting the card.", "error");
      }
    }
  };

  const handleAllEmployee = () => {
    setFilterType("");
    if (textInputRef.current) {
      textInputRef.current.value = "";
    }
  };

  if (employeesError) {
    toast.error(employeesError?.data?.message);
  }

  return (
    <div className="w-full mt-5 mb-24">
      <div className="flex justify-end pb-3 border-b-2">
        <div className="flex items-end justify-end">
          <NotificationAdd size={30} className="mr-2" />
          <FaUserGear size={30} />
        </div>
      </div>
      <div className="block md:flex items-center justify-between my-3 mb-8">
        <div className="flex items-center justify-center ">
          <FaUsers size={70} className="invoicIcon" />
          <div className="ml-2">
            <h3 className="text-2xl font-bold"> Employee </h3>
            <span> Manage Customer </span>
          </div>
        </div>
        <div className="productHome">
          <span> Home / </span> <span> Employee / </span>
          <span> New Employee </span>
        </div>
      </div>
      <div className="w-full mt-5 mb-24">
        <div className="flex flex-wrap items-center justify-between mb-5">
          <h3 className="txt-center tet-sm ml- sm:ml-0 ont-bold md:text-3xl">
            {" "}
            Employee List:{" "}
          </h3>
          <div className="flex flex-wrap items-center">
            <button
              onClick={handleAllEmployee}
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
        {employeesLoading ? (
          <div className="flex items-center justify-center text-xl">
            <Loading />
          </div>
        ) : (
          <div>
            {employees?.data?.employees?.length === 0 ? (
              <div className="flex items-center justify-center h-full text-xl text-center">
                No matching card found.
              </div>
            ) : (
              <section>
                <div className="grid grid-cols-1 xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2  gap-5">
                  {employees?.data?.employees.map((employee) => (
                    <div className="employeeCard" key={employee._id}>
                      <div>
                        <img
                          className="employeeCardImg"
                          src={employee?.image}
                          alt=""
                        />
                        <h3 className="text-xl font-semibold">
                          {employee?.full_name}{" "}
                        </h3>
                        <p>{employee?.designation}</p>

                        <Link
                          to={`/dashboard/employee-profile?id=${employee._id}`}
                        >
                          <div className="flex items-center justify-center">
                            <span>See More </span>
                            <HiOutlineArrowNarrowRight className="ml-1 " />
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
        {employees?.data?.employees?.length > 0 && (
          <div className="flex justify-center mt-4">
            <Pagination
              count={employees?.data?.meta?.totalPages}
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

export default EmployeeList;
