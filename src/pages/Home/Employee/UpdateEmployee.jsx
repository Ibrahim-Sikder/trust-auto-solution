/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-no-undef */

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaUsers, FaCloudUploadAlt } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateEmployee = () => {
  const [url, setUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [getSingleEmployee, setGetSingleEmployee] = useState({});
 
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
      .get(`${import.meta.env.VITE_API_URL}/api/v1/employee/one/${id}`)
      .then((response) => {
        setGetSingleEmployee(response.data.employee);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [reload, id]);


  function isImage(url) {
    return /\.(jpg|jpeg|png)$/i.test(url);
}

function getFileName(url) {
  return url.split('/').pop().split('.')[0]; // Extract only the file name without extension
}


  const handleImageUpload = async (e) => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      setImageLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/uploads`, {
        method: "POST",
        body: formData,
      });

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
        employeeId: getSingleEmployee.employeeId,
        full_name: data.full_name || getSingleEmployee.full_name,
        date_of_birth: data.date_of_birth || getSingleEmployee.date_of_birth,
        nid_number: data.nid_number || getSingleEmployee.nid_number,
        blood_group: data.blood_group || getSingleEmployee.blood_group,
        phone_number: data.phone_number || getSingleEmployee.phone_number,
        email: data.email || getSingleEmployee.email,
        gender: data.gender || getSingleEmployee.gender,
        join_date: data.join_date || getSingleEmployee.join_date,
        designation: data.designation || getSingleEmployee.designation,
        status: data.status || getSingleEmployee.status,
        password: data.password || getSingleEmployee.password,
        confirm_password:
          data.confirm_password || getSingleEmployee.confirm_password,
        father_name: data.father_name || getSingleEmployee.father_name,
        mother_name: data.mother_name || getSingleEmployee.mother_name,
        nationality: data.nationality || getSingleEmployee.nationality,
        religion: data.religion || getSingleEmployee.religion,

        country: data.country || getSingleEmployee.country,
        city: data.city || getSingleEmployee.city,
        address: data.address || getSingleEmployee.address,
        image: url ? url : getSingleEmployee.image,
      };

      setLoading(true);
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/employee/one/${id}`,
        values
      );

      if (response.data.message === "Successfully update card.") {
        toast.success("Successfully update card.");
        setLoading(false);
        setReload(!reload);
        navigate("/dashboard/employee-list");
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
              <h3 className="text-2xl font-bold"> Update Employee </h3>
              <span> Update Employee </span>
            </div>
          </div>
          <div className="productHome">
            <span>Home / </span>
            <span>Product / </span>
            <span>Update Employee </span>
          </div>
        </div>

        <div className="addProductWrap">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex">
              <div>
                <h3 className="text-xl font-bold">Personal Info </h3>
                <TextField
                  className="productField"
                  fullWidth
                  {...register("full_name")}
                  label="Full Name"
                  defaultValue={getSingleEmployee.full_name}
                  value={getSingleEmployee.full_name}
                  onChange={(e) =>
                    setGetSingleEmployee({
                      ...getSingleEmployee,
                      full_name: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!getSingleEmployee.full_name,
                  }}
                />

                <TextField
                  className="productField"
                  fullWidth
                  label="Date of Birth"
                  {...register("date_of_birth")}
                  defaultValue={getSingleEmployee.date_of_birth}
                  value={getSingleEmployee.date_of_birth}
                  onChange={(e) =>
                    setGetSingleEmployee({
                      ...getSingleEmployee,
                      date_of_birth: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!getSingleEmployee.date_of_birth,
                  }}
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="NID Number"
                  {...register("nid_number")}
                  defaultValue={getSingleEmployee.nid_number}
                  value={getSingleEmployee.nid_number}
                  onChange={(e) =>
                    setGetSingleEmployee({
                      ...getSingleEmployee,
                      nid_number: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!getSingleEmployee.nid_number,
                  }}
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Blood Group "
                  {...register("blood_group")}
                  defaultValue={getSingleEmployee.blood_group}
                  value={getSingleEmployee.blood_group}
                  onChange={(e) =>
                    setGetSingleEmployee({
                      ...getSingleEmployee,
                      blood_group: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!getSingleEmployee.blood_group,
                  }}
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Phone Number "
                  id="Phone Number "
                  {...register("phone_number")}
                  defaultValue={getSingleEmployee.phone_number}
                  value={getSingleEmployee.phone_number}
                  onChange={(e) =>
                    setGetSingleEmployee({
                      ...getSingleEmployee,
                      phone_number: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!getSingleEmployee.phone_number,
                  }}
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Email Address "
                  id="Email Address "
                  {...register("email")}
                  defaultValue={getSingleEmployee.email}
                  value={getSingleEmployee.email}
                  onChange={(e) =>
                    setGetSingleEmployee({
                      ...getSingleEmployee,
                      email: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!getSingleEmployee.email,
                  }}
                />
                <FormControl className="productField">
                  <InputLabel htmlFor="grouped-native-select">
                    Gender
                  </InputLabel>
                  <Select
                    className=""
                    native
                    id="grouped-native-select"
                    label="Gender"
                    {...register("gender")}
                    defaultValue={getSingleEmployee.gender}
                    value={getSingleEmployee.gender}
                    onChange={(e) =>
                      setGetSingleEmployee({
                        ...getSingleEmployee,
                        gender: e.target.value,
                      })
                    }
                    InputLabelProps={{
                      shrink: !!getSingleEmployee.gender,
                    }}
                  >
                    <option>Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Select>
                </FormControl>

                <TextField
                  className="productField"
                  fullWidth
                  label="Join Date  "
                  id="Join Date  "
                  {...register("join_date")}

                  defaultValue={getSingleEmployee.join_date}
                  value={getSingleEmployee.join_date}
                  onChange={(e) =>
                    setGetSingleEmployee({
                      ...getSingleEmployee,
                      join_date: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!getSingleEmployee.join_date,
                  }}

                />

                <TextField
                  className="productField"
                  fullWidth
                  label="Designation  "
                  id="Designation  "
                  {...register("designation")}

                  defaultValue={getSingleEmployee.designation}
                  value={getSingleEmployee.designation}
                  onChange={(e) =>
                    setGetSingleEmployee({
                      ...getSingleEmployee,
                      designation: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!getSingleEmployee.designation,
                  }}

                />

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Select Status
                  </InputLabel>
                  <Select
                    className="productField"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Select Status"
                    {...register("status")}

                    defaultValue={getSingleEmployee.status}
                    value={getSingleEmployee.status}
                    onChange={(e) =>
                      setGetSingleEmployee({
                        ...getSingleEmployee,
                        status: e.target.value,
                      })
                    }
                    InputLabelProps={{
                      shrink: !!getSingleEmployee.status,
                    }}

                    
                  >
                    <MenuItem>Select</MenuItem>
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  className="productField"
                  fullWidth
                  label="Password"
                  id="Password"
                  {...register("password")}

                  defaultValue={getSingleEmployee.password}
                  value={getSingleEmployee.password}
                  onChange={(e) =>
                    setGetSingleEmployee({
                      ...getSingleEmployee,
                      password: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!getSingleEmployee.password,
                  }}

                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Confirm Password "
                  id="Confirm Password  "
                  {...register("confirm_password")}
                  defaultValue={getSingleEmployee.confirm_password}
                  value={getSingleEmployee.confirm_password}
                  onChange={(e) =>
                    setGetSingleEmployee({
                      ...getSingleEmployee,
                      confirm_password: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!getSingleEmployee.confirm_password,
                  }}


                />
              </div>

              <div>
                <h3 className="text-xl font-bold">Family Address </h3>
                <TextField
                  className="productField"
                  fullWidth
                  label="Father Name "
                  {...register("father_name")}

                  defaultValue={getSingleEmployee.father_name}
                  value={getSingleEmployee.father_name}
                  onChange={(e) =>
                    setGetSingleEmployee({
                      ...getSingleEmployee,
                      father_name: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!getSingleEmployee.father_name,
                  }}

                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Mother Name "
                  {...register("mother_name")}
                  defaultValue={getSingleEmployee.mother_name}
                  value={getSingleEmployee.mother_name}
                  onChange={(e) =>
                    setGetSingleEmployee({
                      ...getSingleEmployee,
                      mother_name: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!getSingleEmployee.mother_name,
                  }}
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Nationality"
                  {...register("nationality")}
                  defaultValue={getSingleEmployee.nationality}
                  value={getSingleEmployee.nationality}
                  onChange={(e) =>
                    setGetSingleEmployee({
                      ...getSingleEmployee,
                      nationality: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!getSingleEmployee.nationality,
                  }}
                />

                <TextField
                  className="productField"
                  fullWidth
                  label="Religion"
                  {...register("religion")}
                  defaultValue={getSingleEmployee.religion}
                  value={getSingleEmployee.religion}
                  onChange={(e) =>
                    setGetSingleEmployee({
                      ...getSingleEmployee,
                      religion: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!getSingleEmployee.religion,
                  }}
                />

                <TextField
                  className="productField"
                  fullWidth
                  label="Country "
                  {...register("country")}
                  defaultValue={getSingleEmployee.country}
                  value={getSingleEmployee.country}
                  onChange={(e) =>
                    setGetSingleEmployee({
                      ...getSingleEmployee,
                      country: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!getSingleEmployee.country,
                  }}
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Town/City "
                  {...register("city")}
                  defaultValue={getSingleEmployee.city}
                  value={getSingleEmployee.city}
                  onChange={(e) =>
                    setGetSingleEmployee({
                      ...getSingleEmployee,
                      city: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!getSingleEmployee.city,
                  }}
                />
                <TextField
                  className="productField"
                  fullWidth
                  label="Local Address "
                  {...register("address")}
                  defaultValue={getSingleEmployee.address}
                  value={getSingleEmployee.address}
                  onChange={(e) =>
                    setGetSingleEmployee({
                      ...getSingleEmployee,
                      address: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: !!getSingleEmployee.address,
                  }}
                />
                {!imageLoading && (
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
                          {url || getSingleEmployee.image ? (
                              <div>
                                  {url && isImage(url) && (
                                      <span className=" overflow-hidden">{getFileName(url)}</span>
                                  )}
              
                                  {getSingleEmployee.image && isImage(getSingleEmployee.image) && (
                                      <span className=" overflow-hidden">{getFileName(getSingleEmployee.image)}</span>
                                  )}
                              </div>
                          ) : (
                              <span>Upload Image</span>
                          )}
                      </label>
                  </div>
              )}
              
              </div>
            </div>
            <div className="text-sm text-red-400 py-2">{error}</div>
            <div className="savebtn mt-2 ">
              <button disabled={loading || imageLoading}>
                Update Employee{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdateEmployee;
