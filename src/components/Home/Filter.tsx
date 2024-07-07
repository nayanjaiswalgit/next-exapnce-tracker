import React, { ReactNode } from "react";
import { MdSort } from "react-icons/md";
import { FaFilter } from "react-icons/fa";
import { MdFilterAlt } from "react-icons/md";

type ButtonProps = {
  children: ReactNode;
};

const Button: React.FC<ButtonProps> = ({ children }) => (
  <button className=" p-1 px-2 h-8 flex items-center justify-center gap-2">{children}</button>
);
const Filter = () => {
  return (
    <div className="gap-2 flex items-center justify-center">
      <Button>
        <MdSort />
        Sort By
      </Button>
      <Button>
        <MdFilterAlt />
      </Button>
    </div>
  );
};

export default Filter;
