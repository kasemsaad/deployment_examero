import React, { useEffect } from "react";
import Notification from "../Notification";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
const MangersActivity = () => {
  const man = true;
  return <Notification api={"/activity/manager"} man={man} />;
};

export default MangersActivity;
