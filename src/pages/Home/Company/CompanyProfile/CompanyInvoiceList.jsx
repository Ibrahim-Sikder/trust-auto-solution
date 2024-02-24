import { FaTrashAlt, FaEdit  } from "react-icons/fa"
import { Link } from "react-router-dom"
import { styled, alpha } from "@mui/material/styles"
import InputBase from "@mui/material/InputBase"
import SearchIcon from "@mui/icons-material/Search"
const CompanyInvoiceList = () => {
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
  }))

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }))

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
  }))

  const jobData = [
    {
        id: 1,
        customerName: "Rahim Ullah",
        carNumber: '33566'
    },
    {
        id: 1,
        customerName: "Rahim Ullah",
        carNumber: '33566'
    },
    {
        id: 1,
        customerName: "Rahim Ullah",
        carNumber: '33566'
    },
    {
        id: 1,
        customerName: "Rahim Ullah",
        carNumber: '33566'
    },
    {
        id: 1,
        customerName: "Rahim Ullah",
        carNumber: '33566'
    },
    {
        id: 1,
        customerName: "Rahim Ullah",
        carNumber: '33566'
    },

  ]

  return (
    <div className=" mb-24 mt-10 w-full">
      <div className="flex items-center justify-between mb-5 bg-[#F1F3F6] py-5 px-3">
      <Link to='/dashboard/invoice'>
         <button className="bg-[#42A1DA] text-white px-2 py-3 rounded-sm ">
            Add Invoice
          </button>
          </Link>
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
              <th>SL No</th>
              <th>Customer Name</th>
              <th>Order Number </th>
              <th>Car Number </th>
              <th>Mobile Number</th>
              <th>Date</th>
              <th colSpan={3}>Action</th>
            </tr>
          </thead>
          <tbody>
            {
                jobData.map((data,i)=><tr key={data.id}>
                <td>{i+1}</td>
                <td>Rahim Ullah </td>
                <td>555</td>
                <td>478444</td>
                <td>057888888888</td>
                <td> 10-02-24 </td>
                <td>
                  <div className="editIconWrap edit">
                    <Link to="">
                      <FaEdit className="editIcon" />
                    </Link>
                  </div>
                </td>
                <td>
                  <div className="editIconWrap">
                    <FaTrashAlt className="deleteIcon" />
                  </div>
                </td>
              </tr>)
            }
           
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CompanyInvoiceList
