import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import TablePagination from "@mui/material/TablePagination";
import FlagButton from "../StatusButton/flagButton";
import { fetchApi } from "../../Utils/Request";
import defaultImageLink from "../../asset/image/defaultProfile.jpeg";
import Loader from "../Loader/Loader";
import "../flagList/FlagList.css";
const FlagProject = () => {
  const [show, setShow] = useState(false);
  const [comtdetails, setcommentDetails] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const projectId = ""
  const [mainLoader, setMainLoader] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
  const disable = async (a) => {
    console.log(a);
    let payload = {
      projectId: a.projectId,
      disable: a.disable ? false : true,
    };
    let response = await fetchApi("api/disable/project", payload, "POST");
    console.log(response);
    if (response.status) {
      GetPro();
    }
  };

  const GetPro = async () => {
    setMainLoader(true);
    let response = await fetchApi("admin/all/project", "", "GET");
    if (response) {
      let data = response.data.filter((ele) => ele.flag);
      setcommentDetails(data);
      setMainLoader(false);
    }
  };

  return (
    <>
      {mainLoader ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className="view-project-prentmin">
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
                  <th scope="col">Project Title</th>
                  <th scope="col">Project Description</th>
                  <th scope="col">Image</th>
                  <th scope="col">Flag</th>
                  <th scope="col">Disable</th>
                </tr>
              </thead>
              <tbody>
                {comtdetails
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((a, b) => (
                    <tr key={b} id={a.projectId}>
                      <th scope="row">{b + 1}</th>
                      <td>{a.projectTitle}</td>
                      <td className="truncate-cell">{a.projectDescription}</td>
                      <td>
                        <img
                          src={a.image || defaultImageLink}
                          alt="User Profile"
                          style={{
                            width: "40px",
                            height: "40px",
                            objectFit: "cover",
                            transition: "transform 0.3s",
                            borderRadius: "50%",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.transform = "scale(10.2)";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = "scale(1)";
                          }}
                        />
                      </td>
                      <td>{a.flag}</td>
                      <td>
                        <div>
                          <button
                            type="button"
                            className={
                              a.disable
                                ? "btn btn-success btn-sm"
                                : "btn btn-danger btn-sm"
                            }
                            onClick={() => {
                              disable(a);
                            }}
                          >
                            {!a.disable ? "Disable" : "Enable"}
                          </button>
                        </div>
                      </td>
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
        </div>
      )}
    </>
  );
};

export default FlagProject;
