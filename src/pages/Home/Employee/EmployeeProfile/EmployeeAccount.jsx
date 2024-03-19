import {  FaInfo, FaRegEdit } from "react-icons/fa";
import Card from "../../../../components/Card/Card";
import invoice from "../../../../../public/assets/invoice.png";
import { Link } from "react-router-dom";
const EmployeeAccount = () => {
  return (
    <div className="customerProfileWrap">
      <div>
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
        <div className="justify-between block mt-5 md:flex">
          <Card>
            <h3 className="text-xl font-semibold">Personal Info </h3>
            <div className="flex items-center justify-between">
              <div>
                <div>
                  <b>Name</b>: <small>Ariful Islam </small>
                </div>
                <div>
                <b>Phone No</b>: <small>076543567876 </small>
              </div>
              </div>
              <div>
                <div>
                <b>Email No</b>: <small>example@gamil.com </small>
                </div>
                <span>
                <b>Designation</b>: <small>Job Designation </small>
                </span>
              </div>
            </div>
          </Card>
          <Card>
          <h3 className="text-xl font-semibold">Family Address </h3>
          <div className="flex items-center justify-between">
            <div>
              <div>
                <b>Country</b>: <small>Bangladesh</small>
              </div>
              <div>
              <b>City</b>: <small>Dhaka </small>
            </div>
            </div>
            <div>
              <div>
              <b>State</b>: <small>Rangpur </small>
              </div>
             
            </div>
          </div>
        </Card>
        </div>
     
        <div className="justify-between block mt-5 md:flex">
          <Card>
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold">Paid Service Details </h3>
              <Link to='/dashboard/addjob'><FaRegEdit size={30} /></Link>
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
              <h3 className="text-2xl font-semibold">Free Service Details </h3>
              <Link to='/dashboard/addjob'><FaRegEdit size={30} /></Link>
            </div>
            <img className="w-64 mx-auto " src={invoice} alt="" />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAccount;
