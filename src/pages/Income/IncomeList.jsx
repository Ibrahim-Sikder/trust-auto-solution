/* eslint-disable no-unused-vars */
"use client";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";
import { Link } from "react-router-dom";

const rows = [
  {
    SL: 1,
    IncomeCategory: "Repair Services",
    IncomeName: "Engine Repair",
    InvoiceNumber: "INV-1001",
    Amount: 250.0,
    Date: "2023-07-15",
  },
  {
    SL: 2,
    IncomeCategory: "Oil Change",
    IncomeName: "Regular Oil Change",
    InvoiceNumber: "INV-1002",
    Amount: 45.0,
    Date: "2023-07-16",
  },
  {
    SL: 3,
    IncomeCategory: "Tire Sales",
    IncomeName: "New Tire Sale",
    InvoiceNumber: "INV-1003",
    Amount: 300.0,
    Date: "2023-07-17",
  },
  {
    SL: 4,
    IncomeCategory: "Spare Parts Sales",
    IncomeName: "Brake Pads",
    InvoiceNumber: "INV-1004",
    Amount: 75.0,
    Date: "2023-07-18",
  },
  {
    SL: 5,
    IncomeCategory: "Vehicle Inspection",
    IncomeName: "Annual Inspection",
    InvoiceNumber: "INV-1005",
    Amount: 60.0,
    Date: "2023-07-19",
  },
  {
    SL: 6,
    IncomeCategory: "Car Wash",
    IncomeName: "Full Service Wash",
    InvoiceNumber: "INV-1006",
    Amount: 25.0,
    Date: "2023-07-20",
  },
  {
    SL: 7,
    IncomeCategory: "Towing Service",
    IncomeName: "Emergency Towing",
    InvoiceNumber: "INV-1007",
    Amount: 150.0,
    Date: "2023-07-21",
  },
];

const IncomeList = () => {
  const handleSubmit = (data) => {
    console.log(data);
  };
  return (
    <Box bgcolor="white" padding={3}>
      <Typography variant="h5" fontWeight="bold" marginBottom="15px">
        Income History
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">SL</TableCell>
              <TableCell align="center">Income Category </TableCell>
              <TableCell align="center">Income Name </TableCell>
              <TableCell align="center">Invoice Number</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{row.SL}</TableCell>

                <TableCell align="center">{row.IncomeCategory}</TableCell>
                <TableCell align="center">{row.IncomeName}</TableCell>
                <TableCell align="center">{row.InvoiceNumber}</TableCell>
                <TableCell align="center">{row.Amount}</TableCell>
                <TableCell align="center">{row.Date}</TableCell>
                <TableCell align="center">
                  <div className="flex justify-center">
                    <Link to={`/dashboard/billpay-view`}>
                      <IconButton title="See Profile">
                        <VisibilityIcon className="text-green-600" />
                      </IconButton>
                    </Link>
                    <Link to={`/dashboard/billpay-update`}>
                      <IconButton title="Edit">
                        <EditIcon />
                      </IconButton>
                    </Link>
                    <IconButton title="Delete">
                      <DeleteIcon className="text-red-600" />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default IncomeList;
