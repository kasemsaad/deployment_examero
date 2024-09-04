import React from "react";
import MyButton from "../Button/Button";
import "./table.css";
import image from "../../assets/icons/MyTable/trash.svg";
import ToggledButton from "../../dashboard/components/ToggledButton/ToggledButton";
import { Link } from "react-router-dom";
import Api_dashboard from "../../utlis/axios_utils_dashboard";

function MyTable3({
  header,
  body,
 
}) {
 
  // Construct base URL
  const baseURL = `${Api_dashboard.defaults.baseURL}`;

  return (
    <>
      {body && body.length > 0 ? (
        <table className="my-rounded-table-ta">
          <thead>
            <tr>
              <th>#</th>
              {Object.values(header).map((element, index) => (
                <th key={index}>{element}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {body.map((row, rowIndex) => {

              const examDownloadLink = row.examDownloadLink || "#";
              const answerDownloadLink = row.answerDownloadLink || "#";

              return (
                <tr key={rowIndex}>
                  {Object.entries(row).map(([key, value], cellIndex) => {
                    if (key !== "id" && key !== "examDownloadLink" && key !== "answerDownloadLink") {
                      return <td key={`${rowIndex}-${cellIndex}`}>{value}</td>;
                    }
                    return null;
                  })}


              
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div style={{ color: "red", fontSize: "24px", textAlign: "center" }}>
          لايوجد بيانات للعرض
        </div>
      )}
    </>
  );
}

export default MyTable3;

