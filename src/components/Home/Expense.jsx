import React from "react";
import Image from 'next/image'

import img from "../../assets/tea-cup.png";
let ms = new Date().toLocaleDateString("en-GB");

const Expense = () => {
  return (
    <div className="  px-4 py-3 flex m-2 text-black h-20 border-2 rounded-2xl bg-white items-center justify-between  ">
      <div className=" flex justify-start  items-center h-full gap-2 truncate w-full max-w-[65%] overflow-hidden ">
        <div>
        <div className="w-14 h-14 rounded-2xl bg-blue-300 grid place-items-center  ">
          <Image src={img} width={20} height={20} className="w-9 mb-1 " alt="tea cup" />
        </div>
        </div>
        <div className="h-full ml-1 text-start">
          <div className="font-semibold  truncate  text-sm space  ">
            Middle UX/UI Designer    Middle UX/UI Designer    Middle UX/UI Designer
          </div>
          <div className="  text-xs font-semibold mt-1 opacity-50   ">UPI </div>
          
        </div>
      </div>

      <div className=" h-full  ">
        <div className="font-semibold text-lg mr-2">₹ 70</div>
        <div className="text-xs font-semibold opacity-50 mt-1">{ms}</div>
      </div>
    </div>
  );
};

export default Expense;
