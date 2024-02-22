import { HiLocationMarker } from "react-icons/hi";
import { HiEnvelope, HiMiniPhone } from "react-icons/hi2";
import { ImUserTie } from "react-icons/im";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import SupplierAccount from "./SupplierAccount";
import SupplierPaymentList from "../SupplierPaymentList";
import SupplierDueList from "../SupplierDueList";
import OrderList from "../OrderList";
import { FaFacebookF, FaMale, FaRocketchat, FaWhatsapp } from "react-icons/fa";

const SupplierProfile = () => {
  return (
    <div>
      <div className="w-full h-52 p-5 mt-5 bg-[#03045E] text-white flex items-center  relative">
        <div className="border bg-[#F77F00] p-5 rounded-md flex item-end  ">
          <div>
            <div className="space-y-2 mt-3">
              <div className=" flex items-center ">
                <FaMale size={30} />
                <b className=" uppercase">SID: TAS-56789098</b>
              </div>
              <div className="flex items-center">
                <HiMiniPhone size="20" className="mr-2" />
                <span>45996-0789777</span>
              </div>
              <div className="flex items-center">
                <HiEnvelope size="20" className="mr-2" />
                <span>arif@gmail.com </span>
              </div>
              <div className="flex items-center">
                <HiLocationMarker size="20" className="mr-2" />
                <span> Kuril Bishawroad, Dhaka-1212 </span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-[#3A0CA3] border  rounded-md py-5 px-3 absolute top-28 right-5 ">
            <div className="flex  ml-5">
              <div className="w-32 h-32 flex items-center flex-col justify-center">
                <ImUserTie size="130" className="text-white" />
                <h3 className="text-xl">Ariful Islam</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-14 text-black">
        <Tabs className="tabList">
          <TabList>
            <Tab>Account</Tab>
            <Tab>Payment</Tab>
            <Tab>Due</Tab>
            <Tab>Message </Tab>
            <Tab>Order List </Tab>
          </TabList>
          <TabPanel>
            <SupplierAccount />
          </TabPanel>
          <TabPanel>
            <SupplierPaymentList />
          </TabPanel>
          <TabPanel>
            <SupplierDueList />
          </TabPanel>
          <TabPanel>
            <div>
              <div className="flex items-center justify-between cursor-pointer w-[500px] mx-auto my-20">
                <div className="shadow-lg bg-[#24CC63] text-white p-3 rounded-lg ">
                  <FaWhatsapp size={100} />
                </div>
                <div className="shadow-lg bg-[#1974EC] text-white p-3 rounded-lg ">
                  <FaFacebookF size={100} />
                </div>
                <div className="shadow-lg bg-[#2864D9] text-white p-3 rounded-lg ">
                  <FaRocketchat size={100} />
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <OrderList />
          </TabPanel>
        </Tabs>
        <div>
          <p className="text-center my-5">
            © Copyright 2024 | Trust Auto Solution | All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default SupplierProfile;
