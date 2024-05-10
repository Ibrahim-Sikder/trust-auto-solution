/* eslint-disable react/prop-types */
import { useRef, useEffect } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "./datePicker.css";
const TADatePickers = ({ date, handleDateChange, selectedDate }) => {
  const datePickerRef = useRef(null);

  const parsedDate = new Date();
  const day = parsedDate.getDate().toString().padStart(2, "0");
  const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0");
  const year = parsedDate.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;

  useEffect(() => {
    flatpickr(datePickerRef.current, {
      dateFormat: "d-m-y",
      onChange: (dateStr) => {
        handleDateChange(dateStr); // Call handleDateChange with the new date string
      },
    });
  }, [handleDateChange]);

  return (
    <>
      <div className="flex items-center">
        <input
          className="border-2 border-gray-500 w-40 h-10 text-center rounded px-2 py-4"
          ref={datePickerRef}
          type="text"
          value={selectedDate || date || formattedDate}
          placeholder="Select Date "
        />
      </div>
    </>
  );
};

export default TADatePickers;
