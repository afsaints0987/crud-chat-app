import * as FaIcons from 'react-icons/fa'

/* eslint-disable react/prop-types */
const Contacts = ({contactUser}) => {
  return (
    <div>
      <div
        id="contacts-container"
        className="d-flex flex-row justify-content-between align-middle pt-2 px-3"
      >
        <p>
          <strong>Contacts</strong>
        </p>
        <span className="btn btn-transparent" type="button" >
          <FaIcons.FaPlus size={15}/>
        </span>
      </div>
      <ul id="contacts" className="list-group px-3">
        {contactUser.map(contact => {
          return (
            <li className="list-item" key={contact.id}>{contact.username}
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default Contacts