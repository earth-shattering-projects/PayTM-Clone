import React from "react";

const Appbar = () => {
  return (
    <div className="flex justify-between h-14 shadow pl-2">
      <div className="flex flex-col justify-center text-lg font-bold">
        PayTM App
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex">
          <div className="flex flex-col justify-center h-full mr-4">Hello</div>
          <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
            <div className="flex flex-col justify-center h-full text-xl">U</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
