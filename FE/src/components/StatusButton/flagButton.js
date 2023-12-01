import Modal from "react-bootstrap/Modal";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchApi } from "../../Utils/Request";

const FlagButton = ({ show, handleClose, projectId, GetPro, disable }) => {
  const acceptReject = async (arg) => {
    let payload = {
      commentId: projectId,
      disable: arg,
    };
    let response = await fetchApi("admin/disable/comment", payload, "POST");
    if (response.status) {
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
                className={disable ? "btn btn-success" : "btn btn-danger"}
                onClick={() => {
                  acceptReject(disable ? false : true);
                }}
              >
                {!disable ? "Disable Comment" : "Enable Comment"}
              </button>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body></Modal.Body>
      </Modal>
    </>
  );
};

export default FlagButton;
