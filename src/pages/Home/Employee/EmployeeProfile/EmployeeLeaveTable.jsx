import "../Employee.css";
import avatar from "../../../../../public/assets/avatar.jpg";
import "../Employee.css";
import { FaRegTrashAlt, FaUserEdit } from "react-icons/fa";

const EmployeeLeaveTable = () => {
  return (
    <div className="table-container">
      {" "}
      {/* Add a class to the table container */}
      <table className="leaveTable">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Leave Type</th>
            <th>From</th>
            <th>To</th>
            <th>No of Days </th>
            <th>Reason </th>
            <th>Status </th>
            <th colSpan={2}>Action </th>
          </tr>
        </thead>
        <tbody>
          <tr>
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
            <td>Casual Leave</td>
            <td>24 Feb 2019</td>
            <td>24 Feb 2019</td>
            <td>5 days </td>
            <td> Going to Hospital </td>
            <td> Approved </td>
            <td>
              {" "}
              <FaUserEdit className='text-[#60BF6B] cursor-pointer' size={25}/>{" "}
            </td>
            <td>
              {" "}
              <FaRegTrashAlt className='text-[#F62F52] cursor-pointer' size={22} />
            </td>
          </tr>
          <tr>
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
            <td>Casual Leave</td>
            <td>24 Feb 2019</td>
            <td>24 Feb 2019</td>
            <td>5 days </td>
            <td> Going to Hospital </td>
            <td> Approved </td>
            <td>
              {" "}
              <FaUserEdit className='text-[#60BF6B] cursor-pointer' size={25}/>{" "}
            </td>
            <td>
              {" "}
              <FaRegTrashAlt className='text-[#F62F52] cursor-pointer' size={22} />
            </td>
          </tr>
          <tr>
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
            <td>Casual Leave</td>
            <td>24 Feb 2019</td>
            <td>24 Feb 2019</td>
            <td>5 days </td>
            <td> Going to Hospital </td>
            <td> Approved </td>
            <td>
              {" "}
              <FaUserEdit className='text-[#60BF6B] cursor-pointer' size={25}/>{" "}
            </td>
            <td>
              {" "}
              <FaRegTrashAlt className='text-[#F62F52] cursor-pointer' size={22} />
            </td>
          </tr>
          <tr>
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
            <td>Casual Leave</td>
            <td>24 Feb 2019</td>
            <td>24 Feb 2019</td>
            <td>5 days </td>
            <td> Going to Hospital </td>
            <td> Approved </td>
            <td>
              {" "}
              <FaUserEdit className='text-[#60BF6B] cursor-pointer' size={25}/>{" "}
            </td>
            <td>
              {" "}
              <FaRegTrashAlt className='text-[#F62F52] cursor-pointer' size={22} />
            </td>
          </tr>
          <tr>
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
            <td>Casual Leave</td>
            <td>24 Feb 2019</td>
            <td>24 Feb 2019</td>
            <td>5 days </td>
            <td> Going to Hospital </td>
            <td> Approved </td>
            <td>
              {" "}
              <FaUserEdit className='text-[#60BF6B] cursor-pointer' size={25}/>{" "}
            </td>
            <td>
              {" "}
              <FaRegTrashAlt className='text-[#F62F52] cursor-pointer' size={22} />
            </td>
          </tr>
          <tr>
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
            <td>Casual Leave</td>
            <td>24 Feb 2019</td>
            <td>24 Feb 2019</td>
            <td>5 days </td>
            <td> Going to Hospital </td>
            <td> Approved </td>
            <td>
              {" "}
              <FaUserEdit className='text-[#60BF6B] cursor-pointer' size={25}/>{" "}
            </td>
            <td>
              {" "}
              <FaRegTrashAlt className='text-[#F62F52] cursor-pointer' size={22} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeLeaveTable;
