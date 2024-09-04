import React from "react";
import MyButton from "../../Button/Button";
import image from "../../../assets/icons/MyTable/trash.svg";
import { Link } from "react-router-dom";
import './pointAllTable.css'

function TablePointAll({
  header,
  body,
  icons,
  other,
  handelDelete,
  handelEdit,
  handelEye,
  handelNot,
  delet,
  delteModalName,
  editButtonName,
  handel,
  Deletehandel,
  flag,
  checkboxHandler,
  dataCheckedRender,
  checkAllBoxHandler,
  flagAdmin,
  flagTeacher
}) {
  const { trash, edit, eye } = icons || {};
  const { toggle, butt, imag, checkbox } = other || {};

  return (
    <form>
      <table className="rounded-table-all">
        {/* <DeleteAnItem /> */}
        {/* <AddOrEditModal /> */}

        <thead>
          <tr>
            <th>#</th>
            {Object.values(header).map((element, index) => (
              <th key={index}>{element}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, rowIndex) => (
            <tr key={rowIndex}>
         <>
            {/* {Object.values(row).map((value, cellIndex) => (
              <td key={`${rowIndex}-${cellIndex}`}>{value}</td>
            ))} */}
            <td>
             {`${rowIndex+1}`}
            </td>
                
                  <td>{row.message}</td>
                  <td>{row.type[1]}</td>
                  <td>{row.points}</td>
                </>
              

              {toggle && <td></td>}
              {icons && (
                <td>
                  {trash && (
                    <button
                      onClick={() => Deletehandel(row)}
                      type="button"
                      className="trash"
                      data-bs-toggle="modal"
                      data-bs-target={delteModalName}
                      data-whatever="@mdo"
                    >
                      <img src={image} className="trash" alt="" />
                    </button>
                  )}
                  {edit && (
                    <button
                      onClick={() => handel(row)}
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target={editButtonName}
                      className="square fa-regular fa-pen-to-square"
                    ></button>
                  )}
                  {eye && (
                    <MyButton
                      onClick={handelEye}
                      className="eye fa-regular fa-eye"
                    />
                  )}
                </td>
              )}
              {butt && (
                <td>
                  <MyButton
                    onClick={handelNot}
                    className={"buttonOfTable"}
                    content={"أرسل ملحوظه"}
                  />
                </td>
              )}
              {imag && (
                <td>
                  <Link style={{ textDecoration: "underline", color: "#FE4F60" }}>
                    تحميل
                  </Link>
                </td>
              )}
              {checkbox && (
                <td>
                  <input type="checkbox" />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </form>
  );
}

export default TablePointAll;
