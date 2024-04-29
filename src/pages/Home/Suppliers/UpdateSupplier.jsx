/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-no-undef */

import TextField from "@mui/material/TextField";
import { FaUsers, FaCloudUploadAlt } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FormControl, InputLabel, Select } from "@mui/material";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
const UpdateSupplier = () => {
  const [url, setUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [getSingleSuppliers, setGetSingleSuppliers] = useState({});
 
  const [reload, setReload] = useState(false);

  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/supplier/one/${id}`)
      .then((response) => {
        setGetSingleSuppliers(response.data.supplier);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [reload, id]);

  const handleImageUpload = async (e) => {
    try {
      const file = e.target.files[0]; // Get the selected file
      const formData = new FormData();
      formData.append("image", file); // Use "image" as the key for single image upload
      setImageLoading(true);
      const response = await fetch("http://localhost:5000/api/v1/uploads", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.message === "Image uploaded successfully") {
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
        full_name: data.full_name || getSingleSuppliers.full_name,
        phone_number: data.phone_number || getSingleSuppliers.phone_number,
        email: data.email || getSingleSuppliers.email,
        vendor: data.vendor || getSingleSuppliers.vendor,
        shop_name: data.shop_name || getSingleSuppliers.shop_name,
        country: data.country || getSingleSuppliers.country,
        city: data.city || getSingleSuppliers.city,
        address: data.address || getSingleSuppliers.address,
        image: url ? url : getSingleSuppliers.image,
      };

      setLoading(true);
      const response = await axios.put(
        `http://localhost:5000/api/v1/supplier/one/${id}`,
        values
      );

      if (response.data.message === "Successfully update card.") {
        toast.success("Successfully update supplier");
        setLoading(false);
        setReload(!reload);
        reset();
        setError("");
        navigate("/dashboard/supplier-list");
      }
    } catch (error) {
      if (error.response) {
        setLoading(false);
        setError(error.response.data.message);
      }
    }
  };

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
                  value={getSingleSuppliers.full_name}
                  onChange={(e) =>
                    setGetSingleSuppliers({
                      ...getSingleSuppliers,
                      full_name: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!getSingleSuppliers.full_name,
                  }}
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Phone Number "
                  id="Phone Number "
                  {...register("phone_number")}
                  value={getSingleSuppliers.phone_number}
                  onChange={(e) =>
                    setGetSingleSuppliers({
                      ...getSingleSuppliers,
                      phone_number: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!getSingleSuppliers.phone_number,
                  }}
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Email Address "
                  id="Email Address "
                  {...register("email")}
                  value={getSingleSuppliers.email}
                  onChange={(e) =>
                    setGetSingleSuppliers({
                      ...getSingleSuppliers,
                      email: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!getSingleSuppliers.email,
                  }}
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
                      value={getSingleSuppliers?.vendor}
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
                  value={getSingleSuppliers.shop_name}
                  onChange={(e) =>
                    setGetSingleSuppliers({
                      ...getSingleSuppliers,
                      shop_name: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!getSingleSuppliers.shop_name,
                  }}
                />
              </div>

              <div>
                <h3 className="text-xl font-bold">Address </h3>

                <TextField
                  className="productField"
                  fullWidth
                  label="Country "
                  {...register("country")}
                  value={getSingleSuppliers.country}
                  onChange={(e) =>
                    setGetSingleSuppliers({
                      ...getSingleSuppliers,
                      country: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!getSingleSuppliers.country,
                  }}
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Town/City "
                  {...register("city")}
                  value={getSingleSuppliers.city}
                  onChange={(e) =>
                    setGetSingleSuppliers({
                      ...getSingleSuppliers,
                      city: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!getSingleSuppliers.city,
                  }}
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Address "
                  {...register("address")}
                  value={getSingleSuppliers.address}
                  onChange={(e) =>
                    setGetSingleSuppliers({
                      ...getSingleSuppliers,
                      address: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!getSingleSuppliers.address,
                  }}
                />
                <div className="productField">
                <input
                  onChange={handleImageUpload}
                  type="file"
                  id="files"
                  className="hidden"
                />
                <label
                  htmlFor="files"
                  className="flex items-center justify-center cursor-pointer bg-[#42A1DA] text-white py-2 rounded-md "
                >
                  <span>
                    <FaCloudUploadAlt size={30} className="mr-2" />
                  </span>
                  {imageLoading ? (
                    <span>Uploading...</span>
                  ) : (
                    <>
                      {url || getSingleSuppliers.image ? (
                        <div>
                          {/* Check if url exists, if yes, render it */}
                          {url && (
                            <span className="overflow-hidden">
                              {url.slice(0, 4)}{/* Display only the first 4 characters */}
                              {url.slice(url.lastIndexOf('.'))} {/* Display file extension */}
                            </span>
                          )}
                          {/* Check if getSingleSuppliers.image exists, if yes, render it */}
                          {getSingleSuppliers.image && (
                            <span className="overflow-hidden">
                              {getSingleSuppliers.image.slice(0, 4)}{/* Display only the first 4 characters */}
                              {getSingleSuppliers.image.slice(getSingleSuppliers.image.lastIndexOf('.'))} {/* Display file extension */}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span>Upload Image</span>
                      )}
                    </>
                  )}
                </label>
              </div>
              
              </div>
            </div>
            <div className="text-start text-red-400 py-2">{error}</div>
            <div className="mt-2 savebtn">
              <button disabled={loading || imageLoading}>
                Update Supplier{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* <div className="w-full mt-5 mb-24">
        <div className="flex flex-wrap items-center justify-between mb-5">
          <h3 className="text-3xl font-bold text-center "> Supplier List: </h3>
          <div className="flex items-center mt-2 md:mt-0 ">
            {/**
          <button
            onClick={handleAllCustomer}
            className="mx-6 font-semibold cursor-pointer bg-[#42A1DA] px-2 py-1 rounded-md text-white"
          >
            All
          </button>
          */}
      {/* <input
              type="text"
              placeholder="Search"
              className="border py-2 px-3 rounded-md border-[#ddd]"
            />
            <button className="bg-[#42A1DA] text-white px-2 py-2 rounded-sm ml-1">
              {" "}
              <HiOutlineSearch size={25} />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto ">
          <table className="table ">
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
              <tr>
                <td>01</td>
                <td>Car </td>
                <td>BMW2343</td>
                <td>BDT1005</td>
                <td>
                  <div className="flex items-center justify-center ">
                    <Link to="/dashboard/Supplier-profile">
                      <FaUserTie className="invoicIcon" />
                    </Link>
                  </div>
                </td>
                <td>
                  <div className="editIconWrap edit">
                    <Link to="/dashboard/update-Supplier">
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
          </table> */}
      {/* </div>
      </div> */}
    </section>
  );
};

export default UpdateSupplier;
