import React from "react";

function HealthServices({ path, serviceName }) {
  return (
    <div className="w-full">
      <div
        className=""
        onClick={() =>
          (window.location.href = `http://www.google.com/${serviceName}`)
        }
      >
        <div className="relative w-full group">
          <div className="w-full h-full absolute top-0 left-0 border-[3px] border-indigo-400 rounded-3xl -z-10 -translate-x-3 translate-y-3 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-300"></div>
          <div className="flex flex-col aspect-square items-center justify-center text-center p-4 bg-indigo-100 border-[3px] border-indigo-300 rounded-2xl group-hover:scale-[0.85] transition duration-300">
            <img src={path} alt=" " className="h-24 w-24 object-contain" />
            <p className="mt-4 font-semibold w-full">{serviceName}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HealthServices;
