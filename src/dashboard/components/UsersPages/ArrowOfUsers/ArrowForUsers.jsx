import React, { useState } from "react";

import FirstTriangle from "../../FirstTriangle/FirstTriangle.jsx";

import SecondTriangle from "../../SecondTriangl/SecondTriangle.jsx";
import "./ArrowForUsers.css";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ArrowForUsers = ({ name1, name2, loc1, loc2, role1 }) => {
  const { pathname } = useLocation();
  const [roleD, setRole] = useState(false);
  const role = useSelector((state) => state.RoleAccess.role);
  // windler.emery@example.net
  // const acccessDenied = () => {
  //   if (role !== "owner") {
  //     {
  //       role == "manager"
  //         ? navigate("/dashboard/accessDenied")
  //         : navigate("/dashboard/supervisors", { state: { id: 1 } });
  //     }
  //   }
  // };
  // if (role !== "manager" && role1) {
  //   setRole(true);
  //   console.log(roleD);
  // }
  return (
    <>
      <div style={{ display: "flex" }} className="outArrorws text-white ">
        <Link to={loc1}>
          <FirstTriangle
            className={"user-man"}
            style={{
              backgroundColor: pathname === loc1 ? "#4941A6" : "#1D195D",
            }}
            content={name1}
          />
        </Link>

        <div className="secondd">
          <Link to={loc2}>
            <SecondTriangle
              className={"user-man2"}
              stylep={{
                color: pathname === loc2 ? "white" : "",
              }}
              style={{
                backgroundColor: pathname === loc2 ? "#4941A6" : "",
              }}
              content={name2}
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default ArrowForUsers;
