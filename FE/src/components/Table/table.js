import React from "react";
import moment from "moment";
import "./table.css";

const Table = ({ data }) => {
  return (
    <table className="tableBody">
      <thead>
        <tr>
          <th>Project Title</th>
          <th>Description</th>
          <th>Start Date</th>
          <th>End Date</th>
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
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
