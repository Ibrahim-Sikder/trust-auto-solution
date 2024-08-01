/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-no-undef */

import TextField from "@mui/material/TextField";
import { FaFileInvoice } from "react-icons/fa";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  styled,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const AddExpense = () => {
  const [value, setValue] = useState();

  return (
    <section>
      <div className="addProductWraps">
        <div className="productHeadWrap">
          <div className="flex items-center md:justify-center ">
            <FaFileInvoice className="invoicIcon" />
            <div className="ml-2">
              <h3 className="md:text-2xl font-bold">Add Income </h3>
              <span className="text-sm">Dashboard / Income </span>
            </div>
          </div>
        </div>

        <div className="addProductWrap">
          <Typography
            variant="h5"
            fontWeight="bold"
            textAlign="center"
            marginBottom="20px"
          >
            Add Income
          </Typography>
          <form>
            <Grid container spacing={2}>
              <Grid item lg={6} md={6} xs={12} sm={6}>
                <TextField
                  fullWidth
                  size="small"
                  select
                  name="category"
                  label="Income Category"
                >
                  {[
                    "Repair Services",
                    "Oil Change",
                    "Tire Sales",
                    "Spare Parts Sales",
                    "Vehicle Inspection",
                    "Car Wash",
                    "Towing Service",
                  ].map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item lg={6} md={6} xs={12} sm={6}>
                <TextField name="income" label="Income Name" fullWidth />
              </Grid>
              <Grid item lg={6} md={6} xs={12} sm={6}>
                <TextField name="invoice" label="Invoice Number" fullWidth />
              </Grid>
              <Grid item lg={6} md={6} xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Select Date"
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item lg={6} md={6} xs={12} sm={6}>
                <TextField name="amount" label="Amount" fullWidth />
              </Grid>
              <Grid item lg={12} md={6} xs={12} sm={6}>
                <TextareaAutosize
                  minRows={3}
                  style={{
                    padding: "4px",
                    border: "1px solid #ddd",
                    width: "100%",
                    borderRadius:'3px'
                  }}
                  name="assignment"
                  placeholder="Description"
                />
              </Grid>
              <div className="flex justify-end w-full mt-10 ">
                <Button sx={{ color: "white", width: "200px", margin: "auto" }}>
                  Submit
                </Button>
              </div>
            </Grid>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddExpense;
