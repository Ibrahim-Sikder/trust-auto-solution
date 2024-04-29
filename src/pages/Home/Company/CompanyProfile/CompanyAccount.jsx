/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { FaCarSide, FaInfo, FaRegEdit } from "react-icons/fa";
import Card from "../../../../components/Card/Card";
import invoice from "../../../../../public/assets/invoice.png";
const CompanyAccount = ({
  profileData,
  jobCardData,
  quotationData,
  moneyReceiptData,
}) => {
  
  
  return (
    <div className="customerProfileWrap">
      <div className="justify-between block mt-5 md:flex">
        <Card>
          <h3 className="mb-2 text-xl font-semibold"> Contact Info </h3>
          <div className="flex items-center justify-between">
            <div>
              <div>
                Supplier Name: <b>{profileData.company_name} </b>
              </div>
              <div>
                Phone Number: <b>{profileData.company_contact} </b>
              </div>
            </div>
            
            <div>
              <div>
                Shop Name: <b>{profileData.company_name}</b>
              </div>
              <span>
                Email Address: <b>{profileData.company_email}</b>
              </span>
            </div>
          </div>
        </Card>
        <Card>
          <h3 className="text-xl font-semibold">Address Details </h3>
         <div className="flex items-center justify-between">
         <span>
            Country : <b>{profileData.company_address}</b>
          </span>
          <span>
            City : <b>Dhaka </b>
          </span>
         </div>
        </Card>
      </div>
      <div className="justify-between block mt-5 md:flex">
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
                <b>{jobCardData.dd}</b>
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
      <div className="justify-between block mt-5 md:flex">
        <Card>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Recent Quotations </h3>
            <FaRegEdit size={30} />
          </div>
          <div className="flex items-center justify-between mt-10 ">
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
  );
};

export default CompanyAccount;
