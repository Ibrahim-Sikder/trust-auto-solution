import { FaTrashAlt, FaEdit  } from "react-icons/fa"
import { Link } from "react-router-dom"
import { HiOutlineSearch } from "react-icons/hi"
const CustomerJobCardList = () => {


  const jobData = [
    {
        id: 1,
        customerName: "Rahim Ullah",
        carNumber: '33566'
    },
    {
        id: 1,
        customerName: "Rahim Ullah",
        carNumber: '33566'
    },
    {
        id: 1,
        customerName: "Rahim Ullah",
        carNumber: '33566'
    },
    {
        id: 1,
        customerName: "Rahim Ullah",
        carNumber: '33566'
    },
    {
        id: 1,
        customerName: "Rahim Ullah",
        carNumber: '33566'
    },
    {
        id: 1,
        customerName: "Rahim Ullah",
        carNumber: '33566'
    },

  ]

  return (
    <div className=" mb-24 mt-10 w-full">
      <div className="flex items-center justify-between mb-5 bg-[#F1F3F6] py-5 px-3">
      <Link to='/dashboard/addjob'>
         <button className="bg-[#42A1DA] text-white px-2 py-3 rounded-sm ">
            Add Job Card
          </button>
          </Link>
        <div className="flex items-center">
        <input
        type="text"
        placeholder="Search"
        className="border py-2 px-3 rounded-md border-[#ddd]"
      />
      <button className="bg-[#42A1DA] text-white px-2 py-2 rounded-sm ml-1">
        {" "}
        <HiOutlineSearch size={22} />
      </button>
        </div>
      </div>

      <div className="overflow-x-auto ">
        <table className="table">
          <thead className="tableWrap">
            <tr>
              <th>SL No</th>
              <th>Customer Name</th>
              <th>Order Number </th>
              <th>Car Number </th>
              <th>Mobile Number</th>
              <th>Date</th>
              <th colSpan={3}>Action</th>
            </tr>
          </thead>
          <tbody>
            {
                jobData.map((data,i)=><tr key={data.id}>
                <td>{i+1}</td>
                <td>Rahim Ullah </td>
                <td>555</td>
                <td>478444</td>
                <td>057888888888</td>
                <td> 10-02-24 </td>
                <td>
                  <div className="editIconWrap edit">
                    <Link to="/update-jobcard">
                      <FaEdit className="editIcon" />
                    </Link>
                  </div>
                </td>
                <td>
                  <div className="editIconWrap">
                    <FaTrashAlt className="deleteIcon" />
                  </div>
                </td>
              </tr>)
            }
           
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CustomerJobCardList
