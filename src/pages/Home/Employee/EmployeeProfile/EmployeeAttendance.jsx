
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from '@mui/material';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const generateIndicator = () => {
  const random = Math.random();
  if (random < 0.85) {
    return '-'; 
  } else if (random < 0.925) {
    return 'L'; 
  } else {
    return 'A'; 
  }
};

const MonthlyTable = () => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1); 

  return (
    <Paper>
      <Box sx={{ overflowX: 'auto' }}>
        <TableContainer component={Paper}>
          <Typography variant="h5" align="center" marginTop="20px" marginBottom="20px">
            My Attendance Sheet
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Day</TableCell>
                {months.map((month) => (
                  <TableCell key={month} align="center">{month}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {days.map((day) => (
                <TableRow key={day}>
                  <TableCell align="center">{day}</TableCell>
                  {months.map((month) => (
                    <TableCell key={month} align="center">{generateIndicator()}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Paper>
  );
};

export default MonthlyTable;
