/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const JoinRoom = (props) => {
  const joinRoom = () => {

  }

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h4>Join a room</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input type="text" className="form-control"/>
      </Modal.Body>
      <Modal.Footer>
        <Button >Join</Button>
      </Modal.Footer>
    </Modal>
  );
}

const Sidebar = () => {

  const [modalShow, setModalShow] = useState(false)
  const [room, setRoom] = useState("");
  return (
    <div className="container">
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <button className="btn btn-transparent p-0 m-0" onClick={() => setModalShow(true)}>Join Room</button>
        </li>
        <li className="list-group-item">
          Messages
          <span className="badge bg-primary rounded-pill mx-2">4</span>
        </li>
        <li className="list-group-item">Profile</li>
      </ul>
      <JoinRoom show={modalShow} onHide={() => setModalShow(false)}/>
    </div>
  );
};

export default Sidebar;
