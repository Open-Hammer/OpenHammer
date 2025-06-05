import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <div>
      <h1 className="text-red-600"></h1>
    </div>
  );
};

export default Home;
