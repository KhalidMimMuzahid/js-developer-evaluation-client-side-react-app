import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader/Loader";
import { MyContext } from "../context/MyProvider/MyProvider";

const PrivetRoutes = ({ children }) => {
  const navigate = useNavigate();
  const { currentUser, isLoading } = useContext(MyContext);
  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  if (currentUser && currentUser?.uid) {
    return children;
  }
  return navigate("/signin");
};

export default PrivetRoutes;
