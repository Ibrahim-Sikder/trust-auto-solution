import { FaTrashAlt, FaEdit, FaEye } from "react-icons/fa";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
const Role = () => {
  return (
    <div className="mt-5 mb-24 w-full">
      <div className="md:flex block space-y-3 items-center justify-between md:px-8 mb-5">
        <TextField id="outlined-basic" label="Search " variant="outlined" />
        <h3 className="text-xl md:text-3xl font-bold">Make Role </h3>
        <div className='addHotel'>
          <Link to='/dashboard/add-role'>
            <button>
              <span className="text-xl font-bold">+</span> Add Role
            </button>
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto ">
        <table className="table ">
          <thead className='tableWrap'>
            <tr>
              <th> SL No </th>
              <th>Name  </th>
              <th>Role </th>
              <th>Created By </th>
              <th>Status </th>
              <th colSpan={3}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>01</td>
              <td>Md Karim </td>
              <td>Admin</td>
              <td>Rubel </td>
              <td>Active</td>
              <td>
                <div className='editIconWrap edit2'>
                  <Link to='/dashboard/update-role'>
                    <FaEye className='editIcon' />
                  </Link>
                </div>
              </td>
              <td >
                <div className='editIconWrap edit' >
                  <Link to='/dashboard/update-role'>
                    <FaEdit className='editIcon' />
                  </Link>
                </div>
              </td>
              <td>
                <div className='editIconWrap'>
                  <FaTrashAlt className='deleteIcon' />
                </div>

              </td>
            </tr>
            <tr>
              <td>01</td>
              <td>Md Karim </td>
              <td>Admin</td>
              <td>Rubel </td>
              <td>Active</td>
              <td>
                <div className='editIconWrap'>
                  <Link to='/dashboard/update-role'>
                    <FaEye className='editIcon' />
                  </Link>
                </div>
              </td>
              <td >
                <div className='editIconWrap'>
                  <Link to='/dashboard/update-role'>
                    <FaEdit className='editIcon' />
                  </Link>
                </div>
              </td>
              <td>
                <div className='editIconWrap'>
                  <FaTrashAlt className='deleteIcon' />
                </div>

              </td>
            </tr>
            <tr>
              <td>01</td>
              <td>Md Karim </td>
              <td>Admin</td>
              <td>Rubel </td>
              <td>Active</td>
              <td>
                <div className='editIconWrap'>
                  <Link to='/dashboard/update-role'>
                    <FaEye className='editIcon' />
                  </Link>
                </div>
              </td>
              <td >
                <div className='editIconWrap'>
                  <Link to='/dashboard/update-role'>
                    <FaEdit className='editIcon' />
                  </Link>
                </div>
              </td>
              <td>
                <div className='editIconWrap'>
                  <FaTrashAlt className='deleteIcon' />
                </div>

              </td>
            </tr>
            <tr>
              <td>01</td>
              <td>Md Karim </td>
              <td>Admin</td>
              <td>Rubel </td>
              <td>Active</td>
              <td>
                <div className='editIconWrap'>
                  <Link to='/dashboard/update-role'>
                    <FaEye className='editIcon' />
                  </Link>
                </div>
              </td>
              <td >
                <div className='editIconWrap'>
                  <Link to='/dashboard/update-role'>
                    <FaEdit className='editIcon' />
                  </Link>
                </div>
              </td>
              <td>
                <div className='editIconWrap'>
                  <FaTrashAlt className='deleteIcon' />
                </div>

              </td>
            </tr>
            <tr>
              <td>01</td>
              <td>Md Karim </td>
              <td>Admin</td>
              <td>Rubel </td>
              <td>Active</td>
              <td>
                <div className='editIconWrap'>
                  <Link to='/dashboard/update-role'>
                    <FaEye className='editIcon' />
                  </Link>
                </div>
              </td>
              <td >
                <div className='editIconWrap'>
                  <Link to='/dashboard/update-role'>
                    <FaEdit className='editIcon' />
                  </Link>
                </div>
              </td>
              <td>
                <div className='editIconWrap'>
                  <FaTrashAlt className='deleteIcon' />
                </div>

              </td>
            </tr>
          </tbody>
        </table>
      </div>
     
    </div>
  );
};

export default Role;