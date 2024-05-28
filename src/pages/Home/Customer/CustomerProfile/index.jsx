/* eslint-disable react/prop-types */
import { HiLocationMarker } from "react-icons/hi";
import { HiEnvelope, HiMiniPhone } from "react-icons/hi2";
import { ImUserTie } from "react-icons/im";
import "../Customer.css";
import CustomerJobCardList from "./CustomerJobCardList";
import CustomerQoutationList from "./CustomerQoutationList";
import CustomerInvoiceList from "./CustomerInvoiceList";
import CustomerMoneyList from "./CustomerMoneyList";
import CustomerAccount from "./CustomerAccount";
import VehicleDetails from "./VehicleDetails";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import Message from "../../../../shared/Message/Message";

const CustomerProfile = () => {
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [jobCardData, setJobCardData] = useState([]);
  const [quotationData, setQuotationData] = useState([]);
  const [invoiceData, setInvoiceData] = useState([]);
  const [moneyReceiptData, setMoneyReceiptData] = useState([]);
  const [error, setError] = useState("");
  const [value, setValue] = useState(0);

  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`${import.meta.env.VITE_API_URL}/api/v1/customer/${id}`)
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
          setError(error.message);
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
          setError(error.message);
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
          setError(error.message);
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
          setError(error.message);
        });
    }
  }, [id]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Something went wrong</div>;
  }

  const tabStyles = {
    width: 115,
    height: "35px",
    margin: .5,
    backgroundColor: "#42A1DA",
    color: "white",
    borderRadius: 10,
    padding: "0px",
    fontSize: "11px",
    lineHeight: "20px",
    minHeight: "unset",
    "&.Mui-selected": {
      backgroundColor: "#F77F00",
      color: "#fff",
    },
  };

  const tabsStyles = {
    "& .MuiTabs-indicator": {
      display: "none",
    },
    "& .MuiTabs-flexContainer": {
      borderBottom: "none",
    },
  };


  return (
    <div>
      <div className="w-full md:h-32 mt-5 bg-[#42A1DA] text-white flex items-center">
        <div className="flex justify-between w-full">
          <div className="bg-[#F77F00] border rounded-md py-5 px-3 relative top-20 left-5">
            <div className="flex flex-wrap ml-5 b">
              <div className="md:w-24 md:h-24 bg-[#42A1DA] border rounded-xl mr-3 p-3">
                <ImUserTie size="80" className="text-white" />
              </div>
              <div className="text-sm">
                <div className="flex items-center">
                  <span>Customer ID :</span>{" "}
                  <span className="ml-3 font-semibold">
                    {profileData?.customerId}
                  </span>
                </div>

                <div className="mt-3 space-y-2">
                  <div className="flex items-center">
                    <HiMiniPhone size="20" className="mr-2" />
                    <span>{profileData?.customer_contact}</span>
                  </div>
                  <div className="flex items-center">
                    <HiEnvelope size="20" className="mr-2" />
                    <span>{profileData?.customer_email} </span>
                  </div>
                  <div className="flex items-center">
                    <HiLocationMarker size="20" className="mr-2" />
                    <span>{profileData?.customer_address} </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#F77F00] border h-14 rounded-md p-3 relative top-32 right-5">
            <div className="flex items-center">
              <b>Due</b> /<b>Paid</b>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-32 text-black">
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={tabsStyles}
          >
            <Tab sx={tabStyles} label="Account" />
            <Tab sx={tabStyles} label="Vehicle List" />
            <Tab sx={tabStyles} label="Jobs Card" />
            <Tab sx={tabStyles} label="Quotation" />
            <Tab sx={tabStyles} label="Invoice" />
            <Tab sx={tabStyles} label="Money Receipt" />
            <Tab sx={tabStyles} label="Message" />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <CustomerAccount
            profileData={profileData}
            jobCardData={jobCardData}
            quotationData={quotationData}
            invoiceData={invoiceData}
            moneyReceiptData={moneyReceiptData}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <VehicleDetails />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <CustomerJobCardList
            jobCardData={jobCardData}
            setJobCardData={setJobCardData}
            id={id}
          />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <CustomerQoutationList
            quotationData={quotationData}
            setQuotationData={setQuotationData}
            id={id}
          />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <CustomerInvoiceList
            invoiceData={invoiceData}
            setInvoiceData={setInvoiceData}
            id={id}
          />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <CustomerMoneyList
            moneyReceiptData={moneyReceiptData}
            setMoneyReceiptData={setMoneyReceiptData}
            id={id}
          />
        </TabPanel>
        <TabPanel value={value} index={6}>
          <Message/>
        </TabPanel>

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

// Define TabPanel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
