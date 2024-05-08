/* eslint-disable react/prop-types */
import Select from "react-select";
import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

const leaves = [
  { value: "Select Leave ", label: "Select Leave " },
  { value: "Casual Leave", label: "Casual Leave " },
  { value: "Annual Leave ", label: "Annual Leave " },
];

const initialSelectedOption = leaves[0];
const RequestLeaveModal = ({ onClose }) => {
  const [selectedOption, setSelectedOption] = useState(initialSelectedOption);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    
  };

  return (
    <div className="fixed top-0 left-0 z-50 w-screen h-screen bg-black/60 backdrop-blur-sm ">
      <div className="relative left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-full md:w-[470px]  lg:max-w-[984px]  h-[800px] overflow-auto ">
        <div className="bg-white shadow-md dark:bg-[#12141D] rounded-xl  overflow-hidden p-10">
          <div className="flex justify-end ">
            <IoCloseSharp
              size={25}
              onClick={onClose}
              width={24}
              height={24}
              className="text-white rounded-full cursor-pointer top-10 right-10 bg-[#A0A0A0] p-1"
            />
          </div>
          <h2 className="text-sm md:text-xl font-semibold text-center ">Request Leave </h2>
          <div>
            <div className="flex">
              <label className="block mb-1"> Leave Types </label>
              <span className="ml-1 text-red-600">*</span>
            </div>
            <Select
              value={selectedOption}
              onChange={handleChange}
              options={leaves}
            />

            <div className="mt-4">
              <div className="flex">
                <label className="block mb-1">From</label>
                <span className="ml-1 text-red-600">*</span>
              </div>

              <input
                type="date"
                className="w-full border-2-[#ddd] border p-2 rounded-sm "
              />
            </div>
            <div className="mt-4">
              <div className="flex">
                <label className="block mb-1">To</label>
                <span className="ml-1 text-red-600">*</span>
              </div>

              <input
                type="date"
                className="w-full border-2-[#ddd] border p-2 rounded-sm "
              />
            </div>
            <div className="mt-4">
              <div className="flex">
                <label className="block mb-1">No of days </label>
                <span className="ml-1 text-red-600">*</span>
              </div>

              <input
                type="text"
                className="w-full border-2-[#ddd] border p-2 rounded-sm bg-[#E9ECEF]"
              />
            </div>
            <div className="mt-4">
              <div className="flex">
                <label className="block mb-1">Remaining Leaves </label>
                <span className="ml-1 text-red-600">*</span>
              </div>

              <input
                type="text"
                className="w-full border-2-[#ddd] border p-2 rounded-sm bg-[#E9ECEF]"
              />
            </div>
            <div className="mt-4">
              <div className="flex">
                <label className="block mb-1">Remaining Leaves Reason </label>
                <span className="ml-1 text-red-600">*</span>
              </div>

              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                className="border-2-[#ddd] border w-full h-[70px] rounded-sm resize-none p-2"
              ></textarea>
            </div>
            <div className="mt-3 text-center">
              <button className="border-2-[#ddd] border rounded-2xl w-52 h-12 mx-auto  bg-[#FF851A] text-white ">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestLeaveModal;
