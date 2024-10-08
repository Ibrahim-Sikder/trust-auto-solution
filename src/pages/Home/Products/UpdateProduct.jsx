/* eslint-disable react/jsx-no-undef */
import "./Product.css";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  FaRegTrashAlt,
  FaPlus,
  FaFileInvoice,
  FaEye,
  FaReddit,
  FaTrashAlt,
} from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import img from "../../../../public/assets/service2.png";
import HeaderButton from "../../../components/CommonButton/HeaderButton";
import { NotificationAdd } from "@mui/icons-material";
import { FaUserGear } from "react-icons/fa6";
import { Box, Button, Grid, MenuItem } from "@mui/material";
const AddProduct = () => {
  const [inputList, setInputList] = useState([
    { supplier: "", priice: "", addbtn: "", deleteBtn: "" },
  ]);
  const handleRemove = (index) => {
    if (!index) {
      const list = [...inputList];

      setInputList(list);
    } else {
      const list = [...inputList];
      list.splice(index, 1);
      setInputList(list);
    }
  };
  const handleAddClick = () => {
    setInputList([
      ...inputList,
      { supplier: "", priice: "", addbtn: "", deleteBtn: "" },
    ]);
  };

  return (
    <section>
      <div className=" addProductWraps">
        <div className="flex justify-between pb-3 border-b-2">
          <HeaderButton />
          <div className="flex items-end justify-end">
            <NotificationAdd size={30} className="mr-2" />
            <FaUserGear size={30} />
          </div>
        </div>
        <div className="productHeadWrap">
          <div className="flex items-center justify-center ">
            <FaFileInvoice className="invoicIcon" />
            <div className="ml-2">
              <h3 className=" md:text-2xl font-bold"> New Product </h3>
              <span className="text-sm">Add New Product </span>
            </div>
          </div>
          <div className="productHome">
            <span>Home / </span>
            <span>Product / </span>
            <span>New Product </span>
          </div>
        </div>
        <div className="my-3 flex  justify-end mr-[80px] ">
          <Link to="/dashboard/product"></Link>
        </div>
        <div className="addProductWrap">
          <form>
            <Box>
              <Grid container spacing={2}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    className="productField"
                    fullWidth
                    label="Product Name"
                    id="Product Name "
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Serial Number "
                    id="Serial Number "
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField fullWidth label="Model" id="Model " />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="grouped-native-select">
                      Select Category{" "}
                    </InputLabel>
                    <Select
                      
                      defaultValue=""
                      id="grouped-native-select"
                      label="Select Category "
                    >
                      <MenuItem value="First Category ">
                        {" "}
                        First Category{" "}
                      </MenuItem>
                      <MenuItem value="First Category ">
                        {" "}
                        First Category{" "}
                      </MenuItem>
                      <MenuItem value="First Category ">
                        {" "}
                        First Category{" "}
                      </MenuItem>
                      <MenuItem value="First Category ">
                        {" "}
                        First Category{" "}
                      </MenuItem>
                      <MenuItem value="First Category ">
                        {" "}
                        First Category{" "}
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField fullWidth label="Sale Price" id="Price " />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="grouped-native-select">
                      Unit
                    </InputLabel>
                    <Select
                      defaultValue=""
                      id="grouped-native-select"
                      label="Select Category "
                    >
                      <MenuItem value="First Category "> KG</MenuItem>
                      <MenuItem value="First Category "> PCS </MenuItem>
                      <MenuItem value="First Category ">Quantity </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    className="productField"
                    type="file"
                    fullWidth
                    label=""
                    id="Image "
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    className="productField"
                    fullWidth
                    label="Tax"
                    id="Tax"
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    className="productField"
                    fullWidth
                    label="Minimum Stock"
                    id="Minimum Stock "
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    className="productField"
                    fullWidth
                    label="Re Order Level"
                    id="Re Order Level"
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    className="productField"
                    fullWidth
                    label="Product Location"
                    id="Product Location "
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    className="productField"
                    fullWidth
                    label="Global Markup"
                    id="Global Markup"
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    className="productField"
                    fullWidth
                    label="Individual Markup"
                    id="Individual Markup "
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    className="productField"
                    fullWidth
                    label="Note"
                    id="Note"
                  />
                </Grid>
              </Grid>
            </Box>

            <div className="productFieldWrap"></div>

            <div className="supplierBox mt-8">
              <div className="flex items-center justify-between px-0 md:px-5 md:text-xl text-sm">
                <b>Supplier </b>
                <b className="ml-5">Supplier Price</b>
                <b>Action </b>
              </div>
              {inputList.map((x, i) => {
                return (
                  <div key={i} className=" addItemsWrap">
                    <Grid container spacing={2}>
                      <Grid item lg={3} md={6} sm={12} xs={12}>
                        <FormControl fullWidth>
                          <InputLabel htmlFor="grouped-native-select">
                            Select Price
                          </InputLabel>
                          <Select
                            defaultValue=""
                            id="grouped-native-select"
                            label="Select Category "
                          >
                            <MenuItem value="KG"> KG</MenuItem>
                            <MenuItem value="PCS"> PCS </MenuItem>
                            <MenuItem value="Quantity">Quantity </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item lg={9} md={6} sm={12} xs={12}>
                        <TextField f fullWidth label="" id="" />
                      </Grid>
                    </Grid>
                    <div className="actionIcon ">
                      <div className="flex items-center">
                        {inputList.length - 1 === i && (
                          <FaPlus
                            onClick={handleAddClick}
                            className="addIcon"
                          />
                        )}

                        {inputList.length !== 0 && (
                          <FaRegTrashAlt
                            onClick={() => handleRemove(i)}
                            className="addIcon2"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="productDetailWrap mt-8">
              <label className="block"> Product Details </label>
              <textarea
                placeholder="Product Details "
                className="productDetail"
                name=""
                id=""
                cols="30"
                rows="10"
              />
            </div>
            <div className="flex justify-end mt-3 ">
              <Button sx={{ color: "white" }}>Add Product</Button>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-5 mb-24 w-full">
        <div className="flex flex-wrap items-center justify-between  mb-5">
          <h3 className="text-xl md:text-3xl font-bold text-center ">
            {" "}
            Products List:{" "}
          </h3>
        </div>
        <div className="overflow-x-auto ">
          <table className="table ">
            <thead className="tableWrap">
              <tr>
                <th>SL</th>
                <th>Image</th>
                <th>Product Name </th>
                <th>Product Model </th>
                <th>Supplier Name </th>
                <th>Price </th>
                <th>Supplier Price </th>
                <th colSpan={3}>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>01</td>
                <td>
                  <div className="mask   h-[100px] w-[100px] mx-auto ">
                    <img
                      className=" h-full w-full object-cover text-center"
                      src={img}
                      alt="img"
                    />
                  </div>
                </td>
                <td>Car </td>
                <td>BMW2343</td>
                <td>Aminul Hoque </td>
                <td>BDT405</td>
                <td>BDT1005</td>
                <td>
                  <div className="editIconWrap edit">
                    <FaEye className="editIcon" />
                  </div>
                </td>
                <td>
                  <div className="editIconWrap edit">
                    <Link to="/dashboard/update-product">
                      <FaReddit className="editIcon" />
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

export default AddProduct;
