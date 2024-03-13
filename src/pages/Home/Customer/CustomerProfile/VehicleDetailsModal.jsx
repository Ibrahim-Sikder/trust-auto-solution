/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

const VehicleDetailsModal = ({ handleVehicleDetailsClose, getId }) => {
  const [showDataOnModal, setShowDataOnModal] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/vehicle/${getId}`)
      .then((res) => res.json())
      .then((data) => setShowDataOnModal(data));
  }, [getId]);

  console.log(showDataOnModal);

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
                  <span>TAS-456889</span>
                </div>
                <div className="flex items-center justify-between w-[300px] mt-2">
                  <b>Chassis No </b>
                  <span>456889</span>
                </div>
                <div className="flex items-center justify-between w-[300px] mt-2">
                  <b>Engine No & CC </b>
                  <span>456889</span>
                </div>
                <div className="flex items-center justify-between w-[300px] mt-2">
                  <b>Vehicle Brand </b>
                  <span>Volvo </span>
                </div>
                <div className="flex items-center justify-between w-[300px] mt-2">
                  <b>Vehicle Name </b>
                  <span>Toyota</span>
                </div>
                <div className="flex items-center justify-between w-[300px] mt-2">
                  <b>Vehicle Model </b>
                  <span>TAS-456889</span>
                </div>
                <div className="flex items-center justify-between w-[300px] mt-2">
                  <b>Vehicle Category </b>
                  <span>Sedans</span>
                </div>
                <div className="flex items-center justify-between w-[300px] mt-2">
                  <b>Color & Code </b>
                  <span>TAS-456889</span>
                </div>
                <div className="flex items-center justify-between w-[300px] mt-2">
                  <b>Mileage</b>
                  <span>TAS-456889</span>
                </div>
                <div className="flex items-center justify-between w-[300px] mt-2">
                  <b>Fuel Type </b>
                  <span>TAS-456889</span>
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
