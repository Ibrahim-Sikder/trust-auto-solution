/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { FaFileInvoice } from "react-icons/fa";
import HeaderButton from "../../components/CommonButton/HeaderButton";
import { NotificationAdd } from "@mui/icons-material";
import { FaUserGear } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { useState } from "react";
import BillPayList from "./BillPayList";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const BillPay = () => {
  const { register, watch } = useForm();
  const payment = watch("payment_method");

  const onSubmit = async (data) => {};

  return (
    <Box>
      <section className="py-5 xl:py-0">
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

          <Paper
            sx={{
              width: {
                lg: "1200px",
                md: "100%",
              },
              margin: "auto",
              padding: "30px",
            }}
          >
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
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField fullWidth label="Supplier ID" id="Tax" />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField fullWidth label="Name" id="Tax" />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField fullWidth label="Mobile" id="Tax" />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField fullWidth label="Address" id="Tax" />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField fullWidth label="Email" id="Tax" />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField fullWidth label="Shop Name" id="Tax" />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField fullWidth label="Against Bill" id="Tax" />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
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

            <Box marginTop="20px">
              <Typography variant="h5" fontWeight="bold" marginBottom="20px">
                Payment Method
              </Typography>
              <Grid container spacing={2}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField fullWidth label="Amount" {...register("amount")} />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Paid On"
                    {...register("paid_on")}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Individual Markup"
                    {...register("payment_individual_markup")}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="payment-method-select">
                      Payment Method
                    </InputLabel>
                    <Select
                      //   onChange={handlePaymentChange}
                      label="Payment Method"
                      id="payment-method-select"
                      {...register("payment_method")}
                    >
                      <MenuItem value="Bkash">Bkash</MenuItem>
                      <MenuItem value="Nagad">Nagad</MenuItem>
                      <MenuItem value="Rocket">Rocket</MenuItem>
                      <MenuItem value="Check">Check</MenuItem>
                      <MenuItem value="Card">Card</MenuItem>
                      <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Box marginTop={4} md={6} sm={12} xs={12}>
                <Grid container spacing={2}>
                  {payment && (
                    <>
                      {payment === "Check" && (
                        <>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <FormControl fullWidth>
                              <InputLabel htmlFor="payment-account-select">
                                Select Bank
                              </InputLabel>
                              <Select
                                label="Payment Account"
                                id="payment-account-select"
                                {...register("payment_account")}
                              >
                                <MenuItem value="Bangladesh Bank">
                                  Bangladesh Bank
                                </MenuItem>
                                <MenuItem value="Sonali Bank">
                                  Sonali Bank
                                </MenuItem>
                                <MenuItem value="Janata Bank">
                                  Janata Bank
                                </MenuItem>
                                <MenuItem value="Agrani Bank">
                                  Agrani Bank
                                </MenuItem>
                                <MenuItem value="Rupali Bank">
                                  Rupali Bank
                                </MenuItem>
                                <MenuItem value="Pubali Bank">
                                  Pubali Bank
                                </MenuItem>
                                <MenuItem value="Uttara Bank">
                                  Uttara Bank
                                </MenuItem>
                                <MenuItem value="Islami Bank Bangladesh Limited">
                                  Islami Bank Bangladesh Limited
                                </MenuItem>
                                <MenuItem value="Dutch-Bangla Bank">
                                  Dutch-Bangla Bank
                                </MenuItem>
                                <MenuItem value="BRAC Bank">BRAC Bank</MenuItem>
                                <MenuItem value="Eastern Bank">
                                  Eastern Bank
                                </MenuItem>
                                <MenuItem value="National Bank">
                                  National Bank
                                </MenuItem>
                                <MenuItem value="Prime Bank">
                                  Prime Bank
                                </MenuItem>
                                <MenuItem value="South Bangla Agriculture and Commerce Bank">
                                  South Bangla Agriculture and Commerce Bank
                                </MenuItem>
                                <MenuItem value="Standard Bank">
                                  Standard Bank
                                </MenuItem>
                                <MenuItem value="One Bank">One Bank</MenuItem>
                                <MenuItem value="Bank Asia">Bank Asia</MenuItem>
                                <MenuItem value="Trust Bank">
                                  Trust Bank
                                </MenuItem>
                                <MenuItem value="Jamuna Bank">
                                  Jamuna Bank
                                </MenuItem>
                                <MenuItem value="Shahjalal Islami Bank">
                                  Shahjalal Islami Bank
                                </MenuItem>
                                <MenuItem value="City Bank">City Bank</MenuItem>
                                <MenuItem value="Southeast Bank">
                                  Southeast Bank
                                </MenuItem>
                                <MenuItem value="Social Islami Bank">
                                  Social Islami Bank
                                </MenuItem>
                                <MenuItem value="AB Bank">AB Bank</MenuItem>
                                <MenuItem value="IFIC Bank">IFIC Bank</MenuItem>
                                <MenuItem value="Mercantile Bank">
                                  Mercantile Bank
                                </MenuItem>
                                <MenuItem value="Mutual Trust Bank">
                                  Mutual Trust Bank
                                </MenuItem>
                                <MenuItem value="EXIM Bank">EXIM Bank</MenuItem>
                                <MenuItem value="NCC Bank">NCC Bank</MenuItem>
                                <MenuItem value="SBAC Bank">SBAC Bank</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                              fullWidth
                              label="Account Number "
                              {...register("check_no")}
                            />
                          </Grid>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                              fullWidth
                              label="Check No"
                              {...register("check_no")}
                            />
                          </Grid>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <Button
                              component="label"
                              role={undefined}
                              variant="contained"
                              tabIndex={-1}
                              startIcon={<CloudUploadIcon />}
                              sx={{
                                fontSize: "12px",
                                color: "#FFFFFF",
                                padding: "10px",
                                backgroundColor: "#1976d2",
                                "&:hover": {
                                  backgroundColor: "#115293",
                                },
                              }}
                            >
                              Upload File / Image
                              <VisuallyHiddenInput type="file" />
                            </Button>
                          </Grid>
                        </>
                      )}
                      {payment === "Bank Transfer" && (
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                          <TextField
                            fullWidth
                            label="Bank Account No"
                            {...register("bank_account_no")}
                            marginTop={2}
                          />
                        </Grid>
                      )}
                      {payment === "Cash" && (
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                          <TextField
                            fullWidth
                            multiline
                            rows={4}
                            placeholder="Expense Note"
                            {...register("cash_expense_note")}
                            marginTop={2}
                          />
                        </Grid>
                      )}
                      {payment === "Card" && (
                        <>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                              fullWidth
                              label="Card Number"
                              {...register("card_number")}
                            />
                          </Grid>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                              fullWidth
                              label="Card Holder Name"
                              {...register("card_holder_name")}
                            />
                          </Grid>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                              fullWidth
                              label="Card Transaction No."
                              {...register("card_transaction_no")}
                            />
                          </Grid>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                              fullWidth
                              label="Card Type"
                              {...register("card_type")}
                            />
                          </Grid>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                              fullWidth
                              label="Month"
                              {...register("month_first")}
                            />
                          </Grid>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                              fullWidth
                              label="Year"
                              {...register("year")}
                            />
                          </Grid>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                              fullWidth
                              label="Month"
                              {...register("month_second")}
                            />
                          </Grid>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                              fullWidth
                              label="Security Code"
                              {...register("security_code")}
                            />
                          </Grid>
                        </>
                      )}
                      {payment === "Other" && (
                        <>
                          <Grid item lg={12}>
                            <TextField
                              fullWidth
                              label="Transition No"
                              {...register("other_transaction_no")}
                              marginTop={2}
                            />
                          </Grid>
                          <Grid item lg={6}>
                            <TextField
                              fullWidth
                              label="Transition ID"
                              {...register("other_transaction_id")}
                              marginTop={2}
                            />
                          </Grid>
                        </>
                      )}
                      {(payment === "Bkash" ||
                        payment === "Nagad" ||
                        payment === "Rocket") && (
                        <>
                          <Grid item lg={6}>
                            <TextField
                              fullWidth
                              label="Transition No"
                              {...register("other_transaction_no")}
                              marginTop={2}
                            />
                          </Grid>
                          <Grid item lg={6}>
                            <TextField
                              fullWidth
                              label="Transition ID"
                              {...register("other_transaction_id")}
                              marginTop={2}
                            />
                          </Grid>
                        </>
                      )}
                      <Grid item lg={12} sm={12} xs={12}>
                        <TextField
                          fullWidth
                          multiline
                          rows={4}
                          placeholder="Expense Note"
                          {...register("other_expense_note")}
                          marginTop={4}
                        />
                      </Grid>
                    </>
                  )}
                </Grid>
              </Box>
              <div className="flex justify-end mt-3">
                <Button sx={{ color: "white", width: "200px" }}>Submit</Button>
              </div>
            </Box>
          </Paper>
        </div>
        <BillPayList />
      </section>
    </Box>
  );
};

export default BillPay;
