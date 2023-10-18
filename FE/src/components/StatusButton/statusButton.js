import Modal from "react-bootstrap/Modal";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchApi } from "../../Utils/Request";

const StatusButton = ({ show, handleClose, projectId, GetPro }) => {
  console.log({ projectId });
  const acceptReject = async (arg) => {
    let payload = {
      projectId: projectId,
      status: arg,
    };
    let response = await fetchApi("/admin/approve", payload, "POST");
    if (response.status) {
      console.log("RESPONSE >>>>>>>>>>", response);
      GetPro();
      handleClose();
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        style={{ width: "300px", marginLeft: "41%", marginTop: "10%" }}
      >
        <Modal.Header closeButton>
          <div
            className="form-group"
            style={{ justifyContent: "center", width: "300px" }}
          >
            <div
              className="allButton"
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
                rowGap: "22px",
                gap: "55px",
              }}
            >
              <button
                type="button"
                className="btn btn-success"
                onClick={() => {
                  acceptReject("ACCEPTED");
                }}
              >
                Accept
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  acceptReject("REJECTED");
                }}
              >
                Reject
              </button>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body></Modal.Body>
      </Modal>
    </>
  );
};

export default StatusButton;
