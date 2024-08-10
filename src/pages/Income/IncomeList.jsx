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
  useDeleteIncomeMutation,
  useGetAllIncomesQuery,
} from "../../redux/api/income";
import Loading from "../../components/Loading/Loading";

const IncomeList = () => {
 
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 15;

  const { data: allIncomes, isLoading: incomeLoading } = useGetAllIncomesQuery({
    limit,
    page: currentPage,
     
  });

  const [deleteIncome, { isLoading: deleteLoading }] =
    useDeleteIncomeMutation();

  const deletePackage = async (id) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this card?",
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      try {
        await deleteIncome(id).unwrap();
        swal("Deleted!", "Card delete successful.", "success");
      } catch (error) {
        swal("Error", "An error occurred while deleting the card.", "error");
      }
    }
  };

  if (incomeLoading) {
    return <Loading />;
  }

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
            {allIncomes?.data?.incomes?.map((row, index) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{index + 1}</TableCell>

                {row?.category?.map((category, index) => (
                  <TableCell key={index} align="center">
                    {category}
                  </TableCell>
                ))}

                <TableCell align="center">{row.income_name}</TableCell>
                <TableCell align="center">{row.invoice_number}</TableCell>
                <TableCell align="center">{row.amount}</TableCell>
                <TableCell align="center">{row.date}</TableCell>
                <TableCell align="center">
                  <div className="flex justify-center">
                    <Link to={`/dashboard/update-income?id=${row?._id}`}>
                      <IconButton title="Edit">
                        <EditIcon />
                      </IconButton>
                    </Link>
                    <IconButton
                      disabled={deleteLoading}
                      onClick={() => deletePackage(row?._id)}
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

      {allIncomes?.data?.incomes?.length > 0 && (
        <div className="flex justify-center mt-4">
          <Pagination
            count={allIncomes?.data?.meta?.totalPages}
            page={currentPage}
            color="primary"
            onChange={(_, page) => setCurrentPage(page)}
          />
        </div>
      )}
    </Box>
  );
};

export default IncomeList;
