import { FaTrashAlt, FaEdit, FaEye, FaFileInvoice } from "react-icons/fa";
import "./Product.css";
import img from "../../../../public/assets/service2.png";
import { Link } from "react-router-dom";
import { NotificationAdd } from "@mui/icons-material";
import { FaUserGear } from "react-icons/fa6";

const Product = () => {
  return (
    <div className="w-full mt-5 mb-24">
      <div className="flex justify-between pb-3 border-b-2">
        <div className="flex items-center mr-[80px]  justify-center topProductBtn">
          <Link to="/dashboard/addjob">
            <button> Add Job </button>
          </Link>
          <Link to="/dashboard/qutation">
            <button>Quotation </button>
          </Link>
          <Link to="/dashboard/invoice">
            <button>Invoice </button>
          </Link>
        </div>
        <div className="flex items-end justify-end">
          <NotificationAdd size={30} className="mr-2" />
          <FaUserGear size={30} />
        </div>
      </div>
      <div className="flex items-center justify-between my-3 mb-8">
        <div className="flex items-center justify-center ">
          <FaFileInvoice className="invoicIcon" />
          <div className="ml-2">
            <h3 className="text-2xl font-bold"> Product </h3>
            <span>Manage Product </span>
          </div>
        </div>
        <div className="productHome">
          <span>Home / </span>
          <span>Product / </span>
          <span>New Product </span>
        </div>
      </div>
      <div className="flex items-center justify-between mb-5 bg-[#F1F3F6] py-5 px-3">
        <h3 className="mb-3 text-3xl font-bold">All Product List:</h3>
        <div className="flex items-center searcList">
          <select>
            <option value="SL No"> SL No</option>
            <option value="Customer Name"> Customer Name</option>
            <option value="Order Number"> Order Number</option>
            <option value="Car Number"> Car Number</option>
            <option value="Mobile Number"> Mobile Number</option>
          </select>
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
              <th>Image</th>
              <th>Product Name </th>
              <th>Product Model </th>
              <th>Supplier Name </th>
              <th>Price </th>
              <th>Supplier Price </th>
              <th colSpan={3}>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>01</td>
              <td>
                <div className="mask   h-[100px] w-[100px] mx-auto ">
                  <img
                    className="object-cover w-full h-full text-center "
                    src={img}
                    alt="img"
                  />
                </div>
              </td>
              <td>Car </td>
              <td>BMW2343</td>
              <td>Aminul Hoque </td>
              <td>BDT405</td>
              <td>BDT1005</td>
              <td>
                <div className="editIconWrap edit2">
                  <Link to="/dashboard/update-product">
                    <FaEye className="editIcon" />
                  </Link>
                </div>
              </td>
              <td>
                <div className="editIconWrap edit">
                  <Link to="/dashboard/update-product">
                    <FaEdit className="editIcon" />
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
  );
};

export default Product;
