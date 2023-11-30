import React from "react";
import moment from "moment";
import "./table.css";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
const Table = ({ data }) => {
console.log(data)
  const navigate = useNavigate()
=======

const Table = ({ data }) => {
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
  return (
    <table className="tableBody">
      <thead>
        <tr>
          <th>Project Title</th>
          <th>Description</th>
          <th>Start Date</th>
          <th>End Date</th>
<<<<<<< HEAD
          <th>Status</th>
=======
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
        </tr>
      </thead>
      <tbody>
        {data?.map((item, index) => (
          <tr key={index}>
            <td
              style={{
                whiteSpace: "nowrap",
              }}
            >
              {item.projectTitle}
            </td>
            <td className="break-words">{item.projectDescription}</td>
            <td style={{ whiteSpace: "nowrap" }}>
              {moment(item.startDate).format("MM-DD-YYYY")}
            </td>
            <td style={{ whiteSpace: "nowrap" }}>
              {moment(item.endDate).format("MM-DD-YYYY")}
            </td>
<<<<<<< HEAD
            <td><button   className={`adminviewbtn ${item.status == "PENDING" ? 'disabledButton' : ''}`} onClick={()=> navigate("/project-form", { state: { item } })}>Edit</button></td>
=======
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
