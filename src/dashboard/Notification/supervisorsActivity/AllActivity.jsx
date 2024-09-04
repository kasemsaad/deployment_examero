import React, { useEffect } from "react";
import Notification from "../Notification";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const AllActivity = () => {
  const all = true;
  return <Notification api={"/activity"} all={true} />;
};

export default AllActivity;
