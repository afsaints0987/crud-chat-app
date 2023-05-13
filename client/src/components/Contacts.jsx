import * as FaIcons from "react-icons/fa";

/* eslint-disable react/prop-types */
const Contacts = ({ contactUser, loggedInUser, handleUser}) => {
  const filteredContacts = contactUser.filter(
    (contact) => contact._id !== loggedInUser._id
  );

  return (
    <div>
      <div
        id="contacts-container"
        className="d-flex flex-row justify-content-between align-middle pt-2 px-3"
      >
        <p>
          <strong>Users</strong>
        </p>
        <span className="btn btn-transparent" type="button">
          <FaIcons.FaPlus size={15} />
        </span>
      </div>
      {filteredContacts.map((contact) => (
        <ul id="contacts" className="list-group px-3" key={contact._id}>
          <li className="list-item" onClick={() => handleUser(contact._id)}>{contact.userName}</li>
        </ul>
      ))}
    </div>
  );
};

export default Contacts;
