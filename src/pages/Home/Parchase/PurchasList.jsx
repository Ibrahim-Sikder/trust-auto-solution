/* eslint-disable no-unused-vars */
"use client";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Button, Grid, Typography } from "@mui/material";
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
    supplierId: "123",
    name: "John Doe",
    mobile: "123-456-7890",
    email: "john@example.com",
    shopName: "John's Shop",
    vendorCategory: "New Parts",
    againstBill: "456",
  },
  {
    supplierId: "123",
    name: "John Doe",
    mobile: "123-456-7890",
    email: "john@example.com",
    shopName: "John's Shop",
    vendorCategory: "New Parts",
    againstBill: "456",
  },
  {
    supplierId: "123",
    name: "John Doe",
    mobile: "123-456-7890",
    email: "john@example.com",
    shopName: "John's Shop",
    vendorCategory: "New Parts",
    againstBill: "456",
  },
];

const PurchaseList = () => {
  const handleSubmit = (data) => {
    console.log(data);
  };
  return (
    <Box bgcolor="white" padding={3}>
      <Typography variant="h5" fontWeight="bold" marginBottom="15px">
        Purchase List
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Suplier ID</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Mobile</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Shop Name </TableCell>
              <TableCell align="center">Vendor Categories </TableCell>
              <TableCell align="center">Against Bill </TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{row.supplierId}</TableCell>

                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.mobile}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.shopName}</TableCell>
                <TableCell align="center">{row.vendorCategory}</TableCell>
                <TableCell align="center">{row.againstBill}</TableCell>
                <TableCell align="center">
                  <div className="flex justify-center">
                  <IconButton title="See Profile">
                        <VisibilityIcon className="text-green-600" />
                      </IconButton>
                    <Link to={`/dashboard/update-purchase`}>
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

export default PurchaseList;
