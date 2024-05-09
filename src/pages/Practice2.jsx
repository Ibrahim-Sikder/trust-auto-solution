import { useState } from "react";

const Practice2 = () => {
  const [countryCode, setCountryCode] = useState("+880");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Handle changes in the phone number input
  const handlePhoneNumberChange = (e) => {
    const newPhoneNumber = e.target.value;
    // Allow only numeric input, prevent the number from starting with '0', and restrict to 11 digits
    // Ensures that the first character is not '0' if the length of the number is 1 or more
    if (/^\d*$/.test(newPhoneNumber) && newPhoneNumber.length <= 11 && (newPhoneNumber === '' || (!newPhoneNumber.startsWith('0') || newPhoneNumber.length > 1))) {
      setPhoneNumber(newPhoneNumber);
    }
  };

  return (
    <div>
      <select
        value={countryCode}
        onChange={(e) => {
          setCountryCode(e.target.value);
          setPhoneNumber("");  // Reset the phone number when changing country codes
        }}
      >
      <option value="+880">BD (+880)</option>
        <option value="+1">USA (+1)</option>
        <option value="+91">IND (+91)</option>
        <option value="+92">PAK (+92)</option>
        <option value="+93">AFG (+93)</option>
        <option value="+94">LKA (+94)</option>
        <option value="+95">MMR (+95)</option>
        <option value="+86">CHN (+86)</option>
        <option value="+81">JPN (+81)</option>
        <option value="+82">KOR (+82)</option>
        <option value="+66">THA (+66)</option>
        <option value="+60">MYS (+60)</option>
        <option value="+65">SGP (+65)</option>
        <option value="+63">PHL (+63)</option>
        <option value="+62">IDN (+62)</option>
        
        <option value="+976">MNG (+976)</option>
        <option value="+977">NPL (+977)</option>
        <option value="+855">KHM (+855)</option>
        <option value="+856">LAO (+856)</option>
        <option value="+998">UZB (+998)</option>
        <option value="+992">TJK (+992)</option>
        <option value="+994">AZE (+994)</option>
        <option value="+995">GEO (+995)</option>
        <option value="+7">RUS/KAZ (+7)</option>
      </select>
      <div style={{ display: 'flex', alignItems: 'center' }}>
       
        <input
          className="border ml-2" 
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          placeholder="Enter phone number"
        />
      </div>
    </div>
  );
};

export default Practice2;
