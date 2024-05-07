import { useState } from "react";

const Practice2 = () => {
  const [countryCode, setCountryCode] = useState("+880");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Handle changes in the phone number input
  const handlePhoneNumberChange = (e) => {
    const fullValue = e.target.value;
    const numericPart = fullValue.slice(countryCode.length + 1);
    if (/^\d*$/.test(numericPart) && numericPart.length <= 11) {
      setPhoneNumber(numericPart);
    }
  };

  return (
    <div>
      <select
        value={countryCode}
        onChange={(e) => {
          setCountryCode(e.target.value);
          setPhoneNumber("");
        }}
      >
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
        <option value="+880">BGD (+880)</option>
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
      <input
        className="border"
        type="tel"
        value={`${countryCode} ${phoneNumber}`}
        onChange={handlePhoneNumberChange}
        placeholder="Enter phone number"
      />
    </div>
  );
};

export default Practice2;
