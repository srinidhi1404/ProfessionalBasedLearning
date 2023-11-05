import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TablePagination from "@mui/material/TablePagination";
import { fetchApi } from "../../Utils/Request";
import "react-datepicker/dist/react-datepicker.css"; 
import "./Request.css"; 
import Loader from "../Loader/Loader";
const Request = () => {
  const [details, setDetails] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [projectTitles, setProjectTitles] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(""); 
  const [mainLoader, setMainLoader] = useState(false);
  useEffect(() => {
    GetPro();
  }, []); 

  useEffect(() => {
    if (projectTitles.length > 0) {
      setSelectedProjectId(projectTitles[0].projectId); 
    }
  }, [projectTitles]); 

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const GetPro = async () => {
    setMainLoader(true)
    let response = await fetchApi("/api/get/request", "", "GET");
    if (response.status) {

      setDetails(response?.data);
      const projectTitlesWithIds = [
        ...new Set(
          response?.data.map((item) => ({
            projectId: item.projectId,
            projectTitle: item.projectTitle,
          }))
        ),
      ]; 
      setProjectTitles(projectTitlesWithIds);
      setMainLoader(false)
    }
    else{
      setMainLoader(false)
    }
  };

  const filteredDetails = details.filter((item) => item.projectId === selectedProjectId);

  return (
   <>
   {
    mainLoader ?       <div>
    <Loader />
  </div> : <>
  {
      details.length !== 0 ?   
      <div className="request-container">
      <div className="left-navigation">
        <h2>Select Project</h2>
        <select
          value={selectedProjectId}
          onChange={(e) => setSelectedProjectId(e.target.value)}
          style={{
            backgroundColor: '#EFEFEF',
            border: '1px solid #CCCCCC',
            color: '#333',
            padding: '8px',
            width: "100%"
          }}
        >
          {projectTitles.map((project) => (
            <option key={project.projectId} value={project.projectId}>
              {project.projectTitle}
            </option>
          ))}
        </select>
      </div>


      <div className="main-content">
        {filteredDetails.length > 0 && (
          <div>
            <h3>Project Details</h3>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">firstName</th>
                  <th scope="col">email</th>
                  <th scope="col">projectTitle</th>
                  <th scope="col">skill</th>
                  <th scope="col">status</th>
                  <th scope="col">document</th>
                </tr>
              </thead>
              <tbody>
                {filteredDetails
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((a, b) => (
                    <tr key={b} id={a.projectId}>
                      <td>{a.firstName}</td>
                      <td>{a.email}</td>
                      <td>{a.projectTitle}</td>
                      <td>{a.skill}</td>
                      <td>{a.status}</td>
                      <td>     <a href={a.document} target="_blank" rel="noopener noreferrer">
                        Download Document
                      </a></td>
                      <td>{a.flag}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={filteredDetails.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        )}
      </div>
    </div> 
     : <div className="nodatascren"><p>No Request to Display</p></div>
    }
  </>
   }
    


   </>
 
  );
};

export default Request;
