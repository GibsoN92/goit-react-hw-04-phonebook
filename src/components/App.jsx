import React, { Component } from "react";
import css from "./App.module.scss";
import ContactForm from "./ContactForm/ContactForm";
import Filter from "./Filter/Filter";
import ContactList from "./ContactList/ContactList";

class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  componentDidMount() {
    const storedContacts = localStorage.getItem("contacts");
    if (storedContacts) {
      this.setState({ contacts: JSON.parse(storedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  checkContact = (newContact) => {
    const { contacts } = this.state;
    const isInBase = contacts.some(
      (contact) => contact.name === newContact.name,
    );
    return isInBase;
  };

  addContact = (newContact) => {
    const check = this.checkContact(newContact);
    if (!check) {
      const { contacts } = this.state;
      this.setState({
        contacts: [...contacts, newContact],
      });
    } else {
      alert(`${newContact.name} is already in contacts`);
    }
  };

  changeFilterValue = (e) => {
    this.setState({ filter: e.target.value });
  };

  deleteUser = (e) => {
    const { contacts } = this.state;
    const filtered = contacts.filter((contact) => contact.id !== e.target.id);
    this.setState({ contacts: filtered });
  };

  render() {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    const visibleContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );

    return (
      <div className={css["container"]}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />

        <h2>Contacts</h2>
        <Filter changeHandler={this.changeFilterValue} />
        <ContactList
          contacts={visibleContacts}
          deleteFunction={this.deleteUser}
        />
      </div>
    );
  }
}

export default App;
