import { FaCarSide, FaEye } from "react-icons/fa";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import { HiOutlinePlus } from "react-icons/hi";
import CompanyAddVehicleModal from "./CompanyAddVehicleModal";
import CompanyVehicleDetailsModal from "./CompanyVehicleDetailsModal";

const CompanyVehicleDetails = () => {
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

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

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

  const handVehicleDetailsOpen = ()=>setVehicleDetails(true)
  const handleVehicleDetailsClose = ()=>setVehicleDetails(false)

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
          <Search>
            <SearchIconWrapper>
              <SearchIcon className="searchIcon" />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <button className="bg-[#42A1DA] text-white px-2 py-2 rounded-sm ml-2">
            Search
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
                  <FaEye onClick={handVehicleDetailsOpen}  className="editIcon" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {open && <CompanyAddVehicleModal open={open} onClose={handleClose} />}
      {
        vehicleDetails && <CompanyVehicleDetailsModal handVehicleDetailsOpen={handVehicleDetailsOpen} handleVehicleDetailsClose={handleVehicleDetailsClose} />
      }
    </div>
  );
};

export default CompanyVehicleDetails;

