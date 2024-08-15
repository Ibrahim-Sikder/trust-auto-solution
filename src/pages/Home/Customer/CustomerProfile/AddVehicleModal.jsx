/* eslint-disable react/prop-types */
import { IoCloseSharp } from "react-icons/io5";
import JobCardForm from "./JobCardForm";

const AddVehicleModal = ({ onClose, reload, setReload }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white shadow-md dark:bg-[#12141D] rounded-xl p-10 overflow-auto max-w-full md:w-[470px] lg:w-[870px] ">
        <div className="flex justify-end">
          <IoCloseSharp
            size={25}
            onClick={onClose}
            className="text-white rounded-full cursor-pointer bg-[#A0A0A0] p-1"
          />
        </div>

        <JobCardForm onClose={onClose} setReload={setReload} reload={reload} />
      </div>
    </div>
  );
};

export default AddVehicleModal;
