import { Autocomplete, TextField } from "@mui/material";
import { carBrands, cmDmOptions, fuelType, totalYear, vehicleTypes } from "../../../../constant";

const JobCardForm = () => {
  return (
    <div className=" flex items-center py-8 px-10">
    <div className="w-full">
      <h2 className="text-center text-[#42A1DA] font-bold text-2xl uppercase mb-5">
        Add Vehicle 
      </h2>
      <div>
        <form>
          <div className="grid grid-cols-3 gap-x-6"></div>
          <div>

          <div className="mt-3 mb-3">
            <div className="flex items-center">
            
              <Autocomplete
              className="jobCardSelect"
                id="free-solo-demo"
                Car
                Registration
                No
                options={cmDmOptions.map((option) => option.label)}
                renderInput={(params) => (
                  <TextField {...params} label="Car Reg No" />
                )}
              />
              <TextField
                className="addJobInputField"
                on
                label="Car R (T&N)"
              />
            </div>
          </div>
          <div>
            <TextField
              className="addJobInputField"
          
              label="Chassis No (T&N)"
            />
          </div>
          <div className="mt-3">
            <TextField
              className="addJobInputField"
            
              label="ENGINE NO & CC (T&N) "
            />
          </div>
          <div className="mt-3">
            <Autocomplete
            id="free-solo-demo"
            Vehicle
            Brand
            options={carBrands.map((option) => option.label)}
            renderInput={(params) => (
              <TextField {...params} label="Vehicle Brand" />
            )}
          />
          </div>
          <div className="mt-3">
            <TextField
              className="addJobInputField"
           
              label="Vehicle Name "
            />
          </div>
          <div className="mt-3">
          <Autocomplete
          id="free-solo-demo"
          Vehicle
          Brand
          options={totalYear.map((option) => option.title)}
          renderInput={(params) => (
            <TextField {...params} label=" Vehicle Model" />
          )}
        />
          </div>
          <div className="mt-3">
          <Autocomplete
          id="free-solo-demo"
          Vehicle
          Types
          options={vehicleTypes.map((option) => option.label)}
          renderInput={(params) => (
            <TextField {...params} label=" Vehicle Categories " />
          )}
        />
            
          </div>
          <div className="mt-3">
            <TextField
              className="addJobInputField"
         
              label="Color & Code (T&N) "
            />
          </div>
          <div className="mt-3">
            <TextField
              className="addJobInputField"
           
              label="Mileage (N) "
            />
          </div>
          <div className="mt-3">
          <Autocomplete
          id="free-solo-demo"
          Fuel
          Type
          options={fuelType.map((option) => option.label)}
          renderInput={(params) => (
            <TextField {...params} label=" Fuel Type" />
          )}
        />
          </div>
        </div>
          <button className="block mt-3 w-full bg-[#42A1DA] text-white font-bold p-4 rounded-lg">
            Add Vehicle
          </button>
        </form>
      </div>
    </div>
  </div>
  );
};

export default JobCardForm;
