/* eslint-disable react/jsx-no-undef */

import TextField from "@mui/material/TextField";
import { FaFileInvoice, FaEye, FaTrashAlt, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { FormControl, InputLabel, Select } from "@mui/material";

const AddCompany = () => {
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

  return (
    <section>
      <div className=" addProductWraps">
        <div className="flex items-center mr-[80px]  justify-end topProductBtn">
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
        <div className="productHeadWrap">
          <div className="flex items-center justify-center ">
            <FaFileInvoice className="invoicIcon" />
            <div className="ml-2">
              <h3 className="text-2xl font-bold"> New Company </h3>
              <span>Add New Company </span>
            </div>
          </div>
          <div className="productHome">
            <span>Home / </span>
            <span>Product / </span>
            <span>New Company </span>
          </div>
        </div>

        <div className="addProductWrap">
          <form>
            <div className="flex">
              <div>
                <h3 className="text-xl  font-bold ">Company Information </h3>
                <div>
                  <TextField
                    className="productField"
                    on
                    label="Company Name (T)"
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    on
                    label="Company Address (T)"
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="Company Contact No (N)"
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="Company Email Address (N)"
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    o
                    label="Driver Name (T)"
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="Driver Contact No (N)"
                  />
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="Reference Name (T) "
                  />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold">Vehicle Information </h3>

                <div>
                
                  <div>
                    <TextField
                      className="productField"
                      label="Chassis No (T&N)"
                    />
                  </div>
                  <div>
                    <TextField
                      className="productField"
                      label="ENGINE NO & CC (T&N) "
                    />
                  </div>
                </div>

                {/*  <div className="mt-3">
          <TextField
            className="addJobInputField"
            onChange={(e) => setVehicleBrand(e.target.value)}
            label="Vehicle Brand (T&N)"
          />
        </div>
*/}
                <div>
                  <FormControl className="productField">
                    <InputLabel htmlFor="grouped-native-select">
                      Vehicle Brand
                    </InputLabel>
                    <Select
                      className="addJobInputField"
                      native
                      id="grouped-native-select"
                      label="Vehicle Brand"
                    >
                      <option value="Acura">Acura</option>
                      <option value="Alfa Romeo">Alfa Romeo</option>
                      <option value="Aston Martin">Aston Martin</option>
                      <option value="Audi">Audi</option>
                      <option value="Austin">Austin</option>
                      <option value="Bentley">Bentley</option>
                      <option value="BMW">BMW</option>
                      <option value="Brilliance">Brilliance</option>
                      <option value="Bugatti">Bugatti</option>
                      <option value="Buick">Buick</option>
                      <option value="BYD">BYD</option>
                      <option value="Cadillac">Cadillac</option>
                      <option value="Chana">Chana</option>
                      <option value="Changan">Changan</option>
                      <option value="Chery">Chery</option>
                      <option value="Chevrolet">Chevrolet</option>
                      <option value="Chrysler">Chrysler</option>
                      <option value="Citroën">Citroën</option>
                      <option value="Dacia">Dacia</option>
                      <option value="Dadi">Dadi</option>
                      <option value="Daewoo">Daewoo</option>
                      <option value="Daihatsu">Daihatsu</option>
                      <option value="Datsun">Datsun</option>
                      <option value="De Lorean">De Lorean</option>
                      <option value="Derways">Derways</option>
                      <option value="Dodge">Dodge</option>
                      <option value="DongFeng">DongFeng</option>
                      <option value="DS">DS</option>
                      <option value="Eagle">Eagle</option>
                      <option value="FAW">FAW</option>
                      <option value="Ferrari">Ferrari</option>
                      <option value="Fiat">Fiat</option>
                      <option value="Ford">Ford</option>
                      <option value="Foton">Foton</option>
                      <option value="GAC">GAC</option>
                      <option value="Geely">Geely</option>
                      <option value="Genesis">Genesis</option>
                      <option value="Geo">Geo</option>
                      <option value="GMC">GMC</option>
                      <option value="Great Wall">Great Wall</option>
                      <option value="Hafei">Hafei</option>
                      <option value="Haima">Haima</option>
                      <option value="Haval">Haval</option>
                      <option value="Holden">Holden</option>
                      <option value="Honda">Honda</option>
                      <option value="Hummer">Hummer</option>
                      <option value="Hyundai">Hyundai</option>
                      <option value="Infiniti">Infiniti</option>
                      <option value="Iran Khodro">Iran Khodro</option>
                      <option value="Isuzu">Isuzu</option>
                      <option value="JAC">JAC</option>
                      <option value="Jaguar">Jaguar</option>
                      <option value="Jeep">Jeep</option>
                      <option value="Kia">Kia</option>
                      <option value="Lamborghini">Lamborghini</option>
                      <option value="Lancia">Lancia</option>
                      <option value="Land Rover">Land Rover</option>
                      <option value="Lexus">Lexus</option>
                      <option value="Lifan">Lifan</option>
                      <option value="Lincoln">Lincoln</option>
                      <option value="Lotus">Lotus</option>
                      <option value="Luxgen">Luxgen</option>
                      <option value="Maserati">Maserati</option>
                      <option value="Maybach">Maybach</option>
                      <option value="Mazda">Mazda</option>
                      <option value="Mercedes Benz">Mercedes Benz</option>
                      <option value="Mercury">Mercury</option>
                      <option value="MG">MG</option>
                      <option value="Mini">Mini</option>
                      <option value="Mitsubishi">Mitsubishi</option>
                      <option value="Nissan">Nissan</option>
                      <option value="Oldsmobile">Oldsmobile</option>
                      <option value="Opel">Opel</option>
                      <option value="Peugeot">Peugeot</option>
                      <option value="Plymouth">Plymouth</option>
                      <option value="Pontiac">Pontiac</option>
                      <option value="Porsche">Porsche</option>
                      <option value="Ravon">Ravon</option>
                      <option value="Renault">Renault</option>
                      <option value="Rolls-Royce">Rolls-Royce</option>
                      <option value="Rover">Rover</option>
                      <option value="Saab">Saab</option>
                      <option value="Saturn">Saturn</option>
                      <option value="Scion">Scion</option>
                      <option value="SEAT">SEAT</option>
                      <option value="Skoda">Skoda</option>
                      <option value="Smart">Smart</option>
                      <option value="SsangYong">SsangYong</option>
                      <option value="Subaru">Subaru</option>
                      <option value="Suzuki">Suzuki</option>
                      <option value="Tesla">Tesla</option>
                      <option value="Toyota">Toyota</option>
                      <option value="Vauxhall">Vauxhall</option>
                      <option value="Volkswagen">Volkswagen</option>
                      <option value="Volvo">Volvo</option>
                      <option value="Zotye">Zotye</option>
                      <option value="Chinese cars">Chinese cars</option>
                      <option value="USA cars">USA cars</option>
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <TextField className="productField" label="Vehicle Name " />
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="Vehicle Model (N)"
                  />
                </div>
                <div>
                  <FormControl className="productField">
                    <InputLabel htmlFor="grouped-native-select">
                      Select Vehicle Category{" "}
                    </InputLabel>
                    <Select
                      onCha
                      native
                      defaultValue=""
                      id="grouped-native-select"
                      label="Select Vehicle Category  "
                    >
                      <option value="Vehicle Type ">Vehicle Type</option>
                      <option value="Sedans">Sedans</option>
                      <option value="Crossovers">Crossovers</option>
                      <option value="Sports">Sports</option>
                      <option value="Trucks">Trucks</option>
                      <option value="Coupes">Coupes</option>
                      <option value="Convertibles">Convertibles</option>
                      <option value="Diesels">Diesels</option>
                      <option value="SUVs">SUVs</option>
                      <option value="Hybrid/Electric">Hybrid/Electric</option>
                      <option value="Vans/Minivans">Vans/Minivans</option>
                      <option value="Wagons">Wagons</option>
                      <option value="Small Cars ">Small Cars </option>
                      <option value="CPO ">CPO </option>
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="Color & Code (T&N) "
                  />
                </div>
                <div>
                  <TextField className="productField" label="Mileage (N) " />
                </div>
                <div>
                  <TextField
                    className="productField"
                    label="Fuel Type (T&N) "
                  />
                </div>
              </div>
            </div>

            <div className="savebtn mt-2">
              <button>Add Company </button>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-5 mb-24 w-full">
        <div className="flex items-center justify-between  mb-5">
          <h3 className="text-3xl font-bold text-center "> Company List: </h3>
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
          <table className="table ">
            <thead className="tableWrap">
              <tr>
                <th>SL</th>
                <th>Company Name </th>
                <th>Phone Number </th>
                <th>Reference Name </th>
                <th colSpan={3}>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>01</td>
                <td>Car </td>
                <td>BMW2343</td>
                <td>BDT1005</td>
                <td>
                  <div className="editIconWrap edit2">
                    <Link to="/dashboard/update-product">
                      <FaEye className="editIcon" />
                    </Link>
                  </div>
                </td>
                <td>
                  <div className="editIconWrap edit">
                    <Link to="/dashboard/update-Company">
                      <FaEdit className="editIcon" />
                    </Link>
                  </div>
                </td>
                <td>
                  <div className="editIconWrap">
                    <FaTrashAlt className="deleteIcon" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AddCompany;
