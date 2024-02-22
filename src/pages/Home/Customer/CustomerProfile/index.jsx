import { HiLocationMarker } from "react-icons/hi";
import { HiEnvelope, HiMiniPhone } from "react-icons/hi2";
import { ImUserTie } from "react-icons/im";
import "../Customer.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import CustomerJobCardList from "./CustomerJobCardList";
import CustomerQoutationList from "./CustomerQoutationList";
import CustomerInvoiceList from "./CustomerInvoiceList";
import CustomerMoneyList from "./CustomerMoneyList";
import CustomerAccount from "./CustomerAccount";
import VehicleDetails from "./VehicleDetails";
import { FaFacebookF, FaRocketchat, FaWhatsapp } from "react-icons/fa";
import SupplierPaymentList from "../../Suppliers/SupplierPaymentList";

const CustomerProfile = () => {
  return (
    <div>
      <div className="w-full h-32 mt-5 bg-[#42A1DA] text-white flex items-center  ">
        <div className="flex justify-between w-full 000000000">
          <div className="bg-[#F77F00] border rounded-md py-5 px-3 relative top-20 left-5 ">
            <div className="flex  ml-5">
              <div className="w-24 h-24 bg-[#42A1DA] border rounded-xl mr-3 p-3 ">
                <ImUserTie size="80" className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl">Trust Auto Solution </h3>
                <div className="space-y-2 mt-3">
                  <div className="flex items-center">
                    <HiMiniPhone size="20" className="mr-2" />
                    <span>45996-0789777</span>
                  </div>
                  <div className="flex items-center">
                    <HiEnvelope size="20" className="mr-2" />
                    <span>customer@gmail.com </span>
                  </div>
                  <div className="flex items-center">
                    <HiLocationMarker size="20" className="mr-2" />
                    <span> Kuril Bishawroad, Dhaka-1212 </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#F77F00] border h-14 rounded-md p-3 relative top-32 right-5 ">
            <div className="flex items-center">
              <b>Due</b> /<b>Paid</b>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-32 text-black">
        <Tabs className="tabList">
          <TabList>
            <Tab>Account</Tab>
            <Tab>Vehicle List</Tab>
            <Tab>Jobs Card </Tab>
            <Tab>Quotation </Tab>
            <Tab>Invoice </Tab>
            <Tab>Money Reciept </Tab>
            <Tab>Payment</Tab>
            <Tab>Message</Tab>
          </TabList>

          <TabPanel>
            <CustomerAccount />
          </TabPanel>
          <TabPanel>
            <VehicleDetails />
          </TabPanel>
          <TabPanel>
            <CustomerJobCardList />
          </TabPanel>
          <TabPanel>
            <CustomerQoutationList />
          </TabPanel>
          <TabPanel>
            <CustomerInvoiceList />
          </TabPanel>
          <TabPanel>
            <CustomerMoneyList />
          </TabPanel>
          <TabPanel>
          <SupplierPaymentList/>
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

export default CustomerProfile;
