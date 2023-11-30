import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import TablePagination from "@mui/material/TablePagination";
import FlagButton from "../StatusButton/flagButton";
import { fetchApi } from "../../Utils/Request";
import defaultImageLink from "../../asset/image/defaultProfile.jpeg"
import "./FlagList.css";
const FlagList = () => {
  const [show, setShow] = useState(false);
  const [comtdetails, setcommentDetails] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const projectId = ""
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

  const GetPro = async () => {
<<<<<<< HEAD
    let response = await fetchApi("admin/flag-user", "", "GET");
=======
    let response = await fetchApi("/admin/flag-user", "", "GET");
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
    if (response) {
      setcommentDetails(response.users);

    }
  };



  return (
    <>
      <div className="mytabs-con">
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
                        src={a.image || defaultImageLink}
                        alt="User Profile"
                        style={{
                          width: "10%",
                          height: "10%",
                          objectFit: "cover",
                          transition: "transform 0.3s",
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
    </>
  );
};

export default FlagList;
