/* eslint-disable react/no-unescaped-entities */

import "./Practice.css";
import Practice2 from "./Practice2";
function PhoneNumberInput() {
  return (
    <div className="mt-10">
      <Practice2 />
      <div className=" ">
        <table>
          <caption className="caption-top">
            Table 3.1: Professional wrestlers and their signature moves.
          </caption>
          <thead>
            <tr>
              <th>Wrestler</th>
              <th>Signature Move(s)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>"Stone Cold" Steve Austin</td>
              <td>Stone Cold Stunner, Lou Thesz Press</td>
            </tr>
            <tr>
              <td>Bret "The Hitman" Hart</td>
              <td>The Sharpshooter</td>
            </tr>
            <tr>
              <td>Razor Ramon</td>
              <td>Razor's Edge, Fallaway Slam</td>
            </tr>
          </tbody>
        </table>
        <div className="grid">
          <select className="appearance-none row-start-1 col-start-1 bg-slate-50 dark:bg-slate-800 ...">
            <option>Yes</option>
            <option>No</option>
            <option>Maybe</option>
          </select>
          <svg className="pointer-events-none row-start-1 col-start-1 ..."></svg>
        </div>
        <button type="button" disabled className="cursor-not-allowed ...">
  Confirm
</button>
      </div>
    </div>
  );
}

export default PhoneNumberInput;
