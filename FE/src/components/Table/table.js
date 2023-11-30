import React from "react";
import moment from "moment";
import "./table.css";
import { useNavigate } from "react-router-dom";
const Table = ({ data }) => {
console.log(data)
  const navigate = useNavigate()
  return (
    <table className="tableBody">
      <thead>
        <tr>
          <th>Project Title</th>
          <th>Description</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Status</th>
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
            <td><button   className={`adminviewbtn ${item.status == "PENDING" ? 'disabledButton' : ''}`} onClick={()=> navigate("/project-form", { state: { item } })}>Edit</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
