/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { HiLocationMarker } from "react-icons/hi";
import { HiEnvelope, HiMiniPhone } from "react-icons/hi2";
import { ImUserTie } from "react-icons/im";
import "../../Customer/Customer.css";
import SupplierPaymentList from "../../Suppliers/SupplierPaymentList";
import CompanyAccount from "./CompanyAccount";

import CompanyJobCardList from "./CompanyJobCardList";
import CompanyQuotationList from "./CompanyQuotationList";
import CompanyInvoiceList from "./CompanyInvoiceList";
import CompanyMoneyList from "./CompanyMoneyList";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import Message from "../../../../shared/Message/Message";
import VehicleDetails from "../../Customer/CustomerProfile/VehicleDetails";
import { useGetSingleCompanyQuery } from "../../../../redux/api/companyApi";
import Loading from "../../../../components/Loading/Loading";
import CustomerJobCardList from "../../Customer/CustomerProfile/CustomerJobCardList";
import CustomerQoutationList from "../../Customer/CustomerProfile/CustomerQoutationList";
import CustomerInvoiceList from "../../Customer/CustomerProfile/CustomerInvoiceList";
import CustomerMoneyList from "../../Customer/CustomerProfile/CustomerMoneyList";
const CompanyProfile = () => {
  const [jobCardData, setJobCardData] = useState([]);
  const [quotationData, setQuotationData] = useState([]);
  const [invoiceData, setInvoiceData] = useState([]);

  const [moneyReceiptData, setMoneyReceiptData] = useState([]);

  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const {
    data: profileData,
    isLoading,
    error: companyError,
  } = useGetSingleCompanyQuery(id);

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

  if (isLoading) {
    return <Loading />;
  }

  if (companyError) {
    return <div>Something went wrong</div>;
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
                  <span> Company ID : </span>{" "}
                  <span className="ml-3 font-semibold ">
                    {profileData?.data?.companyId}
                  </span>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center">
                    <HiMiniPhone size="20" className="mr-2" />
                    <span>{profileData?.data?.fullCompanyNum} </span>
                  </div>
                  <div className="flex items-center">
                    <HiEnvelope size="20" className="mr-2" />
                    <span>{profileData?.data.company_email} </span>
                  </div>
                  <div className="flex items-center">
                    <HiLocationMarker size="20" className="mr-2" />
                    <span>{profileData?.data?.company_address} </span>
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
            aria-label="company profile tabs"
            sx={tabsStyles}
          >
            <Tab sx={tabStyles} label="Account" />
            <Tab sx={tabStyles} label="Vehicle List" />
            <Tab sx={tabStyles} label="Jobs Card" />
            <Tab sx={tabStyles} label="Quotation" />
            <Tab sx={tabStyles} label="Invoice" />
            <Tab sx={tabStyles} label="Money Receipt" />
            <Tab sx={tabStyles} label="Payment" />
            <Tab sx={tabStyles} label="Message" />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <CompanyAccount profileData={profileData} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <VehicleDetails id={id} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          {/* <CompanyJobCardList
            jobCardData={jobCardData}
            setJobCardData={setJobCardData}
            id={id}
          /> */}
          <CustomerJobCardList id={id} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          {/* <CompanyQuotationList
            quotationData={quotationData}
            setQuotationData={setQuotationData}
            id={id}
          /> */}
          <CustomerQoutationList id={id} />
        </TabPanel>
        <TabPanel value={value} index={4}>
          {/* <CompanyInvoiceList
            invoiceData={invoiceData}
            setInvoiceData={setInvoiceData}
            id={id}
          /> */}
          <CustomerInvoiceList id={id} />
        </TabPanel>
        <TabPanel value={value} index={5}>
          {/* <CompanyMoneyList
            moneyReceiptData={moneyReceiptData}
            setMoneyReceiptData={setMoneyReceiptData}
            id={id}
          /> */}
          <CustomerMoneyList id={id} />
        </TabPanel>
        <TabPanel value={value} index={6}>
          <SupplierPaymentList />
        </TabPanel>
        <TabPanel value={value} index={7}>
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

export default CompanyProfile;

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
