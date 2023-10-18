import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import TablePagination from "@mui/material/TablePagination";
import NavbarLogout from "../NavLogout/navLogout";
import StatusButton from "../StatusButton/statusButton";
import { fetchApi } from "../../Utils/Request";
import "./adminProjectList.css";
const AdminProjectList = () => {
  const [show, setShow] = useState(false);
  const [details, setDetails] = useState([]);
  const [page, setPage] = useState(0); // Changed from React.useState(2)
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [projectId, setProjectId] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const obj = {

  //     projectId:projectId ,
  //     status:''

  // }

  useEffect(() => {
    GetPro();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const GetPro = async () => {
    let response = await fetchApi("/admin/all/project", "", "GET");
    if (response.status) {
      setDetails(response?.data);
    }
  };
  const qwerty = (id) => {
    console.log(id, "ID");
    setProjectId(id);
    // handleShow()
    setShow(true);
  };
  console.log({ projectId }, "ProjectList");
  return (
    <div
      className=""
      style={{ justifyContent: "center", alignItems: "center" }}
    >
      <NavbarLogout />
      <h2
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: "2%",
          marginLeft: "40%",
        }}
      >
        Projects List
      </h2>
      <div
        className="tableWrap"
        style={{
          width: "80%",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "10%",
          boxShadow: " 2px 2px 2px 2px rgba(0,0,0,0.2)",
          marginTop: "2%",
        }}
      >
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Authors Name</th>
              <th scope="col">title</th>
              <th scope="col">View Status</th>
              <th scope="col">Approval Status</th>
            </tr>
          </thead>
          <tbody>
            {details
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((a, b) => (
                <tr key={b} id={a.projectId}>
                  <th scope="row">{b + 1}</th>
                  <td>{a.firstName}</td>
                  <td>{a.projectTitle}</td>
                  <td>
                    <div>
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-toggle="modal"
                        data-target={`#exampleModal${b}`}
                        onClick={() => qwerty(a.projectId)}
                      >
                        View
                      </button>
                    </div>
                  </td>
                  <td>
                    {a.status === "ACCEPTED" ? (
                      <div className="Approved">Approved</div>
                    ) : a.status === "PENDING" ? (
                      <div className="PENDING">pending</div>
                    ) : (
                      <div className="Rejected">Rejected</div>
                    )}{" "}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div>
          <TablePagination
            component="div"
            count={details.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
        <StatusButton
          handleClose={handleClose}
          handleShow={handleShow}
          show={show}
          projectId={projectId}
          GetPro={GetPro}
        />
      </div>
    </div>
  );
};

export default AdminProjectList;
