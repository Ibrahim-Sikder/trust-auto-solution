/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Pagination, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import {
  useDeletePurchaseMutation,
  useGetAllPurchasesQuery,
} from "../../../redux/api/purchase";

const PurchaseList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState("");

  const limit = 10;
  const { data: purchases, isLoading: purchasesLoading } =
    useGetAllPurchasesQuery({
      limit,
      page: currentPage,
      searchTerm: filterType,
    });

  const [deletePurchase, { isLoading: purchaseLoading }] =
    useDeletePurchaseMutation();

  const deletePackage = async (id) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this card?",
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      try {
        await deletePurchase(id).unwrap();
        swal("Deleted!", "Card delete successful.", "success");
      } catch (error) {
        swal("Error", "An error occurred while deleting the card.", "error");
      }
    }
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
              {/* <TableCell align="center">Against Bill </TableCell> */}
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {purchases?.data?.purchases?.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{row.purchase_no}</TableCell>

                <TableCell align="center">{row.full_name}</TableCell>
                <TableCell align="center">{row.phone_number}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.shop_name}</TableCell>
                <TableCell align="center">{row.category}</TableCell>
                {/* <TableCell align="center">{row.against_bill}</TableCell> */}
                <TableCell align="center">
                  <div className="flex justify-center">
                    <Link to={`/dashboard/update-purchase?id=${row._id}`}>
                      <IconButton title="Edit">
                        <EditIcon />
                      </IconButton>
                    </Link>
                    <IconButton
                      onClick={() => deletePackage(row._id)}
                      disabled={purchaseLoading}
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
        <div className="mt-2 mb-3">
          {purchases?.data?.purchases?.length > 0 && (
            <div className="flex justify-center mt-4">
              <Pagination
                count={purchases?.data?.meta?.totalPages}
                page={currentPage}
                color="primary"
                onChange={(_, page) => setCurrentPage(page)}
              />
            </div>
          )}
        </div>
      </TableContainer>
    </Box>
  );
};

export default PurchaseList;
