import React from "react";
import moment from "moment";
import "./table.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constant/constant";
const Table = ({ data, reload }) => {
  const closeProject = async (item) => {
    try {
      const config = {
        projectId: item.projectId,
        closed: !item.closed,
      };

      const response = await axios.post(`${BASE_URL}api/close/project`, config);

      if (response.data.status) {
        alert("project status updated successfully");
        reload();
      } else {
        console.log("iguigig");
      }
    } catch (error) {}
  };
  console.log(data);
  const navigate = useNavigate();
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
            <td>
              {" "}
              {item.status == "PENDING" ? (
                <button
                  className={`adminviewbtn ${
                    item.status == "PENDING" ? "disabledButton" : ""
                  }`}
                  onClick={() => navigate("/project-form", { state: { item } })}
                >
                  Edit
                </button>
              ) : (
                <button onClick={() => closeProject(item)}>
                  {item.closed ? "Open" : "Close"}
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
