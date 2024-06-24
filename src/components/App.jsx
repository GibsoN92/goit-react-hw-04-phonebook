import React, { useState, useEffect, useCallback } from "react";
import css from "./App.module.scss";
import ContactForm from "./ContactForm/ContactForm";
import Filter from "./Filter/Filter";
import ContactList from "./ContactList/ContactList";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const storedContacts = localStorage.getItem("contacts");
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const checkContact = (newContact) => {
    return contacts.some((contact) => contact.name === newContact.name);
  };

  const addContact = (newContact) => {
    if (!checkContact(newContact)) {
      setContacts((prevContacts) => [...prevContacts, newContact]);
    } else {
      alert(`${newContact.name} is already in contacts`);
    }
  };

  const changeFilterValue = (e) => {
    setFilter(e.target.value);
  };

  const deleteUser = (id) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id),
    );
  };

  const normalizedFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(normalizedFilter),
  );

  return (
    <div className={css["container"]}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />

      <h2>Contacts</h2>
      <Filter changeHandler={changeFilterValue} />
      <ContactList contacts={visibleContacts} deleteFunction={deleteUser} />
    </div>
  );
};

export default App;
