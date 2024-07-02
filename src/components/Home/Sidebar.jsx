import Image from "next/image";
import pic from "../../assets/pic.png";
import logo from "../../assets/logo.png";
import { IoMdList } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
import { PiWalletBold } from "react-icons/pi";
import { BiRupee } from "react-icons/bi";
import { TbDashboard } from "react-icons/tb";

const slidebarData = [
  { name: "Dashboard", icon: <TbDashboard />,  },
  { name: "Transactions", icon: <IoMdList /> ,selected: true },
  { name: "Budget", icon: <PiWalletBold /> },
  { name: "Income", icon: <BiRupee /> },
  { name: "Settings", icon: <IoIosSettings /> },
];

const Sidebar = () => {
  return (
    <div className="w-20 md:w-[240px] max-w-[14rem] py-11  flex flex-col h-full">
      {/* Brand Icon */}
      <div className="h-8 mb-8  gap-4  px-4 flex items-center justify-center">
        <Image src={logo} alt="profile-pic" width={20} height={28} />
        <span className="text-gray-300 text-lg hidden md:flex">Expansibee</span>
      </div>
      <div className="flex gap-1 flex-col flex-grow ">
        {slidebarData.map((data, index) => (
          <div
            key={index}
            className={`md:flex justify-left items-center gap-2 px-4  py-2 text-gray-300 ${data.selected && "bg-[#8b88888f] border-l-4  text-white" }`}
          >
            <div className="md:text-md text-xl flex items-center justify-center">{data.icon}</div>
            <div className="hidden md:flex">{data.name}</div>
          </div>
        ))}
      </div>
      {/* Bottom Section */}
      <div className=" gap-2 items-center mt-auto px-4 hidden md:flex">
        <div className="flex overflow-hidden w-10 h-10 rounded-full">
          <Image
            className="origin-center"
            src={pic}
            alt="profile-pic"
            width={40}
            height={40}
          />
        </div>
        <div>
          <div className="font-semibold text-gray-200">Nayan</div>
          <div className="text-xs text-gray-400">testing@gmail.com</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
