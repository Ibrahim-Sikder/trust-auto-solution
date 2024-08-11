/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

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
import swal from "sweetalert";

import { useDeleteBillPayMutation } from "../../redux/api/bill-pay";

const BillPayList = ({ allBillPays }) => {
  const [deleteBillPay, { isLoading }] = useDeleteBillPayMutation();

  const deletePackage = async (id) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this card?",
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      try {
        await deleteBillPay(id).unwrap;
        swal("Deleted!", "Card delete successful.", "success");
      } catch (error) {
        swal("Error", "An error occurred while deleting the card.", "error");
      }
    }
  };

  return (
    <Box bgcolor="white" padding={3}>
      <Typography variant="h5" fontWeight="bold" marginBottom="15px">
        Bill History
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
            {allBillPays?.data?.billPays?.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{row.supplierId}</TableCell>

                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.mobile_number}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.shop_name}</TableCell>
                <TableCell align="center">{row.category}</TableCell>
                <TableCell align="center">{row.against_bill}</TableCell>
                <TableCell align="center">
                  <div className="flex justify-center">
                    <Link to={`/dashboard/billpay-view`}>
                      <IconButton title="See Profile">
                        <VisibilityIcon className="text-green-600" />
                      </IconButton>
                    </Link>
                    <Link to={`/dashboard/billpay-update?id=${row._id}`}>
                      <IconButton title="Edit">
                        <EditIcon />
                      </IconButton>
                    </Link>
                    <IconButton
                      onClick={() => deletePackage(row._id)}
                      disabled={isLoading}
                      title="Delete"
                    >
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

export default BillPayList;
