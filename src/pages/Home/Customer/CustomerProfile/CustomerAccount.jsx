import { FaCarSide, FaInfo, FaRegEdit } from "react-icons/fa"
import Card from "../../../../components/Card/Card"
import invoice from "../../../../../public/assets/invoice.png"
const CustomerAccount = () => {
  return (
    <div className="customerProfileWrap">
      <div className="flex mt-8 items-center max-w-[700px] justify-between">
        <div>
          <p>Display Name </p>
          <b>Aminul Houque </b>
        </div>
        <div>
          <p>Date of Birth </p>
          <b>01-01-2000</b>
        </div>
        <div>
          <p>Gender</p>
          <b>Male</b>
        </div>
      </div>
      <div className="block md:flex justify-between mt-5">
        <Card>
          <h3 className="text-xl font-semibold">More Info </h3>
          <span>
            Landine No: <b>Not Added </b>
          </span>
          <span>
            TAX ID: <b>Not Added </b>
          </span>
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
            <div className="cardIcon bg-[#37A248]">
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
            <h3 className="text-xl font-semibold">Recent Quotations </h3>
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
            <h3 className="text-xl font-semibold">Recent Quotations</h3>
            <FaRegEdit size={30} />
          </div>
          <img className="w-64 mx-auto " src={invoice} alt="" />
        </Card>
      </div>
    </div>
  )
}

export default CustomerAccount
