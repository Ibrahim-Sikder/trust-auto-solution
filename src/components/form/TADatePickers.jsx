import { useRef, useEffect } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css"; 
import './datePicker.css'
const TADatePickers = () => {
  const datePickerRef = useRef(null);

  useEffect(() => {
    flatpickr(datePickerRef.current, {
      dateFormat: "d-m-y",
    });
  }, []);

  return (
    <>
      <div className=" flex items-center">
      <input
        className="border w-28 h-10 text-center rounded-full "
        ref={datePickerRef}
        type="text"
        placeholder="Select Date "
      />
     
      </div>
    </>
  );
};

export default TADatePickers;
