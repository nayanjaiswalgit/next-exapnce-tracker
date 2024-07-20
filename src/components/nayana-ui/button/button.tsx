import React from "react";

const Button: React.FC<any> = ({ icon, className, children, ...props }) => (
  <button
    className= {`${className}  w-full px-3 py-2  border border-slate-300 rounded-md  shadow-sm 
    flex justify-center items-center gap-2
     `}
    {...props}
  >
    {icon}
    {children}
  </button>
);

export default Button;
