/* eslint-disable react/prop-types */
import { HiLocationMarker } from "react-icons/hi";
import { HiEnvelope, HiMiniPhone } from "react-icons/hi2";
import { ImUserTie } from "react-icons/im";
import "../../Customer/Customer.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ShowRoomAccount from "./ShowRoomAccount";
import ShowRoomVehicleDetails from "./ShowRoomVehicleDetails";
import ShowRoomJobCardList from "./ShowRoomJobCardList";
import ShowRoomQuotationList from "./ShowRoomQuotationList";
import ShowRoomInvoiceList from "./ShowRoomInvoiceList";
import ShowRoomMoneyList from "./ShowRoomMoneyList";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import Message from "../../../../shared/Message/Message";

const ShowRoomProfile = () => {
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({});
  console.log(profileData);
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
        });
    }
  }, [id]);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabStyles = {
    width: 115,
    height: "35px",
    margin: 0.5,
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="w-full md:h-32 mt-5 bg-[#42A1DA] text-white flex items-center">
        <div className="flex justify-between w-full">
          <div className="bg-[#F77F00] border rounded-md py-5 px-3 relative top-20 left-5">
            <div className="flex flex-wrap ml-5">
              <div className="w-24 h-24 bg-[#42A1DA] border rounded-xl mr-3 p-3">
                <ImUserTie size="80" className="text-white" />
              </div>
              <div>
                <div className="flex items-center">
                  <span> Show Room ID : </span>{" "}
                  <span className="ml-3 font-semibold ">
                    {profileData?.showRoomId}
                  </span>
                </div>
                <div className="mt-3 space-y-2">
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
                    <span>{profileData?.company_address} </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#F77F00] border h-14 rounded-md p-3 relative top-32 md:right-5 right-20">
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
            aria-label="show room profile tabs"
            sx={tabsStyles}
          >
            <Tab sx={tabStyles} label="Account" />
            <Tab sx={tabStyles} label="Show Room List" />
            <Tab sx={tabStyles} label="Job Card" />
            <Tab sx={tabStyles} label="Quotation" />
            <Tab sx={tabStyles} label="Invoice" />
            <Tab sx={tabStyles} label="Money Receipt" />
            <Tab sx={tabStyles} label="Message" />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <ShowRoomAccount
            profileData={profileData}
            jobCardData={jobCardData}
            quotationData={quotationData}
            invoiceData={invoiceData}
            moneyReceiptData={moneyReceiptData}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ShowRoomVehicleDetails />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ShowRoomJobCardList
            jobCardData={jobCardData}
            setJobCardData={setJobCardData}
            id={id}
          />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <ShowRoomQuotationList
            quotationData={quotationData}
            setQuotationData={setQuotationData}
            id={id}
          />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <ShowRoomInvoiceList
            invoiceData={invoiceData}
            setInvoiceData={setInvoiceData}
            id={id}
          />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <ShowRoomMoneyList
            moneyReceiptData={moneyReceiptData}
            setMoneyReceiptData={setMoneyReceiptData}
            id={id}
          />
        </TabPanel>

        <TabPanel value={value} index={6}>
          <Message />
        </TabPanel>
      </div>

      <div>
        <p className="my-5 text-center">
          © Copyright 2024 | Trust Auto Solution | All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default ShowRoomProfile;

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
