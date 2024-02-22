import { FormControl, InputLabel, Select, TextField } from "@mui/material";

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
                <FormControl className="jobCardSelect">
                  <InputLabel htmlFor="grouped-native-select">
                    Car Registration No
                  </InputLabel>
                  <Select
                
                    native
                    id="grouped-native-select"
                    label="Car Registration No  "
                  >
                    <option value="CM-Ka">CM-Ka</option>
                    <option value="CM-Kha">CM-Kha</option>
                    <option value="CM-Ga">CM-Ga</option>
                    <option value="CM-Gha">CM-Gha</option>
                    <option value="CM-Cha">CM-Cha</option>
                    <option value="CM-Chha">CM-Chha</option>
                    <option value="CM-Ja">CM-Ja</option>
                    <option value="CM-Jha">CM-Jha</option>
                    <option value="CM-Ta">CM-Ta</option>
                    <option value="CM-Tha">CM-Tha</option>
                    <option value="CM-Da">CM-Da</option>
                    <option value="CM-Dha">CM-Dha</option>
                    <option value="CM-Na">CM-Na</option>
                    <option value="CM-Pa">CM-Pa</option>
                    <option value="CM-Pha">CM-Pha</option>
                    <option value="CM-Ba">CM-Ba</option>
                    <option value="CM-Bha">CM-Bha</option>
                    <option value="CM-Ma">CM-Ma</option>
                    <option value="CM-Ra">CM-Ra</option>
                    <option value="CM-La">CM-La</option>
                    <option value="CM-Sha">CM-Sha</option>
                    <option value="CM-Sa">CM-Sa</option>
                    <option value="CM-Ha">CM-Ha</option>
                    <option value="DM-Ka">DM-Ka</option>
                    <option value="DM-Kha">DM-Kha</option>
                    <option value="DM-Ga">DM-Ga</option>
                    <option value="DM-Gha">DM-Gha</option>
                    <option value="DM-Cha">DM-Cha</option>
                    <option value="DM-Chha">DM-Chha</option>
                    <option value="DM-Ja">DM-Ja</option>
                    <option value="DM-Jha">DM-Jha</option>
                    <option value="DM-Ta">DM-Ta</option>
                    <option value="DM-Tha">DM-Tha</option>
                    <option value="DM-Da">DM-Da</option>
                    <option value="DM-Dha">DM-Dha</option>
                    <option value="DM-Na">DM-Na</option>
                    <option value="DM-Pa">DM-Pa</option>
                    <option value="DM-Pha">DM-Pha</option>
                    <option value="DM-Ba">DM-Ba</option>
                    <option value="DM-Bha">DM-Bha</option>
                    <option value="DM-Ma">DM-Ma</option>
                    <option value="DM-Ra">DM-Ra</option>
                    <option value="DM-La">DM-La</option>
                    <option value="DM-Sha">DM-Sha</option>
                    <option value="DM-Sa">DM-Sa</option>
                    <option value="DM-Ha">DM-Ha</option>
                  </Select>
                </FormControl>
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
              <FormControl className="addJobInputField">
                <InputLabel htmlFor="grouped-native-select">
                  Vehicle Brand
                </InputLabel>
                <Select
                  className="addJobInputField"
              
                  native
                  id="grouped-native-select"
                  label="Vehicle Brand"
                >
                  <option value="Acura">Acura</option>
                  <option value="Alfa Romeo">Alfa Romeo</option>
                  <option value="Aston Martin">Aston Martin</option>
                  <option value="Audi">Audi</option>
                  <option value="Austin">Austin</option>
                  <option value="Bentley">Bentley</option>
                  <option value="BMW">BMW</option>
                  <option value="Brilliance">Brilliance</option>
                  <option value="Bugatti">Bugatti</option>
                  <option value="Buick">Buick</option>
                  <option value="BYD">BYD</option>
                  <option value="Cadillac">Cadillac</option>
                  <option value="Chana">Chana</option>
                  <option value="Changan">Changan</option>
                  <option value="Chery">Chery</option>
                  <option value="Chevrolet">Chevrolet</option>
                  <option value="Chrysler">Chrysler</option>
                  <option value="Citroën">Citroën</option>
                  <option value="Dacia">Dacia</option>
                  <option value="Dadi">Dadi</option>
                  <option value="Daewoo">Daewoo</option>
                  <option value="Daihatsu">Daihatsu</option>
                  <option value="Datsun">Datsun</option>
                  <option value="De Lorean">De Lorean</option>
                  <option value="Derways">Derways</option>
                  <option value="Dodge">Dodge</option>
                  <option value="DongFeng">DongFeng</option>
                  <option value="DS">DS</option>
                  <option value="Eagle">Eagle</option>
                  <option value="FAW">FAW</option>
                  <option value="Ferrari">Ferrari</option>
                  <option value="Fiat">Fiat</option>
                  <option value="Ford">Ford</option>
                  <option value="Foton">Foton</option>
                  <option value="GAC">GAC</option>
                  <option value="Geely">Geely</option>
                  <option value="Genesis">Genesis</option>
                  <option value="Geo">Geo</option>
                  <option value="GMC">GMC</option>
                  <option value="Great Wall">Great Wall</option>
                  <option value="Hafei">Hafei</option>
                  <option value="Haima">Haima</option>
                  <option value="Haval">Haval</option>
                  <option value="Holden">Holden</option>
                  <option value="Honda">Honda</option>
                  <option value="Hummer">Hummer</option>
                  <option value="Hyundai">Hyundai</option>
                  <option value="Infiniti">Infiniti</option>
                  <option value="Iran Khodro">Iran Khodro</option>
                  <option value="Isuzu">Isuzu</option>
                  <option value="JAC">JAC</option>
                  <option value="Jaguar">Jaguar</option>
                  <option value="Jeep">Jeep</option>
                  <option value="Kia">Kia</option>
                  <option value="Lamborghini">Lamborghini</option>
                  <option value="Lancia">Lancia</option>
                  <option value="Land Rover">Land Rover</option>
                  <option value="Lexus">Lexus</option>
                  <option value="Lifan">Lifan</option>
                  <option value="Lincoln">Lincoln</option>
                  <option value="Lotus">Lotus</option>
                  <option value="Luxgen">Luxgen</option>
                  <option value="Maserati">Maserati</option>
                  <option value="Maybach">Maybach</option>
                  <option value="Mazda">Mazda</option>
                  <option value="Mercedes Benz">Mercedes Benz</option>
                  <option value="Mercury">Mercury</option>
                  <option value="MG">MG</option>
                  <option value="Mini">Mini</option>
                  <option value="Mitsubishi">Mitsubishi</option>
                  <option value="Nissan">Nissan</option>
                  <option value="Oldsmobile">Oldsmobile</option>
                  <option value="Opel">Opel</option>
                  <option value="Peugeot">Peugeot</option>
                  <option value="Plymouth">Plymouth</option>
                  <option value="Pontiac">Pontiac</option>
                  <option value="Porsche">Porsche</option>
                  <option value="Ravon">Ravon</option>
                  <option value="Renault">Renault</option>
                  <option value="Rolls-Royce">Rolls-Royce</option>
                  <option value="Rover">Rover</option>
                  <option value="Saab">Saab</option>
                  <option value="Saturn">Saturn</option>
                  <option value="Scion">Scion</option>
                  <option value="SEAT">SEAT</option>
                  <option value="Skoda">Skoda</option>
                  <option value="Smart">Smart</option>
                  <option value="SsangYong">SsangYong</option>
                  <option value="Subaru">Subaru</option>
                  <option value="Suzuki">Suzuki</option>
                  <option value="Tesla">Tesla</option>
                  <option value="Toyota">Toyota</option>
                  <option value="Vauxhall">Vauxhall</option>
                  <option value="Volkswagen">Volkswagen</option>
                  <option value="Volvo">Volvo</option>
                  <option value="Zotye">Zotye</option>
                  <option value="Chinese cars">Chinese cars</option>
                  <option value="USA cars">USA cars</option>
                </Select>
              </FormControl>
            </div>
            <div className="mt-3">
              <TextField
                className="addJobInputField"
             
                label="Vehicle Name "
              />
            </div>
            <div className="mt-3">
              <TextField
                className="addJobInputField"
              
                label="Vehicle Model (N)"
              />
            </div>
            <div className="mt-3">
              <FormControl className="addJobInputField">
                <InputLabel htmlFor="grouped-native-select">
                  Select Vehicle Category{" "}
                </InputLabel>
                <Select
                  onCha
                  native
                  defaultValue=""
                  id="grouped-native-select"
                  label="Select Vehicle Category  "
                >
                  <option value="Vehicle Type ">Vehicle Type</option>
                  <option value="Sedans">Sedans</option>
                  <option value="Crossovers">Crossovers</option>
                  <option value="Sports">Sports</option>
                  <option value="Trucks">Trucks</option>
                  <option value="Coupes">Coupes</option>
                  <option value="Convertibles">Convertibles</option>
                  <option value="Diesels">Diesels</option>
                  <option value="SUVs">SUVs</option>
                  <option value="Hybrid/Electric">Hybrid/Electric</option>
                  <option value="Vans/Minivans">Vans/Minivans</option>
                  <option value="Wagons">Wagons</option>
                  <option value="Small Cars ">Small Cars </option>
                  <option value="CPO ">CPO </option>
                </Select>
              </FormControl>
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
              <TextField
                className="addJobInputField"
           
                label="Fuel Type (T&N) "
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
