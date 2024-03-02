import { FaCarSide, FaEye } from "react-icons/fa";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import { HiOutlinePlus, HiOutlineSearch } from "react-icons/hi";
import AddVehicleModal from "./AddVehicleModal";
import VehicleDetailsModal from "./VehicleDetailsModal";

const VehicleDetails = () => {





  const jobData = [
    {
      id: 1,
      customerName: "Rahim Ullah",
      carNumber: "33566",
    },
    {
      id: 1,
      customerName: "Rahim Ullah",
      carNumber: "33566",
    },
    {
      id: 1,
      customerName: "Rahim Ullah",
      carNumber: "33566",
    },
    {
      id: 1,
      customerName: "Rahim Ullah",
      carNumber: "33566",
    },
    {
      id: 1,
      customerName: "Rahim Ullah",
      carNumber: "33566",
    },
    {
      id: 1,
      customerName: "Rahim Ullah",
      carNumber: "33566",
    },
  ];

  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [open, setOpen] = useState(false);
  const [vehicleDetails, setVehicleDetails] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handVehicleDetailsOpen = () => setVehicleDetails(true);
  const handleVehicleDetailsClose = () => setVehicleDetails(false);

  return (
    <div className=" mb-24 mt-10 w-full">
      <div className="flex items-center justify-between mb-5 bg-[#F1F3F6] py-5 px-3">
        <div className="flex items-center">
          <FormControl className="selectForm">
            <InputLabel value={age} id="demo-simple-select-label">
              Page
            </InputLabel>
            <Select
              className="selectForm"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChange}
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
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="border py-2 px-3 rounded-md border-[#ddd]"
          />
          <button className="bg-[#42A1DA] text-white px-2 py-2 rounded-sm ml-1">
            {" "}
            <HiOutlineSearch size={22} />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto ">
        <table className="table">
          <thead className="tableWrap">
            <tr>
              <th>Photo </th>
              <th>Chassis No </th>
              <th>Engine No </th>
              <th>Vehicle Category </th>
              <th>Car Reg </th>
              <th>Vehicle Model </th>
              <th>Last Service Date </th>
              <th>More Details</th>
            </tr>
          </thead>
          <tbody>
            {jobData.map((data) => (
              <tr key={data.id}>
                <td>
                  <div className="cardIcon mx-auto bg-[#F77F00]">
                    <FaCarSide size={50} className="text-white" />
                  </div>
                </td>
                <td>567 </td>
                <td>555</td>
                <td>478444</td>
                <td>555</td>
                <td> t55 </td>
                <td> 04-01-2024 </td>
                <td>
                  <div className="editIconWrap edit">
                    <FaEye
                      onClick={handVehicleDetailsOpen}
                      className="editIcon"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {open && <AddVehicleModal open={open} onClose={handleClose} />}
      {vehicleDetails && (
        <VehicleDetailsModal
          handVehicleDetailsOpen={handVehicleDetailsOpen}
          handleVehicleDetailsClose={handleVehicleDetailsClose}
        />
      )}
    </div>
  );
};

export default VehicleDetails;
