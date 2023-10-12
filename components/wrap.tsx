import React from "react";

interface WrapperProps {
  children: React.ReactNode;
}

const Wrap: React.FC<WrapperProps> = ({ children }) => {
  return <div className="flex flex-col mx-8 sm:mx-24 ">{children}</div>;
};
export default Wrap;
