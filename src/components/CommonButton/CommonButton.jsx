import { useContext } from "react";
import { PrintContext } from "../../pages/context/PrintProvider";
import './CommonBtn.css'
import { Link } from "react-router-dom";
const CommonButton = () => {
    const { handlePrint, toPDF } = useContext(PrintContext)
    return (
        <div>
            <div className="printBtnGroup">
                <button onClick={handlePrint}>Print </button>
                <button onClick={() => toPDF()}>Pdf </button>
                <Link to='/addjob'><button >Edit </button></Link>
            </div>
        </div>
    );
};

export default CommonButton;