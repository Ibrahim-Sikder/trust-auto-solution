/* eslint-disable react/prop-types */
import { FaCarSide, FaInfo, FaRegEdit } from "react-icons/fa"
import Card from "../../../../components/Card/Card"
const CustomerAccount = ({profileData}) => {
  console.log(profileData)
  return (
    <div className="customerProfileWrap">
  
      <div className="block md:flex justify-between mt-5">
      <Card>
      <h3 className="text-xl font-semibold mb-2"> Contact Info </h3>
      <div className="flex items-center justify-between">
        <div>
          <div>
          Supplier Name: <b>{profileData.company_name} </b>
          </div>
          <div>
            Phone Number: <b>0657899444</b>
          </div>
        </div>
        <div>
          <div>
           Shop Name: <b>Auto Solution </b>
          </div>
          <span>
            Email Address: <b>supplier@gmail.com</b>
          </span>
        </div>
      </div>
    </Card>
        <Card>
          <h3 className="text-xl font-semibold">Address Details </h3>
          <span>
            Country : <b>Bangladesh </b>
          </span>
          <span>
            City <b>Dhaka </b>
          </span>
        </Card>
      </div>
      <div className="block md:flex justify-between mt-5">
        <Card>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Recent Vehicles </h3>
            <FaRegEdit size={30} />
          </div>
          <div className="flex items-center my-3">
            <div className="cardIcon bg-[#42A1DA]">
              <FaCarSide size={50} className="text-white" />
            </div>
            <div className="ml-3">
              <b>Ferrari</b>
              <p>Bangladesh </p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="cardIcon bg-[#0A9396]">
              <FaCarSide size={50} className="text-white" />
            </div>
            <div className="ml-3">
              <b>Ferrari</b>
              <p>Bangladesh </p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Recent Job Cards </h3>
            <FaRegEdit size={30} />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center my-3">
              <div className="cardIcon ">
                <b className="block">Feb</b>
                <b>30</b>
              </div>
              <div className="ml-3">
                <b>TSA056888</b>
                <p>Bangladesh </p>
              </div>
            </div>
            <b>BDT2400</b>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center my-3">
              <div className="cardIcon bg-[#48CAE4]">
                <b className="block">Feb</b>
                <b>30</b>
              </div>
              <div className="ml-3">
                <b>TSA056888</b>
                <p>Bangladesh </p>
              </div>
            </div>
            <b>BDT2400</b>
          </div>
        </Card>
      </div>
      <div className="block md:flex justify-between  mt-5">
        <Card>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Recent Invoice </h3>
            <FaRegEdit size={30} />
          </div>
          <div className=" mt-10 flex items-center justify-between">
            <div className="flex items-center my-3">
              <div className="cardIcon bg-[#03045E] ">
                <b className="block">Feb</b>
                <b>30</b>
              </div>
              <div className="ml-3">
                <b>TSA056888</b>
                <div className="flex items-center">
                  <p>Booked Vehicle </p>
                  <FaInfo
                    size={15}
                    className="bg-[#D9D9D9] rounded-full p-1 text-white ml-2"
                  />
                </div>
              </div>
            </div>
            <b>BDT2400</b>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center my-3">
              <div className="cardIcon bg-[#48CAE4]">
                <b className="block">Feb</b>
                <b>30</b>
              </div>
              <div className="ml-3">
                <b>TSA056888</b>
                <div className="flex items-center">
                  <p>Booked Vehicle </p>
                  <FaInfo
                    size={15}
                    className="bg-[#D9D9D9] rounded-full p-1 text-white ml-2"
                  />
                </div>
              </div>
            </div>
            <b>BDT2400</b>
          </div>
        </Card>
        <Card>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Recent Quotation </h3>
          <FaRegEdit size={30} />
        </div>
        <div className=" mt-10 flex items-center justify-between">
          <div className="flex items-center my-3">
            <div className="cardIcon bg-[#03045E] ">
              <b className="block">Feb</b>
              <b>30</b>
            </div>
            <div className="ml-3">
              <b>TSA056888</b>
              <div className="flex items-center">
                <p>Booked Vehicle </p>
                <FaInfo
                  size={15}
                  className="bg-[#D9D9D9] rounded-full p-1 text-white ml-2"
                />
              </div>
            </div>
          </div>
          <b>BDT2400</b>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center my-3">
            <div className="cardIcon bg-[#48CAE4]">
              <b className="block">Feb</b>
              <b>30</b>
            </div>
            <div className="ml-3">
              <b>TSA056888</b>
              <div className="flex items-center">
                <p>Booked Vehicle </p>
                <FaInfo
                  size={15}
                  className="bg-[#D9D9D9] rounded-full p-1 text-white ml-2"
                />
              </div>
            </div>
          </div>
          <b>BDT2400</b>
        </div>
      </Card>
      </div>
    </div>
  )
}

export default CustomerAccount
