/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-no-undef */

import TextField from "@mui/material/TextField";
import {
  FaTrashAlt,
  FaEdit,
  FaUsers,
  FaUserTie,
  FaCloudUploadAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Autocomplete, FormControl, InputLabel, Select } from "@mui/material";
import { HiOutlineSearch } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { countries } from "../../../constant";
import HeaderButton from "../../../components/CommonButton/HeaderButton";
import { FaUserGear } from "react-icons/fa6";
import { NotificationAdd } from "@mui/icons-material";
const AddSuppliers = () => {
  const [url, setUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [getAllSuppliers, setGetAllSuppliers] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [noMatching, setNoMatching] = useState(null);
  const [reload, setReload] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/v1/supplier`)
      .then((response) => {
        // Handle the response data here
        setGetAllSuppliers(response.data.allSupplier); // For example, you can log the response data to the console
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        setError(error.message);
      });
  }, [reload]);

  const handleImageUpload = async (e) => {
    try {
      const file = e.target.files[0]; // Get the selected file
      const formData = new FormData();
      formData.append("image", file); // Use "image" as the key for single image upload
      setImageLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/uploads`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.message === "Image uploaded successful") {
        setUrl(data.image_url);
        setImageLoading(false);
      }
    } catch (error) {
      setImageLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setError("");
    try {
      const values = {
        full_name: data.full_name,
        phone_number: data.phone_number,
        email: data.email,
        vendor: data.vendor,
        shop_name: data.shop_name,
        country: data.country,
        city: data.city,
        address: data.address,
        image: url,
      };

      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/supplier`,
        values
      );

      if (response.data.message === "Successfully supplier post") {
        toast.success("Successfully supplier added.");
        setLoading(false);
        setReload(!reload);
        reset();
        setError("");
      }
    } catch (error) {
      if (error.response) {
        setLoading(false);
        setError(error.response.data.message);
      }
    }
  };

  // country code set
  const [countryCode, setCountryCode] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneNumberChange = (e) => {
    const newPhoneNumber = e.target.value;
    if (
      /^\d*$/.test(newPhoneNumber) &&
      newPhoneNumber.length <= 11 &&
      (newPhoneNumber === "" ||
        !newPhoneNumber.startsWith("0") ||
        newPhoneNumber.length > 1)
    ) {
      setPhoneNumber(newPhoneNumber);
    }
  };
  // pagination

  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(
    Number(sessionStorage.getItem("supplier")) || 1
  );
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

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
          `${import.meta.env.VITE_API_URL}/api/v1/supplier/one/${id}`,
          {
            method: "DELETE",
          }
        );
        const data = await res.json();

        if (data.message == "Supplier card delete successful") {
          setGetAllSuppliers(getAllSuppliers?.filter((pkg) => pkg._id !== id));
          setReload(!reload);
        }
        swal("Deleted!", "Card delete successful.", "success");
      } catch (error) {
        swal("Error", "An error occurred while deleting the card.", "error");
      }
    }
  };

  useEffect(() => {
    sessionStorage.setItem("supplier", currentPage.toString());
  }, [currentPage]);

  useEffect(() => {
    const storedPage = Number(sessionStorage.getItem("supplier")) || 1;
    setCurrentPage(storedPage);
    setMaxPageNumberLimit(
      Math.ceil(storedPage / pageNumberLimit) * pageNumberLimit
    );
    setMinPageNumberLimit(
      Math.ceil(storedPage / pageNumberLimit - 1) * pageNumberLimit
    );
  }, [pageNumberLimit]);

  // ...

  const handleClick = (e) => {
    const pageNumber = Number(e.target.id);
    setCurrentPage(pageNumber);
    sessionStorage.setItem("supplier", pageNumber.toString());
  };
  const pages = [];
  for (let i = 1; i <= Math.ceil(getAllSuppliers?.length / limit); i++) {
    pages.push(i);
  }

  const renderPagesNumber = pages?.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={
            currentPage === number
              ? "bg-green-500 text-white px-3 rounded-md cursor-pointer"
              : "cursor-pointer text-black border border-green-500 px-3 rounded-md"
          }
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const lastIndex = currentPage * limit;
  const startIndex = lastIndex - limit;

  let currentItems;
  if (Array.isArray(getAllSuppliers)) {
    currentItems = getAllSuppliers?.slice(startIndex, lastIndex);
  } else {
    currentItems = [];
  }

  const renderData = (getAllSuppliers) => {
    return (
      <table className="table">
        <thead className="tableWrap">
          <tr>
            <th>SL</th>
            <th>Supplier Name </th>
            <th>Phone Number </th>
            <th>Email</th>
            <th colSpan={3}>Action</th>
          </tr>
        </thead>
        <tbody>
          {getAllSuppliers?.map((card, index) => (
            <tr key={card._id}>
              <td>{index + 1}</td>
              <td>{card?.full_name}</td>
              <td>{card?.phone_number}</td>
              <td>{card?.email}</td>

              <td>
                <div className="editIconWrap edit">
                  <Link to={`/dashboard/update-Supplier?id=${card._id}`}>
                    <FaEdit className="editIcon" />
                  </Link>
                </div>
              </td>
              <td>
                <div
                  onClick={() => deletePackage(card._id)}
                  className="editIconWrap"
                >
                  <FaTrashAlt className="deleteIcon" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const handlePrevious = () => {
    const newPage = currentPage - 1;
    setCurrentPage(newPage);
    sessionStorage.setItem("supplier", newPage.toString());

    if (newPage % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  const handleNext = () => {
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
    sessionStorage.setItem("supplier", newPage.toString());

    if (newPage > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages?.length > maxPageNumberLimit) {
    pageIncrementBtn = (
      <li
        onClick={() => handleClick({ target: { id: maxPageNumberLimit + 1 } })}
        className="pl-1 text-black cursor-pointer"
      >
        &hellip;
      </li>
    );
  }

  let pageDecrementBtn = null;
  if (currentPage > pageNumberLimit) {
    pageDecrementBtn = (
      <li
        onClick={() => handleClick({ target: { id: minPageNumberLimit } })}
        className="pr-1 text-black cursor-pointer"
      >
        &hellip;
      </li>
    );
  }

  const handleFilterType = async () => {
    try {
      const data = {
        filterType,
      };
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/supplier/all`,
        data
      );

      if (response.data.message === "Filter successful") {
        setGetAllSuppliers(response.data.result);
        setNoMatching(null);
        setLoading(false);
      }
      if (response.data.message === "No matching found") {
        setNoMatching(response.data.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handleAllSuppliers = () => {
    try {
      fetch(`${import.meta.env.VITE_API_URL}/api/v1/supplier`)
        .then((res) => res.json())
        .then((data) => {
          setGetAllSuppliers(data.allSupplier);
          setNoMatching(null);
        });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <section>
      <div className=" addProductWraps">
      <div className="flex justify-between pb-3 border-b-2 px-2">
          <HeaderButton />
          <div className="flex items-end justify-end">
            <NotificationAdd size={30} className="mr-2" />
            <FaUserGear size={30} />
          </div>
        </div>
        <div className="productHeadWrap">
          <div className="flex items-center justify-center ">
            <FaUsers size={70} className="invoicIcon" />
            <div className="ml-2">
              <h3 className="text-2xl font-bold"> New Supplier </h3>
              <span>Add New Supplier </span>
            </div>
          </div>
          <div className="productHome">
            <span>Home / </span>
            <span>Supplier / </span>
            <span>New Supplier </span>
          </div>
        </div>

        <div className="addProductWrap">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="block md:flex">
              <div>
                <h3 className="text-xl font-bold">Personal Info </h3>

                <TextField
                  className="productField"
                  fullWidth
                  label="Full Name "
                  id="Full Name "
                  {...register("full_name")}
                />
                {/* <TextField
                  className="productField"
                  fullWidth
                  label="Phone Number "
                  id="Phone Number "
                  {...register("phone_number")}
                /> */}
                <div className="flex items-center my-1">
                  <Autocomplete
                    sx={{ marginRight: "2px", marginLeft: '5px' }}
                    className="jobCardSelect2"
                    freeSolo
                    options={countries}
                    getOptionLabel={(option) => option.label}
                    value={countryCode}
                    onChange={(event, newValue) => {
                      setCountryCode(newValue);
                      setPhoneNumber(""); // Reset the phone number when changing country codes
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Country Code"
                        variant="outlined"
                      />
                    )}
                  />
                  <TextField
                    className="productField2"
                    label="Phone No"
                    variant="outlined"
                    fullWidth
                    type="tel"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                   
                  />
                </div>


                <TextField
                  className="productField"
                  fullWidth
                  label="Email Address "
                  id="Email Address "
                  {...register("email")}
                />
                <div>
                  <FormControl className="productField">
                    <InputLabel htmlFor="grouped-native-select">
                      Vendor Categories
                    </InputLabel>
                    <Select
                      className="addJobInputField"
                      native
                      id="grouped-native-select"
                      label="Car Registration No  "
                      {...register("vendor")}
                    >
                      <option value="Acura">New Parts </option>
                      <option value="Acura">Recondition Parts</option>
                      <option value="Acura">New & Recondition Parts</option>
                      <option value="Acura">Body Items</option>
                      <option value="Acura">Engine & Suspension Items</option>
                      <option value="Acura">Electric Items</option>
                      <option value="Acura">Others</option>
                    </Select>
                  </FormControl>
                </div>
                <TextField
                  className="productField"
                  fullWidth
                  label="Shop Name"
                  id="Password"
                  {...register("shop_name")}
                />
              </div>

              <div>
                <h3 className="text-xl font-bold">Address </h3>

                <TextField
                  className="productField"
                  fullWidth
                  label="Country "
                  {...register("country")}
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Town/City "
                  {...register("city")}
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Address "
                  {...register("address")}
                />
                <div className="productField">
                  <input
                    onChange={handleImageUpload}
                    type="file"
                    id="files"
                    className="hidden"
                  />
                  <label
                    for="files"
                    className="flex items-center justify-center cursor-pointer bg-[#42A1DA] text-white py-2 rounded-md "
                  >
                    <span>
                      <FaCloudUploadAlt size={30} className="mr-2" />
                    </span>
                    {imageLoading ? (
                      <span>Uploading...</span>
                    ) : (
                      <>
                        {url ? (
                          <span>Uploaded</span>
                        ) : (
                          <span> Upload Image</span>
                        )}
                      </>
                    )}
                  </label>
                </div>
              </div>
            </div>
            <div className="text-start text-red-400 py-2">{error}</div>
            <div className="mt-2 savebtn">
              <button disabled={loading || imageLoading}>Add Supplier </button>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-20 overflow-x-auto">
        <div className="md:flex items-center justify-between mb-5">
          <h3 className="mb-3 text-xl md:text-3xl font-bold">
            Suppliers List:
          </h3>
          <div className="flex items-center searcList">
            <div className="searchGroup">
              <input
                onChange={(e) => setFilterType(e.target.value)}
                autoComplete="off"
                type="text"
              />
            </div>
            <button onClick={handleFilterType} className="SearchBtn ">
              Search{" "}
            </button>
          </div>
        </div>
        {loading ? (
          <div className="flex items-center justify-center text-xl">
            Loading...
          </div>
        ) : (
          <div>
            {getAllSuppliers?.length === 0 || currentItems.length === 0 ? (
              <div className="flex items-center justify-center h-full text-xl text-center">
                No matching suppliers found.
              </div>
            ) : (
              <>
                <section>
                  {renderData(currentItems)}
                  <ul
                    className={
                      minPageNumberLimit < 5
                        ? "flex justify-center gap-2 md:gap-4 pb-5 mt-6"
                        : "flex justify-center gap-[5px] md:gap-2 pb-5 mt-6"
                    }
                  >
                    <button
                      onClick={handlePrevious}
                      disabled={currentPage === pages[0] ? true : false}
                      className={
                        currentPage === pages[0]
                          ? "text-gray-600"
                          : "text-gray-300"
                      }
                    >
                      Previous
                    </button>
                    <span
                      className={minPageNumberLimit < 5 ? "hidden" : "inline"}
                    >
                      {pageDecrementBtn}
                    </span>
                    {renderPagesNumber}
                    {pageIncrementBtn}
                    <button
                      onClick={handleNext}
                      disabled={
                        currentPage === pages[pages?.length - 1] ? true : false
                      }
                      className={
                        currentPage === pages[pages?.length - 1]
                          ? "text-gray-700"
                          : "text-gray-300 pl-1"
                      }
                    >
                      Next
                    </button>
                  </ul>
                </section>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default AddSuppliers;
