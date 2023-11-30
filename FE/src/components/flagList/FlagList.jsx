import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import TablePagination from "@mui/material/TablePagination";
import FlagButton from "../StatusButton/flagButton";
import FlagSubButton from "../StatusButton/FlagSubButton";
import { fetchApi } from "../../Utils/Request";
import SortImg from "../../asset/image/sort.png";
import { Tabs, Tab } from "react-bootstrap";
import Loader from "../Loader/Loader";
import "./FlagList.css";

const FlagList = () => {
  const [show, setShow] = useState(false);
  const [showone, setShowone] = useState(false);
  const [comtdetails, setCommentDetails] = useState([]);
  const [subCommentDetails, setSubCommentDetails] = useState([]);
  const [originalCommentData, setOriginalCommentData] = useState([]);
  const [originalSubCommentData, setOriginalSubCommentData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [pageone, setPageone] = useState(0);
  const [rowsPerPageone, setRowsPerPageone] = useState(8);
  const projectId = ""
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState("comments");
  const disableVal = false
  const [mainLoader, setMainLoader] = useState(false)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseone = () => setShowone(false);
  const handleShowone = () => setShowone(true);

  useEffect(() => {
    GetPro();
  }, []);

  useEffect(() => {
    if (activeTab === "comments") {
      const filteredData = originalCommentData.filter((item) =>
        item.text.toLowerCase().includes(searchText.toLowerCase())
      );
      setCommentDetails(filteredData);
    } else {
      const filteredData = originalSubCommentData.filter((item) =>
        item.text.toLowerCase().includes(searchText.toLowerCase())
      );
      setSubCommentDetails(filteredData);
    }
  }, [searchText, activeTab , originalCommentData , originalSubCommentData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPageOne = (event) => {
    setRowsPerPageone(parseInt(event.target.value, 10));
    setPageone(0);
  };

  const handleChangePageOne = (event, newPage) => {
    setPageone(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const qwertyone = async (a) => {
    let payload = {
      commentId: a.id,
      disable: a.disable ? false : true,
    };
    let response = await fetchApi(
<<<<<<< HEAD
      "admin/disable/sub-comment",
=======
      "/admin/disable/sub-comment",
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
      payload,
      "POST"
    );
    if (response.status) {
      GetPro();
    }
  };

  const GetPro = async () => {
    setMainLoader(true)
<<<<<<< HEAD
    let response = await fetchApi("admin/all/comments", "", "GET");
=======
    let response = await fetchApi("/admin/all/comments", "", "GET");
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
    if (response.status) {
      const commentData = response?.data.comments.filter((val) => val.flag > 0);
      const subCommentData = response?.data.subComments.filter(
        (val) => val.flag > 0
      );
      setCommentDetails(commentData);
      setSubCommentDetails(subCommentData);
      setOriginalCommentData(commentData);
      setOriginalSubCommentData(subCommentData);
      setMainLoader(false)
    }
  };

  const qwerty = async (a) => {
    let payload = {
      commentId: a.id,
      disable: a.disable ? false : true,
    };
<<<<<<< HEAD
    let response = await fetchApi("admin/disable/comment", payload, "POST");
=======
    let response = await fetchApi("/admin/disable/comment", payload, "POST");
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
    if (response.status) {
      GetPro();
    }
  };

  const handleSort = () => {
    if (activeTab === "comments") {
      setCommentDetails([...comtdetails].reverse());
    } else {
      setSubCommentDetails([...subCommentDetails].reverse());
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchText("");
    setPage(0);
  };

  return (
    <>
      {
        mainLoader ? <div><Loader /></div> : <div className="view-project-prentmin">
          <div className="search-flex">
            <h2>Comments List</h2>
            <div className="search-flex-new">
              <div className="sort-con">
                <p onClick={handleSort}>
                  <img src={SortImg} alt="" />
                </p>
              </div>
              <input
                type="text"
                placeholder={`Search ${activeTab === "comments" ? "Comment" : "Sub Comment"
                  }`}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{
                  color: "black",
                  border: "1px solid #006747",
                  borderRadius: "4px",
                  padding: "8px",
                  width: "370px",
                }}
              />
            </div>
          </div>

          <Tabs
            defaultActiveKey="comments"
            id="uncontrolled-tab-example"
            className="mycustomtab"
            onSelect={handleTabChange}
          >
            <Tab eventKey="comments" title="Comments">
              <div className="pagination-wrap">
                <div className="tableWrap">
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
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
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
                                  className={
                                    a.disable
                                      ? "btn btn-success btn-sm"
                                      : "btn btn-danger btn-sm"
                                  }
                                  onClick={() => {
                                    qwerty(a);
                                  }}
                                >
                                  {!a.disable
                                    ? "Disable Comment"
                                    : "Enable Comment"}
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
              </div>
            </Tab>
            <Tab eventKey="subComments" title="Sub Comments">
              <div className="pagination-wrap">
                <div className="tableWrap">
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
                      {subCommentDetails
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
                                  className={
                                    a.disable
                                      ? "btn btn-success btn-sm"
                                      : "btn btn-danger btn-sm"
                                  }
                                  onClick={() => {
                                    qwertyone(a);
                                  }}
                                >
                                  {!a.disable
                                    ? "Disable Comment"
                                    : "Enable Comment"}
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
                      count={subCommentDetails.length}
                      page={pageone}
                      onPageChange={handleChangePageOne}
                      rowsPerPage={rowsPerPageone}
                      onRowsPerPageChange={handleChangeRowsPerPageOne}
                    />
                  </div>
                  <FlagSubButton
                    handleClose={handleCloseone}
                    handleShow={handleShowone}
                    show={showone}
                    disable={disableVal}
                    projectId={projectId}
                    GetPro={GetPro}
                  />
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      }

    </>
  );
};

export default FlagList;
