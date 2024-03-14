/* eslint-disable no-unused-vars */
import "./AddJobCard.css";
import car from "../../../../public/assets/car2.jpeg";
import logo from "../../../../public/assets/logo.png";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FormControl, InputLabel, Select, TextField } from "@mui/material";
const UpdateJobCard = () => {
  const [carRegNo, setCarRegNo] = useState(null);
  const [vehicleCategory, setVehicleCategory] = useState(null);
  const [singleCard, setSingleCard] = useState({});
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState(false);
  const [dateSelect, setDateSelect] = useState(false);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`http://localhost:5000/api/v1/jobCard/one/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setSingleCard(data);
          setLoading(false);
        });
    }
  }, [id]);

  const onSubmit = async (data) => {
    const values = {
      username: singleCard.username,
      job_no: singleCard.job_no,
      date: formattedDate || singleCard.date,
      chassis_no: data.chassis_no || singleCard.chassis_no,
      carReg_no: carRegNo || singleCard.carReg_no,
      car_registration_no:
        data.car_registration_no || singleCard.car_registration_no,
      car_model: data.car_model || singleCard.car_model,
      car_make: data.car_make || singleCard.car_make,
      mileage: data.mileage || singleCard.mileage,
      color: data.color || singleCard.color,
      engine_no: data.engine_no || singleCard.engine_no,
      reference_name: data.reference_name || singleCard.reference_name,
      company_name: data.company_name || singleCard.company_name,
      vehicle_category: vehicleCategory || singleCard.vehicle_category,
      customer_name: data.customer_name || singleCard.customer_name,
      contact_number: data.contact_number || singleCard.contact_number,
      driver_name: data.driver_name || singleCard.driver_name,
      phone_number: data.phone_number || singleCard.phone_number,
      vehicle_interior_parts: value || singleCard.vehicle_interior_parts,
      reported_defect: value2 || singleCard.reported_defect,
      reported_action: value3 || singleCard.reported_action,
      vehicle_body_report:
        data.vehicle_body_report || singleCard.vehicle_body_report,
      technician_name: data.technician_name || singleCard.technician_name,
      technician_signature:
        data.technician_signature || singleCard.technician_signature,
      technician_date: data.technician_date || singleCard.technician_date,
      vehicle_owner: data.vehicle_owner || singleCard.vehicle_owner,
    };
    setLoading(true);
    const response = await axios.put(
      `http://localhost:5000/api/v1/jobCard/one/${id}`,
      values
    );
    if (response.data.message === "Successfully update card.") {
      navigate("/dashboard/addjob");
      setLoading(false);
    }
  };

  const handleDateChange = (event) => {
    const rawDate = event.target.value;
    const parsedDate = new Date(rawDate);
    const day = parsedDate.getDate().toString().padStart(2, "0");
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0");
    const year = parsedDate.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    setFormattedDate(formattedDate);
  };

  const handleSelectReg = () => {
    setSelect(true);
  };
  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <div className="addJobCardWraps">
      <div className=" mb-5 pb-5 mx-auto text-center border-b-2 border-[#42A1DA]">
        <div className="flex items-center justify-center">
          <img src={logo} alt="logo" className="w-[70px] md:w-[210px]" />
          <div className="invoiceHead">
            <h2 className="font-bold text-center  trustAuto word-sp">
              Trust Auto Solution{" "}
            </h2>
            <p className="text-sm ">
              It is trusted computerized Ogranizetion for all the kinds of
              vehicle check up & maintenance such as computerized Engine
              Analysis Engine tune up, Denting, Painting, Engine, AC, Electrical
              Works & Car Wash.
            </p>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="flex items-center justify-between my-5 ">
            <div>
              <b>
                Job No: <span className="requiredStart">*</span>{" "}
              </b>
              <span>{singleCard.job_no}</span>
            </div>
            <div className="vehicleCard">Update Job Card </div>
            <div>
              <b>
                Date <span className="requiredStart">*</span>{" "}
              </b>

              {!dateSelect && (
                <>
                  <div
                    onClick={() => setDateSelect(true)}
                    className="cursor-pointer "
                  >
                    {singleCard.date}{" "}
                  </div>
                </>
              )}

              {dateSelect && (
                <input
                  onChange={handleDateChange}
                  autoComplete="off"
                  type="date"
                  placeholder="Date"
                  defaultValue={singleCard.date}
                  max={currentDate}
                />
              )}
            </div>
          </div>
          <div className="jobCardFieldWraps">
            <div className="jobCardFieldLeftSide">
              <h3 className="mb-5 text-xl font-bold">Company Information </h3>
              <div>
                <TextField
                  {...register("chassis_no")}
                  className="addJobInputField"
                  label={singleCard.chassis_no}
                  defaultValue={singleCard.chassis_no}
                />
              </div>
              {/* <div className="flex items-center mt-3">
                {!select && !carRegNo && (
                  <div onClick={handleSelectReg} className="text-sm px-7">
                    {singleCard.carReg_no}
                  </div>
                )}
                {select && (
                  <FormControl className="productField">
							<InputLabel htmlFor="grouped-native-select">Car Registration No</InputLabel>
							<Select value={singleCard.carReg_no} onChange={(e) => setCarRegNo(e.target.value)}   id="grouped-native-select" label="Car Registration No  ">
              <option value="Reg">Car Registration No </option>
                    <option value="Reg">DM KHA</option>
                    <option value="Reg">DM KHA</option>
                    <option value="Reg">DM KHA</option>
							</Select>
             
						</FormControl>
                )}
            <TextField  label={singleCard.car_registration_no} />
              </div> */}
              <div className="flex items-center">
                <FormControl className="productField">
                  <InputLabel htmlFor="grouped-native-select">
                    Car Registration No
                  </InputLabel>
                  <Select
                    onChange={(e) => setCarRegNo(e.target.value)}
                    native
                    id="grouped-native-select"
                    label="Car Registration No"
                    value={singleCard.carReg_no}
                  >
                    <option value="select">Select Reg </option>
                    <option value="DM KHA">DM KHA</option>
                    <option value="DM KHA">DM KHA</option>
                    <option value="DM KHA">DM KHA</option>
                  </Select>
                </FormControl>
                <TextField label="Car R (T&N)" />
              </div>
              <div className="mt-3">
                <TextField
                  {...register("car_model")}
                  className="addJobInputField"
                  label={singleCard.car_registration_no}
                />
              </div>
              <div className="mt-3">
                <TextField
                  {...register("car_make")}
                  className="addJobInputField"
                  label={singleCard.vehicle_brand}
                />
              </div>
              <div className="mt-3">
                <TextField
                  {...register("mileage")}
                  className="addJobInputField"
                  label={singleCard.mileage}
                />
              </div>
              <div className="mt-3">
                <TextField
                  {...register("engine_no")}
                  className="addJobInputField"
                  label={singleCard.engine_no}
                />
              </div>
              <div className="mt-3">
                <TextField
                  {...register("color")}
                  className="addJobInputField"
                  label={singleCard.color}
                />
              </div>
              <div className="mt-3">
                <TextField
                  {...register("company_name")}
                  label={singleCard.company_name}
                  className="addJobInputField"
                />
              </div>
              <div className="mt-3">
                <FormControl className="addJobInputField">
                  <InputLabel htmlFor="grouped-native-select">
                    {" "}
                    Select Vehicle Category
                  </InputLabel>
                  {/* vvalue={
                  vehicleCategory
                    ? vehicleCategory
                    : singleCard.vehicle_category
                } */}
                  <Select
                    onChange={(e) => setVehicleCategory(e.target.value)}
                    id="grouped-native-select"
                    native
                    label=" Select Vehicle Category "
                  >
                    <option>Select Vehicle Category </option>
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
            </div>
            <div className="jobCardFieldRightSide">
              <h3 className="mb-5 text-xl font-bold ">Customer Information </h3>
              <div>
                <TextField
                  {...register("reference_name")}
                  label={singleCard.reference_name}
                  className="addJobInputField"
                />
              </div>
              <div className="mt-3">
                <TextField
                  {...register("customer_name")}
                  label={singleCard.customer_name}
                  className="addJobInputField"
                />
              </div>
              <div className="mt-3">
                <TextField
                  {...register("contact_number")}
                  label={singleCard.contact_number}
                  className="addJobInputField"
                />
              </div>
              <div className="mt-3">
                <TextField
                  {...register("driver_name")}
                  label={singleCard.driver_name}
                  className="addJobInputField"
                />
              </div>
              <div className="mt-3">
                <TextField
                  {...register("phone_number")}
                  label={singleCard.phone_number}
                  className="addJobInputField"
                />
              </div>
            </div>
          </div>
          <div className="mt-10 vehicleReport">
            <div className="vehicleReportLeftSide">
              <div className=" vehicleTextField">
                <b className="block mb-3">
                  {" "}
                  Vehicle Interior Parts, Papers, Tools, Meter Light & Others{" "}
                </b>
                <ReactQuill
                  value={value || singleCard.vehicle_interior_parts}
                  className="textEditor"
                  onChange={setValue}
                  modules={{
                    toolbar: [
                      [{ font: [] }],
                      [{ size: ["small", false, "large", "huge"] }],
                      [{ header: [1, 2, 3, 4, 5, 6, false] }],
                      [{ color: [] }, { background: [] }],
                      [{ align: [] }],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["bold", "italic", "underline"],
                      [{ align: [] }],
                      ["link", "image"],
                      ["video"],
                      ["clean"],
                      ["blockquote", "code-block"],
                      ["direction"],
                      ["formula"],
                      ["strike"],
                    ],
                  }}
                />
              </div>
              <div className="mt-5">
                <b className="block mb-1"> Reported Defect </b>
                <ReactQuill
                  value={value2 || singleCard.reported_defect}
                  className="textEditor"
                  onChange={setValue2}
                  modules={{
                    toolbar: [
                      [{ font: [] }],
                      [{ size: ["small", false, "large", "huge"] }],
                      [{ header: [1, 2, 3, 4, 5, 6, false] }],
                      [{ color: [] }, { background: [] }],
                      [{ align: [] }],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["bold", "italic", "underline"],
                      [{ align: [] }],
                    ],
                  }}
                />
              </div>
              <div className="mt-5">
                <b className="block mb-1"> Reported Action </b>
                <ReactQuill
                  value={value3 || singleCard.reported_action}
                  className="textEditor"
                  onChange={setValue3}
                  modules={{
                    toolbar: [
                      [{ font: [] }],
                      [{ size: ["small", false, "large", "huge"] }],
                      [{ header: [1, 2, 3, 4, 5, 6, false] }],
                      [{ color: [] }, { background: [] }],
                      [{ align: [] }],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["bold", "italic", "underline"],
                      [{ align: [] }],
                    ],
                  }}
                />
              </div>
            </div>
            <div className="vehicleReportRightSide">
              <b htmlFor="" className="block mb-3">
                {" "}
                Vehicle Body Report (Mark with X where damage )
              </b>
              <div className="mt-2 imgWrap">
                <img src={car} alt="car" />
              </div>
              <div className="mt-3">
                <h4 className="text-xl font-bold capitalize">Legend</h4>
                <div className="legend">
                  <ol>
                    <li>Scratch</li>
                    <li>Chip</li>
                    <li>Respainted</li>
                    <li>New Panel Filter </li>
                    <li>Scratch</li>
                  </ol>
                  <ol>
                    <li>Scratch</li>
                    <li>Chip</li>
                    <li>Respainted</li>
                    <li>New Panel Filter </li>
                    <li>Scratch</li>
                  </ol>
                </div>
              </div>
              <div className="mt-5">
                <b className="block mb-1 "> Vehicle Body Report Comments</b>
                <textarea
                  defaultValue={singleCard.vehicle_body_report}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="jobCardSingleForm">
            <div>
              <label>
                Technician Name <span className="requiredStart">*</span>{" "}
              </label>
              <input
                {...register("technician_name")}
                // name="tname"
                autoComplete="off"
                type="text"
                placeholder="Technician Name"
                defaultValue={singleCard.technician_name}
              />
            </div>
            <div>
              <label>
                Technician Signature <span className="requiredStart">*</span>{" "}
              </label>
              <input
                {...register("technician_signature")}
                // name="tsignature"
                className="registrationForm"
                autoComplete="off"
                type="text"
                placeholder="Technician Signature"
                defaultValue={singleCard.technician_signature}
              />
            </div>
            <div>
              <label>
                Date <span className="requiredStart">*</span>{" "}
              </label>
              <input
                {...register("technician_date")}
                autoComplete="off"
                type="date"
                placeholder="Date"
                defaultValue={singleCard.technician_date}
                min={currentDate}
              />
            </div>
            <div>
              <label>For Vehicle Owner</label>
              <input
                {...register("vehicle_owner")}
                // name="vehicleowner"
                autoComplete="off"
                type="text"
                placeholder="For Vehicle Owner"
                defaultValue={singleCard.vehicle_owner}
              />
            </div>
          </div>
          <div className="mt-3">
            <b>This is not an invoice, all estimates are valid for 30 days </b>
          </div>

          <div className="buttonGroup updateJobCardBtn">
            <div className="flex items-center justify-center submitQutationBtn">
              <button disabled={loading} type="submit" className="">
                Update Job Card{" "}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateJobCard;
