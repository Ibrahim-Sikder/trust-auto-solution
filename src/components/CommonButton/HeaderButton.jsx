import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const HeaderButton = () => {
  return (
    <div className="flex items-center mr-[80px]  justify-center topProductBtn">
      <Link to="/dashboard/addjob">
        <Button sx={{ backgroundColor: "#42A1DA" }}>Add Job</Button>
      </Link>
      <Link to="/dashboard/qutation">
        <Button sx={{ backgroundColor: "#42A1DA" }}>Quotation </Button>
      </Link>
      <Link to="/dashboard/invoice">
        <Button sx={{ backgroundColor: "#42A1DA" }}>Invoice </Button>
      </Link>
    </div>
  );
};

export default HeaderButton;
