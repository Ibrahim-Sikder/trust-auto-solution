import { Email, WhatsApp } from '@mui/icons-material';
import { FaGlobe } from 'react-icons/fa';

const TrustAutoAddress = () => {
    return (
        <div>
          <div className="space-y-2 ">
            <div className="flex items-center ">
              <FaGlobe className="text-[#42A1DA]" />
              <b className="ml-1 text-[#4671A1]">www.trustautosolution.com</b>
            </div>
            <div className="flex items-center">
              <Email className="text-[#42A1DA]" />
              <b className="ml-1 text-[#4671A1]">trustautosolution@gmail.com</b>
            </div>
            <div className="flex items-center ">
              <WhatsApp className="text-[#42A1DA] size-5 " size={25} />
              <b className="ml-1 text-[#4671A1]">+880 1821-216465</b>
            </div>
          </div>  
        </div>
    );
};

export default TrustAutoAddress;