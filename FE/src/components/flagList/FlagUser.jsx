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

  const GetPro = async () => {
    let response = await fetchApi("/admin/flag-user", "", "GET");
    console.log(",response", response.users);
    if (response) {
      setcommentDetails(response.users);
      //   setSubcommentDetails(
      //     response?.data.subComments.filter((val) => val.flag > 0).filter((v) => v.disable === 0)
      //   );
    }
  };

  const qwerty = (id) => {
    console.log(id, "ID");
    setProjectId(id);
    handleShow();
    setShow(true);
  };

  const qwertyone = (id) => {
    console.log(id, "ID");
    setProjectId(id);
    handleShowone();
    setShowone(true);
  };

  return (
    <>
      <div className="mytabs-con">
        <Tabs
          defaultActiveKey="comments"
          id="uncontrolled-tab-example"
          className="w-100"
        >
          <Tab eventKey="comments" title="User">
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
                    <th scope="col">Email</th>
                    <th scope="col">Image</th>
                    <th scope="col">Flag</th>
                  </tr>
                </thead>
                <tbody>
                  {comtdetails
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((a, b) => (
                      <tr key={b} id={a.projectId}>
                        <th scope="row">{b + 1}</th>
                        <td>{a.firstName}</td>
                        <td>{a.email}</td>
                        <td>
                        <img
      src={a.image}
      alt="User Image"
      style={{
        width: "10%", // Makes the image take the full width of the container
        height: "10%", // Makes the image take the full height of the container
        objectFit: "cover", // Scales and crops the image to fit the container
        transition: "transform 0.3s", // Adds a smooth transition effect for zooming
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = "scale(10.2)"; // Zoom in by 20% on hover
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = "scale(1)"; // Reset to normal size on mouse leave
      }}
    />
                        </td>
                        <td>{a.flag}</td>
                        {/* <td>
                      <div>
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target={`#exampleModal${b}`} onClick={() => qwerty(a.id)}>
                          View
                        </button>
                      </div>
                    </td> */}
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
