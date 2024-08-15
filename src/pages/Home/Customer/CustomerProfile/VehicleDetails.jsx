/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { FaEye, FaTrashAlt } from "react-icons/fa";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useRef, useState } from "react";
import { HiOutlinePlus, HiOutlineSearch } from "react-icons/hi";
import AddVehicleModal from "./AddVehicleModal";
import VehicleDetailsModal from "./VehicleDetailsModal";
import Loading from "../../../../components/Loading/Loading";
import { toast } from "react-toastify";
import { Pagination } from "@mui/material";
import swal from "sweetalert";
import {
  useDeleteVehicleMutation,
  useGetAllVehiclesQuery,
} from "../../../../redux/api/vehicle";

const VehicleDetails = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [vehicleDetails, setVehicleDetails] = useState(false);
  const [getId, setGetId] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [limit, setLimit] = useState(10);

  const [reload, setReload] = useState(false);

  const [filterType, setFilterType] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handVehicleDetailsOpen = (id) => {
    setVehicleDetails(true);
    setGetId(id);
  };
  const handleVehicleDetailsClose = () => setVehicleDetails(false);

  const textInputRef = useRef();

  const { data: allVehicle, isLoading } = useGetAllVehiclesQuery({
    id,
    limit,
    page: currentPage,
    searchTerm: filterType,
  });

  const [deleteVehicle, { isLoading: deleteLoading, error: deleteError }] =
    useDeleteVehicleMutation();

  const handleAllVehicle = () => {
    setFilterType("");
    if (textInputRef.current) {
      textInputRef.current.value = "";
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
        await deleteVehicle(id).unwrap();
        swal("Deleted!", "Card delete successful.", "success");
      } catch (error) {
        swal("Error", "An error occurred while deleting the card.", "error");
      }
    }
  };

  if (deleteError) {
    toast.error(deleteError?.message);
  }

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
            ref={textInputRef}
          />
          <button className="bg-[#42A1DA] text-white px-2 py-2 rounded-sm ml-1">
            {" "}
            <HiOutlineSearch size={22} />
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center text-xl">
          <Loading />
        </div>
      ) : (
        <div>
          {allVehicle?.data?.vehicles?.length === 0 ? (
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
                    {allVehicle?.data?.vehicles?.map((card, index) => (
                      <tr key={card._id}>
                        <td>{index + 1}</td>
                        <td>{card.fullRegNum}</td>
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
                          <button
                            disabled={deleteLoading}
                            onClick={() => deletePackage(card._id)}
                            className="flex justify-center items-center cursor-pointer"
                          >
                            <FaTrashAlt className="text-red-600" size={24} />
                          </button>
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

      {allVehicle?.data?.vehicles?.length > 0 && (
        <div className="flex justify-center mt-4">
          <Pagination
            count={allVehicle?.data?.meta?.totalPages}
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
