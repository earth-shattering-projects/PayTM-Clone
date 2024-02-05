import React from "react";

const Landing = ({ children }) => {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Landing;
