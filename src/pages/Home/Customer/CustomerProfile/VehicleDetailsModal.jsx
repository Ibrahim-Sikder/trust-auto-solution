/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

const VehicleDetailsModal = ({ handleVehicleDetailsClose, getId }) => {
  const [showDataOnModal, setShowDataOnModal] = useState({});

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/v1/vehicle/one/${getId}`)
      .then((res) => res.json())
      .then((data) => setShowDataOnModal(data));
  }, [getId]);

 
 
  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-black/60 ">
      <div className="relative left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[420px] sm:max-w-[600px] lg:max-w-[500px] p-4 max-h-[90vh] overflow-auto">
        <div className="bg-white shadow-md dark:bg-[#12141D] rounded-2xl  overflow-hidden">
          <IoCloseSharp
            size={35}
            onClick={handleVehicleDetailsClose}
            width={24}
            height={24}
            className="text-red-600 absolute top-10 right-10 cursor-pointer"
          />
          <div className=" flex items-center py-8 px-10 text-sm  ">
            <div>
              <h2 className="text-2xl font-semibold">Vehicle Details </h2>
              <div className="mt-5">
                <div className="flex items-center justify-between w-full ">
                  <b>Car Registration No </b>
                  <span>{showDataOnModal?.car_registration_no}</span>
                </div>
                <div className="flex items-center justify-between w-[300px] mt-2">
                  <b>Chassis No </b>
                  <span> {showDataOnModal?.chassis_no}</span>
                </div>
                <div className="flex items-center justify-between w-[300px] mt-2">
                  <b>Engine No & CC </b>
                  <span>{showDataOnModal?.engine_no}</span>
                </div>
                <div className="flex items-center justify-between w-[300px] mt-2">
                  <b>Vehicle Brand </b>
                  <span>{showDataOnModal?.vehicle_brand} </span>
                </div>
                <div className="flex items-center justify-between w-[300px] mt-2">
                  <b>Vehicle Name </b>
                  <span>{showDataOnModal?.vehicle_name}</span>
                </div>
                <div className="flex items-center justify-between w-[300px] mt-2">
                  <b>Vehicle Model </b>
                  <span>{showDataOnModal?.vehicle_model}</span>
                </div>
                <div className="flex items-center justify-between w-[300px] mt-2">
                  <b>Vehicle Category </b>
                  <span>{showDataOnModal?.vehicle_category}</span>
                </div>
                <div className="flex items-center justify-between w-[300px] mt-2">
                  <b>Color & Code </b>
                  <span>{showDataOnModal?.color_code}</span>
                </div>
                <div className="flex items-center justify-between w-[300px] mt-2">
                  <b>Mileage</b>
                  <span>{showDataOnModal?.mileage}</span>
                </div>
                <div className="flex items-center justify-between w-[300px] mt-2">
                  <b>Fuel Type </b>
                  <span>{showDataOnModal?.fuel_type}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailsModal;
