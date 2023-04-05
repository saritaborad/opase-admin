import React from "react";
import { Modal } from "react-bootstrap";

const DeleteModal = (props) => {
  return (
    <>
      <Modal.Header className="p-4 pb-0">
        <h4 className="w-100 text-center"> {props.headerString}</h4>
      </Modal.Header>
      <Modal.Body className="p-4 pt-0">
        <div className="text-center modal-data">
          <p className="mb-0">{props.bodyString}</p>
          <div className="row">
            <div className="col-12 d-flex mt-3">
              <button className="comn-btn-class w-100 me-2" type="submit" onClick={() => props.callApi()}>
                Yes
              </button>
              <button className="comn-btn-class cancle-btn-class w-100 ms-2" type="submit" onClick={() => props.closeModal()}>
                No
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </>
  );
};

export default DeleteModal;
