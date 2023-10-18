import React from "react";
import moment from "moment";
import "./table.css";

const Table = ({ data }) => {
  return (
    <table className="tableBody">
      <thead>
        <tr>
          <th className="p-3">#</th>
          <th>Project Title</th>
          <th>Description</th>
          <th>Start Date</th>
          <th>End Date</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item, index) => (
          <tr key={index}>
            <td className="p-2">{item.projectID}</td>
            <td>{item.projectTitle}</td>
            <td className="break-words">{item.projectDescription}</td>
            <td>{moment(item.startDate).format("DD-MM-YYYY")}</td>
            <td>{moment(item.endDate).format("DD-MM-YYYY")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
