import './Role.css'
const AddRole = () => {
  return (
    <div className="mt-5 mb-24 w-full">
      <h3 className="text-3xl font-bold text-center">Create Role </h3>
      <form>
        <div className="formControl my-5 mx-3">
          <div className="role">
            <input
              name="User name"
              placeholder="User Name "
              type="text"
              autoComplete="off"
            />
            <input
              name="Password"
              placeholder="Password "
              type="text"
              autoComplete="off"
            />
          </div>
        </div>
        <div className="formControl my-5 mx-3">
          <div className="role">
            <select autoComplete="off" >
              <option value="Select Role">Select Role</option>
              <option value="">Admin</option>
              <option value="">Super Admin </option>
            </select>
            <input
              name="Employee Name"
              placeholder="Employee Name "
              type="text"
              autoComplete="off"
            />
          </div>
        </div>
        <div className="formControl my-5 mx-3">
          <div className="role">
            <input
              name="Created By"
              placeholder="Created By "
              type="text"
              autoComplete="off"
            />
            <select autoComplete="off" >
              <option value="">Select Status</option>
              <option value="">Active </option>
              <option value="">Inactive</option>
            </select>
          </div>
        </div>
      </form>
      <div className="overflow-x-auto ">
        <table className="table ">
          <thead className='tableWrap'>
            <tr>
              <th><input type="checkbox" /></th>
              <th> SL No </th>
              <th>Page Access  </th>
              <th>Create </th>
              <th>Edit </th>
              <th>View </th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type="checkbox" /></td>
              <td>01</td>
              <td>Add Job Card</td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>01</td>
              <td>Job Card List</td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>01</td>
              <td>Add Qotation Card</td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>01</td>
              <td>Qotation List</td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>01</td>
              <td>Add Invoice </td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>01</td>
              <td>Invoice List</td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>01</td>
              <td>Running Project</td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>01</td>
              <td>Completed Project</td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>01</td>
              <td>Product</td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>01</td>
              <td>Customer List </td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>01</td>
              <td>Expense </td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>01</td>
              <td>Add Role</td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>01</td>
              <td> Role List</td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>01</td>
              <td>Bill Pay</td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>01</td>
              <td>Add Employee</td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>01</td>
              <td>View Employee</td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>01</td>
              <td>Profile</td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>01</td>
              <td>Data Backup</td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="rolebtnWrap">
        <button className="submitBtn" type="submit">
          Create Role
        </button>
      </div>
    </div>
  );
};

export default AddRole;