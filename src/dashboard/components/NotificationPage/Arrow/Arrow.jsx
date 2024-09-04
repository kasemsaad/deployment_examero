import React, { useState } from "react";
import FirstTriangle from "../../FirstTriangle/FirstTriangle";
import SecondTriangle from "../../SecondTriangl/SecondTriangle";
import "./Arrow.css";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ArrowNotification = () => {
  const { pathname } = useLocation();
  const role = useSelector((state) => state.RoleAccess.role);
  // supervisor
  const [api, setApi] = useState("/activity");

  return (
    <>
      <div style={{ display: "flex" }} className="outArrorws text-white ">
        <Link to={role !== "owner" ? "" : "/dashboard/activity/all"}>
          <FirstTriangle
            stylep={{ fontSize: "16px" }}
            style={{
              backgroundColor:
                pathname === "/dashboard/activity/all" ? "#4941A6" : "#1D195D",
            }}
            className={""}
            content={"الكل"}
          />
        </Link>
        <div className="secondd">
          <Link to={"/dashboard/activity/mangers"}>
            <SecondTriangle
              stylep={{
                fontSize: "16px",
                color:
                  pathname === "/dashboard/activity/mangers" ? "white" : "",
              }}
              style={{
                backgroundColor:
                  pathname === "/dashboard/activity/mangers" ? "#4941A6" : "",
              }}
              content={"المديرين"}
            />
          </Link>
        </div>
        {/* <div className="third">
          <SecondTriangle content={"المشرفين"} />
        </div> */}
      </div>
    </>
  );
};

export default ArrowNotification;
