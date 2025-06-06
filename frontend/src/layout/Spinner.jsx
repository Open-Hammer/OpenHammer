import React from "react";
import { ClipLoader } from "react-spinners";
const Spinner = () => {
  return (
    <div className="w-full flex justify-center items-center min-h-[600px]  ">
      <ClipLoader color="#0c0505" cssOverride={{}} loading size={100} />
    </div>
  );
};

export default Spinner;
