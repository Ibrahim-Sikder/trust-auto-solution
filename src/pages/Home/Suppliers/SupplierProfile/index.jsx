import { HiLocationMarker } from "react-icons/hi"
import { HiEnvelope, HiMiniPhone } from "react-icons/hi2"
import { ImUserTie } from "react-icons/im";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import "react-tabs/style/react-tabs.css"
import SupplierAccount from "./SupplierAccount";

const SupplierProfile = () => {

  return (
    <div>
      <div className="w-full h-52 p-5 mt-5 bg-[#03045E] text-white flex items-center  relative">
      <div className="border bg-[#F77F00] p-5 rounded-md flex item-end  ">
      <div>
      <h3 className="text-2xl">Ariful Islam</h3>
      <div className="space-y-2 mt-3">
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
              <div className="w-32 h-32 flex items-center justify-center">
                <ImUserTie size="130" className="text-white" />
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
            <SupplierAccount/>
          </TabPanel>
         
        </Tabs>

        <div>
          <p className="text-center my-5">
            © Copyright 2024 | Trust Auto Solution | All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  )
}

export default SupplierProfile
