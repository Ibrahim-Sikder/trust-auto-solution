/* eslint-disable no-unused-vars */
import { HiLocationMarker } from "react-icons/hi";
import { HiEnvelope, HiMiniPhone } from "react-icons/hi2";
import { ImUserTie } from "react-icons/im";
import "../../Customer/Customer.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import { FaFacebookF, FaRocketchat, FaWhatsapp } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ShowRoomAccount from "./ShowRoomAccount";
import ShowRoomVehicleDetails from "./ShowRoomVehicleDetails";
import ShowRoomJobCardList from "./ShowRoomJobCardList";
import ShowRoomQuotationList from "./ShowRoomQuotationList";
import ShowRoomInvoiceList from "./ShowRoomInvoiceList";
import ShowRoomMoneyList from "./ShowRoomMoneyList";
import SupplierPaymentList from "../../Suppliers/SupplierPaymentList";

const ShowRoomProfile = () => {
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({});
console.log(profileData)
  const [jobCardData, setJobCardData] = useState([]);

  const [quotationData, setQuotationData] = useState([]);

  const [invoiceData, setInvoiceData] = useState([]);

  const [moneyReceiptData, setMoneyReceiptData] = useState([]);
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`${import.meta.env.VITE_API_URL}/api/v1/showRoom/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProfileData(data);
          setLoading(false);
        });
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetch(`${import.meta.env.VITE_API_URL}/api/v1/jobCard/${id}`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "success") {
            setJobCardData(data.jobCard);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle errors
        });
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetch(`${import.meta.env.VITE_API_URL}/api/v1/quotation/${id}`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "success") {
            setQuotationData(data.jobCard);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle errors
        });
    }
  }, [id]);
  useEffect(() => {
    if (id) {
      fetch(`${import.meta.env.VITE_API_URL}/api/v1/invoice/${id}`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "success") {
            setInvoiceData(data.jobCard);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle errors
        });
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetch(`${import.meta.env.VITE_API_URL}/api/v1/money_receipt/${id}`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "success") {
            setMoneyReceiptData(data.card);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle errors
        });
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="w-full md:h-32 mt-5 bg-[#42A1DA] text-white flex items-center  ">
        <div className="flex justify-between w-full ">
          <div className="bg-[#F77F00] border rounded-md py-5 px-3 relative top-20 left-5 ">
            <div className="flex flex-wrap ml-5 b">
              <div className="md:w-24 md:h-24 bg-[#42A1DA] border rounded-xl mr-3 p-3 ">
                <ImUserTie size="80" className="text-white" />
              </div>
              <div className="text-sm">
                <div className="flex items-center">
                  <span> Show Room ID : </span>{" "}
                  <span className="ml-3 font-semibold ">
                    {profileData?.showRoomId}
                  </span>
                </div>

                <div className=" mt-3 space-y-2">
                  <div className="flex items-center">
                    <HiMiniPhone size="20" className="mr-2" />
                    <span>{profileData?.company_contact}</span>
                  </div>
                  <div className="flex items-center">
                    <HiEnvelope size="20" className="mr-2" />
                    <span>{profileData?.company_email} </span>
                  </div>
                  <div className="flex items-center">
                    <HiLocationMarker size="20" className="mr-2" />
                    <span> {profileData?.company_address} </span>
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
            <Tab>Show Room List</Tab>
            <Tab>Jobs Card </Tab>
            <Tab>Quotation </Tab>
            <Tab>Invoice </Tab>
            <Tab>Money Receipt </Tab>
            <Tab>Payment</Tab>
            <Tab>Message</Tab>
          </TabList>

          <TabPanel>
            <ShowRoomAccount
              profileData={profileData}
              jobCardData={jobCardData}
              quotationData={quotationData}
              invoiceData={invoiceData}
              moneyReceiptData={moneyReceiptData}
            />
          </TabPanel>
          <TabPanel>
            <ShowRoomVehicleDetails />
          </TabPanel>
          <TabPanel>
            <ShowRoomJobCardList
              jobCardData={jobCardData}
              setJobCardData={setJobCardData}
              id={id}
            />
          </TabPanel>
          <TabPanel>
            <ShowRoomQuotationList
              quotationData={quotationData}
              setQuotationData={setQuotationData}
              id={id}
            />
          </TabPanel>
          <TabPanel>
            <ShowRoomInvoiceList
              invoiceData={invoiceData}
              setInvoiceData={setInvoiceData}
              id={id}
            />
          </TabPanel>
          <TabPanel>
            <ShowRoomMoneyList
              moneyReceiptData={moneyReceiptData}
              setMoneyReceiptData={setMoneyReceiptData}
              id={id}
            />
          </TabPanel>
          <TabPanel>
            <SupplierPaymentList />
          </TabPanel>
          <TabPanel>
            <div>
              <div className="flex items-center justify-between cursor-pointer w-[500px] mx-auto my-20">
                <div className="shadow-lg bg-[#24CC63] text-white p-3 rounded-lg ">
                  <Link to="/dashboard/message">
                    <FaWhatsapp size={100} />
                  </Link>
                </div>
                <div className="shadow-lg bg-[#1974EC] text-white p-3 rounded-lg ">
                  <Link to="/dashboard/message">
                    {" "}
                    <FaFacebookF size={100} />
                  </Link>
                </div>
                <div className="shadow-lg bg-[#2864D9] text-white p-3 rounded-lg ">
                  <Link to="/dashboard/message">
                    {" "}
                    <FaRocketchat size={100} />
                  </Link>
                </div>
              </div>
            </div>
          </TabPanel>
        </Tabs>

        <div>
          <p className="my-5 text-center">
            © Copyright 2024 | Trust Auto Solution | All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShowRoomProfile;
