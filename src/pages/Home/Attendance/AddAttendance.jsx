import { HiCheck, HiOutlineX } from "react-icons/hi";
import avatar from "../../../../public/assets/avatar.jpg";
import "./Attendance.css";
const AddAttendance = () => {
  const generateIcons = (totalCells, closePositions) => {
    const icons = [];
    let closeCounter = 0;
    for (let i = 0; i < totalCells; i++) {
      if (closePositions.includes(i + 1) && closeCounter < 7) {
        icons.push(
          <HiOutlineX
            key={`close_${i}`}
            size={20}
            className="text-[#F62D51] attendanceIcon"
          />
        );
        closeCounter++;
      } else {
        icons.push(
          <HiCheck
            key={`check_${i}`}
            className="text-[#4AB657] attendanceIcon "
            size={20}
          />
        );
      }
    }
    return icons;
  };

  // Define the positions where close icons should appear
  const closeIconPositions = [Math.floor(20 / 2), 1, 31]; // Middle, Second, Last

  return (
    <div className='pt-8 pb-20'>
    <div className="flex items-center justify-between my-3 mb-8">
    <div className="flex items-center justify-center ">
     
      <div className="ml-2">
        <h3 className="text-2xl font-bold"> Attendance </h3>{" "}
        <span> Dashboard / Attendance </span>{" "}
      </div>{" "}
    </div>{" "}

  </div>
      <div className=" attendanceWraps">
        <table className="attendanceInputTable">
          <thead>
            <tr>
              <th>SL No</th>
              <th>Name</th>
              <th>ID</th>
              <th>Designation</th>
              <th>Date</th>
              <th>Present</th>
              <th>Absence</th>
              <th>Office Time</th>
              <th>In Time</th>
              <th>Out Time</th>
              <th>Late</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>01</td>
              <td>Rakib</td>
              <td>04785</td>
              <td>Staff</td>
              <td>10-05-2024</td>
              <td>
                <input type="checkbox" className="border" />
              </td>
              <td>
                <input type="checkbox" className="border" />
              </td>
              <td>10.00</td>
              <td>
                <input type="number" className="border" />
              </td>
              <td>
                <input type="number" className="border" />
              </td>
              <td>
                <input type="number" className="border" />
              </td>
            </tr>
            <tr>
              <td>01</td>
              <td>Rakib</td>
              <td>04785</td>
              <td>Staff</td>
              <td>10-05-2024</td>
              <td>
                <input type="checkbox" className="border" />
              </td>
              <td>
                <input type="checkbox" className="border" />
              </td>
              <td>10.00</td>
              <td>
                <input type="number" className="border" />
              </td>
              <td>
                <input type="number" className="border" />
              </td>
              <td>
                <input type="number" className="border" />
              </td>
            </tr>
            <tr>
              <td>01</td>
              <td>Rakib</td>
              <td>04785</td>
              <td>Staff</td>
              <td>10-05-2024</td>
              <td>
                <input type="checkbox" className="border" />
              </td>
              <td>
                <input type="checkbox" className="border" />
              </td>
              <td>10.00</td>
              <td>
                <input type="number" className="border" />
              </td>
              <td>
                <input type="number" className="border" />
              </td>
              <td>
                <input type="number" className="border" />
              </td>
            </tr>
            <tr>
              <td>01</td>
              <td>Rakib</td>
              <td>04785</td>
              <td>Staff</td>
              <td>10-05-2024</td>
              <td>
                <input type="checkbox" className="border" />
              </td>
              <td>
                <input type="checkbox" className="border" />
              </td>
              <td>10.00</td>
              <td>
                <input type="number" className="border" />
              </td>
              <td>
                <input type="number" className="border" />
              </td>
              <td>
                <input type="number" className="border" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="table-container">
        <h3 className="mt-5 mb-8 text-2xl font-semibold">
          Today Attendance Sheet : March 2024
        </h3>
        <table className="attendanceTable">
          <thead>
            <tr>
              <th>Employee </th>
              <th>Employee ID </th>
              {[...Array(31).keys()].map((day) => (
                <th key={day}>
                  <div>
                    <span>March</span>
                    {day + 1}
                  </div>
                  <div className="flex">
                    <span className="mr-3 text-sm font-normal">
                      In Time: <b>12.30</b>{" "}
                    </span>
                    <span className="font-sans text-sm font-normal">
                      Out Time: <b>05.30</b>{" "}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(6).keys()].map((row) => (
              <tr key={row} className={row % 2 === 0 ? "even-row" : "odd-row"}>
                <td>
                  <div className="flex items-center">
                    <img
                      src={avatar}
                      className="object-cover w-8 h-8 mr-2 rounded-full"
                      alt=""
                    />
                    <span>Mr John</span>
                  </div>
                </td>
                <td>0002024</td>
                {/* Generating icons for each table cell */}
                {generateIcons(31, closeIconPositions).map((icon, index) => (
                  <td key={index}>
                    <span className="attendanceIcon">{icon}</span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddAttendance;
