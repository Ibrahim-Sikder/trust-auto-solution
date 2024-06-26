import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const EmployeeAccount = () => {
  return (
    <div className="customerProfileWrap">
      <div>
        <div className="grid grid-cols-1  xl:grid-cols-5 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          <div className=" employeeCard">
            <div className="flex items-center justify-between w-full px-5 py-3">
              <div className="flex items-center">
                <div style={{ width: 80, height: 80 }}>
                  <CircularProgressbar
                    value={66}
                    text={`${66}%`}
                    styles={{
                      // Customize the root element (outer circle)
                      path: {
                        stroke: `#60BE6B`, // Set the color of the progress bar
                      },
                      // Customize the text
                      text: {
                        fill: "#3e98c7", // Set the color of the text
                      },
                      // Customize the trail (background)
                      trail: {
                        stroke: "#f4f4f4", // Set the color of the background
                      },
                    }}
                  />
                </div>
                <h4 className="ml-2 text-sm font-semibold">In Time </h4>
              </div>
              <b>20</b>
            </div>
          </div>
          <div className=" employeeCard">
            <div className="flex items-center justify-between w-full px-5 py-3">
              <div className="flex items-center">
                <div style={{ width: 80, height: 80 }}>
                  <CircularProgressbar
                    value={96}
                    text={`${96}%`}
                    styles={{
                      // Customize the root element (outer circle)
                      path: {
                        stroke: `#60BE6B`, // Set the color of the progress bar
                      },
                      // Customize the text
                      text: {
                        fill: "#3e98c7", // Set the color of the text
                      },
                      // Customize the trail (background)
                      trail: {
                        stroke: "#f4f4f4", // Set the color of the background
                      },
                    }}
                  />
                </div>
                <h4 className="ml-2 text-sm font-semibold">Out Time </h4>
              </div>
              <b>20</b>
            </div>
          </div>
          <div className=" employeeCard">
            <div className="flex items-center justify-between w-full px-5 py-3">
              <div className="flex items-center">
                <div style={{ width: 80, height: 80 }}>
                  <CircularProgressbar
                    value={10}
                    text={`${10}%`}
                    styles={{
                      // Customize the root element (outer circle)
                      path: {
                        stroke: `#F62D51`, // Set the color of the progress bar
                      },
                      // Customize the text
                      text: {
                        fill: "#3e98c7", // Set the color of the text
                      },
                      // Customize the trail (background)
                      trail: {
                        stroke: "#f4f4f4", // Set the color of the background
                      },
                    }}
                  />
                </div>
                <h4 className="ml-2 text-sm font-semibold">Absent </h4>
              </div>
              <b>20</b>
            </div>
          </div>
          <div className=" employeeCard">
            <div className="flex items-center justify-between w-full px-5 py-3">
              <div className="flex items-center">
                <div style={{ width: 80, height: 80 }}>
                  <CircularProgressbar
                    value={20}
                    text={`${20}%`}
                    styles={{
                      // Customize the root element (outer circle)
                      path: {
                        stroke: `#FF851A`, // Set the color of the progress bar
                      },
                      // Customize the text
                      text: {
                        fill: "#3e98c7", // Set the color of the text
                      },
                      // Customize the trail (background)
                      trail: {
                        stroke: "#f4f4f4", // Set the color of the background
                      },
                    }}
                  />
                </div>
                <h4 className="ml-2 text-sm font-semibold">Vacation </h4>
              </div>
              <b>20</b>
            </div>
          </div>
          <div className=" employeeCard">
            <div className="flex items-center justify-between w-full px-5 py-3">
              <div className="flex items-center">
                <div style={{ width: 80, height: 80 }}>
                  <CircularProgressbar
                    value={5}
                    text={`${5}%`}
                    styles={{
                      // Customize the root element (outer circle)
                      path: {
                        stroke: `#FF851A`, // Set the color of the progress bar
                      },
                      // Customize the text
                      text: {
                        fill: "#3e98c7", // Set the color of the text
                      },
                      // Customize the trail (background)
                      trail: {
                        stroke: "#f4f4f4", // Set the color of the background
                      },
                    }}
                  />
                </div>
                <h4 className="ml-2 text-sm font-semibold">Late </h4>
              </div>
              <b>20</b>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-5 mt-10 place-items-center  place-content-center  ">
          <div className="employeeProfileCard">
            <h3 className="text-xl font-semibold">Personal Information </h3>
            <div className="flex items-center justify-between mt-5">
                <div className="space-y-3">
                  <b className="block">Name</b>
                  <b className="block">Email </b>
                  <b className="block">Phone </b>
                  <b className="block">Birth Date </b>
                  <b className="block">NID </b>
                </div>
                <div className="space-y-3">
                  <span className="block"> : Ariful Islam </span>
                  <span className="block">: ali@gmail.com </span>
                  <span className="block">: 0484848445 </span>
                  <span className="block">: 10-05-2024 </span>
                  <span className="block">: 478987645678 </span>
                </div>
              </div>
          
          
          </div>
          <div className="employeeProfileCard">
          <h3 className="text-xl font-semibold">Emergency Contact</h3>
          
          <div className="flex items-center justify-between mt-5">
          <div className="space-y-3">
            <b className="block">Name</b>
            <b className="block">Relationship </b>
            <b className="block">Phone </b>
            <b className="block">Occupation </b>
           
          </div>
          <div className="space-y-3">
            <span className="block"> : Akbor Ali  </span>
            <span className="block">: Father </span>
            <span className="block">: 0484848445 </span>
            <span className="block">: Farmar </span>
                
          </div>
        </div>
        
         
        </div>
          <div className="employeeProfileCard">
            <h3 className="text-xl font-semibold">Address Information </h3>
            
            <div className="flex items-center justify-between mt-5">
            <div className="space-y-3">
              <b className="block">Country</b>
              <b className="block">Town / City </b>
              <b className="block">Address </b>
            </div>
            <div className="space-y-3">
              <span className="block"> : Bangladesh </span>
              <span className="block">: Dhaka </span>
              <span className="block">:  Kuril Bishawroad, Dhaka-1212 </span>
         
            </div>
          </div>
          
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAccount;
