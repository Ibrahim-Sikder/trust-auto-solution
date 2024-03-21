import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const EmployeeAccount = () => {
  return (
    <div className="customerProfileWrap">
      <div>
        <div className="grid grid-cols-5 gap-5 mt-14">
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
                    value={66}
                    text={`${66}%`}
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
                    value={66}
                    text={`${66}%`}
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
                  value={66}
                  text={`${66}%`}
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
        </div>
        <div className="justify-between block mt-10 md:flex">
          <div className="employeeProfileCard">
            <h3 className="text-xl font-semibold">Personal Informations </h3>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center w-[450px] justify-between">
                <b>Name</b>
                <span> : Ariful Islam </span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center w-[450px] justify-between text-justify ">
                <b>Phone No </b> <span>: 0578437883 </span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center w-[450px] justify-between">
                <b>Email </b> <span> : employee@gmail.com </span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center w-[450px] justify-between">
                <b>Religion </b> <small> : Islam </small>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center w-[450px] justify-between">
                <b>Nationality </b> <small> : Bangladesh </small>
              </div>
            </div>
          </div>
          <div className="text-justify employeeProfileCard">
            <h3 className="text-xl font-semibold">Emergency Contact</h3>
            <span className="mt-3 text-xl font-semibold ">Primary </span>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center w-[450px] justify-between">
                <b>Name</b>
                <span> : Akbor Ali </span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center w-[450px] justify-between text-justify ">
                <b>Relationship </b> <span>: Father </span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center w-[450px] justify-between">
                <b>Phone </b> <span> : 0484848445 </span>
              </div>
            </div>
            <span className="mt-3 text-xl font-semibold ">Secondary </span>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center w-[450px] justify-between">
                <b>Name</b>
                <span> : Akbor Ali </span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center w-[450px] justify-between text-justify ">
                <b>Relationship </b> <span>: Father </span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center w-[450px] justify-between text-justify ">
                <b>Phone </b> <span>: 054877585885 </span>
              </div>
            </div>
          </div>
          <div className="employeeProfileCard">
            <h3 className="text-xl font-semibold">Emergency Contact</h3>
            <span className="mt-3 text-xl font-semibold ">Primary </span>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center w-[450px] justify-between">
                <b>Name</b>
                <span> : Akbor Ali </span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center w-[450px] justify-between text-justify ">
                <b>Relationship </b> <span>: Father </span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center w-[450px] justify-between">
                <b>Phone </b> <span> : 0484848445 </span>
              </div>
            </div>
            <span className="mt-3 text-xl font-semibold ">Secondary </span>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center w-[450px] justify-between">
                <b>Name</b>
                <span> : Akbor Ali </span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center w-[450px] justify-between text-justify ">
                <b>Relationship </b> <span>: Father </span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center w-[450px] justify-between text-justify ">
                <b>Phone </b> <span>: 054877585885 </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAccount;
