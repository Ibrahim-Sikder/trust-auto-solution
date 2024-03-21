import { NotificationAdd } from "@mui/icons-material";
import { FaEye, FaFileInvoice, FaTrashAlt } from "react-icons/fa";
import { FaUserGear } from "react-icons/fa6";
import { TiEdit } from "react-icons/ti";
import { Link } from "react-router-dom";
const Expense = () => {
  return (
    <>
    <div className="flex justify-end pb-3 mt-5 border-b-2">
        
        <div className="flex items-end justify-end">
          <NotificationAdd size={30} className="mr-2" />
          <FaUserGear size={30} />
        </div>
      </div>
    <div className="flex items-center justify-between mt-5 mb-8">
    <div className="flex items-center justify-center ">
      <FaFileInvoice className="invoicIcon" />
      <div className="ml-2">
        <h3 className="text-2xl font-bold"> Expense </h3>
        <span>Manage Expense </span>
      </div>
    </div>
    <button className="quotationBtn">Add Expense </button>
  </div>
    <div className="w-full mt-5 mb-24">
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-3xl font-bold text-center "> Expense List: </h3>
      </div>

      <div className="flex items-center">
        <div className="searchGroup">
          <input autoComplete="off" type="text" />
        </div>
        <button className="SearchBtn ">Search </button>
      </div>
    </div>

    <div className="overflow-x-auto ">
      <table className="table ">
        <thead className="tableWrap">
          <tr>
            <th>SL</th>
            <th>Expense Category </th>
            <th>Sub Category </th>
            <th>Expense For </th>
            <th>Total Amount </th>
            <th>Payment Method </th>
            <th colSpan={3}>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>01</td>
            <td>Month </td>
            <td>Salary </td>
            <td>Electricity </td>
            <td>595995</td>
            <td>Card</td>
            <td>
              <div className="editIconWrap edit">
                <FaEye className="editIcon" />
              </div>
            </td>
            <td>
              <div className="editIconWrap edit">
                <Link to="/dashboard/update-expense">
                  <TiEdit className="editIcon" />
                </Link>
              </div>
            </td>
            <td>
              <div className="editIconWrap">
                <FaTrashAlt className="deleteIcon" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
    </>
  );
};

export default Expense;
