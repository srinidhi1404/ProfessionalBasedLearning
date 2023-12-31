import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import TablePagination from "@mui/material/TablePagination";
import StatusButton from "../StatusButton/statusButton";
import { fetchApi } from "../../Utils/Request";
import { useNavigate } from "react-router-dom";
import SortImg from "../../asset/image/sort.png";
import Loader from "../Loader/Loader";
import moment from "moment";
import "./adminProjectList.css";

const AdminProjectList = () => {
  const [show, setShow] = useState(false);
  const [activeProjects, setActiveProjects] = useState([]);
  const [expiredProjects, setExpiredProjects] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const projectId = ""
  const [searchText, setSearchText] = useState("");
  const [mainLoader, setMainLoader] = useState(false)
  const [activeTab, setActiveTab] = useState("active");

  const navigate = useNavigate();
  const [filteredActiveProjects, setFilteredActiveProjects] = useState([]);
  const [filteredExpiredProjects, setFilteredExpiredProjects] = useState([]);

  console.log(filteredActiveProjects , "filteredActiveProjects")


  useEffect(() => {
    GetPro();
  }, []);

  useEffect(() => {

    const handleSearch = () => {
      if (activeTab === "active") {
        const filteredData = activeProjects.filter((item) =>
          item.projectTitle.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredActiveProjects(filteredData);
      } else {
        const filteredData = expiredProjects.filter((item) =>
          item.projectTitle.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredExpiredProjects(filteredData);
      }
    };
    handleSearch();
  }, [searchText]);

  const GetPro = async () => {
    setMainLoader(true)
    let response = await fetchApi("admin/all/project", "", "GET");
    if (response.status) {
      const currentDate = moment();

      const activeProjects = response.data.filter(
        (item) =>
          item.status !== "REJECTED" && moment(item.endDate) >= currentDate
      );
      const expiredProjects = response.data.filter(
        (item) => moment(item.endDate) < currentDate
      );

      setActiveProjects(activeProjects);
      setExpiredProjects(expiredProjects);

      const sortedProjects1 = activeProjects.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      const sortedProjects2 = expiredProjects.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setFilteredActiveProjects(sortedProjects1);
      setFilteredExpiredProjects(sortedProjects2);
      setMainLoader(false)
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleSort = () => {
    if (activeTab === "active") {
      setFilteredActiveProjects([...filteredActiveProjects].reverse());
    } else {
      setFilteredExpiredProjects([...filteredExpiredProjects].reverse());
    }
  };


  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchText("");
    if (tab === "active") {
      setFilteredActiveProjects(activeProjects);
    } else {
      setFilteredExpiredProjects(expiredProjects);
    }
  };

  const qwerty = (item) => {
    navigate("/viewproject-admin", {
      state: {
        project: item,
      },
    });
  };
  const handleShow = () => {
    setShow(true);
  };

  return (
    <>
      {
        mainLoader ? <div><Loader /></div> : <div className="view-project-prentmin">
          <div className="search-flex">
            <h2>Projects List</h2>
            <div className="search-flex-new">
              <div className="sort-con">
                <p onClick={handleSort}>
                  <img src={SortImg} alt="" />
                </p>
              </div>
              <input
                type="text"
                placeholder="Search Project"
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

          <div className="tab-buttons">
            <button
              onClick={() => handleTabChange("active")}
              className={activeTab === "active" ? "active-tab" : "normal-tab-btn"}
            >
              Active Projects
            </button>
            <button
              onClick={() => handleTabChange("expired")}
              className={activeTab === "expired" ? "active-tab" : "normal-tab-btn"}
            >
              Expired Projects
            </button>
          </div>

          <div className="pagination-wrap">
            <div className="tableWrap">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Authors Name</th>
                    <th scope="col">Title</th>
                    <th scope="col">Posted by</th>
                    <th scope="col">Status</th>
                    <th scope="col">Approve / Reject</th>
                  </tr>
                </thead>
                <tbody>
                  {activeTab === "active"
                    ? filteredActiveProjects
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((a, b) => (
                        <tr key={b} id={a.projectId}>
                          <th scope="row">{b + 1}</th>
                          <td>{a.firstName}</td>
                          <td>{a.projectTitle}</td>
                          <td>{a.projectId.startsWith('STD') ? 'student' : 'guest'}</td>

                          <td>
                            {a.status === "ACCEPTED" ? (
                              <div className="Approved">Approved</div>
                            ) : a.status === "PENDING" ? (
                              <div className="PENDING">Pending</div>
                            ) : (
                              <div className="Rejected">Rejected</div>
                            )}
                          </td>
                          <td>
                            <div className="viewbtdisable">
                              <button
                                type="button"
                                className={`adminviewbtn ${a.status !== "PENDING" ? 'disabledButton' : ''}`}
                                data-toggle="modal"
                                disabled={a.status !== "PENDING"}
                                data-target={`#exampleModal${b}`}
                                onClick={() => qwerty(a)}
                              >
                                View
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    : filteredExpiredProjects
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((a, b) => (
                        <tr key={b} id={a.projectId}>
                          <th scope="row">{b + 1}</th>
                          <td>{a.firstName}</td>
                          <td>{a.projectTitle}</td>
                          <td>{a.projectId.startsWith('STD') ? 'student' : 'guest'}</td>

                          <td>
                            <div className="Expired">Expired</div>
                          </td>
                          <td>
                            <div>
                              <button
                                type="button"
                                className={`adminviewbtn ${a.status !== "PENDING" ? 'disabledButton' : ''}`}
                                data-toggle="modal"
                                disabled={a.status !== "PENDING"}
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
                  count={
                    activeTab === "active"
                      ? filteredActiveProjects.length
                      : filteredExpiredProjects.length
                  }
                  page={page}
                  onPageChange={(event, newPage) => setPage(newPage)}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={(event) =>
                    setRowsPerPage(parseInt(event.target.value, 10))
                  }
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
        </div>
      }
    </>

  );
};

export default AdminProjectList;
