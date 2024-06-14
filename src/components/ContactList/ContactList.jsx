import React from "react";
import Contact from "./Contact";
import PropTypes from "prop-types";

const ContactList = (props) => {
  const { contacts, deleteFunction } = props;
  return (
    <ul>
      {contacts.map((contact) => {
        return (
          <Contact key={contact.id}>
            {contact.name} : {contact.number}{" "}
            <button id={contact.id} onClick={deleteFunction}>
              Delete
            </button>
          </Contact>
        );
      })}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  deleteFunction: PropTypes.func.isRequired,
};

export default ContactList;
