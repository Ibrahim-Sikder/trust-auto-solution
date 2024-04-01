// import React from 'react';

// const NeedJobCardcode = () => {
//     return (
//         <div>
//              <div className="jobCardFieldWraps">
//             <div className="jobCardFieldRightSide">
//               <h3 className="mb-5 text-xl font-bold ">Customer Information </h3>
//               <div className="mt-3">
//                 <TextField
//                   className="addJobInputField"
//                   {...register("company_name")}
//                   label="Company Name (T)"
//                   defaultValue={singleCard.company_name}
//                   value={singleCard.company_name}
//                   onChange={(e) =>
//                     setSingleCard({
//                       ...singleCard,
//                       company_name: e.target.value,
//                     })
//                   }
//                   InputLabelProps={{
//                     shrink: !!singleCard.company_name,
//                   }}
//                 />
//               </div>
//               <div className="mt-3">
                
//                 <TextField
//                   className="addJobInputField"
//                   label="Vehicle User Name (T)"
//                   {...register("username")}
//                   defaultValue={singleCard?.username}
//                   focused={singleCard?.username}
//                 />
//                 {/* {errors.username && (
//               <span className="text-sm text-red-400">
//                 This field is required.
//               </span>
//             )} */}
//               </div>
//               <div className="mt-3">
//                 <TextField
//                   className="addJobInputField"
//                   label="Company Address (T)"
//                   {...register("company_address")}
//                   value={singleCard?.company_address}
//                   focused={singleCard?.company_address}
//                 />
//                 {/* {errors.company_address && (
//               <span className="text-sm text-red-400">
//                 This field is required.
//               </span>
//             )} */}
//               </div>

//               <div className="mt-3">
//                 <TextField
//                   className="addJobInputField"
//                   label="Customer Name (T)"
//                   {...register("customer_name")}
//                   value={singleCard?.customer_name}
//                   focused={singleCard?.customer_name}
//                 />
//                 {/* {errors.customer_name && (
//               <span className="text-sm text-red-400">
//                 This field is required.
//               </span>
//             )} */}
//               </div>
//               <div className="mt-3">
//                 <TextField
//                   className="addJobInputField"
//                   label="Customer Contact No (N)"
//                   {...register("customer_contact", {
//                     // required: "This field is required.",
//                     pattern: {
//                       value: /^\d{11}$/,
//                       message: "Please enter a valid number.",
//                     },
//                   })}
//                   value={singleCard?.customer_contact}
//                   focused={singleCard?.customer_contact}
//                 />
//                 {/* {errors.customer_contact && (
//               <span className="text-sm text-red-400">
//                 {errors.customer_contact.message}
//               </span>
//             )} */}
//               </div>
//               <div className="mt-3">
//                 <TextField
//                   className="addJobInputField"
//                   label="Customer Email Address (T)"
//                   {...register("customer_email")}
//                   type="email"
//                   value={singleCard?.customer_email}
//                   focused={singleCard?.customer_email}
//                 />
//                 {/* {errors.customer_email && (
//               <span className="text-sm text-red-400">
//                 This field is required.
//               </span>
//             )} */}
//               </div>
//               <div className="mt-3">
//                 <TextField
//                   className="addJobInputField"
//                   label="Customer Address (T) "
//                   {...register("customer_address")}
//                   value={singleCard?.customer_address}
//                   focused={singleCard?.customer_address}
//                 />
//                 {/* {errors.customer_address && (
//               <span className="text-sm text-red-400">
//                 This field is required.
//               </span>
//             )} */}
//               </div>
//               <div className="mt-3">
//                 <TextField
//                   className="addJobInputField"
//                   label="Driver Name (T)"
//                   {...register("driver_name")}
//                   value={singleCard?.driver_name}
//                   focused={singleCard?.driver_name}
//                 />
//                 {/* {errors.driver_name && (
//               <span className="text-sm text-red-400">
//                 This field is required.
//               </span>
//             )} */}
//               </div>
//               <div className="mt-3">
//                 <TextField
//                   className="addJobInputField"
//                   label="Driver Contact No (N)"
//                   {...register("driver_contact", {
//                     // required: "This field is required.",
//                     pattern: {
//                       value: /^\d{11}$/,
//                       message: "Please enter a valid number.",
//                     },
//                   })}
//                   value={singleCard?.driver_contact}
//                   focused={singleCard?.driver_contact}
//                 />
//                 {/* {errors.driver_contact && (
//               <span className="text-sm text-red-400">
//                 {errors.driver_contact.message}
//               </span>
//             )} */}
//               </div>
//               <div className="mt-3">
//                 <TextField
//                   className="addJobInputField"
//                   label="Reference Name (T) "
//                   {...register("reference_name")}
//                   value={singleCard?.reference_name}
//                   focused={singleCard?.reference_name}
//                 />
//                 {/* {errors.reference_name && (
//               <span className="text-sm text-red-400">
//                 This field is required.
//               </span>
//             )} */}
//               </div>
//             </div>

//             <div className="jobCardFieldLeftSide lg:mt-0 mt-5">
//               <h3 className="mb-5 text-xl font-bold">Vehicle Information </h3>

//               <div className="flex items-center mt-3 ">
//                 <Autocomplete
//                   className="jobCardSelect"
//                   id="free-solo-demo"
//                   Car
//                   Registration
//                   No
//                   options={cmDmOptions.map((option) => option.label)}
//                   renderInput={(params) => (
//                     <TextField
//                       {...params}
//                       label="Vehicle Reg No"
//                       {...register("carReg_no")}
//                       value={singleCard?.carReg_no}
//                       focused={singleCard?.carReg_no}
//                     />
//                   )}
//                 />
//                 <TextField
//                   className="jobCardSelect2"
//                   label="Car R (T&N)"
//                   {...register("car_registration_no")}
//                   value={singleCard?.car_registration_no}
//                   focused={singleCard?.car_registration_no}
//                 />
//               </div>

//               {/* {errors.car_registration_no && (
//                 <span className="text-sm text-red-400">
//                   This field is required.
//                 </span>
//               )} */}

//               <div className="mt-3">
//                 <TextField
//                   className="addJobInputField"
//                   {...register("chassis_no")}
//                   label="Chassis No (T&N)"
//                   value={singleCard?.chassis_no}
//                   focused={singleCard?.chassis_no}
//                 />
//                 {/* {errors.chassis_no && (
//                   <span className="text-sm text-red-400">
//                     This field is required.
//                   </span>
//                 )} */}
//               </div>
//               <div className="mt-3">
//                 <TextField
//                   className="addJobInputField"
//                   {...register("engine_no")}
//                   label="ENGINE NO & CC (T&N) "
//                   value={singleCard?.engine_no}
//                   focused={singleCard?.engine_no}
//                 />
//                 {/* {errors.engine_no && (
//                   <span className="text-sm text-red-400">
//                     This field is required.
//                   </span>
//                 )} */}
//               </div>

//               <div className="mt-3">
//                 <Autocomplete
//                   className="addJobInputField"
//                   id="free-solo-demo"
//                   Vehicle
//                   Brand
//                   onInputChange={handleBrandChange}
//                   options={carBrands.map((option) => option.label)}
//                   renderInput={(params) => (
//                     <TextField
//                       {...params}
//                       label="Vehicle Brand"
//                       {...register("vehicle_brand")}
//                       value={singleCard?.vehicle_brand}
//                       focused={singleCard?.vehicle_brand}
//                     />
//                   )}
//                 />
//                 {/* {errors.vehicle_brand && !brand && (
//                   <span className="text-sm text-red-400">
//                     This field is required.
//                   </span>
//                 )} */}
//               </div>

//               <div className="mt-3">
//                 <Autocomplete
//                   className="addJobInputField"
//                   id="free-solo-demo"
//                   Vehicle
//                   Brand
//                   onInputChange={handleBrandChange}
//                   options={vehicleName.map((option) => option.label)}
//                   renderInput={(params) => (
//                     <TextField
//                       {...params}
//                       label="Vehicle Name "
//                       {...register("vehicle_name")}
//                       value={singleCard?.vehicle_name}
//                       focused={singleCard?.vehicle_name}
//                     />
//                   )}
//                 />
//                 {/* {errors.vehicle_brand && !brand && (
//                 <span className="text-sm text-red-400">
//                   This field is required.
//                 </span>
//               )} */}
//               </div>

//               {/** 
//               <div className="mt-3">
//                 <TextField
//                   className="addJobInputField"
//                   onChange={(e) => setCarModel(e.target.value)}
//                   label="Vehicle Model (N)"
//                 />
//               </div>
//               */}

//               <div className="mt-3">
//                 {/* <Autocomplete
//                 className="addJobInputField"
//                   onChange={(e) => setCarModel(e.target.value)}
//                   id="free-solo-demo"
//                   Vehicle
//                   Brand
//                   options={totalYear.map((option) => option.title)}
//                   renderInput={(params) => (
//                     <TextField {...params} label=" Vehicle Model" />
//                   )}
//                 /> */}
//                 <TextField
//                   className="addJobInputField"
//                   label="Vehicle Model (N)"
//                   {...register("vehicle_model", {
//                     // required: "This field is required.",
//                     pattern: {
//                       value: /^\d+$/,
//                       message: "Please enter a valid model number.",
//                     },
//                   })}
//                   value={singleCard?.vehicle_model}
//                   focused={singleCard?.vehicle_model}
//                 />

//                 {/* {errors.vehicle_model && (
//                   <span className="text-sm text-red-400">
//                     {errors.vehicle_model.message}
//                   </span>
//                 )} */}
//               </div>

//               <div className="mt-3">
//                 <Autocomplete
//                   className="addJobInputField"
//                   id="free-solo-demo"
//                   Vehicle
//                   Types
//                   onInputChange={handleCategoryChange}
//                   options={vehicleTypes.map((option) => option.label)}
//                   renderInput={(params) => (
//                     <TextField
//                       {...params}
//                       label=" Vehicle Categories "
//                       {...register("vehicle_category")}
//                       value={singleCard?.vehicle_category}
//                       focused={singleCard?.vehicle_category}
//                     />
//                   )}
//                 />
//                 {/* {errors.vehicle_category && !category && (
//                   <span className="text-sm text-red-400">
//                     This field is required.
//                   </span>
//                 )} */}
//               </div>
//               <div className="mt-3">
//                 <TextField
//                   className="addJobInputField"
//                   {...register("color_code")}
//                   label="Color & Code (T&N) "
//                   value={singleCard?.color_code}
//                   focused={
//                     singleCard?.color_code !== "" && singleCard?.color_code
//                   }
//                 />
//                 {/* {errors.color_code && (
//                   <span className="text-sm text-red-400">
//                     This field is required.
//                   </span>
//                 )} */}
//               </div>
//               <div className="mt-3">
//                 <TextField
//                   className="addJobInputField"
//                   label="Mileage (N) "
//                   {...register("mileage", {
//                     // required: "This field is required.",
//                     pattern: {
//                       value: /^\d+$/,
//                       message: "Please enter a valid number.",
//                     },
//                   })}
//                   value={singleCard?.mileage}
//                   focused={singleCard?.mileage}
//                 />
//                 {/* {errors.mileage && (
//                   <span className="text-sm text-red-400">
//                     {errors.mileage.message}
//                   </span>
//                 )} */}
//               </div>
//               <div className="mt-3">
//                 <Autocomplete
//                   className="addJobInputField"
//                   value={singleCard?.fuel_type}
//                   focused={singleCard?.fuel_type}
//                   id="free-solo-demo"
//                   Fuel
//                   Type
//                   onInputChange={handleFuelChange}
//                   options={fuelType.map((option) => option.label)}
//                   renderInput={(params) => (
//                     <TextField
//                       {...params}
//                       label=" Fuel Type"
//                       {...register("fuel_type")}
//                       value={singleCard?.fuel_type}
//                       focused={singleCard?.fuel_type}
//                     />
//                   )}
//                 />
//                 {/* {errors.fuel_type && !getFuelType && (
//                   <span className="text-sm text-red-400">
//                     This field is required.
//                   </span>
//                 )} */}
//               </div>
//             </div>
//           </div>
//         </div>
//     );
// };

// export default NeedJobCardcode;