/* eslint-disable react/prop-types */
import { useContext } from "react";
import { PrintContext } from "../../pages/context/PrintProvider";
import './CommonBtn.css'
import { Link } from "react-router-dom";
const CommonButton = ({id}) => {
    const { handlePrint, toPDF } = useContext(PrintContext)
    return (
        <div>
            <div className="printBtnGroup">
                <button onClick={handlePrint}>Print </button>
                <button onClick={() => toPDF()}>Download </button>
                <Link to={`/dashboard/update-jobcard?id=${id}`}><button >Edit </button></Link>
            </div>
        </div>
    );
};

export default CommonButton;