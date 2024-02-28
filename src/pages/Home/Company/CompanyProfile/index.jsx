/* eslint-disable no-unused-vars */
import { HiLocationMarker } from "react-icons/hi";
import { HiEnvelope, HiMiniPhone } from "react-icons/hi2";
import { ImUserTie } from "react-icons/im";
import "../../Customer/Customer.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import { FaFacebookF, FaRocketchat, FaWhatsapp } from "react-icons/fa";
import SupplierPaymentList from "../../Suppliers/SupplierPaymentList";
import CompanyAccount from "./CompanyAccount";
import CompanyVehicleDetails from "./CompanyVehicleDetails";
import CompanyJobCardList from "./CompanyJobCardList";
import CompanyQuotationList from "./CompanyQuotationList";
import CompanyInvoiceList from "./CompanyInvoiceList";
import CompanyMoneyList from "./CompanyMoneyList";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const CompanyProfile = () => {
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({});
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`http://localhost:5000/api/v1/company/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProfileData(data);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(profileData);
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
            <Tab>Money Receipt </Tab>
            <Tab>Payment</Tab>
            <Tab>Message</Tab>
          </TabList>

          <TabPanel>
            <CompanyAccount />
          </TabPanel>
          <TabPanel>
            <CompanyVehicleDetails />
          </TabPanel>
          <TabPanel>
            <CompanyJobCardList />
          </TabPanel>
          <TabPanel>
            <CompanyQuotationList />
          </TabPanel>
          <TabPanel>
            <CompanyInvoiceList />
          </TabPanel>
          <TabPanel>
            <CompanyMoneyList />
          </TabPanel>
          <TabPanel>
            <SupplierPaymentList />
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

export default CompanyProfile;
