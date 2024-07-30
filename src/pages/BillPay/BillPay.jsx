/* eslint-disable no-unused-vars */
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FaFileInvoice } from "react-icons/fa";
import HeaderButton from "../../components/CommonButton/HeaderButton";
import { NotificationAdd } from "@mui/icons-material";
import { FaUserGear } from "react-icons/fa6";

const AddExpense = () => {
  const onSubmit = async (data) => {

  };

  return (
    <Box>
      <section>
        <div className="addProductWraps">
          <div className="flex justify-between  border-b-2">
            <HeaderButton />
            <div className="flex items-end justify-end">
              <NotificationAdd size={30} className="mr-2" />
              <FaUserGear size={30} />
            </div>
          </div>
          <div className="productHeadWrap">
            <div className="flex items-center md:justify-center ">
              <FaFileInvoice className="invoicIcon" />
              <div className="ml-2">
                <h3 className="md:text-2xl font-bold">Pay bill </h3>
                <span className="text-sm">Dashboard / Pay bill </span>
              </div>
            </div>
          </div>

          <Paper sx={{ width: "1200px", margin: "auto", padding: "30px" }}>
            <Box>
              <Typography
                variant="h5"
                fontWeight="bold"
                textAlign="center"
                marginBottom="20px"
              >
                Bill Info{" "}
              </Typography>
              <Grid container spacing={2}>
                <Grid item lg={6}>
                  <TextField fullWidth label="Supplier ID" id="Tax" />
                </Grid>
                <Grid item lg={6}>
                  <TextField fullWidth label="Name" id="Tax" />
                </Grid>
                <Grid item lg={6}>
                  <TextField fullWidth label="Mobile" id="Tax" />
                </Grid>
                <Grid item lg={6}>
                  <TextField fullWidth label="Address" id="Tax" />
                </Grid>
                <Grid item lg={6}>
                  <TextField fullWidth label="Email" id="Tax" />
                </Grid>
                <Grid item lg={6}>
                  <TextField fullWidth label="Shop Name" id="Tax" />
                </Grid>
                <Grid item lg={6}>
                  <TextField fullWidth label="Against Bill" id="Tax" />
                </Grid>
                <Grid item lg={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="grouped-native-select">
                     Vendor Categories
                    </InputLabel>
                    <Select
                      labelId="payment-method-label"
                      id="grouped-native-select"
                      label="Supplier Category "
                    >
                      <MenuItem value="New Parts">New Parts</MenuItem>
                      <MenuItem value="Recondition Parts">
                        Recondition Parts
                      </MenuItem>
                      <MenuItem value="New & Recondition Parts">
                        New & Recondition Parts
                      </MenuItem>
                      <MenuItem value="Body Items">Body Items</MenuItem>
                      <MenuItem value="Engine & Suspension Items">
                        Engine & Suspension Items
                      </MenuItem>
                      <MenuItem value="Electric Items">Electric Items</MenuItem>
                      <MenuItem value="Others">Others</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </div>
      </section>
    </Box>
  );
};

export default AddExpense;
