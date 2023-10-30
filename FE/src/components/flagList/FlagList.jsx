import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import TablePagination from "@mui/material/TablePagination";
import NavbarLogout from "../NavLogout/navLogout";
import FlagButton from "../StatusButton/flagButton";
import FlagSubButton from "../StatusButton/FlagSubButton";
import { fetchApi } from "../../Utils/Request";
import { Tabs, Tab } from "react-bootstrap";
import "./FlagList.css";

const FlagList = () => {
  const [show, setShow] = useState(false);
  const [showone, setShowone] = useState(false);
  const [comtdetails, setcommentDetails] = useState([]);
  const [SubcommentDetails, setSubcommentDetails] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageone, setPageone] = useState(0);
  const [rowsPerPageone, setRowsPerPageone] = useState(10);
  const [projectId, setProjectId] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [disableVal, setDisableVal] = useState(false);
  const handleCloseone = () => setShowone(false);
  const handleShowone = () => setShowone(true);

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

  const handleChangePageOne = (event, newPage) => {
    setPageone(newPage);
  };

  const handleChangeRowsPerPageOne = (event) => {
    setRowsPerPageone(parseInt(event.target.value, 10));
    setPageone(0);
  };

  const GetPro = async () => {
    let response = await fetchApi("/admin/all/comments", "", "GET");
    if (response.status) {
      setcommentDetails(response?.data.comments.filter((val) => val.flag > 0));
      setSubcommentDetails(
        response?.data.subComments.filter((val) => val.flag > 0)
      );
    }
  };

  const qwerty = (a) => {
    setProjectId(a.id);
    setDisableVal(a.disable);
    handleShow();
  };

  const qwertyone = (a) => {
    setProjectId(a.id);
    setDisableVal(a.disable);
    handleShowone();
  };

  return (
    <>
      <div className="mytabs-con">
        <Tabs
          defaultActiveKey="comments"
          id="uncontrolled-tab-example"
          className="w-100"
        >
          <Tab eventKey="comments" title="Comments">
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
                    <th scope="col">Name</th>
                    <th scope="col">Comment</th>
                    <th scope="col">Flag count</th>
                    <th scope="col">Accept / Reject</th>
                  </tr>
                </thead>
                <tbody>
                  {comtdetails
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((a, b) => (
                      <tr key={b} id={a.projectId}>
                        {console.log(a)}
                        <th scope="row">{b + 1}</th>
                        <td>{a.firstName}</td>
                        <td>{a.text}</td>
                        <td>{a.flag}</td>
                        <td>
                          <div>
                            <button
                              type="button"
                              className="btn btn-primary"
                              data-toggle="modal"
                              data-target={`#exampleModal${b}`}
                              onClick={() => qwerty(a)}
                            >
                              View
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div>
                <TablePagination
                  component="div"
                  count={comtdetails.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </div>
              <FlagButton
                handleClose={handleClose}
                handleShow={handleShow}
                show={show}
                disable={disableVal}
                projectId={projectId}
                GetPro={GetPro}
              />
            </div>
          </Tab>
          <Tab eventKey="subComments" title="Sub Comments">
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
                    <th scope="col">Name</th>
                    <th scope="col">Comment</th>
                    <th scope="col">Flag count</th>
                    <th scope="col">Accept / Reject</th>
                  </tr>
                </thead>
                <tbody>
                  {SubcommentDetails
                    .slice(
                      pageone * rowsPerPageone,
                      pageone * rowsPerPageone + rowsPerPageone
                    )
                    .map((a, b) => (
                      <tr key={b} id={a.projectId}>
                        <th scope="row">{b + 1}</th>
                        <td>{a.firstName}</td>
                        <td>{a.text}</td>
                        <td>{a.flag}</td>
                        <td>
                          <div>
                            <button
                              type="button"
                              className="btn btn-primary"
                              data-toggle="modal"
                              data-target={`#exampleModal${b}`}
                              onClick={() => qwertyone(a)}
                            >
                              View
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div>
                <TablePagination
                  component="div"
                  count={SubcommentDetails.length}
                  page={pageone}
                  onPageChange={handleChangePageOne}
                  rowsPerPage={rowsPerPageone}
                  onRowsPerPageChange={handleChangeRowsPerPageOne}
                />
              </div>
              <FlagSubButton
                handleClose={handleCloseone}
                handleShow={handleShowone}
                disable={disableVal}
                show={showone}
                projectId={projectId}
                GetPro={GetPro}
              />
            </div>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default FlagList;
