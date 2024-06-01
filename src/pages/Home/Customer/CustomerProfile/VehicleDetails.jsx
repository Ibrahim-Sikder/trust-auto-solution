/* eslint-disable no-unused-vars */
import { FaEye, FaTrashAlt } from "react-icons/fa";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import { HiOutlinePlus, HiOutlineSearch } from "react-icons/hi";
import AddVehicleModal from "./AddVehicleModal";
import VehicleDetailsModal from "./VehicleDetailsModal";
import axios from "axios";
import Loading from "../../../../components/Loading/Loading";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Pagination } from "@mui/material";
import swal from "sweetalert";

const VehicleDetails = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const [open, setOpen] = useState(false);
  const [vehicleDetails, setVehicleDetails] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [getId, setGetId] = useState("");

  const handVehicleDetailsOpen = (id) => {
    setVehicleDetails(true);
    setGetId(id);
  };
  const handleVehicleDetailsClose = () => setVehicleDetails(false);

  const [vehicleList, setVehicleList] = useState([]);
  const [vehiclePage, setVehiclePage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [limit, setLimit] = useState(10);

  const [reload, setReload] = useState(false);

  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [filterType, setFilterType] = useState("");
  const [noMatching, setNoMatching] = useState(null);

  useEffect(() => {
    setLoading(true);
    try {
      fetch(
        `${
          import.meta.env.VITE_API_URL
        }/api/v1/vehicle/${id}?page=${currentPage}&limit=${limit}`
      )
        .then((res) => res.json())
        .then((data) => {
          setVehicleList(data?.allVehicle);
          setVehiclePage(data?.totalPages);
          if (data?.vehicleList?.length === 0) {
            setCurrentPage((pre) => pre - 1);
          }

          setLoading(false);
        });
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  }, [currentPage, id, limit, reload]);

  const handleFilterType = async () => {
    try {
      const data = {
        filterType,
      };
      setSearchLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/vehicle/all`,
        data
      );

      if (response.data.message === "Filter successful") {
        setVehicleList(response.data.result);
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

  const handleAllVehicle = () => {
    setLoading(true);

    try {
      fetch(
        `${
          import.meta.env.VITE_API_URL
        }/api/v1/vehicle/${id}?page=${currentPage}&limit=${limit}`
      )
        .then((res) => res.json())
        .then((data) => {
          setVehicleList(data?.allVehicle);
          setVehiclePage(data?.totalPages);
          setNoMatching(null);
          setLoading(false);
        });
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
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
          `${import.meta.env.VITE_API_URL}/api/v1/vehicle/one/${id}`,
          {
            method: "DELETE",
          }
        );
        const data = await res.json();

        if (data.message == "Customer card delete successful") {
          setVehicleList(vehicleList?.filter((pkg) => pkg._id !== id));
          setReload(!reload);
        }
        swal("Deleted!", "Card delete successful.", "success");
      } catch (error) {
        swal("Error", "An error occurred while deleting the card.", "error");
      }
    }
  };

  return (
    <div className="w-full mt-10 mb-24 ">
      <div className="flex-wrap flex items-center justify-between mb-5 bg-[#F1F3F6] py-5 px-3">
        <div className="flex items-center">
          <FormControl className="selectForm">
            <InputLabel id="demo-simple-select-label">Page</InputLabel>
            <Select
              className="selectForm"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              onChange={(e) => setLimit(e.target.value)}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
          </FormControl>
          <div>
            <button
              onClick={handleOpen}
              className="bg-[#42A1DA] text-white px-2 py-2 rounded-sm ml-2"
            >
              <HiOutlinePlus size={40} />
            </button>
          </div>
        </div>
        <div className="flex items-center mt-3 md:mt-0">
          <button
            onClick={handleAllVehicle}
            className="bg-[#42A1DA] text-white px-3 py-2 rounded-sm mr-1"
          >
            {" "}
            All
          </button>
          <input
            type="text"
            placeholder="Search"
            className="border py-2 px-3 rounded-md border-[#ddd]"
            onChange={(e) => setFilterType(e.target.value)}
          />
          <button
            onClick={handleFilterType}
            className="bg-[#42A1DA] text-white px-2 py-2 rounded-sm ml-1"
            disabled={filterType === ""}
          >
            {" "}
            <HiOutlineSearch size={22} />
          </button>
        </div>
      </div>

      {searchLoading ? (
        <div className="flex items-center justify-center text-xl">
          <Loading />
        </div>
      ) : (
        <div>
          {vehicleList?.length === 0 || noMatching ? (
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
                      <th>Vehicle Reg No </th>
                      <th>Chassis No </th>
                      <th>Engine & CC </th>
                      <th>Vehicle Name</th>
                      <th colSpan={2}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vehicleList?.map((card, index) => (
                      <tr key={card._id}>
                        <td>{index + 1}</td>
                        <td>{card.car_registration_no}</td>
                        <td>{card.chassis_no}</td>
                        <td>{card.engine_no}</td>

                        <td> {card.vehicle_name} </td>

                        <td>
                          <div
                            onClick={() => handVehicleDetailsOpen(card._id)}
                            className="flex justify-center items-center cursor-pointer"
                          >
                            <FaEye className="text-[#42A1DA]" size={24} />
                          </div>
                        </td>

                        {/* <td>
                          <div className="flex justify-center items-center">
                            <FaEdit className="text-[#22C55E]" size={24} />
                          </div>
                        </td> */}

                        <td>
                          <div
                            onClick={() => deletePackage(card._id)}
                            className="flex justify-center items-center cursor-pointer"
                          >
                            <FaTrashAlt className="text-red-600" size={24} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            </>
          )}
        </div>
      )}

      {vehicleList?.length > 0 && (
        <div className="flex justify-center mt-4">
          <Pagination
            count={vehiclePage}
            page={currentPage}
            color="primary"
            onChange={(_, page) => setCurrentPage(page)}
          />
        </div>
      )}

      {open && (
        <AddVehicleModal
          open={open}
          onClose={handleClose}
          setReload={setReload}
          reload={reload}
        />
      )}
      {vehicleDetails && (
        <VehicleDetailsModal
          handVehicleDetailsOpen={handVehicleDetailsOpen}
          handleVehicleDetailsClose={handleVehicleDetailsClose}
          getId={getId}
        />
      )}
    </div>
  );
};

export default VehicleDetails;
