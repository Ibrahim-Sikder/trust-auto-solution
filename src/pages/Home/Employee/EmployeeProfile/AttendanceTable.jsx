import { HiCheck, HiOutlineX } from "react-icons/hi";
import '../Employee.css'
import avatar from '../../../../../public/assets/avatar.jpg'
const AttendanceTable = () => {
    // Function to generate an array with icons alternating between check and close, with specified close icon positions
    const generateIcons = (totalCells, closePositions) => {
        const icons = [];
        let closeCounter = 0;
        for (let i = 0; i < totalCells; i++) {
            if (closePositions.includes(i + 1) && closeCounter < 7) {
                icons.push(<HiOutlineX key={`close_${i}`} size={20} className="text-[#F62D51]" />);
                closeCounter++;
            } else {
                icons.push(<HiCheck key={`check_${i}`} className='text-[#4AB657]' size={20} />);
            }
        }
        return icons;
    };

    // Define the positions where close icons should appear
    const closeIconPositions = [Math.floor(20 / 2), 1, 31]; // Middle, Second, Last

    return (
        <div className="table-container"> {/* Add a class to the table container */}
            <table>
                <thead>
                    <tr>
                        <th>Employee</th> 
                        {[...Array(31).keys()].map(day => (
                            <th key={day}>{day + 1}</th> 
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {[...Array(6).keys()].map(row => (
                        <tr key={row} className={row % 2 === 0 ? 'even-row' : 'odd-row'}>
                            <td>
                            
                           <div className="flex items-center">
                           
                           <img src={avatar} className='object-cover w-8 h-8 mr-2 rounded-full' alt="" />
                           <span>Mr John</span>
                           </div>
                            </td>
                            {/* Generating icons for each table cell */}
                            {generateIcons(31, closeIconPositions).map((icon, index) => (
                                <td key={index}>{icon}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table> 
        </div>
    );
};

export default AttendanceTable;
