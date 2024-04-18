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
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const CustomerProfile = () => {
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [jobCardData, setJobCardData] = useState([]);
  console.log(jobCardData);
  const [quotationData, setQuotationData] = useState([]);
  console.log(quotationData);
  const [invoiceData, setInvoiceData] = useState([]);
  console.log(invoiceData);
  const [moneyReceiptData, setMoneyReceiptData] = useState([]);
  console.log(moneyReceiptData);

  const [error, setError] = useState("");

  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`http://localhost:5000/api/v1/customer/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProfileData(data);
          setLoading(false);
        });
    }
  }, [id]);

  console.log(profileData);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/v1/jobCard/${id}`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "success") {
            setJobCardData(data.jobCard);
          }
        })
        .catch((error) => {
          setError(error.message);
          // Handle errors
        });
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/v1/quotation/${id}`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "success") {
            setQuotationData(data.jobCard);
          }
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, [id]);
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/v1/invoice/${id}`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "success") {
            setInvoiceData(data.jobCard);
          }
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/v1/money_receipt/${id}`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "success") {
            setMoneyReceiptData(data.card);
          }
        })
        .catch((error) => {
          setError(error.message);
          // Handle errors
        });
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Something went wrong</div>;
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
                <h3 className="text-2xl">Trust Auto Solution </h3>
                <div className=" mt-3 space-y-2">
                  <div className="flex items-center">
                    <HiMiniPhone size="20" className="mr-2" />
                    <span>{profileData.customer_contact}</span>
                  </div>
                  <div className="flex items-center">
                    <HiEnvelope size="20" className="mr-2" />
                    <span>{profileData.customer_email} </span>
                  </div>
                  <div className="flex items-center">
                    <HiLocationMarker size="20" className="mr-2" />
                    <span> {profileData.customer_address} </span>
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
            <CustomerAccount
              profileData={profileData}
              jobCardData={jobCardData}
              quotationData={quotationData}
              invoiceData={invoiceData}
              moneyReceiptData={moneyReceiptData}
            />
          </TabPanel>
          <TabPanel>
            <VehicleDetails />
          </TabPanel>
          <TabPanel>
            <CustomerJobCardList
              jobCardData={jobCardData}
              setJobCardData={setJobCardData}
              id={id}
            />
          </TabPanel>
          <TabPanel>
            <CustomerQoutationList
              quotationData={quotationData}
              setQuotationData={setQuotationData}
              id={id}
            />
          </TabPanel>
          <TabPanel>
            <CustomerInvoiceList
              invoiceData={invoiceData}
              setInvoiceData={setInvoiceData}
              id={id}
            />
          </TabPanel>
          <TabPanel>
            <CustomerMoneyList
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
          <p className="my-5 text-center">
            © Copyright 2024 | Trust Auto Solution | All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
