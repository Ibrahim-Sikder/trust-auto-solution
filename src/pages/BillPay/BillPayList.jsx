"use client"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from 'next/link';
import React from 'react';

function createData(
    id: number,
    name: string,
    img: StaticImageData,
    roll: number,
    classN: number,
    group: string,
    phone: number,
    email: string,
    city: string
) {
    return { id, name, img, roll, classN, group, phone, email, city };
}

const rows = [
    createData(1, 'Kamrul Islam', studentimg, 3, 6, "Science", 1862439094, "email@email.com", "Dhaka"),
    createData(2, 'Kamrul Islam', studentimg, 3, 6, "Science", 1862439094, "email@email.com", "Dhaka"),
    createData(3, 'Kamrul Islam', studentimg, 3, 6, "Science", 1862439094, "email@email.com", "Dhaka"),
    createData(4, 'Kamrul Islam', studentimg, 3, 6, "Science", 1862439094, "email@email.com", "Dhaka"),
    createData(5, 'Kamrul Islam', studentimg, 3, 6, "Science", 1862439094, "email@email.com", "Dhaka"),
    createData(6, 'Kamrul Islam', studentimg, 3, 6, "Science", 1862439094, "email@email.com", "Dhaka"),
    createData(7, 'Kamrul Islam', studentimg, 3, 6, "Science", 1862439094, "email@email.com", "Dhaka"),
];

const Students = () => {
    const handleSubmit = (data: any) => {
        console.log(data)
    }
    return (
        <Box bgcolor='white' padding={3}>
            <Typography display='flex' alignItems='center' justifyContent='center' variant='h5' fontWeight='bold' marginBottom='30px'>Student List</Typography>
          
            <div className='flex justify-end my-3'>
                <Button sx={{ color: 'white' }} component={Link} href='/dashboard/super_admin/users/students/create'>Add New Student</Button>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Image</TableCell>
                            <TableCell align="center">Roll</TableCell>
                            <TableCell align="center">Class</TableCell>
                            <TableCell align="center">Group</TableCell>
                            <TableCell align="center">Phone</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">City</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">
                                    <Image src={row.img} alt='student' width={50} height={50} />
                                </TableCell>
                                <TableCell align="center">{row.roll}</TableCell>
                                <TableCell align="center">{row.classN}</TableCell>
                                <TableCell align="center">{row.group}</TableCell>
                                <TableCell align="center">{row.phone}</TableCell>
                                <TableCell align="center">{row.email}</TableCell>
                                <TableCell align="center">{row.city}</TableCell>
                                <TableCell align="center">
                                    <div className='flex justify-center'>
                                        <Link href={`/dashboard/student/profile/${row.id}`}>
                                            <IconButton title="See Profile">
                                                <VisibilityIcon className='text-green-600' />
                                            </IconButton>
                                        </Link>
                                        <Link href={`/dashboard/student/${row.id}`}>
                                            <IconButton title="Edit">
                                                <EditIcon />
                                            </IconButton>
                                        </Link>
                                        <IconButton title="Delete">
                                            <DeleteIcon className='text-red-600' />
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

export default Students;
